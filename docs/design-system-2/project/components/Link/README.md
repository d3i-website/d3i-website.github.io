A link in running text. It keeps the text's colour and is bold, with a dotted `sky` underline that turns solid on hover and on keyboard focus.

The site styles every bare `<a>` this way (`_sass/_site.scss`), so Link wraps nothing: it is a plain `<a>` with no class of its own, and every prop you pass goes on it. Any `<a>` in your markup looks the same. Use it for links inside a sentence, such as "newsletter" and "team" in the front page's line below the cards. Links that have a look of their own (action links, navigation, cards, the note, "More") set their own colour, weight and decoration, and are not Links.

## What you provide

- `href`: where it goes.
- `children`: the link's words, plain words inside the sentence. No arrow.

There are no pictures to pass.

## The values it draws

- `link`: 700, in the surrounding text's colour.
- The underline is dotted `sky`, `line-underline` thick and `line-underline-offset` below the text. On hover and on keyboard focus it turns solid. The colour never changes.
