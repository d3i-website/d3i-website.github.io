One numbered step of a journey hub (Software, Prepare a study): an illustration on one side, a giant coral number, a title, a sentence or two and a link on the other. Steps alternate sides and stack 4rem to 6rem apart under the hub hero.

Put the steps in `HubStep.List`: it numbers them "01", "02" … and alternates `.hub__movement--left` and `--right`, unless a step sets its own `number` or `side`. Each step takes `title`, `image` (an illustration from `assets/Illustrations`, letterboxed in a 5:4 box at up to 20rem), a `body` of one or two sentences, and a `link`. Below `bp-lg` every step stacks image first. `HubStep.List` also takes the hub hero's `title`, `subtitle` and `image`.

- The hub is Nunito throughout (`.hub` sets the display family). `.hub--journey` pads `space-32` by `space-24`, up to `space-64` by `space-32` from `bp-lg`.
- `.hub__movement` is a two-column grid from `bp-lg` with a `space-48` gap, items centred.
- `.hub__movement-number` is `numeral` in `coral` (48px below `bp-lg`).
- `.hub__movement-title` is `h2`; `.hub__movement-body` is `body` (`lead` size from `bp-md`) in `text`, max 32rem; `.hub__movement-link` is the ActionLink.
- The hub hero above the steps uses `display` and `lead` in `text-muted` beside an image at up to 32rem, `radius-lg`.

## What you provide

- `image` per step: one of the `hub-*` files in `assets/Illustrations`; `HubStep.List` takes the hub hero's `image` the same way.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
