The metadata near the top of an event page: label and value rows for the date, the location and the like. There is no panel: the rows sit between hairlines. It comes after the short summary and before the body.

## What you provide

- `rows`: label and value pairs. A value may be an element carrying a link, such as the venue.

The same rows appear on the event's ArchiveCard. Here they stand alone. There are no pictures to pass.

## The values it draws

- `.event-details` is capped at `content-width`, `space-32` above and below. It has a `border` hairline above the first row and below the last. There is no tint, padding or radius.
- `.event-details__row` is an 8rem / 1fr grid, `space-16` apart, with its label and value on one baseline.
  - Rows are 10px above and below and divided by `border` hairlines.
  - At 600px and below, each row stacks, `space-4` apart.
- `.event-details__label` is `label` (700) in `text-muted`. `.event-details__value` is `body` in `text`.
- Links in a value are Links: `text` colour, with a dotted `sky` underline that turns solid on hover and focus.
