The front page's wrapper: `<div class="home">`, as `_layouts/homepage.html` writes it. Every front-page style on the site is scoped to `.home`, so the front page's parts only look right inside it.

Use it once, around everything on the front page between the header and the footer. Put `Band` first, with the `Note` as its children; the cards and the lists follow below the band. `ArrowDisc` takes its styles from it too.

## What you provide

- `children`: the front page's parts, in order.

There are no pictures to pass.

## The values it draws

- `.home` sets the front page's text to `text`, and the local values the parts inside read: `--ink` is `heading` (the colour of the note's title and body), `--line` is `border`, `--col` is `site-width`, `--edge` is `page-edge`, and `--sep` is `section-space`, the white space between the cards and the lists.
- Inside it, a paragraph has no margin or padding, `.serif` is the serif (Libre Caslon Condensed), a link shows keyboard focus as a 2px `blue` outline 3px out, and `.visually-hidden` text is there for screen readers only.
