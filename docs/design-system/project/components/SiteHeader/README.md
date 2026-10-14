The sticky site header: the brand name with its subtitle on the left, the primary navigation on the right, on a translucent white bar.

Use it once, at the top of every page. Pass the nav `items` (label, href) and mark the current section `active` (it takes `is-active`); `name`, `subtitle` and `href` default to the site's brand. The active item takes the `surface-tint` tab fill, and the SectionSubnav below continues the same tint so the two read as one tab.

- `.site-header` is `position: sticky; top: 0`, `surface`, with a `border` bottom rule.
- `.site-header__name` is `label` at 800; `.site-header__subtitle` is `small` in `text-muted`. Hovering the brand turns it `blue` and underlines it.
- `.site-nav__item a` is `label` at 500, `text-muted` at rest; on hover it turns `blue` and a 4px `blue` bar grows from the centre under it (0.2s). The bar is the site's one animated hover.
- The row wraps: on narrow screens the nav drops under the brand with a `space-16` gap. There is no hamburger menu.
