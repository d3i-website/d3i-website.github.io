The site's one call to action: a bold coral Nunito link with a trailing arrow and an underline that appears on hover. There are no buttons.

`D3I.ActionLink` takes `href` and the label as children: a verb phrase with no arrow, because the component appends `<span aria-hidden="true">→</span>` as the site's template does. `variant` picks the form below: `section` (the default), `compact`, or `accent` with `accent` set to `primary`, `secondary` or `tertiary`. `external` opens the link in a new tab with `rel="noopener noreferrer"`. One per card or section: it is the thing to click.

- `.section-cta` is the standard form: `label` style in `coral`, with a 2px transparent bottom border that turns `coral` on hover and focus over 0.15s. `.homepage-hero__cta` and `.hub__movement-link` are the same look in other places.
- `.cta-link` is the compact form inside cards and section headers ("Read more →", "More news →"): it inherits the surrounding size, with a 1.5px underline and `white-space: nowrap`.
- `variant="accent"` colours the link in the item's text colour (`blue`, `coral` or `yellow-text`) and underlines in `currentColor`.
- `coral` measures 3.0:1 on `surface` and `yellow-text` 1.9:1; the site accepts that for this bold link and nowhere else. Never use the style for body-sized regular text.
