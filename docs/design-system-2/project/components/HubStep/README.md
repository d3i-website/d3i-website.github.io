The steps of a journey hub (Software, Prepare a study). All the steps sit on one vertical `blue` line, each with its number in a `blue` disc on the line. A ring node ends the line at each end. Each step has an illustration on one side and its title and a sentence or two on the other. The title is the step's link, and there is no separate action link.

Put the steps in `HubStep.List`. It numbers them "01", "02" … and alternates `.hub__movement--left` and `--right`, unless a step sets its own `number` or `side`. `HubStep.List` also takes the hub hero's `title`, `subtitle` and `image`.

## What you provide

- `title`: the step's title.
- `href`: the step's page; `external` opens it in a new tab. Without `href` the title is plain text.
- `link` (deprecated): the old `{ label, href, external }` was replaced by `href` and `external`. It still works: without `href`, its `href` and `external` are used, and its label is not shown.
- `body`: one or two sentences.
- `image` per step: one of the `hub-*` files in `assets/Illustrations` (or `social-ideas.svg`). `HubStep.List` takes the hub hero's `image` the same way.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.

## The values it draws

- The hub is Nunito Sans (`.hub`). `.hub--journey` pads `space-32` by `space-24`, up to `space-64` by `space-32` from 900px.
- `.hub__movements` stacks the steps `space-64` apart, `space-96` from 900px. Its `::before` is the line: `line-page` in `blue`. Ring nodes (`node-ring`, `surface` fill, 1.4px `blue` edge) close it at the top and the bottom.
- From 900px the line runs down the middle. Each `.hub__movement` is two columns 128px apart, with the image and the text alternating sides, and the number's disc sits on the line, level with the middle of the step.
- Below 900px the line runs 24px in from the left and the steps are inset 68px, image first. The disc sits on the line, level with the top of the step.
- `.hub__movement-number` is the disc: 48px, `blue`, with the number in `numeral` (the serif, provisional) in `on-sky`. It is hidden from screen readers, as on the site.
- `.hub__movement-image img` is letterboxed in a 5:4 box at up to 20rem (`object-fit: contain`).
- `.hub__movement-title` is `title-sm` in the serif (provisional), in `heading`. Its words carry the dotted `sky` link underline at `line-underline-offset-title`, solid on hover and on keyboard focus. `.hub__movement-body` is `body` in `text`, at most 32rem.
- The hub hero above the steps is carried over unchanged: a title in the display face with a `lead` line in `text-muted`, beside an image at up to 32rem.
