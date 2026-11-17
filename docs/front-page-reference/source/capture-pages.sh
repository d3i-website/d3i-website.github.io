#!/usr/bin/env bash
# Captures one representative page per layout, for before-and-after reviews of site-wide style changes.
#
#   source/capture-pages.sh <site_dir> <out_dir>
#
#   site_dir  Jekyll's built site (_site)
#   out_dir   where the screenshots go; created if missing
#
# It serves site_dir on a free local port and takes a whole-page screenshot of each page below at
# 1440 and 390px wide, as <out_dir>/<layout>-<width>.png:
#
#   page                  /data-donation/
#   page-sections         /software/getting-started/
#   page-news             /news/
#   page-archive-stacked  /community/events/
#   page-archive-sidebar  /community/newsletter/
#   hub-journey           /software/
#   hub-directory         /about-d3i/
#
# Firefox's --screenshot only takes the window, so the window is made 16000px tall and the white
# below the footer is cropped off. A user style sheet in the throwaway profile drops the sticky
# footer's min-height: 100vh, so the footer follows the content instead of the window's bottom.
#
# Needs: firefox, ImageMagick (magick), python3, curl.
set -euo pipefail

[[ $# -eq 2 ]] || { sed -n '4p' "$0" >&2; exit 2; }
site=$(cd "$1" && pwd)
mkdir -p "$2"
out=$(cd "$2" && pwd)
[[ -f $site/index.html ]] || { echo "no index.html in $site" >&2; exit 2; }

pages=(
  "page /data-donation/"
  "page-sections /software/getting-started/"
  "page-news /news/"
  "page-archive-stacked /community/events/"
  "page-archive-sidebar /community/newsletter/"
  "hub-journey /software/"
  "hub-directory /about-d3i/"
)
widths="1440 390"

work=$(mktemp -d)
server=
cleanup() {
  [[ -n $server ]] && kill "$server" 2>/dev/null || true
  rm -rf "$work"
}
trap cleanup EXIT

port=$(python3 -I -c 'import socket; s = socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1])')
python3 -I -m http.server "$port" --bind 127.0.0.1 --directory "$site" >/dev/null 2>&1 &
server=$!
for _ in $(seq 50); do
  curl -sf -o /dev/null "http://127.0.0.1:$port/" && break
  sleep 0.2
done
curl -sf -o /dev/null "http://127.0.0.1:$port/" || { echo "server did not start" >&2; exit 2; }

mkdir -p "$work/profile/chrome"
echo 'user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);' >"$work/profile/user.js"
echo 'body { min-height: 0 !important; }' >"$work/profile/chrome/userContent.css"

last_ink() {  # last_ink <image>: y of the last row that is not all white
  magick "$1" -scale '1x!' -depth 8 txt:- \
    | awk 'NR > 1 && substr(toupper($3), 1, 7) != "#FFFFFF" { split($1, p, /[,:]/); y = p[2] } END { print y + 0 }'
}

for entry in "${pages[@]}"; do
  read -r name path <<<"$entry"
  curl -sf -o /dev/null "http://127.0.0.1:$port$path" || { echo "missing page: $path" >&2; exit 2; }
  for width in $widths; do
    file=$out/$name-$width.png raw=$work/raw.png
    rm -f "$raw"
    firefox --headless --no-remote --profile "$work/profile" --window-size="$width",16000 \
      --screenshot "$raw" "http://127.0.0.1:$port$path" >/dev/null 2>&1
    [[ -s $raw ]] || { echo "no screenshot for $path at $width" >&2; exit 2; }
    magick "$raw" -crop "${width}x$(( $(last_ink "$raw") + 32 ))+0+0" +repage "$file"
    printf '%-22s %-28s %4s  %s\n' "$name" "$path" "$width" "$(magick identify -format '%wx%h' "$file")"
  done
done
