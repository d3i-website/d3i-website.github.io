The footer, as `_includes/site-footer.html`: who provides and supports the service, each logo under a small label, then the project partners' logos under one label, then the copyright line.

Use it once at the bottom of every page; it pins to the viewport bottom on short pages because the body is a flex column. Pass the two `providers` (ODISSEI, then Eyra) and the six `partners` in the footer's order, each with its `name`, the URL of your upload as `logo`, and its `key`, which picks the size the site measured for it. Leave `partners` out and the partner grid is left out with its label.

**Keys.** The footer sizes a logo by its ink box, measured once from the site's file (`$footer-logos` in `_sass/_footer.scss`), and each key is its cell's class, `site-footer__cell--<key>`: `odissei`, `eyra` (providers); `uva`, `ru`, `uu`, `vu`, `tilburg`, `eur` (partners). A logo the site has not measured is not supported, and the component throws for any other key: add the logo to `$footer-logos` and the site's footer first, then here. The files in `assets/Logos` and `assets/Partners` are the site's own; pass them as they are, since the sizes are measured from them.

- `.site-footer` has a hairline above (`heading` at 8%), `surface` behind, padding 1.6rem 1rem 1.8rem and a 3rem top margin (0 on the front page). Its three parts are 1rem apart.
- `.site-footer__label--small` is 0.72rem at 700, upper case, 0.08em tracking, in `nav-text`, 0.5rem above its logos. "Provided by" and "Supported by" share a line and the logos hang from it; the same hairline closes the pair, 1.25rem under it.
- Each logo gets the same ink area, 17.8rem² for the providers and 13.7rem² for the partners, scaled up a little when it is pale or thin. Its cell is exactly its ink box and clips the file's own whitespace, which is its clear zone.
- Phone: providers and partners share two left-aligned columns, as wide as the widest partner and as far apart as the widest clear zone, the block centred with "Project partners" over it. From 768px: partners in three centred columns, the label left. From 66.32em (1061px at the default font size): the six in one row, spread evenly. Below 360px every logo shrinks to 85%.
- `.site-footer__copyright` is 0.85rem in `nav-text`.

## What you provide

- `providers`: `assets/Logos/odissei.png` (`odissei`, "Provided by") and `assets/Logos/eyra.png` (`eyra`, "Supported by"). A provider's `label` overrides the one its position gives.
- `partners`: `assets/Partners/uva.png` (`uva`), `radboud.png` (`ru`), `utrecht.png` (`uu`), `vu-amsterdam.png` (`vu`), `tilburg.svg` (`tilburg`), `erasmus-rotterdam.png` (`eur`).
- `copyright`: the whole line, "© 2026 datadonation.eu"; the current year by default. `href` on a logo makes it a link; the site's are not.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
