# Sprites

The homepage hero composition: a sky layer behind the headline and a road strip below it with travellers. Fixed pixel sizes by design; they spread out on wider screens but never scale.

- `plane.png` — 95px wide, top-left of the hero, 2rem from the top.
- `clouds.png` — 123px wide, right of centre, 2.2rem from the top.
- `walker.png` — 41px, at 18% of the road, bottom 3px.
- `mountains.png` — 125px, at 22%, bottom 46px.
- `trees.png` — 88px, at 55%, bottom 55px.
- `car.png` — 107px, at 63%, bottom 46px.
- `cyclist.png` — 71px, at 72%, bottom 56px.

The road itself is CSS: a 24px `road` bar with `blue` dashes (30px on, 58px off) in a 120px strip. Under 900px the sky layer hides; under 600px the strip shrinks to 60px and the travellers hide. See the HomepageHero component.
