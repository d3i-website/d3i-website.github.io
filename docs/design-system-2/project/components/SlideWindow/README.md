A browser-window panel for showing software (Port, the Digital Footprint Explorer) on a slide, beside a numbered list. The window is drawn, not screenshotted, so it stays on brand and legible at slide scale; a real screenshot can replace the drawn body inside the same frame.

Mount `D3I.SlideWindow` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideWindow, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass the numbered `steps` (`title`, `text`), an optional `link` line, and `window`: `url`, `title`, `tabs`, a `stat` line, a `chartLabel` and `bars` drawn from real numbers, or `imageSrc` for a screenshot. Say in `caption` when the body is drawn.

- The title block: the eyebrow in `text-muted` caps, the title in the serif (Libre Caslon Condensed, provisional) at 420, 64px.
- The list: two-digit numbers in the serif (provisional) at 420, 48px, in `blue`, as the section stop's numeral; a Nunito Sans 800 title at 28px and one `slide-small` line; rows 24px apart divided by a 2px `border` hairline. The link closes the column in Nunito Sans 700 at 24px in `blue`.
- Frame: `surface`, square, framed by a 2px `border` hairline, no shadow, clipped. Chrome bar: `surface` over a 2px `border` hairline, with three 14px `border` dots and the URL in a square box framed by a 2px `border` hairline, in `slide-small` `text-muted`.
- Body: padding 24px 32px 32px, 16px between lines; a Nunito Sans 800 title at 28px, square tabs in Nunito Sans 700 at 24px (the active one `blue` with `on-accent` text, the others `surface` framed by a 2px `border` hairline), `slide-small` captions, square bars in `blue` over a 2px `border-strong` axis.
- Nothing is tinted or shadowed.

## What you provide

- `window.imageSrc`: a screenshot of the software, when you have one; otherwise the window is drawn from `bars`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
