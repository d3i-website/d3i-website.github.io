The closing or discussion slide for a research audience: up to three open questions hanging from one blue line, with the contact line and funder logos in the last row. It ends a talk on questions, not on an offer; the problems behind them, what the method changes, access routes and pricing go in the speaker notes.

**Words.** About 20, counted as the brand book's Slides · Voice says. The preview has 20: the title and three questions of four or five words. The contact row is this slide's footer row: its email address and site name are not counted, and the `credit` line is (nine words for the usual one). Each row's `problem` and `change`, the `cases` and the `credit` add words and are off in the preview. The slide can be text-only, so 50 words is its ceiling with every prop on: one-line changes and two cases with a sentence each take it past 50, so keep them to a few words or leave them in the notes.

Mount `D3I.SlideQuestions` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideQuestions, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass up to three `rows`, each a `question` of a few words (optionally a `problem` of a word or two and a one-line `change`), the `email` and the `logos`; optionally up to two `cases` and the `credit` line. Wording follows "Voice for talks and decks": questions the audience can actually answer. `headers` is deprecated and ignored: the slide has no table any more.

- The title block: the eyebrow in `text-muted` caps, the title in the serif (Libre Caslon Condensed, provisional) at 420, 64px.
- The questions hang from the line SlideFrame's cards hang from (a ring node at each end, a filled `blue` node over each question) and are drawn as its cards are: the problem, if given, as a `text-muted` eyebrow, the question in the serif at 420, 48px, in `heading`, the change, if given, in `slide-body`. The questions (and the cases, 48px under them) are centred in the space between the title block and the contact row.
- Case cards: `surface`, square, framed by a 2px `border` hairline, padding 24px 32px; a 14px disc before the title is the card's one spot of colour, `blue` then `yellow` by default (`tint` picks `blue`, `coral` or `yellow`); the title in Nunito Sans 800 at 28px and one `slide-small` line.
- The contact row sits at the bottom margin; the email and the site carry `data-uncounted`, the attribute the word count leaves out: the email as "Email <address>", with no arrow, in Nunito Sans 800 at 28px in `blue`, the site in the same in `heading`, then the credit in `slide-small` `text-muted` beside the logos at 44px tall.
- Nothing is tinted or shadowed.

## What you provide

- `logos`: `assets/Logos/odissei.png` and `assets/Logos/eyra.png`, beside "A service provided by ODISSEI and supported by Eyra".

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
