# Design system

The datadonation.eu design system: the colours, type, spacing and components for slides and for this website, kept here so it is versioned with the site and anyone with the repository has it. Its home for editing is a claude.ai Design System artifact, https://claude.ai/artifact/XLSnPVHXtRLypPh8ZdPy9n (private to its owner).

**To use it in Claude Design or for decks, install your own copy:** `INSTALL.md` has the one prompt to paste into Claude Code. It gives you the same system in your own claude.ai account, with nothing shared.

Start with `project/README.md`, the brand book: what every token is for, the slide rules, the slide palette in hex, and the components.

## Layout

- `project/` holds the artifact's source files, as the artifact keeps them:
  - `README.md` is the brand book; `website-migration.md` maps the site's current SCSS values onto the tokens.
  - `tokens.json` holds every token: 23 colours in a light theme and a proposed dark one, the website and slide type scales, spacing, radii, shadows, layout widths and breakpoints.
  - `tokens.css` is `tokens.json` compiled to CSS variables, `--text-<style>` font shorthands, a class per text style and the `@font-face` rules. It is generated: see below.
  - `components/bundle.js` defines `window.D3I`: 24 website components and 9 slide components, as React 18 functions. `components/bundle.css` styles the website components; `components/index.d.ts` documents every prop; `components/lib/` carries React and ReactDOM 18.3.1.
  - `components/<Name>/README.md` is each component's guidelines; `components/<Name>/preview.html` is the live preview the artifact page shows. Previews only run inside that page, which loads the stylesheets, React and the bundle first; opened from disk they are blank.
  - `fonts/` holds Nunito and Nunito Sans (SIL Open Font License).
  - `assets/<Group>/` holds the images, with a `README.md` per group on how each is used. In the artifact the images are uploads; `design-system.json` (the artifact's index) records each one's upload id under `assetGroups`.
- `tools/build_tokens_css.py` compiles `project/tokens.css` from `project/tokens.json`.
- `tools/install_copy.py` does the mechanical part of installing or re-syncing a copy in someone's claude.ai account (see `INSTALL.md`).

Not copied from the artifact: its `api/` cards and `manifest.json`, which the artifact page regenerates on every save.

## Using it

- **A web page:** link `project/tokens.css` and `project/components/bundle.css`, load `components/lib/react.production.min.js`, `react-dom.production.min.js` and then `components/bundle.js`, and mount the components (`D3I.NewsCard`, `D3I.Routes` …). Pictures are props: pass the URL of your copy of the asset. In a clone the image files are already here, under `project/assets/<Group>/`, so you don't need the artifact's upload ids that the component READMEs mention.
- **A slide deck:** each slide component renders one 1920 × 1080 `<section>` with inline hex styles. `D3I.slideMarkup(D3I.SlideFrame, props)` returns it as markup to paste into a deck. Without running the bundle, follow the component's README, which lists every value it draws. Declare the two fonts from `project/fonts/`.
- **This website:** the site does not use these tokens yet. `project/website-migration.md` maps each old SCSS value to the token that replaces it.

## Keeping the repository and the artifact in step

Edits are made in the artifact for now. To bring this folder up to date after a change there:

1. Read the changed files from the artifact into `docs/design-system/project/` (in Claude Code, ask for a pull of the design system from the artifact; images come down one by one by their upload id).
2. Run `python3 -I docs/design-system/tools/build_tokens_css.py` if `tokens.json` changed.
3. Review the diff and commit.

To go the other way, publish the changed files under `project/` to the artifact with `root: docs/design-system`, the index (`design-system.json`) last. A new image is uploaded to the artifact first and recorded in the index's `assetGroups`. Never publish `tokens.css`: the artifact compiles its own.
