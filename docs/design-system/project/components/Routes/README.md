A fork the reader resolves by picking the question that fits them. Each route is a vertical rail in a brand accent, blue then yellow, alternating, with a hollow stop per step; a glyph at the head of the rail says where the path starts.

Pass two `routes`, each with a `question`, a one- or two-sentence `answer`, and two or three `steps` of one line with one `link` each. Optionally name a `glyph`, `netherlands` or `globe`; the component inlines it from `assets/Glyphs` so it takes the rail's colour. A page that shows the Netherlands glyph prints the EuroGeographics attribution line; the component adds it unless you pass your own `attribution`.

- `.routes` is a grid, one column, two from `bp-lg`, `space-32` to `space-48` apart, capped at `content-width`.
- `.route` is inset 1.75rem behind a 3px rail (`--route-accent`: `blue`, `yellow` on even routes). `.route--with-glyph` adds a 2.5rem glyph above the rail.
- `.route__question` is `h4` in `text`, balanced; `.route__answer` is `body`.
- `.route__step::before` is the stop: a 0.8rem `surface` circle with a 3px accent ring, centred on the rail. `.route__step-link` is the ActionLink.
- `.routes__attribution` is `small` in `text-muted` with underlined links.
