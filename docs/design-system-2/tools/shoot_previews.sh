#!/usr/bin/env bash
# Screenshots one component's preview as the design system's page shows it, at each width.
#
#   tools/shoot_previews.sh Postit                 390 and 1280px wide
#   tools/shoot_previews.sh Postit 600 1000        the widths given
#   OUT=/some/dir tools/shoot_previews.sh Postit   into /some/dir instead of a fresh temp dir
#   HEIGHT=260 tools/shoot_previews.sh Postit 1280 in a window 260px tall instead of 4000
#
# Needs: firefox, ImageMagick (magick), python3.
#
# It writes $OUT/<Component>-<width>.png for each width, cut off 24px below the last thing on it,
# prints a line per shot ("<Component>-<width>.png  <w>x<h>", with "  scrolls" after it when the
# page overflowed the window) and then $OUT. A window of the card's height shows whether the
# preview scrolls in its card; the shot is then only what the window shows.
# The page it shoots is the preview with tokens.css, bundle.css, React and
# bundle.js loaded first, as on the design system's page, and every /_blob/<id> in it pointed at
# its file under project/assets/ (design-system.json's assetGroups say which file an id is).
# React renders synchronously there, so the shot is taken after the preview has drawn.
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: $0 <Component> [width…]" >&2
  exit 2
fi
name=$1
shift
widths=("$@")
[ ${#widths[@]} -gt 0 ] || widths=(390 1280)

project=$(cd "$(dirname "$0")/../project" && pwd)
preview=$project/components/$name/preview.html
if [ ! -f "$preview" ]; then
  echo "no preview at $preview" >&2
  exit 1
fi

out=${OUT:-$(mktemp -d)}
mkdir -p "$out"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
mkdir "$work/profile"
# file:// pages are each their own origin by default, which blocks tokens.css's fonts
echo 'user_pref("security.fileuri.strict_origin_policy", false);' >"$work/profile/user.js"

python3 -I - "$project" "$preview" "$work/harness.html" <<'PY'
import json, re, sys
from pathlib import Path

project, preview, harness = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
blobs = {}
for group, g in json.loads((project / 'design-system.json').read_text())['assetGroups'].items():
    for f in g['files'].values():
        if 'blob' in f:  # a file recorded before its first upload has no id yet
            blobs[f['blob']] = (project / 'assets' / group / f['name']).as_uri()

def blob(m):
    if m.group(1) not in blobs:
        sys.exit(f'{preview}: /_blob/{m.group(1)} is in no asset group of design-system.json')
    return blobs[m.group(1)]

page = preview.read_text()
page = re.sub(r'\A<!--\s*@dsCard[^>]*-->\s*', '', page)
page = re.sub(r'/_blob/([0-9a-f]{32})', blob, page)

c = project / 'components'
# createRoot().render() in React 18 draws on a later task, which may come after the load event the
# screenshot waits for; flushSync makes it draw at once.
head = f'''
<link rel="stylesheet" href="{(project / 'tokens.css').as_uri()}">
<link rel="stylesheet" href="{(c / 'bundle.css').as_uri()}">
<script src="{(c / 'lib/react.production.min.js').as_uri()}"></script>
<script src="{(c / 'lib/react-dom.production.min.js').as_uri()}"></script>
<script src="{(c / 'bundle.js').as_uri()}"></script>
<script>
  (function () {{
    var createRoot = ReactDOM.createRoot;
    ReactDOM.createRoot = function (el, opts) {{
      var root = createRoot.call(ReactDOM, el, opts), render = root.render.bind(root);
      root.render = function (tree) {{ ReactDOM.flushSync(function () {{ render(tree); }}); }};
      return root;
    }};
  }})();
</script>
'''
page, n = re.subn(r'(<head[^>]*>)', lambda m: m.group(1) + head, page, count=1)
if n != 1:
    sys.exit(f'{preview}: no <head>')
harness.write_text(page)
PY

for width in "${widths[@]}"; do
  png=$out/$name-$width.png
  # Now and then Firefox takes the shot before the page has drawn, and it is one colour; then it
  # shoots again, up to three times.
  for try in 1 2 3; do
    firefox --headless --no-remote --profile "$work/profile" --window-size="$width","${HEIGHT:-4000}" \
      --screenshot "$work/shot.png" "file://$work/harness.html" >/dev/null 2>&1
    [ "$(magick "$work/shot.png" -format '%k' info:)" -gt 1 ] && break
    if [ "$try" = 3 ]; then
      echo "$name at $width: three blank shots" >&2
      exit 1
    fi
  done
  # A page that overflows the window gets a scrollbar, which the shot leaves transparent: the
  # preview then scrolls in its card too (a first or last child's margin that collapses through
  # the body, whose min-height is 100vh, is enough). Say so, and measure without it.
  scrolls=
  [ "$(magick "$work/shot.png" -format '%[opaque]' info:)" = True ] || scrolls='  scrolls'
  # The preview ends where the last pixel not of the page's background is (the colour at the
  # bottom of the 4000px window: white, or a slide preview's grey); keep 24px below it. The
  # border makes that the colour the bounding box trims, whatever is in the corners.
  page_bg=$(magick "$work/shot.png" -background white -alpha remove -alpha off \
    -format '%[pixel:p{0,h-1}]' info:)
  box=$(magick "$work/shot.png" -background white -alpha remove -alpha off \
    -bordercolor "$page_bg" -border 1 -format '%@' info:)
  bottom=$(awk -F'[x+]' '{ print $2 + $4 - 1 + 24 }' <<<"$box")
  magick "$work/shot.png" -background white -alpha remove -alpha off \
    -crop "${width}x${bottom}+0+0" +repage -strip "$png"
  echo "$name-$width.png  ${width}x${bottom}$scrolls"
done
echo "$out"
