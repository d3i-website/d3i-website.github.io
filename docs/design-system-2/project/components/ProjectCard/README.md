A completed study on the "Completed projects" page, drawn as a dossier. A side column holds the study's picture at its own shape, uncropped, with the key facts under it, the year in the serif. The study's text sits beside it: the title, the investigators, a paragraph, labelled details and a collapsible reference list. Stack the cards in `ProjectCard.List`. Its `attribution` closes the list.

## What you provide

- `title`.
- `investigators`: names, each with an optional profile `href`. They're joined as "A, B and C", then `institution`.
- `summary`.
- `image` and `image_alt`: the study's picture, its `image` field in `_data/completed-projects.yml`.
  - The site's pictures are wide banners, from 2.6:1 to 5.2:1. The card shows each at its own shape.
  - `image` as `{ src, alt }` is the old form. It's deprecated, but it still works.
- `year`: the first fact, labelled "Year", with its value in the serif.
- `facts`: the other key facts, as label and value: "Collected", and "Software" when there is one.
- `details`: the other fields that apply, in the site's order: Recruitment, Instructions, Ethics, Processing, Data, Funded by. Leave out what `facts` already shows. A value may carry links.
- `references`, collapsed under "References" (`referencesLabel`).
- Without a picture, a year or facts, the side column is left out and the text takes the full width.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews. The preview's three banners are in `assets/Projects`.

## The values it draws

- `.project-card` is a grid: a 248px side column, then the text, 36px apart.
  - Its padding is `space-32` above and below, none above the first card.
  - A `border` hairline closes each card. The last one also divides the list from its attribution.
  - Below 768px it is one column, with the side column first and 18px below it.
- `.project-card__image` is the full width of the column, `height: auto`, framed by a 1px `border` hairline. It is never cropped: there is no `object-fit`.
- `.project-card__facts` sits 14px under the picture. Each fact is a row between `border` hairlines, 7px above and below, in `small`.
  - The label (`dt`) is 700 in `text-muted`, on the left. The value is in `heading`, on the right.
  - `.project-card__year`'s value is `title-sm` in the serif (provisional). The label sits on its baseline.
- `.project-card__title` is `card-heading` in the serif (provisional), in `heading`, 6px above the investigators.
- `.project-card__investigators` is `small` in `text-muted`, `space-12` above the summary. Its links are Links.
- `.project-card__summary` is `small` in `text`, capped at 40rem, 14px above the details.
- `.project-card__details` is a 7rem / 1fr grid in `small`: `dt` 700 in `text-muted`, `dd` in `text`.
- `.project-card__refs` is a `details` element in `small`. Its `summary` is `label` in `text`, and the list is indented `space-24`.
- The list closes with `.project-list__attribution`, `caption` in `text-muted`, crediting the illustration sources.
