The impact page's figures. Each figure stands alone in one hairline frame: a title, a caption, and its content.
- The numbers are in ink, each label opening on a node in its series' colour.
- The globe can be dragged and has zoom buttons.
- The platforms studied are square hairline chips with their logos.

The bars and the globe are drawn by JavaScript from `_data/usage.yml`; this is the resting markup around them.

## What you provide

Build it from its parts:
- `UsageFigures.Figure`: `title` and `caption`, holding the rest.
- `UsageFigures.Stats`: `stats`, each a `value`, a `label` and optionally a `series` (1 to 5). Without one, a stat takes its position in the row. Every number keeps its label as text.
- `UsageFigures.Globe`: your globe drawing as children, with back and zoom handlers and the hint. The back button reads "Back to world", with no arrow (the site's impact page still writes "← Back to world" until it is redone). The preview stands a plain ring in for the globe.
- `UsageFigures.Platforms`: the platforms grouped by category, with the URLs of your uploads of `assets/Platforms` as `logo`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.

## The values it draws

- `.usage-figure` is framed by one `border` hairline, padded `space-24` (`space-16` below 600px), `space-24` apart, capped at 54rem. There is no shadow, tint or radius.
- `.usage-figure__title` is `card-heading` (the serif, 27px) in `heading`, 6px above the caption. `.usage-figure__cap` is `small` in `text-muted`, 20px above the content.
- `.usage-stat-row` sets its stats 40px apart (16px below 600px), `space-16` above the globe.
- `.usage-stat b` is `title-md` (the serif, 40px) in `heading`; `title-sm` (34px) below 600px.
- `.usage-stat span` is `small` in `text-muted`, 6px under the numeral. Its `::before` is a `node` (9px), 7px before the label, filled with `--series`.
  - The component sets `--series` on each `.usage-stat` to `chart-1` to `chart-5`, from the stat's `series` or its position.
  - Markup without it, as the site's is now, takes the colour by position (`nth-child(5n+…)`).
  - The numerals no longer carry an inline colour. The site's include drops its `style="color:…"` when the page is redone.
- `.usage-gctl button` is 30px tall, square, `surface` with a `border` hairline, `label` in `heading`. `.usage-hint` is `caption` in `text-muted`, centred.
- `.usage-pg h4` is `eyebrow` (11px, 700, uppercase at 0.12em) in `text-muted`, 10px above its chips. The globe's country list headings (`.usage-country h4`) take the same `eyebrow`.
- `.usage-plat` is a square chip, `surface` with a `border` hairline, padded 5px 12px 5px 8px, `label` in `heading`. Its logo is 18px, `space-8` left of the name.
