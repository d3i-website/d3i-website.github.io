The impact page's figures: a bordered card per figure with a title and a caption, a row of big coloured numbers with small labels, a draggable globe with zoom buttons, and the platforms studied as pills with their logos. The bars and the globe are drawn by JavaScript from `_data/usage.yml`; this is the resting markup around them.

Build it from its parts: `UsageFigures.Figure` (title, caption) holding `UsageFigures.Stats` (value, label, series), `UsageFigures.Globe` (your globe drawing as children, with back and zoom handlers and the hint) and `UsageFigures.Platforms` (platforms grouped by category, with the URLs of your uploads of `assets/Platforms`). Colour series in order `chart-1` to `chart-5`; every number keeps its label as text. The preview stands a plain disc in for the globe.

- `.usage-figure` is 1px `border`, `radius-lg`, padding `space-24`, `shadow-sm`, `space-24` apart, capped at `content-width`.
- `.usage-figure__title` is `h4` in `heading`; `.usage-figure__cap` is `small` in `text-muted`.
- `.usage-stat b` is `h3` size at 800, leading 1, in its series colour; the `span` label is `eyebrow` size at 400 in `text-muted`; stats sit `space-24` apart.
- `.usage-gctl button` is 30px tall, `surface` with a `border-strong` outline, `radius-md`, `label-small` in `heading`. `.usage-hint` is `eyebrow` size, italic, `text-muted`, centred.
- `.usage-pg h4` is `eyebrow` in `text-muted`; `.usage-plat` is a pill (`radius-pill`) on `surface-tint` with a `border` outline, `label-small` in `heading`, an 18px logo left of the name.

## What you provide

- `logo` per platform in `UsageFigures.Platforms`: the matching file in `assets/Platforms`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
