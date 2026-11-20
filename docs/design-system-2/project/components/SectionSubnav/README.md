The strip of a section's inner pages directly under the header, on hub pages that have no sidebar. It takes the header's look: white over a hairline, the links in the header's grey, and the current page on the header's 4px `blue` bar.

## What you provide

- `label`: the section's name, used as the nav's accessible name.
- `items`: the section's pages (`label`, `href`). Mark the current one `active`. It takes `is-active` and `aria-current="page"`.

Keep it to one line of five or six items; a longer section gets a SidebarPanel instead. It is centred, and wraps on narrow screens.

There are no pictures to pass.

## The values it draws

- `.section-subnav` has no fill, so the page's `surface` shows, and is closed by a 1px `border` hairline.
- `.section-subnav__list` is centred, its items 28px apart; rows wrap with no gap between them.
- `.section-subnav__item a` is `small` at 600 in `nav-text`, 12px above and 11px below.
- On hover and on keyboard focus a link turns `blue` and grows a 4px `blue` bar from the centre (`scaleX` 0 to 1, 0.2s ease-in-out), standing on the hairline. With `prefers-reduced-motion: reduce` the bar appears without the motion.
- The current page is `heading` and keeps the bar.
