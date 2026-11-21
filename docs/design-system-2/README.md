# Design system 2

The new look of the datadonation.eu website, begun with the front page on 2026-11-16. This folder started as a copy of `docs/design-system/`. Later changes to the tokens and the brand book are made here.

`docs/design-system/` is the earlier system, and it is not edited. Decks can now be made from this system: its slide components are in the new look. The earlier system remains for the decks already made from it.

This folder has no claude.ai artifact yet.

Start with `project/README.md`, the brand book: what every token is for, the slide rules, the slide palette in hex, and the components.

## Layout

- `project/` holds the artifact's source files, as the artifact keeps them:
  - `README.md` is the brand book.
  - `tokens.json` holds every token: 29 colours in a light theme and a proposed dark one, the website and slide type scales, spacing, radii, shadows, layout widths, line weights, node sizes, the front page band's measurements, and breakpoints.
  - `tokens.css` is `tokens.json` compiled to CSS variables, `--text-<style>` font shorthands, a class per text style and the `@font-face` rules. It is generated: see below.
  - `components/bundle.js` defines `window.D3I`: 31 website components and 9 slide components, as React 18 functions. `components/bundle.css` styles the website components; `components/index.d.ts` documents every prop; `components/lib/` carries React and ReactDOM 18.3.1.
  - `components/<Name>/README.md` is each component's guidelines; `components/<Name>/preview.html` is the live preview the artifact page shows. `components/Cover/preview.html` is not a component: it is the system's own card, the network cover slide at half size with the name "datadonation.eu" under the band. Previews only run inside that page, which loads the stylesheets, React and the bundle first; opened from disk they are blank.
  - `fonts/` holds Nunito, Nunito Sans and Libre Caslon Condensed (all SIL Open Font License).
  - `assets/<Group>/` holds the images, with a `README.md` per group on how each is used. Every image is an upload in the artifact, and its id is in `design-system.json` (the artifact's index) under `assetGroups` and on the artifact's asset cards. In a clone, the files are here, under `project/assets/<Group>/`. How `install_copy.py` gives each image its upload id is in `INSTALL.md`.
- `tools/build_tokens_css.py` compiles `project/tokens.css` from `project/tokens.json`.
- `tools/build_band_markup.py` copies the front page's band drawing from `_includes/home/band.html` into `components/bundle.js`, for the Band component. Run it when the include changes; with `--check` it only says whether the copy is current.
- `tools/build_slide_cover.py` copies the network cover's band from `project/assets/Slides/cover-network.svg` into `components/bundle.js`, for SlideCover's `network` layout, and checks that its colours are tokens. Run it when the drawing changes; with `--check` it only says whether the copy is current. (SlideCover's `band-title` layout draws the Band's own markup, so it follows `build_band_markup.py`.)
- `tools/check_reference_values.py` checks that every colour and font size the front page reference uses has a token. With `--site` it scans the site's Sass for the redone surfaces (`_site`, `_pages`, `_nav`, `_footer`, `_news-post`, `_home-band`, `_home-content`) and lists every hex colour that has no token. Colours the site's Sass still draws in the old look, for surfaces that have not yet adopted the redone components, are listed in the script's `ALLOWED_UNREDONE`.
- `tools/extract_network_pieces.py` writes the `Network` pieces from the designer's hero artwork.
- `tools/install_copy.py` does the mechanical part of installing or re-syncing a copy in someone's claude.ai account (see `INSTALL.md`).

Not copied from the artifact: its `api/` cards and `manifest.json`, which the artifact page regenerates on every save.

## Using it

- **A web page:** link `project/tokens.css` and `project/components/bundle.css`, load `components/lib/react.production.min.js`, `react-dom.production.min.js` and then `components/bundle.js`, and mount the components (`D3I.NewsCard`, `D3I.Routes` …). Pictures are props: pass the URL of your copy of the asset. In a clone the image files are already here, under `project/assets/<Group>/`, so you don't need the artifact's upload ids that the component READMEs mention.
- **A slide deck:** each slide component renders one 1920 × 1080 `<section>` with inline hex styles. `D3I.slideMarkup(D3I.SlideFrame, props)` returns it as markup to paste into a deck. Without running the bundle, follow the component's README, which lists every value it draws. Declare Nunito Sans and the serif, Libre Caslon Condensed (provisional), from `project/fonts/`.
- **This website:** the site does not use these tokens yet. The front page is built towards `docs/front-page-reference/`.
