The sky-blue band at the top of the front page: the network drawing, the two-line title and the subtitle. It is the site's one colour block and runs full width.

Use it once, at the top of the front page, inside the front page's wrapper `<div class="home">`: every band style is scoped to `.home`, as on the site. Pass `titleLines` (two strings; the title is always two lines) and `subtitle` (one sentence). Put a `Note` in `children` to lay it on the band; without one the band is complete, and below 1280px the niche under its shallow side stays empty.

The drawing is not drawn in React. It is `_includes/home/band.html`'s own markup, copied into `bundle.js` by `tools/build_band_markup.py`; Band fills in only the title lines and the subtitle. When the include changes, run the tool again (the tests check it is current). The drawing's positions come from `docs/front-page-reference/source/build.py`, not from the tokens.

## What you provide

- `titleLines`: the title's two lines. On the site they are `index.md`'s `title_line_1` and `title_line_2`.
- `subtitle`: one sentence, `index.md`'s `excerpt`.
- `children` (optional): the note.

There are no pictures to pass. The pieces of the drawing (`assets/Network`) are inline SVG in the markup.

## The values it draws

- `.hero__band` is `sky`, `band-depth` deep on the left and `band-drop` deeper right of the step. The lower edge is a `line-page` stroke in `blue`, with the `coral` `node-edge` at the step's middle and a `blue` one on the deep side. From 1280px the step is centred.
- `.hero__title` is `title` in `on-sky`, two lines, centred `band-pad` below the band's top; `.hero__sub` is `lead` in `blue`.
- `.hero__thread` runs through the title at `band-thread`, with a `node` 6px outside each side of the title's column (twice `band-half` plus 40px wide). The drawings start `band-gap` from that column.
- The participant's story (`.hero__net--l`) and the research side (`.hero__net--r`) are `line-band` in `on-sky` on the band. The story is `band-story-depth` deep and hangs below the band, where its lines turn `sky` and `line-page`.
- At each width (`bp-lg`, `bp-md`, `bp-sm`) the depths, the title size and the drawing change as the brand book's "What shows at each width" says. Below 600px the drawings beside the title go, the thread runs edge to edge, and the globe rides the deep side of the edge in place of its `blue` node.
