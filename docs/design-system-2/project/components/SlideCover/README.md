The cover (and closing) slide: a sky band across the top; the eyebrow, title and lead below it, the byline at the bottom margin. The band is a plain placeholder for now: the road it used to carry is retired, and the network band and the band-title layout are still to come.

Mount `D3I.SlideCover` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideCover, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass `title` (at most two lines), `lead` (one line), `byline` ("Name · Affiliation · Venue, Month D, YYYY") and optionally `eyebrow` (default "D3I · datadonation.eu"). For a closing slide pass the closing content as children: it replaces the title block and the band stays.

- The band is a pinned 1920 × 224 `<svg>`: a `sky` rect 200px deep and a 3px `blue` line along its lower edge. It is decoration (`aria-hidden`) unless `bandLabel` is given.
- Padding is 256px 128px 128px: the slide format caps padding at 256px and drops a larger value, so the last 64px of offset is padding on the title block; content starts at 320px.
- Title: `slide-display` in `heading`, 1500px wide, `data-fit="none"`. Lead: `slide-lead`. Byline: `slide-item`.
