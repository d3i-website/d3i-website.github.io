The footer: who provides and supports the service (ODISSEI and Eyra, each under a small label), then the partner universities' logos, then the copyright line.

Use it once at the bottom of every page; it pins to the viewport bottom on short pages because the body is a flex column. Pass the `year` and the logos: `providedBy` (ODISSEI) and `supportedBy` (Eyra) from `assets/Logos`, and `partners` from `assets/Partners` in the footer's order, each with its `name`, the URL of your upload as `src`, and its `mark` (`odissei`, `eyra`, `uva`, `ru`, `uu`, `vu`, `tilburg`, `eur`), which picks its measured size in the stylesheet.

- `.site-footer` has a `border` top rule and a `space-48` top margin (0 on the homepage, where the news band abuts it).
- `.site-footer__label` is `label-small` in `text`; `--small` makes it uppercase and muted; all three labels ("Provided by", "Supported by", "Project partners") use it, each 0.5rem above its logos. "Project partners" is centred on a phone, left from `medium`. `.site-footer__providers` carries a `border` bottom rule; its labels share a line and the logos hang top-aligned beneath them.
- Every logo sits in a `.site-footer__cell--{mark}` that is exactly the logo's ink box, measured once from the file (`$footer-logos` in `_sass/_footer.scss`). The files are used as they are: whitespace baked into a file (Utrecht, Erasmus) is its clear zone, which no other logo may enter, published as `--clear-l/r/t/b`. Each logo gets the same ink area, scaled by `(0.17 / its darkness) ^ 0.25` so pale logos are not lost, with a per-logo `weight` for hand nudges.
- Phone: providers and partners share two left-aligned columns (`--footer-col`, the widest partner, and `--footer-gap`, wide enough for every clear zone). From `medium`: partners in three centred columns. From the width at which all six fit (computed, 1062px now): one row spread evenly, never closer than `--footer-row-gap`, the widest clear zone. Below 360px every logo shrinks by 0.85.
- `.site-footer__copyright` is `small` in `text-muted`.

## What you provide

- `providedBy` and `supportedBy`: `assets/Logos/odissei.png` and `assets/Logos/eyra.png`; `partners`: the six files of `assets/Partners` in the footer's order, each with its `mark`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
