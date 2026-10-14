The homepage's three "movements": one wide card per destination, pairing a tinted illustration panel with an eyebrow, a heading, a sentence and a link, all in that item's accent. On the live site the cards run in a peek carousel; without JavaScript they stack.

Pass, per item, `eyebrow`, `heading`, `image` (an illustration from `assets/Illustrations`), a `body` of one or two sentences, `link`, and `accent`, which picks the accent and tint pair: `primary` is `blue` with `blue-tint`, `secondary` is `coral` with `coral-tint`, `tertiary` is `yellow-text` with `yellow-tint`; the homepage runs them in that order. The site sets the pair as inline styles from front matter; the component binds them to the tokens. Hold the cards in `MovementCard.Group`: stacked by default, or `wide` for the image-left layout with one card in view (`active`). The carousel's arrows and dots are the site's JavaScript and not part of the component.

- `.movement-card` is `surface`, 1px `border`, `radius-xl`, `shadow-lg`, padding `space-24`; enhanced and wide it is a 40% / 1fr grid with a `space-32` gap and `space-32` by `space-48` padding.
- `.movement-card__figure` is the tint panel, `radius-lg`, 150px tall (220px wide), the image contained at 138px (188px).
- `.movement-card__eyebrow` is `eyebrow` in the item's text colour; `.movement-card__heading` is `h2` in `heading`, balanced; `.movement-card__body` is `body` in `text`; `.movement-card__link` is `label` at 800 in the same colour.
- Carousel dots are 11px `border-strong` discs; the active one stretches to a 32px pill painted in the item's accent.

## What you provide

- `image`: the item's illustration from `assets/Illustrations`, drawn in the card's accent (on the homepage `social-media-profile.svg`, `experts.svg`, `group-project.svg`).

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
