datadonation.eu is the website of D3I, the Dutch digital data donation infrastructure, and the hub of an international community of researchers. The new look, begun with the front page, is a white page with dark ink text, blue as the one working colour, one sky-blue band at the top of the front page, a condensed serif for large headings, and a drawing of lines and nodes that every piece sits on. The serif is provisional (see Shared · Type). Everything below names tokens in `tokens.json`, text styles in its `type.groups`, class names in `components/bundle.css`, components in `components/bundle.js` (`window.D3I`) and files under `assets/`.

The system is small: 26 colours, 18 text styles for the website and 12 for slides, one 4px spacing scale, square corners, and one shadow. Every website component is in this look except InstitutionCard, which keeps its old look until the network page leaves the site, and two pieces that keep theirs until they are redesigned: the TableOfContents panel and the journey hubs' hero above the HubStep steps. A token whose note says it is unused by components is kept only for the site's own Sass, until each page adopts the new components. Use what is here; when something seems missing, the answer is almost always an existing token used as its note says, not a new value.

## How this book is organised

The system serves two media from one set of tokens: the website, and slides (1920 × 1080, read from the back of a room). The website's tokens were set from the front page reference in `docs/front-page-reference/`. Its README's "What was decided" is the source for the Shared and Website sections; where this book and the reference differ, the reference leads.

- **Shared** sections (Colour, Type, Space and shape) describe the tokens both media read.
- **Slides** sections cover voice for talks, the slide idioms and rules, the slide palette in hex, and the slide components. They are in the new look: slides took it with the front page, and nothing keeps the old one.
- **Website** sections cover voice, links and the arrow disc, lines and nodes, the band, the note, what sits below the band, layout, what shows at each width, imagery and icons, motion, and the components.
- **Builders** closes with the files and asset ids a deck or page builder copies by hand.

## Shared · Colour

The website is white with one colour block. Learn the roles and you know every token.

**Ground and ink.**

- `surface` (white) is the ground of every page and slide. Cards and lists stand on it without fills.
- `heading` (#252a34) is the ink of headings, card and list headings, row titles, the date's day and the note's title and body. `text` (#363b46) is for anything read in sentences. `text-muted` (#626976) is for everything secondary: eyebrows, the month in a date, an event's place. `nav-text` (#6a6a6a) is the site's own muted grey, kept as it is: the header's links and tagline, the footer's labels and copyright line, and secondary lines on the content pages. `ink` (#333333) is the page's base colour and the header's name. `border-soft` (#e6e6e6) is the lighter rule: the horizontal rule, table lines and the skip link's frame. Nothing else is coloured unless it has a job.
- `border` is every hairline: between list rows, in the footer, in tables. It is decorative; nothing depends on seeing it.

**The working colour and the band.**

- `blue` (#4272ef) is the one working colour: the band's subtitle, the band's lower edge and its step, the blue node on that edge, the arrow disc, the note's dotted line and its link text. As text it is for links and labels, never body copy.
- `sky` (#87c5eb) is the band's ground, the colour of the band's lines where they hang below it onto the page, and the colour of every link underline.
- `on-sky` (white) is what is drawn on the band: the title, the lines, the plain nodes, the white discs.
- `paper` (#f3f9fd) is the note's paper: the front page's note from 1280px, and the Postit, which brings the note to content pages and directory hubs. Nothing else uses it.

**Small spots.**

- `coral` (#ff5e5e) and `yellow` (#ffcf60) appear only as small spots. Coral: the note's eyebrow, its corner node, the node in the band's step, the Postit's exclamation disc. Yellow: the node under the map pin on the band's edge.
- `yellow` is never text. `coral` is text only when bold (the note's eyebrow is 800). Text on a coral or yellow fill is `heading`.

**One band.** The `sky` band at the top of the front page is the only colour block on the website. There are no coloured cards, and no tinted panels except the few in `surface-tint` that the `surface-tint` bullet below lists (inline code, the table of contents, the hub's sub-navigation, the active menu row).

**Tokens the components no longer use.**

- `surface-tint` is the one panel tint, and the new look uses it sparingly: inline code, the table of contents, the hub's sub-navigation and the active menu row. `surface-strong` is only the empty circle behind a portrait in the team list. `border-strong` is the outline of the usage figures' country marker, an underline in InstitutionCard and, on a slide, the axis rule of a bar chart. `on-accent` is text on a `blue` fill. No component draws that now (the journey hub's discs use `on-sky`); it is only the ground of the script selector's frame.
- `blue-tint`, `coral-tint`, `yellow-text`, `yellow-tint` and `road` are not in the new look: it has no tinted panels and no road. No slide or component uses them. The featured archive card, the last to tint itself, carries a `coral` node instead. Only the Cover preview's drawing still reads `blue-tint` and `road`. The tokens stay until the site's Sass drops them.
- `focus` is the keyboard focus ring: 2px solid at 2px offset.
- `chart-1` to `chart-5` colour data series in that order (blue, coral, orange, teal, violet). Every mark carries its value as text.

Contrast: `heading`, `text` and `text-muted` pass 4.5:1 on `surface` in both themes; `heading` is 13.6:1 on `paper` and 7.7:1 on `sky`. Three pairs fall short and are accepted to match the designer: the title in `on-sky` on `sky` (1.9:1), the subtitle in `blue` on `sky` (2.3:1), and the `sky` underline on `surface` (1.9:1), which is why a link is also set at 700. `blue` as text is 4.3:1 on `surface` and 4.0:1 on `paper`, so it is for links and labels only. `coral` is 3.0:1 on `surface` and 2.8:1 on `paper`, so it is bold only. The band's drawing is decoration and is hidden from assistive technology. The dark theme is proposed, not shipped; `sky` and `paper` have no dark value yet.

## Shared · Type

Two faces, both wired as font files: Libre Caslon Condensed (`serif`) for large headings, and Nunito Sans (`sans`) for everything else. The rounded Nunito is retired from the website. The serif falls back to the system serif, the sans to the system sans.

**The serif is provisional.** Laura was asked to choose among three earlier candidates and has not seen this one (see the front page reference's README). Another face is a change to the `serif` family and its two font files, `fonts/LibreCaslonCondensed-latin.woff2` and `fonts/LibreCaslonCondensed-latin-ext.woff2`, which cover weights 400 to 700. The `display` family is the same serif stack, so everything that reads `--font-display`, website and slide parts alike, takes the serif.

- Large headings are Libre Caslon Condensed at weight 420, letter spacing 0.
- Reading text is Nunito Sans 400. Labels, links and anything you scan are Nunito Sans 700 or 800.
- Uppercase is only for eyebrows (`eyebrow`, `slide-eyebrow`), always with their tracking. Write the eyebrow in sentence case; the style sets it uppercase.
- The day in a list row's date is `numeral`, in the serif.

**Website styles.**

- Headings, in the serif (Web · Headings): `title` 50px, `title-md` 40px and `title-sm` 34px for the band's title by width; `card-heading` 27px; `list-heading` 24px; `numeral` 22px.
- Text, in the sans (Web · Text): `lead` 17px and `lead-md` 15.5px for the band's subtitle, both at 900; `body` 16px at leading 1.6; `row-title` 16px at 600; `small` 14px; `note-text` 13.5px at 300; `caption` 13px.
- Labels and links (Web · Labels and links): `eyebrow` 11px, uppercase at 0.12em; `label` 14px at 700; `note-label` 14px at 800; `link`, the text around it at 700.
- Code (Web · Code): `code`, inline code and pre blocks on `surface-tint`.

The content pages' heading levels (h1 to h4) are not in the tokens; their sizes are set when those pages are redone.

**Slide scale: 24, 28, 36, 48, 64, 96, 200px.** Twelve styles in the Slides group: `slide-numeral`, `slide-display`, `slide-title`, `slide-stat`, `slide-heading`, `slide-subheading`, `slide-lead`, `slide-item`, `slide-body`, `slide-small`, `slide-label`, `slide-eyebrow`. Nothing on a slide is under 24px. Titles, the part number and stat numerals are the serif at 420 with no tracking, as on the website. Everything else is Nunito Sans, the item, label and footer row included; `slide-eyebrow` is at 800, tracked 3px.

Use the styles as they are. A size that is not on the scale for its medium is a mistake to fix, not a variant. The one exception is the ContactBlock's question: the serif at 420, sized to carry the live block's question, 41px, 36px at 768–1023px and 31px below, and 26px on a page without topics.

## Shared · Space and shape

- Spacing is one 4px-based scale: `space-4`, `space-8`, `space-12`, `space-16`, `space-24`, `space-32`, `space-48`, `space-64`, `space-96`, `space-128`. Pages mostly use 8 to 64; slides use 24 to 128. The front page's gutter, gaps and section spaces have their own layout tokens (see Website · Layout). Paddings and gaps come from the scale or those tokens; widths and heights of drawn things are free.
- **Shape.** If something is curved, it is a line or a node. Everything else has square corners: cards, the note's paper, buttons, chips, images. The radius tokens `radius-sm`, `radius-md`, `radius-lg`, `radius-xl` and `radius-pill` are kept at 0, so anything that reads them takes the square corner. `radius-circle` (50%) is for nodes, discs and portraits (the team list's photos among them), the ContactBlock's coral bullets, and the carried-over avatars and route stops.
- No borders round cards, and no shadows under them. Hairlines in `border` divide list rows and the footer. A figure that stands alone is framed by one hairline: the content Figure, and each of the impact page's usage figures. The one shadow in the new look is `shadow-note`, under the note's paper on the front page and under the Postit's off it, set as `filter: drop-shadow(var(--shadow-note))` so it follows the tab's shape. `shadow-sm`, `shadow-md` and `shadow-lg` are no longer used by any component; they stay until the site's Sass drops them. Slides draw no shadow.
- No left-border cards. A notice (Callout) has no frame: it sits on a short `blue` line from a `coral` node to a ring node (see Website · Lines and nodes). The only left rules are the Prose blockquote (3px `blue`) and the prose definition (2px `border`).

## Slides

Slides are in the new look. The road is retired: where a slide showed a sequence on the road, it now shows a blue line with a node per step. All nine slide components are redone, and every slide shares one title block: the eyebrow in `text-muted` caps and the title in the serif at 420 (the serif is provisional). SlideCover has two layouts: `network`, the front page's network across a sky band over the title on white, and `band-title`, the website band with the title in it over the speakers and a row of logos. The content slides have white surfaces, square corners and 2px `border` hairlines; `blue` is their one working colour, and `coral` and `yellow` appear only as small spots (a node, a disc, the funnel bar that marks the point). Their text is Nunito Sans. The footer row too. Their words are few: see Slides · Voice. SlideStats, SlideFunnel, SlideWindow and SlideQuestions follow these rules as Claude extended them from the three slides Danielle decided (cover, frame, section stop), for her to check.

## Slides · Voice for talks and decks

**Slides are not read.** A slide carries only enough words to cue the presenter, and it supports the point visually: the drawing, the line and its nodes, the numbers and the layout carry it. The argument is spoken, and it lives in the speaker notes.

- About 20 words a slide is the default for every slide and every component preview. Count every visible word except the site name, the slide number and, on a closing slide's contact row, the email address (the components mark these `data-uncounted`). A source or a credit line in the footer row counts, and numerals count.
- 50 words is a hard ceiling, and only for a text-only slide, one where no drawing does the work: SlideFrame with a statement panel or children and no cards, a SlideBuild table, or SlideQuestions. Every other slide type has a drawing and stays at about 20.
- When a slide has too many words, replace them with a device the system already has (nodes on a line, a stat numeral, bars, a meter) before you delete them, and move the rest to the speaker notes.
- Optional props that add words (a card's body, a statement panel, a list under the stats, descriptions under steps, captions) are off in every preview. Turning one on does not lift the 20 words.

The site's voice (plain, second person, short declaratives) carries into slides, with these additions, learned from an academic deck for Statistics Netherlands. The audience for a talk is usually researchers or methodologists; write for them, not for a buyer.

- A slide title states a finding or names a topic, in as few words as carry it. It is a sentence or a noun phrase, never an imperative or a slogan: "Retrieval timing: feeds are recent and content disappears", not "Fetch fast: feeds are fresh and videos disappear"; "Each export covers at most six months of viewing", not "What a six-month export gives you".
- In a title, and in the speaker notes, say a problem in a full sentence from the researcher's standpoint, not as a compressed phrase: "We do not control what the platform delivers", not "The window is the platform's"; "We only have data from people who donate", not "Who donates is a selection". Fragments read as jargon to anyone outside the project.
- No antithesis for effect. Not "Error moves, it does not vanish", not "links, not content", not "It's not X, it's Y". Say what is the case: "The record itself can still be wrong"; "A watch history consists of links; the content must be retrieved."
- Numbers carry their base and their status, on the slide in a few words ("LISS panel, aged 50+") and in full in the notes: "29 to 36% in LISS", "270 usable donations of 2,600 invited", "preliminary". Hedge with "may", "to date", "in this study"; never "unprecedented", "powerful", "seamless", "unlock", "leverage".
- Name a study by what it measures, not by its headline topic: "crime and policing content on TikTok", if that is what the codebook codes, even when the public page says "online hate".
- Options are numbered neutrally ("Option 1, 2, 3"), and the one the project recommends is shown by layout (the card framed in `blue`), not by adjectives.
- The limits of a method get the same weight and the same plain sentences as its advantages. Cue them on the slide that makes the claim and say them there, not in an appendix.
- A closing slide asks the audience's questions, starting from their own problems and their own prior work, rather than offering a service. For a research audience, "Where could donation help a survey office?" with three open questions of a few words each; never "Want to run a study?" with three routes. Access routes and contact go in the speaker notes or the footer row.
- Speaker notes carry the long version. Anything the presenter will say aloud comes off the slide and into the `<aside>`: definitions, descriptions of steps, the list behind a number.

## Slides · Idioms and components

Decks use the Slides artifact type: 1920 × 1080, one `<section>` per slide, inline styles from a closed CSS subset, hex values rather than tokens. The idioms are are components in the **Slides** group of the same bundle (`window.D3I.SlideFrame` …), so a new deck starts from them rather than from a blank slide. Each renders one `<section>` with inline styles in this system's hex values, from props that hold the slide's content: a deck is a list of props.

- In a design canvas, mount the component (`D3I.SlideFrame` with its props).
- For a Slides deck, `D3I.slideMarkup(D3I.SlideFrame, props)` returns the slide as markup to paste: one `<section>`, hex colours, `data-fit` attributes kept. It needs React and ReactDOM 18 on the page, as `components/lib/` provides.
- By hand, follow the component's README: it lists every value the component draws. Pictures (platform marks, glyphs, logos) are props in every case; each README's "What you provide" says which asset and how to fetch it.

- SlideCover: the cover and the closing slide, in two layouts: `network`, the network band with no words over the title, subtitle and speaker line on white; and `band-title`, the website band with the title in it over the speakers, venue and logo row.
- SlideFrame: the frame every content slide shares (eyebrow, title, pinned footer row) with its commonest body, three cards hanging from one line, each a picture and a few words; a statement panel framed by hairlines is optional and adds words.
- SlidePlan: the overview, a line with one numbered node per part and the part headers under it, in place of an agenda.
- SlideSectionStop: the opener for each part, the big part number in the serif, a few words of claim, and the line stepping down at the current part's coral node.
- SlideBuild: one step of a build, same-numbered slides adding one row at a time with earlier rows dimmed, a word or two a cell in the serif; a line with a node per step on top is optional.
- SlideStats: stat numerals in the serif in `blue`, a word each, in columns divided by hairlines, with a bar chart or a grid of platform marks in a column; the list they summarise, under a hairline, is optional.
- SlideFunnel: layout that makes the point, a funnel with the value at the end of each bar (the last bar `coral` when it marks the point) and a meter of three options, the recommended one framed in `blue`; side by side, or each alone on a slide, where it fills the slide.
- SlideWindow: a drawn browser window, square and framed by hairlines, for showing software beside its steps, which hang on a vertical line with a node each.
- SlideQuestions: the closing or discussion slide for a research audience: up to three short questions hanging from one line, contact and logos in the footer row; problems, changes and framed cases are optional.

Rules every slide follows, whether a component draws it or you do:

- The section has `slide-margin` (128px) on three sides and 136px at the bottom, and a base line height of 1.4. The footer row is pinned 64px from the bottom: site name (or a source line) left, slide number right, `slide-label` in `text-muted`.
- The title block is `slide-eyebrow` in `text-muted` caps (Nunito Sans 800), 16px above `slide-title` in `heading`, in the serif at 420, 64px (provisional), at the top margin on every slide, both with `data-fit="none"`. Blocks below it are 32 to 48px apart (`space-32`, `space-48`).
- Words: see Slides · Voice. A body of few words sits in the middle of the space under the title block, except a build's table, which stays put so that nothing moves between steps.
- Budget: the flow between the margins is 816px tall and ends about 40px above the footer. The Slides canvas does not scroll an over-full slide: it squeezes every box and shrinks each box's text on its own, so headings end up at different sizes from slide to slide. `data-fit="none"` keeps the eyebrow and title at their size whatever the body does; measure with the real faces, and split a slide that does not fit rather than letting it squeeze.
- A build's steps share one geometry: the same gaps and paddings on every step, so a new row appears and nothing else moves.
- Hairlines on a slide are 2px `border`: 1px thins out on a projector. Corners are square.
- Cards: a row of sibling cards has no frames or fills; it hangs from one 3px `blue` line with a filled node over each card and a ring node at each end (SlideFrame). Card eyebrows are `text-muted`: coral and yellow are not text in the new look. A statement panel is `surface` framed and divided by hairlines. Lines inside a card are 8 to 12px apart. Dividers rather than borders for lists. A card that must stand alone (a funnel, a meter option, a case) is `surface` framed by a 2px `border` hairline, never tinted; the recommended option's frame is 2px `blue`.
- Let layout make the point: a meter for options, a funnel with the value at the end of its bar, a line with a node per step for a sequence, a statement in a framed panel for a finding. Avoid three identical cards in a row when the three things differ in kind.
- Bars are `blue` and square; one `coral` bar may mark the point. Every bar in a chart the audience reads carries its value as text at its end or top; axes are a 2px `border-strong` rule with `slide-label` text. The bars in a drawn software window are a picture of the software and need no values. Platform marks appear at 32 to 48px beside the name they stand for, never alone.
- The slide format caps padding at 256px and drops a larger value entirely; images are referenced as `/_blob/<id>`; fonts are declared in `deck.json` from the files listed under Builders. Code and file names use `'Courier New', monospace` on `surface-tint`, since the site's mono stack is not a web font.

## Slides · Palette in hex

Slides take hex values. These are the light theme's values, and the only colours a slide uses. Slides have no dark theme.

| token | hex | on a slide |
| --- | --- | --- |
| `surface` | #ffffff | the ground, every card, panel, window and option |
| `border` | #d5dae3 | 2px hairlines: frames, row dividers, window chrome, window dots |
| `border-strong` | #878e9b | the axis rule of a bar chart |
| `heading` | #252a34 | titles, item titles, numerals that are not blue |
| `text` | #363b46 | body text |
| `text-muted` | #626976 | eyebrows, footer, captions, secondary lines, earlier build rows |
| `sky` | #87c5eb | the cover's band |
| `blue` | #4272ef | lines and their nodes, numerals, the cover's eyebrow, the band-title cover's subtitle, bars, meter fills, the recommended option's frame, the argued-for column's rule |
| `coral` | #ff5e5e | spots only: the current node on a line, the funnel bar that marks the point, a case's disc |
| `yellow` | #ffcf60 | spots only: a case's disc |
| `on-accent` | #ffffff | text on blue fills and on the band |

No slide uses the tints, `yellow-text`, `road`, `surface-tint`, `surface-strong` or the chart colours. Code set by hand is the one exception: `'Courier New', monospace` on `surface-tint` (#f5f7fb), since no component sets code.

## Website · Voice and content

- Plain, direct, second person, short declaratives. Real copy: "Participants always stay in control during their participation. Raw data never leaves their device unless they explicitly choose to share it."
- Headlines say what the thing is or does: "Open infrastructure for data donation research", "Software for running data donation studies", "How to get access". Sentence case everywhere, nav and buttons included; proper nouns keep their case (Port, Next, ODISSEI, D3I, SURF Research Cloud).
- Invite with a question or a link, not an exclamation: "Interested?", "Have a question or want to discuss your study?". The one exclamation mark on the site is on the front page, at the end of the line about the newsletter and the team.
- Eyebrows are one to three words: "For newcomers", "For researchers", "For developers". The note's and the Postit's are in sentence case, not uppercase: "Position", "Outage".
- What leads somewhere as a whole carries the arrow disc, and a link's label is plain words: "Read our letter", "More", "Learn about data donation". No label carries an arrow. No component writes a text arrow any more. The site's own news and event templates still add one, `<span aria-hidden="true">→</span>`, until those pages are redone.
- Routes speak the reader's own question: "Are you a researcher in the Netherlands?", then one or two sentences, then steps of one line with one action each.
- Email is shown, not hidden: "Email DataDonation@uu.nl", linked with a subject line.
- Step numbers are two digits, "01", "02", "03". In the next step (JourneyNext) the number is the largest thing in its block; on the journey hub it sits in a disc on the line.
- No emoji, no icons inside text. Dates in running text read "October 1-2, 2026" and "September 8, 2026". In a list row the date is the month over the day.

## Website · Links and the arrow disc

- A link is text in its own colour, at weight 700 (`link`), with a dotted `sky` underline that turns solid on hover and on keyboard focus. The underline is `line-underline` thick and sits `line-underline-offset` below the text. The colour never changes.
- A title that is a whole-line link (card headings, news and event titles) keeps its own weight (`card-heading`, `row-title`) and takes the same underline, at `line-underline-offset-title`.
- The note's link text on its tab is `blue`, in `note-label`.
- **The arrow disc** is a `blue` disc with a white arrow. It marks the few things that lead somewhere as a whole: the note and the Postit (`disc-arrow`, 36px), the next step at the foot of a journey page (JourneyNext, `disc-arrow`), and "More" and every action link (`disc-arrow-sm`, 24px). Nothing else carries it; a card or a row is a link through its title.
- **The exclamation disc** is its counterpart for a notice that leads nowhere: a Postit without a link carries, in the arrow disc's place and at its size (`disc-arrow`), a `coral` disc with a white "!". The arrow disc marks what leads somewhere; the coral exclamation disc marks a notice that leads nowhere. Nothing else carries it.
- "More" is `label` in `text`, followed by a short dotted `sky` line (a repeating dot `line-dot-page` high, one every `line-dot-spacing`) and the arrow disc. The dotted line turns solid on hover and on keyboard focus. Off the front page an action link (ActionLink) takes the same form: `link` in its section form, `label` in its compact form, `space-8` between the parts. A long label wraps, but its last word stays with the dotted line and the disc. It is the thing to click, one per card or section; there are no buttons.

## Website · Lines and nodes

- Every piece sits on a line. Every line starts and ends at a node, or leaves the page.
- Large discs are meaningful nodes with an icon: `disc` (39.6px) for the pieces in `assets/Network`, `disc-sm` (25.8px) for the tick on the funnel's dotted circle. Small white dots are plain nodes: `node` (9px). The nodes on the band's lower edge are `node-edge` (11px). The note's dotted line ends at a ring node, `node-ring`. A notice (Callout) sits on a short `blue` line (`line-page`) beside its text, from a `coral` `node-edge` at the top to a ring node at the bottom.
- Level changes take the designer's shape: a rounded corner, a straight diagonal, a rounded corner. The step in the band's lower edge has the same shape.
- Solid lines are `line-band` (1px) on the band, in `on-sky`, and `line-page` (1.5px) on the page: the band's lower edge in `blue`, the story where it hangs below the band in `sky`, the note's run along its tab in `blue`. `line-hairline` (1px) in `border` is for rules between list rows and in the footer; those are hairlines, not part of the drawing.
- Dotted lines are a round cap on a near-zero dash: `line-dash`, with dots `line-dot-band` wide on the band and `line-dot-page` below it. The note's dotted line along its tab is `line-dot-note` with `line-dash-note`. Drawn in HTML, a dotted line is a repeating dot `line-dot-page` high, one every `line-dot-spacing`.
- **Wayfinding** sits on lines too, each closed by ring nodes. The SidebarPanel's pages are `node`s on a `blue` line, and the current page is the one `coral` `node-edge`. Each route is its own vertical `blue` line, headed by its glyph in white on a `blue` `disc`, with a `node` per step. A journey hub's steps all sit on one vertical `blue` line, each number in a 48px `blue` disc on it.
- **Cards and lists** off the front page are its list rows: the date column (the month over the day), the title as the link, rows between `border` hairlines, no boxes. The featured event marks itself with a `coral` `node` under its date. A news item without a picture shows its date on a `sky` `node-edge` in a hairline frame. The team page is the same idiom in two columns: a 56px round portrait beside the name and the tags, rows between hairlines. On the impact page each number is in ink, its label opening on a `node` in its series' colour (`chart-1` to `chart-5`).
- The designer's pieces are shown at `node-scale` (0.6) of their size in the hero file.

## Website · The band

The band is the `sky` block across the top of the front page, full width. It is the only colour block on the site.

- It is `band-depth` deep on its shallow (left) side and `band-drop` deeper right of the step in its lower edge.
- Its lower edge is a `blue` line (`line-page`) with a step in it: the designer's S-curve, `band-step-width` wide, with the `coral` node (`node-edge`) at its middle and a `blue` node on the deep side. From 1280px the step is centred on the page.
- The title (`title`, in `on-sky`, always two lines) and the subtitle (`lead`, in `blue`) are centred, `band-pad` below the band's top, in a column twice `band-half` plus 40px wide. A line runs through the title at `band-thread`, between two `node`s 6px outside its column. The drawing on either side starts `band-gap` from the title's column.
- **Left of the title: the participant's story.** The switch (controlling what is donated), the lock (safety), the phone (where the data come from), the chart (seeing it), the tick on the dotted circle round the funnel (saying yes), the person, and the map pin. Its lines are the designer's own, from the left of their hero. It stretches with the space up to `band-story-width`. The story is deeper than the band (`band-story-depth`) and hangs below its edge, where its lines turn `sky`. Its main line comes down onto the title's line just before the title.
- **Right of the title: the research side.** Just after the title the line drops to the height of the note's corner. It rises to the chart on the anchor and runs down to the globe. From the consent badge a second line climbs to the woman. A dotted line runs from the music note to the woman, and her line leaves the page.
- The drawing's own positions are in `docs/front-page-reference/source/build.py`, not in the tokens. It is drawn with the thread at 146px and moves with `band-thread`.

## Website · The note

The note carries one timely message, such as a position statement. It is not part of the band: it lies on top of it and can be switched off, and the band is complete without it.

- **The anchor** is the one fixed point the band and the note share: the centre of the note's arrow disc. Across, `band-anchor-x`: 248px into the space right of the title, or 55% of that space, whichever is larger. Down, `band-anchor-y`: 196px from the top of the band. The note hangs from the anchor and grows upwards with its text. Its `coral` corner node is `band-corner-x` (232px) left of the anchor and `band-corner-y` (30px) below it.
- The band keeps the chart on the anchor, at `disc-arrow`, the size of the arrow disc, and brings its line to the height of the coral corner node. With the note on, the line from the title reads on through the note.
- **From 1280px:** `paper`, `band-corner-x` wide, padded by `note-padding`, under `shadow-note`. A tab at the lower left (`note-tab-width` wide, `band-corner-y` high) holds "Read our letter". A dotted `blue` line runs along the tab to a ring node, and the arrow disc sits on the corner. The whole note is a link.
- **Below 1280px:** no paper and no line. The eyebrow and title, the body sentence (down to 1000px only), and the arrow disc, as plain text in the niche under the band's shallow side, starting at `page-edge`. The niche is `band-niche-lg`, `band-niche-md` or `band-niche-sm` wide and ends `band-niche-gap` before the step. The parts are `note-gap` apart, `note-gap-sm` below 600px. The whole note is a link.
- Type: the eyebrow is `note-label` in `coral`; the title is `note-label` in `heading`; the body is `note-text` in `heading`; the tab's link is `note-label` in `blue`.
- What the niche shows below 1280px with the note switched off is not decided yet. The reference README lists this and the known, accepted flaws.
- **Off the front page** the note is the Postit, on content pages and directory hubs: the paper form at every width, 16.25rem wide, with the same tab, dotted line, corner node, type and, when it links, the arrow disc and the tab's label; when it does not, the coral exclamation disc on the corner and an empty tab. On a content page it floats right of the text from 768px; a directory hub pins it top right of its hero. One per page, only while timely.

## Website · Below the band

- **Three cards**, without borders or pictures, centred, `cards-top` below the band's lower edge and `card-gap` apart. Each has an eyebrow (For newcomers, For researchers, For developers) in `eyebrow` and `text-muted`; a serif heading in `card-heading` and `heading`, with the link underline; and a sentence in `body`, at line height 1.55, in `text`.
- **The line about the newsletter and the team**, centred, `outro-top` below the cards, in `body` and `text`, with its links.
- **The two lists**, after `section-space`, the front page's one large break: Latest news on the left and Upcoming events on the right, `list-gap` apart. Each is a heading in `list-heading` that ends its line with "More" and the arrow disc, then rows: date, title, and for events the place. Four rows each. No pictures, no summaries. Every upcoming event is listed, not only featured ones.
- A row is the date (the month in `eyebrow` and `text-muted`, over the day in `numeral` and `heading`), the title in `row-title` and `heading`, and for events the place in `caption` at 700 in `text-muted`. Rows are divided by `border` hairlines, with one above the first row and one below the last. The lists are set in `small`. `lists-bottom` lies below them.
- **The header and the footer** are under Header and footer, below.

## Website · Layout

- One centred column, `site-width` (72rem). `page-edge` is its left and right padding: `gutter` (24px) in narrow windows, the column's margin plus `gutter` in wide ones. The header, the cards, the lists, the footer and the note in the niche start at `page-edge`.
- The band is the only thing that breaks the column; it runs full width.
- The front page's vertical rhythm, top to bottom: the band, `cards-top`, the cards, `outro-top`, the line about the newsletter and the team, `section-space`, the two lists, `lists-bottom`, the footer.
- `content-width` is for everything read and `measure` for leads. From 900px a content page is a two-column grid: a `sidebar-width` column on the left, the reading column on the right. Below 900px it is one column with the sidebar first.
- Hubs come in two modes. Journey hubs (Software, Prepare a study) stack their numbered steps on one vertical `blue` line, `space-64` to `space-96` apart, each image letterboxed in a 5:4 box. From 900px the line runs down the middle and the image and the text alternate sides of it; below that it runs down the left, with the image above the text. Directory hubs (Community, About) are a 3:6:3 hero over a list of entries divided by `border` rules, with the Postit pinned top right.
- On those pages, figures float right (sometimes left) from 900px at about 14rem wide, `space-32` from the text, in a square frame with a `border` hairline and a caption closed by another (see Content pages); below that they centre above the text. The news page leads with its newest item, the picture (7fr) beside the text (5fr), over a grid of the rest three across; below 768px both stack. Completed projects are dossiers: a 248px side column with the picture and the key facts, the text beside it, stacked below 768px. Grids: news 3-up from 768px, people a two-column list (one column below 768px), institutions `auto-fit` at 15rem, routes 2-up from 900px. Rows wrap; nothing scrolls sideways except the script-selector frame. These widths live in the components' CSS. The breakpoint tokens now describe the front page, and 768px is not among them.
- The footer pins to the bottom of short pages (the body is a flex column).

## Website · Header and footer

**Header.** One row, `58px` high, at every width: 16px above, a 41px row, and a 1px faint hairline under it. It is sticky and white.

- The name is 16px at 800 in `ink`, with the tagline under it in `nav-text`, 14px. The two read as one link home.
- From 1000px, the name is on the left and the six main links on the right, 28px apart (14px of padding either side of each label; the last label ends on the page edge). The links are `nav-text`, 15px at 500. On hover and on keyboard focus a link turns `blue` and grows a 4px `blue` bar. The page's own link has a faint tint behind it.
- Below 1000px, the six links fold away. The row holds the name and a "Menu" button (`heading`, 15px at 600), and the button opens a drop-down panel: the same six links, one per row, at the header's full width, over the top of the page rather than pushing it down. A row is 44px, rows are divided by `border` hairlines, and the hover bar stands at the row's left end. The button's `aria-expanded` says whether it is open.
- The panel closes on a tap or click outside it, on Escape (focus returns to the button), when a link is followed, and when the window grows to 1000px.
- Without JavaScript the button stays hidden and the links wrap under the name. The header is then 107px high at 800px wide, 148px at 600px and 189px at 390px.
- A skip link ("Skip to content") stays fully off-screen until it takes keyboard focus.
- Every vertical size in the header is a whole number of pixels at the default font size, so the front page's thin lines below it never land on a half pixel.

**Footer.** Three parts under a faint hairline, each separated by `space-16`: who provides the service, the project partners, and the copyright line.

- The providers are a labelled pair: "Provided by" over the ODISSEI logo and "Supported by" over the Eyra logo. The labels are `label`-sized small capitals (0.72rem, 0.08em tracking) in `nav-text`. A faint hairline closes the pair.
- The partners are under one label, "Project partners". On a phone they are a grid of two columns, edge-aligned, the block centred and its label with it. From 768px they are three columns, centred. From the width where all six fit in one row, they are six in a row, spread evenly.
- Every logo has the same ink area, the part of the file that is not white or transparent. The providers' logos have 17.8rem² each (`$footer-provider-area`) and the partners' 13.7rem² (`$footer-partner-area`). A wide logo is therefore low and a compact one tall. Pale, thin logos are enlarged a little more, since thin type reads as thin however large it is. The providers' area keeps the ODISSEI wordmark above 9px; the partners' is the largest at which two columns fit a 360px phone. Below 360px every logo shrinks together to 85%.
- Some files carry whitespace of their own. That whitespace is the logo's clear zone: no other logo may sit in it, and the gaps between columns and between partners are as wide as the widest zone. A logo is placed by its ink, not its file.
- The copyright line is 0.85rem in `nav-text`. Never recolour a logo.

## Website · Content pages

- **Figures** are square. The picture sits in a frame of one `border` hairline, and the caption beneath is closed by another. There is no tinted panel behind it (not `surface-tint`), no radius and no shadow. The caption is 15px in `text`, line height 1.5, left aligned, 0.6rem under the frame and 0.7rem above its closing line. A figure sits 1.75rem below the text and 1.5rem above what follows, no wider than `content-width`.
- **Code blocks** are sky blue: a white block with a 1px `sky` border, padded 1rem, scrolling sideways if a line is long. Inline code is `surface-tint` with 0.15em of padding and no outline.
- **Prose spacing.** The reset zeroes margins, so the prose gives them back. A second heading has 2.25rem above and 0.15rem below, in the serif at 1.6875rem and weight 420 (the serif is provisional). A third heading is the sans at 700, 1.75rem above and 0.1rem below. Lists have 0.4rem above and 0.9rem below, and 0.3rem between items. A code block has 0.6rem above and 0.9rem below. A definition term is `ink` at 800; its definition has a faint 2px coral rule at its left.
- **A news article** is a 40rem column. Its date comes first, over the title: 11px, 700, upper case, 0.12em tracking, in `text-muted`. Beside it is the "Latest news" rail, 15rem wide and 4.5rem from the column, the two side by side from 64rem and centred as a pair. Below 64rem the rail sits 2.5rem under the article, in a column of the same width. There is no sidebar on a news article.
- **Figures in an article** reach 2rem past the text on each side from 48rem. The caption keeps the text's width.
- **The rail** is the front page's list in small. A heading "Latest news" in the serif (22px, weight 420, provisional) in `heading`, ending its line with "All", a short dotted `sky` line and the arrow disc, 22px. Under it, up to five rows, with a `border` hairline above each and one below the last: the date as a month over a day (10px caps in `text-muted` over a 20px serif numeral in `heading`, in a 38px column), then the title at 14.5px, weight 600, in `heading`. The rail shows the five newest other news items dated no later than the build. A row that has an external link opens it in a new tab. A rail with no rows is left out.

## Website · What shows at each width

The breakpoints are desktop-first: `bp-lg` (1280px), `bp-md` (1000px), `bp-lists` (900px) and `bp-sm` (600px). A tier's `-lg`, `-md` or `-sm` tokens apply below its breakpoint, as a max-width query one pixel less (below 1000px is `(max-width: 999px)`), down to the next breakpoint. An unsuffixed token holds from the widest window down to the first tier that has its own value.

| Window width | Left of the title | Right of the title | Note |
| --- | --- | --- | --- |
| 1280px and up | The full story | The full research side | On top of the band, hung from the anchor |
| 1000 to 1279px | Phone line; person and funnel on the title's line | The drop to the globe; the woman's dotted line | In the niche, with its body sentence |
| 600 to 999px | Person and funnel on the title's line | Woman and globe on the title's line | In the niche, without its body |
| Under 600px | Nothing | The globe on the band's edge | In the niche, without its body |

- The title is `title` from 1000px, `title-md` from 600 to 999px, and `title-sm` below 600px. The subtitle is `lead` from 1000px and `lead-md` below.
- The cards go to two columns below 1000px, `card-gap-md` apart, with the third spanning both, and to one column below 600px.
- The two lists stack into one column below 900px (`bp-lists`), `list-gap-stacked` apart.

## Website · Imagery and icons

- The front page has no pictures besides the band's drawing and the partner logos in the footer. The cards and the lists carry none.
- The band's pieces are in `assets/Network`: the participant's story (switch, lock, phone, chart, funnel, tick, the man's portrait, map pin) and the research side (globe, consent badge, music note, the woman's portrait). Nine are cut from the designer's hero artwork and three were drawn later; the group's README says how they are made. They are the front page's only icons, and each sits on a line. The arrow disc is the only other mark.
- Partner and provider logos are shown small, each sized to the same ink area (see Header and footer; `assets/Partners`, `assets/Logos`). Never recolour them.
- Off the front page: flat unDraw figures recoloured in one accent (`assets/Illustrations`, `assets/unDraw`), flat or in a square hairline frame (PageIntro, Figure), letterboxed on the journey hub; and the two stroke glyphs (`assets/Glyphs`), white on the `blue` disc that heads each route.
- News pictures are each item's `image`, its social-sharing card: 1200 × 628 (1.91:1). The news page shows them at that shape, cropped by `object-fit: cover` until each item has a proper card, and unframed (`assets/News`). A completed study's banner is shown uncropped at its own shape, 2.6:1 to 5.2:1, in a `border` hairline frame (`assets/Projects`).
- People's photos are 56px circles beside their names in the team list (PeopleGrid). Team photos are not in this system; a member without one has no image.
- Platform logos are 18px marks inside square hairline chips on the impact page (`assets/Platforms`).
- The ContactBlock's topics hang on 0.45rem `coral` round bullets. It has no photos and no drawn devices.
- The earlier homepage hero is retired from the front page: the `blue-tint` disc, the clouds and plane, and the road with its travellers (`assets/Sprites`).

## Website · Motion

- The front page has almost no motion. A link's dotted underline turns solid at once on hover and on keyboard focus; its colour never changes. A version in which the underline regrew from the left was tried and reverted.
- The header's links grow a 4px `blue` bar from the centre (`scaleX` 0 to 1) over 0.2s ease-in-out and turn `blue`. In the Menu panel the bar stands at the row's left end and grows downward (`scaleY`). The SectionSubnav's links and the team page's filter tabs grow the same bar, standing on their hairline. Other motion is not part of the system.
- Everything honours `prefers-reduced-motion: reduce`.

## Website · Components

React components that render the site's own markup, styled by `components/bundle.css`. `components/bundle.js` defines them on `window.D3I` and needs React 18 (`components/lib/` carries react and react-dom 18.3.1); `tokens.css` and `components/bundle.css` style them. Every class name they emit is one the site uses. Mount the component instead of copying its markup: its card lists the props, and its README says what to pass and when to use it. Images, logos and sprites are props, and no picture has a default: inside this system's previews they carry the uploads' `/_blob/<id>` URLs, which resolve nowhere else; in your own page pass a copy you serve. Each component's "What you provide" section says which asset and how to fetch it. Containers are parts of the component they hold (`NewsCard.List`, `HubStep.List`, `UsageFigures.Figure`).

Two things are not yet revised and still in the earlier look: InstitutionCard, which keeps its old colours, sizes and layout until the network page leaves the site, and the journey hub's hero above the steps (see HubStep), which was never redesigned. The front page is FrontPage, holding Band with Note on it, then HomeCard.Grid and ListRow.Lists. The line about the newsletter and the team between them has no component: it is a centred paragraph with two Links. A news post is NewsArticle, its body Prose content with a Figure where it has a captioned picture.

- Shell: SiteHeader (the name, the six links, and below 1000px the Menu drop-down, open, closed or without JavaScript), SectionSubnav (a section's pages under the header, white over a hairline, the current one on the header's blue bar), SiteFooter (the labelled provider pair, the partner grid and the copyright line; logos by the keys the site measured).
- Front page: FrontPage (the `<div class="home">` wrapper every front-page style hangs off), Band (the sky-blue band: the drawing, the title and the subtitle, with the note as its children), Note (the timely message on the band), ArrowDisc (the small arrow disc that ends "More"), HomeCard (the three borderless cards below the band, in `HomeCard.Grid`), ListRow (a row of Latest news or Upcoming events, in `ListRow.List` with its heading and "More", the two lists in `ListRow.Lists`).
- Actions: Link (a link in running text: a plain `<a>`), ActionLink (the "More" form off the front page: label, dotted line, arrow disc, in a section and a compact form), ContactBlock (the closing contact block, 42rem and centred: the question in the serif and the address as a Link, beside plain topics on coral bullets or centred without them; no photos).
- Notes: Postit (the note off the front page: timely updates on directory hubs and content pages), Callout (a notice on a short line from a coral node to a ring node).
- Cards: NewsCard (NewsCard.Index is the news page: the newest item as the lead story, the rest a grid of 1.91:1 pictures, a date on a sky node where there is none; the row form is the list row with its summary), ArchiveCard (events as list rows: the date column, the title as the link, a coral node for the featured one, further actions as ActionLinks), InstitutionCard, ProjectCard (a dossier: the uncropped picture and the key facts, the year in the serif, beside the study), PeopleGrid (the team as a two-column list between hairlines: a small round portrait, the name as a Link, the tags as muted text; filter tabs on a hairline).
- Wayfinding: PageIntro (title, the illustration in a hairline frame, excerpt, actions as ActionLinks), SidebarPanel (section nav: the pages as nodes on a blue line, the current page coral), TableOfContents (a soft panel over the headings as running-text links), Routes (a fork: each route a blue line from a glyph disc, a node per step), JourneyNext (the next step, whose title is its link, ending in the arrow disc), HubStep (the journey hub's steps on one blue line, numbered in discs, each title its step's link).
- Content: NewsArticle (a news post: the date over the title, the body, and the "Latest news" rail), Prose (headings with their spacing, lists, links, blockquote, sky-framed code, table, definitions, rules), Figure (square and hairline-framed: the captioned content figure and the small floated one), EventDetails (label and value rows between hairlines, no panel), UsageFigures (each figure in one hairline frame: numerals in ink on nodes in the series colours, square platform chips, the globe's controls).

Where the system and the live site differ, the system leads and the site is to be brought in line; for the front page, the reference in `docs/front-page-reference/` leads both. The globe and the studies-per-year bars are JavaScript on the site; the components render their resting markup only.

## Builders · Files and assets

Namespace: `D3I`, the components' global (`window.D3I`). Every uploaded asset's id is on the generated cards `api/assets/<Group>.md`, and `design-system.json` under `assetGroups` maps every uploaded file name to its id. Pictures are uploaded assets referenced as `/_blob/<id>`, not files at their folder paths.

- A page or design canvas mounts the components: `tokens.css` and `components/bundle.css` first, then React 18 (the files in `components/lib/`, or the canvas's own), then `components/bundle.js`. `tokens.css` declares the font faces, Libre Caslon Condensed included. Upload the assets a component shows and pass their URLs as its props.
- A deck declares the two families in `deck.json` `faces` as `nunito-sans` and `libre-caslon-condensed`, from `fonts/NunitoSans-VariableFont_wght.woff2` and `fonts/LibreCaslonCondensed-latin.woff2` (with `-latin-ext` for accented names); the italic file is optional. The serif is provisional.
- A deck made from the Slide components loads React, ReactDOM and `components/bundle.js` only to produce markup with `D3I.slideMarkup`; the deck itself holds plain `<section>` markup.
- Platform marks are under Platforms (17 files), partner and funder logos under Logos and Partners, the recoloured unDraw figures under Illustrations and unDraw, the earlier hero's travellers under Sprites, the network cover's band under Slides (`cover-network.svg`, the source of SlideCover's `network` band; recorded in `design-system.json` without an id until a copy uploads it), and the front page band's pieces under Network (21 SVG files, with a README). The Network pieces are files in this folder only: they are not uploaded yet and have no ids in `design-system.json`.
- The three glyph PNGs under Glyphs (`chat-coral`, `train-yellow`, `card-blue`) are white glyphs recoloured in a single accent, 512px, for concept examples that have no platform mark. Use them at 44 to 48px above a card's eyebrow, in the card's own accent; they are for slides, not the website.
