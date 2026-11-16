#!/usr/bin/env bash
# Takes the reference screenshots of index.html with headless Firefox.
#
#   source/capture.sh              writes into screenshots/
#   source/capture.sh /some/dir    writes into /some/dir (to compare against screenshots/)
#
# Needs: firefox, ImageMagick (magick).
#
# For each width it writes two files:
#   full-<width>-note-<on|off>.png   the whole page, cut off 24px below the last thing on it
#   band-<width>-note-<on|off>.png   the top 420px: the header, the band and what hangs below it
#
# The widths sit on both sides of every breakpoint in the page (1280, 1000, 600), plus a few in
# between. The note is shown at every width; it is also switched off at the widths where it lies
# on top of the band (1280px and up), because the band behind it must stand on its own there.
set -euo pipefail

here=$(cd "$(dirname "$0")/.." && pwd)
out=${1:-$here/screenshots}
mkdir -p "$out"
profile=$(mktemp -d)
tmp=$(mktemp --suffix=.png)
trap 'rm -rf "$profile" "$tmp"' EXIT

shot() {  # shot <width> <on|off>
  local width=$1 note=$2 name="$1-note-$2"
  firefox --headless --no-remote --profile "$profile" --window-size="$width",4000 \
    --screenshot "$tmp" "file://$here/index.html?bar=off&note=$note" >/dev/null 2>&1
  # the page ends where the last non-white pixel is; keep 24px below it
  local box bottom
  box=$(magick "$tmp" -format '%@' info:)            # WxH+X+Y of everything that is not background
  bottom=$(awk -F'[x+]' '{ print $2 + $4 + 24 }' <<<"$box")
  magick "$tmp" -crop "${width}x${bottom}+0+0" +repage -strip "$out/full-$name.png"
  magick "$tmp" -crop "${width}x420+0+0" +repage -strip "$out/band-$name.png"
  echo "$name  ${width}x${bottom}"
}

for width in 1920 1600 1440 1280 1279 1100 1000 999 800 600 599 390; do
  shot "$width" on
done
for width in 1920 1440 1280; do
  shot "$width" off
done
