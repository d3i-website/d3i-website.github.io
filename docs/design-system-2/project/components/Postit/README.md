A cream sticky note for timely updates: a position statement, an outage, a deadline. Tilted 1.5 degrees, with a strip of yellow tape on the homepage and hub versions.

Pass `eyebrow` (one or two words; default "Updates"), a short `title`, one or two sentences as `body` or children, and optionally a `link` with its own arrow in the label. `inline` is the content-page form. Pages declare it in front matter; one per page, and only while the news is timely.

- `.postit` is 16.25rem wide, `yellow-tint`, `radius-sm`, `rotate(-1.5deg)`, `shadow-lg`; its `::before` is the tape: a `yellow` strip at half opacity. Paragraph padding is cancelled, so the note stays compact.
- `.postit__eyebrow` is `eyebrow` in `coral`; `.postit__title` is `label` at 600 in `heading`; `.postit__body` is `small` in `text-muted`; `.postit__link` is `label-small` in `text-muted` over a `border-strong` underline, solid on hover.
- `.postit--inline` is the content-page form: no tape, floats right from `bp-md` with a `space-32` text gap. The homepage puts it in the hero row; directory hubs pin it top-right of the hub.
