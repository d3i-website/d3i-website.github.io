The team page: a list in two columns, one person per row: a small round portrait beside the name and the tags, the rows between hairlines. Filter tabs sit above it on a hairline. JavaScript reveals them on the site.

Clicking a tab or a tag filters the list. On the site, without JavaScript, the tabs stay hidden and everyone shows. The hairlines close under whichever rows a filter leaves.

## What you provide

- `members`: each with `name`, a profile `href`, a `photo` and `tags`. The tags come from the controlled vocabulary in `_data/team_tags.yml`.
- `tags`: the vocabulary for the tabs, in display order.
- `photo` per member: a portrait you hold. Team photos are not in this system.
  - A member without a photo renders no image, on the site and in the component. The name and tags keep their column, so the list stays aligned.
  - The preview passes a blank image, so the empty circle stands in for the missing files.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.

## The values it draws

- `.people-grid` is two columns, `list-gap` apart, capped at 54rem, 20px under the tabs. Below 768px it is one column.
- `.people-grid__card` is a row: a 56px column for the portrait, then the name over the tags, `space-16` apart, 10px above and below.
  - Each row has a `border` hairline above and below. The two overlap by 1px (`margin-bottom:-1px`), so rows share one line and the last row shown is closed.
  - There is no box, tint or hover fill.
- `.people-grid__photo` is a 56px circle (`radius-circle`), `object-fit: cover`, on `surface-strong`, spanning both lines.
- `.people-grid__name` is `label` (14px, 700) at leading 1.35, in `heading`. Its link is a Link: the name's colour, a dotted `sky` underline that turns solid on hover and focus.
- `.people-grid__tags` are `caption` at 700 in `text-muted`, divided by a middle dot, with no pills. A tag that filters gains the Link's dotted `sky` underline on hover and focus, and turns `text`.
- `.people-grid__role`, when used, is `small` in `text-muted`.
- `.people-grid__filters` are tabs on a `border` hairline, 22px apart: `label` in `nav-text`, 8px above and 10px below.
  - Hover and focus turn a tab `blue` and grow the header's 4px `blue` bar from the centre over 0.2s, standing on the hairline.
  - The active tab is `heading` and keeps the bar.
  - The motion stops under `prefers-reduced-motion`.
