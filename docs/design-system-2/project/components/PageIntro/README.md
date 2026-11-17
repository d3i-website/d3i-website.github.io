The top of a content page: a big Nunito title, then the prose column with a small illustration panel floated to its right, and an optional row of action links.

Pass `title`, the opening paragraph(s) as children, an optional `image` (a hero illustration from `assets/Illustrations`), and optional `actions` (label, href, external). The intro sits in `.content-page__main`; when the page belongs to a section, pass its SidebarPanel as `sidebar` and the page takes the two-column grid.

- `.content-page__title` is `h1` (`h2` size below `bp-md`), no margin; `.content-page__excerpt`, when used, is `body` in `text-muted`.
- `.section-page__hero` is the floated illustration: `surface-tint` panel, `radius-lg`, padding `space-16`, `shadow-md`, 16rem wide centred below `bp-lg`, 14rem floated right from it with a `space-32` text gap.
- `.prose` caps the reading column at `content-width`; its first child loses its top margin.
- `.content-page__actions` is a wrapping row of `.cta-link`s, `space-16` apart.

## What you provide

- `image`: a hero illustration from `assets/Illustrations`.

Pictures are uploads in this system: find the id on `api/assets/<Group>.md`, fetch the file with the Artifact tool's `read` (the id as `path`) or copy it into your own artifact's asset store, and pass the URL your page serves. `/_blob/…` URLs resolve only inside this system's previews.
