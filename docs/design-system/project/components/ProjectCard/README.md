A completed study on the "Completed projects" page: title, investigators, a paragraph, then a grid of labelled details and a collapsible reference list. Cards stack in one column, divided by hairlines, not boxed.

Pass `title`, `investigators` (names with their profile `href`) and `institution`, the `summary`, `details` for whichever fields apply (Data collection, Recruitment, Instructions, Ethics, Software, Processing, Data, Funded by) and the `references`. An optional `image` sits under the title at `radius-sm`. Stack the cards in `ProjectCard.List`, whose `attribution` closes the list.

- `.project-card` has `space-24` vertical padding and a `border` bottom rule; the last card has none.
- `.project-card__investigators` is `small` in `text-muted`; `.project-card__summary` is `small` in `text`.
- `.project-card__details` is a 7rem / 1fr grid in `small`: `dt` 700 in `text`, `dd` in `text-muted`.
- `.project-card__refs` is a `details` element in `small`: the `summary` is 700 in `text`, the list indented `space-24`.
- The list closes with `.project-list__attribution` (`small` in `text-muted`) crediting the illustration sources.

## What you provide

- `image`: optional, the study's own picture. Completed-project images are not in this system.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
