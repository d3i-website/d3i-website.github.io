The left-hand section navigation on content pages. There is no panel: the section's name is its title, and its pages are nodes on a `blue` line that runs between two ring nodes. The current page is the one `coral` node.

The panel sits in the `sidebar-width` column from 900px, and above the content below that.

## What you provide

- `title` and `href`: the section's name and its landing page.
- `items`: the section's pages (`label`, `href`). Mark the current page `active`. It takes `is-active` and `aria-current="page"`. One page is current: if several are marked, the first is.
- `sections` on an item (optional): its in-page anchors, the third level (`.section-nav__sublink`).
- `label` (optional): the nav's accessible name; the default is `title`.

There are no pictures to pass. The line and the nodes are drawn by `bundle.css`.

## The values it draws

- `.sidebar-panel` has no fill, border or padding.
- `.sidebar-panel__title` is `list-heading` in the serif (provisional), in `heading`, `space-12` above the line.
- `.sidebar-panel__body` holds the line: `line-page` in `blue`, 4px in from the left, with the pages 24px to its right. A `node-ring` ring node (`surface` fill, 1.4px `blue` edge) closes each end.
- `.sidebar-panel__link` is `small` at 600 in `text`, 6px above and below. Its node is a `node` dot in `blue`, centred on the line. On hover and on keyboard focus the text turns `blue`.
- The current page (`.is-active`) is `heading` at 800, and its node is a `node-edge` dot in `coral`.
- `.section-nav__sublink` is `caption` at 700 in `text-muted`, `space-12` in from the page's text and without a node. It turns `blue` on hover.
- On the site the same panel can also list recent items: `.sidebar-panel__item` with a title, meta and an italic summary, divided by `border` rules. The component does not render that form.
