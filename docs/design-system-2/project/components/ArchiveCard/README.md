An event or archive entry as a card: title, a meta line of date and place, a summary, labelled detail rows, and a row of action links. Upcoming or highlighted entries take the featured tint and a blue-tinted border.

Pass `title`, `date` already folded the way the site writes it ("October 1-2, 2026"), `location`, `summary`, `details` (label and value rows) and `actions` (label, href, external). `href` is the entry's external site when it has one, else its own page; it becomes the first action, labelled "View details →" unless `hrefLabel` says otherwise. `featured` marks an upcoming or highlighted entry. Stack the cards in `ArchiveCard.List`, with an optional `heading`.

- `.archive-card` is `surface`, 1px `border`, `radius-lg`, `shadow-sm`, padding `space-16`, a grid with `space-16` between content and actions.
- `.archive-card--featured` is `blue-tint` with a `road` border.
- `.archive-card__title` is `h4`; `.archive-card__meta` is `body` in `text-muted`, with " · " between date and place.
- `.archive-card__detail` is a 5rem / 1fr grid; `dt` is 800.
- `.archive-card__actions` wraps `.cta-link`s `space-16` apart. Lists stack cards `space-16` apart under an `h3` heading, capped at `content-width`.
