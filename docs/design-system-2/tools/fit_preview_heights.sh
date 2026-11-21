#!/usr/bin/env bash
# Checks that each preview's card is as tall as what the preview draws.
#
#   tools/fit_preview_heights.sh                   every preview
#   tools/fit_preview_heights.sh Postit Note       the previews named
#   tools/fit_preview_heights.sh --write [Name…]   also set each @dsCard height to the fit one
#
# Needs what shoot_previews.sh needs (firefox, ImageMagick, python3).
#
# Each preview is shot with shoot_previews.sh at its card's width (the @dsCard width=, or 1280
# when it has none). Its content height is where the last non-white pixel ends. The fit height
# is that plus 32px, rounded up to a multiple of 8, unless the page is taller than that (a
# component's own bottom padding, or a margin, below the last thing drawn): then it is the
# page's height, rounded up to a multiple of 8, so the preview does not scroll in its card.
#
# It prints a row per preview: name, width, content, declared and fit height. It exits 1 when a
# declared height is under the content (the card cuts the preview off), more than 64px over it
# (the card shows a band of nothing), or less than the page's height (the preview scrolls in its
# card; seen by shooting it in a window the card's size). With --write it first sets each
# declared height to the fit one (the declared column then shows old>new). Slide previews are a
# stage of fixed size and may declare exactly what their scaled slides need, so leave them out of
# --write.
set -euo pipefail

write=
if [ "${1-}" = --write ]; then
  write=1
  shift
fi

tools=$(cd "$(dirname "$0")" && pwd)
components=$(cd "$tools/../project/components" && pwd)
names=("$@")
if [ ${#names[@]} -eq 0 ]; then
  for f in "$components"/*/preview.html; do
    names+=("$(basename "$(dirname "$f")")")
  done
fi

out=$(mktemp -d)
trap 'rm -rf "$out"' EXIT

# shot <name> <width> [window height]: shoot_previews.sh's line for the one shot
shot() {
  local line
  line=$(HEIGHT=${3:-4000} OUT=$out "$tools/shoot_previews.sh" "$1" "$2")
  echo "${line%%$'\n'*}"
}
# scrolls <name> <width> <height>: does the page overflow a window that tall?
scrolls() {
  [[ $(shot "$1" "$2" "$3") == *scrolls ]]
}

status=0
printf '%-18s %6s %8s %9s %5s\n' preview width content declared fit
for name in "${names[@]}"; do
  preview=$components/$name/preview.html
  header=$(head -n 1 "$preview")
  declared=$(sed -nE 's/.*[[:space:]]height=([0-9]+).*/\1/p' <<<"$header")
  width=$(sed -nE 's/.*[[:space:]]width=([0-9]+).*/\1/p' <<<"$header")
  width=${width:-1280}
  if [ -z "$declared" ]; then
    echo "$name: no height in its @dsCard line" >&2
    status=1
    continue
  fi

  shot_height=$(sed -nE 's/^[^ ]+ +[0-9]+x([0-9]+).*/\1/p' <<<"$(shot "$name" "$width")")
  content=$((shot_height - 24))  # shoot_previews.sh keeps 24px below the last thing drawn
  fit=$(((content + 32 + 7) / 8 * 8))
  if scrolls "$name" "$width" "$fit"; then
    # the page is taller: find its height, between fit (scrolls) and content + 512 (does not)
    lo=$fit hi=$((content + 512))
    while [ $((hi - lo)) -gt 1 ]; do
      mid=$(((lo + hi) / 2))
      if scrolls "$name" "$width" "$mid"; then lo=$mid; else hi=$mid; fi
    done
    fit=$(((hi + 7) / 8 * 8))
  fi

  if [ -n "$write" ] && [ "$declared" != "$fit" ]; then
    python3 -I - "$preview" "$fit" <<'PY'
import re, sys
path, fit = sys.argv[1], sys.argv[2]
text = open(path).read()
first, rest = text.split('\n', 1)
first, n = re.subn(r'(\sheight=)\d+', r'\g<1>' + fit, first, count=1)
assert n == 1 and first.startswith('<!-- @dsCard'), path
open(path, 'w').write(first + '\n' + rest)
PY
    shown="$declared>$fit"
    declared=$fit
  else
    shown=$declared
  fi

  verdict=
  if [ "$declared" -lt "$content" ]; then
    verdict="cut off by $((content - declared))px"
  elif [ $((declared - content)) -gt 64 ]; then
    verdict="$((declared - content))px of nothing below"
  elif [ "$declared" -lt "$fit" ] && scrolls "$name" "$width" "$declared"; then
    verdict='scrolls in its card'
  fi

  printf '%-18s %6s %8s %9s %5s  %s\n' "$name" "$width" "$content" "$shown" "$fit" "$verdict"
  [ -z "$verdict" ] || status=1
done
exit $status
