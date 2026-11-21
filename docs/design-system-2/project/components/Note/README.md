The front page's note: one timely message, such as a position statement, that lies on top of the band. It is not part of the band; the band is complete without it, and the front page can switch it off.

Use at most one, as `Band`'s children, inside `FrontPage`. It renders `_includes/home/note.html`'s own markup. From 1280px it hangs from the band's anchor on paper with a tab; below 1280px it is plain text in the niche under the band's shallow side. Both forms are in the markup, and the stylesheet shows the one that fits the width. The site renders the note only when it is enabled and has a non-empty title; the component always renders what it is given, so the caller decides whether to mount it.

## What you provide

- `title`: the message's name, on one line ("GDPR Omnibus Proposal"). On the site it is `index.md`'s `postit.title`.
- `eyebrow` (optional): one to three words ("Position"). Without it there is no eyebrow.
- `body` (optional): one sentence. Without it there is no body paragraph. Below 1000px it is not shown.
- `link` (optional): `{ href, label }`. With an `href` the whole note is one link (`<a class="note">`) and carries the arrow disc: beside the text below 1280px, and on the paper's corner from 1280px. `label` is the text on the tab ("Read our letter"); without it the tab is empty. Without a `link` the note is a plain `<div class="note">` with no disc and no label, since there is nothing to go to.

There are no pictures to pass. The tab, the dotted line along it and the discs are inline SVG.

## The values it draws

- **The anchor**: from 1280px the note hangs from the band's anchor (`band-anchor-x`, `band-anchor-y`), which is the centre of its arrow disc, and grows upwards with its text. It is `band-corner-x` wide. Its `coral` corner node is `band-corner-x` left of the anchor and `band-corner-y` below it.
- From 1280px: `.note__body` is `paper` under `shadow-note`, padded by `note-padding`. `.note__tab` is the paper's tab (`note-tab-width` by `band-corner-y`). Along it, `.note__route` is the dotted `blue` line (`line-dot-note`, `line-dash-note`) from the `coral` corner node to a `node-ring` ring node. `.note__run` is the `line-page` `blue` run to the corner, and `.note__disc` is the arrow disc (`disc-arrow`) on the corner. `.note__link` is the tab's label, in `note-label` and `blue`.
- Below 1280px: no paper and no line. The eyebrow and title, the body and `.note__go` (the arrow disc) sit in a row in the niche, starting at `page-edge`, `note-gap` apart (`note-gap-sm` below 600px). The niche is `band-niche-lg`, `band-niche-md` or `band-niche-sm` wide.
- Type: `.note__eyebrow` is `note-label` in `coral`; `.note__title` is `note-label` in `heading` and does not wrap; `.note__text` is `note-text` in `heading`.
