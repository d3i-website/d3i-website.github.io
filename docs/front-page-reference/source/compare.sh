#!/usr/bin/env bash
# Compares the front page of a built site with the reference screenshots.
#
#   source/compare.sh [--full] <site_dir> [on|off] [out_dir]
#
#   site_dir  a folder holding the site's index.html (the reference folder itself, or Jekyll's _site)
#   on|off    whether the note is on (default; all 12 widths) or off (1920, 1440, 1280)
#   out_dir   where the difference images go; default: a new temporary folder, whose path is printed
#   --full    also write a side-by-side of the whole page (reference left, site right) per width
#
# It serves site_dir on a free local port and asks for /?bar=off&note=<on|off>. Jekyll ignores the
# query; the reference page honours it, which is how the reference can be tested against itself.
#
# The band is compared, not the header above it: in every image the band's top edge is the first
# row whose pixel at x=4 is #87c5eb. Both the site's capture and the reference's band-*.png are
# cropped to 360px from there, and compared with `magick compare -fuzz 5%`.
#
# Prints one line per width with the number of differing pixels. out_dir gets diff-<width>-note-<on|off>.png
# (differing pixels in red over a faded copy of the reference crop). Exits 1 if any width differs in more
# than 0.3% of the crop's pixels (width x 360), 0 if none does.
#
# Needs: firefox, ImageMagick (magick), python3.
set -euo pipefail

here=$(cd "$(dirname "$0")/.." && pwd)
refs=$here/screenshots
band=360
sky='87C5EB'

full=0
args=()
for a in "$@"; do
  if [[ $a == --full ]]; then full=1; else args+=("$a"); fi
done
[[ ${#args[@]} -ge 1 && ${#args[@]} -le 3 ]] || { sed -n '2,3p' "$0" >&2; exit 2; }
site=$(cd "${args[0]}" && pwd)
note=${args[1]:-on}
[[ $note == on || $note == off ]] || { echo "second argument must be on or off" >&2; exit 2; }
[[ -f $site/index.html ]] || { echo "no index.html in $site" >&2; exit 2; }

work=$(mktemp -d)
server=
cleanup() {
  [[ -n $server ]] && kill "$server" 2>/dev/null || true
  rm -rf "$work"
}
trap cleanup EXIT

if [[ -n ${args[2]:-} ]]; then out=${args[2]}; mkdir -p "$out"; else out=$(mktemp -d); fi
out=$(cd "$out" && pwd)
echo "difference images: $out" >&2

port=$(python3 -I -c 'import socket; s = socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1])')
python3 -I -m http.server "$port" --bind 127.0.0.1 --directory "$site" >/dev/null 2>&1 &
server=$!
for _ in $(seq 50); do
  curl -sf -o /dev/null "http://127.0.0.1:$port/" && break
  sleep 0.2
done
curl -sf -o /dev/null "http://127.0.0.1:$port/" || { echo "server did not start" >&2; exit 2; }

mkdir "$work/profile"

band_top() {  # band_top <image>: y of the first row whose pixel at x=4 is the band's sky blue
  local y
  y=$(magick "$1" -crop 1x1600+4+0 +repage txt:- \
      | awk -v c="#$sky" 'NR > 1 { if (index(toupper($3), c) == 1) { split($1, p, /[,:]/); print p[2]; exit } }')
  echo "$y"   # empty if there is no band
}

fail=0
shot() {  # shot <width>
  local width=$1 name="$1-note-$note" raw=$work/raw.png
  firefox --headless --no-remote --profile "$work/profile" --window-size="$width",4000 \
    --screenshot "$raw" "http://127.0.0.1:$port/?bar=off&note=$note" >/dev/null 2>&1
  local top rtop
  top=$(band_top "$raw")
  rtop=$(band_top "$refs/band-$name.png")
  [[ -n $rtop ]] || { echo "no band top in reference band-$name.png" >&2; exit 2; }
  # a site with no band at x=4 counts as a failure; its crop then starts at the top of the page
  local missing=
  [[ -n $top ]] || { top=0; missing=" (no band found)"; fail=1; }
  magick "$raw" -crop "${width}x$band+0+$top" +repage "$work/site.png"
  magick "$refs/band-$name.png" -crop "${width}x$band+0+$rtop" +repage "$work/ref.png"
  local count=0
  # compare exits 1 when the images differ; the count is on stderr
  count=$(magick compare -metric AE -fuzz 5% "$work/ref.png" "$work/site.png" "$out/diff-$name.png" 2>&1 || true)
  count=${count%% *}; count=${count%%.*}
  local total=$((width * band))
  if [[ -n $missing ]] || (( count * 1000 > total * 3 )); then fail=1; verdict=FAIL; else verdict=ok; fi
  printf '%-14s differing=%-8s %s%%  band top: site %s, reference %s  %s\n' "$name" "$count" \
    "$(awk -v c="$count" -v t="$total" 'BEGIN { printf "%.3f", c * 100 / t }')" "$top" "$rtop" "$verdict$missing"
  if (( full )); then
    local bottom
    bottom=$(awk -F'[x+]' '{ print $2 + $4 + 24 }' <<<"$(magick "$raw" -format '%@' info:)")
    magick "$raw" -crop "${width}x$bottom+0+0" +repage "$work/site-full.png"
    magick "$refs/full-$name.png" "$work/site-full.png" -background white -gravity north +append +repage "$out/full-$name.png"
  fi
}

if [[ $note == on ]]; then widths="1920 1600 1440 1280 1279 1100 1000 999 800 600 599 390"; else widths="1920 1440 1280"; fi
for width in $widths; do
  shot "$width"
done
exit "$fail"
