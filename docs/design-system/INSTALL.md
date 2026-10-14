# Install the datadonation.eu design system in your own Claude account

You get your own copy of the design system as a Design System artifact in your claude.ai account: the same brand book, tokens, components, slide templates and images as the original. Claude Design and deck-building sessions can then use it like any design system you made yourself. No one has to share anything with you.

## What you need

- A claude.ai account with Claude Code (the desktop app, the terminal, or claude.ai/code).
- This repository, cloned or opened in Claude Code: `git clone https://github.com/d3i-website/d3i-website.github.io.git`.
- About ten minutes.

## Install

Open Claude Code in the repository and paste this, with your name filled in:

> Install the datadonation.eu design system from `docs/design-system` as a new Design System artifact in my claude.ai account. Follow `docs/design-system/INSTALL.md`, "Steps for Claude", exactly. My name is ___.

Claude creates the artifact, uploads the 99 images, publishes the files and gives you the link. It then appears in claude.ai under Settings → Design systems. Make it your default there if you'll build decks with it.

## Update a copy you already have

When the design system in this repository changes, open Claude Code in an up-to-date clone and paste:

> Re-sync my datadonation.eu design system at ___ (its link) from `docs/design-system`. Follow `docs/design-system/INSTALL.md`, "Steps for Claude", exactly.

A re-sync replaces every file in your copy with the repository's version. Changes made on your copy's page are overwritten, so make lasting changes here in the repository instead.

## Steps for Claude

Run the commands from the repository root. `<scratch>` is your scratchpad directory.

**Install**

1. Create the artifact: Artifact `publish` with `type_url` set to the Design System type (Artifact `list` with `scope: "types"` shows it), `title` set to `datadonation.eu` unless the user names another, and no files. Keep the url it returns, and never pass `type_url` again.
2. List the uploads: `python3 -I docs/design-system/tools/install_copy.py batches`. It prints JSON arrays of absolute image paths, 25 per array.
3. Upload each array: Artifact `publish` with `url` set to the new artifact, `asset: true` and `file_paths` set to that array.
4. Save the results: write every result line to `<scratch>/uploads.txt` exactly as the tool printed it, one per line (`- "<path>" (<size> bytes, <type>) → "/_blob/<id>" (id <id>)`). Don't retype ids. The next step stops if a line's two copies of the id differ or a size doesn't match the repository file.
5. Stage: `python3 -I docs/design-system/tools/install_copy.py stage --uploads <scratch>/uploads.txt --out <scratch>/ds-install --by "<the user's name>"`, adding `--title "<title>"` if the user named one. It writes the files, the new index and `<scratch>/ds-install/publish.json`.
6. Publish the files: one Artifact `publish` with `url` set to the new artifact and `root`, `file_path` and `files` taken exactly from `publish.json` (`files` includes `index.d.ts` with its `contentType`).
7. Publish the index last: Artifact `publish` with `url`, the same `root`, and `file_path` set to `publish.json`'s `index_file_path`.
8. Give the user the link. Don't publish `tokens.css`, `manifest.json` or `api/` files: the artifact's page generates them.

**Re-sync**

1. Read the copy's index right before you start: Artifact `read` with the copy's `url` and `path: "project/design-system.json"`, saved to `<scratch>`.
2. Run `batches --existing-index <that file>`. It lists only images that are new or changed (by size). Upload them as in Install steps 3 and 4. If it lists none, skip `--uploads` in the next step.
3. Run `stage --existing-index <that file> --uploads <scratch>/uploads.txt --out <scratch>/ds-install --by "<the user's name>"`. The copy keeps its title and creation date.
4. Publish the files, then the index, as in Install steps 6 and 7, to the copy's url.
