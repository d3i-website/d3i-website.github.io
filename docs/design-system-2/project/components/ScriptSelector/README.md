The Software section's script selector, the one app the site frames: the app in a frame like a Figure's, one square `border` hairline, with a caption under it that says where it runs and gives the way out, closed by another hairline. When the app does not answer, its outage notice shows inside the same frame and the caption stays.

Use it once, on the script selector's page (`_pages/software/script-selector.md`, the `script-selector` component of `_includes/page-sections.html`). Pass `src`, the app's URL, and `title`. With `down` the component renders the outage; without it, the app. The site decides which by its own script: the frame has `timeout_seconds` to load before the notice replaces it, and `available: false` in `_data/script_selector.yml` renders the notice at build time.

## What you provide

- `src`: the app's URL, `site.data.script_selector.url` (`https://sramtest.d3idatadonation.src.surf-hosted.nl/select?embed=1`). The frame loads it, and the caption's link opens it in a new tab.
- `title`: "Script selector". It names the frame for screen readers, is the still's alt text and heads the notice ("Script selector unavailable"). It is used as given, never re-cased.
- `linkText`, optional: the caption link's words, used verbatim. Default "Open the script selector in a new tab".
- `caption`, optional: the sentence before the link. Default "Runs on SURF Research Cloud."
- `down`, optional: `{ message }`, the outage notice, `fallback.message` in `_data/script_selector.yml`. `down.heading` replaces "<title> unavailable" (`fallback.heading`). The notice has no link of its own: the caption under it is the way out.
- `still`, optional: a picture of the app, shown in the frame in place of the live one. A preview, a mock-up or a slide passes one, so that nothing calls the workspace. `assets/Screens/script-selector.png` is the selector's first step at the reading column's width; this card's preview shows it.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.

## The values it draws

- `.script-selector`: `space-32` above, `space-48` below, the reading column's width.
- `.script-selector__frame-wrap` is the frame: one 1px `border` hairline, square, on `surface`. It is the window's height less 10rem, at least 700px and at most 1400px, and the app fills it. Nothing else on the site scrolls sideways; the app may.
- `.script-selector__frame`, the app's iframe (or the still), has no border of its own. A still fills the frame from its top left corner (`object-fit: cover`).
- `.script-selector__caption`: "Runs on SURF Research Cloud." on the left in `small`, `text`, and the link on the right, ActionLink's compact form (label, dotted `sky` line, arrow disc), opening in a new tab. It is 0.6rem under the frame and 0.7rem above its closing `border` hairline, the Figure's caption spacing. When the line is too narrow the link wraps under the sentence, `space-8` apart.
- `.script-selector__fallback`, the notice, sits in the frame, padded `space-32`, and the frame closes round it. Its heading is `list-heading` in the serif (provisional) in `heading`, `space-12` above the message; the message is `body` in `text`, at most `measure` wide. It carries `role="status"`. There is no tint, no centred text and no radius.
