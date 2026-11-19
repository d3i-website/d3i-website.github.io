A news post as the site lays it out: one 40rem column with the date over the title and the body under them, and the "Latest news" rail beside it. There is no sidebar on a news article.

`D3I.NewsArticle` takes the `title`, the `date` (ISO, `YYYY-MM-DD`), the body as children (or rendered Markdown as `html`, as Prose takes it), the `rail` items and `allHref`, where the rail's "All" goes (the news page). It renders `_layouts/page.html`'s news branch, with the date from `_includes/content-page-intro.html` and the rail from `_includes/news-rail.html`. The body is wrapped in Prose, so put paragraphs, headings and lists in it directly; a picture with a caption is a Figure among them.

- The column is `.content-page--news .content-page__main`, 40rem wide and centred.
- The date (`.content-page__date`) comes first, over the title: 11px Nunito Sans 700, upper case, 0.12em tracking, in `text-muted`, written as "9 November 2026" in a `<time>` carrying the ISO date. The title (`.content-page__title`) is the serif at 420 (provisional), 2rem, 2.4rem from 768px, in `heading`.
- From 48rem a Figure in the body reaches 2rem past the text on each side; its caption keeps the text's width.
- The rail (`.news-rail`) is 15rem wide, 4.5rem from the column, the two side by side from 64rem and centred as a pair. Below 64rem it sits 2.5rem under the article in a column of the same width.
- The rail is the front page's list in small. Its heading "Latest news" is the serif at 22px and 420 (provisional) in `heading`, ending its line with "All" (`label` in `text`), a short dotted `sky` line and the 22px arrow disc. Under it, each row has a `border` hairline above and the last one below: the month (10px caps in `text-muted`) over the day (a 20px serif numeral in `heading`) in a 38px column, then the title at 14.5px, 600, in `heading`, which is the row's link.

## What you provide

- `title`, `date` and the body.
- `rail`: the five newest other news items dated no later than today, newest first, each with `title`, `date` and `href`. Set `external` on an item that links elsewhere (a news item with an `external_url`): it opens in a new tab. The component renders what it is given; with no items the rail is left out.
- `allHref`: the URL of the news page.
- Any Figure in the body takes your own upload, as Figure's README says.
