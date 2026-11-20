# Slides

Drawings made for the slide components.

- `cover-network.svg` is the network cover's band (SlideCover's `network` layout, cover B9 of the slides checkpoint), 1920 × 343 in slide pixels.
  - It is the front page band's drawing at its 1680px layout, enlarged 8/7, with the story stretched, one downturn joining the two sides, and the D3I mark in a white ringed disc on the upper line.
  - The mark is linked as `../Logos/d3i-mark.svg`, so the file shows on its own; the component draws its `markSrc` upload there instead.
  - Every colour is a token's light value.
  - `tools/build_slide_cover.py` copies it into `components/bundle.js`. After changing it, run the script and update its size in `design-system.json`.
