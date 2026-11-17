A row of stat tiles, the slide form of the website's UsageFigures: a big numeral in its series colour with its label beneath, optionally a mini bar chart or a grid of platform marks in a tile, and a `surface-tint` panel below for the list the numbers summarise.

Mount `D3I.SlideStats` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideStats, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass up to four `tiles` (`value` and a one-line `label`; optionally `series` of years and counts, or `marks`), up to three `panel` columns (`title`, `items`), `heading`, `eyebrow` and `number` or `source`. Every number keeps its label as text; every bar carries its value.

- Tile: `surface`, 1px `border`, `radius-lg`, padding 32px, 8px between lines. Numeral: `slide-stat` in `chart-1` to `chart-4` in order (#4272ef, #ff5e5e, #f4a52b, #27b3a3). Label: `slide-small` in `text-muted`.
- Mini bars: bars 48px wide in `chart-1` with `radius-sm` tops, the tallest 56px; the count above in `slide-label` at 800, the year below in `slide-small` `text-muted`.
- Marks: an eight-column grid of 32px images, each with the platform's name as alt text.
- List panel: `surface-tint`, `radius-lg`, padding 32px; column titles `slide-item`, items `slide-small`.

## What you provide

- `marks`: files from `assets/Platforms`, one per platform studied.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
