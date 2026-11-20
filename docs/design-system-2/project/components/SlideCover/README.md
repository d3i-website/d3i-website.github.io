The cover (and closing) slide, in two layouts. Both are title slides; pick one per deck.

- **`network`** (the default) carries the front page's network across a sky band with no words in it. The eyebrow, title, subtitle and speaker line sit under it on white.
- **`band-title`** is the website band as it is, with the deck's title in it. The eyebrow, speakers and venue are centred under it, then a row of partner and provider logos.

**Words.** About 20, counted as the brand book's Slides · Voice says. The band carries the cover; the preview's `network` cover has 18 words and its `band-title` cover 19. Keep the subtitle to a few words, the speakers to names and the venue to its name and year; the logos are pictures and do not count.

Mount `D3I.SlideCover` in a design canvas. For a Slides deck, `D3I.slideMarkup(D3I.SlideCover, props)` returns the slide as one `<section>` with inline hex styles to paste. Each band is one inline `<svg>` of about 16 KB, under the format's 52 KB. Its props are in `components/index.d.ts` and on its card. The values below are what it draws, for anyone writing a slide by hand.

## What you provide

- `title`. Break a line with `\n`.
- `subtitle`, `speakers` and `venue`, all optional.
- `eyebrow`: the default is "D3I · datadonation.eu".
- For `network`, `markSrc`: the upload of `Logos/d3i-mark.svg`. The mark is drawn as it is, not recoloured. Without `markSrc` the disc stays empty: no picture has a default.
- For `band-title`, `logos`: `{ key, src, alt }` for each logo, in row order.
  - `key` is one of SiteFooter's measured logos: `odissei`, `eyra`, `uva`, `ru`, `uu`, `vu`, `tilburg` or `eur`.
  - `src` is the upload of that logo from the Logos or Partners group.
  - The order on the card is Utrecht, UvA, Radboud, Erasmus, Tilburg, VU, then ODISSEI and Eyra.
- For a closing slide, pass the closing content as children. In `network` it replaces the title block; in `band-title` it replaces the centred eyebrow, speakers and venue. The band stays.

## `network` (cover B9)

- **The band** is the front page band's own drawing at its 1680px layout, enlarged 8/7 to 1920px.
  - The participant's story, on the left, is stretched to 800px and hangs below the band's edge in `sky`.
  - The research side, on the right, ends at the globe on the slide's right edge.
  - One downturn (rounded corner, straight diagonal, rounded corner) joins the story's upper line to the research side's level.
  - On that upper line sits the D3I mark, 34px, in a 45px white disc with a 1.5px `blue` ring.
  - The sky is 256px deep left of the step and 315px right of it. The drawing is 343px tall, down to the funnel's dotted circle.
- **The drawing's source** is `assets/Slides/cover-network.svg`, one SVG in slide pixels. It was read from the approved mockup's rendered page, with every line at its drawn weight and no `vector-effect`. `tools/build_slide_cover.py` copies it into the bundle.
- **Colours** are token values, except the portraits, which keep the designer's own colours (`#36354a`, `#f15f60`, `#ffd1d2`, as in `assets/Network`): pictures are never recoloured.
- **The title block** starts at 416px. The section's padding is 256px 128px 128px, because the slide format caps padding at 256px, and the remaining 160px is padding on the block.
  - Eyebrow: `slide-eyebrow` in `blue`.
  - Title: the serif at 420, 96px/1.02, in `heading`, 1500px wide, balanced, `data-fit="none"`. The serif is provisional.
  - Subtitle: `slide-lead` in `text-muted`, 1400px wide.
  - The block's gaps are 24px.
- **The speaker line** sits at the bottom margin, in Nunito Sans 700 28px/1.3 in `heading`: the speakers, then " · " and the venue.

## `band-title` (cover C)

- **The band** is `BAND_MARKUP`, the front page band from `_includes/home/band.html`, at its 1280px+ layout drawn 1440px wide and scaled 4/3.
  - The site places the drawing with stylesheet rules, which a slide cannot carry. The bundle therefore resolves the rules that apply at 1440px into one `<svg>`.
  - The band follows the include: when `tools/build_band_markup.py` copies a changed band, the cover changes with it.
  - The 1440px band's numbers (`BAND` in bundle.js: the sky's depth and drop, the title column's half-width and gap, the step's place and width, the thread's height) are copied from `_sass/_home-band.scss` and must be updated with it.
  - If the band uses an element or class the cover does not know, the cover throws rather than drawing it wrong.
  - Lines are at the projector weights: 2px story lines, dotted lines at 2.75px, and 2.75px below the band's edge.
- **The title** is in the band: the serif at 420, 66.67px/1.03, in white, centred in a 677px column from 45px down.
  - Its line runs under it between two nodes, as on the front page.
  - The subtitle follows 26.67px under the title, in Nunito Sans 900 24px/1.4 in `blue`, centred on one line. 24px is the projector floor; the website's 17px × 4/3 would be 22.67px.
- **Under the band**, from 400px to 832px, the block is centred with 20px gaps:
  - The eyebrow, in `slide-eyebrow` and `blue`.
  - The speakers, in Nunito Sans 700 48px/1.2 in `heading`.
  - The venue, in `slide-lead` in `text-muted`.
- **The logo row** runs from 832px to 944px between the margins, under a 2px `border` hairline.
  - Each logo's cell is its ink box at the footer's equal-ink-area size (`site-footer__cell--<key>`), with 1rem = 19.2px.
  - One gap runs between all the logos. It is as wide as the widest clear zone in the row, and at least 1.5rem.
  - If the row would not fit the 1664px between the margins, the rem shrinks until it does.
  - Without `logos` there is no hairline and no row. This cover has no footer row.
