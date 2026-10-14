The homepage opener: a composition, not a banner. A pale `blue-tint` disc, clouds and a plane sit behind the headline row; a full-bleed CSS road with fixed-size travellers divides the hero from the page.

Use it on the homepage only. Pass `title`, `subtitle` (the one-sentence excerpt), one `cta`, and optionally `postit` (a Postit's props) for the right-hand side. `sprites` takes the URLs of your uploads of `assets/Sprites` by name (`clouds`, `plane`, `walker`, `mountains`, `trees`, `car`, `cyclist`); a sprite left out is not drawn. The road is CSS.

- `.homepage-hero__title` is `display` in `heading`; `.homepage-hero__subtitle` is `lead` in `text-muted`; `.homepage-hero__cta` is the ActionLink.
- `.homepage-hero__row` is a flex row at `site-width`: intro left (at most `measure`), post-it right. It wraps below `bp-md` and the post-it loses its tape and tilt.
- `.homepage-road` is 120px tall and load-bearing: it contains every sprite, so nothing collides with the text at any width. The bar is 24px of `road`; `blue` dashes 30px on, 58px off. Sprites are positioned by percentage and never scale. Below `bp-lg` the sky layer hides; below `bp-sm` the strip is 60px and the travellers hide.

## What you provide

- `sprites`: one URL per sprite you want drawn, by name (`clouds`, `plane`, `walker`, `mountains`, `trees`, `car`, `cyclist`), the files of `assets/Sprites`. A sprite left out is not drawn; the road and the disc are CSS.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
