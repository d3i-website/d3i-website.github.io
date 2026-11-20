A row of stat tiles, the slide form of the website's UsageFigures: a big numeral in the serif with its label beneath, optionally a mini bar chart or a grid of platform marks in a tile, and, when a deck needs it, the list the numbers summarise under a hairline.

**Words.** Slides are not read (brand book, Slides · Voice): about 20 words on the slide, the footer row not counted, enough to cue the presenter; the argument is spoken and lives in the speaker notes. The preview has 20: the title, four numerals with a word each, and the chart's four counts and years. Numerals count. `panel` adds words (the preview's earlier list of institutions was 30) and is off in the preview: name institutions aloud or in the notes.

Mount `D3I.SlideStats` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideStats, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass up to four `tiles` (`value` and a `label` of a word or two; optionally `series` of years and counts, or `marks`), optionally up to three `panel` columns (`title`, `items`), `heading`, `eyebrow` and `number` or `source`. Every number keeps its label as text; every bar carries its value.

- The title block: the eyebrow in `text-muted` caps, the title in the serif (Libre Caslon Condensed, provisional) at 420, 64px.
- The tiles (and the list, 48px under them) are centred in the space under the title block.
- Tiles: columns of equal width on white, no frame and no fill, each after the first divided from the one before by a 2px `border` hairline; 32px either side of each hairline, 12px between lines.
- Numeral: the serif (provisional) at 420, 96px, line height 1, in `blue` on every tile: blue is the slide's one working colour, so the tiles are not told apart by colour. Label: `slide-small` in `text-muted`.
- Bars: square bars 48px wide in `blue`, the tallest 160px; the count above in Nunito Sans 800 at 24px, the year below in `slide-small` `text-muted`.
- Marks: a six-column grid of 48px images, 12px apart, 16px under the label, each with the platform's name as alt text.
- List: under a 2px `border` hairline with 32px above the columns, no fill; column titles Nunito Sans 800 at 28px in `heading`, items `slide-small`.
- Corners are square and nothing is tinted or shadowed.

## What you provide

- `marks`: files from `assets/Platforms`, one per platform studied.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
