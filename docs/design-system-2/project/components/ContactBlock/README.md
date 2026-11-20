The contact block that closes a hub or content page. It keeps the live block's structure, weighting and centring, in the new style.
- With topics: the question and the team's email address on the left, a short list of topics the team can help with on the right.
- Without topics: the question over the address, centred.

It has no photos and no drawn devices. The topics are plain text, never links: the address is the one thing to click.

## What you provide

- `lead`, `email` and `subject`.
- On inner pages, an `intro` line and two to four `topics`.
- `constrained` is deprecated and does nothing. The block is always 42rem and centred, where it used to be only with `constrained`.

There are no pictures to pass.

## The values it draws

- `.contact-cta` is 42rem wide, centred, under a `border` top rule, `space-64` above. It has `space-32` padding above, `space-48` from 900px.
- **With topics**, `.contact-cta__row` is one column, `space-24` apart. From 600px it is two even columns (1:1), `space-32` apart, on one baseline, so the question breaks into three lines.
- **The question**, `.contact-cta__lead`, is the serif at 420 in `heading`, sized to carry the live question's weight:
  - 41px from 1024px, 36px at 768–1023px and 31px below, at leading 1.05, when there are topics;
  - 26px at leading 1.1 without topics.
  - These four sizes are off the type scale on purpose; they were measured against the live question's ink.
- **The address**, `.contact-cta__email`, is 17px in `text`, shown in full: "Email DataDonation@uu.nl". It is left-aligned beside topics and centred without. Its link is a Link: `text`, 700, with a dotted `sky` underline that turns solid on hover and focus.
- **The topics**:
  - `.contact-cta__intro` is `body` at 700, `space-12` above the list.
  - `.contact-cta__topics li` are `body` at leading 1.5, 0.6rem apart, 1.25rem in.
  - Each has a 0.45rem `coral` round bullet (`radius-circle`) at 0.6em from the top.
