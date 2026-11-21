/*
 * datadonation.eu components (window.D3I) — the props each one takes.
 * Documentation, not type-checked. The site components render the site's own markup and
 * class names; load tokens.css and components/bundle.css before mounting. The Slide
 * components render self-contained 1920 × 1080 slides with inline styles. The site
 * components all take `className` (added to the root element) and pass other unknown props
 * (aria-*, data-*, on*) to that root; the Slide components take only the props listed.
 */
import type * as React from 'react';

/* Shared shapes ------------------------------------------------------------- */

/** A link: the visible label and where it goes. Action links add the arrow themselves; never put "→" in `label` (the Postit link is the one exception). */
export interface LinkTarget {
  /** Visible text, a verb phrase in sentence case: "Learn about data donation". */
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

/** An image: the URL your upload of the asset returned (on this system's page, /_blob/<id>) and its alt text. */
export interface Picture {
  src: string;
  /** Describe the picture; "" only when it is decorative. */
  alt: string;
}

/** One navigation entry. */
export interface NavItem {
  label: string;
  href: string;
  /** The current page or section. */
  active?: boolean;
}

/** One label and value row (EventDetails, ArchiveCard, ProjectCard). */
export interface DetailRow {
  label: string;
  /** Text, or an element when the value carries a link. */
  value: React.ReactNode;
}

/* Shell ----------------------------------------------------------------------- */

/** One of the header's main links. */
export interface HeaderLink {
  label: string;
  href: string;
  /** The current page or its section: takes is-active. From 1000px a faint tint behind the label; in the Menu panel the blue bar standing at the row's left end, and no tint. */
  current?: boolean;
}
export interface SiteHeaderProps {
  /** The site's name, set in type (there is no wordmark): "datadonation.eu". */
  brand: string;
  /** The line under the name: "Data donation for research". Left out when empty. */
  tagline?: string;
  /** Where the brand links. Default "/". */
  href?: string;
  /** The six main links, in order. */
  links: HeaderLink[];
  /**
   * The Menu drop-down below 1000px (assets/js/site-menu.js). 'closed' (default) and 'open' render the
   * Menu button with aria-expanded false or true; 'none' is the page without JavaScript: no button,
   * the links a wrapped list. From 1000px all three show the one row.
   */
  menu?: 'none' | 'closed' | 'open';
  className?: string;
}
/**
 * The sticky site header, as _includes/site-header.html: the name and tagline left, the six links right;
 * below 1000px the Menu button and its drop-down. Once per page, at the top.
 * @example
 * <SiteHeader brand="datadonation.eu" tagline="Data donation for research" links={[{ label: "Data donation", href: "#" }, { label: "Software", href: "#", current: true }]} menu="open" />
 */
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

export interface SectionSubnavProps {
  /** The section's name, used as the nav's accessible label. */
  label: string;
  /** The section's child pages; mark the current one active (it takes is-active and aria-current="page"). Five or six at most. */
  items: NavItem[];
  className?: string;
}
/**
 * The strip of a section's inner pages directly under the header, on hub pages without a sidebar: white over a hairline, the current page on the header's 4px blue bar.
 * @example
 * <SectionSubnav label="Software" items={[{ label: "Getting started", href: "#" }, { label: "Script selector", href: "#", active: true }]} />
 */
export declare function SectionSubnav(props: SectionSubnavProps): React.ReactElement;

/**
 * The logos the site's footer has measured: `$footer-logos` in _sass/_footer.scss, each the modifier of
 * its cell, site-footer__cell--<key>, which sizes it by its ink box. odissei and eyra are sized as
 * providers, the other six as partners. Any other logo is not supported: SiteFooter throws. Add it to
 * $footer-logos (and the site's footer) first.
 */
export type FooterLogoKey = 'odissei' | 'eyra' | 'uva' | 'ru' | 'uu' | 'vu' | 'tilburg' | 'eur';
/** A logo in the footer. */
export interface FooterLogo {
  /** The organisation's name, the image's alt text. */
  name: string;
  /** URL of your upload of its file: assets/Logos (odissei.png, eyra.png) or assets/Partners, the file as it is. */
  logo: string;
  /** Which measured logo it is; picks its size. */
  key: FooterLogoKey;
  /** Makes the logo a link. The site's footer logos are not links. */
  href?: string;
}
export interface FooterProvider extends FooterLogo {
  /** The small label above it. Default by position: "Provided by", then "Supported by". */
  label?: string;
}
export interface SiteFooterProps {
  /** The pair at the top: ODISSEI (provided by), then Eyra (supported by). */
  providers: FooterProvider[];
  /** The partner universities in the footer's order: uva, ru, uu, vu, tilburg, eur. None: no partner grid. */
  partners?: FooterLogo[];
  /** The whole last line. Default "© <this year> datadonation.eu". */
  copyright?: string;
  className?: string;
}
/**
 * The footer, as _includes/site-footer.html: the labelled provider pair, the "Project partners" grid
 * (two columns on a phone, three from 768px, one row from 66.32em) and the copyright line. Once per page.
 * @example
 * <SiteFooter providers={[{ name: "ODISSEI", key: "odissei", logo: odisseiUrl }, { name: "Eyra", key: "eyra", logo: eyraUrl }]} partners={partnerLogos} copyright="© 2026 datadonation.eu" />
 */
export declare function SiteFooter(props: SiteFooterProps): React.ReactElement;

/* Front page --------------------------------------------------------------------- */

export interface FrontPageProps {
  /** The front page's parts, in order: Band (with a Note inside), then what lies below it. */
  children: React.ReactNode;
  /** Added to the <div class="home">, which also takes the other unknown props. */
  className?: string;
}
/**
 * The front page's wrapper, <div class="home"> from _layouts/homepage.html. Every front-page style is scoped to .home, so Band, Note and ArrowDisc look right only inside it. Once per front page, around everything between the header and the footer.
 * @example
 * <FrontPage><Band titleLines={["Open Infrastructure for", "Data Donation Research"]} subtitle="Digital Trace Data, donated to science by citizens."><Note eyebrow="Position" title="GDPR Omnibus Proposal" link={{ label: "Read our letter", href: letterUrl }} /></Band></FrontPage>
 */
export declare function FrontPage(props: FrontPageProps): React.ReactElement;

export interface BandProps {
  /** The title's two lines, in title and on-sky. The title is always two lines; the site takes them from index.md's title_line_1 and title_line_2. */
  titleLines: [string, string];
  /** One sentence, in lead and blue; index.md's excerpt. */
  subtitle: string;
  /** The note that lies on the band (a D3I.Note), placed where the site places it: after the drawing, inside the section. Leave it out and the band is complete without it. */
  children?: React.ReactNode;
  /** Added to the <section class="hero">, which also takes the other unknown props. */
  className?: string;
}
/**
 * The sky-blue band at the top of the front page: the network drawing, the two-line title and the subtitle, as _includes/home/band.html writes them. Front page only, once, inside FrontPage (the front page's wrapper <div class="home">), which carries the band's styles. Renders the hidden clip-path <svg> and then <section class="hero">.
 * @example
 * <FrontPage><Band titleLines={["Open Infrastructure for", "Data Donation Research"]} subtitle="Digital Trace Data, donated to science by citizens." /></FrontPage>
 */
export declare function Band(props: BandProps): React.ReactElement;

export interface NoteProps {
  /** One to three words, in note-label and coral: "Position". Left out, there is no eyebrow. */
  eyebrow?: string;
  /** The message's name, in note-label and heading; one line, it does not wrap. */
  title: string;
  /** One sentence, in note-text; hidden below 1000px. Left out, there is no body paragraph. */
  body?: string;
  /** Where the note leads. With an href the whole note is one link (<a class="note">) and carries the arrow disc; `label` is the text on the tab from 1280px ("Read our letter"), and without it the tab is empty. Left out, the note is a plain <div class="note"> with no disc. */
  link?: { label?: string; href: string };
  /** Added to the note's root, which also takes the other unknown props. */
  className?: string;
}
/**
 * The front page's note: one timely message that lies on the band, as _includes/home/note.html writes it. From 1280px it hangs from the band's anchor on paper with a tab; below 1280px it is plain text in the niche under the band's shallow side. Pass it as Band's children, inside FrontPage.
 * @example
 * <Note eyebrow="Position" title="GDPR Omnibus Proposal" body="The European Omnibus Act poses a direct risk to fundamental human rights and to data donation as a research method." link={{ label: "Read our letter", href: letterUrl }} />
 */
export declare function Note(props: NoteProps): React.ReactElement;

export interface ArrowDiscProps {
  /** Text for screen readers only, in a <span class="visually-hidden"> before the disc: what the link it ends leads to (" news" after "More"). The disc itself is aria-hidden. */
  label?: string;
  /** Added to the <svg class="go">, which also takes the other unknown props. */
  className?: string;
}
/**
 * The arrow disc (disc-arrow-sm, 24px): a blue disc with a white arrow, the site's svg.go. It ends "More" on each list's heading line, which ListRow.List draws; nothing else carries it (the note draws its own 36px disc). Put it at the end of the link it marks, inside FrontPage, which styles it.
 * @example
 * <a className="more" href={newsUrl}>More<ArrowDisc label=" news" /></a>
 */
export declare function ArrowDisc(props: ArrowDiscProps): React.ReactElement;

export interface LinkProps {
  href: string;
  /** The link's words, inside the sentence. */
  children: React.ReactNode;
  /** Added to the <a>, which also takes the other unknown props (target, rel …). Leave it out for the running-text look. */
  className?: string;
}
/**
 * A link in running text: the text's own colour, at 700, with a dotted sky underline that turns solid on hover and on keyboard focus. The site styles every bare <a> this way, so Link is a plain <a> with no class; every other prop goes on it.
 * @example
 * <p>You can also subscribe to our <Link href={newsletterUrl}>newsletter</Link>.</p>
 */
export declare function Link(props: LinkProps): React.ReactElement;

export interface HomeCardProps {
  /** One to three words over the heading, in eyebrow type and text-muted: "Learn more". The site leaves it out when page.movements' eyebrow is empty. */
  eyebrow: string;
  /** The heading, in Libre Caslon Condensed and heading, with a dotted sky underline; one of page.movements' headings. */
  title: string;
  /** Where the card leads. The heading is the link and its ::after covers the card, so the whole card is the link. */
  href: string;
  /** The body: one sentence, in <p class="bo">. */
  children?: React.ReactNode;
  /** Added to the <article class="cd">, which also takes the other unknown props. */
  className?: string;
}
export interface HomeCardGridProps {
  /** The HomeCards, three on the site: three columns from 1000px, two below it (the last spanning both), one below 600px. */
  children: React.ReactNode;
  /** Added to the <div class="cards">, which also takes the other unknown props. */
  className?: string;
}
/**
 * One of the borderless, centred cards below the band, as _layouts/homepage.html writes each of page.movements: eyebrow, heading (the card's link) and body. Inside HomeCard.Grid, inside FrontPage.
 * @example
 * <HomeCard.Grid><HomeCard eyebrow="Learn more" title="What is data donation?" href={dataDonationUrl}>Data donation allows researchers to collect digital traces by asking participants to donate their own data.</HomeCard></HomeCard.Grid>
 */
export declare const HomeCard: ((props: HomeCardProps) => React.ReactElement) & {
  /** The row of cards, <div class="cards">. */
  Grid: (props: HomeCardGridProps) => React.ReactElement;
};

export interface ListRowProps {
  /** The item's date as ISO "2026-11-20"; shown as the month ("Nov") over the day ("20"), as lists.html formats it. */
  date: string;
  /** For an event over several days, its last day as ISO. The row then shows the range as lists.html does: "Dec" over "7–8", or "Oct–Nov" over "30–2" when the month names differ. On the start date itself, or left out, the row shows one day. */
  endDate?: string;
  /** The item's title. It is the row's link and its ::after covers the row, so the whole row is the link. */
  title: string;
  /** The item's page, or its external_url. */
  href: string;
  /** Set for an external_url: the link opens in a new tab (target="_blank" rel="noopener noreferrer"), as on the site. */
  external?: boolean;
  /** For an event: its location, with " · <year>" when the event is not in this year. Left out (news), there is no .where line. */
  place?: string;
  /** Added to the <article class="row">, which also takes the other unknown props. */
  className?: string;
}
export interface ListRowListProps {
  /** The list's heading: "Latest news" or "Upcoming events". */
  title: string;
  /** Where "More" leads: the news page or the events page. */
  moreHref: string;
  /** The second word of "More", visually hidden, for screen readers: "news" or "events". */
  moreLabel: string;
  /** Four ListRows. */
  children: React.ReactNode;
}
export interface ListRowListsProps {
  /** Two ListRow.Lists: news, then events. Side by side from 900px, stacked below. */
  children: React.ReactNode;
  /** Added to the <section class="lists">, which also takes the other unknown props. */
  className?: string;
}
/**
 * A row of the front page's lists, as _includes/home/lists.html writes it: the date, the title (the row's link) and, for an event, its place. In a ListRow.List, the two lists in ListRow.Lists, inside FrontPage.
 * @example
 * <ListRow.Lists><ListRow.List title="Latest news" moreHref={newsUrl} moreLabel="news"><ListRow date="2026-11-09" title="Ready to reproduce: export your data donation study" href={itemUrl} /></ListRow.List><ListRow.List title="Upcoming events" moreHref={eventsUrl} moreLabel="events"><ListRow date="2026-11-20" title="Unlocking Data" href={eventUrl} place="Webinar" /></ListRow.List></ListRow.Lists>
 */
export declare const ListRow: ((props: ListRowProps) => React.ReactElement) & {
  /** One list: its heading line (title and "More" with the arrow disc) and its rows. */
  List: (props: ListRowListProps) => React.ReactElement;
  /** The two lists side by side, <section class="lists">. */
  Lists: (props: ListRowListsProps) => React.ReactElement;
};

/* Actions ----------------------------------------------------------------------- */

export interface ActionLinkProps {
  href: string;
  /** The label: plain words, a verb phrase or "More", with no arrow (the disc is added). */
  children: React.ReactNode;
  /** Words for screen readers only, straight after the label, in a <span class="visually-hidden">: " news" after "More". */
  hiddenLabel?: string;
  /** section: in `link` (.section-cta); compact: in `label`, inside cards and headers (.cta-link). */
  variant?: 'section' | 'compact';
  external?: boolean;
  className?: string;
}
/**
 * The call to action, in the front page's "More" form: the label in text, a short dotted sky line and the small arrow disc. One per card or section; there are no buttons.
 * @example
 * <ActionLink href="#">Learn about data donation</ActionLink>
 */
export declare function ActionLink(props: ActionLinkProps): React.ReactElement;

export interface ContactBlockProps {
  /** The question, in the serif: "Have a question or want to discuss your study?" */
  lead: string;
  /** Shown in full: "Email DataDonation@uu.nl". */
  email: string;
  /** Subject line for the mailto link. */
  subject?: string;
  /** Overrides "Email <email>". */
  emailLabel?: string;
  /** Line above the topics: "We can answer your questions about:". */
  intro?: string;
  /** Two to four topics, as plain text (never links); with topics the block is two even columns, without them it is centred. */
  topics?: string[];
  /** @deprecated The block is always 42rem and centred; accepted and ignored. */
  constrained?: boolean;
  className?: string;
}
/**
 * The contact block that closes a hub or content page, 42rem and centred: the question in the serif and the team's email, optionally beside topics on coral bullets. No pictures.
 * @example
 * <ContactBlock lead="Have a question or want to discuss your study?" email="DataDonation@uu.nl" intro="We can answer your questions about:" topics={["Which hosting option fits your project", "Getting access for your university"]} />
 */
export declare function ContactBlock(props: ContactBlockProps): React.ReactElement;

/* Notes ----------------------------------------------------------------------- */

export interface PostitProps {
  /** One to three words, in note-label and coral: "Outage". Left out, there is no eyebrow. */
  eyebrow?: string;
  /** The message's name, in note-label and heading. */
  title: string;
  /** One or two sentences, in note-text. Left out, there is no body paragraph. */
  body?: string;
  /** Where the postit leads. With an href the whole postit is one link (<a class="postit">) and carries the arrow disc; `label` is the text on the tab ("Read our letter"), and without it the tab is empty. Left out (or without an href), the postit is an <aside class="postit">, a notice that leads nowhere, with no label and the coral exclamation disc in the arrow disc's place. */
  link?: { label?: string; href: string; external?: boolean };
  /** The content-page form: floats right of the text from 768px. */
  inline?: boolean;
  /** Added to the postit's root, which also takes the other unknown props. */
  className?: string;
}
/**
 * The front page's note on a content page or directory hub: a timely message (a position, an outage, a deadline) on paper with the tab, the dotted line from the coral corner node, and the arrow disc when it links, the coral exclamation disc when it does not. One per page, only while timely.
 * @example
 * <Postit eyebrow="Outage" title="Script selector is offline" body="SURF Research Cloud, which hosts the selector, is currently down." inline />
 */
export declare function Postit(props: PostitProps): React.ReactElement;

export interface CalloutProps {
  /** One short paragraph. */
  children: React.ReactNode;
  className?: string;
}
/**
 * A quiet notice inside the reading column, with no frame: it sits on a short blue line from a coral node to a ring node.
 * @example
 * <Callout>SURF Research Cloud, which hosts the script selector, is currently down.</Callout>
 */
export declare function Callout(props: CalloutProps): React.ReactElement;

/* Cards ------------------------------------------------------------------------- */

export interface NewsCardProps {
  title: string;
  /** The item's own page, or the external one (then set external). */
  href: string;
  external?: boolean;
  /** ISO, "2026-09-08"; drawn as the month (%b) over the day. The site's folded "September 8, 2026" also reads. */
  date?: string;
  summary?: string;
  /** @deprecated The row draws no picture: NewsCard.Index draws each item's image. Ignored. */
  image?: Picture;
  /** @deprecated The accent field is gone. Ignored. */
  accent?: 0 | 1 | 2;
  /** @deprecated "Read more" is gone: the title is the link. Ignored. */
  linkLabel?: string;
  className?: string;
}
export interface NewsCardListProps {
  /** NewsCards. */
  children: React.ReactNode;
  className?: string;
}
/** One item on the news page. */
export interface NewsIndexItem {
  title: string;
  /** ISO, "2026-11-09" (the site's folded "November 9, 2026" also reads). */
  date: string;
  /** The item's own page, or the external one (then set external). */
  href: string;
  /** The item's image front-matter field: its social-sharing card, 1200 × 628 (1.91:1). Shown at 1.91:1, cropped by object-fit: cover. Without one the date shows on a sky node. */
  image?: string;
  image_alt?: string;
  /** Opens in a new tab, and the item says where it leads: "On odissei-data.nl". */
  external?: boolean;
  /** Shown on the lead story only. */
  summary?: string;
}
export interface NewsCardIndexProps {
  /** Newest first: the first item is the lead story. */
  items: NewsIndexItem[];
  className?: string;
}
/**
 * A news item as the list row: the month over the day, the title, which is the row's link, and the summary, between hairlines.
 * NewsCard.Index is the news page: the newest item as the lead story, the rest a grid three across.
 * @example
 * <NewsCard.Index items={[{ title: "Ready to reproduce: export your data donation study", date: "2026-11-09", href: "#", image: cardUrl }]} />
 * <NewsCard title="Data Donation Symposium Program Available" href="#" date="2026-09-08" summary="The schedule for the 2026 symposium has been published." />
 */
export declare const NewsCard: ((props: NewsCardProps) => React.ReactElement) & {
  /** A stack of news rows. */
  List: (props: NewsCardListProps) => React.ReactElement;
  /** The news page: a lead story and a grid three across. */
  Index: (props: NewsCardIndexProps) => React.ReactElement;
};

export interface ArchiveCardProps {
  title: string;
  /** ISO, "2026-12-07"; drawn as the month over the day. The site's folded forms ("October 1-2, 2026", "September 30 - October 2, 2026") also read; anything else ("Spring 2027") stays in the meta line before the place. */
  date?: string;
  /** ISO; a later day makes a range ("7–8"). */
  endDate?: string;
  /** "Weizenbaum Institute, Berlin, Germany", under the title. */
  location?: string;
  summary?: string;
  /** Labelled rows under the summary. */
  details?: DetailRow[];
  /** The entry's page (or its external site): the title becomes the link. */
  href?: string;
  /** @deprecated "View details" is gone: the title is the link. Ignored. */
  hrefLabel?: string;
  external?: boolean;
  /** Further actions, in ActionLink's compact form. */
  actions?: LinkTarget[];
  /** Upcoming or highlighted: a coral node under the date. */
  featured?: boolean;
  className?: string;
}
export interface ArchiveCardListProps {
  /** Optional heading over the list ("Upcoming", "Past events"). */
  heading?: string;
  /** ArchiveCards, between hairlines. */
  children: React.ReactNode;
  className?: string;
}
/**
 * An event or archive entry as a list row: the date column, the title (the link), the place, summary, detail rows and further actions.
 * @example
 * <ArchiveCard featured title="Data Donation Symposium 2026" date="2026-10-01" endDate="2026-10-02" location="Weizenbaum Institute, Berlin, Germany" href="#" />
 */
export declare const ArchiveCard: ((props: ArchiveCardProps) => React.ReactElement) & {
  /** The archive list, optionally under a heading. */
  List: (props: ArchiveCardListProps) => React.ReactElement;
};

/** A person named on a card, linked to their profile when there is one. */
export interface Person {
  name: string;
  href?: string;
  external?: boolean;
}
export interface InstitutionCardProps {
  institution: string;
  /** The affiliated researcher. */
  affiliate?: Person;
  department?: string;
  /** Optional eyebrow label over the card; the live site does not use it. */
  label?: string;
  className?: string;
}
export interface InstitutionCardGridProps {
  /** InstitutionCards, auto-fit at 15rem. */
  children: React.ReactNode;
  className?: string;
}
/**
 * A member institution: its name, the affiliated researcher and the department, in a bordered card.
 * @example
 * <InstitutionCard institution="Utrecht University" affiliate={{ name: "Dr. Laura Boeschoten", href: "#" }} department="Department of Methodology and Statistics" />
 */
export declare const InstitutionCard: ((props: InstitutionCardProps) => React.ReactElement) & {
  /** The member grid. */
  Grid: (props: InstitutionCardGridProps) => React.ReactElement;
};

export interface ProjectCardProps {
  title: string;
  /** Joined as "A, B and C", then the institution. */
  investigators?: Person[];
  institution?: string;
  summary?: string;
  /** The study's picture (its image field), shown uncropped at its own shape at the head of the side column. An object { src, alt } is the old form: deprecated (use image and image_alt), and it still works. */
  image?: string | Picture;
  image_alt?: string;
  /** The first key fact, labelled "Year", its value in the serif. */
  year?: string | number;
  /** The key facts under the picture, label left and value right: Collected, Software. */
  facts?: DetailRow[];
  /** The other fields that apply, in this order, beside the side column: Data collection, Recruitment, Instructions, Ethics, Software, Processing, Data, Funded by (leave out what facts already shows). */
  details?: DetailRow[];
  /** Reference list, collapsed under a summary line. */
  references?: React.ReactNode[];
  /** Default "References". */
  referencesLabel?: string;
  className?: string;
}
export interface ProjectCardListProps {
  /** ProjectCards, divided by hairlines. */
  children: React.ReactNode;
  /** Closing line crediting the illustration sources. */
  attribution?: React.ReactNode;
  className?: string;
}
/**
 * A completed study as a dossier: a side column with the picture uncropped and the key facts (the year in the serif), and beside it the title, investigators, a paragraph, labelled details and a collapsible reference list.
 * @example
 * <ProjectCard title="Behind the screens: Exploring Netflix via Data Donations" image={bannerUrl} year={2024} facts={[{ label: "Collected", value: "January – February 2024" }, { label: "Software", value: "Port" }]} investigators={[{ name: "Dennis Nguyen" }, { name: "Karin van Es" }]} institution="Utrecht University" summary="This study used data donations to investigate Netflix viewing behaviours." />
 */
export declare const ProjectCard: ((props: ProjectCardProps) => React.ReactElement) & {
  /** The completed-projects list. */
  List: (props: ProjectCardListProps) => React.ReactElement;
};

/** A team member. */
export interface Member {
  name: string;
  /** Profile page. */
  href?: string;
  external?: boolean;
  /** URL of the photo, shown as a 56px circle; a member without one shows no image, as on the site. */
  photo?: string;
  photoAlt?: string;
  /** Optional line under the name. */
  role?: string;
  /** Tags from the controlled vocabulary (_data/team_tags.yml). */
  tags?: string[];
}
export interface PeopleGridProps {
  members: Member[];
  /** The vocabulary for the filter chips, in display order; default: every tag the members carry. */
  tags?: string[];
  /** A tag to filter by on first render. */
  initialTag?: string;
  /** Default true: the tabs and the tags filter the list. */
  filterable?: boolean;
  /** Default "All". */
  allLabel?: string;
  filterLabel?: string;
  className?: string;
}
/**
 * The team page: a two-column list between hairlines, each row a small round photo beside the name and the tags as muted text, with filter tabs on a hairline above; a tab or a tag filters the list.
 * @example
 * <PeopleGrid tags={["Lead researcher", "Research engineer"]} members={[{ name: "Dr. L. (Laura) Boeschoten", href: "#", tags: ["Lead researcher", "D3I"] }]} />
 */
export declare function PeopleGrid(props: PeopleGridProps): React.ReactElement;

/* Wayfinding ---------------------------------------------------------------------- */

export interface PageIntroProps {
  /** The page title, in h1. */
  title: string;
  /** Optional line under the title in text-muted. */
  excerpt?: string;
  /** Opening paragraphs, rendered in the prose column. */
  children?: React.ReactNode;
  /** A small illustration from assets/Illustrations, in a hairline frame floated right of the prose. */
  image?: Picture;
  /** A wrapping row of action links, drawn as ActionLinks in the compact form (label, dotted line, arrow disc). */
  actions?: LinkTarget[];
  /** A SidebarPanel: the page then takes the two-column grid with the sidebar left. */
  sidebar?: React.ReactNode;
  className?: string;
}
/**
 * The top of a content page: title, opening prose with a hairline-framed illustration floated right, and optional action links in the "More" form.
 * @example
 * <PageIntro title="Getting started" actions={[{ label: "Preview it on Next", href: "#" }]}>…</PageIntro>
 */
export declare function PageIntro(props: PageIntroProps): React.ReactElement;

/** A page in the section nav, with optional in-page anchors as a third level. */
export interface SidebarPage extends NavItem {
  sections?: { label: string; href: string }[];
}
export interface SidebarPanelProps {
  /** The section's name. */
  title: string;
  /** The section's landing page. */
  href: string;
  /** The section's pages; mark the current one active. One page is current (is-active, aria-current="page", the coral node): the first marked active. */
  items: SidebarPage[];
  /** Accessible label; default: title. */
  label?: string;
  className?: string;
}
/**
 * The left-hand section navigation on content pages: the section as title, its pages as nodes on a blue line between two ring nodes, the current page the coral node.
 * @example
 * <SidebarPanel title="Software" href="#" items={[{ label: "Getting started", href: "#", active: true }, { label: "Script selector", href: "#" }]} />
 */
export declare function SidebarPanel(props: SidebarPanelProps): React.ReactElement;

export interface TableOfContentsProps {
  /** The page's headings: text and anchor. */
  items: { label: string; href: string }[];
  /** Default "Contents". */
  title?: string;
  className?: string;
}
/**
 * An in-page contents list under the title of a long content page: a small "Contents" heading over one row of the headings as running-text links, a small grey dot between them (ul.toc__menu, as the site's generator writes it). No panel, no tint, no current mark; a wrapped row starts without a dot.
 * @example
 * <TableOfContents items={[{ label: "What the software does", href: "#" }, { label: "How to get access", href: "#" }]} />
 */
export declare function TableOfContents(props: TableOfContentsProps): React.ReactElement;

/** One step on a route: one line and one action. */
export interface RouteStep {
  text: string;
  /** Drawn as an ActionLink in its section form. */
  link?: LinkTarget;
}
/** One route: the reader's own question, the answer, and its steps. */
export interface Route {
  question: string;
  /** One or two sentences. */
  answer?: string;
  /** Two or three steps. */
  steps: RouteStep[];
  /** A glyph at the head of the route's line, inlined white on a blue disc. Without one the line starts at a ring node. */
  glyph?: 'netherlands' | 'globe';
}
export interface RoutesProps {
  /** Two routes, each on its own vertical blue line. */
  routes: Route[];
  /** Line under the routes; defaults to the EuroGeographics attribution when a route shows the netherlands glyph. */
  attribution?: React.ReactNode;
  className?: string;
}
/**
 * A fork the reader resolves by picking the question that fits them: each route a blue line from a glyph disc to a ring node, a node per step, one action per step.
 * @example
 * <Routes routes={[{ glyph: "netherlands", question: "Are you a researcher in the Netherlands?", steps: [{ text: "Contact us for access.", link: { label: "Email datadonation@uu.nl", href: "mailto:datadonation@uu.nl" } }] }]} />
 */
export declare function Routes(props: RoutesProps): React.ReactElement;

export interface JourneyNextProps {
  /** The next step's two-digit number, as on the hub: "02". */
  number?: string;
  /** The next step's title, in card-heading; with href it is the block's link. */
  title: string;
  body?: string;
  /** The next step's page. The title links to it and the step ends in the arrow disc; without it, neither. */
  href?: string;
  external?: boolean;
  /** @deprecated Use `href` and `external`. When `href` is not given, `link.href` and `link.external` are used in its place; `link.label` is not shown. */
  link?: LinkTarget;
  /** The step after that, as a quieter line. */
  after?: { number?: string; title: string; href?: string };
  /** Default "Next step". */
  label?: string;
  className?: string;
}
/**
 * The "Next step" block at the foot of a journey page: the number in the serif beside the next step's title, which is the link, ending in the arrow disc. Not on the last step.
 * @example
 * <JourneyNext number="02" title="Pick a platform" href="#" after={{ number: "03", title: "Go further (optional)", href: "#" }} />
 */
export declare function JourneyNext(props: JourneyNextProps): React.ReactElement;

export interface HubStepProps {
  title: string;
  /** One or two sentences. */
  body?: string;
  /** An illustration, letterboxed in a 5:4 box. */
  image?: Picture;
  /** The step's page. The title links to it; without it the title is plain text. */
  href?: string;
  external?: boolean;
  /** @deprecated Use `href` and `external`. When `href` is not given, `link.href` and `link.external` are used in its place; `link.label` is not shown. */
  link?: LinkTarget;
  /** Two digits, in the step's disc on the line; inside HubStep.List it defaults to the step's position: "01", "02". */
  number?: string;
  /** Image side above 900px; inside HubStep.List steps alternate left, right. */
  side?: 'left' | 'right';
  className?: string;
}
export interface HubStepListProps {
  /** The HubSteps, in order. */
  children: React.ReactNode;
  /** The hub's title, in hub-title; adds the hub hero above the steps. */
  title?: string;
  /** The hero's line in lead-large. */
  subtitle?: string;
  /** The hero image. */
  image?: Picture;
  className?: string;
}
/**
 * One numbered step of a journey hub, on the hub's one vertical blue line with its number in a blue disc: an illustration on one side, the title (the step's link) and a sentence on the other. Always inside HubStep.List.
 * @example
 * <HubStep title="Get access" body="Pick the option that fits your project." href="#" />
 */
export declare const HubStep: ((props: HubStepProps) => React.ReactElement) & {
  /** The journey hub that puts its steps on one line, numbering and alternating them. */
  List: (props: HubStepListProps) => React.ReactElement;
};

/* Content ----------------------------------------------------------------------- */

export interface ProseProps {
  /** Rendered Markdown as an HTML string. */
  html?: string;
  /** Or the elements themselves; no classes needed inside. */
  children?: React.ReactNode;
  className?: string;
}
/**
 * Markdown content as the site renders it: serif second headings (provisional) and sans third headings with their spacing given back, running-text links, ruled blockquote, sky-framed code blocks, plain tables, definitions with a faint coral rule.
 * @example
 * <Prose html={renderedMarkdown} />
 */
export declare function Prose(props: ProseProps): React.ReactElement;

export interface FigureProps {
  src: string;
  alt: string;
  /** content (default): the captioned figure in the reading column; panel: the small floated figure beside a section. */
  variant?: 'content' | 'panel';
  /** For variant content. */
  caption?: React.ReactNode;
  /** For variant panel: floats it above 900px. */
  float?: 'right' | 'left';
  className?: string;
}
/**
 * A picture in the reading column: square, framed by a border hairline, its caption closed by another. No tinted panel, radius or shadow, in either form.
 * @example
 * <Figure src={cloudFilesUrl} alt="Files moving to and from a cloud" caption="Participants request their data from the platform, then process it locally." />
 */
export declare function Figure(props: FigureProps): React.ReactElement;

export interface ScriptSelectorProps {
  /** The app's URL, framed and linked from the caption: site.data.script_selector.url. */
  src: string;
  /** The frame's title, the still's alt text and the notice's heading ("<title> unavailable"), each used as given, never re-cased. Default "Script selector". */
  title?: string;
  /** The caption's sentence before the link. Default "Runs on SURF Research Cloud." */
  caption?: React.ReactNode;
  /** The app does not answer: its notice takes the app's place inside the frame (role="status"). heading defaults to "<title> unavailable". */
  down?: { message: React.ReactNode; heading?: React.ReactNode };
  /** The caption link's words, used verbatim. Default "Open the script selector in a new tab". */
  linkText?: string;
  /** A picture of the app shown in the frame in place of the live app, so a preview or a slide calls nothing. */
  still?: string;
  className?: string;
}
/**
 * The Software section's script selector, as _includes/script-selector-embed.html: the app in one square border hairline, like a Figure,
 * and a caption under it ("Runs on SURF Research Cloud." and the open-in-a-new-tab link), closed by another. When the app is down, the
 * outage notice shows inside the same frame and the caption stays.
 * @example
 * <ScriptSelector src="https://sramtest.d3idatadonation.src.surf-hosted.nl/select?embed=1" title="Script selector" />
 */
export declare function ScriptSelector(props: ScriptSelectorProps): React.ReactElement;

/** One row of the "Latest news" rail. */
export interface NewsRailItem {
  title: string;
  /** ISO date, YYYY-MM-DD: shown as the month (%b) over the day (%-d). */
  date: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer" (a news item with an external_url). */
  external?: boolean;
}
export interface NewsArticleProps {
  title: string;
  /** ISO date, YYYY-MM-DD: shown over the title as "9 November 2026". */
  date: string;
  /** The body, inside .prose: elements, Figures among them. */
  children?: React.ReactNode;
  /** Or the body as rendered Markdown, as Prose takes it. */
  html?: string;
  /** Up to five other news items, newest first; none leaves the rail out. */
  rail?: NewsRailItem[];
  /** Where "All" goes: the news page. */
  allHref: string;
  className?: string;
}
/**
 * A news post: a 40rem column with the date over the title and the body, and the "Latest news" rail beside it from 64rem (under it below).
 * @example
 * <NewsArticle title="Ready to reproduce: export your data donation study" date="2026-11-09" allHref={newsUrl} rail={[{ title: "Data Donation Early Career Network", date: "2026-10-12", href: itemUrl }]}><p>…</p></NewsArticle>
 */
export declare function NewsArticle(props: NewsArticleProps): React.ReactElement;

export interface EventDetailsProps {
  /** Date, location and the like; a value may carry a link. */
  rows: DetailRow[];
  className?: string;
}
/**
 * The metadata near the top of an event page: label and value rows between hairlines, with no panel.
 * @example
 * <EventDetails rows={[{ label: "Date", value: "October 1-2, 2026" }, { label: "Location", value: "Weizenbaum Institute, Berlin, Germany" }]} />
 */
export declare function EventDetails(props: EventDetailsProps): React.ReactElement;

/** One big number with its label. */
export interface Stat {
  value: string;
  label: string;
  /** The node's colour, chart-1 to chart-5 (the numeral is in ink); default: position in the row. */
  series?: 1 | 2 | 3 | 4 | 5;
}
/** A platform chip. */
export interface Platform {
  name: string;
  /** URL of your upload of its file in assets/Platforms. */
  logo?: string;
}
export interface PlatformGroup {
  /** The category: "Social & video". */
  title: string;
  platforms: Platform[];
}
export interface UsageFiguresProps {
  /** UsageFigures.Figure blocks. */
  children: React.ReactNode;
  className?: string;
}
export interface UsageFigureProps {
  title: string;
  caption?: string;
  /** Stats, a Globe, Platforms, or a chart of your own. */
  children?: React.ReactNode;
  className?: string;
}
export interface UsageStatsProps {
  stats: Stat[];
  className?: string;
}
export interface UsageGlobeProps {
  /** The globe drawing (the site draws it with JavaScript from _data/usage.yml). */
  children?: React.ReactNode;
  onBack?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  /** Default true; hide when not drilled into a country. */
  showBack?: boolean;
  /** Default "← Back to world". */
  backLabel?: string;
  /** Default "Drag to spin · scroll or +/− to zoom · click a country to drill in"; null hides it. */
  hint?: string | null;
  className?: string;
}
export interface UsagePlatformsProps {
  groups: PlatformGroup[];
}
/**
 * The impact page's figures, each framed by one hairline: numerals in ink on nodes in the series colours, the globe's controls and square platform chips.
 * @example
 * <UsageFigures>…</UsageFigures>
 */
export declare const UsageFigures: ((props: UsageFiguresProps) => React.ReactElement) & {
  /** One figure in a hairline frame, with a title and caption. */
  Figure: (props: UsageFigureProps) => React.ReactElement;
  /** A row of numbers in ink, each label on a node in its series' colour. */
  Stats: (props: UsageStatsProps) => React.ReactElement;
  /** The globe frame with its back and zoom controls and hint. */
  Globe: (props: UsageGlobeProps) => React.ReactElement;
  /** Square platform chips grouped by category. */
  Platforms: (props: UsagePlatformsProps) => React.ReactElement;
};

/* Slides -------------------------------------------------------------------- */
/* Each renders one 1920 × 1080 <section> with inline styles in the system's light-theme hex values.
   Mount it in a design canvas, or get its markup for a Slides deck with D3I.slideMarkup(D3I.SlideFrame, props).
   Eyebrows and titles carry data-fit="none" so the Slides canvas never shrinks them.
   Slides are not read: a slide carries about 20 words (only the parts marked data-uncounted, the site name, the slide
   number and a closing slide's email, are left out of the count), enough to cue the presenter,
   and its drawing carries the point. Props marked "adds words" are off in the previews; the 20 words still apply. */

/** The footer row every slide but the cover carries; SlideQuestions' contact row is its footer row. The site name and the slide number are data-uncounted; a source counts as words. */
export interface SlideFooterProps {
  /** The slide number, right of the footer. Builds repeat one number on every step. */
  number?: number | string;
  /** A citation; replaces "datadonation.eu" in the footer's left slot, set in slide-small. */
  source?: string;
}

export interface SlideCoverLogo {
  /** One of SiteFooter's measured logos: "odissei" | "eyra" | "uva" | "ru" | "uu" | "vu" | "tilburg" | "eur". It sets the logo's equal-ink-area size; any other key throws. */
  key: string;
  /** The logo's upload from the Logos or Partners group, as /_blob/<id>. */
  src: string;
  alt?: string;
}
export interface SlideCoverProps {
  /** Default 'network'. 'network': the network band (cover B9) with no words, the title block under it on white. 'band-title': the website band with the title in it, the speakers centred under it, then the logo row. */
  layout?: 'network' | 'band-title';
  /** Default "D3I · datadonation.eu"; blue caps. */
  eyebrow?: string;
  /** "\n" breaks the line. 'network': at most two lines of serif at 96px, 1500px wide. 'band-title': two short lines of serif at 66.67px in the band, white, centred. */
  title: string;
  /** 'network': one line of slide-lead under the title. 'band-title': under the title in the band, Nunito Sans 900 in blue. */
  subtitle?: string;
  /** "Name · Name" or "Name · Affiliation". 'network': the speaker line at the bottom margin, followed by the venue. 'band-title': large, centred under the band. */
  speakers?: string;
  /** "Venue, Month D, YYYY". 'network': after the speakers on their line. 'band-title': slide-lead, centred under the speakers. */
  venue?: string;
  /** 'network' only: the D3I mark (Logos/d3i-mark.svg) as /_blob/<id>, drawn in the white disc on the band's upper line. Without it the disc is empty. */
  markSrc?: string;
  /** 'band-title' only: the partner and provider logos in a row under a hairline, in the order given. Without any, no hairline and no row. */
  logos?: SlideCoverLogo[];
  /** The band's accessible description; without it the band is aria-hidden decoration. */
  bandLabel?: string;
  /** Replaces the title block ('network') or the centred eyebrow, speakers and venue ('band-title'), for a closing slide that keeps the band. */
  children?: React.ReactNode;
}
/** The cover and closing slide, in two layouts: the network band over the title, or the website band with the title in it over the speakers and logos. */
export declare function SlideCover(props: SlideCoverProps): React.ReactElement;

export interface SlideFrameCard {
  /** Text-muted caps over the title; names the platform when the picture is a platform mark, which never stands alone. */
  eyebrow?: string;
  /** A word or three, in the serif at 48px. */
  title: string;
  /** Adds words: one line of slide-body under the title. Off by default; say it aloud instead. */
  body?: string;
  /** 64px above the title, under the card's node: a mark from assets/Platforms, or a concept glyph from assets/Glyphs in the card's accent. */
  iconSrc?: string;
  iconAlt?: string;
  /** Ignored: cards are no longer framed or tinted; every card hangs from the line. */
  plain?: boolean;
}
export interface SlideFrameProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** Up to three cards in a row, hanging from one blue line with a node over each. */
  cards?: SlideFrameCard[];
  /** Adds words: columns of the statement panel, white, framed and divided by 2px border hairlines. A slide with only a panel is text-only: at most 50 words. */
  panel?: Array<{ eyebrow?: string; text: string }>;
  /** The section's gap; default 48px. */
  gap?: string;
  /** Any further body, between the cards and the panel. The body is centred in the space under the title block. */
  children?: React.ReactNode;
}
/** The frame every content slide shares, with three cards on a line and a statement panel as its commonest body. */
export declare function SlideFrame(props: SlideFrameProps): React.ReactElement;

export interface SlidePlanProps extends SlideFooterProps {
  /** No default: the line says it is an overview. */
  eyebrow?: string;
  heading: string;
  /** Three to six part headers of one to three words, numbered under one node each. */
  stops: string[];
}
/** The overview: a line with one numbered node per part, in place of an agenda. */
export declare function SlidePlan(props: SlidePlanProps): React.ReactElement;

export interface SlideSectionStopProps extends SlideFooterProps {
  /** The eyebrow: "Part II". Adds words the numeral already says; off in the preview. */
  part?: string;
  /** The part's name: "The method". */
  heading: string;
  /** Two digits: "02". */
  stepNumber: string;
  /** The part's claim in a few words (about seven), beside the numeral. Without it the numeral stands alone. */
  sentence?: string;
  /** Every part's name, for the labels under the line's nodes. */
  stops: string[];
  /** Index of this part in `stops`. */
  current: number;
}
/** The opener of a part: its number, its claim and the line, stepping down at the current part's coral node. */
export declare function SlideSectionStop(props: SlideSectionStopProps): React.ReactElement;

export interface SlideBuildRow {
  label: string;
  /** title: a word or two, in the serif at 48px. text adds words: a slide-small line under it, off by default. */
  left: { title: string; text?: string };
  right: { title: string; text?: string };
  /** coral: a row that makes a different kind of point, marked by a small coral disc before its label. */
  tone?: 'default' | 'coral';
}
export interface SlideBuildProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** Adds words: the step names, one numbered node each on the line across the top. The row labels already name the steps; off in the preview. */
  steps?: string[];
  /** Index of the current step, its node coral; default the last row shown. */
  current?: number;
  /** Header of the plain column and of the argued-for column. */
  columns?: { left?: string; right?: string };
  rows: SlideBuildRow[];
  /** How many rows this step shows; the earlier ones dim. */
  shown?: number;
  children?: React.ReactNode;
}
/** One step of a build: the same frame on every step, one more row each time. */
export declare function SlideBuild(props: SlideBuildProps): React.ReactElement;

export interface SlideStatsTile {
  value?: string | number;
  label?: string;
  /** A bar chart inside the tile, the tallest bar 160px: years and counts, each bar with its value. */
  series?: Array<{ label: string; value: number }>;
  /** Marks from assets/Platforms, 48px, six to a row. */
  marks?: Picture[];
}
export interface SlideStatsProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** Up to four tiles, in columns divided by 2px hairlines; every numeral is the serif in blue. */
  tiles: SlideStatsTile[];
  /** Adds words: up to three columns of the list the numbers summarise, under a 2px hairline. Off in the preview; the list belongs in the speaker notes. */
  panel?: Array<{ title: string; items: string[] }>;
  children?: React.ReactNode;
}
/** Stat tiles with serif numerals in blue, over the list they summarise. */
export declare function SlideStats(props: SlideStatsProps): React.ReactElement;

export interface SlideFunnelProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** Shrinking shares against one base, in a card framed by a 2px hairline; blue bars scale to the first stage (400px
      beside a meter; alone, 1100px and 64px tall with the labels in a column on their left). The last bar is coral,
      marking the point, unless markLast is false. eyebrow and note add words and are off in the preview; base is a few words. */
  funnel?: { eyebrow?: string; base?: string; stages: Array<{ label: string; pct: number }>; note?: string; markLast?: boolean; /** @deprecated Ignored: every funnel is blue. */ color?: 'coral' | 'blue' };
  /** Options that differ in how much arrives: all (a blue fill), promise (a dashed blue outline, arrives then deleted), strip (a blue strip, the selected part only). The recommended option's frame is 2px blue. Alone, the meter boxes fill the slide's height. text adds words and is off in the preview. */
  meter?: { options: Array<{ eyebrow: string; fill: 'all' | 'promise' | 'strip'; fillLabel: string; text?: string; recommended?: boolean }> };
  children?: React.ReactNode;
}
/** Layout that carries the argument: a funnel and a meter, side by side or (the default in the preview) each on its own slide. */
export declare function SlideFunnel(props: SlideFunnelProps): React.ReactElement;

export interface SlideWindowProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** The steps left of the window, hanging on a vertical blue line with a node each, title in the serif at 36px. text adds words: a slide-small line, off by default. */
  steps: Array<{ title: string; text?: string }>;
  /** Adds words: a link line under the list; the arrow is added. */
  link?: string;
  window: {
    url: string;
    title?: string;
    /** tabs, stat and chartLabel add words and are off in the preview. */
    tabs?: Array<{ label: string; active?: boolean }>;
    stat?: string;
    chartLabel?: string;
    /** The bars fill the window's body. A label adds a word under its bar; with no labels there is no label row. */
    bars?: Array<{ label?: string; value: number }>;
    /** A real screenshot replaces the drawn body. */
    imageSrc?: string;
    imageAlt?: string;
  };
  /** Adds words: a line under the window, to say when the body is drawn, not a screenshot (or say it aloud). */
  caption?: string;
}
/** A drawn browser window for software, square and framed by 2px hairlines, beside steps on a line with a node each. */
export declare function SlideWindow(props: SlideWindowProps): React.ReactElement;

export interface SlideQuestionsProps {
  eyebrow?: string;
  heading: string;
  /** @deprecated Ignored: the slide shows the questions, not a table. */
  headers?: [string, string, string];
  /** Up to three questions hanging from one blue line, a node over each, in the serif at 48px. problem (an eyebrow over the question) and change (a line under it) add words and are off in the preview. */
  rows: Array<{ problem?: string; change?: string; question: string }>;
  casesLabel?: string;
  /** Adds words: up to two case cards, framed by 2px hairlines; tint is the colour of the small disc before the title, blue then yellow by default. */
  cases?: Array<{ title: string; text?: string; tint?: 'blue' | 'coral' | 'yellow' }>;
  email?: string;
  /** Default "datadonation.eu". */
  site?: string;
  /** "A service provided by ODISSEI and supported by Eyra". In the footer row; the logos say it too. */
  credit?: string;
  /** assets/Logos, 44px tall; width defaults to 120. */
  logos?: Array<Picture & { width?: number }>;
}
/** The closing or discussion slide for a research audience: its questions on a line, contact and logos in the footer row. */
export declare function SlideQuestions(props: SlideQuestionsProps): React.ReactElement;

/** One slide as markup for a Slides deck: one <section>, inline styles with hex colours, data-fit kept. Needs ReactDOM 18 on window. */
export declare function slideMarkup<P>(component: (props: P) => React.ReactElement, props: P): string;

declare global {
  interface Window {
    D3I: {
      SiteHeader: typeof SiteHeader;
      SectionSubnav: typeof SectionSubnav;
      SiteFooter: typeof SiteFooter;
      FrontPage: typeof FrontPage;
      Band: typeof Band;
      Note: typeof Note;
      ArrowDisc: typeof ArrowDisc;
      Link: typeof Link;
      HomeCard: typeof HomeCard;
      ListRow: typeof ListRow;
      ActionLink: typeof ActionLink;
      ContactBlock: typeof ContactBlock;
      Postit: typeof Postit;
      Callout: typeof Callout;
      NewsCard: typeof NewsCard;
      ArchiveCard: typeof ArchiveCard;
      InstitutionCard: typeof InstitutionCard;
      ProjectCard: typeof ProjectCard;
      PeopleGrid: typeof PeopleGrid;
      PageIntro: typeof PageIntro;
      SidebarPanel: typeof SidebarPanel;
      TableOfContents: typeof TableOfContents;
      Routes: typeof Routes;
      JourneyNext: typeof JourneyNext;
      HubStep: typeof HubStep;
      Prose: typeof Prose;
      Figure: typeof Figure;
      ScriptSelector: typeof ScriptSelector;
      NewsArticle: typeof NewsArticle;
      EventDetails: typeof EventDetails;
      UsageFigures: typeof UsageFigures;
      SlideCover: typeof SlideCover;
      SlideFrame: typeof SlideFrame;
      SlidePlan: typeof SlidePlan;
      SlideSectionStop: typeof SlideSectionStop;
      SlideBuild: typeof SlideBuild;
      SlideStats: typeof SlideStats;
      SlideFunnel: typeof SlideFunnel;
      SlideWindow: typeof SlideWindow;
      SlideQuestions: typeof SlideQuestions;
      slideMarkup: typeof slideMarkup;
    };
  }
}
