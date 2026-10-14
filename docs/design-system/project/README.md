datadonation.eu is the website of D3I, the Dutch digital data donation infrastructure, and the hub of an international community of researchers. The look is a white page, three bright accents that each have a job, round Nunito headings, flat illustrations in the brand colours, and one playful motif: a road with travellers. Everything below names tokens in `tokens.json`, text styles in its `type.groups`, class names in `components/bundle.css`, components in `components/bundle.js` (`window.D3I`) and files under `assets/`.

The system is deliberately small: 23 colours, nine type sizes for the website and seven for slides, one 4px spacing scale, six radii, three shadows. Use what is here; when something seems missing, the answer is almost always an existing token used as its note says, not a new value.

## How this book is organised

The system serves two media from one set of tokens. Slides (1920 × 1080, read from the back of a room) are the main use; the website is the other.

- **Shared** sections (Colour, Type, Space and shape) hold for both.
- **Slides** sections cover voice for talks, the slide idioms and the rules every slide follows, the slide palette in hex, and the slide components in the Slides group.
- **Website** sections cover voice, layout, motion, imagery, iconography and the component cards in the Shell to Content groups.
- **Builders** closes with the files and asset ids a deck or page builder copies by hand.

## Shared · Colour

The palette has three layers. Learn the structure and you know every token.

**Neutrals: one cool grey family, eight steps.**

- `surface` is the ground of every page and slide. `surface-tint` is the one panel colour; `surface-strong` is a step darker, for small fills on a panel (pills, placeholders, empty tracks).
- `border` is every hairline; `border-strong` is a line that must be seen (control outlines, inactive indicators, chart axes).
- `heading`, `text` and `text-muted` are the three text colours: titles, sentences, everything secondary. Nothing else is coloured unless it has a job.

**Accents: three hues, each with a tint for panels.**

| hue | job | tint (panel) | fill, mark | text |
| --- | --- | --- | --- | --- |
| blue | structure and wayfinding | `blue-tint` | `blue` | `blue` |
| coral | the action and the count | `coral-tint` | `coral` | `coral` |
| yellow | warmth and the third item | `yellow-tint` | `yellow` | `yellow-text` |

- The accent fills, rules and marks: rails, stops, dashes, bars, bullets, step numbers.
- As text, an accent is for what you click or scan, as on the site: links in `blue`, action links and step numbers in `coral`, a yellow card's eyebrow and link in `yellow-text` (#e8b53c, the site's own yellow text). Set them bold (700 or 800) or large; never set body copy or small regular text in an accent.
- `yellow` itself is never text; `yellow-text` is the yellow that reads as text.
- The tint is the accent's panel: a callout, a featured card, one card of a row of three. A tint carries `text`, `heading` and its own accent.
- One coral thing per card or section: it is the thing to click or the number to remember.
- Accents rotate across siblings in the order blue, coral, yellow: a row of three tint cards, the homepage movements, the news-card fields. Two items alternate blue and yellow.
- Text on a fill: `on-accent` on `blue`; `heading` on `coral`, `yellow` and `road`.

**Special roles.**

- `road` is the road: the band under the homepage hero and across slide covers, plans and section openers, with `blue` dashes and stops on it. It also greys out muted bars in a chart.
- `focus` is the keyboard focus ring: 2px solid at 2px offset.
- `chart-1` to `chart-5` colour data series in that order (blue, coral, orange, teal, violet). Every mark carries its value as text.

Contrast: `heading`, `text` and `text-muted` pass 4.5:1 on every ground their notes name, in both themes. The accents do not as text in the light theme: `blue` is 4.3:1, `coral` 3.0:1 and `yellow-text` 1.9:1 on `surface`. The site accepts this for bold links and eyebrows and for large numerals, and so does this system; body copy and small regular text are never in an accent. The dark theme is proposed, not shipped: surfaces take the blue bias of `heading` and the accents lighten, which brings every accent above 4.5:1 there.

## Shared · Type

Two faces, both variable, both wired as font files: Nunito (`display`) for anything with weight, Nunito Sans (`sans`) for reading. They differ by their rounded terminals; the pairing is the brand's signature. The fallback stack is the system sans.

- Headings are Nunito 800 (900 for the largest and for numerals) with tight negative tracking and leading 1.05 to 1.2. Balance them with `text-wrap: balance`.
- Reading text is Nunito Sans 400. Labels, links and anything you scan are Nunito 700 or 800. Weight separates levels before size does.
- Uppercase is only for eyebrows (`eyebrow`, `slide-eyebrow`), always with their tracking.
- Numbers that line up (stats, steps, dates in rows) are Nunito 800 or 900.

**Website scale: 12, 14, 16, 18, 22, 28, 36, 48, 72px.** Fourteen styles in the Web groups: `display`, `h1` to `h4`, `lead`, `body`, `small`, `caption`, `label`, `label-small`, `eyebrow`, `numeral`, `code`. Body is `body` (16px, leading 1.6); figure captions are `caption`, Nunito Sans italic. A page uses at most three heading sizes. Below the 768px breakpoint `display` and `h1` step down one rung each.

**Slide scale: 24, 28, 36, 48, 64, 96, 200px.** Twelve styles in the Slides group: `slide-numeral`, `slide-display`, `slide-title`, `slide-stat`, `slide-heading`, `slide-subheading`, `slide-lead`, `slide-item`, `slide-body`, `slide-small`, `slide-label`, `slide-eyebrow`. Nothing on a slide is under 24px.

Use the styles as they are. A size that is not on the scale for its medium is a mistake to fix, not a variant.

## Shared · Space and shape

- Spacing is one 4px-based scale: `space-4`, `space-8`, `space-12`, `space-16`, `space-24`, `space-32`, `space-48`, `space-64`, `space-96`, `space-128`. Pages mostly use 8 to 64; slides use 24 to 128. Paddings and gaps come from the scale; widths and heights of drawn things (a 48px bar, an 80px stop) are free.
- Radii say what a thing is: `radius-sm` (4px) for code, small bars and the post-it, which is paper and not a card; `radius-md` (8px) for callouts, buttons and images inside a panel; `radius-lg` (16px) for cards, panels and the road band; `radius-xl` (24px) for the one feature card per page; `radius-pill` for chips, pills and tabs; `radius-circle` for photos, stops, dots and bullets.
- Borders over shadows. A card is `surface` with a 1px `border` at `radius-lg`, plus `shadow-sm` at most. `shadow-md`, tinted toward the brand blue, is for panels holding a picture (figures, the drawn browser window). `shadow-lg` is for the few things that float: the post-it, the homepage movement card, carousel arrows.
- No left-border cards. The only left rules are the callout (4px `blue`), the blockquote (3px `blue`), the route rail (3px accent) and the prose definition (2px `border`).

## Slides · Voice for talks and decks

The site's voice (plain, second person, short declaratives) carries into slides, with these additions, learned from an academic deck for Statistics Netherlands. The audience for a talk is usually researchers or methodologists; write for them, not for a buyer.

- A slide title states a finding or names a topic. It is a sentence or a noun phrase, never an imperative or a slogan: "Retrieval timing: feeds are recent and content disappears", not "Fetch fast: feeds are fresh and videos disappear"; "Each export covers at most six months of viewing", not "What a six-month export gives you".
- Say a problem in a full sentence from the researcher's standpoint, not as a compressed phrase: "We do not control what the platform delivers", not "The window is the platform's"; "We only have data from people who donate", not "Who donates is a selection". Fragments read as jargon to anyone outside the project.
- No antithesis for effect. Not "Error moves, it does not vanish", not "links, not content", not "It's not X, it's Y". Say what is the case: "The record itself can still be wrong"; "A watch history consists of links; the content must be retrieved."
- Numbers carry their base and their status: "29 to 36% in LISS", "270 usable donations of 2,600 invited", "preliminary". Hedge with "may", "to date", "in this study"; never "unprecedented", "powerful", "seamless", "unlock", "leverage".
- Name a study by what it measures, not by its headline topic: "crime and policing content on TikTok", if that is what the codebook codes, even when the public page says "online hate".
- Options are numbered neutrally ("Option 1, 2, 3"), and the one the project recommends is shown by layout (the highlighted card), not by adjectives.
- The limits of a method get the same weight and the same plain sentences as its advantages. Put them on the slide that makes the claim, not in an appendix.
- A closing slide asks the audience's questions, starting from their own problems and their own prior work, rather than offering a service. For a research audience, "Where could donation help a survey office?" with three open questions; never "Want to run a study?" with three routes. Access routes and contact go in the speaker notes or the footer.
- Speaker notes carry the long version. Anything the presenter will say aloud comes off the slide and into the `<aside>`.

## Slides · Idioms and components

Decks use the Slides artifact type: 1920 × 1080, one `<section>` per slide, inline styles from a closed CSS subset, hex values rather than tokens. The idioms settled so far are components in the **Slides** group of the same bundle (`window.D3I.SlideFrame` …), so a new deck starts from them rather than from a blank slide. Each renders one `<section>` with inline styles in this system's hex values, from props that hold the slide's content: a deck is a list of props.

- In a design canvas, mount the component (`D3I.SlideFrame` with its props).
- For a Slides deck, `D3I.slideMarkup(D3I.SlideFrame, props)` returns the slide as markup to paste: one `<section>`, hex colours, `data-fit` attributes kept. It needs React and ReactDOM 18 on the page, as `components/lib/` provides.
- By hand, follow the component's README: it lists every value the component draws. Pictures (platform marks, glyphs, logos) are props in every case; each README's "What you provide" says which asset and how to fetch it.

- SlideCover: the cover and the closing slide, with the road as a band across the top (the mark, a phone sending one piece of its data along an arc to the mark, the travellers).
- SlideFrame: the frame every content slide shares (eyebrow, title, pinned footer row) with the two commonest bodies, three tint cards and a statement panel.
- SlidePlan: the overview, a road with numbered stops and part headers, in place of an agenda.
- SlideSectionStop: the opener for each part, the big part number, one sentence and the road with the current stop highlighted.
- SlideBuild: one step of a build, same-numbered slides adding one row at a time with earlier rows dimmed and a step rail on top.
- SlideStats: stat tiles in the chart colours, a mini bar chart in a tile, and a list panel.
- SlideFunnel: layout that makes the point, a funnel with the value at the end of each bar and a meter of three options.
- SlideWindow: a drawn browser window for showing software beside a numbered list.
- SlideQuestions: the closing or discussion slide for a research audience: problem, change, question, with cases, contact and logos.

Rules every slide follows, whether a component draws it or you do:

- The section has `slide-margin` (128px) on three sides and 136px at the bottom, and a base line height of 1.4. The footer row is pinned 64px from the bottom: site name (or a source line) left, slide number right, `slide-label` in `text-muted`.
- The title block is `slide-eyebrow` in `blue`, 16px above `slide-title` in `heading`, at the top margin on every slide, both with `data-fit="none"`. Blocks below it are 32 to 48px apart (`space-32`, `space-48`).
- Budget: the flow between the margins is 816px tall and ends about 40px above the footer. The Slides canvas does not scroll an over-full slide: it squeezes every box and shrinks each box's text on its own, so headings end up at different sizes from slide to slide. `data-fit="none"` keeps the eyebrow and title at their size whatever the body does; measure with the real faces, and split a slide that does not fit rather than letting it squeeze.
- A build's steps share one geometry: the same gaps and paddings on every step, so a new row appears and nothing else moves.
- Cards: `surface` with a 1px `border` at `radius-lg` for parallel items; the three tints for a row of three siblings, each eyebrow in its accent's text colour; `surface-tint` for panels and code. Card padding is 32px; lines inside a card are 8 to 12px apart. Dividers rather than borders for lists.
- Let layout make the point: a meter for options, a funnel with the value at the end of its bar, a rail with stops for a sequence, a statement in a tint panel for a finding. Avoid three identical cards in a row when the three things differ in kind.
- Charts use `chart-1` to `chart-5` in order; muted bars are `road`; every bar carries its value as text at its end or top; axes are a 1px `border-strong` rule with `slide-label` text. Platform marks appear at 32 to 48px beside the name they stand for, never alone.
- The slide format caps padding at 256px and drops a larger value entirely; images are referenced as `/_blob/<id>`; fonts are declared in `deck.json` from the files listed under Builders. Code and file names use `'Courier New', monospace` on `surface-tint`, since the site's mono stack is not a web font.

## Slides · Palette in hex

Slides take hex values. These are the light theme's values; use nothing else.

| token | hex | on a slide |
| --- | --- | --- |
| `surface` | #ffffff | the ground, plain cards |
| `surface-tint` | #f5f7fb | statement and list panels, window chrome |
| `surface-strong` | #eceff5 | inactive tabs, empty meter tracks |
| `border` | #e2e6ed | card borders, row dividers |
| `border-strong` | #878e9b | axes, window dots |
| `heading` | #252a34 | titles, item titles, text on coral and yellow |
| `text` | #363b46 | body text |
| `text-muted` | #626976 | footer, captions, secondary lines, neutral eyebrows |
| `blue` | #4272ef | eyebrows, links, stops, dashes, bars, active tabs |
| `blue-tint` | #eef3fe | blue card, recommended option |
| `coral` | #ff5e5e | numerals, current stop, meter fills, coral-card eyebrow, action links, current-stop label |
| `coral-tint` | #ffefef | coral card |
| `yellow` | #ffcf60 | fills only |
| `yellow-text` | #e8b53c | yellow-card eyebrow and link |
| `yellow-tint` | #fff6d6 | yellow card |
| `road` | #c6d5fa | the road band, muted bars, recommended-card border |
| `on-accent` | #ffffff | text on blue fills |
| `chart-3` | #f4a52b | third series |
| `chart-4` | #27b3a3 | fourth series |
| `chart-5` | #8b5cf6 | fifth series |

## Website · Voice and content

- Plain, direct, second person, short declaratives. Real copy: "Participants always stay in control during their participation. Raw data never leaves their device unless they explicitly choose to share it."
- Headlines say what the thing is or does: "Open infrastructure for data donation research", "Software for running data donation studies", "How to get access". Sentence case everywhere, nav and buttons included; proper nouns keep their case (Port, Next, ODISSEI, D3I, SURF Research Cloud).
- Invite with a question or a link, not an exclamation: "Interested?", "Have a question or want to discuss your study?". The one exclamation mark on the site closes the homepage.
- Action links are a verb phrase and an arrow: "Learn about data donation →", "Use our script selector →", "Read our letter →". The arrow is markup, `<span aria-hidden="true">→</span>`, added by the template; a label never carries it.
- Routes speak the reader's own question: "Are you a researcher in the Netherlands?", then one or two sentences, then steps of one line with one action each.
- Eyebrows are one or two uppercase words: THE METHOD, FOR RESEARCHERS, OPEN SOURCE, POSITION, OUTAGE.
- Email is shown, not hidden: "Email DataDonation@uu.nl", linked with a subject line.
- Step numbers are two digits, "01", "02", "03": the number is the largest thing in its block.
- No emoji, no icons inside text. Dates read "October 1-2, 2026" and "September 8, 2026".

## Website · Layout

- One centred column: `site-width` for the shell and bands, `content-width` for everything read, `measure` for leads. The side gutter is `space-16`, `space-24` from the `bp-md` breakpoint.
- Content pages are a two-column grid from `bp-lg`: a `sidebar-width` column on the left, the reading column on the right, so a second sidebar panel can sit under the first. Below that, one column with the sidebar first.
- Hubs come in two modes. Journey hubs (Software, Prepare a study) stack numbered steps that alternate image left and right, `space-64` to `space-96` apart, each image letterboxed in a 5:4 box. Directory hubs (Community, About) are a 3:6:3 hero over a list of entries divided by `border` rules, with the post-it pinned top right.
- Figures float right (sometimes left) from `bp-lg` at about 14rem wide, `space-32` from the text, in a `surface-tint` panel; below that they centre above the text.
- Full-bleed bands break the column on the homepage only: the hero with its road, and the `surface-tint` news band the footer abuts directly.
- Grids: news 3-up from `bp-md`, people 2-up then 3-up, institutions `auto-fit` at 15rem, media 2-up, routes 2-up from `bp-lg`. Rows wrap; nothing scrolls sideways except the script-selector frame.
- The footer pins to the bottom of short pages (the body is a flex column).

## Website · Motion

- Links reveal a 1.5px or 2px underline by transitioning `border-color` over 0.15s ease; the colour never changes on hover.
- Main nav items grow a 4px `blue` bar from the centre (`scaleX` 0 to 1) over 0.2s ease-in-out and turn `blue`.
- Carousels slide over 0.55s `cubic-bezier(0.4, 0, 0.2, 1)` (movements) or 0.45s ease (news); the active dot stretches from 11px to a 32px pill over 0.3s. Gutter arrows scale to 1.08 on hover.
- Everything honours `prefers-reduced-motion: reduce`: the carousels stop transitioning.

## Website · Imagery

- Illustrations are flat unDraw figures recoloured in one accent each (`assets/Illustrations`, `assets/unDraw`), set in a tint panel or flat on `surface`, never stretched. One per section; the accent matches the component around it.
- The homepage hero is a composition, not a banner: a `blue-tint` disc behind the headline, clouds and a plane in the sky, and a CSS road with fixed-size travellers (`assets/Sprites`).
- Photos of people are circles: 5.5rem on the team grid on `surface-strong`, 7.5rem on the homepage news strip, where they sit on the card's accent field with a 3px `surface` ring and `shadow-md`, subject centred at 22% from the top.
- Partner and funder logos are shown small, in a strip, at their own capped sizes (`assets/Partners`, `assets/Logos`); never recolour them.

## Website · Iconography

- There is no icon set. Arrows are the text character "→" in the link's own type. Bullets are 0.45rem `coral` discs. The route stop is a hollow 0.8rem circle with a 3px accent ring. The carousel arrows are the characters "‹" and "›" in a 52px `surface` disc.
- Two stroke glyphs (`assets/Glyphs`) head the routes rails, inlined so `currentColor` takes the rail's accent.
- Platform logos (`assets/Platforms`) appear only as 18px icons inside platform pills.

## Website · Components

React components that render the site's own markup, styled by `components/bundle.css`. `components/bundle.js` defines them on `window.D3I` and needs React 18 (`components/lib/` carries react and react-dom 18.3.1); `tokens.css` and `components/bundle.css` style them. Every class name they emit is one the site uses. Mount the component instead of copying its markup: its card lists the props, and its README says what to pass and when to use it. Images, logos and sprites are props, and no picture has a default: inside this system's previews they carry the uploads' `/_blob/<id>` URLs, which resolve nowhere else; in your own page pass a copy you serve. Each component's "What you provide" section says which asset and how to fetch it. Containers are parts of the component they hold (`NewsCard.Grid`, `HubStep.List`, `UsageFigures.Figure`).

- Shell: SiteHeader (brand, nav), SectionSubnav, SiteFooter (logo strip), HomepageHero (the road composition).
- Actions: ActionLink (the coral arrow link in its three forms), ContactBlock (lead, topics, email).
- Notes: Postit (timely updates), Callout (notices).
- Cards: NewsCard (tile, row, homepage avatar), ArchiveCard (events, featured), MovementCard (homepage), InstitutionCard, ProjectCard, PeopleGrid (cards, filter chips, tag pills).
- Wayfinding: PageIntro (title, hero, excerpt, actions), SidebarPanel (section nav), TableOfContents, Routes (a fork with rails and stops), JourneyNext (next step), HubStep (numbered journey step).
- Content: Prose (links, blockquote, code, table, definitions, rules), Figure (figure panel, caption, media grid), EventDetails, UsageFigures (stat row, platform pills, globe controls).

The components follow this system, not the live site: where the two differ, the system leads and the site is to be brought in line (the section "Bringing the website in line" maps the old values onto these tokens). The globe, the studies-per-year bars and the carousels are JavaScript on the site; the components render their resting markup only.

## Builders · Files and assets

Namespace: `D3I`, the components' global (`window.D3I`). Every asset id is on the generated cards `api/assets/<Group>.md`, and `design-system.json` under `assetGroups` maps every file name to its id. Pictures are uploaded assets referenced as `/_blob/<id>`, not files at their folder paths.

- A page or design canvas mounts the components: `tokens.css` and `components/bundle.css` first, then React 18 (the files in `components/lib/`, or the canvas's own), then `components/bundle.js`. Upload the assets a component shows and pass their URLs as its props.
- A deck declares the two families in `deck.json` `faces` as `nunito` and `nunito-sans`, from `fonts/Nunito.woff2` and `fonts/NunitoSans-VariableFont_wght.woff2`; the italic file is optional.
- A deck made from the Slide components loads React, ReactDOM and `components/bundle.js` only to produce markup with `D3I.slideMarkup`; the deck itself holds plain `<section>` markup.
- Platform marks are under Platforms (17 files), partner and funder logos under Logos and Partners, the recoloured unDraw figures under Illustrations and unDraw, the hero travellers under Sprites.
- The three glyph PNGs under Glyphs (`chat-coral`, `train-yellow`, `card-blue`) are the one exception to "no icon set": white glyphs recoloured in a single accent, 512px, for concept examples that have no platform mark. Use them at 44 to 48px above a card's eyebrow, in the card's own accent; they are for slides, not the website.
