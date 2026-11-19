The sticky site header, as `_includes/site-header.html`: the name with its tagline on the left, the six main links on the right; below 1000px the "Menu" button and its drop-down.

Use it once, at the top of every page. Pass `brand`, `tagline` and the six `links` (label, href) in the site's order, and mark the current section `current` (it takes `is-active`). `menu` picks what the button shows below 1000px: `'closed'` (the default) or `'open'`, the two states `assets/js/site-menu.js` gives it through the button's `aria-expanded`, or `'none'`, the page without JavaScript. From 1000px all three are the same one row. The component renders the state it is given; the clicking, Escape, the tap outside and the close at 1000px are the site's script.

- One row, 58px high at every width: 16px above, a 41px row and a 1px hairline, `heading` at 6%. Sticky, `surface` at 96%, blurred behind.
- `.site-header__name` is 16px at 800 in `ink`; `.site-header__subtitle` is 14px in `nav-text`, 3px under it. The two are one link home; on hover it turns `blue` and underlines.
- From 1000px: `.site-nav__item a` is 15px at 500 in `nav-text`, 14px of padding either side (28px between labels; the last ends on the page edge). On hover and focus it turns `blue` and a 4px `blue` bar grows from the centre (0.2s). The current link has a faint tint behind it, `heading` at 2%, which approximates the site's black at 2%.
- Below 1000px: `.site-header__menu`, "Menu" in `heading`, 15px at 600, with the same bar while hovered or open. The panel is the nav itself, at the header's full width under it, over the page rather than pushing it down: `surface`, `border` hairlines above and below and between the rows, one link per 44px row, the hover bar standing at the row's left end instead of under the label.
- `menu: 'none'`: no button; the links wrap under the name, and the header is 107, 148 and 189px high at 800, 600 and 390px.

The site shows the button only once its head script has turned `<html class="no-js">` into `js`. Here the button stands in for that: `bundle.css` opens the drop-down rules on a nav that follows a `.site-header__menu`, and `'none'` leaves the button out. The nav's id is `site-nav`, as on the site, so mount one header per page.

## What you provide

- `brand`: "datadonation.eu"; `tagline`: "Data donation for research" (left out when empty); `href`: where the name links, `/` by default.
- `links`: Data donation, Prepare a study, Software, Community & Events, News, About D3I (`_data/navigation.yml` `main`).
