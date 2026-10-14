A news item as a card: a media slot in one of the three brand accents, then title, date, summary and a "Read more →" link pinned to the bottom. Three forms: the tile (news page grid), the row (small thumbnail left), and the homepage strip, where the photo becomes a circular avatar on the accent field.

Pass `title`, `date`, `summary`, an optional `image`, and `href`: the item's own url or an external one (external wins; set `external` and it opens in a new tab). `accent` defaults to the title length modulo 3, as on the site, so it is stable across builds and needs no editor choice; an imageless card shows the bare accent field. `variant="row"` is the row form. `NewsCard.Grid` and `NewsCard.List` hold tiles and rows; `NewsCard.Band` is the homepage strip, with its `title` and `moreLink`.

- `.news-card` is `surface`, 1px `border`, `radius-lg`, `shadow-sm`, clipped; a flex column so the link sits at the bottom.
- `.news-card__media` is 8.5rem tall with the image covering it; `--accent-0`, `--accent-1`, `--accent-2` fill it `blue`, `coral`, `yellow`.
- `.news-card__title` is `h4`, the link in `heading` turning `blue` on hover; `.news-card__date` is `body` in `text-muted`; the summary is `body`; `.news-card__link` is a `.cta-link`.
- `.news-grid` is one column, three from `bp-md`, `space-24` gap. `.news-card--row` puts a 10rem media slot left of the body (stacked below `bp-sm`).
- `.home-news` is the homepage band: `surface-tint` with a `border` top rule, padding `space-32` by `space-24` by `space-48`; its media slots are 10.5rem tall and centre a 7.5rem round photo with a 3px `surface` ring and `shadow-md`. The band header pairs an `h2` title with a "More news →" link.

## What you provide

- `image`: the item's photo, optional; without one the accent field shows bare. News photos are not in this system.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
