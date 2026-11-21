The front page's note brought to content pages and directory hubs: one timely message, such as a position statement, an outage or a deadline. Use one per page, and only while the news is timely. The front page itself uses `Note`.

It is the note's paper form at every width: the text on `paper` under `shadow-note`, the tab at its lower left, the dotted `blue` line along the tab from the `coral` corner node to a ring node, and the `blue` run on to the corner. With a link the whole postit is one link and carries the arrow disc on the corner. Without one it is a notice that leads nowhere, and carries the coral exclamation disc there instead: the arrow disc marks what leads somewhere, the exclamation disc a notice that leads nowhere. The tab, the dotted line and the corner node are drawn by the same code as `Note`'s. The site's own postit markup (`_includes/postit.html`) takes this form when its pages are redone.

## What you provide

- `title`: the message's name ("Script selector is offline").
- `eyebrow` (optional): one to three words, in sentence case ("Outage"). Without it there is no eyebrow.
- `body` (optional): one or two sentences. Without it there is no body paragraph.
- `link` (optional): `{ href, label, external }`. With an `href` the postit is one link (`<a class="postit">`) and carries the arrow disc; `label` is the text on the tab ("Read our letter"), and without it the tab is empty. Without an `href` the postit is an `<aside class="postit">` with no label, and the exclamation disc in the arrow disc's place.
- `inline` (optional): the content-page form, which floats right of the text from 768px. Without it the postit is the directory hub's, which the hub pins top right of its hero.

There are no pictures to pass. The tab, the dotted line and either disc are inline SVG.

## The values it draws

- `.postit` is 16.25rem wide, `space-32` below. `.postit__paper` casts `shadow-note` as a drop shadow, so it follows the tab. `.postit__note` is `paper`, padded by `note-padding`.
- `.postit__tab` is the paper's tab, 169 by 30px. Over it, `.postit__route` is the dotted `blue` line (`line-dot-note`, `line-dash-note`) from the `coral` corner node to a `node-ring` ring node; `.postit__run` is the `line-page` `blue` run to the corner, and `.postit__disc` is the arrow disc (`disc-arrow`) on the corner, standing out past the paper's edge by half its width.
- Without a link, `.postit__disc.postit__disc--notice` is the exclamation disc in the same place and at the same size: a `coral` disc with a white "!", drawn as a round-capped stem and a dot (no text), `aria-hidden` like the arrow disc. The notice is read from the eyebrow and title; the disc only shows it.
- Type: `.postit__eyebrow` is `note-label` in `coral`; `.postit__title` is `note-label` in `heading`; `.postit__body` is `note-text` in `heading`; `.postit__link`, the tab's label, is `note-label` in `blue`.
- `.postit--inline` floats right from 768px with `space-32` between it and the text.
