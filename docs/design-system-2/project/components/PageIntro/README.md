The top of a content page: the title in the serif, then the prose column, with a small illustration in a hairline frame floated to its right, and an optional row of action links.

The intro sits in `.content-page__main`. When the page belongs to a section, pass the section's SidebarPanel as `sidebar`, and the page takes the two-column grid.

## What you provide

- `title`: the page title, in `h1`.
- The opening paragraph or paragraphs, as children.
- `excerpt` (optional): a line under the title.
- `image` (optional): a hero illustration from `assets/Illustrations`.
- `actions` (optional): `label`, `href` and `external` for each. They are drawn as ActionLinks in the compact form. Plain words only: the dots and the disc are added.
- `sidebar` (optional): the section's SidebarPanel.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.

## The values it draws

- `.content-page__title` is the serif (provisional) at weight 420: 2rem, 2.4rem from 768px, with no margin. `.content-page__excerpt`, when used, is `body` in `text-muted`.
- `.section-page__hero` is the illustration, as the small Figure frames one. It is square and framed by a 1px `border` hairline, with no tint, padding or shadow. It is 16rem wide and centred below 900px; from 900px it is 14rem wide and floated right, `space-32` from the text.
- `.prose` caps the reading column at `content-width`; its first child loses its top margin.
- `.content-page__actions` is a wrapping row of `.cta-link`s (ActionLink, compact): the label in `label`, the dotted `sky` line and the small arrow disc. The links are `space-32` apart, with rows `space-12` apart.
