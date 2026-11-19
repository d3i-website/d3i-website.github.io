#!/usr/bin/env bash
# Screenshots one component's preview as the design system's page shows it, at each width.
#
#   tools/shoot_previews.sh Postit                 390 and 1280px wide
#   tools/shoot_previews.sh Postit 600 1000        the widths given
#   OUT=/some/dir tools/shoot_previews.sh Postit   into /some/dir instead of a fresh temp dir
#
# Needs: firefox, ImageMagick (magick), python3.
#
# It writes $OUT/<Component>-<width>.png for each width, cut off 24px below the last thing on it,
# and prints $OUT. The page it shoots is the preview with tokens.css, bundle.css, React and
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
  firefox --headless --no-remote --profile "$work/profile" --window-size="$width",4000 \
    --screenshot "$work/shot.png" "file://$work/harness.html" >/dev/null 2>&1
  # the preview ends where the last non-white pixel is; keep 24px below it
  box=$(magick "$work/shot.png" -format '%@' info:)
  bottom=$(awk -F'[x+]' '{ print $2 + $4 + 24 }' <<<"$box")
  magick "$work/shot.png" -crop "${width}x${bottom}+0+0" +repage -strip "$png"
  echo "$name-$width.png  ${width}x${bottom}"
done
echo "$out"
