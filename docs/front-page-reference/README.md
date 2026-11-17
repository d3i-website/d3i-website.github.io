# Front page reference

The agreed design for the datadonation.eu front page, as one self-contained page, with screenshots. It is what the real site is built towards and tested against. It was worked out in a design conversation on 2026-11-16, starting from the designer's hero and explainer artwork.

Nothing in `docs/` is published: `_config.yml` excludes it from the Jekyll build.

## What is here

- `index.html` is the reference page. Open it straight from disk. It loads its fonts from `fonts/` and its logos from `assets/`, and nothing from the network.
- `screenshots/` holds the reference screenshots (see below).
- `source/build.py` builds `index.html`. `source/designer-hero.svg` is the designer's hero file as delivered ("v3.0 Hero Website - No Type - No Note.svg"); the build cuts the icons, portraits and lines out of it by their coordinates, so it must not be edited.
- `source/capture.sh` takes the screenshots.
- `source/compare.sh` compares a built site's front page with them, and `source/capture-pages.sh` photographs the site's other pages (see "Testing the site against it"). `source/note-off.yml` is the config override for the note-off build.
- `fonts/` holds Nunito Sans and Libre Caslon Condensed (both SIL Open Font License).

The news items, events and the note's text are sample content copied from the site on 2026-11-16. They show the layout; they are not part of the design.

## Rebuilding and re-capturing

From this folder:

```
python3 -I source/build.py source/designer-hero.svg index.html
source/capture.sh
```

`capture.sh` needs Firefox and ImageMagick. Run twice on the same machine it produces byte-identical files (checked on 2026-11-16 with Firefox on Arch Linux). On another machine or Firefox version, expect small differences in text rendering.

The page takes two query parameters: `?bar=off` hides the dark bar at the top, and `?note=off` hides the note. The screenshots use `bar=off`.

## The screenshots

Two files per width:

- `full-<width>-note-<on|off>.png` is the whole page.
- `band-<width>-note-<on|off>.png` is the top 420px: the header, the band, and what hangs below it.

The widths are 1920, 1600, 1440, 1280, 1279, 1100, 1000, 999, 800, 600, 599 and 390px, so there is one on each side of every breakpoint. The note is shown at every width. At 1920, 1440 and 1280px there is also a set with the note off, because from 1280px the note lies on top of the band and the band must stand on its own behind it.

## Testing the site against it

`source/compare.sh` photographs the front page of a built site and compares its band with the band in these screenshots. From the repository root:

```
bundle exec jekyll build
docs/front-page-reference/source/compare.sh _site on

bundle exec jekyll build --config _config.yml,docs/front-page-reference/source/note-off.yml
docs/front-page-reference/source/compare.sh _site off
```

`on` checks all 12 widths with the note shown; `off` checks 1920, 1440 and 1280px with the note off (the second build sets `home_note_off: true`). The script serves the folder on a free port, finds the top edge of the band in each picture (the first row whose pixel at x=4 is `#87c5eb`), cuts 360px from there, and compares it with the same 360px of `band-<width>-note-<on|off>.png`. A pixel counts as different when it is off by more than 5%. It prints one line per width with the number of differing pixels, and exits 1 if any width differs in more than 0.3% of the 360px crop.

The live header keeps its own structure and height, so the comparison starts at the band's top edge, not at the top of the page. To let the band sit on whole pixels like the reference, the header's heights are whole pixels, set in rem sixteenths: 58px at 1100px and wider, 107px at 1000px where the links drop under the name, and 58px again below 1000px, where the links fold into a "Menu" drop-down as in the reference. Without JavaScript the links stay a wrapped list below 1000px instead (107, 148 and 189px).

An optional third argument names the folder for the output; without it the script makes a temporary folder and prints its path. It holds `diff-<width>-note-<on|off>.png` per width, where the differing pixels are red. Add `--full` (before the folder names) to also get `full-<width>-note-<on|off>.png`: the reference page on the left and the site's on the right, for a human to judge below the band: layout, type and spacing. The news and event content will differ and is not judged.

`compare.sh docs/front-page-reference on` (or `off`) tests the script itself: the reference page honours `?bar=off&note=<on|off>`, which the script always requests, so it must print all zeros.

## What was decided

### Rules for the whole site

- **Type.** Libre Caslon Condensed, weight 420, letter spacing 0, for large headings. Nunito Sans for everything else. The rounded Nunito is retired. The serif is provisional: Laura was asked to choose among three earlier candidates and has not seen this one.
- **Colour.** White ground, dark ink text (`#252a34` headings, `#363b46` text, `#626976` secondary), and blue `#4272ef` as the one working colour. Sky blue `#87c5eb` is the band's ground and the colour of link underlines. Coral `#ff5e5e` and yellow `#ffcf60` appear only as small spots.
- **One band.** The sky-blue band at the top of the front page is the only colour block.
- **Shape.** If something is curved, it is a line or a node. Everything else has square corners.
- **Links.** A link is text in its own colour, at weight 700, with a dotted sky-blue underline that turns solid on hover. A title that is a whole-line link (card headings, news and event titles) keeps its own weight.
- **The arrow disc** (a blue disc with a white arrow) marks the few things that lead somewhere as a whole: the note, and "More" on each list.
- **Lines and nodes.** Every piece sits on a line. Every line starts and ends at a node, or leaves the page. Large discs are meaningful nodes with an icon; small white dots are plain nodes. Level changes take the designer's shape: a rounded corner, a straight diagonal, a rounded corner.

### The band

- The title and subtitle are centred. A line runs through the title, between two nodes.
- **Left of the title: the participant's story.** The switch (controlling what is donated), the lock (safety), the phone (where the data come from), the chart (seeing it), the tick on the dotted circle round the funnel (saying yes), the person, and the map pin. Its lines are the designer's own, from the left of their hero. The story is deeper than the band and hangs below its edge, where its lines turn sky blue. Its main line comes down onto the title's line just before the title.
- **Right of the title: the research side.** Just after the title the line drops to the height of the note's corner. It rises to the chart on the anchor and runs down to the globe. From the consent badge a second line climbs to the woman. A dotted line runs from the music note to the woman, and her line leaves the page.
- The band's lower edge is a blue line with a step in it.

### The note

- The note is not part of the band. It lies on top of it and can be switched off; the band is complete without it.
- **The anchor** is the one fixed point they share: the centre of the note's arrow disc. Across: 248px into the space right of the title, or 55% of that space, whichever is larger. Down: 196px from the top of the band. The note hangs from it and grows upwards with its text. The note's coral corner node is 232px left of the anchor and 30px below it.
- The band keeps the chart on the anchor, the same size as the arrow disc, and brings its line to the height of the coral corner node. With the note on, the line from the title reads on through the note.
- From 1280px: white paper (`#f3f9fd`), a tab at the lower left holding "Read our letter", a dotted line along the tab to a ring node, and the arrow disc on the corner. The whole note is a link.
- Below 1280px: no paper and no line. The eyebrow and title, the body sentence (down to 1000px only), and the arrow disc, as plain text in the niche under the band's shallow side. The whole note is a link.

### Below the band

- Three cards without borders or pictures, centred: an eyebrow (For newcomers, For researchers, For developers), a serif heading with the link underline, and a sentence.
- The line about the newsletter and the team, between the cards and the lists. It is written in `_layouts/homepage.html` (developer-edited), not in the CMS.
- Latest news on the left and Upcoming events on the right, as rows: date, title, and for events the place. Four each. No pictures, no summaries, no carousel. Every upcoming event is listed, not only featured ones. Each list ends its heading with "More" and the arrow disc. Each "More" carries a visually hidden second word, so its accessible name is "More news" or "More events".
- The footer keeps its content; only type and lines change.

### CMS field limits

The band is drawn around the current text, so each CMS string has a `maxlength` (found on 2026-11-16 by building with test texts and measuring at the tested widths; details in `cms/maintainer-notes.md`, "The front page"):

| Field | Limit | Beyond it |
| --- | --- | --- |
| Title lines | 23 each | A line runs out of the title's column from 600px up |
| Browser-tab title | 47 | The two lines and a space |
| Note eyebrow | 21 | Pushes the arrow disc out of the niche below 1000px |
| Note title | 21 | Same |
| Note text | 137 | From 138 some texts take a sixth line from 1280px up, cutting the gap above the note from 22px to 3px; from 161 the note grows past the band's top |
| Note link text | 16 | Runs into the tab's sloping end from 1280px up |
| Card eyebrow | 31 | Wraps at 600px |
| Card heading | 26 | Wraps at 1000px |
| Card text | 110 | Three lines from 1000px up (four below); more adds a line |

### What shows at each width

| Window width | Left of the title | Right of the title | Note |
| --- | --- | --- | --- |
| 1280px and up | The full story | The full research side | On top of the band, hung from the anchor |
| 1000 to 1279px | Phone line; person and funnel on the title's line | The drop to the globe; the woman's dotted line | In the niche, with its body sentence |
| 600 to 999px | Person and funnel on the title's line | Woman and globe on the title's line | In the niche, without its body |
| Under 600px | Nothing | The globe on the band's edge | In the niche, without its body |

The two lists stack into one column below 900px. The cards go to two columns below 1000px and one below 600px.

## Known and accepted

- With the note on, at window widths from 1280px to about 1580px, a 3px sliver of one white node shows below the note's lower edge. Accepted.
- At 1280px the note covers most of the research side.
- A note with much longer text would grow up past the top of the band; the CMS limits above keep it within.

## Not decided yet

- What the niche shows below 1280px when the note is switched off.
- The header and footer got a first pass only (type and lines).
- The explainer panels for the "What is data donation?" page, including the typos in the designer's labels ("Informed concent", "Variables of insterest", "Participants device").
- Slides: the road motif is still theirs.
- The ODISSEI event's place reads "Jaarbeursplein 6 3521 AL"; that is a content fix in the CMS.
