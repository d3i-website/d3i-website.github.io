# Network

The pieces that sit on the lines and nodes of the front page band. Each is a standalone SVG with its own `viewBox`, in the brand blue `#4272ef` with white fills; use them on the sky band (`#87c5eb`) or on white, at about 0.6 of their file size (the reference shows the designer's pieces at 40px, the drawn ones at 28 to 52px). Every piece sits on a line, and a large disc is a meaningful node.

Left of the title is the participant's story:

- `switch.svg` — the switch: what is donated is the participant's to control. The designer's.
- `lock.svg` — the lock: safety. White lock on a blue disc; drawn later, 36×36.
- `phone.svg` — the phone: where the data come from, and the start of the main line. Bare, blue outline; drawn later, 36×36.
- `chart.svg` — the chart: seeing the data. A pale disc with blue bars. The designer's. On the research side it is also the piece on the note's anchor.
- `funnel.svg` — the funnel: the data being narrowed down to what is donated. Blue disc. The designer's.
- `tick.svg` — the tick: saying yes. White disc, sitting on the dotted circle round the funnel. The designer's.
- `portrait-man.svg` — the participant. The designer's, with its `clipPath`; the white ring can be filled sky blue where it sits on the page.
- `map-pin.svg` — the map pin, with the person at the foot of the story. The designer's.

Right of the title is the research side:

- `globe.svg` — the globe where the research side ends, on the band's edge at the narrow widths. White disc. The designer's.
- `consent-badge.svg` — the consent badge, a shield with a tick, where a second line climbs to the woman. White fill, blue outline; drawn later, 36×36.
- `music-note.svg` — the music note: a kind of trace, the start of the dotted line to the woman. Blue disc. The designer's.
- `portrait-woman.svg` — the woman, the researcher, where her line leaves the page. The designer's, with its `clipPath`.

Not on the front page band, worked out during the design and left out:

- `video.svg` — a video: a rounded screen with a play triangle. Drawn in the design conversation, 36×36.
- `health.svg` — health data: a heartbeat line. Drawn in the design conversation, 36×36.
- `messages.svg` — messages: a coral speech bubble, fill only. Drawn in the design conversation, 36×36.
- `consent-shield.svg` — consent: an outline shield with a tick and no fill. Drawn in the design conversation, 36×36; not the same as `consent-badge.svg`, which is white-filled and thinner.
- `burst-yellow.svg` and `burst-coral.svg` — scalloped seals, small spots of yellow `#ffcf60` and coral `#ff5e5e`. The designer's.
- `bag-a.svg` and `bag-b.svg` — a shopping bag on a pale disc, two placements of the same piece (the data a shop holds). The designer's.
- `x-disc.svg` — a coral cross on a white disc, like a close button. The designer's.

Fourteen are cut from the designer's hero artwork (`docs/front-page-reference/source/designer-hero.svg`, never edited) with the same element selections and view boxes as the reference build; seven (`phone`, `lock`, `consent-badge`, `video`, `health`, `messages`, `consent-shield`) were drawn later in a `-18 -18 36 36` view box. All twenty-one are generated, so do not edit them by hand: run

    python3 -I docs/design-system-2/tools/extract_network_pieces.py

to write them again.
