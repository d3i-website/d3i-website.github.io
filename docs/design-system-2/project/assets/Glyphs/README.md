# Glyphs

Two stroke-only glyphs drawn at the head of a routes rail, so the path starts from a place. Single-ink, stroked with `currentColor` at 2.5px, so they take the rail's accent when inlined; as an `<img>` they render black. Inline the SVG (the site does, from `_includes/glyphs/`) and set `color` to the rail's accent, `blue` or `yellow`.

- `netherlands.svg` — the Netherlands outline, 32×42, traced from Eurostat GISCO Countries 2024. Any page that shows it prints the attribution line "Netherlands outline: administrative boundaries © EuroGeographics, via Eurostat GISCO."
- `globe.svg` — a globe, 40×40: circle, one meridian, equator and two faint latitude lines.

Three filled concept glyphs for slides, added from the October 2026 Statistics Netherlands deck: white glyphs recoloured in one accent each, 512×512 PNG on a transparent ground, for examples of a kind of trace that has no platform mark. Use at 44 to 48px above a card's eyebrow, in the card's own accent (a SlideFrame card's `iconSrc`); they are not for the website.

- `chat-coral.png` — a chat bubble, `coral`; messaging examples.
- `train-yellow.png` — a train in #e8b53c, a darker yellow than `yellow`; public transport examples.
- `card-blue.png` — a bank card, `blue`; payment examples.
