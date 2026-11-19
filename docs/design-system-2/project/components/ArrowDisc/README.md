The arrow disc: a `blue` disc with a white arrow. It marks the few things on the front page that lead somewhere as a whole. Nothing else carries it; a card or a row is a link through its title.

Put it at the end of the link it marks, inside `FrontPage`, which styles it. On the site it ends "More" on each list's heading line (`_includes/home/lists.html`'s `svg.go`). The note draws its own, larger disc, so do not put an ArrowDisc in a `Note`.

## What you provide

- `label` (optional): text for screen readers only, in a `<span class="visually-hidden">` just before the disc. Use it for the words the visible label leaves out: after "More" it is " news" or " events", so the link reads "More news". The disc itself is `aria-hidden`.

There are no pictures to pass. The disc is inline SVG.

## The values it draws

- `.go` is `disc-arrow-sm` (24px): a `blue` circle with a white arrow, round-capped, at stroke 2 in the disc's 36-unit drawing. It does not shrink in a flex row, and nothing clips its edge.
- The note's disc is the same drawing at `disc-arrow` (36px), with a 1.8 stroke.
- `.visually-hidden` is clipped to nothing and takes no space.
