The left-hand section navigation on content pages: a soft panel with the section's name as its title and the section's pages listed under a thin rail.

Pass the section as `title` and `href` and its child pages as `items` (label, href), marking the current page `active` (it takes `is-active`). A page may carry in-page anchors as `sections`, the third level (`.section-nav__sublink`). The panel sits in the `sidebar-width` column from `bp-lg` and above the content below that.

- `.sidebar-panel` is `surface-tint`, 1px `border`, `radius-lg`, padding `space-16`.
- `.sidebar-panel__title` is `h4` in `text`; `.sidebar-panel__body` is indented `space-12` behind a `border` left rail.
- `.sidebar-panel__link` is `label-small` at 600 in `text`, `radius-md`; hover fills `surface-tint`, the active page fills `surface-strong`.
- `.section-nav__sublink` is `label-small` at 600 in `text-muted`, `coral` on hover, behind a `border` rail.
- On the site the same panel also lists recent items (`.sidebar-panel__item` with title, meta and an italic summary), divided by `border` rules; the component does not render that form.
