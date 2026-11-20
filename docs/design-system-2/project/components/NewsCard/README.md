The news page, and a news item as a list row. `NewsCard.Index` is the news page (`/news/`): the newest item is the lead story, large, with its picture bleeding; the rest form a grid three across. Each picture is the item's social-sharing card. An item without one shows its date on a `sky` node. `NewsCard` on its own is the row form, for a list elsewhere: the front page's list row with the summary kept. The front page itself lists news with `ListRow`, not with this card.

## What you provide

- `NewsCard.Index` takes `items`, newest first, so the first item is the lead story. Each item has:
  - `title` and `date`. The date is ISO (`2026-11-09`); the site's folded form ("November 9, 2026") also reads.
  - `href`: the item's own page or an external one. Set `external` for an external page: it opens in a new tab, and the item says where it leads ("On odissei-data.nl", from the address).
  - `image` and `image_alt`, optional: the item's `image` front-matter field. That field is meant to be the social-sharing card, 1200 × 628 (1.91:1); `assets/News/export-study-crate-card.webp` is one. Until every item has a proper card, other pictures are cropped to that shape.
  - `summary`, optional. Only the lead story shows it.
- `NewsCard` (the row) takes `title`, `date` (ISO, or the folded form), `href`, `external` and `summary`. `NewsCard.List` holds the rows.
  - `image`, `accent` and `linkLabel` belonged to the old boxed card. They are deprecated and draw nothing: the row has no picture and no "Read more".
- The title is always the link. The picture links to the same place, but it is hidden from screen readers and skipped by the keyboard, as on the site.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews. The preview's pictures are in `assets/News` (the lead's card and four photos) and `assets/Illustrations` (`social-ideas.svg`).

## The values it draws

The news page (`.news-index`, capped at `content-width`):
- `.news-lead`: the lead story. It is a grid, 7fr picture to 5fr text, `space-32` apart and centred on each other, with a `border` hairline 36px below it.
  - Its date is the eyebrow (`eyebrow`, uppercase, `text-muted`).
  - Its title is `title-md` in the serif (provisional), `space-8` above and `space-12` below.
  - Its summary is `body`.
- `.news-grid`: the other items, three across, 36px between rows and 28px between columns, `space-32` below the lead.
  - Each item is its picture, then the eyebrow date 14px below it, then the title in `list-heading`, 6px below.
- `.news-card__media`: the picture box, with an aspect ratio of 1200 / 628 (1.91:1). The picture fills it with `object-fit: cover`, at `object-position: 50% 30%`, so faces stay in. It has no frame: the picture bleeds.
- `.news-card__media--date`: the box of an item without a picture. A 1px `border` hairline frames it, and in its centre are a `node-edge` dot in `sky`, the month name (`eyebrow`, `text-muted`) and the day (`title`, the serif, in `heading`).
- `.news-card__where`: "On …" for an external item, in `caption` 700 and `text-muted`.
- Below 768px the lead stacks (picture first, `space-16` apart, the title `title-sm`) and the grid is one column, 28px apart.

The row (`.news-card--row` in `.news-list`, capped at `content-width`):
- A 46px date column, then the body, `space-16` apart.
  - The month (`%b`) is `eyebrow` in `text-muted`, over the day in `numeral` (the serif) in `heading`.
- The title is `row-title` in `heading`, and the summary is `small` in `text`.
- Rows sit between `border` hairlines, `space-12` above and below. There is no box, shadow, accent field or "Read more".

Both forms:
- The title is an `<a><span>`: the span carries the dotted `sky` underline (`line-underline`, offset `line-underline-offset-title`), which turns solid on hover and focus.
- The link's `::after` covers the whole item, so the item is one link. Keyboard focus draws a 2px `blue` outline round it.
