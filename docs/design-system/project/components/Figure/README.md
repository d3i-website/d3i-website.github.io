Illustrations and diagrams in the reading column, each on a `surface-tint` panel with the brand's blue-tinted shadow. Three sizes: a small floated panel beside a section, a full-width content figure with a caption, and a two-up media grid.

Pass `src` (the URL of your upload of an illustration from `assets/Illustrations`, or a diagram), `alt`, and, for the content figure, a `caption`. `variant="panel"` is the small panel, floated with `float="right"` or `"left"`; `Figure.MediaGrid` takes two `images`. On the site, pages author figures in front matter and the template renders them after the prose.

- `.page-section__figure` is the small one: 13.5rem wide, padding `space-16`, `radius-lg`, `shadow-md`; `--right` or `--left` floats it from `bp-lg` with a `space-32` text gap.
- `.section-figure` is the content figure: up to `content-width`, padding `space-24` (`space-32` from `bp-md`), `radius-lg`, `shadow-md`; the image is `radius-md` on `surface`.
- `figcaption` is `caption` (Nunito Sans italic) in `text-muted`, centred, `space-16` below the image.
- `.media-grid` lays two images side by side from `bp-md`, `space-16` apart, each `radius-lg` on `surface-tint`.

## What you provide

- `src` and `alt`, or `images` for `Figure.MediaGrid`: an illustration from `assets/Illustrations` or `assets/unDraw` in the accent of the section around it, or your own diagram.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
