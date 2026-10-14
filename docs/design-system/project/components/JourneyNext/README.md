The "Next step" block at the foot of a page that is one step in a journey section: a coral number beside the next step's title, so the reader recognises it from the hub.

On the site it is rendered from the hub's step list: the step after the current page, plus a quieter "After that:" line when one more follows. Pass the next step's `number`, `title`, `body` and `link`, and `after` (number, title, href) when one more step follows. Render nothing on the last step.

- `.journey-next` sits above a `border` top rule with `space-48` margin and `space-32` padding, capped at `content-width`; the ContactBlock follows it.
- `.journey-next__label` is `label-small` in `text-muted`.
- `.journey-next__number` is `numeral` at 36px in `coral`, on the baseline of the title from `bp-sm`, above it below.
- `.journey-next__title` is `h3`; `.journey-next__body` is `body`, at most `measure`; the link is the ActionLink.
- `.journey-next__after` is `small` in `text-muted` with the following number in 800 and the title underlined.
