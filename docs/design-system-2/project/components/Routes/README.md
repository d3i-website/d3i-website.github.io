A fork the reader resolves by picking the question that fits them. Each route has its own vertical `blue` line. A glyph disc heads the line, there is a node per step, and a ring node ends it.

## What you provide

- `routes`: two routes. Each has a `question` in the reader's own words, a one- or two-sentence `answer`, and two or three `steps`. A step is one line of `text` with one `link` (`label`, `href`, `external`), drawn as an ActionLink.
- `glyph` on a route (optional): `netherlands` or `globe`. The component inlines it from `assets/Glyphs`, white on the `blue` disc. A route without a glyph starts its line at a ring node.
- `attribution` (optional): a page that shows the Netherlands glyph prints the EuroGeographics attribution line. The component adds the line unless you pass your own.

There are no pictures to pass. The glyphs are inline SVG.

## The values it draws

- `.routes` is a grid capped at `content-width`: one column, or two from 900px. The gap is `space-32`, `space-48` from 900px.
- `.route` is inset 60px. Its line (`::before`) is `line-page` in `blue`, centred under the disc, and ends in a `node-ring` ring node (`::after`: `surface` fill, 1.4px `blue` edge).
- `.route__glyph` is a `disc` (39.6px) in `blue`, with the glyph in `on-sky` 8px inside it.
- `.route__question` is `list-heading` in the serif (provisional), in `heading` and balanced, set 7px down so its first line centres on the disc. `.route__answer` is `body` in `text`.
- `.route__step::before` is the step's node: a `node` dot in `blue` on the line, level with the step's first line. `.route__step-text` is `body`.
- `.route__step-link` is the ActionLink in its section form: the label, the dotted `sky` line and the small arrow disc. A long label wraps onto two lines, its last word staying with the dots and the disc.
- `.routes__attribution` is `caption` in `text-muted`, with underlined links.
