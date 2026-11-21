An in-page contents list under the title of a long content page, generated from the headings: a small "Contents" heading over one row of the section links, a small grey dot between them.

Pass the page's headings as `items` (label, and the anchor as href). Pages opt in with `toc: true` in front matter and name the list with `toc_label`; `title` defaults to "Contents". Mount it straight under the page's title, above the first paragraph.

- `.content-page__toc` has no panel: no tint, no border, no radius. It sits `space-16` under the title and `space-32` above the text, capped at `content-width`.
- `.content-page__toc-title` is the eyebrow: `eyebrow` (11px at 700), uppercase, 0.12em tracking, in `text-muted`, `space-8` above the row.
- The list is the site generator's `ul.toc__menu` (`_includes/toc.html`), laid out as one row that wraps, `space-8` between wrapped rows. The links are running-text links (see Link), bold with the dotted `sky` underline, at `label` size (14px at 700) with a line height of 1.6.
- Between two links, 24px apart (`--toc-gap`, `space-24`), is a 4px dot in `text-muted`, centred in the gap. Each dot is its item's `::before`, never part of a link. The list is pulled left by one gap and clipped just past the dot, so the first item of every row, the first row's and each wrapped row's, starts without one.
- There is no current mark: the list does not follow the reader's place on the page.
- Only the top level shows. A sub-list (a third heading under a second, when the generator nests one) is hidden, so the row stays one row of sections.
