The frame every content slide shares: an eyebrow naming the part over a `slide-title` at the top margin, the body in the column below, and one pinned footer row with the site name left and the slide number right. Its commonest body is a row of three tint cards and a two-column statement panel.

Mount `D3I.SlideFrame` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideFrame, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass `eyebrow` ("Part II · The method"), a `heading` that states a finding or names a topic in one line (two at most), and `number`, or `source` for a citation in the footer's left slot. `cards` takes up to three siblings (`eyebrow`, `title`, `body`, optional `iconSrc`/`iconAlt`; `plain` for a white card with a border); `panel` takes the statement columns (`eyebrow`, `text`); anything else goes in as children between them.

- Section: `surface`, padding 128px 128px 136px, a flex column with 48px gaps, base line height 1.4. The title block is `slide-eyebrow` in `blue`, 16px above `slide-title` in `heading`, both `data-fit="none"`.
- Tint cards take `blue-tint`, `coral-tint`, `yellow-tint` in order, `radius-lg`, padding 32px, 12px between lines; the eyebrow is in its accent's text colour (#4272ef, #ff5e5e, #e8b53c), the title `slide-subheading`, one line of `slide-body`. A 48px icon may head a card: a platform mark from `assets/Platforms` when the card is about a platform, or a concept glyph from `assets/Glyphs` in the card's own accent when it is about a kind of trace with no platform.
- Statement panel: `surface-tint`, `radius-lg`, padding 32px 40px; per column a `text-muted` eyebrow over `slide-body`.
- Footer: pinned 64px from the bottom between the 128px margins; two `slide-label` lines in `text-muted`, or the source in `slide-small`.
- Budget: the flow is 816px tall (1080 minus 128 and 136) and ends 41px above the footer. A title block is about 120px, a tint card about 200, a statement panel about 160.

## What you provide

- `iconSrc` for a card: `assets/Platforms/<platform>.svg`, or `assets/Glyphs/chat-coral.png`, `train-yellow.png`, `card-blue.png`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
