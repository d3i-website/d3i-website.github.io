A browser-window panel for showing software (Port, the Digital Footprint Explorer) on a slide, beside its steps. The window is drawn, not screenshotted, so it stays on brand and legible at slide scale; a real screenshot can replace the drawn body inside the same frame.

**Words.** About 20, counted as the brand book's Slides · Voice says. The preview has 20: the title, three steps of three or four words, the URL and the window's title. The window carries the point, so its bars need no labels. Each step's `text`, the `link`, the `caption`, and the window's `tabs`, `stat`, `chartLabel` and bar labels add words and are off in the preview. When the window is drawn, say so aloud or in `caption`.

Mount `D3I.SlideWindow` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideWindow, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass the `steps` (`title`, optional `text`), an optional `link` line, and `window`: `url`, `title`, optional `tabs`, `stat` line and `chartLabel`, and `bars` drawn from real numbers (`value`, optional `label`), or `imageSrc` for a screenshot. `caption` is an optional line under the window.

- The title block: the eyebrow in `text-muted` caps, the title in the serif (Libre Caslon Condensed, provisional) at 420, 64px.
- The steps, in a 520px column: a 3px `blue` line runs down from the first step to the last, with a 22px `blue` node at each step's title; the line counts the steps, so there are no numerals. Each title is the serif at 420, 36px, in `heading`, 24px right of the line, with an optional `slide-small` line under it. The steps spread down the column: the last sits at the bottom, the others share the height above it. The link closes the column in Nunito Sans 700 at 24px in `blue`, 32px below, as plain words: no arrow.
- The list and the window sit 48px apart and fill the space from 64px under the title block to 24px above the bottom margin, so the window ends about 65px above the footer row.
- Frame: `surface`, square, framed by a 2px `border` hairline, no shadow, clipped. Chrome bar: `surface` over a 2px `border` hairline, with three 14px `border` dots and the URL in a square box framed by a 2px `border` hairline, in `slide-small` `text-muted`.
- Body: padding 24px 32px 32px, 16px between lines; a Nunito Sans 800 title at 28px, square tabs in Nunito Sans 700 at 24px (the active one `blue` with `on-accent` text, the others `surface` framed by a 2px `border` hairline), `slide-small` captions, square bars in `blue` over a 2px `border-strong` axis. The bars fill what the title, tabs and captions leave (at least 150px), 8px apart, the tallest at the full height; the month labels, if given, sit under the axis.
- Nothing is tinted or shadowed.

## What you provide

- `window.imageSrc`: a screenshot of the software, when you have one; otherwise the window is drawn from `bars`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
