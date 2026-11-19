The front page's two lists below the cards: Latest news on the left and Upcoming events on the right, four rows each. A row is the date, the title and, for an event, its place. No pictures, no summaries, no carousel; the title is the row's link.

Use `ListRow` for each row, four in each `ListRow.List`, and the two lists in `ListRow.Lists`, inside `FrontPage`, after the cards. They render `_includes/home/lists.html`'s own markup: `<section class="lists">`, each list a `<div>` with its heading line (`.lhead`: `h2.serif.ltitle` and the "More" link) and its `.rows`, each row an `<article class="row">`. The title's link has an `::after` that covers the row, so the whole row is the link. For a news article's side rail, which is the same list in small, the site has its own markup (`news-rail`); this component is the front page's.

Which items show is the site's business, not the component's. The site lists the four newest news items dated no later than the build, and upcoming events soonest first, with past events in their place when none are upcoming; `assets/js/home-events.js` redoes that split on the reader's own date. Pass the rows you want shown.

## What you provide

- `ListRow`:
  - `date`: the item's date, ISO ("2026-11-20"). It shows as lists.html writes it: the month's short name ("Nov") over the day without a leading zero ("20"). For an event the site writes a range when the event runs over several days ("Dec" over "7–8"); the component shows the start date only.
  - `title`: the item's title.
  - `href`: the item's page, or its `external_url` when it has one (the site opens that in a new tab).
  - `place` (optional): for an event, its location in `.where`. The site adds " · " and the year when the event is not in the build's year ("Bristol, UK · 2027"); pass that text as you want it shown. Left out, as for news, there is no `.where`.
- `ListRow.List`: `title` ("Latest news", "Upcoming events"); `moreHref`, the news page or the events page; `moreLabel`, the word "More" leaves out ("news", "events"), which goes in a visually hidden span straight after "More", so the link reads "More news". The rows are its children.
- `ListRow.Lists`: the two lists, news first.

There are no pictures to pass. The arrow disc is `ArrowDisc`, drawn inline.

## The values it draws

- `.lists` is two columns `list-gap` apart, `section-space` below the cards, `lists-bottom` above the footer, padded to `page-edge`; set in `small`. Below 900px (`bp-lists`) the lists stack, `list-gap-stacked` apart.
- `.lhead` holds the heading and "More" on one line, 14px above the rows. `.ltitle` is `list-heading` in the serif and `heading`.
- `.more` is `label` in `text`, no underline: "More", a 28px dotted `sky` line (`.more__dots`, a dot `line-dot-page` high every `line-dot-spacing`) that turns solid on hover and on keyboard focus, and the arrow disc (`.go`, `disc-arrow-sm`).
- `.row` is a grid: a 46px date column, the title, 16px apart, 10px above and below. A `border` hairline is above each row, and `.rows` closes the list with one below the last.
- `.date` is the month in `eyebrow` and `text-muted` over the day in `numeral` and `heading`. `.row__title` is `row-title` in `heading`, its words carrying the dotted `sky` link underline at `line-underline-offset-title`, solid on hover and on keyboard focus. `.where` is `caption` at 700 in `text-muted`.
