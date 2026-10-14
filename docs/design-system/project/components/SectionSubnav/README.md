The thin strip of a section's inner pages, directly under the header, on hub pages that have no sidebar.

Pass the section's name as `label` and its child pages as `items` (label, href); mark the current one `active` and it takes `is-active`. Centre-aligned, wraps on narrow screens.

- `.section-subnav` is the `surface-tint` tab band, no border, matching the active main-nav item above it.
- `.section-subnav__item a` is `small` in Nunito, `text-muted`; hover turns it `coral`; the active item is `text`.
- Keep it to one line of five or six items. Longer sections get a SidebarPanel instead.
