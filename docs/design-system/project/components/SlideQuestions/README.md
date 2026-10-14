The closing or discussion slide for a research audience: a three-column grid of the audience's problem, what the method changes, and the open question, with concrete cases beneath and the contact line and funder logos in the last row. It ends a talk on questions, not on an offer; access routes and pricing go in the speaker notes.

Mount `D3I.SlideQuestions` in a design canvas; for a Slides deck, `D3I.slideMarkup(D3I.SlideQuestions, props)` returns the slide as one `<section>` with inline hex styles to paste. Its props are in `components/index.d.ts` and on its card; the values below are what it draws, for anyone writing a slide by hand.

Pass three `rows` (a `problem` of a few words, a `change` and a `question` of at most two lines each), up to two `cases`, the `email`, the `credit` line and the `logos`. Wording follows "Voice for talks and decks": full sentences for problems, numbers with their base, questions the audience can actually answer.

- Column headers: `slide-eyebrow`: the problem in `text-muted`, the change in `blue`, the question in `coral`. A 1px `border` under the header row and between rows; rows have 16px vertical padding.
- Cells: the problem in `slide-item`; the other two in `slide-small`. Two lines per cell at most, or the rows collide: the column is 824px tall on this slide, which has no footer.
- Case cards: `blue-tint` then `yellow-tint`, `radius-lg`, padding 24px 32px, a `slide-item` title and one `slide-small` line.
- A spacer pushes the contact row to the bottom margin: the email in `slide-item` `coral`, the site in `slide-item` `blue`, then the credit in `slide-small` `text-muted` beside the logos at 44px tall.

## What you provide

- `logos`: `assets/Logos/odissei.png` and `assets/Logos/eyra.png`, beside "A service provided by ODISSEI and supported by Eyra".

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
