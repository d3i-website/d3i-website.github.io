The "Next step" block at the foot of a page that is one step in a journey section (Software, Prepare a study). The next step leads somewhere as a whole, so its title is the block's link and the step ends in the arrow disc, as the note does. There is no separate action link.

On the site it is rendered from the hub's step list: the step after the current page, plus a quieter "After that:" line when one more follows. Render nothing on the last step.

## What you provide

- `number`: the next step's two digits, as on the hub ("02").
- `title`: the next step's title.
- `body` (optional): one or two sentences.
- `href`: the next step's page; `external` opens it in a new tab. The title links to it, its link's `::after` covers the step, and the step ends in the arrow disc. Without `href` there is neither link nor disc.
- `after` (optional): `{ number, title, href }` for the step after that.
- `label` (optional): the eyebrow; default "Next step".

There are no pictures to pass. The disc is inline SVG.

## The values it draws

- `.journey-next` is capped at 54rem, `space-48` below the content, opened by a `border` hairline with `space-24` above the label.
- `.journey-next__label` is `eyebrow` in `text-muted`, uppercase at 0.12em.
- `.journey-next__step` is a row: the number, the text, and `.journey-next__disc`, the arrow disc at `disc-arrow` (36px), centred, `space-24` apart. Below 600px the number and text sit at the top, `space-16` apart, and the number is `title-sm`.
- `.journey-next__number` is `title` in the serif (provisional) and `heading`.
- `.journey-next__title` is `card-heading` in `heading`; its words carry the dotted `sky` link underline at `line-underline-offset-title`, solid while the step is hovered or the link has keyboard focus. `.journey-next__body` is `body` in `text`, at most 36rem.
- `.journey-next__after` is `small` in `text-muted`, `space-16` below the step: the number in 800, then the title as a link in `text`.
