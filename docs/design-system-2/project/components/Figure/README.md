A picture in the reading column. Two forms: the content figure, used in prose and in news, which is square, framed by one `border` hairline, with the caption under it closed by another (no tinted panel, no radius, no shadow); and the small figure floated beside a section on the pages not yet redone, which keeps the site's tinted panel.

Pass `src` (the URL of your upload of a screenshot, a photo, a diagram or an illustration), `alt`, and, for the content figure, a `caption`. `variant="panel"` is the small one, floated with `float="right"` or `"left"`. On the site, a section page renders both from front matter (`_includes/page-sections.html`, the content figure through `_includes/figure`), and a news post turns a standalone image with a title into a captioned content figure (`_plugins/news_figures.rb`; the title becomes the caption).

- `.section-figure` is the content figure: no wider than `content-width`, 1.75rem below the text and 1.5rem above what follows. The image is full width in a 1px `border` frame.
- `figcaption` is 15px (0.9375rem) Nunito Sans in `text`, line height 1.5, left aligned, 0.6rem under the frame and 0.7rem above its closing `border` hairline.
- In a news article (see NewsArticle) the figure reaches 2rem past the text on each side from 48rem; the caption keeps the text's width.
- `.page-section__figure` is the small one, as the site draws it: 13.5rem wide on a `surface-tint` panel, padded 1rem, 0.9rem corners, with a soft shadow (`heading` at 4%, then `blue` at 20% falling 6px). `--right` or `--left` floats it from 900px, 2rem from the text and 1.25rem above what follows; below 900px it centres.

## What you provide

- `src` and `alt`: your own screenshot, photo or diagram, or an illustration from `assets/Illustrations` or `assets/unDraw` in the accent of the section around it.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
