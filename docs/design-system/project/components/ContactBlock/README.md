The contact block that closes a hub or content page: a bold lead question and the team's email address, optionally beside a short list of topics the team can help with.

Pass `lead`, `email` and `subject`, and, on inner pages, an `intro` line plus two to four `topics`. With topics the block is a two-column row from `bp-sm`: lead and email left, topics right. Without them it is centred (`.contact-cta--centered`); inside a content page set `constrained` to cap it at 42rem (`.contact-cta--constrained`).

- `.contact-cta` sits under a `border` top rule with `space-64` above and `space-32` padding (`space-64` and `space-48` from `bp-lg`): it is the page's last word.
- `.contact-cta__lead` is `h4` size in the centred variant; in the row variant it is `h3`, and `h2` from `bp-md`; always weight 800 in `text`.
- `.contact-cta__topics li` are `body` with a 0.45rem `coral` disc as the bullet; `.contact-cta__intro` is `body` at 700.
- `.contact-cta__email a` is `blue` at 700 with the 2px hover underline. The address is shown in full: "Email DataDonation@uu.nl".
