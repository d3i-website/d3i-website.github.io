A news item as a card: a media slot in one of the three brand accents, then title, date, summary and a "Read more →" link pinned to the bottom. It is the row form (small thumbnail left), which is how the news page lists its items (`_includes/news-card.html` in `.news-list`). The front page lists news with `ListRow`, not with this card.

Pass `title`, `date`, `summary`, an optional `image`, and `href`: the item's own url or an external one (external wins; set `external` and it opens in a new tab). `accent` defaults to the title length modulo 3, as on the site, so it is stable across builds and needs no editor choice; an imageless card shows the bare accent field. `NewsCard.List` holds the rows.

- `.news-card.news-card--row` is `surface`, 1px `border`, `radius-lg`, `shadow-sm`, clipped; the media slot sits left of the body (stacked below `bp-sm`), and the link sits at the bottom of the body.
- `.news-card__media` is 10rem wide and stretches to the row's height, the image covering it (8.5rem tall when stacked); `--accent-0`, `--accent-1`, `--accent-2` fill it `blue`, `coral`, `yellow`.
- `.news-card__title` is `h4`, the link in `heading` turning `blue` on hover; `.news-card__date` is `body` in `text-muted`; the summary is `body`; `.news-card__link` is a `.cta-link`.

## What you provide

- `image`: the item's photo, optional; without one the accent field shows bare. News photos are not in this system.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
