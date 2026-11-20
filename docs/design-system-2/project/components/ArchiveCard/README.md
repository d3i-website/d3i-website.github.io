An event or archive entry as a list row, on the events and archive pages. The row has the date column, then the title, the place, a summary and labelled detail rows. The title is the entry's link. A featured entry (the one that is next up) carries a `coral` node under its date. Stack the rows in `ArchiveCard.List`, under an optional heading.

## What you provide

- `title`.
- `date` and `endDate`:
  - Both are ISO (`2026-12-07`). A later end day makes a range, "7–8", and the months join too when they differ: "Sep–Oct" over "30–2".
  - `date` also reads the site's folded forms: "October 1-2, 2026" and "September 30 - October 2, 2026".
  - A date it can't read ("Spring 2027") has no date column; it stays in the meta line, before the place.
- `location`: the place, under the title ("Webinar", "Jaarbeurs, Utrecht").
- `summary`, and `details`: label and value rows ("When", "Where"). A value may carry a link.
- `href`: the entry's page, or its external site with `external`. It makes the title the link. Without it, the title is plain text.
- `actions` (optional): further links, such as "Call for papers" (`label`, `href`, `external`). They're drawn as ActionLink's compact form: the label, the dotted line and the small arrow disc.
- `featured`: marks an upcoming or highlighted entry.
- `hrefLabel` was the old "View details" label. It's deprecated and draws nothing, since the title is the link.
- `ArchiveCard.List` takes an optional `heading` ("Next up", "Also upcoming").

There are no pictures to pass.

## The values it draws

- `.archive-card` is a grid: a 46px date column, then the content, `space-16` apart, 14px above and below. Rows sit between `border` hairlines: `.archive-page__list` closes the list with one. There is no box, tint or shadow.
- `.archive-card__date`: the month (`%b`) is `eyebrow` in `text-muted`, over the day in `numeral` (the serif) in `heading`.
  - For a featured entry (`.archive-card--featured`), a `node` dot in `coral` sits `space-8` under the day.
- `.archive-card__title` is `row-title` in `heading`. When it is a link, the link's span carries the dotted `sky` underline, which turns solid on hover and focus. The link's `::after` covers the row, and keyboard focus draws a 2px `blue` outline round it.
- `.archive-card__meta`, the place, is `caption` 700 in `text-muted`. `.archive-card__summary` is `small` in `text`, 6px below it.
- `.archive-card__details` is `small`, `space-8` below the summary. Each row is a 4rem / 1fr grid; `dt` is 700 in `text-muted`.
- `.archive-card__actions` sits in the content column, `space-8` below, its links `space-24` apart. It's lifted above the title's link area, so the actions stay clickable.
- `.archive-page__heading` is `list-heading` in the serif (provisional), 14px above its list. Sections are 40px apart.
