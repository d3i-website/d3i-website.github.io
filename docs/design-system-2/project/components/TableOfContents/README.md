An in-page contents list at the top of a long content page, generated from the headings. A soft panel with a bold title over a bulleted list of the headings.

Pass the page's headings as `items` (label, and the anchor as href). Pages opt in with `toc: true` in front matter and name the panel with `toc_label`; `title` defaults to "Contents".

- `.content-page__toc` is `surface-tint` (the site's is a shade lighter, #fafbfd, which has no token), a 1px hairline of `heading` at 6%, padding 1rem by 1.1rem, 1.5rem above what follows, capped at `content-width`.
- `.content-page__toc-title` is Nunito Sans 800, 0.6rem above the list.
- The list is the site generator's `ul.toc__menu` (`_includes/toc.html`): a plain bulleted list, so the links are running-text links (see Link), bold with the dotted `sky` underline.
