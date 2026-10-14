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
export interface Link {
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

export interface SiteHeaderProps {
  /** Primary navigation, in order; mark the current section active. */
  items: NavItem[];
  /** Brand name, set in type (there is no wordmark). */
  name?: string;
  subtitle?: string;
  /** Where the brand links. */
  href?: string;
  className?: string;
}
/**
 * The sticky site header: brand name and subtitle left, the primary navigation right. Once per page, at the top.
 * @example
 * <SiteHeader items={[{ label: "Data donation", href: "#" }, { label: "Software", href: "#", active: true }]} />
 */
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

export interface SectionSubnavProps {
  /** The section's name, used as the nav's accessible label. */
  label: string;
  /** The section's child pages; mark the current one active. Five or six at most. */
  items: NavItem[];
  className?: string;
}
/**
 * The strip of a section's inner pages directly under the header, on hub pages without a sidebar.
 * @example
 * <SectionSubnav label="Software" items={[{ label: "Getting started", href: "#" }, { label: "Script selector", href: "#", active: true }]} />
 */
export declare function SectionSubnav(props: SectionSubnavProps): React.ReactElement;

/** A logo in the footer. `mark` picks the per-logo size cap in bundle.css. */
export interface FooterLogo {
  /** The organisation's name, used as alt text. */
  name: string;
  /** URL of your upload of its file in assets/Logos (odissei.png, eyra.png) or assets/Partners. */
  src: string;
  /** odissei, eyra (Logos); uva, ru, uu, vu, tilburg, eur (Partners, in the footer's order). */
  mark: 'odissei' | 'eyra' | 'uva' | 'ru' | 'uu' | 'vu' | 'tilburg' | 'eur';
}
export interface SiteFooterProps {
  /** ODISSEI, inline in "A service provided by … and supported by …". */
  providedBy: FooterLogo;
  /** Eyra, inline in the same sentence. */
  supportedBy: FooterLogo;
  /** The six partner universities in order: uva, ru, uu, vu, tilburg, eur. */
  partners: FooterLogo[];
  /** Copyright year; defaults to the current year. */
  year?: number;
  partnersLabel?: string;
  /** Name in the copyright line. */
  owner?: string;
  className?: string;
}
/**
 * The footer: the provider sentence with inline logos, the partner logo strip, the copyright line. Once per page.
 * @example
 * <SiteFooter year={2026} providedBy={{ name: "ODISSEI", mark: "odissei", src: odisseiUrl }} supportedBy={{ name: "Eyra", mark: "eyra", src: eyraUrl }} partners={partnerLogos} />
 */
export declare function SiteFooter(props: SiteFooterProps): React.ReactElement;

/** URLs of your uploads of the files in assets/Sprites; a sprite left out is not drawn. */
export interface HeroSprites {
  clouds?: string;
  plane?: string;
  walker?: string;
  mountains?: string;
  trees?: string;
  car?: string;
  cyclist?: string;
}
export interface HomepageHeroProps {
  /** One line of what the site is, in hero-title. */
  title: string;
  /** One sentence, in lead. */
  subtitle?: string;
  /** The one call to action. */
  cta?: Link;
  /** A Postit for the right-hand side (its props; body as `body`). */
  postit?: PostitProps;
  /** The sky and road travellers. */
  sprites?: HeroSprites;
  className?: string;
}
/**
 * The homepage opener: a blue-tint disc, sky, headline row with an optional post-it, and the CSS road with travellers. Homepage only.
 * @example
 * <HomepageHero title="Open infrastructure for data donation research" subtitle="Digital trace data, donated by the people it belongs to" cta={{ label: "Learn about data donation", href: "#" }} sprites={sprites} />
 */
export declare function HomepageHero(props: HomepageHeroProps): React.ReactElement;

/* Actions ----------------------------------------------------------------------- */

export interface ActionLinkProps {
  href: string;
  /** The label: a verb phrase, no arrow (the arrow is added). */
  children: React.ReactNode;
  /** section: the standard coral link (.section-cta); compact: inside cards and headers (.cta-link); accent: in an item's accent (.movement-card__link). */
  variant?: 'section' | 'compact' | 'accent';
  /** For variant accent only: primary (blue), secondary (coral) or tertiary (yellow-text). */
  accent?: 'primary' | 'secondary' | 'tertiary';
  external?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/**
 * The site's one call to action: a bold coral link with a trailing arrow. One per card or section; there are no buttons.
 * @example
 * <ActionLink href="#">Learn about data donation</ActionLink>
 */
export declare function ActionLink(props: ActionLinkProps): React.ReactElement;

export interface ContactBlockProps {
  /** The bold lead question: "Have a question or want to discuss your study?" */
  lead: string;
  /** Shown in full: "Email DataDonation@uu.nl". */
  email: string;
  /** Subject line for the mailto link. */
  subject?: string;
  /** Overrides "Email <email>". */
  emailLabel?: string;
  /** Line above the topics: "We can answer your questions about:". */
  intro?: string;
  /** Two to four topics; with topics the block is a two-column row, without them it is centred. */
  topics?: string[];
  /** Caps the block at 42rem, inside a content page. */
  constrained?: boolean;
  className?: string;
}
/**
 * The contact block that closes a hub or content page: a lead question and the team's email, optionally beside topics.
 * @example
 * <ContactBlock lead="Have a question or want to discuss your study?" email="DataDonation@uu.nl" intro="We can answer your questions about:" topics={["Which hosting option fits your project", "Getting access for your university"]} />
 */
export declare function ContactBlock(props: ContactBlockProps): React.ReactElement;

/* Notes ----------------------------------------------------------------------- */

export interface PostitProps {
  /** One or two words; default "Updates". */
  eyebrow?: string;
  /** A short title. */
  title: string;
  /** One or two sentences (or pass them as children). */
  body?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional link; its label carries its own arrow: "Read our letter →". */
  link?: Link;
  /** The content-page form: no tape, floats right above 768px. */
  inline?: boolean;
  className?: string;
}
/**
 * A cream sticky note for timely updates: a position, an outage, a deadline. One per page, only while timely.
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
 * A quiet notice inside the reading column: a pale blue box with a blue rule on the left.
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
  /** As the site writes it: "September 8, 2026". */
  date?: string;
  summary?: string;
  /** Optional photo; inside NewsCard.Band it becomes a round avatar on the accent field. */
  image?: Picture;
  /** Media field colour 0, 1, 2 (blue, coral, yellow); default: title length modulo 3, as the site does. */
  accent?: 0 | 1 | 2;
  /** tile (default; the news grid) or row (small media slot left). */
  variant?: 'tile' | 'row';
  /** Default "Read more". */
  linkLabel?: string;
  className?: string;
}
export interface NewsCardGridProps {
  /** NewsCards: one column, three above 768px. */
  children: React.ReactNode;
  className?: string;
}
export interface NewsCardListProps {
  /** NewsCards with variant="row". */
  children: React.ReactNode;
  className?: string;
}
export interface NewsCardBandProps {
  /** Default "Latest news". */
  title?: string;
  /** The "More news →" link. */
  moreLink?: Link;
  /** Three NewsCards; the band lays them out as the grid. */
  children: React.ReactNode;
  className?: string;
}
/**
 * A news item as a card: an accent media slot, title, date, summary and a "Read more →" link pinned to the bottom.
 * @example
 * <NewsCard title="Data Donation Symposium Program Available" href="#" date="September 8, 2026" summary="The schedule for the 2026 symposium has been published." />
 */
export declare const NewsCard: ((props: NewsCardProps) => React.ReactElement) & {
  /** The news page grid. */
  Grid: (props: NewsCardGridProps) => React.ReactElement;
  /** A stack of row cards. */
  List: (props: NewsCardListProps) => React.ReactElement;
  /** The homepage news band on surface-tint, photos as avatars. */
  Band: (props: NewsCardBandProps) => React.ReactElement;
};

export interface ArchiveCardProps {
  title: string;
  /** Formatted as the site does: "October 1-2, 2026". */
  date?: string;
  /** "Weizenbaum Institute, Berlin, Germany"; joined to the date with " · ". */
  location?: string;
  summary?: string;
  /** Labelled rows under the summary. */
  details?: DetailRow[];
  /** The entry's page (or its external site); adds "View details →" as the first action. */
  href?: string;
  /** Overrides "View details". */
  hrefLabel?: string;
  external?: boolean;
  /** Further action links after the first. */
  actions?: Link[];
  /** Upcoming or highlighted: blue-tint fill and a road border. */
  featured?: boolean;
  className?: string;
}
export interface ArchiveCardListProps {
  /** Optional heading over the list ("Upcoming", "Past events"). */
  heading?: string;
  /** ArchiveCards, stacked 1rem apart. */
  children: React.ReactNode;
  className?: string;
}
/**
 * An event or archive entry: title, date and place, summary, detail rows and action links.
 * @example
 * <ArchiveCard featured title="Data Donation Symposium 2026" date="October 1-2, 2026" location="Weizenbaum Institute, Berlin, Germany" href="#" />
 */
export declare const ArchiveCard: ((props: ArchiveCardProps) => React.ReactElement) & {
  /** The archive list, optionally under a heading. */
  List: (props: ArchiveCardListProps) => React.ReactElement;
};

export interface MovementCardProps {
  /** One or two uppercase words: "The method". */
  eyebrow?: string;
  heading: string;
  /** One or two sentences. */
  body?: string;
  /** An illustration from assets/Illustrations in the item's accent. */
  image?: Picture;
  /** The link, drawn in the accent with a trailing arrow. */
  link?: Link;
  /** primary pairs blue with blue-tint, secondary coral with coral-tint, tertiary yellow-text with yellow-tint; homepage order: primary, secondary, tertiary. */
  accent?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}
export interface MovementCardGroupProps {
  /** The MovementCards, in order. */
  children: React.ReactNode;
  /** The wide layout (image panel left, text right), one card in view; without it the cards stack. */
  wide?: boolean;
  /** With wide: the index of the card in view. */
  active?: number;
  className?: string;
}
/**
 * One of the homepage's movements: a tinted illustration panel with eyebrow, heading, sentence and link, all in one accent.
 * @example
 * <MovementCard accent="primary" eyebrow="The method" heading="What is data donation?" body="Data donation allows researchers to collect digital traces." link={{ label: "Learn how it works", href: "#" }} />
 */
export declare const MovementCard: ((props: MovementCardProps) => React.ReactElement) & {
  /** The homepage band that holds the cards. */
  Group: (props: MovementCardGroupProps) => React.ReactElement;
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
  /** Under the title, at radius-sm. */
  image?: Picture;
  /** The fields that apply, in this order: Data collection, Recruitment, Instructions, Ethics, Software, Processing, Data, Funded by. */
  details?: DetailRow[];
  /** Reference list, collapsed under a summary line. */
  references?: React.ReactNode[];
  /** Default "References". */
  referencesLabel?: string;
  className?: string;
}
export interface ProjectCardListProps {
  /** ProjectCards, divided by border rules. */
  children: React.ReactNode;
  /** Closing line crediting the illustration sources. */
  attribution?: React.ReactNode;
  className?: string;
}
/**
 * A completed study: title, investigators, a paragraph, labelled details and a collapsible reference list.
 * @example
 * <ProjectCard title="Behind the screens: Exploring Netflix via Data Donations" investigators={[{ name: "Dennis Nguyen" }, { name: "Karin van Es" }]} institution="Utrecht University" summary="This study used data donations to investigate Netflix viewing behaviours." />
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
  /** URL of the photo; a member without one shows no image, as on the site. */
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
  /** Default true: chips and tag pills filter the grid. */
  filterable?: boolean;
  /** Default "All". */
  allLabel?: string;
  filterLabel?: string;
  className?: string;
}
/**
 * The team page: round photos, names and tag pills, with filter chips; a chip or a pill filters the grid.
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
  /** A small illustration from assets/Illustrations, floated right of the prose. */
  image?: Picture;
  /** A wrapping row of compact action links. */
  actions?: Link[];
  /** A SidebarPanel: the page then takes the two-column grid with the sidebar left. */
  sidebar?: React.ReactNode;
  className?: string;
}
/**
 * The top of a content page: title, opening prose with a floated illustration, and optional action links.
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
  /** The section's pages; mark the current one active. */
  items: SidebarPage[];
  /** Accessible label; default: title. */
  label?: string;
  className?: string;
}
/**
 * The left-hand section navigation on content pages: the section as title, its pages under a thin rail.
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
 * An in-page contents list at the top of a long content page.
 * @example
 * <TableOfContents items={[{ label: "What the software does", href: "#" }, { label: "How to get access", href: "#" }]} />
 */
export declare function TableOfContents(props: TableOfContentsProps): React.ReactElement;

/** One step on a route: one line and one action. */
export interface RouteStep {
  text: string;
  link?: Link;
}
/** One route: the reader's own question, the answer, and its steps. */
export interface Route {
  question: string;
  /** One or two sentences. */
  answer?: string;
  /** Two or three steps. */
  steps: RouteStep[];
  /** A glyph at the head of the rail, inlined in the rail's accent. */
  glyph?: 'netherlands' | 'globe';
}
export interface RoutesProps {
  /** Two routes; rails alternate blue, yellow. */
  routes: Route[];
  /** Line under the routes; defaults to the EuroGeographics attribution when a route shows the netherlands glyph. */
  attribution?: React.ReactNode;
  className?: string;
}
/**
 * A fork the reader resolves by picking the question that fits them: rails with hollow stops, one action per step.
 * @example
 * <Routes routes={[{ glyph: "netherlands", question: "Are you a researcher in the Netherlands?", steps: [{ text: "Contact us for access.", link: { label: "Email datadonation@uu.nl", href: "mailto:datadonation@uu.nl" } }] }]} />
 */
export declare function Routes(props: RoutesProps): React.ReactElement;

export interface JourneyNextProps {
  /** The next step's two-digit number, as on the hub: "02". */
  number: string;
  title: string;
  body?: string;
  link?: Link;
  /** The step after that, as a quieter line. */
  after?: { number: string; title: string; href: string };
  /** Default "Next step". */
  label?: string;
  className?: string;
}
/**
 * The "Next step" block at the foot of a journey page: a coral number beside the next step's title. Not on the last step.
 * @example
 * <JourneyNext number="02" title="Pick a platform" link={{ label: "Use our script selector", href: "#" }} after={{ number: "03", title: "Go further (optional)", href: "#" }} />
 */
export declare function JourneyNext(props: JourneyNextProps): React.ReactElement;

export interface HubStepProps {
  title: string;
  /** One or two sentences. */
  body?: string;
  /** An illustration, letterboxed in a 5:4 box. */
  image?: Picture;
  link?: Link;
  /** Two digits; inside HubStep.List it defaults to the step's position: "01", "02". */
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
 * One numbered step of a journey hub: an illustration on one side, a giant coral number, title, a sentence and a link. Always inside HubStep.List.
 * @example
 * <HubStep title="Get access" body="Pick the option that fits your project." link={{ label: "How to get started", href: "#" }} />
 */
export declare const HubStep: ((props: HubStepProps) => React.ReactElement) & {
  /** The journey hub that numbers and alternates its steps. */
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
 * Markdown content as the site renders it: Nunito headings, blue links, ruled blockquote, code on the panel tint, plain tables.
 * @example
 * <Prose html={renderedMarkdown} />
 */
export declare function Prose(props: ProseProps): React.ReactElement;

export interface FigureProps {
  src: string;
  alt: string;
  /** content (default): the captioned figure in the reading column; panel: the small floated panel beside a section. */
  variant?: 'content' | 'panel';
  /** For variant content. */
  caption?: React.ReactNode;
  /** For variant panel: floats it above 900px. */
  float?: 'right' | 'left';
  className?: string;
}
export interface FigureMediaGridProps {
  /** Two images side by side above 768px. */
  images: Picture[];
  className?: string;
}
/**
 * Illustrations and diagrams in the reading column, on a surface-tint panel with the blue-tinted shadow.
 * @example
 * <Figure src={cloudFilesUrl} alt="Files moving to and from a cloud" caption="Participants request their data from the platform, then process it locally." />
 */
export declare const Figure: ((props: FigureProps) => React.ReactElement) & {
  /** Two images side by side. */
  MediaGrid: (props: FigureMediaGridProps) => React.ReactElement;
};

export interface EventDetailsProps {
  /** Date, location and the like; a value may carry a link. */
  rows: DetailRow[];
  className?: string;
}
/**
 * The metadata box near the top of an event page: label and value rows on the panel tint.
 * @example
 * <EventDetails rows={[{ label: "Date", value: "October 1-2, 2026" }, { label: "Location", value: "Weizenbaum Institute, Berlin, Germany" }]} />
 */
export declare function EventDetails(props: EventDetailsProps): React.ReactElement;

/** One big number with its label. */
export interface Stat {
  value: string;
  label: string;
  /** Chart colour chart-1 to chart-5; default: position in the row. */
  series?: 1 | 2 | 3 | 4 | 5;
}
/** A platform pill. */
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
 * The impact page's figures: bordered cards with big coloured numbers, the globe's controls and platform pills.
 * @example
 * <UsageFigures>…</UsageFigures>
 */
export declare const UsageFigures: ((props: UsageFiguresProps) => React.ReactElement) & {
  /** One bordered figure with a title and caption. */
  Figure: (props: UsageFigureProps) => React.ReactElement;
  /** A row of numbers in the chart colours. */
  Stats: (props: UsageStatsProps) => React.ReactElement;
  /** The globe frame with its back and zoom controls and hint. */
  Globe: (props: UsageGlobeProps) => React.ReactElement;
  /** Platform pills grouped by category. */
  Platforms: (props: UsagePlatformsProps) => React.ReactElement;
};

/* Slides -------------------------------------------------------------------- */
/* Each renders one 1920 × 1080 <section> with inline styles in the system's light-theme hex values.
   Mount it in a design canvas, or get its markup for a Slides deck with D3I.slideMarkup(D3I.SlideFrame, props).
   Eyebrows and titles carry data-fit="none" so the Slides canvas never shrinks them. */

/** The footer row every slide but the cover and SlideQuestions carries. */
export interface SlideFooterProps {
  /** The slide number, right of the footer. Builds repeat one number on every step. */
  number?: number | string;
  /** A citation; replaces "datadonation.eu" in the footer's left slot, set in slide-small. */
  source?: string;
}

export interface SlideCoverProps {
  /** Default "D3I · datadonation.eu". */
  eyebrow?: string;
  /** At most two lines at slide-display. */
  title: string;
  /** One line under the title. */
  lead?: string;
  /** "Name · Affiliation · Venue, Month D, YYYY". */
  byline?: string;
  /** The road band's accessible description. */
  bandLabel?: string;
  /** Replaces the title block, for a closing slide that keeps the band. */
  children?: React.ReactNode;
}
/** The cover and closing slide: the road band with the mark, the phone and the arc, over the title. */
export declare function SlideCover(props: SlideCoverProps): React.ReactElement;

export interface SlideFrameCard {
  eyebrow?: string;
  title: string;
  body?: string;
  /** 48px above the eyebrow: a mark from assets/Platforms, or a concept glyph from assets/Glyphs in the card's accent. */
  iconSrc?: string;
  iconAlt?: string;
  /** A white card with a border, for parallel items of one kind; otherwise cards take the blue, coral, yellow tints in order. */
  plain?: boolean;
}
export interface SlideFrameProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** Up to three cards in a row. */
  cards?: SlideFrameCard[];
  /** Columns of the statement panel on surface-tint. */
  panel?: Array<{ eyebrow: string; text: string }>;
  /** The section's gap; default 48px. */
  gap?: string;
  /** Any further body, between the cards and the panel. */
  children?: React.ReactNode;
}
/** The frame every content slide shares, with three tint cards and a statement panel as its commonest body. */
export declare function SlideFrame(props: SlideFrameProps): React.ReactElement;

export interface SlidePlanProps extends SlideFooterProps {
  /** Default "Overview". */
  eyebrow?: string;
  heading: string;
  /** Three to six part headers of one to three words. The last stop is coral. */
  stops: string[];
}
/** The overview: the road with one numbered stop per part, in place of an agenda. */
export declare function SlidePlan(props: SlidePlanProps): React.ReactElement;

export interface SlideSectionStopProps extends SlideFooterProps {
  /** The eyebrow: "Part II". */
  part: string;
  /** The part's name: "The method". */
  heading: string;
  /** Two digits: "02". */
  stepNumber: string;
  /** The part's claim in one sentence of about fifteen words. */
  sentence: string;
  /** Every part's name, for the road labels. */
  stops: string[];
  /** Index of this part in `stops`. */
  current: number;
}
/** The opener of a part: its number, its claim and the road with the current stop. */
export declare function SlideSectionStop(props: SlideSectionStopProps): React.ReactElement;

export interface SlideBuildRow {
  label: string;
  left: { title: string; text?: string };
  right: { title: string; text?: string };
  /** coral: a row that makes a different kind of point. */
  tone?: 'default' | 'coral';
}
export interface SlideBuildProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** The rail's step names. */
  steps?: string[];
  /** Index of the current rail stop; default the last row shown. */
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
  /** A mini bar chart inside the tile: years and counts. */
  series?: Array<{ label: string; value: number }>;
  /** Marks from assets/Platforms, 32px, eight to a row. */
  marks?: Picture[];
}
export interface SlideStatsProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** Up to four tiles; numerals take chart-1 to chart-4 in order. */
  tiles: SlideStatsTile[];
  /** Up to three columns of the list the numbers summarise. */
  panel?: Array<{ title: string; items: string[] }>;
  children?: React.ReactNode;
}
/** Stat tiles in the chart colours over a list panel. */
export declare function SlideStats(props: SlideStatsProps): React.ReactElement;

export interface SlideFunnelProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** Shrinking shares against one base; bars scale to the first stage at 400px. */
  funnel?: { eyebrow?: string; base?: string; stages: Array<{ label: string; pct: number }>; note?: string; color?: 'coral' | 'blue' };
  /** Options that differ in how much arrives: all (coral fill), promise (dashed, arrives then deleted), strip (a blue strip, the selected part only). */
  meter?: { options: Array<{ eyebrow: string; fill: 'all' | 'promise' | 'strip'; fillLabel: string; text?: string; recommended?: boolean }> };
  children?: React.ReactNode;
}
/** Layout that carries the argument: a funnel and a meter. */
export declare function SlideFunnel(props: SlideFunnelProps): React.ReactElement;

export interface SlideWindowProps extends SlideFooterProps {
  eyebrow?: string;
  heading: string;
  /** The numbered list left of the window. */
  steps: Array<{ title: string; text?: string }>;
  /** A link line under the list; the arrow is added. */
  link?: string;
  window: {
    url: string;
    title?: string;
    tabs?: Array<{ label: string; active?: boolean }>;
    stat?: string;
    chartLabel?: string;
    bars?: Array<{ label: string; value: number }>;
    /** A real screenshot replaces the drawn body. */
    imageSrc?: string;
    imageAlt?: string;
  };
  /** Under the window; say when the body is drawn, not a screenshot. */
  caption?: string;
}
/** A drawn browser window for software, beside a numbered list. */
export declare function SlideWindow(props: SlideWindowProps): React.ReactElement;

export interface SlideQuestionsProps {
  eyebrow?: string;
  heading: string;
  /** Default ["The problem", "What changes", "The question"]. */
  headers?: [string, string, string];
  rows: Array<{ problem: string; change: string; question: string }>;
  casesLabel?: string;
  /** Up to two case cards; tints default to blue then yellow. */
  cases?: Array<{ title: string; text: string; tint?: 'blue' | 'coral' | 'yellow' }>;
  email?: string;
  /** Default "datadonation.eu". */
  site?: string;
  /** "A service provided by ODISSEI and supported by Eyra". */
  credit?: string;
  /** assets/Logos, 44px tall; width defaults to 120. */
  logos?: Array<Picture & { width?: number }>;
}
/** The closing or discussion slide for a research audience. */
export declare function SlideQuestions(props: SlideQuestionsProps): React.ReactElement;

/** One slide as markup for a Slides deck: one <section>, inline styles with hex colours, data-fit kept. Needs ReactDOM 18 on window. */
export declare function slideMarkup<P>(component: (props: P) => React.ReactElement, props: P): string;

declare global {
  interface Window {
    D3I: {
      SiteHeader: typeof SiteHeader;
      SectionSubnav: typeof SectionSubnav;
      SiteFooter: typeof SiteFooter;
      HomepageHero: typeof HomepageHero;
      ActionLink: typeof ActionLink;
      ContactBlock: typeof ContactBlock;
      Postit: typeof Postit;
      Callout: typeof Callout;
      NewsCard: typeof NewsCard;
      ArchiveCard: typeof ArchiveCard;
      MovementCard: typeof MovementCard;
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
