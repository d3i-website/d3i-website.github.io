The metadata box near the top of an event page: label and value rows for date, location and the like, on the panel tint.

Pass the detail `rows` (label and value; a value may be an element carrying a link, such as the venue). The same rows appear on the event's ArchiveCard; here they stand alone, after the short summary and before the body.

- `.event-details` is `surface-tint`, `radius-md`, padding `space-4` by `space-24`, capped at `content-width`.
- `.event-details__row` is an 8rem / 1fr grid with a `border` bottom rule (none on the last) and `space-12` vertical padding; below `bp-sm` it stacks.
- `.event-details__label` is `text-muted`; `.event-details__value` is `text`, with links in `blue` and a 1px hover underline.
