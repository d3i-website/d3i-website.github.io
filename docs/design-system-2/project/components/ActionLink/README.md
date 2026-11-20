The call to action, in the front page's "More" form: the label in text, a short dotted `sky` line and the small arrow disc. It is the thing to click, one per card or section; there are no buttons. On the front page itself "More" is drawn by `ListRow.List`, and the note carries its own disc.

PageIntro's actions and Routes' step links are ActionLinks. The site's action links (`.section-cta`, `.cta-link`) still end in a text arrow; they take this markup when their pages are redone.

## What you provide

- The label, as children: plain words, a verb phrase or "More" ("Learn about data donation", "Read more"). No arrow: the disc is added.
- `href`, and `external` to open the link in a new tab (`target="_blank" rel="noopener noreferrer"`).
- `hiddenLabel` (optional): words for screen readers only, in a `<span class="visually-hidden">` straight after the label, for what a short label leaves out: " news" after "More", so the link reads "More news".
- `variant`: `section` (the default, `.section-cta`) for a call to action under a section, or `compact` (`.cta-link`) inside cards and section headers.

There are no pictures to pass. The disc is `ArrowDisc`, drawn inline.

## The values it draws

- `.section-cta` is `link` in `text` (Nunito Sans 700, 16px), with no underline: the label, the dots and the disc in a row, `space-8` apart, on one line.
- `.cta-link` is the same in `label` (14px).
- `.more__dots` is 28px wide: a dot `line-dot-page` high every `line-dot-spacing`, in `sky`. On hover and on keyboard focus it turns into a solid `sky` line; the colour of the text never changes.
- `.go` is the arrow disc at `disc-arrow-sm` (24px).
