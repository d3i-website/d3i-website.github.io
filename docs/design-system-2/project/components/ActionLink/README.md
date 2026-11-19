The call to action on the pages not yet redone: a bold coral Nunito Sans link with a trailing arrow and an underline that appears on hover. There are no buttons. The front page does not use it: what leads somewhere there carries the arrow disc instead (see Note, ArrowDisc and ListRow's "More").

`D3I.ActionLink` takes `href` and the label as children: a verb phrase with no arrow, because the component appends `<span aria-hidden="true">→</span>` as the site's template does. `variant` picks the form below: `section` (the default) or `compact`. `external` opens the link in a new tab with `rel="noopener noreferrer"`. One per card or section: it is the thing to click.

- `.section-cta` is the standard form: Nunito Sans 700 at 17px (1.0625rem) in `coral`, with a 2px transparent bottom border that turns `coral` on hover and focus over 0.15s. `.hub__movement-link` on the journey hub is the same look.
- `.cta-link` is the compact form inside cards and section headers ("Read more →", "More news →"): it inherits the surrounding size, with a 1.5px underline and `white-space: nowrap`.
- `coral` measures 3.0:1 on `surface`; the site accepts that for this bold link and nowhere else. Never use the style for body-sized regular text.
