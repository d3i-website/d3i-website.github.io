The footer: one sentence naming who provides and supports the service, with their logos inline, then the partner universities' logo strip, then the copyright line.

Use it once at the bottom of every page; it pins to the viewport bottom on short pages because the body is a flex column. Pass the `year` and the logos: `providedBy` (ODISSEI) and `supportedBy` (Eyra) from `assets/Logos`, and `partners` from `assets/Partners` in the footer's order, each with its `name`, the URL of your upload as `src`, and its `mark` (`odissei`, `eyra`, `uva`, `ru`, `uu`, `vu`, `tilburg`, `eur`), which picks its per-logo cap in the stylesheet.

- `.site-footer` has a `border` top rule and a `space-48` top margin (0 on the homepage, where the news band abuts it).
- `.site-footer__label` is `label-small` in `text`; `.site-footer__sentence` carries a `border` bottom rule.
- `.site-footer__logo-strip` wraps with `space-12` by `space-24` gaps; each `.site-footer__logo-cell` is 2.2rem tall, images capped at 1.6rem, with the per-logo modifier classes (`--uva` … `--eur`) evening out their weights.
- `.site-footer__copyright` is `small` in `text-muted`.

## What you provide

- `providedBy` and `supportedBy`: `assets/Logos/odissei.png` and `assets/Logos/eyra.png`; `partners`: the six files of `assets/Partners` in the footer's order, each with its `mark`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
