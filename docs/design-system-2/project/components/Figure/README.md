A picture in the reading column: square, framed by one `border` hairline, with the caption under it closed by another. There is no tinted panel behind it, no radius and no shadow. Two sizes: the content figure with a caption, and a small panel floated beside a section.

Pass `src` (the URL of your upload of a screenshot, a photo, a diagram or an illustration), `alt`, and, for the content figure, a `caption`. `variant="panel"` is the small one, floated with `float="right"` or `"left"`. On the site, a section page renders both from front matter (`_includes/page-sections.html`, the content figure through `_includes/figure`), and a news post turns a standalone image with a title into a captioned content figure (`_plugins/news_figures.rb`; the title becomes the caption).

- `.section-figure` is the content figure: no wider than `content-width`, 1.75rem below the text and 1.5rem above what follows. The image is full width in a 1px `border` frame.
- `figcaption` is 15px (0.9375rem) Nunito Sans in `text`, line height 1.5, left aligned, 0.6rem under the frame and 0.7rem above its closing `border` hairline.
- In a news article (see NewsArticle) the figure reaches 2rem past the text on each side from 48rem; the caption keeps the text's width.
- `.page-section__figure` is the small one: 13.5rem wide, the image in the same `border` frame; `--right` or `--left` floats it from 900px, 2rem from the text. The site still draws this one on the old tinted panel with a shadow; the system follows the brand book's square frame, and the site is to be brought in line.

## What you provide

- `src` and `alt`: your own screenshot, photo or diagram, or an illustration from `assets/Illustrations` or `assets/unDraw` in the accent of the section around it.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
