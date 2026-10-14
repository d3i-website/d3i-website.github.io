A browser-window panel for showing software (Port, the Digital Footprint Explorer) on a slide, beside a numbered list. The window is drawn, not screenshotted, so it stays on brand and legible at slide scale; a real screenshot can replace the drawn body inside the same frame.

Mount `D3I.SlideWindow` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideWindow, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass the numbered `steps` (`title`, `text`), an optional `link` line, and `window`: `url`, `title`, `tabs`, a `stat` line, a `chartLabel` and `bars` drawn from real numbers, or `imageSrc` for a screenshot. Say in `caption` when the body is drawn.

- The list: two-digit numbers in `slide-stat` at 48px in `coral`, a `slide-item` title and one `slide-small` line, rows 24px apart divided by `border`; the link closes the column in `slide-label` `coral`.
- Frame: `surface`, 1px `border`, `radius-lg`, `shadow-md`, clipped. Chrome bar: `surface-tint` with three 14px `border-strong` dots and the URL in a `surface` pill in `slide-small` `text-muted`.
- Body: padding 24px 32px 32px, 16px between lines; a `slide-item` title, pill tabs in `slide-label` (the active one `blue` with `on-accent` text, the others `surface-strong`), `slide-small` captions, bars in `chart-1` with `radius-sm` tops over a 1px `border-strong` axis.

## What you provide

- `window.imageSrc`: a screenshot of the software, when you have one; otherwise the window is drawn from `bars`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
