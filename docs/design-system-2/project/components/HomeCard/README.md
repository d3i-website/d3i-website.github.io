The front page's cards below the band: three borderless, centred cards, one per destination (What is data donation?, Prepare a study, Open-source software). No pictures, no border, no arrow disc; the heading is the card's link.

Use three, in `HomeCard.Grid`, inside `FrontPage`, after the `Band`. They render `_layouts/homepage.html`'s own markup for each of `index.md`'s `movements`: `<article class="cd">` with the eyebrow (`.eb`), the serif heading (`h3.serif.hd`) and the body (`.bo`), in `<div class="cards">`. The heading's link has an `::after` that covers the card, so the whole card is the link and the focus ring goes round all of it. Not for lists of items: news and events are `ListRow`.

## What you provide

- `eyebrow`: one to three words over the heading, written in sentence case ("Learn more"); the style sets it uppercase. On the site it is a movement's `eyebrow`, and the site leaves the eyebrow out when that is empty; so does the component.
- `title`: the heading, a few words ("What is data donation?"). A movement's `heading`.
- `href`: where the card leads. A movement's `link.url`. Without one the heading is plain text and the card leads nowhere, as on the site.
- `children`: the body, one sentence, in `<p class="bo">`. A movement's `body`; left out, there is no body paragraph.

There are no pictures to pass.

## The values it draws

- `.cards` is a grid of three columns `card-gap` apart, `cards-top` below the band and padded to `page-edge` left and right. Below 1000px (`bp-md`) it is two columns `card-gap-md` apart, the third card spanning both; below 600px (`bp-sm`) one column.
- `.cd` is centred text, no border or background. `.eb` is `eyebrow` in `text-muted`. `.hd` is `card-heading` in the serif and `heading`, 10px above and 8px below; its words carry the dotted `sky` link underline (`line-underline` thick, `line-underline-offset-title` below) that turns solid on hover and on keyboard focus. `.bo` is `body` at line height 1.55 in `text`.
