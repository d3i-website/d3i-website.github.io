The team page: a grid of centred cards, each a round photo, a name and small tag pills, with a row of filter chips above that JavaScript reveals.

Pass the `members` (name, profile `href`, `photo`, `tags` from the controlled vocabulary in `_data/team_tags.yml`) and the vocabulary as `tags`, in display order. Two columns, three above 768px. Clicking a chip or a pill filters the grid; on the site, without JavaScript, the chips stay hidden and every card shows.

- `.people-grid__card` has `space-16` by `space-12` padding and `radius-lg`; hover fills it `surface-tint`.
- `.people-grid__photo` is a 5.5rem circle, `object-fit: cover`, on `surface-strong`. A member without a photo renders no image, on the site and in the component; this preview passes a blank image so the circle stands in for the missing files.
- `.people-grid__name` is `label-small` in `heading`; the link has a `border-strong` underline and turns `blue` on hover. `.people-grid__role`, when used, is `small` in `text-muted`.
- `.people-grid__chip` is `label-small` in `heading` on `surface`, a 1px `border-strong` outline, `radius-pill`; hover turns it `blue` with a `blue` outline; `is-active` fills it `blue` with `on-accent` text.
- `.people-grid__tag` is `eyebrow` size at 700, sentence case, in `text-muted` on `surface-strong`, `radius-pill`; hover fills it `blue` with `on-accent` text.

## What you provide

- `photo` per member: a portrait you hold. Team photos are not in this system; a member without one shows the empty circle, as on the site.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
