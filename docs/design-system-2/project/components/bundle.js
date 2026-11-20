/* @ds-bundle: {"format":4,"namespace":"D3I","components":[{"name":"SiteHeader"},{"name":"SectionSubnav"},{"name":"SiteFooter"},{"name":"FrontPage"},{"name":"Band"},{"name":"Note"},{"name":"ArrowDisc"},{"name":"Link"},{"name":"HomeCard"},{"name":"ListRow"},{"name":"ActionLink"},{"name":"ContactBlock"},{"name":"Postit"},{"name":"Callout"},{"name":"NewsCard"},{"name":"ArchiveCard"},{"name":"InstitutionCard"},{"name":"ProjectCard"},{"name":"PeopleGrid"},{"name":"PageIntro"},{"name":"SidebarPanel"},{"name":"TableOfContents"},{"name":"Routes"},{"name":"JourneyNext"},{"name":"HubStep"},{"name":"Prose"},{"name":"Figure"},{"name":"NewsArticle"},{"name":"EventDetails"},{"name":"UsageFigures"},{"name":"SlideCover"},{"name":"SlideFrame"},{"name":"SlidePlan"},{"name":"SlideSectionStop"},{"name":"SlideBuild"},{"name":"SlideStats"},{"name":"SlideFunnel"},{"name":"SlideWindow"},{"name":"SlideQuestions"}]} */
/*
 * datadonation.eu components, as window.D3I.
 *
 * Each component renders the site's own markup and class names, so it is styled by
 * components/bundle.css (load it, and tokens.css, before mounting). Needs React 18 as
 * window.React (components/lib/ carries react and react-dom 18.3.1). Props are documented
 * in components/index.d.ts; usage rules in components/<Comp>/README.md.
 *
 * Images are props: pass the URL your own upload of the asset returned (on this design
 * system's own page that is /_blob/<id>). The Slide components render 1920 x 1080 slides
 * with inline hex styles; D3I.slideMarkup(D3I.SlideFrame, props) returns one as markup for
 * a Slides deck.
 */
(function () {
  'use strict';

  /* React is read when a component renders, so this script may load before it. */
  function R() {
    var r = window.React;
    if (!r) throw new Error('D3I components need React 18 on window.React');
    return r;
  }
  function h() {
    var r = R();
    return r.createElement.apply(r, arguments);
  }
  function frag() {
    var args = [R().Fragment, null];
    for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
    return h.apply(null, args);
  }

  /* helpers ------------------------------------------------------------- */

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }
  /* the props a component does not consume, passed on to its root element */
  function rest(p, used) {
    var o = {};
    for (var k in p) if (Object.prototype.hasOwnProperty.call(p, k) && used.indexOf(k) < 0 && k !== 'children') o[k] = p[k];
    return o;
  }
  function linkAttrs(href, external) {
    return external ? { href: href, target: '_blank', rel: 'noopener noreferrer' } : { href: href };
  }
  function list(v) {
    return Array.isArray(v) ? v : [];
  }
  function pad2(n) {
    var s = String(n);
    return s.length < 2 ? '0' + s : s;
  }

  /* Actions --------------------------------------------------------------- */

  /* The front page's "More" form off the front page: the label, a word for screen readers straight
     after it (hiddenLabel), the short dotted line and the small arrow disc. A long label wraps like
     text, but its last word, the dots and the disc share one nowrap span (more__end), so they never
     part. A label that is not plain text goes into that span whole. */
  function ActionLink(p) {
    var attrs = Object.assign({ className: cx(p.variant === 'compact' ? 'cta-link' : 'section-cta', p.className) },
      rest(p, ['href', 'external', 'variant', 'hiddenLabel', 'className']), linkAttrs(p.href, p.external));
    var head = null, last = p.children;
    if (typeof p.children === 'string') {
      var m = /^([\s\S]*\s)?(\S+)$/.exec(p.children.trim());
      if (m) { head = m[1] || null; last = m[2]; }
    }
    return h('a', attrs,
      head,
      h('span', { className: 'more__end' },
        last,
        p.hiddenLabel ? h('span', { className: 'visually-hidden' }, p.hiddenLabel) : null,
        h('i', { className: 'more__dots' }),
        h(ArrowDisc, null)));
  }

  /* The live block's structure in the new style: the question and the address left, the topics right
     on coral bullets (plain text, never links), or the question and the address centred where there
     are no topics. The block is always 42rem and centred, so `constrained` (deprecated) does nothing. */
  function ContactBlock(p) {
    var subject = p.subject ? '?subject=' + encodeURIComponent(p.subject) : '';
    var email = h('p', { className: 'contact-cta__email' },
      h('a', { href: 'mailto:' + p.email + subject }, p.emailLabel || 'Email ' + p.email));
    var lead = h('p', { className: 'contact-cta__lead' }, p.lead);
    var topics = list(p.topics);
    var attrs = rest(p, ['lead', 'email', 'subject', 'emailLabel', 'intro', 'topics', 'constrained', 'className']);
    if (topics.length === 0) {
      attrs.className = cx('contact-cta', 'contact-cta--centered', p.className);
      return h('section', attrs, lead, email);
    }
    attrs.className = cx('contact-cta', p.className);
    return h('section', attrs,
      h('div', { className: 'contact-cta__row' },
        h('div', { className: 'contact-cta__left' }, lead, email),
        h('div', { className: 'contact-cta__topics' },
          p.intro ? h('p', { className: 'contact-cta__intro' }, p.intro) : null,
          h('ul', null, topics.map(function (t, i) { return h('li', { key: i }, t); })))));
  }

  /* Notes ------------------------------------------------------------------ */

  /* The front page's note brought to the content pages, in the site's postit classes: the text on
     paper, the tab, and over the tab the dotted line from the coral corner node (noteTab and
     noteOver, shared with Note). With link.href the whole postit is one link and carries the arrow
     disc and, with link.label, the tab's text; without one it is an <aside> with neither. */
  function Postit(p) {
    var href = p.link && p.link.href ? p.link.href : null;
    var attrs = rest(p, ['eyebrow', 'title', 'body', 'link', 'inline', 'className']);
    attrs.className = cx('postit', p.inline && 'postit--inline', p.className);
    if (href) Object.assign(attrs, linkAttrs(href, p.link.external));
    return h(href ? 'a' : 'aside', attrs,
      h('div', { className: 'postit__paper' },
        h('div', { className: 'postit__note' },
          p.eyebrow ? h('p', { className: 'postit__eyebrow' }, p.eyebrow) : null,
          h('h3', { className: 'postit__title' }, p.title),
          p.body ? h('p', { className: 'postit__body' }, p.body) : null),
        noteTab('postit__tab')),
      noteOver('postit', href, href && p.link.label));
  }

  /* A notice on a short blue line (.callout::before), from a coral node to a ring node. */
  function Callout(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('callout', p.className);
    return h('div', attrs,
      h('i', { className: 'callout__node' }),
      h('p', null, p.children),
      h('i', { className: 'callout__ring' }));
  }

  /* Cards ------------------------------------------------------------------ */

  /* A date as the cards take it: ISO (2026-11-09), or folded as the site writes it ("September 8,
     2026", "October 1-2, 2026", "September 30 - October 2, 2026"). { start, end } of { y, m, d }
     (m from 0), end null for one day; null if it reads neither way. */
  function datesOf(v) {
    var s = String(v == null ? '' : v).trim(), m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (m) return { start: { y: +m[1], m: +m[2] - 1, d: +m[3] }, end: null };
    m = /^([A-Za-z]+)\s+(\d{1,2})(?:\s*[-–]\s*(?:([A-Za-z]+)\s+)?(\d{1,2}))?,\s*(\d{4})$/.exec(s);
    if (!m) return null;
    var month = function (name) {
      for (var i = 0; i < MONTH_NAMES.length; i++) if (MONTH_NAMES[i].toLowerCase() === name.toLowerCase()) return i;
      return -1;
    };
    var sm = month(m[1]), em = m[3] ? month(m[3]) : sm;
    if (sm < 0 || em < 0) return null;
    return { start: { y: +m[5], m: sm, d: +m[2] }, end: m[4] ? { y: +m[5], m: em, d: +m[4] } : null };
  }
  /* The date column of a list row, as ListRow draws it: the month (%b) over the day, a range's days
     joined by "–", and its months too when they differ. */
  function dateColumn(cls, start, end) {
    var month = MONTHS[start.m], day = String(start.d);
    if (end && (end.m !== start.m || end.d !== start.d)) {
      if (end.m !== start.m) month += '–' + MONTHS[end.m];
      day += '–' + end.d;
    }
    return h('p', { className: cls }, h('span', null, month), h('b', null, day));
  }
  /* A title that is its card's link: <a><span>, the span carrying the dotted underline. */
  function titleLink(cls, title, href, external) {
    return h('h3', { className: cls }, href ? h('a', linkAttrs(href, external), h('span', null, title)) : title);
  }

  /* A news item in the row form: the front page's list row with the summary kept. The month over
     the day, then the title, which is the row's link, and the summary. accent, linkLabel and image
     are the old card's and draw nothing. */
  function NewsCard(p) {
    var when = datesOf(p.date);
    var attrs = rest(p, ['title', 'href', 'external', 'date', 'summary', 'image', 'accent', 'linkLabel', 'className']);
    attrs.className = cx('news-card', 'news-card--row', p.className);
    return h('article', attrs,
      when ? dateColumn('news-card__date', when.start) : p.date ? h('p', { className: 'news-card__date' }, h('span', null, p.date)) : null,
      h('div', { className: 'news-card__body' },
        titleLink('news-card__title', p.title, p.href, p.external),
        p.summary ? h('p', { className: 'news-card__summary' }, p.summary) : null));
  }
  NewsCard.List = function NewsCardList(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('news-list', p.className);
    return h('div', attrs, p.children);
  };
  /* The news page: the first item (the newest) is the lead story, its picture large and bleeding;
     the rest form a grid three across. Each picture is the item's image, its social-sharing card,
     shown at 1.91:1; an item without one shows its date (month over day) on a sky node in a
     hairline frame. An external item says where it leads ("On odissei-data.nl"). */
  function newsItem(it, lead, key) {
    var link = linkAttrs(it.href, it.external);
    var when = datesOf(it.date);
    var media;
    if (it.image) {
      media = h('a', Object.assign({ className: 'news-card__media' }, link, { tabIndex: -1, 'aria-hidden': 'true' }),
        h('img', { src: it.image, alt: it.image_alt || '' }));
    } else {
      media = h('a', Object.assign({ className: 'news-card__media news-card__media--date' }, link, { tabIndex: -1, 'aria-hidden': 'true' }),
        h('i'), h('span', null, when ? MONTH_NAMES[when.start.m] : null), h('b', null, when ? String(when.start.d) : it.date));
    }
    var host = it.external ? /^https?:\/\/(?:www\.)?([^/:?#]+)/i.exec(String(it.href || '')) : null;
    return h('article', { className: cx('news-card', lead && 'news-lead'), key: key },
      media,
      h('div', { className: 'news-card__body' },
        it.date ? h('p', { className: 'news-card__date' },
          when ? MONTH_NAMES[when.start.m] + ' ' + when.start.d + ', ' + when.start.y : it.date) : null,
        titleLink('news-card__title', it.title, it.href, it.external),
        lead && it.summary ? h('p', { className: 'news-card__summary' }, it.summary) : null,
        host ? h('p', { className: 'news-card__where' }, 'On ' + host[1]) : null));
  }
  NewsCard.Index = function NewsCardIndex(p) {
    var items = list(p.items);
    var attrs = rest(p, ['items', 'className']);
    attrs.className = cx('news-index', p.className);
    return h('div', attrs,
      items.length > 0 ? newsItem(items[0], true, 0) : null,
      items.length > 1 ? h('div', { className: 'news-grid' }, items.slice(1).map(function (it, i) { return newsItem(it, false, i + 1); })) : null);
  };

  /* An event or archive entry as a list row: the date column (month over day, a range joined by
     "–"), then the title, which is the entry's link, the place, the summary and the detail rows.
     A featured entry carries a coral node under its date. Further actions take ActionLink's compact
     form. A date the card cannot read stays in the meta line before the place. hrefLabel is the old
     card's "View details" label and draws nothing. */
  function ArchiveCard(p) {
    var when = datesOf(p.date);
    if (when && p.endDate) {
      var e = datesOf(p.endDate);
      if (e) when.end = e.start;
    }
    var meta = [when ? null : p.date, p.location].filter(Boolean).join(' · ');
    var details = list(p.details);
    var actions = list(p.actions);
    var attrs = rest(p, ['title', 'date', 'endDate', 'location', 'summary', 'details', 'actions', 'href', 'hrefLabel', 'external', 'featured', 'className']);
    attrs.className = cx('archive-card', p.featured && 'archive-card--featured', p.className);
    return h('article', attrs,
      when ? dateColumn('archive-card__date', when.start, when.end) : null,
      h('div', { className: 'archive-card__content' },
        titleLink('archive-card__title', p.title, p.href, p.external),
        meta ? h('p', { className: 'archive-card__meta' }, meta) : null,
        p.summary ? h('p', { className: 'archive-card__summary' }, p.summary) : null,
        details.length > 0 ? h('dl', { className: 'archive-card__details' }, details.map(function (d, i) {
          return h('div', { className: 'archive-card__detail', key: i }, h('dt', null, d.label), h('dd', null, d.value));
        })) : null),
      actions.length > 0 ? h('div', { className: 'archive-card__actions' }, actions.map(function (a, i) {
        return h(ActionLink, { key: i, href: a.href, external: a.external, variant: 'compact' }, a.label);
      })) : null);
  }
  ArchiveCard.List = function ArchiveCardList(p) {
    var attrs = rest(p, ['heading', 'className']);
    attrs.className = cx('archive-page__list', p.className);
    var listEl = h('div', attrs, p.children);
    if (!p.heading) return listEl;
    return h('section', { className: 'archive-page__section' },
      h('div', { className: 'archive-page__section-header' }, h('h2', { className: 'archive-page__heading' }, p.heading)),
      listEl);
  };

  function InstitutionCard(p) {
    var a = p.affiliate;
    var attrs = rest(p, ['institution', 'affiliate', 'department', 'label', 'className']);
    attrs.className = cx('institution-card', p.className);
    return h('article', attrs,
      p.label ? h('p', { className: 'institution-card__label' }, p.label) : null,
      h('h3', { className: 'institution-card__title' }, p.institution),
      a ? h('p', { className: 'institution-card__affiliate' }, a.href ? h('a', linkAttrs(a.href, a.external), a.name) : a.name) : null,
      p.department ? h('p', { className: 'institution-card__department' }, p.department) : null);
  }
  InstitutionCard.Grid = function InstitutionCardGrid(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('institution-grid', p.className);
    return h('div', attrs, p.children);
  };

  function joinNames(people) {
    var out = [];
    people.forEach(function (x, i) {
      if (i > 0) out.push(i === people.length - 1 ? ' and ' : ', ');
      out.push(x.href ? h('a', Object.assign({ key: i }, linkAttrs(x.href, x.external)), x.name) : x.name);
    });
    return out;
  }
  /* A completed study as a dossier: a side column holds the picture at its own shape, uncropped,
     and the key facts under it, the year first in the serif; the study's text sits beside it. The
     side column is left out when there is no picture, year or fact. image as { src, alt } is the
     old form and still works. */
  function ProjectCard(p) {
    var inv = list(p.investigators);
    var details = list(p.details);
    var refs = list(p.references);
    var facts = list(p.facts);
    var img = p.image && typeof p.image === 'object' ? p.image : p.image ? { src: p.image, alt: p.image_alt } : null;
    var hasYear = p.year != null && p.year !== '';
    var attrs = rest(p, ['title', 'image', 'image_alt', 'year', 'facts', 'investigators', 'institution', 'summary', 'details', 'references', 'referencesLabel', 'className']);
    attrs.className = cx('project-card', p.className);
    var invLine = inv.length > 0 || p.institution
      ? h.apply(null, ['p', { className: 'project-card__investigators' }].concat(joinNames(inv), p.institution ? [(inv.length ? ', ' : '') + p.institution] : []))
      : null;
    var aside = img || hasYear || facts.length > 0
      ? h('div', { className: 'project-card__aside' },
        img ? h('img', { className: 'project-card__image', src: img.src, alt: img.alt || '' }) : null,
        hasYear || facts.length > 0 ? h('dl', { className: 'project-card__facts' },
          hasYear ? h('div', { className: 'project-card__year' }, h('dt', null, 'Year'), h('dd', null, String(p.year))) : null,
          facts.map(function (f, i) { return h('div', { key: i }, h('dt', null, f.label), h('dd', null, f.value)); })) : null)
      : null;
    return h('article', attrs,
      aside,
      h('div', { className: 'project-card__body' },
        h('h3', { className: 'project-card__title' }, p.title),
        invLine,
        p.summary ? h('p', { className: 'project-card__summary' }, p.summary) : null,
        details.length > 0 ? h.apply(null, ['dl', { className: 'project-card__details' }].concat(details.map(function (d, i) {
          return frag(h('dt', { key: 't' + i }, d.label), h('dd', { key: 'd' + i }, d.value));
        }))) : null,
        refs.length > 0 ? h('details', { className: 'project-card__refs' },
          h('summary', null, p.referencesLabel || 'References'),
          h('ul', null, refs.map(function (r, i) { return h('li', { key: i }, r); }))) : null));
  }
  ProjectCard.List = function ProjectCardList(p) {
    var attrs = rest(p, ['attribution', 'className']);
    attrs.className = cx('data-list', 'project-list', p.className);
    return frag(
      h('div', attrs, p.children),
      p.attribution ? h('footer', { className: 'project-list__attribution' }, h('p', null, p.attribution)) : null);
  };

  function PeopleGrid(p) {
    var R_ = R();
    var members = list(p.members);
    var vocab = Array.isArray(p.tags) ? p.tags : members.reduce(function (acc, m) {
      list(m.tags).forEach(function (t) { if (acc.indexOf(t) < 0) acc.push(t); });
      return acc;
    }, []);
    var st = R_.useState(p.initialTag || null);
    var active = st[0], setActive = st[1];
    var filterable = p.filterable !== false;
    var pick = function (t) { if (filterable) setActive(t === active ? null : t); };
    var attrs = rest(p, ['members', 'tags', 'initialTag', 'filterable', 'allLabel', 'filterLabel', 'className']);
    attrs.className = cx('people-grid-wrap', p.className);
    var chip = function (label, value, key) {
      var on = active === value;
      return h('button', { type: 'button', key: key, className: cx('people-grid__chip', on && 'is-active'), 'aria-pressed': on ? 'true' : 'false', onClick: function () { setActive(value); } }, label);
    };
    return h('div', attrs,
      filterable && vocab.length > 0 ? h('div', { className: 'people-grid__filters is-ready', role: 'group', 'aria-label': p.filterLabel || 'Filter team members by tag' },
        chip(p.allLabel || 'All', null, '_all'),
        vocab.map(function (t) { return chip(t, t, t); })) : null,
      h('div', { className: 'people-grid' }, members.map(function (m, i) {
        var shown = !active || list(m.tags).indexOf(active) >= 0;
        return h('div', { className: cx('people-grid__card', !shown && 'people-grid__card--hidden'), key: i },
          m.photo ? h('img', { className: 'people-grid__photo', src: m.photo, alt: m.photoAlt != null ? m.photoAlt : '' }) : null,
          h('h3', { className: 'people-grid__name' }, m.href ? h('a', linkAttrs(m.href, m.external), m.name) : m.name),
          m.role ? h('p', { className: 'people-grid__role' }, m.role) : null,
          list(m.tags).length > 0 ? h('ul', { className: 'people-grid__tags' }, list(m.tags).map(function (t) {
            return h('li', { key: t }, h('span', {
              className: 'people-grid__tag',
              role: filterable ? 'button' : undefined,
              tabIndex: filterable ? 0 : undefined,
              onClick: function () { pick(t); },
              onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(t); } }
            }, t));
          })) : null);
      })));
  }

  /* Wayfinding -------------------------------------------------------------- */

  function PageIntro(p) {
    var actions = list(p.actions);
    var attrs = rest(p, ['title', 'excerpt', 'image', 'actions', 'sidebar', 'className']);
    attrs.className = cx('content-page', p.className);
    return h('article', attrs,
      h('div', { className: cx('content-page__grid', !p.sidebar && 'content-page__grid--full') },
        p.sidebar ? h('div', { className: 'content-page__sidebar' }, p.sidebar) : null,
        h('div', { className: 'content-page__main' },
          h('div', { className: 'content-page__intro' },
            h('header', { className: 'content-page__header' }, h('h1', { className: 'content-page__title' }, p.title)),
            p.excerpt ? h('p', { className: 'content-page__excerpt' }, p.excerpt) : null),
          h('div', { className: 'prose' },
            p.image ? h('figure', { className: 'section-page__hero' }, h('img', { src: p.image.src, alt: p.image.alt || '' })) : null,
            p.children),
          actions.length > 0 ? h('div', { className: 'content-page__actions' }, actions.map(function (a, i) {
            return h(ActionLink, { variant: 'compact', href: a.href, external: a.external, key: i }, a.label);
          })) : null)));
  }

  /* The section's pages as nodes on a blue line between two ring nodes, the current page the one
     coral node (all drawn by bundle.css). One page is current: the first marked active. */
  function SidebarPanel(p) {
    var items = list(p.items);
    var current = -1;
    items.some(function (it, i) { if (it.active) current = i; return it.active; });
    var attrs = rest(p, ['title', 'href', 'items', 'label', 'className']);
    attrs.className = cx('section-nav', 'sidebar-panel', p.className);
    attrs['aria-label'] = p.label || (typeof p.title === 'string' ? p.title : undefined);
    return h('nav', attrs,
      h('ul', { className: 'section-nav__list' },
        h('li', { className: 'section-nav__item section-nav__item--parent' },
          h('a', { className: 'section-nav__heading sidebar-panel__title', href: p.href }, p.title),
          h('div', { className: 'sidebar-panel__body' },
            h('ul', { className: 'section-nav__children' }, items.map(function (it, i) {
              var subs = list(it.sections);
              var here = i === current;
              return h('li', { className: 'section-nav__child', key: i },
                h('a', { className: cx('section-nav__link', 'sidebar-panel__link', here && 'is-active'), href: it.href, 'aria-current': here ? 'page' : undefined }, it.label),
                subs.length > 0 ? h('ul', { className: 'section-nav__grandchildren' }, subs.map(function (s, j) {
                  return h('li', { className: 'section-nav__grandchild', key: j }, h('a', { className: 'section-nav__sublink', href: s.href }, s.label));
                })) : null);
            }))))));
  }

  /* As _layouts/page.html writes it for toc: true; the site's generator (_includes/toc.html) writes
     the list as ul.toc__menu, so the links are running-text links. */
  function TableOfContents(p) {
    var attrs = rest(p, ['title', 'items', 'className']);
    var title = p.title || 'Contents';
    attrs.className = cx('content-page__toc', p.className);
    attrs['aria-label'] = typeof title === 'string' ? title : 'Contents';
    return h('nav', attrs,
      h('p', { className: 'content-page__toc-title' }, title),
      h('ul', { className: 'toc__menu' }, list(p.items).map(function (it, i) {
        return h('li', { key: i }, h('a', { href: it.href }, it.label));
      })));
  }

  /* The two routes glyphs (assets/Glyphs), inlined so currentColor takes the rail's accent. */
  var GLYPHS = {
    netherlands: function () {
      return h('svg', { viewBox: '0 0 32 42', 'aria-hidden': 'true', focusable: 'false' },
        h('g', { fill: 'none', stroke: 'currentColor', strokeWidth: '2.5', strokeLinejoin: 'round', strokeLinecap: 'round' },
          h('path', { d: 'M29.4 11.3 L28.1 15.1 L26.0 15.2 L25.9 16.9 L28.0 17.3 L28.5 19.7 L26.3 21.1 L26.5 24.8 L24.5 26.9 L23.3 30.6 L25.1 32.1 L24.6 35.1 L22.4 36.5 L19.3 36.0 L17.2 39.5 L13.4 40.6 L10.1 39.2 L6.1 39.6 L3.4 37.5 L2.0 34.1 L3.1 30.9 L5.9 29.8 L7.4 26.3 L6.2 22.9 L7.1 19.9 L9.3 18.1 L10.6 14.4 L11.3 10.0 L13.8 7.5 L16.9 6.4 L19.0 3.7 L21.4 1.5 L23.4 2.6 L24.1 5.9 L26.6 7.4 L29.4 11.3 Z' })));
    },
    globe: function () {
      return h('svg', { viewBox: '0 0 40 40', 'aria-hidden': 'true', focusable: 'false' },
        h('g', { fill: 'none', stroke: 'currentColor', strokeWidth: '2.5', strokeLinecap: 'round' },
          h('circle', { cx: '20', cy: '20', r: '16' }),
          h('ellipse', { cx: '20', cy: '20', rx: '7', ry: '16' }),
          h('path', { d: 'M4 20 H36' }),
          h('path', { d: 'M6.5 12 H33.5', opacity: '.45' }),
          h('path', { d: 'M6.5 28 H33.5', opacity: '.45' })));
    }
  };
  var NL_ATTRIBUTION = 'Netherlands outline: administrative boundaries © EuroGeographics, via Eurostat GISCO.';

  function Routes(p) {
    var routes = list(p.routes);
    var usesNL = routes.some(function (r) { return r.glyph === 'netherlands'; });
    var attribution = p.attribution !== undefined ? p.attribution : usesNL ? NL_ATTRIBUTION : null;
    var attrs = rest(p, ['routes', 'attribution', 'className']);
    attrs.className = cx('routes', p.className);
    return frag(
      h('div', attrs, routes.map(function (r, i) {
        var glyph = r.glyph && GLYPHS[r.glyph];
        return h('section', { className: cx('route', glyph && 'route--with-glyph'), key: i },
          glyph ? h('span', { className: 'route__glyph' }, glyph()) : null,
          h('h3', { className: 'route__question' }, r.question),
          r.answer ? h('p', { className: 'route__answer' }, r.answer) : null,
          h('ul', { className: 'route__steps' }, list(r.steps).map(function (s, j) {
            return h('li', { className: 'route__step', key: j },
              h('p', { className: 'route__step-text' }, s.text),
              s.link ? h(ActionLink, { className: 'route__step-link', href: s.link.href, external: s.link.external }, s.link.label) : null);
          })));
      })),
      attribution ? h('p', { className: 'routes__attribution' }, attribution) : null);
  }

  /* The next step leads somewhere as a whole: its title is the link (the link's ::after covers the
     step) and the step ends in the arrow disc, as the note does. "After that" sits below the step,
     outside what the title's link covers. */
  function JourneyNext(p) {
    var id = R().useId();
    var labelId = 'journey-next-label' + id.replace(/:/g, '');
    var attrs = rest(p, ['number', 'title', 'body', 'href', 'external', 'link', 'after', 'label', 'className']);
    attrs.className = cx('journey-next', p.className);
    attrs['aria-labelledby'] = labelId;
    var after = p.after;
    var title = h('span', null, p.title);
    /* the deprecated link prop: its href and external, when href is not given */
    var old = !p.href && p.link && p.link.href ? p.link : null;
    var href = old ? old.href : p.href;
    var external = old ? old.external : p.external;
    return h('aside', attrs,
      h('p', { className: 'journey-next__label', id: labelId }, p.label || 'Next step'),
      h('div', { className: 'journey-next__step' },
        p.number ? h('span', { className: 'journey-next__number', 'aria-hidden': 'true' }, p.number) : null,
        h('div', { className: 'journey-next__text' },
          h('h2', { className: 'journey-next__title' }, href ? h('a', linkAttrs(href, external), title) : title),
          p.body ? h('p', { className: 'journey-next__body' }, p.body) : null),
        href ? h('svg', Object.assign({ className: 'journey-next__disc' }, NOTE_DISC), discParts('1.8')) : null),
      after ? h('p', { className: 'journey-next__after' }, 'After that: ',
        after.number ? h('span', { className: 'journey-next__after-number' }, after.number) : null, after.number ? ' ' : null,
        after.href ? h('a', { href: after.href }, after.title) : after.title) : null);
  }

  /* A step of the journey hub. The title is the step's link; bundle.css puts the number in a blue
     disc on the hub's one vertical line. */
  function HubStep(p) {
    var attrs = rest(p, ['number', 'title', 'body', 'image', 'href', 'external', 'link', 'side', 'className']);
    attrs.className = cx('hub__movement', p.side === 'right' ? 'hub__movement--right' : 'hub__movement--left', p.className);
    /* the deprecated link prop: its href and external, when href is not given */
    var old = !p.href && p.link && p.link.href ? p.link : null;
    var href = old ? old.href : p.href;
    var external = old ? old.external : p.external;
    var title = h('span', null, p.title);
    return h('article', attrs,
      h('div', { className: 'hub__movement-image' }, p.image ? h('img', { src: p.image.src, alt: p.image.alt || '' }) : null),
      h('div', { className: 'hub__movement-text' },
        p.number ? h('span', { className: 'hub__movement-number', 'aria-hidden': 'true' }, p.number) : null,
        h('h2', { className: 'hub__movement-title' }, href ? h('a', linkAttrs(href, external), title) : p.title),
        p.body ? h('p', { className: 'hub__movement-body' }, p.body) : null));
  }
  /* The journey hub: optional hero, then the steps on one line, alternating sides and numbered 01, 02 … unless a step sets its own. */
  HubStep.List = function HubStepList(p) {
    var R_ = R();
    var n = 0;
    var steps = R_.Children.map(p.children, function (c) {
      if (!R_.isValidElement(c)) return c;
      var i = n++;
      var add = {};
      if (c.props.side === undefined) add.side = i % 2 === 0 ? 'left' : 'right';
      if (c.props.number === undefined) add.number = pad2(i + 1);
      return R_.cloneElement(c, add);
    });
    var attrs = rest(p, ['title', 'subtitle', 'image', 'className']);
    attrs.className = cx('hub', 'hub--journey', p.className);
    return h('article', attrs,
      p.title ? h('div', { className: 'hub__hero' },
        p.image ? h('div', { className: 'hub__hero-image' }, h('img', { src: p.image.src, alt: p.image.alt || '' })) : null,
        h('div', { className: 'hub__hero-text' },
          h('h1', { className: 'hub__hero-title' }, p.title),
          p.subtitle ? h('p', { className: 'hub__hero-subhead' }, p.subtitle) : null)) : null,
      h('section', { className: 'hub__movements' }, steps));
  };

  /* Shell -------------------------------------------------------------------- */

  /* _includes/site-header.html. Below 1000px the site folds the links into a drop-down that the
     Menu button opens (assets/js/site-menu.js), keeping its state in the button's aria-expanded.
     menu 'closed' (the default) and 'open' render that button; 'none' renders the markup as it
     shows without JavaScript: no button, the links a wrapped list. */
  function SiteHeader(p) {
    var menu = p.menu || 'closed';
    var attrs = rest(p, ['brand', 'tagline', 'href', 'links', 'menu', 'className']);
    attrs.className = cx('site-header', p.className);
    return h('header', attrs,
      h('div', { className: 'site-header__inner' },
        h('a', { className: 'site-header__brand', href: p.href || '/' },
          h('span', { className: 'site-header__name' }, p.brand),
          p.tagline ? h('span', { className: 'site-header__subtitle' }, p.tagline) : null),
        menu === 'none' ? null : h('button', { className: 'site-header__menu', type: 'button', 'aria-expanded': menu === 'open' ? 'true' : 'false', 'aria-controls': 'site-nav' }, 'Menu'),
        h('nav', { className: 'site-nav', id: 'site-nav', 'aria-label': 'Primary' },
          h('ul', { className: 'site-nav__list' }, list(p.links).map(function (l, i) {
            return h('li', { className: cx('site-nav__item', l.current && 'is-active'), key: i }, h('a', { href: l.href }, l.label));
          })))));
  }

  function SectionSubnav(p) {
    var attrs = rest(p, ['label', 'items', 'className']);
    attrs.className = cx('section-subnav', p.className);
    attrs['aria-label'] = p.label;
    return h('nav', attrs,
      h('div', { className: 'section-subnav__inner' },
        h('ul', { className: 'section-subnav__list' }, list(p.items).map(function (it, i) {
          return h('li', { className: cx('section-subnav__item', it.active && 'is-active'), key: i }, h('a', { href: it.href, 'aria-current': it.active ? 'page' : undefined }, it.label));
        }))));
  }

  /* The logos _sass/_footer.scss has measured ($footer-logos); each key is its cell's modifier,
     site-footer__cell--<key>, which sizes the logo by its ink box. */
  var FOOTER_LOGOS = ['odissei', 'eyra', 'uva', 'ru', 'uu', 'vu', 'tilburg', 'eur'];
  function footerCell(l) {
    if (FOOTER_LOGOS.indexOf(l.key) < 0) {
      throw new Error('SiteFooter: no logo "' + l.key + '" is measured; add it to $footer-logos in _sass/_footer.scss first');
    }
    var img = h('img', { src: l.logo, alt: l.name });
    return h('div', { className: 'site-footer__cell site-footer__cell--' + l.key, key: l.key }, l.href ? h('a', { href: l.href }, img) : img);
  }
  var PROVIDER_LABELS = ['Provided by', 'Supported by'];
  /* _includes/site-footer.html: the labelled provider pair, the partner grid, the copyright line. */
  function SiteFooter(p) {
    var providers = list(p.providers), partners = list(p.partners);
    var attrs = rest(p, ['providers', 'partners', 'copyright', 'className']);
    attrs.className = cx('site-footer', p.className);
    return h('footer', attrs,
      h('div', { className: 'site-footer__inner' },
        providers.length > 0 ? h('div', { className: 'site-footer__providers' }, providers.map(function (l, i) {
          return h('div', { className: 'site-footer__provider', key: i },
            h('p', { className: 'site-footer__label site-footer__label--small' }, l.label || PROVIDER_LABELS[i]),
            footerCell(l));
        })) : null,
        partners.length > 0 ? h('div', { className: 'site-footer__partners' },
          h('p', { className: 'site-footer__label site-footer__label--small' }, 'Project partners'),
          h('div', { className: 'site-footer__grid' }, partners.map(footerCell))) : null,
        h('p', { className: 'site-footer__copyright' }, p.copyright || '© ' + new Date().getFullYear() + ' datadonation.eu')));
  }

  /* Front page --------------------------------------------------------------- */

  /* The band's drawing, from _includes/home/band.html. Rewrite it with tools/build_band_markup.py
     whenever the include changes; the test suite checks that it is current. */
  /* @band-markup:start */
  /* Generated by tools/build_band_markup.py from _includes/home/band.html; do not edit. */
  var BAND_CLIPS = "<defs><clipPath id=\"i\">\n      <path d=\"M230.42,511.23c0,14.14-11.47,25.61-25.61,25.61s-25.61-11.47-25.61-25.61,11.47-35.73,25.61-35.73c20.09,0,25.61,21.59,25.61,35.73Z\" style=\"fill: none;\"/>\n    </clipPath><clipPath id=\"j\">\n      <path d=\"M1119.88,535.46c0,14.14-11.47,25.61-25.61,25.61s-25.61-11.47-25.61-25.61,11.47-35.73,25.61-35.73,25.61,21.59,25.61,35.73Z\" style=\"fill: none;\"/>\n    </clipPath></defs>";
  var BAND_MARKUP = "<i class=\"sky sky--top\"></i><i class=\"sky sky--deep\"></i>\n  <svg class=\"sky sky--step\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\">\n    <path d=\"M0 -2 H102 V100 H100 C50 100 50 0 0 0 Z\" fill=\"#87c5eb\"/>\n    <path d=\"M-100000 0 H0 C50 0 50 100 100 100 H100000\" fill=\"none\" stroke=\"#4272ef\" stroke-width=\"1.5\" vector-effect=\"non-scaling-stroke\"/>\n  </svg>\n\n  <div class=\"hero__thread\" aria-hidden=\"true\"><i></i><b></b><i></i></div>\n\n  <div class=\"hero__net hero__net--l\" aria-hidden=\"true\">\n      <div class=\"story xl\">\n        <div class=\"story__clip story__clip--sky\"><div><svg class=\"story__lines\" viewBox=\"0 0 560 300\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><g transform=\"translate(0 -17.2) scale(1 0.544)\"><path class=\"dot\" d=\"M197.79,119.6h75.94c11.91,0,22.67-7.1,27.36-18.04l9.69-22.6c4.69-10.95,15.45-18.04,27.36-18.04h121.14c20.03,0,34.35,19.39,28.45,38.54l-28.63,88.28c-5.9,19.15,8.42,38.54,28.45,38.54\"/><path d=\"M-60,392.04h267.33c11.8,0,22.48-6.97,27.24-17.76l62.9-130.16c4.76-10.8,15.44-17.76,27.24-17.76h195.29\"/><path d=\"M123.66,226.37H344.07\"/><path d=\"M33.39,392.28c20.03,0,34.35,19.39,28.45,38.54l-16.03,41.65c-5.9,19.15,8.42,38.54,28.45,38.54h126.23\"/><path d=\"M408.52,227.16l-31.81,78.03c-5.9,19.15,8.42,38.54,28.45,38.54h64.84\"/></g><path d=\"M520 105.9 c5.55,0 10.58,3.15 12.76,8.00 l10.48,24.09 c2.18,4.85 7.21,8.00 12.76,8.00\"/></svg><svg class=\"sp cl\" style=\"--x:76.34%;--y:224.0px;\" width=\"2\" height=\"2\" viewBox=\"-1 -1 2 2\" aria-hidden=\"true\"><circle class=\"ring\" r=\"64\"/></svg></div></div>\n        <div class=\"story__clip story__clip--page\"><div><svg class=\"story__lines\" viewBox=\"0 0 560 300\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><g transform=\"translate(0 -17.2) scale(1 0.544)\"><path class=\"dot\" d=\"M197.79,119.6h75.94c11.91,0,22.67-7.1,27.36-18.04l9.69-22.6c4.69-10.95,15.45-18.04,27.36-18.04h121.14c20.03,0,34.35,19.39,28.45,38.54l-28.63,88.28c-5.9,19.15,8.42,38.54,28.45,38.54\"/><path d=\"M-60,392.04h267.33c11.8,0,22.48-6.97,27.24-17.76l62.9-130.16c4.76-10.8,15.44-17.76,27.24-17.76h195.29\"/><path d=\"M123.66,226.37H344.07\"/><path d=\"M33.39,392.28c20.03,0,34.35,19.39,28.45,38.54l-16.03,41.65c-5.9,19.15,8.42,38.54,28.45,38.54h126.23\"/><path d=\"M408.52,227.16l-31.81,78.03c-5.9,19.15,8.42,38.54,28.45,38.54h64.84\"/></g><path d=\"M520 105.9 c5.55,0 10.58,3.15 12.76,8.00 l10.48,24.09 c2.18,4.85 7.21,8.00 12.76,8.00\"/></svg><svg class=\"sp cl\" style=\"--x:76.34%;--y:224.0px;\" width=\"2\" height=\"2\" viewBox=\"-1 -1 2 2\" aria-hidden=\"true\"><circle class=\"ring\" r=\"64\"/></svg></div></div>\n        <svg class=\"sp sp--toggle \" style=\"--x:31.22%;--y:47.3px;\" width=\"27.0\" height=\"15.0\" viewBox=\"152.35 106.04 45.0 25.0\" aria-hidden=\"true\"><g>\n      <rect x=\"153.08\" y=\"106.91\" width=\"43.55\" height=\"23.27\" rx=\"11.63\" ry=\"11.63\" transform=\"translate(349.7 237.08) rotate(-180)\" style=\"fill: #4272ef;\" />\n      <rect x=\"155.79\" y=\"109.35\" width=\"18.6\" height=\"18.6\" rx=\"9.3\" ry=\"9.3\" transform=\"translate(330.17 237.31) rotate(-180)\" style=\"fill: #fff;\" />\n    </g>\n    </svg>\n        <svg class=\"sp \" style=\"--x:72.45%;--y:16.0px;\" width=\"28\" height=\"28\" viewBox=\"-18 -18 36 36\" aria-hidden=\"true\"><circle r=\"17.5\" fill=\"#4272ef\"/><g fill=\"none\" stroke=\"#fff\" stroke-width=\"2.0\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-3.6 -1.4 V-4.8 a3.6 3.6 0 0 1 7.2 0 V-1.4\"/><rect x=\"-6.2\" y=\"-1.4\" width=\"12.4\" height=\"9.8\" rx=\"2\" fill=\"#fff\"/><circle cx=\"0\" cy=\"3.4\" r=\"1.5\" fill=\"#4272ef\" stroke=\"none\"/></g></svg>\n        <i class=\"nd \" style=\"--x:37.86%;--y:105.9px;\"></i>\n        <svg class=\"sp \" style=\"--x:calc(22.08% - 4px);--y:105.9px;\" width=\"42\" height=\"42\" viewBox=\"-18 -18 36 36\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#4272ef\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"-7\" y=\"-13\" width=\"14\" height=\"26\" rx=\"3.6\" fill=\"#fff\"/><path d=\"M-2 8.6 H2\"/></g></svg>\n        <svg class=\"sp sp--bars \" style=\"--x:63.42%;--y:105.9px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1594.89 148.96 66 66\" aria-hidden=\"true\"><circle cx=\"1627.89\" cy=\"181.96\" r=\"32.68\" style=\"fill: #fff; opacity: .1;\" />\n    <g>\n      <rect x=\"1607.37\" y=\"186.88\" width=\"8.57\" height=\"9.01\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n      <rect x=\"1617.05\" y=\"179\" width=\"8.57\" height=\"16.89\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n      <rect x=\"1626.73\" y=\"164.84\" width=\"8.57\" height=\"31.06\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n      <rect x=\"1636.41\" y=\"167.38\" width=\"8.57\" height=\"28.51\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n    </g>\n    </svg>\n        <i class=\"nd \" style=\"--x:73.05%;--y:105.9px;\"></i>\n        <i class=\"nd \" style=\"--x:90.64%;--y:105.9px;\"></i>\n        <i class=\"nd nd--yellow\" style=\"--x:10.18%;--y:224.0px;\"></i>\n        <svg class=\"sp sp--pin \" style=\"--x:10.18%;--y:213.0px;\" width=\"16.8\" height=\"20.4\" viewBox=\"763.04 51.00 28 34\" aria-hidden=\"true\"><path d=\"M790.62,65.45c0,9.41-13.58,19.19-13.58,19.19,0,0-13.58-9.93-13.58-19.19,0-7.5,6.08-14.02,13.58-14.02s13.58,6.52,13.58,14.02Z\" style=\"fill: #4272ef;\" />\n    </svg>\n        <svg class=\"sp sp--avatar-m-sky \" style=\"--x:36.58%;--y:260.8px;\" width=\"39.6\" height=\"39.6\" viewBox=\"171.87 477.88 66 66\" aria-hidden=\"true\"><circle cx=\"204.87\" cy=\"510.88\" r=\"32.68\" style=\"fill: #87c5eb;\" />\n    <g>\n      <circle cx=\"204.81\" cy=\"511.23\" r=\"25.61\" style=\"fill: #f15f60;\" />\n      <g style=\"clip-path: url(#i);\">\n        <g>\n          <path d=\"M216.5,505.24c1.59-.95,3.5-.32,3.61-2.23s.42-3.39.74-5.41c.32-2.02.42-4.45.11-5.94-.32-1.48-5.09-2.02-5.41-2.12s.95,15.7.95,15.7Z\" style=\"fill: #36354a;\" />\n          <path d=\"M213.74,505.07c-.92,3.39-4.17,12.8,2.33,15.98l3.32,9.83h-28.78s3.32-15.34,3.32-15.34c0,0,5.51-.57,7.35-4.95s.64-9.26.64-9.26l3.61-.6c2.96-.49,5.93.82,7.55,3.34l.65,1.01Z\" style=\"fill: #ffd1d2;\" />\n          <path d=\"M198.89,501.36c0,7.46,5.08,13.5,8.84,13.5s8.84-6.05,8.84-13.5c0-7.46-1.45-13.5-8.84-13.5-7.14,0-8.84,6.05-8.84,13.5Z\" style=\"fill: #36354a; opacity: .24;\" />\n          <path d=\"M197.41,499.34c0,7.46,5.94,13.5,10.32,13.5,4.38,0,10.32-6.05,10.32-13.5s-1.7-13.5-10.32-13.5c-8.34,0-10.32,6.05-10.32,13.5Z\" style=\"fill: #ffd1d2;\" />\n          <path d=\"M217.88,496.02c0-6.87-3.3-11.65-10.3-11.65-6.99,0-11.55,9.02-11.55,15.89l5.12-3.85,11,.67,5.73-1.06Z\" style=\"fill: #36354a; opacity: .24;\" />\n          <path d=\"M219.46,495.01c0-6.46-5.33-11.7-11.9-11.7-6.57,0-11.9,5.24-11.9,11.7h13.82s.23-2.58.23-2.58l1.05,2.58h1.39s.52-4.27.52-4.27l1.51,4.27h5.28Z\" style=\"fill: #36354a;\" />\n          <polygon points=\"198.04 516.38 213.74 519.45 212.54 537.02 198.61 536.95 198.04 516.38\" style=\"fill: #4272ef;\" />\n          <path d=\"M178.03,536.74c.78-4.24,1.06-16.47,4.6-17.82,3.54-1.34,13.4-3.43,16.69-5.73l4.03,9.01-1.34,14.71,8.03-.07,1.05-12.3,1.27-8.7c1.24,2.65,11.42,6.82,13.68,10.99,2.26,4.17,3.25,10.18,3.25,10.18l-51.26-.28Z\" style=\"fill: #36354a;\" />\n          <path d=\"M201.44,481.91c-2.64.93-1.59,1.27-4.77,3.71-3.18,2.44-4.24,6.47-3.29,9.23.95,2.76.53,7.21,2.44,8.59,1.31.95,2.86,1.8,2.86,1.8l-1.38-7.11,5.09-3.92,10.08-5.09,3.61,1.17s.03,4.24,4.95,5.02c1.01.16.09-2.29.73-4.37.64-2.08-1.07-5.25-3.77-6.73-5.55-3.05-12.62-3.68-16.54-2.3Z\" style=\"fill: #36354a;\" />\n        </g>\n      </g>\n    </g>\n    </svg>\n        <svg class=\"sp sp--funnel \" style=\"--x:76.34%;--y:224.0px;\" width=\"39.6\" height=\"39.6\" viewBox=\"394.56 393.56 66 66\" aria-hidden=\"true\"><circle cx=\"427.56\" cy=\"426.56\" r=\"32.42\" style=\"fill: #4272ef;\" />\n    <path d=\"M444.21,420.1h-33.29c-2,0-2.99,2.24-1.58,3.54l11.18,10.36c1.26,1.16,1.96,2.74,1.96,4.39v.79c0,.59.52,1.07,1.15,1.07h7.87c.64,0,1.15-.48,1.15-1.07v-.79c0-1.65.71-3.23,1.96-4.39l11.18-10.36c1.41-1.31.41-3.54-1.58-3.54Z\" style=\"fill: #fff;\" />\n    </svg>\n        <svg class=\"sp sp--check \" style=\"--x:calc(76.34% + 34.0px);--y:169.8px;\" width=\"25.8\" height=\"25.8\" viewBox=\"500.73 322.12 43.0 43.0\" aria-hidden=\"true\"><circle cx=\"522.23\" cy=\"343.62\" r=\"20.94\" style=\"fill: #fff;\" />\n    <g>\n      <rect x=\"524.71\" y=\"336.34\" width=\"1.22\" height=\"17.62\" transform=\"translate(397.92 -270.36) rotate(45)\" style=\"fill: #4272ef;\" />\n      <rect x=\"516.12\" y=\"343.69\" width=\"1.22\" height=\"8.94\" transform=\"translate(-94.84 467.35) rotate(-45)\" style=\"fill: #4272ef;\" />\n    </g>\n    </svg>\n      </div>\n      <div class=\"midnet lt-xl desk\"><svg class=\"story__lines\" style=\"height:276px\" viewBox=\"0 0 100 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M12 80 H62 c5.40,0 10.29,5.19 12.41,13.17 l10.19,39.65 c2.12,7.98 7.01,13.17 12.41,13.17\"/></svg></div>\n      <svg class=\"sp lt-xl desk\" style=\"--x:12%;--y:80px;\" width=\"40\" height=\"40\" viewBox=\"-18 -18 36 36\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#4272ef\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"-7\" y=\"-13\" width=\"14\" height=\"26\" rx=\"3.6\" fill=\"#fff\"/><path d=\"M-2 8.6 H2\"/></g></svg>\n      <i class=\"nd lt-xl desk\" style=\"--x:40%;--y:80px;\"></i>\n      <svg class=\"sp sp--avatar-m lt-xl\" style=\"--x:12%;--y:146px;--tx:22%;--ty:146px;\" width=\"39.6\" height=\"39.6\" viewBox=\"171.87 477.88 66 66\" aria-hidden=\"true\"><circle cx=\"204.87\" cy=\"510.88\" r=\"32.68\" style=\"fill: #fff;\" />\n    <g>\n      <circle cx=\"204.81\" cy=\"511.23\" r=\"25.61\" style=\"fill: #f15f60;\" />\n      <g style=\"clip-path: url(#i);\">\n        <g>\n          <path d=\"M216.5,505.24c1.59-.95,3.5-.32,3.61-2.23s.42-3.39.74-5.41c.32-2.02.42-4.45.11-5.94-.32-1.48-5.09-2.02-5.41-2.12s.95,15.7.95,15.7Z\" style=\"fill: #36354a;\" />\n          <path d=\"M213.74,505.07c-.92,3.39-4.17,12.8,2.33,15.98l3.32,9.83h-28.78s3.32-15.34,3.32-15.34c0,0,5.51-.57,7.35-4.95s.64-9.26.64-9.26l3.61-.6c2.96-.49,5.93.82,7.55,3.34l.65,1.01Z\" style=\"fill: #ffd1d2;\" />\n          <path d=\"M198.89,501.36c0,7.46,5.08,13.5,8.84,13.5s8.84-6.05,8.84-13.5c0-7.46-1.45-13.5-8.84-13.5-7.14,0-8.84,6.05-8.84,13.5Z\" style=\"fill: #36354a; opacity: .24;\" />\n          <path d=\"M197.41,499.34c0,7.46,5.94,13.5,10.32,13.5,4.38,0,10.32-6.05,10.32-13.5s-1.7-13.5-10.32-13.5c-8.34,0-10.32,6.05-10.32,13.5Z\" style=\"fill: #ffd1d2;\" />\n          <path d=\"M217.88,496.02c0-6.87-3.3-11.65-10.3-11.65-6.99,0-11.55,9.02-11.55,15.89l5.12-3.85,11,.67,5.73-1.06Z\" style=\"fill: #36354a; opacity: .24;\" />\n          <path d=\"M219.46,495.01c0-6.46-5.33-11.7-11.9-11.7-6.57,0-11.9,5.24-11.9,11.7h13.82s.23-2.58.23-2.58l1.05,2.58h1.39s.52-4.27.52-4.27l1.51,4.27h5.28Z\" style=\"fill: #36354a;\" />\n          <polygon points=\"198.04 516.38 213.74 519.45 212.54 537.02 198.61 536.95 198.04 516.38\" style=\"fill: #4272ef;\" />\n          <path d=\"M178.03,536.74c.78-4.24,1.06-16.47,4.6-17.82,3.54-1.34,13.4-3.43,16.69-5.73l4.03,9.01-1.34,14.71,8.03-.07,1.05-12.3,1.27-8.7c1.24,2.65,11.42,6.82,13.68,10.99,2.26,4.17,3.25,10.18,3.25,10.18l-51.26-.28Z\" style=\"fill: #36354a;\" />\n          <path d=\"M201.44,481.91c-2.64.93-1.59,1.27-4.77,3.71-3.18,2.44-4.24,6.47-3.29,9.23.95,2.76.53,7.21,2.44,8.59,1.31.95,2.86,1.8,2.86,1.8l-1.38-7.11,5.09-3.92,10.08-5.09,3.61,1.17s.03,4.24,4.95,5.02c1.01.16.09-2.29.73-4.37.64-2.08-1.07-5.25-3.77-6.73-5.55-3.05-12.62-3.68-16.54-2.3Z\" style=\"fill: #36354a;\" />\n        </g>\n      </g>\n    </g>\n    </svg>\n      <svg class=\"sp sp--funnel lt-xl\" style=\"--x:46%;--y:146px;--tx:72%;--ty:146px;\" width=\"39.6\" height=\"39.6\" viewBox=\"394.56 393.56 66 66\" aria-hidden=\"true\"><circle cx=\"427.56\" cy=\"426.56\" r=\"32.42\" style=\"fill: #4272ef;\" />\n    <path d=\"M444.21,420.1h-33.29c-2,0-2.99,2.24-1.58,3.54l11.18,10.36c1.26,1.16,1.96,2.74,1.96,4.39v.79c0,.59.52,1.07,1.15,1.07h7.87c.64,0,1.15-.48,1.15-1.07v-.79c0-1.65.71-3.23,1.96-4.39l11.18-10.36c1.41-1.31.41-3.54-1.58-3.54Z\" style=\"fill: #fff;\" />\n    </svg>\n  </div>\n  <div class=\"hero__net hero__net--r\" aria-hidden=\"true\">\n      <div class=\"rstory xl\">\n        <svg class=\"story__lines\" viewBox=\"0 0 100 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><g transform=\"translate(225.925 293.21) scale(-0.13326 -0.5)\"><path class=\"dot\" d=\"M1127.72,535.93h90.3c11.91,0,22.67-7.1,27.36-18.04l22.45-54.3c4.69-10.95,15.45-18.04,27.36-18.04h76.16\"/><path d=\"M867.63,601.87l7.11-14.92c14.84-31.16,46.28-51.02,80.8-51.02h167.31\"/></g></svg>\n        <svg class=\"story__lines\" style=\"left:max(248px, 55%);width:2px;height:276px\" viewBox=\"0 0 2 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M-116 195.0 L-76 135.5 c3.76,-10.3 12.43,-17 22,-17\"/></svg>\n        <i class=\"hl \" style=\"left:calc(max(248px, 55%) - 54px);right:calc(20% + 58px);--y:118.5px\"></i>\n        <svg class=\"story__lines\" style=\"left:80%;width:2px;height:276px\" viewBox=\"0 0 2 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M-58 118.5 c9.57,0 18.24,-6.7 22,-17 L0 26\"/></svg>\n        <svg class=\"sp front\" style=\"--x:calc(max(248px, 55%) - 116px);--y:195.0px;\" width=\"52\" height=\"52\" viewBox=\"-18 -18 36 36\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"#4272ef\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M0 -8.6 L7 -5.9 V-0.8 C7 3.9 3.9 7.2 0 8.6 C-3.9 7.2 -7 3.9 -7 -0.8 V-5.9 Z\" fill=\"#fff\"/><path d=\"M-3.1 0 L-0.8 2.3 L3.4 -2.3\"/></g></svg>\n        <i class=\"nd \" style=\"--x:49px;--y:225.0px;\"></i>\n        <i class=\"nd \" style=\"--x:calc((max(248px, 55%) + 80% - 112px) / 2);--y:118.5px;\"></i>\n        <svg class=\"story__lines\" style=\"width:2px;height:276px\" viewBox=\"0 0 2 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M-30 146 H-28 c6.79,0 12.93,6.21 15.60,15.77 l12.80,47.46 c2.67,9.56 8.81,15.77 15.60,15.77\"/></svg>\n        <i class=\"hl \" style=\"left:16px;right:calc(100% - max(248px, 55%) + 182px);--y:225.0px\"></i>\n        <svg class=\"sp sp--music \" style=\"--x:43.18%;--y:70.4px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1617.34 450.19 66 66\" aria-hidden=\"true\"><circle cx=\"1650.34\" cy=\"483.19\" r=\"32.68\" style=\"fill: #4272ef;\" />\n    <g>\n      <rect x=\"1649.25\" y=\"471.16\" width=\"2.97\" height=\"21.18\" style=\"fill: #fff;\" />\n      <polygon points=\"1658.56 474.13 1649.25 479.31 1649.25 471.57 1658.56 466.39 1658.56 474.13\" style=\"fill: #fff;\" />\n      <ellipse cx=\"1645.82\" cy=\"491.92\" rx=\"6.4\" ry=\"4.66\" style=\"fill: #fff;\" />\n    </g>\n    </svg>\n        <i class=\"nd \" style=\"--x:94.13%;--y:25.2px;\"></i>\n        <svg class=\"sp sp--avatar-f \" style=\"--x:80.00%;--y:26.0px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1062.05 501.42 66 66\" aria-hidden=\"true\"><circle cx=\"1095.05\" cy=\"534.42\" r=\"32.68\" style=\"fill: #fff;\" />\n    <g>\n      <circle cx=\"1094.27\" cy=\"535.46\" r=\"25.61\" style=\"fill: #4272ef;\" />\n      <g style=\"clip-path: url(#j);\">\n        <g>\n          <g>\n            <path d=\"M1094.58,534.9c.85,0,.37,1.42,1.12,1.39,14.83-.58,14.9-8.93,12.74-19.16-1.59-7.56-6.14-10.19-13.86-10.19h-.09c-7.72,0-13.22,6.67-14.82,14.22-2.27,10.76-2.63,13.74,14.82,13.74h.09Z\" style=\"fill: #36354a;\" />\n            <path d=\"M1088.63,529.41c.84,3.09,3.8,11.64-2.12,14.54l-3.02,8.94h26.18l-6.76-12.69s-2.89.81-3.37-5.69c-.32-4.31-.16-8.5-.16-8.5l-3.28-.55c-2.69-.45-5.39.75-6.87,3.04l-.59.92Z\" style=\"fill: #ffd1d2;\" />\n            <path d=\"M1102.14,526.03c0,6.79-6.48,13.94-9.9,13.94-.49,0-1.88-1.1-2.3-1.34l.16-2.16s-2.72-22.73,4-22.73,8.04,5.5,8.04,12.29Z\" style=\"fill: #36354a; opacity: .24;\" />\n            <path d=\"M1103.49,524.2c0,6.79-7.23,12.31-12.98,12.31-2.03,0-5.8-5.53-5.8-12.31s1.54-12.29,9.39-12.29,9.39,5.5,9.39,12.29Z\" style=\"fill: #ffd1d2;\" />\n            <path d=\"M1081.17,520.27c0-7.16,6.1-12.09,13.38-12.09s13.15,6.05,13.15,13.2l-5.29,6.03-1.93-2.3-.43.25c-1.02.56-2.22-.87-2.91-1.8l-1.6-2.5-5.76.35-8.62-1.14Z\" style=\"fill: #36354a; opacity: .24;\" />\n            <path d=\"M1081.37,519.86c0-7.16,5.9-12.96,13.19-12.96s13.19,5.8,13.19,12.96h-15.31l-.26-2.86-1.16,2.86h-1.54l-.58-4.73-1.67,4.73h-5.85Z\" style=\"fill: #36354a;\" />\n            <path d=\"M1119.36,565.54c-1.83-13.07.88-15.51.47-21.6-.5-7.52-9.01-4.3-16.93-3.75l-12.64,9.39-3.11-6.15s-7.65,1.99-9.71,5.79-3.57,16.24-3.57,16.24l45.49.09Z\" style=\"fill: #ff5e5e;\" />\n          </g>\n          <path d=\"M1095.3,518.33s2.89,7.41,4.76,6.01c.45-.34,1.18-.96,1.84.3,1,1.92.12,2.58,0,3.27-.13.76-.09,1.73-1.01,1.63l-1.47,3.06,7.33-.68-2.48-15.65-8.97,1.85v.2Z\" style=\"fill: #36354a;\" />\n          <polygon points=\"1099.72 523.25 1103.36 527.34 1106.14 527.02 1106.8 522.46 1101.31 521.56 1099.72 523.25\" style=\"fill: #36354a;\" />\n        </g>\n      </g>\n    </g>\n    </svg>\n        <div class=\"rpart2\">\n          <svg class=\"story__lines\" style=\"width:2px;height:276px\" viewBox=\"0 0 2 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M-182 225.0 c7.40,0 14.11,-2.36 17.02,-5.99 l13.97,-18.02 c2.91,-3.63 9.61,-5.99 17.02,-5.99 H-6 L0 196.0\"/></svg>\n          <i class=\"hl \" style=\"left:0px;right:39px;--y:196.0px\"></i>\n          <svg class=\"story__lines\" style=\"left:100%;width:2px;height:276px\" viewBox=\"0 0 2 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M-40 196.0 c5.24,0 9.99,3.15 12.05,7.98 l9.89,24.03 c2.06,4.84 6.81,7.98 12.05,7.98 H0\"/></svg>\n          <svg class=\"sp sp--globe \" style=\"--x:100%;--y:236px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1277.08 200.03 66 66\" aria-hidden=\"true\"><circle cx=\"1310.08\" cy=\"233.03\" r=\"32.42\" style=\"fill: #fff;\" />\n  <g>\n      <path d=\"M1322.14,244.04c-6.26,6.86-16.98,7.11-23.56.57-6.03-6-6.44-15.63-.96-22.11,3.14-3.72,7.77-5.84,12.64-5.79,4.2.04,8.21,1.7,11.21,4.62,6.32,6.15,6.61,16.21.68,22.71ZM1313.57,223.81c-.43-1.82-1-3.75-2.07-5.2-.56-.69-1.3-1.16-2.09-.67-.37.23-.65.55-.91.9-.96,1.44-1.49,3.23-1.91,4.97h6.98ZM1305.54,223.81c.26-1.17.56-2.25.98-3.33.33-.85.72-1.6,1.25-2.38-1.34.41-2.43,1.16-3.43,2.06-1.11,1.05-2.01,2.28-2.72,3.64h3.91ZM1318.53,223.81c-1.3-2.49-3.38-4.82-6.15-5.71,1.2,1.74,1.78,3.69,2.24,5.71h3.91ZM1301.56,221.92c.74-1.14,1.61-2.09,2.63-3-2.52,1.04-4.65,2.71-6.31,4.88h2.61c.33-.68.66-1.27,1.07-1.89ZM1316.05,218.95c-.06,0-.08,0-.01.05v-.05ZM1316.11,218.97l-.03.06c1.56,1.33,2.71,2.96,3.62,4.79h2.59c-1.64-2.18-3.76-3.8-6.17-4.85ZM1298.46,232.52c.06-2.67.55-5.21,1.56-7.68h-2.85c-1.46,2.31-2.28,4.92-2.37,7.68h3.67ZM1304.64,232.52c.03-2.65.24-5.13.7-7.68h-4.2c-.48,1.09-.83,2.17-1.11,3.32-.33,1.44-.51,2.86-.55,4.37h5.15ZM1314.51,232.52c-.03-2.66-.24-5.18-.72-7.69h-7.41c-.48,2.57-.69,5.08-.72,7.69h8.86ZM1320.3,228.94c-.28-1.44-.69-2.79-1.27-4.11h-4.2c.47,2.57.67,5.08.7,7.69h5.15c-.03-1.23-.15-2.37-.38-3.58ZM1325.37,232.52c-.1-2.8-.92-5.39-2.38-7.68h-2.85c1.01,2.48,1.49,5.02,1.56,7.69h3.67ZM1300.02,241.22c-1-2.46-1.49-5-1.55-7.68h-3.67c.1,2.78.91,5.38,2.38,7.69h2.85ZM1305.33,241.23c-.47-2.6-.67-5.1-.7-7.69h-5.15c.03,1.31.17,2.57.43,3.85.27,1.32.66,2.56,1.21,3.84h4.2ZM1313.79,241.23c.48-2.6.69-5.12.71-7.69h-8.85c.03,2.6.24,5.16.72,7.69h7.42ZM1320.22,237.54c.28-1.33.44-2.64.46-4h-5.15c-.03,2.63-.24,5.14-.7,7.69h4.21c.53-1.22.91-2.42,1.18-3.69ZM1323,241.23c1.48-2.34,2.28-4.96,2.37-7.69h-3.67c-.07,2.65-.55,5.22-1.56,7.69h2.85ZM1302.58,245.51c-.84-1-1.52-2.07-2.1-3.27h-2.6c1.63,2.14,3.75,3.83,6.26,4.87-.55-.56-1.08-1.02-1.56-1.6ZM1306.6,245.75c-.47-1.15-.78-2.3-1.05-3.51h-3.91c.72,1.37,1.61,2.6,2.73,3.65.99.91,2.09,1.64,3.42,2.06-.48-.72-.86-1.4-1.18-2.2ZM1311.83,246.98c.85-1.43,1.36-3.1,1.73-4.73h-6.97c.39,1.67.9,3.38,1.8,4.83.26.38.54.72.91.99,1,.71,1.93-.14,2.52-1.09ZM1315.82,245.89c1.12-1.06,2-2.28,2.72-3.64h-3.91c-.28,1.27-.63,2.49-1.12,3.68-.31.72-.66,1.37-1.12,2.03,1.33-.42,2.43-1.15,3.44-2.07ZM1316.01,247.12c2.51-1.04,4.64-2.72,6.27-4.87h-2.59c-.39.74-.78,1.45-1.26,2.14-.68,1.02-1.5,1.86-2.42,2.73Z\" style=\"fill: #4272ef;\" />\n    </g>\n    </svg>\n          <svg class=\"sp sp--bars anchor\" style=\"--x:0%;--y:196.0px;\" width=\"36.4\" height=\"36.4\" viewBox=\"1594.89 148.96 66 66\" aria-hidden=\"true\"><circle cx=\"1627.89\" cy=\"181.96\" r=\"32.68\" style=\"fill: #fff; opacity: .1;\" />\n    <g>\n      <rect x=\"1607.37\" y=\"186.88\" width=\"8.57\" height=\"9.01\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n      <rect x=\"1617.05\" y=\"179\" width=\"8.57\" height=\"16.89\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n      <rect x=\"1626.73\" y=\"164.84\" width=\"8.57\" height=\"31.06\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n      <rect x=\"1636.41\" y=\"167.38\" width=\"8.57\" height=\"28.51\" rx=\"4.28\" ry=\"4.28\" style=\"fill: #4272ef;\" />\n    </g>\n    </svg>\n        </div>\n      </div>\n      <div class=\"midnet lt-xl desk\"><svg class=\"story__lines\" style=\"left:0;width:2px;height:276px\" viewBox=\"0 0 2 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M-30 146 H-28 c6.79,0 12.93,5.35 15.60,13.57 l12.80,40.85 c2.67,8.23 8.81,13.57 15.60,13.57\"/></svg><svg class=\"story__lines\" style=\"height:276px\" viewBox=\"0 0 100 276\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path class=\"dot\" d=\"M14 104 H26 c3.39,0 6.47,-2.83 7.80,-7.19 l6.40,-21.63 c1.33,-4.35 4.41,-7.19 7.80,-7.19 H62\"/><path d=\"M62 68 H104\"/></svg></div>\n      <i class=\"hl lt-xl desk\" style=\"left:16px;right:22%;--y:214px\"></i>\n      <i class=\"nd lt-xl desk\" style=\"--x:14%;--y:104px;\"></i>\n      <i class=\"nd lt-xl desk\" style=\"--x:88%;--y:68px;\"></i>\n      <svg class=\"sp sp--globe lt-xl desk\" style=\"--x:78%;--y:214px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1277.08 200.03 66 66\" aria-hidden=\"true\"><circle cx=\"1310.08\" cy=\"233.03\" r=\"32.42\" style=\"fill: #fff;\" />\n  <g>\n      <path d=\"M1322.14,244.04c-6.26,6.86-16.98,7.11-23.56.57-6.03-6-6.44-15.63-.96-22.11,3.14-3.72,7.77-5.84,12.64-5.79,4.2.04,8.21,1.7,11.21,4.62,6.32,6.15,6.61,16.21.68,22.71ZM1313.57,223.81c-.43-1.82-1-3.75-2.07-5.2-.56-.69-1.3-1.16-2.09-.67-.37.23-.65.55-.91.9-.96,1.44-1.49,3.23-1.91,4.97h6.98ZM1305.54,223.81c.26-1.17.56-2.25.98-3.33.33-.85.72-1.6,1.25-2.38-1.34.41-2.43,1.16-3.43,2.06-1.11,1.05-2.01,2.28-2.72,3.64h3.91ZM1318.53,223.81c-1.3-2.49-3.38-4.82-6.15-5.71,1.2,1.74,1.78,3.69,2.24,5.71h3.91ZM1301.56,221.92c.74-1.14,1.61-2.09,2.63-3-2.52,1.04-4.65,2.71-6.31,4.88h2.61c.33-.68.66-1.27,1.07-1.89ZM1316.05,218.95c-.06,0-.08,0-.01.05v-.05ZM1316.11,218.97l-.03.06c1.56,1.33,2.71,2.96,3.62,4.79h2.59c-1.64-2.18-3.76-3.8-6.17-4.85ZM1298.46,232.52c.06-2.67.55-5.21,1.56-7.68h-2.85c-1.46,2.31-2.28,4.92-2.37,7.68h3.67ZM1304.64,232.52c.03-2.65.24-5.13.7-7.68h-4.2c-.48,1.09-.83,2.17-1.11,3.32-.33,1.44-.51,2.86-.55,4.37h5.15ZM1314.51,232.52c-.03-2.66-.24-5.18-.72-7.69h-7.41c-.48,2.57-.69,5.08-.72,7.69h8.86ZM1320.3,228.94c-.28-1.44-.69-2.79-1.27-4.11h-4.2c.47,2.57.67,5.08.7,7.69h5.15c-.03-1.23-.15-2.37-.38-3.58ZM1325.37,232.52c-.1-2.8-.92-5.39-2.38-7.68h-2.85c1.01,2.48,1.49,5.02,1.56,7.69h3.67ZM1300.02,241.22c-1-2.46-1.49-5-1.55-7.68h-3.67c.1,2.78.91,5.38,2.38,7.69h2.85ZM1305.33,241.23c-.47-2.6-.67-5.1-.7-7.69h-5.15c.03,1.31.17,2.57.43,3.85.27,1.32.66,2.56,1.21,3.84h4.2ZM1313.79,241.23c.48-2.6.69-5.12.71-7.69h-8.85c.03,2.6.24,5.16.72,7.69h7.42ZM1320.22,237.54c.28-1.33.44-2.64.46-4h-5.15c-.03,2.63-.24,5.14-.7,7.69h4.21c.53-1.22.91-2.42,1.18-3.69ZM1323,241.23c1.48-2.34,2.28-4.96,2.37-7.69h-3.67c-.07,2.65-.55,5.22-1.56,7.69h2.85ZM1302.58,245.51c-.84-1-1.52-2.07-2.1-3.27h-2.6c1.63,2.14,3.75,3.83,6.26,4.87-.55-.56-1.08-1.02-1.56-1.6ZM1306.6,245.75c-.47-1.15-.78-2.3-1.05-3.51h-3.91c.72,1.37,1.61,2.6,2.73,3.65.99.91,2.09,1.64,3.42,2.06-.48-.72-.86-1.4-1.18-2.2ZM1311.83,246.98c.85-1.43,1.36-3.1,1.73-4.73h-6.97c.39,1.67.9,3.38,1.8,4.83.26.38.54.72.91.99,1,.71,1.93-.14,2.52-1.09ZM1315.82,245.89c1.12-1.06,2-2.28,2.72-3.64h-3.91c-.28,1.27-.63,2.49-1.12,3.68-.31.72-.66,1.37-1.12,2.03,1.33-.42,2.43-1.15,3.44-2.07ZM1316.01,247.12c2.51-1.04,4.64-2.72,6.27-4.87h-2.59c-.39.74-.78,1.45-1.26,2.14-.68,1.02-1.5,1.86-2.42,2.73Z\" style=\"fill: #4272ef;\" />\n    </g>\n    </svg>\n      <svg class=\"sp sp--avatar-f lt-xl\" style=\"--x:62%;--y:68px;--tx:32%;--ty:146px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1062.05 501.42 66 66\" aria-hidden=\"true\"><circle cx=\"1095.05\" cy=\"534.42\" r=\"32.68\" style=\"fill: #fff;\" />\n    <g>\n      <circle cx=\"1094.27\" cy=\"535.46\" r=\"25.61\" style=\"fill: #4272ef;\" />\n      <g style=\"clip-path: url(#j);\">\n        <g>\n          <g>\n            <path d=\"M1094.58,534.9c.85,0,.37,1.42,1.12,1.39,14.83-.58,14.9-8.93,12.74-19.16-1.59-7.56-6.14-10.19-13.86-10.19h-.09c-7.72,0-13.22,6.67-14.82,14.22-2.27,10.76-2.63,13.74,14.82,13.74h.09Z\" style=\"fill: #36354a;\" />\n            <path d=\"M1088.63,529.41c.84,3.09,3.8,11.64-2.12,14.54l-3.02,8.94h26.18l-6.76-12.69s-2.89.81-3.37-5.69c-.32-4.31-.16-8.5-.16-8.5l-3.28-.55c-2.69-.45-5.39.75-6.87,3.04l-.59.92Z\" style=\"fill: #ffd1d2;\" />\n            <path d=\"M1102.14,526.03c0,6.79-6.48,13.94-9.9,13.94-.49,0-1.88-1.1-2.3-1.34l.16-2.16s-2.72-22.73,4-22.73,8.04,5.5,8.04,12.29Z\" style=\"fill: #36354a; opacity: .24;\" />\n            <path d=\"M1103.49,524.2c0,6.79-7.23,12.31-12.98,12.31-2.03,0-5.8-5.53-5.8-12.31s1.54-12.29,9.39-12.29,9.39,5.5,9.39,12.29Z\" style=\"fill: #ffd1d2;\" />\n            <path d=\"M1081.17,520.27c0-7.16,6.1-12.09,13.38-12.09s13.15,6.05,13.15,13.2l-5.29,6.03-1.93-2.3-.43.25c-1.02.56-2.22-.87-2.91-1.8l-1.6-2.5-5.76.35-8.62-1.14Z\" style=\"fill: #36354a; opacity: .24;\" />\n            <path d=\"M1081.37,519.86c0-7.16,5.9-12.96,13.19-12.96s13.19,5.8,13.19,12.96h-15.31l-.26-2.86-1.16,2.86h-1.54l-.58-4.73-1.67,4.73h-5.85Z\" style=\"fill: #36354a;\" />\n            <path d=\"M1119.36,565.54c-1.83-13.07.88-15.51.47-21.6-.5-7.52-9.01-4.3-16.93-3.75l-12.64,9.39-3.11-6.15s-7.65,1.99-9.71,5.79-3.57,16.24-3.57,16.24l45.49.09Z\" style=\"fill: #ff5e5e;\" />\n          </g>\n          <path d=\"M1095.3,518.33s2.89,7.41,4.76,6.01c.45-.34,1.18-.96,1.84.3,1,1.92.12,2.58,0,3.27-.13.76-.09,1.73-1.01,1.63l-1.47,3.06,7.33-.68-2.48-15.65-8.97,1.85v.2Z\" style=\"fill: #36354a;\" />\n          <polygon points=\"1099.72 523.25 1103.36 527.34 1106.14 527.02 1106.8 522.46 1101.31 521.56 1099.72 523.25\" style=\"fill: #36354a;\" />\n        </g>\n      </g>\n    </g>\n    </svg>\n      <svg class=\"sp sp--globe lt-xl tab-only\" style=\"--x:75%;--y:146px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1277.08 200.03 66 66\" aria-hidden=\"true\"><circle cx=\"1310.08\" cy=\"233.03\" r=\"32.42\" style=\"fill: #fff;\" />\n  <g>\n      <path d=\"M1322.14,244.04c-6.26,6.86-16.98,7.11-23.56.57-6.03-6-6.44-15.63-.96-22.11,3.14-3.72,7.77-5.84,12.64-5.79,4.2.04,8.21,1.7,11.21,4.62,6.32,6.15,6.61,16.21.68,22.71ZM1313.57,223.81c-.43-1.82-1-3.75-2.07-5.2-.56-.69-1.3-1.16-2.09-.67-.37.23-.65.55-.91.9-.96,1.44-1.49,3.23-1.91,4.97h6.98ZM1305.54,223.81c.26-1.17.56-2.25.98-3.33.33-.85.72-1.6,1.25-2.38-1.34.41-2.43,1.16-3.43,2.06-1.11,1.05-2.01,2.28-2.72,3.64h3.91ZM1318.53,223.81c-1.3-2.49-3.38-4.82-6.15-5.71,1.2,1.74,1.78,3.69,2.24,5.71h3.91ZM1301.56,221.92c.74-1.14,1.61-2.09,2.63-3-2.52,1.04-4.65,2.71-6.31,4.88h2.61c.33-.68.66-1.27,1.07-1.89ZM1316.05,218.95c-.06,0-.08,0-.01.05v-.05ZM1316.11,218.97l-.03.06c1.56,1.33,2.71,2.96,3.62,4.79h2.59c-1.64-2.18-3.76-3.8-6.17-4.85ZM1298.46,232.52c.06-2.67.55-5.21,1.56-7.68h-2.85c-1.46,2.31-2.28,4.92-2.37,7.68h3.67ZM1304.64,232.52c.03-2.65.24-5.13.7-7.68h-4.2c-.48,1.09-.83,2.17-1.11,3.32-.33,1.44-.51,2.86-.55,4.37h5.15ZM1314.51,232.52c-.03-2.66-.24-5.18-.72-7.69h-7.41c-.48,2.57-.69,5.08-.72,7.69h8.86ZM1320.3,228.94c-.28-1.44-.69-2.79-1.27-4.11h-4.2c.47,2.57.67,5.08.7,7.69h5.15c-.03-1.23-.15-2.37-.38-3.58ZM1325.37,232.52c-.1-2.8-.92-5.39-2.38-7.68h-2.85c1.01,2.48,1.49,5.02,1.56,7.69h3.67ZM1300.02,241.22c-1-2.46-1.49-5-1.55-7.68h-3.67c.1,2.78.91,5.38,2.38,7.69h2.85ZM1305.33,241.23c-.47-2.6-.67-5.1-.7-7.69h-5.15c.03,1.31.17,2.57.43,3.85.27,1.32.66,2.56,1.21,3.84h4.2ZM1313.79,241.23c.48-2.6.69-5.12.71-7.69h-8.85c.03,2.6.24,5.16.72,7.69h7.42ZM1320.22,237.54c.28-1.33.44-2.64.46-4h-5.15c-.03,2.63-.24,5.14-.7,7.69h4.21c.53-1.22.91-2.42,1.18-3.69ZM1323,241.23c1.48-2.34,2.28-4.96,2.37-7.69h-3.67c-.07,2.65-.55,5.22-1.56,7.69h2.85ZM1302.58,245.51c-.84-1-1.52-2.07-2.1-3.27h-2.6c1.63,2.14,3.75,3.83,6.26,4.87-.55-.56-1.08-1.02-1.56-1.6ZM1306.6,245.75c-.47-1.15-.78-2.3-1.05-3.51h-3.91c.72,1.37,1.61,2.6,2.73,3.65.99.91,2.09,1.64,3.42,2.06-.48-.72-.86-1.4-1.18-2.2ZM1311.83,246.98c.85-1.43,1.36-3.1,1.73-4.73h-6.97c.39,1.67.9,3.38,1.8,4.83.26.38.54.72.91.99,1,.71,1.93-.14,2.52-1.09ZM1315.82,245.89c1.12-1.06,2-2.28,2.72-3.64h-3.91c-.28,1.27-.63,2.49-1.12,3.68-.31.72-.66,1.37-1.12,2.03,1.33-.42,2.43-1.15,3.44-2.07ZM1316.01,247.12c2.51-1.04,4.64-2.72,6.27-4.87h-2.59c-.39.74-.78,1.45-1.26,2.14-.68,1.02-1.5,1.86-2.42,2.73Z\" style=\"fill: #4272ef;\" />\n    </g>\n    </svg>\n  </div>\n\n  <div class=\"hero__intro\">\n    <h1 class=\"serif hero__title\">@@TITLE_LINE_1@@<br>@@TITLE_LINE_2@@</h1>\n    <p class=\"hero__sub\">@@SUBTITLE@@</p>\n  </div>\n\n  <i class=\"edge-nd edge-nd--coral\"></i><i class=\"edge-nd edge-nd--blue\"></i>\n  <svg class=\"sp sp--globe sp--edge\" style=\"--x:0%;--y:0px;\" width=\"39.6\" height=\"39.6\" viewBox=\"1277.08 200.03 66 66\" aria-hidden=\"true\"><circle cx=\"1310.08\" cy=\"233.03\" r=\"32.42\" style=\"fill: #fff;\" />\n  <g>\n      <path d=\"M1322.14,244.04c-6.26,6.86-16.98,7.11-23.56.57-6.03-6-6.44-15.63-.96-22.11,3.14-3.72,7.77-5.84,12.64-5.79,4.2.04,8.21,1.7,11.21,4.62,6.32,6.15,6.61,16.21.68,22.71ZM1313.57,223.81c-.43-1.82-1-3.75-2.07-5.2-.56-.69-1.3-1.16-2.09-.67-.37.23-.65.55-.91.9-.96,1.44-1.49,3.23-1.91,4.97h6.98ZM1305.54,223.81c.26-1.17.56-2.25.98-3.33.33-.85.72-1.6,1.25-2.38-1.34.41-2.43,1.16-3.43,2.06-1.11,1.05-2.01,2.28-2.72,3.64h3.91ZM1318.53,223.81c-1.3-2.49-3.38-4.82-6.15-5.71,1.2,1.74,1.78,3.69,2.24,5.71h3.91ZM1301.56,221.92c.74-1.14,1.61-2.09,2.63-3-2.52,1.04-4.65,2.71-6.31,4.88h2.61c.33-.68.66-1.27,1.07-1.89ZM1316.05,218.95c-.06,0-.08,0-.01.05v-.05ZM1316.11,218.97l-.03.06c1.56,1.33,2.71,2.96,3.62,4.79h2.59c-1.64-2.18-3.76-3.8-6.17-4.85ZM1298.46,232.52c.06-2.67.55-5.21,1.56-7.68h-2.85c-1.46,2.31-2.28,4.92-2.37,7.68h3.67ZM1304.64,232.52c.03-2.65.24-5.13.7-7.68h-4.2c-.48,1.09-.83,2.17-1.11,3.32-.33,1.44-.51,2.86-.55,4.37h5.15ZM1314.51,232.52c-.03-2.66-.24-5.18-.72-7.69h-7.41c-.48,2.57-.69,5.08-.72,7.69h8.86ZM1320.3,228.94c-.28-1.44-.69-2.79-1.27-4.11h-4.2c.47,2.57.67,5.08.7,7.69h5.15c-.03-1.23-.15-2.37-.38-3.58ZM1325.37,232.52c-.1-2.8-.92-5.39-2.38-7.68h-2.85c1.01,2.48,1.49,5.02,1.56,7.69h3.67ZM1300.02,241.22c-1-2.46-1.49-5-1.55-7.68h-3.67c.1,2.78.91,5.38,2.38,7.69h2.85ZM1305.33,241.23c-.47-2.6-.67-5.1-.7-7.69h-5.15c.03,1.31.17,2.57.43,3.85.27,1.32.66,2.56,1.21,3.84h4.2ZM1313.79,241.23c.48-2.6.69-5.12.71-7.69h-8.85c.03,2.6.24,5.16.72,7.69h7.42ZM1320.22,237.54c.28-1.33.44-2.64.46-4h-5.15c-.03,2.63-.24,5.14-.7,7.69h4.21c.53-1.22.91-2.42,1.18-3.69ZM1323,241.23c1.48-2.34,2.28-4.96,2.37-7.69h-3.67c-.07,2.65-.55,5.22-1.56,7.69h2.85ZM1302.58,245.51c-.84-1-1.52-2.07-2.1-3.27h-2.6c1.63,2.14,3.75,3.83,6.26,4.87-.55-.56-1.08-1.02-1.56-1.6ZM1306.6,245.75c-.47-1.15-.78-2.3-1.05-3.51h-3.91c.72,1.37,1.61,2.6,2.73,3.65.99.91,2.09,1.64,3.42,2.06-.48-.72-.86-1.4-1.18-2.2ZM1311.83,246.98c.85-1.43,1.36-3.1,1.73-4.73h-6.97c.39,1.67.9,3.38,1.8,4.83.26.38.54.72.91.99,1,.71,1.93-.14,2.52-1.09ZM1315.82,245.89c1.12-1.06,2-2.28,2.72-3.64h-3.91c-.28,1.27-.63,2.49-1.12,3.68-.31.72-.66,1.37-1.12,2.03,1.33-.42,2.43-1.15,3.44-2.07ZM1316.01,247.12c2.51-1.04,4.64-2.72,6.27-4.87h-2.59c-.39.74-.78,1.45-1.26,2.14-.68,1.02-1.5,1.86-2.42,2.73Z\" style=\"fill: #4272ef;\" />\n    </g>\n    </svg>";
  /* @band-markup:end */

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* The band at the top of the front page, as _includes/home/band.html writes it: the hidden clip
     paths, then <section class="hero"> holding the drawing and, after it, the note (children).
     Only the title lines and the subtitle are filled in; the drawing is the include's own. */
  function Band(p) {
    var lines = list(p.titleLines);
    var fill = { '@@TITLE_LINE_1@@': lines[0], '@@TITLE_LINE_2@@': lines[1], '@@SUBTITLE@@': p.subtitle };
    var markup = BAND_MARKUP.replace(/@@(TITLE_LINE_1|TITLE_LINE_2|SUBTITLE)@@/g, function (m) { return escapeHtml(fill[m]); });
    var attrs = rest(p, ['titleLines', 'subtitle', 'className']);
    attrs.className = cx('hero', p.className);
    return frag(
      h('svg', { width: '0', height: '0', style: { position: 'absolute' }, 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: BAND_CLIPS } }),
      h('section', attrs,
        h('div', { className: 'hero__band', dangerouslySetInnerHTML: { __html: markup } }),
        p.children));
  }

  /* The front page's wrapper, <div class="home"> from _layouts/homepage.html. Every front-page
     style hangs off .home, so Band, Note and ArrowDisc are mounted inside it. */
  function FrontPage(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('home', p.className);
    return h('div', attrs, p.children);
  }

  /* The arrow disc's two parts, as the site draws them: the blue disc and the white arrow. */
  function discParts(strokeWidth) {
    return [
      h('circle', { key: 'c', r: '18', fill: '#4272ef' }),
      h('path', { key: 'p', d: 'M-8 0 h16 M1.5 -6.5 l6.5 6.5 l-6.5 6.5', fill: 'none', stroke: '#fff', strokeWidth: strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' })
    ];
  }

  /* The note that lies on the band, as _includes/home/note.html writes it. With link.href the whole
     note is one link and carries the arrow disc (note__go below 1280px, note__disc on the corner from
     1280px) and, with link.label, the tab's text; without one it is a plain div with neither. */
  var NOTE_DISC = { width: '36', height: '36', viewBox: '-18 -18 36 36', 'aria-hidden': 'true' };
  /* The paper's tab, under the note's text. */
  function noteTab(className) {
    return h('svg', { className: className, width: '169', height: '30', viewBox: '0 0 169 30', 'aria-hidden': 'true' },
      h('path', { fill: '#f3f9fd', d: 'M0 0 H168.3 c-6.55 0 -12.47 3.9 -15.05 9.93 l-4.2 10.15 c-2.57 6.03 -8.5 9.93 -15.05 9.93 H0 Z' }));
  }
  /* What lies over the tab (<base>__over): the dotted line from the coral corner node to a ring
     node, the run to the corner, and with an href the arrow disc there and the tab's label. */
  function noteOver(base, href, label) {
    return h('div', { className: base + '__over' },
      h('svg', { className: base + '__route', width: '184', height: '30', viewBox: '0 0 184 30', 'aria-hidden': 'true' },
        h('path', { className: 'dot', d: 'M0 30 H134 c6.55 0 12.48-3.9 15.05-9.93 l4.2-10.15 c2.58-6.03 8.5-9.93 15.05-9.93 H174' }),
        h('circle', { cx: '0', cy: '30', r: '4.5', fill: '#ff5e5e' }),
        h('circle', { cx: '178', cy: '0', r: '4.2', fill: '#fff', stroke: '#4272ef', strokeWidth: '1.4' })),
      h('i', { className: base + '__run' }),
      href ? h('svg', Object.assign({ className: base + '__disc' }, NOTE_DISC), discParts('1.8')) : null,
      href && label ? h('span', { className: base + '__link' }, label) : null);
  }
  function Note(p) {
    var href = p.link && p.link.href ? p.link.href : null;
    var attrs = rest(p, ['eyebrow', 'title', 'body', 'link', 'className']);
    attrs.className = cx('note', p.className);
    if (href) attrs.href = href;
    return h(href ? 'a' : 'div', attrs,
      h('div', { className: 'note__paper' },
        h('div', { className: 'note__body' },
          h('div', { className: 'note__head' },
            p.eyebrow ? h('p', { className: 'note__eyebrow' }, p.eyebrow) : null,
            h('p', { className: 'note__title' }, p.title)),
          p.body ? h('p', { className: 'note__text' }, p.body) : null,
          href ? h('svg', Object.assign({ className: 'note__go' }, NOTE_DISC), discParts('1.8')) : null),
        noteTab('note__tab')),
      noteOver('note', href, href && p.link.label));
  }

  /* The small arrow disc that ends "More" (_includes/home/lists.html's svg.go), 24px. Its label is
     visually hidden text before it, for the link it sits in; className and other props go on the svg. */
  function ArrowDisc(p) {
    var attrs = Object.assign({ className: cx('go', p.className) }, rest(p, ['label', 'className']), { width: '24', height: '24', viewBox: '-18 -18 36 36', 'aria-hidden': 'true' });
    return frag(
      p.label ? h('span', { className: 'visually-hidden' }, p.label) : null,
      h('svg', attrs, discParts('2')));
  }

  /* A link in running text. The site styles every bare <a> this way (_sass/_site.scss), so Link
     adds no class: it is an <a> with whatever props it is given. */
  function Link(p) {
    return h('a', rest(p, []), p.children);
  }

  /* A card below the band, as _layouts/homepage.html writes one of page.movements: an eyebrow,
     the heading, which is the card's link (its ::after covers the card), and the body as children.
     HomeCard.Grid is the row of cards, <div class="cards">. */
  function HomeCard(p) {
    var attrs = rest(p, ['eyebrow', 'title', 'href', 'className']);
    attrs.className = cx('cd', p.className);
    var title = h('span', null, p.title);
    return h('article', attrs,
      p.eyebrow ? h('span', { className: 'eb' }, p.eyebrow) : null,
      h('h3', { className: 'serif hd' }, p.href ? h('a', { href: p.href }, title) : title),
      p.children != null && p.children !== '' ? h('p', { className: 'bo' }, p.children) : null);
  }
  HomeCard.Grid = function HomeCardGrid(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('cards', p.className);
    return h('div', attrs, p.children);
  };

  /* A row of the front page's lists, as _includes/home/lists.html writes one: the date (month as
     %b over the day as %-d), the title, which is the row's link, and for an event its place.
     ListRow.List is one list with its heading line and "More"; ListRow.Lists holds the two. */
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function ymdOf(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    return m ? { key: m[0], month: MONTHS[+m[2] - 1], day: String(+m[3]) } : null;
  }
  /* With an endDate on another day, the range as lists.html writes it: the days joined by "–", and
     the months too when the end's month name differs from the start's. */
  function ListRow(p) {
    var start = ymdOf(p.date) || { key: '', month: '', day: '' };
    var end = ymdOf(p.endDate);
    var month = start.month, day = start.day;
    if (end && end.key !== start.key) {
      if (end.month !== month) month += '–' + end.month;
      day += '–' + end.day;
    }
    var attrs = rest(p, ['date', 'endDate', 'title', 'href', 'external', 'place', 'className']);
    attrs.className = cx('row', p.className);
    return h('article', attrs,
      h('p', { className: 'date' }, h('span', null, month), h('b', { className: 'serif' }, day)),
      h('div', null,
        h('h3', { className: 'row__title' }, h('a', linkAttrs(p.href, p.external), h('span', null, p.title))),
        p.place ? h('p', { className: 'where' }, p.place) : null));
  }
  ListRow.List = function ListRowList(p) {
    var attrs = rest(p, ['title', 'moreHref', 'moreLabel']);
    return h('div', attrs,
      h('div', { className: 'lhead' },
        h('h2', { className: 'serif ltitle' }, p.title),
        h('a', { className: 'more', href: p.moreHref },
          'More',
          p.moreLabel ? h('span', { className: 'visually-hidden' }, ' ' + p.moreLabel) : null,
          h('i', { className: 'more__dots' }),
          h(ArrowDisc, null))),
      h('div', { className: 'rows' }, p.children));
  };
  ListRow.Lists = function ListRowLists(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('lists', p.className);
    return h('section', attrs, p.children);
  };

  /* Content ------------------------------------------------------------------ */

  function Prose(p) {
    var attrs = rest(p, ['html', 'className']);
    attrs.className = cx('prose', p.className);
    if (typeof p.html === 'string') {
      attrs.dangerouslySetInnerHTML = { __html: p.html };
      return h('div', attrs);
    }
    return h('div', attrs, p.children);
  }

  /* A figure as _includes/figure (section-figure; also _plugins/news_figures.rb in news posts) or
     _includes/page-sections.html (page-section__figure) writes it: square, framed by a hairline. */
  function Figure(p) {
    var img = h('img', { src: p.src, alt: p.alt || '' });
    var attrs = rest(p, ['src', 'alt', 'caption', 'variant', 'float', 'className']);
    if (p.variant === 'panel') {
      attrs.className = cx('page-section__figure', p.float && 'page-section__figure--' + p.float, p.className);
      return h('figure', attrs, img);
    }
    attrs.className = cx('section-figure', p.className);
    return h('figure', attrs, img, p.caption ? h('figcaption', null, p.caption) : null);
  }

  /* A news post as _layouts/page.html writes it for the news collection: the date over the title
     (_includes/content-page-intro.html), the body in .prose, and the "Latest news" rail beside it
     (_includes/news-rail.html), left out when it has no rows. */
  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function NewsArticle(p) {
    var d = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(p.date || ''));
    var rail = list(p.rail);
    var attrs = rest(p, ['title', 'date', 'html', 'rail', 'allHref', 'className']);
    attrs.className = cx('content-page', 'content-page--news', p.className);
    return h('article', attrs,
      h('div', { className: 'content-page__grid content-page__grid--full' },
        h('div', { className: 'content-page__main' },
          h('div', { className: 'content-page__intro' },
            h('header', { className: 'content-page__header' },
              d ? h('p', { className: 'content-page__date' },
                h('time', { dateTime: d[0] }, +d[3] + ' ' + MONTH_NAMES[+d[2] - 1] + ' ' + d[1])) : null,
              h('h1', { className: 'content-page__title' }, p.title))),
          h(Prose, { html: p.html }, p.children)),
        rail.length > 0 ? h('aside', { className: 'news-rail', 'aria-labelledby': 'news-rail-title' },
          h('div', { className: 'news-rail__head' },
            h('h2', { className: 'news-rail__title', id: 'news-rail-title' }, 'Latest news'),
            h('a', { className: 'news-rail__all', href: p.allHref },
              'All',
              h('span', { className: 'visually-hidden' }, ' news'),
              h('i', { className: 'news-rail__dots' }),
              h('svg', { className: 'news-rail__disc', width: '22', height: '22', viewBox: '-18 -18 36 36', 'aria-hidden': 'true' }, discParts('2')))),
          h('ul', { className: 'news-rail__rows' }, rail.map(function (it, i) {
            var day = ymdOf(it.date) || { month: '', day: '' };
            return h('li', { className: 'news-rail__row', key: i },
              h('p', { className: 'news-rail__date' }, h('span', null, day.month), h('b', null, day.day)),
              h('a', Object.assign({ className: 'news-rail__link' }, linkAttrs(it.href, it.external)), it.title));
          }))) : null));
  }

  function EventDetails(p) {
    var attrs = rest(p, ['rows', 'className']);
    attrs.className = cx('event-details', p.className);
    return h('dl', attrs, list(p.rows).map(function (r, i) {
      return h('div', { className: 'event-details__row', key: i },
        h('dt', { className: 'event-details__label' }, r.label),
        h('dd', { className: 'event-details__value' }, r.value));
    }));
  }

  function UsageFigures(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('usage-figures', p.className);
    return h('div', attrs, p.children);
  }
  UsageFigures.Figure = function UsageFigure(p) {
    var attrs = rest(p, ['title', 'caption', 'className']);
    attrs.className = cx('usage-figure', p.className);
    return h('div', attrs,
      h('h2', { className: 'usage-figure__title' }, p.title),
      p.caption ? h('p', { className: 'usage-figure__cap' }, p.caption) : null,
      p.children);
  };
  /* Numerals in ink; each label opens on a node in its series' colour, passed as --series. */
  UsageFigures.Stats = function UsageStats(p) {
    var attrs = rest(p, ['stats', 'className']);
    attrs.className = cx('usage-stat-row', p.className);
    return h('div', attrs, list(p.stats).map(function (s, i) {
      return h('div', { className: 'usage-stat', key: i, style: { '--series': 'var(--chart-' + (s.series || ((i % 5) + 1)) + ')' } },
        h('b', null, s.value),
        h('span', null, s.label));
    }));
  };
  UsageFigures.Globe = function UsageGlobe(p) {
    return frag(
      h('div', { className: cx('usage-globe-wrap', p.className) },
        p.children,
        p.showBack !== false ? h('div', { className: 'usage-gctl usage-gctl--back' },
          h('button', { type: 'button', onClick: p.onBack }, p.backLabel || '← Back to world')) : null,
        h('div', { className: 'usage-gctl usage-gctl--zoom' },
          h('button', { type: 'button', onClick: p.onZoomIn, 'aria-label': 'Zoom in' }, '+'),
          h('button', { type: 'button', onClick: p.onZoomOut, 'aria-label': 'Zoom out' }, '−'))),
      p.hint !== null ? h('p', { className: 'usage-hint' }, p.hint || 'Drag to spin · scroll or +/− to zoom · click a country to drill in') : null);
  };
  UsageFigures.Platforms = function UsagePlatforms(p) {
    return frag.apply(null, list(p.groups).map(function (g, i) {
      return h('div', { className: 'usage-pg', key: i },
        h('h4', null, g.title),
        h('div', { className: 'usage-plats' }, list(g.platforms).map(function (pl, j) {
          return h('span', { className: 'usage-plat', key: j }, pl.logo ? h('img', { src: pl.logo, alt: '' }) : null, pl.name);
        })));
    }));
  };

  /* Slides ------------------------------------------------------------------ */

  /* Each Slide component renders one 1920 × 1080 <section> with inline styles carrying the system's
     light-theme hex values, because the Slides artifact type takes hex values, not tokens. Mount one in a
     design canvas, or turn it into markup for a deck with D3I.slideMarkup(D3I.SlideFrame, props).
     Every text element sets margin and padding to 0 so a page stylesheet (this system's bundle.css
     included) cannot change a slide's geometry. Pictures are props. */

  var C = {
    surface: '#ffffff', tint: '#f5f7fb', strong: '#eceff5', border: '#d5dae3', borderStrong: '#878e9b',
    heading: '#252a34', text: '#363b46', muted: '#626976', sky: '#87c5eb',
    blue: '#4272ef', blueTint: '#eef3fe', coral: '#ff5e5e', coralTint: '#ffefef',
    yellow: '#ffcf60', yellowText: '#e8b53c', yellowTint: '#fff6d6', onAccent: '#ffffff',
    chart: ['#4272ef', '#ff5e5e', '#f4a52b', '#27b3a3', '#8b5cf6']
  };
  /* the serif is provisional (tokens.json, Web · Headings) */
  var SANS = "'Nunito Sans', Arial, sans-serif", SERIF = "'Libre Caslon Condensed', serif";
  /* the width between the slide's 128px margins */
  var WIDE = 1664;
  /* hairlines are 2px on a slide: 1px thins out on a projector */
  var HAIR = '2px solid ' + C.border;

  function st() {
    var o = {};
    for (var i = 0; i < arguments.length; i++) { var a = arguments[i]; if (a) for (var k in a) o[k] = a[k]; }
    return o;
  }
  var TXT = { margin: 0, padding: 0 };
  /* the Slides styles in tokens.json, as inline styles; titles, headings and numerals take the serif at 420 */
  var T = {
    numeral: st(TXT, { fontFamily: SERIF, fontSize: '200px', lineHeight: 0.9, fontWeight: 420, letterSpacing: 0, color: C.blue }),
    display: st(TXT, { fontFamily: SERIF, fontSize: '96px', lineHeight: 1.02, fontWeight: 420, letterSpacing: 0, color: C.heading, textWrap: 'balance' }),
    title: st(TXT, { fontFamily: SERIF, fontSize: '64px', lineHeight: 1.08, fontWeight: 420, letterSpacing: 0, color: C.heading }),
    stat: st(TXT, { fontFamily: SERIF, fontSize: '96px', lineHeight: 1, fontWeight: 420, letterSpacing: 0, color: C.blue }),
    heading: st(TXT, { fontFamily: SERIF, fontSize: '48px', lineHeight: 1.18, fontWeight: 420, letterSpacing: 0, color: C.heading }),
    subheading: st(TXT, { fontFamily: SERIF, fontSize: '36px', lineHeight: 1.15, fontWeight: 420, letterSpacing: 0, color: C.heading }),
    lead: st(TXT, { fontFamily: SANS, fontSize: '36px', lineHeight: 1.4, fontWeight: 400, color: C.muted }),
    item: st(TXT, { fontFamily: SANS, fontSize: '28px', lineHeight: 1.3, fontWeight: 800, color: C.heading }),
    body: st(TXT, { fontFamily: SANS, fontSize: '28px', lineHeight: 1.4, fontWeight: 400 }),
    small: st(TXT, { fontFamily: SANS, fontSize: '24px', lineHeight: 1.4, fontWeight: 400 }),
    label: st(TXT, { fontFamily: SANS, fontSize: '24px', lineHeight: 1.3, fontWeight: 700 }),
    eyebrow: st(TXT, { fontFamily: SANS, fontSize: '24px', lineHeight: 1.2, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: C.blue })
  };
  var COL = { display: 'flex', flexDirection: 'column' }, ROW = { display: 'flex', flexDirection: 'row' };
  function section(extra) {
    return st({
      width: '1920px', height: '1080px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
      background: C.surface, color: C.text, fontFamily: SANS, lineHeight: 1.4,
      padding: '128px 128px 136px', display: 'flex', flexDirection: 'column', gap: '48px'
    }, extra);
  }
  function two(i) {
    return (i < 9 ? '0' : '') + (i + 1);
  }

  /* eyebrow (text-muted caps) and title (the serif) at the top margin; data-fit="none" stops the Slides canvas from shrinking them */
  function SlideHead(p) {
    return h('div', { style: st(COL, { gap: '16px' }) },
      p.eyebrow ? h('p', { 'data-fit': 'none', style: st(T.eyebrow, { color: C.muted }) }, p.eyebrow) : null,
      h('h2', { 'data-fit': 'none', style: T.title }, p.heading));
  }
  /* The footer row. data-uncounted marks what a slide's word count leaves out: the site name and the slide number.
     A source in the left slot is words on the slide and counts. */
  var UNCOUNTED = { 'data-uncounted': 'true' };
  function SlideFooter(p) {
    return h('div', { style: st(ROW, { position: 'absolute', left: '128px', right: '128px', bottom: '64px', justifyContent: 'space-between' }) },
      p.source ? h('p', { style: st(T.small, { color: C.muted }) }, p.source)
        : h('p', st(UNCOUNTED, { style: st(T.label, { color: C.muted }) }), p.site || 'datadonation.eu'),
      h('p', st(UNCOUNTED, { style: st(T.label, { color: C.muted }) }), p.number != null ? String(p.number) : ''));
  }
  /* a node on a slide's line: a blue disc, a coral disc, or (with ring) a surface disc in a 3px blue ring */
  function dot(key, x, y, r, fill, ring) {
    return h('circle', { key: key, cx: x, cy: y, r: r, fill: fill, stroke: ring, strokeWidth: ring ? 3 : null });
  }

  /* One blue line across the slide with a node at the centre of each stop's column, the labels under the nodes.
     Stops before current are blue nodes, current is a coral node and stops after it are rings; with no current every
     node is blue. step: the line steps down at the current node, as the band's edge steps, so the parts behind sit
     on the upper level and the parts ahead on the lower one. numbered: the two-digit number over each label. */
  function SlideRail(p) {
    var stops = list(p.stops), n = stops.length || 1, cw = WIDE / n;
    var cur = p.current == null ? -1 : p.current;
    var step = !!p.step && cur >= 0 && cur < n;
    var UP = 20, LOW = step ? 60 : UP, MID = (UP + LOW) / 2, sx = Math.min(70, cw / 2);
    function x(i) { return Math.round(cw * i + cw / 2); }
    var first = x(0), last = x(n - 1), xc = x(cur), d;
    if (step) {
      /* the band's step, a curve from (xc - sx, UP) to (xc + sx, LOW) through the current node, drawn in its two halves */
      d = cur > 0 ? 'M' + first + ' ' + UP + ' H' + (xc - sx) + ' C' + (xc - sx / 2) + ' ' + UP + ' ' + (xc - sx / 4) + ' ' + (3 * UP + LOW) / 4 + ' ' + xc + ' ' + MID
        : 'M' + xc + ' ' + MID;
      if (cur < n - 1) d += ' C' + (xc + sx / 4) + ' ' + (UP + 3 * LOW) / 4 + ' ' + (xc + sx / 2) + ' ' + LOW + ' ' + (xc + sx) + ' ' + LOW + ' H' + last;
    } else {
      d = 'M' + first + ' ' + UP + ' H' + last;
    }
    var H = LOW + 24;
    return h('div', { style: st(COL, { gap: '12px' }) },
      h('svg', { width: WIDE, height: H, viewBox: '0 0 ' + WIDE + ' ' + H, 'aria-hidden': 'true', style: { display: 'block', flex: 'none', maxWidth: 'none' } },
        h('path', { d: d, fill: 'none', stroke: C.blue, strokeWidth: 3 }),
        stops.map(function (_, i) {
          var y = !step ? UP : i < cur ? UP : i === cur ? MID : LOW;
          if (i === cur) return dot(i, x(i), y, 15, C.coral);
          if (cur < 0 || i < cur) return dot(i, x(i), y, 11, C.blue);
          return dot(i, x(i), y, 10, C.surface, C.blue);
        })),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + n + ', 1fr)' } }, stops.map(function (label, i) {
        if (p.numbered) return h('div', { key: i, style: st(COL, { alignItems: 'center', gap: '8px' }) },
          h('p', { style: st(T.heading, { lineHeight: 1, color: C.blue }) }, two(i)),
          h('p', { style: st(T.subheading, { textAlign: 'center' }) }, label));
        var ahead = cur >= 0 && i > cur;
        return h('p', { key: i, style: st(T.label, { textAlign: 'center', fontWeight: i === cur ? 800 : 700, color: ahead ? C.muted : C.heading }) }, label);
      })));
  }

  /* The cover's two bands ------------------------------------------------------------------- */

  /* The network cover's band, from project/assets/Slides/cover-network.svg (cover B9). Rewrite it with
     tools/build_slide_cover.py whenever that file changes; the test suite checks that it is current. */
  /* @slide-cover:start */
  /* Generated by tools/build_slide_cover.py from project/assets/Slides/cover-network.svg; do not edit. */
  var SLIDE_COVER_NETWORK = "<svg width=\"1920\" height=\"343\" viewBox=\"0 0 1920 343\"><defs><clipPath id=\"cn-i\"><path d=\"M230.42,511.23c0,14.14-11.47,25.61-25.61,25.61s-25.61-11.47-25.61-25.61,11.47-35.73,25.61-35.73c20.09,0,25.61,21.59,25.61,35.73Z\"/></clipPath><clipPath id=\"cn-j\"><path d=\"M1119.88,535.46c0,14.14-11.47,25.61-25.61,25.61s-25.61-11.47-25.61-25.61,11.47-35.73,25.61-35.73,25.61,21.59,25.61,35.73Z\"/></clipPath><clipPath id=\"cn-c1\"><rect x=\"0\" y=\"0\" width=\"800\" height=\"256\"/></clipPath><clipPath id=\"cn-c2\"><rect x=\"0\" y=\"256\" width=\"800\" height=\"86.86\"/></clipPath></defs><rect x=\"0\" y=\"0\" width=\"1920\" height=\"256\" fill=\"#87c5eb\"/><rect x=\"998.86\" y=\"254.86\" width=\"921.14\" height=\"60.57\" fill=\"#87c5eb\"/><svg x=\"920\" y=\"256\" width=\"80\" height=\"59.43\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" overflow=\"visible\"><path d=\"M0 -2 H102 V100 H100 C50 100 50 0 0 0 Z\" fill=\"#87c5eb\" stroke=\"none\"/></svg><path d=\"M-10 256L920 256C960 256 960 315.43 1000 315.43L1930 315.43\" fill=\"none\" stroke=\"#4272ef\" stroke-width=\"3.14\"/><path d=\"M742.86 121.03L1129.14 121.03Q1142.86 121.03 1148.69 133.49L1201.03 244.69Q1206.86 257.14 1220.57 257.14L1234.29 257.14\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><svg x=\"0\" y=\"0\" width=\"1920\" height=\"315.43\" viewBox=\"0 0 1680 276\" overflow=\"visible\"><circle cx=\"830\" cy=\"105.9\" r=\"19.8\" fill=\"#ffffff\" stroke=\"#4272ef\" stroke-width=\"1.3\"/><image href=\"@@MARK_SRC@@\" x=\"815\" y=\"91.2\" width=\"30\" height=\"29.39\"/></svg><g clip-path=\"url(#cn-c1)\"><path d=\"M282.56 54.7L391.04 54.7C408.06 54.7 423.43 50.29 430.13 43.48L443.97 29.43C450.67 22.63 466.04 18.22 483.06 18.22L656.11 18.22C684.73 18.22 705.19 30.27 696.76 42.18L655.86 97.06C647.43 108.97 667.89 121.02 696.5 121.02\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"3.14\" stroke-dasharray=\"0.11 9.71\" stroke-linecap=\"round\"/><path d=\"M-85.71 224.08L296.19 224.08C313.04 224.08 328.3 219.75 335.1 213.04L424.96 132.12C431.76 125.4 447.01 121.07 463.87 121.07L742.86 121.07\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><path d=\"M176.66 121.08L491.53 121.08\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><path d=\"M47.7 224.23C76.31 224.23 96.77 236.28 88.34 248.19L65.44 274.08C57.01 285.99 77.47 298.05 106.09 298.05L286.41 298.05\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><path d=\"M583.6 121.57L538.16 170.08C529.73 181.99 550.19 194.04 578.8 194.04L671.43 194.04\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><circle cx=\"610.71\" cy=\"256\" r=\"73.14\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"3.14\" stroke-dasharray=\"0.11 9.71\" stroke-linecap=\"round\"/></g><g clip-path=\"url(#cn-c2)\"><path d=\"M282.56 54.7L391.04 54.7C408.06 54.7 423.43 50.29 430.13 43.48L443.97 29.43C450.67 22.63 466.04 18.22 483.06 18.22L656.11 18.22C684.73 18.22 705.19 30.27 696.76 42.18L655.86 97.06C647.43 108.97 667.89 121.02 696.5 121.02\" fill=\"none\" stroke=\"#87c5eb\" stroke-width=\"3.71\" stroke-dasharray=\"0.11 9.71\" stroke-linecap=\"round\"/><path d=\"M-85.71 224.08L296.19 224.08C313.04 224.08 328.3 219.75 335.1 213.04L424.96 132.12C431.76 125.4 447.01 121.07 463.87 121.07L742.86 121.07\" fill=\"none\" stroke=\"#87c5eb\" stroke-width=\"3.14\"/><path d=\"M176.66 121.08L491.53 121.08\" fill=\"none\" stroke=\"#87c5eb\" stroke-width=\"3.14\"/><path d=\"M47.7 224.23C76.31 224.23 96.77 236.28 88.34 248.19L65.44 274.08C57.01 285.99 77.47 298.05 106.09 298.05L286.41 298.05\" fill=\"none\" stroke=\"#87c5eb\" stroke-width=\"3.14\"/><path d=\"M583.6 121.57L538.16 170.08C529.73 181.99 550.19 194.04 578.8 194.04L671.43 194.04\" fill=\"none\" stroke=\"#87c5eb\" stroke-width=\"3.14\"/><circle cx=\"610.71\" cy=\"256\" r=\"73.14\" fill=\"none\" stroke=\"#87c5eb\" stroke-width=\"3.71\" stroke-dasharray=\"0.11 9.71\" stroke-linecap=\"round\"/></g><svg x=\"234.32\" y=\"45.48\" width=\"30.86\" height=\"17.14\" viewBox=\"152.35 106.04 45.0 25.0\" overflow=\"visible\"><g><rect x=\"153.08\" y=\"106.91\" width=\"43.55\" height=\"23.27\" rx=\"11.63\" ry=\"11.63\" transform=\"translate(349.7 237.08) rotate(-180)\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"155.79\" y=\"109.35\" width=\"18.6\" height=\"18.6\" rx=\"9.3\" ry=\"9.3\" transform=\"translate(330.17 237.31) rotate(-180)\" fill=\"#ffffff\" stroke=\"none\"/></g></svg><svg x=\"563.59\" y=\"2.29\" width=\"32\" height=\"32\" viewBox=\"-18 -18 36 36\" overflow=\"visible\"><circle r=\"17.5\" fill=\"#4272ef\" stroke=\"none\"/><g><path d=\"M-3.6 -1.4 V-4.8 a3.6 3.6 0 0 1 7.2 0 V-1.4\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><rect x=\"-6.2\" y=\"-1.4\" width=\"12.4\" height=\"9.8\" rx=\"2\" fill=\"#ffffff\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"0\" cy=\"3.4\" r=\"1.5\" fill=\"#4272ef\" stroke=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></svg><circle cx=\"302.87\" cy=\"121.02\" r=\"5.14\" fill=\"#ffffff\"/><svg x=\"148.05\" y=\"97.02\" width=\"48\" height=\"48\" viewBox=\"-18 -18 36 36\" overflow=\"visible\"><g><rect x=\"-7\" y=\"-13\" width=\"14\" height=\"26\" rx=\"3.6\" fill=\"#ffffff\" stroke=\"#4272ef\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M-2 8.6 H2\" fill=\"none\" stroke=\"#4272ef\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></svg><svg x=\"484.73\" y=\"98.39\" width=\"45.25\" height=\"45.25\" viewBox=\"1594.89 148.96 66 66\" overflow=\"visible\"><circle cx=\"1627.89\" cy=\"181.96\" r=\"32.68\" fill=\"#ffffff\" stroke=\"none\" opacity=\"0.1\"/><g><rect x=\"1607.37\" y=\"186.88\" width=\"8.57\" height=\"9.01\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"1617.05\" y=\"179\" width=\"8.57\" height=\"16.89\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"1626.73\" y=\"164.84\" width=\"8.57\" height=\"31.06\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"1636.41\" y=\"167.38\" width=\"8.57\" height=\"28.51\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/></g></svg><circle cx=\"584.39\" cy=\"121.02\" r=\"5.14\" fill=\"#ffffff\"/><circle cx=\"725.11\" cy=\"121.02\" r=\"5.14\" fill=\"#ffffff\"/><circle cx=\"81.43\" cy=\"256\" r=\"5.14\" fill=\"#ffcf60\"/><svg x=\"71.83\" y=\"231.78\" width=\"19.2\" height=\"23.3\" viewBox=\"763.04 51.00 28 34\" overflow=\"visible\"><path d=\"M790.62,65.45c0,9.41-13.58,19.19-13.58,19.19,0,0-13.58-9.93-13.58-19.19,0-7.5,6.08-14.02,13.58-14.02s13.58,6.52,13.58,14.02Z\" fill=\"#4272ef\" stroke=\"none\"/></svg><svg x=\"270\" y=\"275.43\" width=\"45.25\" height=\"45.25\" viewBox=\"171.87 477.88 66 66\" overflow=\"visible\"><circle cx=\"204.87\" cy=\"510.88\" r=\"32.68\" fill=\"#87c5eb\" stroke=\"none\"/><g><circle cx=\"204.81\" cy=\"511.23\" r=\"25.61\" fill=\"#f15f60\" stroke=\"none\"/><g clip-path=\"url(#cn-i)\"><g><path d=\"M216.5,505.24c1.59-.95,3.5-.32,3.61-2.23s.42-3.39.74-5.41c.32-2.02.42-4.45.11-5.94-.32-1.48-5.09-2.02-5.41-2.12s.95,15.7.95,15.7Z\" fill=\"#36354a\" stroke=\"none\"/><path d=\"M213.74,505.07c-.92,3.39-4.17,12.8,2.33,15.98l3.32,9.83h-28.78s3.32-15.34,3.32-15.34c0,0,5.51-.57,7.35-4.95s.64-9.26.64-9.26l3.61-.6c2.96-.49,5.93.82,7.55,3.34l.65,1.01Z\" fill=\"#ffd1d2\" stroke=\"none\"/><path d=\"M198.89,501.36c0,7.46,5.08,13.5,8.84,13.5s8.84-6.05,8.84-13.5c0-7.46-1.45-13.5-8.84-13.5-7.14,0-8.84,6.05-8.84,13.5Z\" fill=\"#36354a\" stroke=\"none\" opacity=\"0.24\"/><path d=\"M197.41,499.34c0,7.46,5.94,13.5,10.32,13.5,4.38,0,10.32-6.05,10.32-13.5s-1.7-13.5-10.32-13.5c-8.34,0-10.32,6.05-10.32,13.5Z\" fill=\"#ffd1d2\" stroke=\"none\"/><path d=\"M217.88,496.02c0-6.87-3.3-11.65-10.3-11.65-6.99,0-11.55,9.02-11.55,15.89l5.12-3.85,11,.67,5.73-1.06Z\" fill=\"#36354a\" stroke=\"none\" opacity=\"0.24\"/><path d=\"M219.46,495.01c0-6.46-5.33-11.7-11.9-11.7-6.57,0-11.9,5.24-11.9,11.7h13.82s.23-2.58.23-2.58l1.05,2.58h1.39s.52-4.27.52-4.27l1.51,4.27h5.28Z\" fill=\"#36354a\" stroke=\"none\"/><polygon points=\"198.04 516.38 213.74 519.45 212.54 537.02 198.61 536.95 198.04 516.38\" fill=\"#4272ef\" stroke=\"none\"/><path d=\"M178.03,536.74c.78-4.24,1.06-16.47,4.6-17.82,3.54-1.34,13.4-3.43,16.69-5.73l4.03,9.01-1.34,14.71,8.03-.07,1.05-12.3,1.27-8.7c1.24,2.65,11.42,6.82,13.68,10.99,2.26,4.17,3.25,10.18,3.25,10.18l-51.26-.28Z\" fill=\"#36354a\" stroke=\"none\"/><path d=\"M201.44,481.91c-2.64.93-1.59,1.27-4.77,3.71-3.18,2.44-4.24,6.47-3.29,9.23.95,2.76.53,7.21,2.44,8.59,1.31.95,2.86,1.8,2.86,1.8l-1.38-7.11,5.09-3.92,10.08-5.09,3.61,1.17s.03,4.24,4.95,5.02c1.01.16.09-2.29.73-4.37.64-2.08-1.07-5.25-3.77-6.73-5.55-3.05-12.62-3.68-16.54-2.3Z\" fill=\"#36354a\" stroke=\"none\"/></g></g></g></svg><svg x=\"588.09\" y=\"233.37\" width=\"45.25\" height=\"45.25\" viewBox=\"394.56 393.56 66 66\" overflow=\"visible\"><circle cx=\"427.56\" cy=\"426.56\" r=\"32.42\" fill=\"#4272ef\" stroke=\"none\"/><path d=\"M444.21,420.1h-33.29c-2,0-2.99,2.24-1.58,3.54l11.18,10.36c1.26,1.16,1.96,2.74,1.96,4.39v.79c0,.59.52,1.07,1.15,1.07h7.87c.64,0,1.15-.48,1.15-1.07v-.79c0-1.65.71-3.23,1.96-4.39l11.18-10.36c1.41-1.31.41-3.54-1.58-3.54Z\" fill=\"#ffffff\" stroke=\"none\"/></svg><svg x=\"634.83\" y=\"179.31\" width=\"29.48\" height=\"29.48\" viewBox=\"500.73 322.12 43.0 43.0\" overflow=\"visible\"><circle cx=\"522.23\" cy=\"343.62\" r=\"20.94\" fill=\"#ffffff\" stroke=\"none\"/><g><rect x=\"524.71\" y=\"336.34\" width=\"1.22\" height=\"17.62\" transform=\"translate(397.92 -270.36) rotate(45)\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"516.12\" y=\"343.69\" width=\"1.22\" height=\"8.94\" transform=\"translate(-94.84 467.35) rotate(-45)\" fill=\"#4272ef\" stroke=\"none\"/></g></svg><path d=\"M1696.21 28.85L1585.64 28.85C1571.06 28.85 1557.88 32.91 1552.14 39.16L1524.65 70.19C1518.91 76.45 1505.73 80.5 1491.15 80.5L1397.89 80.5\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"3.14\" stroke-dasharray=\"0.11 9.71\" stroke-linecap=\"round\"/><path d=\"M2014.68 -8.83L2005.98 -0.3C1987.81 17.5 1949.31 28.85 1907.04 28.85L1702.18 28.85\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><path d=\"M1373.93 222.86L1419.64 154.86C1423.94 143.09 1433.85 135.43 1444.79 135.43\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><rect x=\"1444.79\" y=\"134.43\" width=\"225.16\" height=\"2\" fill=\"#ffffff\"/><path d=\"M1669.93 135.43C1680.87 135.43 1690.77 127.77 1695.07 116L1736.21 29.71\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><circle cx=\"1234.29\" cy=\"257.14\" r=\"5.14\" fill=\"#ffffff\"/><circle cx=\"1557.36\" cy=\"135.43\" r=\"5.14\" fill=\"#ffffff\"/><rect x=\"1234.29\" y=\"256.14\" width=\"64.23\" height=\"2\" fill=\"#ffffff\"/><svg x=\"1375.27\" y=\"57.82\" width=\"45.25\" height=\"45.25\" viewBox=\"1617.34 450.19 66 66\" overflow=\"visible\"><circle cx=\"1650.34\" cy=\"483.19\" r=\"32.68\" fill=\"#4272ef\" stroke=\"none\"/><g><rect x=\"1649.25\" y=\"471.16\" width=\"2.97\" height=\"21.18\" fill=\"#ffffff\" stroke=\"none\"/><polygon points=\"1658.56 474.13 1649.25 479.31 1649.25 471.57 1658.56 466.39 1658.56 474.13\" fill=\"#ffffff\" stroke=\"none\"/><ellipse cx=\"1645.82\" cy=\"491.92\" rx=\"6.4\" ry=\"4.66\" fill=\"#ffffff\" stroke=\"none\"/></g></svg><circle cx=\"1866.05\" cy=\"28.79\" r=\"5.14\" fill=\"#ffffff\"/><svg x=\"1713.59\" y=\"7.09\" width=\"45.25\" height=\"45.25\" viewBox=\"1062.05 501.42 66 66\" overflow=\"visible\"><circle cx=\"1095.05\" cy=\"534.42\" r=\"32.68\" fill=\"#ffffff\" stroke=\"none\"/><g><circle cx=\"1094.27\" cy=\"535.46\" r=\"25.61\" fill=\"#4272ef\" stroke=\"none\"/><g clip-path=\"url(#cn-j)\"><g><g><path d=\"M1094.58,534.9c.85,0,.37,1.42,1.12,1.39,14.83-.58,14.9-8.93,12.74-19.16-1.59-7.56-6.14-10.19-13.86-10.19h-.09c-7.72,0-13.22,6.67-14.82,14.22-2.27,10.76-2.63,13.74,14.82,13.74h.09Z\" fill=\"#36354a\" stroke=\"none\"/><path d=\"M1088.63,529.41c.84,3.09,3.8,11.64-2.12,14.54l-3.02,8.94h26.18l-6.76-12.69s-2.89.81-3.37-5.69c-.32-4.31-.16-8.5-.16-8.5l-3.28-.55c-2.69-.45-5.39.75-6.87,3.04l-.59.92Z\" fill=\"#ffd1d2\" stroke=\"none\"/><path d=\"M1102.14,526.03c0,6.79-6.48,13.94-9.9,13.94-.49,0-1.88-1.1-2.3-1.34l.16-2.16s-2.72-22.73,4-22.73,8.04,5.5,8.04,12.29Z\" fill=\"#36354a\" stroke=\"none\" opacity=\"0.24\"/><path d=\"M1103.49,524.2c0,6.79-7.23,12.31-12.98,12.31-2.03,0-5.8-5.53-5.8-12.31s1.54-12.29,9.39-12.29,9.39,5.5,9.39,12.29Z\" fill=\"#ffd1d2\" stroke=\"none\"/><path d=\"M1081.17,520.27c0-7.16,6.1-12.09,13.38-12.09s13.15,6.05,13.15,13.2l-5.29,6.03-1.93-2.3-.43.25c-1.02.56-2.22-.87-2.91-1.8l-1.6-2.5-5.76.35-8.62-1.14Z\" fill=\"#36354a\" stroke=\"none\" opacity=\"0.24\"/><path d=\"M1081.37,519.86c0-7.16,5.9-12.96,13.19-12.96s13.19,5.8,13.19,12.96h-15.31l-.26-2.86-1.16,2.86h-1.54l-.58-4.73-1.67,4.73h-5.85Z\" fill=\"#36354a\" stroke=\"none\"/><path d=\"M1119.36,565.54c-1.83-13.07.88-15.51.47-21.6-.5-7.52-9.01-4.3-16.93-3.75l-12.64,9.39-3.11-6.15s-7.65,1.99-9.71,5.79-3.57,16.24-3.57,16.24l45.49.09Z\" fill=\"#ff5e5e\" stroke=\"none\"/></g><path d=\"M1095.3,518.33s2.89,7.41,4.76,6.01c.45-.34,1.18-.96,1.84.3,1,1.92.12,2.58,0,3.27-.13.76-.09,1.73-1.01,1.63l-1.47,3.06,7.33-.68-2.48-15.65-8.97,1.85v.2Z\" fill=\"#36354a\" stroke=\"none\"/><polygon points=\"1099.72 523.25 1103.36 527.34 1106.14 527.02 1106.8 522.46 1101.31 521.56 1099.72 523.25\" fill=\"#36354a\" stroke=\"none\"/></g></g></g></svg><path d=\"M1298.5 257.14C1306.96 257.14 1314.63 254.45 1317.95 250.3L1333.92 229.7C1337.24 225.55 1344.9 222.86 1353.37 222.86L1499.64 222.86L1506.5 224\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><rect x=\"1506.5\" y=\"223\" width=\"344\" height=\"2\" fill=\"#ffffff\"/><path d=\"M1849.36 224C1855.35 224 1860.77 227.6 1863.13 233.12L1874.43 260.58C1876.79 266.11 1882.21 269.7 1888.2 269.7L1895.07 269.7\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2.29\"/><svg x=\"1872.45\" y=\"247.09\" width=\"45.25\" height=\"45.25\" viewBox=\"1277.08 200.03 66 66\" overflow=\"visible\"><circle cx=\"1310.08\" cy=\"233.03\" r=\"32.42\" fill=\"#ffffff\" stroke=\"none\"/><g><path d=\"M1322.14,244.04c-6.26,6.86-16.98,7.11-23.56.57-6.03-6-6.44-15.63-.96-22.11,3.14-3.72,7.77-5.84,12.64-5.79,4.2.04,8.21,1.7,11.21,4.62,6.32,6.15,6.61,16.21.68,22.71ZM1313.57,223.81c-.43-1.82-1-3.75-2.07-5.2-.56-.69-1.3-1.16-2.09-.67-.37.23-.65.55-.91.9-.96,1.44-1.49,3.23-1.91,4.97h6.98ZM1305.54,223.81c.26-1.17.56-2.25.98-3.33.33-.85.72-1.6,1.25-2.38-1.34.41-2.43,1.16-3.43,2.06-1.11,1.05-2.01,2.28-2.72,3.64h3.91ZM1318.53,223.81c-1.3-2.49-3.38-4.82-6.15-5.71,1.2,1.74,1.78,3.69,2.24,5.71h3.91ZM1301.56,221.92c.74-1.14,1.61-2.09,2.63-3-2.52,1.04-4.65,2.71-6.31,4.88h2.61c.33-.68.66-1.27,1.07-1.89ZM1316.05,218.95c-.06,0-.08,0-.01.05v-.05ZM1316.11,218.97l-.03.06c1.56,1.33,2.71,2.96,3.62,4.79h2.59c-1.64-2.18-3.76-3.8-6.17-4.85ZM1298.46,232.52c.06-2.67.55-5.21,1.56-7.68h-2.85c-1.46,2.31-2.28,4.92-2.37,7.68h3.67ZM1304.64,232.52c.03-2.65.24-5.13.7-7.68h-4.2c-.48,1.09-.83,2.17-1.11,3.32-.33,1.44-.51,2.86-.55,4.37h5.15ZM1314.51,232.52c-.03-2.66-.24-5.18-.72-7.69h-7.41c-.48,2.57-.69,5.08-.72,7.69h8.86ZM1320.3,228.94c-.28-1.44-.69-2.79-1.27-4.11h-4.2c.47,2.57.67,5.08.7,7.69h5.15c-.03-1.23-.15-2.37-.38-3.58ZM1325.37,232.52c-.1-2.8-.92-5.39-2.38-7.68h-2.85c1.01,2.48,1.49,5.02,1.56,7.69h3.67ZM1300.02,241.22c-1-2.46-1.49-5-1.55-7.68h-3.67c.1,2.78.91,5.38,2.38,7.69h2.85ZM1305.33,241.23c-.47-2.6-.67-5.1-.7-7.69h-5.15c.03,1.31.17,2.57.43,3.85.27,1.32.66,2.56,1.21,3.84h4.2ZM1313.79,241.23c.48-2.6.69-5.12.71-7.69h-8.85c.03,2.6.24,5.16.72,7.69h7.42ZM1320.22,237.54c.28-1.33.44-2.64.46-4h-5.15c-.03,2.63-.24,5.14-.7,7.69h4.21c.53-1.22.91-2.42,1.18-3.69ZM1323,241.23c1.48-2.34,2.28-4.96,2.37-7.69h-3.67c-.07,2.65-.55,5.22-1.56,7.69h2.85ZM1302.58,245.51c-.84-1-1.52-2.07-2.1-3.27h-2.6c1.63,2.14,3.75,3.83,6.26,4.87-.55-.56-1.08-1.02-1.56-1.6ZM1306.6,245.75c-.47-1.15-.78-2.3-1.05-3.51h-3.91c.72,1.37,1.61,2.6,2.73,3.65.99.91,2.09,1.64,3.42,2.06-.48-.72-.86-1.4-1.18-2.2ZM1311.83,246.98c.85-1.43,1.36-3.1,1.73-4.73h-6.97c.39,1.67.9,3.38,1.8,4.83.26.38.54.72.91.99,1,.71,1.93-.14,2.52-1.09ZM1315.82,245.89c1.12-1.06,2-2.28,2.72-3.64h-3.91c-.28,1.27-.63,2.49-1.12,3.68-.31.72-.66,1.37-1.12,2.03,1.33-.42,2.43-1.15,3.44-2.07ZM1316.01,247.12c2.51-1.04,4.64-2.72,6.27-4.87h-2.59c-.39.74-.78,1.45-1.26,2.14-.68,1.02-1.5,1.86-2.42,2.73Z\" fill=\"#4272ef\" stroke=\"none\"/></g></svg><svg x=\"1485.71\" y=\"203.21\" width=\"41.59\" height=\"41.59\" viewBox=\"1594.89 148.96 66 66\" overflow=\"visible\"><circle cx=\"1627.89\" cy=\"181.96\" r=\"32.68\" fill=\"#ffffff\" stroke=\"none\" opacity=\"0.1\"/><g><rect x=\"1607.37\" y=\"186.88\" width=\"8.57\" height=\"9.01\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"1617.05\" y=\"179\" width=\"8.57\" height=\"16.89\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"1626.73\" y=\"164.84\" width=\"8.57\" height=\"31.06\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/><rect x=\"1636.41\" y=\"167.38\" width=\"8.57\" height=\"28.51\" rx=\"4.28\" ry=\"4.28\" fill=\"#4272ef\" stroke=\"none\"/></g></svg><svg x=\"1344.21\" y=\"193.14\" width=\"59.43\" height=\"59.43\" viewBox=\"-18 -18 36 36\" overflow=\"visible\"><g><path d=\"M0 -8.6 L7 -5.9 V-0.8 C7 3.9 3.9 7.2 0 8.6 C-3.9 7.2 -7 3.9 -7 -0.8 V-5.9 Z\" fill=\"#ffffff\" stroke=\"#4272ef\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M-3.1 0 L-0.8 2.3 L3.4 -2.3\" fill=\"none\" stroke=\"#4272ef\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></svg><circle cx=\"960\" cy=\"285.71\" r=\"6.29\" fill=\"#ff5e5e\"/><circle cx=\"1460\" cy=\"315.43\" r=\"6.29\" fill=\"#4272ef\"/></svg>";
  /* @slide-cover:end */

  /* colours as 6-digit lower-case hex, so #fff reads as the surface token's #ffffff; the portraits keep the
     designer's own colours, since pictures are never recoloured */
  function tokenInk(v) {
    return v.replace(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g, function (m, x) {
      return '#' + (x.length === 3 ? x.replace(/./g, '$&$&') : x).toLowerCase();
    });
  }

  /* A small reader for BAND_MARKUP: elements as { tag, attrs, kids }. The markup is the include's own
     (build_band_markup.py checks its shape), so only what it uses is read: no comments, quoted attributes. */
  function readMarkup(s) {
    var top = { tag: '', attrs: {}, kids: [] }, stack = [top], re = /<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>|([^<]+)/g, m;
    while ((m = re.exec(s))) {
      var at = stack[stack.length - 1];
      if (m[5] != null) { if (m[5].trim()) at.kids.push({ text: m[5] }); continue; }
      if (m[1]) {
        if (at.tag !== m[2]) throw new Error('SlideCover: the band markup closes <' + m[2] + '> inside <' + at.tag + '>');
        stack.pop();
        continue;
      }
      var el = { tag: m[2], attrs: {}, kids: [] };
      m[3].replace(/([^\s=]+)(?:="([^"]*)")?/g, function (_, k, v) { el.attrs[k] = v == null ? '' : v; });
      at.kids.push(el);
      if (!m[4] && m[2] !== 'br') stack.push(el);
    }
    return top;
  }
  function styleOf(el) {
    var o = {};
    (el.attrs.style || '').split(';').forEach(function (d) {
      var i = d.indexOf(':');
      if (i > 0) o[d.slice(0, i).trim()] = d.slice(i + 1).trim();
    });
    return o;
  }
  /* a CSS length as the band writes them (px, %, calc(), max(), min()), in px of a box w wide */
  function cssPx(expr, w) {
    var t = String(expr).replace(/calc\(/g, '(').match(/max|min|\d*\.?\d+(?:px|%)?|[-+*/(),]/g), i = 0;
    function prim() {
      var k = t[i++];
      if (k === '(') { var v = sum(); i++; return v; }
      if (k === '-') return -prim();
      if (k === 'max' || k === 'min') { i++; var a = [sum()]; while (t[i++] === ',') a.push(sum()); return Math[k].apply(null, a); }
      return /%$/.test(k) ? parseFloat(k) * w / 100 : parseFloat(k);
    }
    function prod() { var v = prim(); while (t[i] === '*' || t[i] === '/') v = t[i++] === '*' ? v * prim() : v / prim(); return v; }
    function sum() { var v = prod(); while (t[i] === '+' || t[i] === '-') v = t[i++] === '+' ? v + prod() : v - prod(); return v; }
    return sum();
  }
  function r2(v) { return String(Math.round(v * 100) / 100); }
  /* path data through an affine map f(x, y) → [x, y], as absolute M, L, C, Q and Z, so the line keeps its
     weight however its viewBox was stretched (the site's vector-effect: non-scaling-stroke, which a deck
     and a scaled canvas do not treat alike) */
  function mapPath(d, f) {
    var t = d.match(/[a-zA-Z]|-?(?:\d*\.\d+|\d+\.?)(?:e-?\d+)?/g), i = 0, cmd = '', out = '';
    var x = 0, y = 0, sx = 0, sy = 0, lc = null, lq = null;
    function n() { return parseFloat(t[i++]); }
    function pt(px, py) { var q = f(px, py); return r2(Math.max(-10, Math.min(1450, q[0]))) + ' ' + r2(q[1]); }
    while (i < t.length) {
      if (/[a-zA-Z]/.test(t[i])) cmd = t[i++];
      var rel = cmd !== cmd.toUpperCase(), C1 = cmd.toUpperCase(), bx = rel ? x : 0, by = rel ? y : 0;
      if (C1 === 'Z') { out += 'Z'; x = sx; y = sy; lc = lq = null; }
      else if (C1 === 'M') { x = bx + n(); y = by + n(); sx = x; sy = y; out += 'M' + pt(x, y); cmd = rel ? 'l' : 'L'; lc = lq = null; }
      else if (C1 === 'L') { x = bx + n(); y = by + n(); out += 'L' + pt(x, y); lc = lq = null; }
      else if (C1 === 'H') { x = bx + n(); out += 'L' + pt(x, y); lc = lq = null; }
      else if (C1 === 'V') { y = by + n(); out += 'L' + pt(x, y); lc = lq = null; }
      else if (C1 === 'C' || C1 === 'S') {
        var x1 = C1 === 'C' ? bx + n() : lc ? 2 * x - lc[0] : x, y1 = C1 === 'C' ? by + n() : lc ? 2 * y - lc[1] : y;
        var x2 = bx + n(), y2 = by + n(), ex = bx + n(), ey = by + n();
        out += 'C' + pt(x1, y1) + ' ' + pt(x2, y2) + ' ' + pt(ex, ey); lc = [x2, y2]; lq = null; x = ex; y = ey;
      } else if (C1 === 'Q' || C1 === 'T') {
        var qx = C1 === 'Q' ? bx + n() : lq ? 2 * x - lq[0] : x, qy = C1 === 'Q' ? by + n() : lq ? 2 * y - lq[1] : y;
        var qex = bx + n(), qey = by + n();
        out += 'Q' + pt(qx, qy) + ' ' + pt(qex, qey); lq = [qx, qy]; lc = null; x = qex; y = qey;
      } else throw new Error('SlideCover: the band draws a path with "' + cmd + '", which the cover cannot redraw');
    }
    return out;
  }
  /* a viewBox (preserveAspectRatio none) on box b, then a <g>'s translate/scale */
  function viewMap(vb, b) {
    var v = vb.split(/[\s,]+/).map(Number), kx = b.w / v[2], ky = b.h / v[3];
    return function (px, py) { return [b.x + (px - v[0]) * kx, b.y + (py - v[1]) * ky]; };
  }
  function gMap(tr, f) {
    var m, a = 1, d = 1, e = 0, g = 0;
    if ((m = /translate\(([-\d.]+)[\s,]+([-\d.]+)\)/.exec(tr))) { e = +m[1]; g = +m[2]; }
    if ((m = /scale\(([-\d.]+)[\s,]+([-\d.]+)\)/.exec(tr))) { a = +m[1]; d = +m[2]; }
    if (tr.replace(/(translate|scale)\([^)]*\)/g, '').trim()) throw new Error('SlideCover: the band transforms a line with ' + tr);
    return function (px, py) { return f(e + a * px, g + d * py); };
  }
  /* an element of an icon as it is, its style="…" as attributes, colours as tokens, clip ids made the cover's */
  function svgCopy(el) {
    if (el.text != null) return '';
    if (el.attrs['class']) throw new Error('SlideCover: the band styles an icon part by class (' + el.attrs['class'] + ')');
    var out = '<' + el.tag, sty = styleOf(el);
    for (var k in el.attrs) {
      if (k === 'style') continue;
      var v = k === 'id' ? 'bt-' + el.attrs[k] : el.attrs[k];
      out += ' ' + k + '="' + tokenInk(v) + '"';
    }
    for (var s in sty) out += ' ' + s + '="' + tokenInk(sty[s]).replace(/url\(#/, 'url(#bt-') + '"';
    var kids = el.kids.map(svgCopy).join('');
    return out + (kids ? '>' + kids + '</' + el.tag + '>' : '/>');
  }

  /* The website band at its 1280px+ layout drawn 1440px wide (_sass/_home-band.scss at that width), with the
     line weights of cover C. Positions are the band's own pixels; the <svg> draws them 4/3. */
  var BAND = { W: 1440, S: 224, DROP: 52, HALF: 234, GAP: 36, STEP_X: 685, STEP_W: 70, THREAD: 146, FS: 50, PAD: 34, H: 300 };
  BAND.D = BAND.S + BAND.DROP;
  BAND.RSTART = BAND.W / 2 + BAND.HALF + BAND.GAP;
  var BAND_LINE = { sky: 2, page: 2.75 }, BAND_DOT = { sky: 2.75, page: 3.25 }, BAND_HAIR = 1.5;
  /* the classes the band's markup uses, and those hidden at this width */
  var BAND_CLASSES = ('sky sky--top sky--deep sky--step hero__thread hero__net hero__net--l hero__net--r story xl story__clip ' +
    'story__clip--sky story__clip--page story__lines dot sp cl ring nd nd--yellow midnet lt-xl desk tab-only rstory hl front rpart2 ' +
    'anchor hero__intro serif hero__title hero__sub edge-nd edge-nd--coral edge-nd--blue').split(' ');
  var BAND_HIDDEN = ['lt-xl', 'tab-only', 'sp--edge'];

  function bandTitleSvg() {
    var B = BAND, defs = '', clips = 0;
    function cls(el) { return (el.attrs['class'] || '').split(/\s+/).filter(Boolean); }
    function circle(cx, cy, r, fill) { return '<circle cx="' + r2(cx) + '" cy="' + r2(cy) + '" r="' + r + '" fill="' + fill + '"/>'; }
    function rect(x, y, w, hh, fill) { return '<rect x="' + r2(x) + '" y="' + r2(y) + '" width="' + r2(w) + '" height="' + r2(hh) + '" fill="' + fill + '"/>'; }
    function clip(x, y, w, hh, body) {
      var id = 'bt-c' + (++clips);
      defs += '<clipPath id="' + id + '"><rect x="' + r2(x) + '" y="' + r2(y) + '" width="' + r2(w) + '" height="' + r2(hh) + '"/></clipPath>';
      return '<g clip-path="url(#' + id + ')">' + body + '</g>';
    }
    function stroke(ink, dot, page) {
      var w = (dot ? BAND_DOT : BAND_LINE)[page ? 'page' : 'sky'];
      return ' fill="none" stroke="' + ink + '" stroke-width="' + w + '"' + (dot ? ' stroke-dasharray=".1 8.5" stroke-linecap="round"' : '');
    }
    /* the lines of an svg.story__lines, every <path> in it flattened onto the band */
    function lines(el, f, ctx) {
      return el.kids.map(function (k) {
        if (k.tag === 'g') return lines(k, gMap(k.attrs.transform || '', f), ctx);
        if (k.tag !== 'path') return '';
        return '<path d="' + mapPath(k.attrs.d, f) + '"' + stroke(ctx.ink, cls(k).indexOf('dot') >= 0, ctx.page) + '/>';
      }).join('');
    }
    function draw(el, b, ctx) {
      var c = cls(el), sty = styleOf(el);
      c.forEach(function (k) {
        if (BAND_CLASSES.indexOf(k) < 0 && !/^sp--/.test(k)) throw new Error('SlideCover: the band has a class the cover does not draw: ' + k);
      });
      if (c.some(function (k) { return BAND_HIDDEN.indexOf(k) >= 0; }) || c.indexOf('hero__intro') >= 0) return '';
      function at(prop, w) { return cssPx(sty[prop], w); }
      if (c.indexOf('sky--top') >= 0) return rect(0, 0, B.W, B.S, C.sky);
      if (c.indexOf('sky--deep') >= 0) return rect(B.STEP_X + B.STEP_W - 1, B.S - 1, B.W - (B.STEP_X + B.STEP_W - 1), B.DROP + 1, C.sky);
      if (c.indexOf('sky--step') >= 0) {
        var sb = { x: B.STEP_X, y: B.S, w: B.STEP_W, h: B.DROP }, f = viewMap(el.attrs.viewBox, sb);
        return el.kids.map(function (k) {
          if (k.tag !== 'path') return '';
          if (k.attrs.stroke) return '<path d="' + mapPath(k.attrs.d, f) + '" fill="none" stroke="' + tokenInk(k.attrs.stroke) + '" stroke-width="2.75"/>';
          return '<svg x="' + sb.x + '" y="' + sb.y + '" width="' + sb.w + '" height="' + sb.h + '" viewBox="' + el.attrs.viewBox + '" preserveAspectRatio="none" overflow="visible">' + svgCopy(k) + '</svg>';
        }).join('');
      }
      if (c.indexOf('hero__thread') >= 0) {
        /* the title's line: from the story's end to the node right of the title, between two nodes 6px outside its column */
        var l = B.W / 2 - B.HALF, x0 = Math.min(l - B.GAP, 560) * 0.9929;
        return rect(x0, B.THREAD - BAND_HAIR / 2, B.W - l + 6 - x0, BAND_HAIR, C.surface) + circle(l - 6, B.THREAD, 4.5, C.surface) + circle(B.W - l + 6, B.THREAD, 4.5, C.surface);
      }
      if (c.indexOf('edge-nd--coral') >= 0) return circle(B.STEP_X + B.STEP_W / 2, B.S + B.DROP / 2, 5.5, C.coral);
      if (c.indexOf('edge-nd--blue') >= 0) return circle((B.W + B.STEP_X + B.STEP_W) / 2, B.D, 5.5, C.blue);
      if (c.indexOf('nd') >= 0) return circle(b.x + at('--x', b.w), b.y + at('--y'), 4.5, c.indexOf('nd--yellow') >= 0 ? C.yellow : C.surface);
      if (c.indexOf('hl') >= 0) {
        var hx = b.x + at('left', b.w), hw = b.w - at('left', b.w) - at('right', b.w), hy = b.y + at('--y');
        if (c.indexOf('dot') >= 0) return '<path d="M' + r2(hx + 1) + ' ' + r2(hy) + 'H' + r2(hx + hw) + '" fill="none" stroke="' + C.surface + '" stroke-width="2" stroke-dasharray="0 6.5" stroke-linecap="round"/>';
        return rect(hx, hy - BAND_HAIR / 2, hw, BAND_HAIR, C.surface);
      }
      if (c.indexOf('story__lines') >= 0) {
        var lb = { x: b.x + (sty.left ? at('left', b.w) : 0), y: b.y, w: sty.width ? at('width', b.w) : b.w, h: sty.height ? at('height') : ctx.lineH };
        return lines(el, viewMap(el.attrs.viewBox, lb), ctx);
      }
      if (c.indexOf('sp') >= 0) {
        var cx = b.x + at('--x', b.w), cy = b.y + at('--y'), w = +el.attrs.width, hh = +el.attrs.height;
        if (c.indexOf('cl') >= 0) {
          var ring = el.kids[0], k = w / +el.attrs.viewBox.split(/\s+/)[2];
          return '<circle cx="' + r2(cx) + '" cy="' + r2(cy) + '" r="' + r2(+ring.attrs.r * k) + '"' + stroke(ctx.ink, true, ctx.page) + '/>';
        }
        return '<svg x="' + r2(cx - w / 2) + '" y="' + r2(cy - hh / 2) + '" width="' + w + '" height="' + hh + '" viewBox="' + el.attrs.viewBox + '" overflow="visible">' +
          el.kids.map(svgCopy).join('') + '</svg>';
      }
      /* containers */
      var nb = b, nctx = ctx;
      if (c.indexOf('hero__net--l') >= 0) nb = { x: 0, y: B.THREAD - 146, w: B.W / 2 - B.HALF - B.GAP };
      else if (c.indexOf('hero__net--r') >= 0) nb = { x: B.RSTART, y: B.THREAD - 146, w: B.W - B.RSTART };
      else if (c.indexOf('story') >= 0) { nb = { x: b.x, y: b.y, w: Math.min(b.w, 560) }; nctx = { ink: C.surface, page: false, lineH: 300 }; }
      else if (c.indexOf('rstory') >= 0) nctx = { ink: C.surface, page: false, lineH: 276 };
      else if (c.indexOf('rpart2') >= 0) { var px = Math.max(248, b.w * 0.55); nb = { x: b.x + px, y: b.y, w: Math.min(b.w - px - 22, 260) }; }
      else if (c.indexOf('story__clip--sky') >= 0) return clip(b.x, b.y, b.w, B.S, kids(el, b, { ink: C.surface, page: false, lineH: 300 }));
      else if (c.indexOf('story__clip--page') >= 0) return clip(b.x, b.y + B.S, b.w, B.H - B.S, kids(el, b, { ink: C.sky, page: true, lineH: 300 }));
      else if (c.length || el.tag !== 'div') throw new Error('SlideCover: the band has an element the cover does not draw: <' + el.tag + ' class="' + c.join(' ') + '">');
      return kids(el, nb, nctx);
    }
    /* children in paint order: .front (z-index 2) over its siblings */
    function kids(el, b, ctx) {
      var front = function (k) { return k.attrs && /(^|\s)front(\s|$)/.test(k.attrs['class'] || '') ? 1 : 0; };
      return el.kids.filter(function (k) { return k.tag; }).map(function (k, i) { return { k: k, i: i }; })
        .sort(function (a, z) { return front(a.k) - front(z.k) || a.i - z.i; })
        .map(function (o) { return draw(o.k, b, ctx); }).join('');
    }
    var body = kids(readMarkup(BAND_MARKUP), { x: 0, y: 0, w: B.W }, { ink: C.surface, page: false, lineH: 300 });
    readMarkup(BAND_CLIPS).kids[0].kids.forEach(function (cp) { defs += svgCopy(cp); });
    return '<defs>' + defs + '</defs>' + body;
  }

  /* The partner and provider logos in a row, by SiteFooter's keys and its equal-ink-area sizes: each logo's
     cell is its ink box, in rem, as bundle.css gives site-footer__cell--<key> (from $footer-logos):
     [cell width, cell height, image height, image left, image top, clear zone right], and the file's aspect. */
  var LOGO_REM = {
    odissei: [6.1099011302, 3.2218319226, 3.3137869563, 0.0442746459, 0.0408689039, 0.0340574199, 1817 / 973],
    eyra: [7.6318951318, 2.6799021074, 2.9129370732, 0.1165174829, 0.1165174829, 0, 798 / 300],
    uva: [7.4170557879, 1.6540382625, 1.6540382625, 0, 0, 0, 426 / 95],
    ru: [9.0031363279, 2.0573573249, 2.0573573249, 0, 0, 0, 1024 / 234],
    uu: [5.8064231341, 1.973482183, 4.6661889839, 1.6489540018, 1.3419678845, 4.3592028665, 1347 / 532],
    vu: [7.0513808946, 1.8234430282, 1.8344608109, 0, 0, 0, 1280 / 333],
    tilburg: [9.4154683613, 2.3901921997, 2.4265173092, 0.0145300438, 0.0145300438, 0.0145300438, 1300 / 334],
    eur: [3.8288388929, 3.5886787473, 4.9335755627, 0.6518632524, 0.7136187184, 0.7410655922, 761 / 719]
  };
  /* one gap between all logos, as wide as the widest clear zone and at least 1.5rem, as in the footer's row;
     1rem is 19.2px (the footer's 16px at the band's scale, less a tenth so eight logos fit the margins),
     smaller still if the row would not fit */
  function logoRow(logos) {
    var cells = logos.map(function (l) {
      var m = LOGO_REM[l.key];
      if (!m) throw new Error('SlideCover: no logo "' + l.key + '" is measured; add it to $footer-logos in _sass/_footer.scss first');
      return { l: l, m: m };
    });
    var gap = cells.reduce(function (g, c) { return Math.max(g, c.m[3], c.m[5]); }, 1.5);
    var total = cells.reduce(function (t, c) { return t + c.m[0]; }, 0) + gap * (cells.length - 1);
    var rem = Math.min(19.2, WIDE / total);
    function px(v) { return (v * rem).toFixed(1) + 'px'; }
    return h('div', { style: st(ROW, { position: 'absolute', left: '128px', right: '128px', top: '832px', height: '112px', borderTop: HAIR, alignItems: 'center', justifyContent: 'center', gap: px(gap) }) },
      cells.map(function (c, i) {
        return h('div', { key: i, style: { width: px(c.m[0]), height: px(c.m[1]), flex: 'none', overflow: 'hidden' } },
          h('img', { src: c.l.src, alt: c.l.alt || '', style: { display: 'block', maxWidth: 'none', width: px(c.m[2] * c.m[6]), height: px(c.m[2]), margin: '-' + px(c.m[4]) + ' 0 0 -' + px(c.m[3]) } }));
      }));
  }

  /* The cover (and closing) slide, in one of two layouts.
     'network': the B9 band, the front page's network spread across the slide with no words, and under it on
     white the eyebrow, the title, the subtitle and the speaker line, from 416px.
     'band-title': the website band as it is, with the title in it; the eyebrow, speakers and venue centred
     under it, then the logo row. */
  function SlideCover(p) {
    var lines = String(p.title == null ? '' : p.title).split('\n');
    var title = lines.reduce(function (out, l, i) { return i ? out.concat([h('br', { key: i }), l]) : [l]; }, []);
    var eyebrow = h('p', { 'data-fit': 'none', style: T.eyebrow }, p.eyebrow || 'D3I · datadonation.eu');
    var aria = p.bandLabel ? { role: 'img', 'aria-label': p.bandLabel } : { 'aria-hidden': 'true' };
    if (p.layout === 'band-title') {
      /* the band's drawing pinned behind, the title and subtitle in flow over it, centred as on the front page;
         the subtitle is 24px, the projector floor, not the website's 17px × 4/3 */
      return h('section', { style: section() },
        h('div', { 'data-band': 'band-title', style: st(COL, { position: 'absolute', left: 0, top: 0, width: '1920px', height: r2(BAND.H * 4 / 3) + 'px', alignItems: 'center', paddingTop: r2(BAND.PAD * 4 / 3) + 'px', boxSizing: 'border-box' }) },
          h('svg', st({ width: '1920', height: r2(BAND.H * 4 / 3), viewBox: '0 0 ' + BAND.W + ' ' + BAND.H, style: { position: 'absolute', left: 0, top: 0, display: 'block', maxWidth: 'none' },
            dangerouslySetInnerHTML: { __html: bandTitleSvg() } }, aria)),
          h('h1', { 'data-fit': 'none', style: st(TXT, { position: 'relative', width: r2((BAND.HALF * 2 + 40) * 4 / 3) + 'px', fontFamily: SERIF, fontSize: r2(BAND.FS * 4 / 3) + 'px', lineHeight: 1.03, fontWeight: 420, letterSpacing: 0, color: C.onAccent, textAlign: 'center' }) }, title),
          p.subtitle ? h('p', { style: st(TXT, { position: 'relative', marginTop: r2(20 * 4 / 3) + 'px', fontFamily: SANS, fontSize: '24px', lineHeight: 1.4, fontWeight: 900, color: C.blue, textAlign: 'center' }) }, p.subtitle) : null),
        p.children || h('div', { style: st(COL, { position: 'absolute', left: '128px', right: '128px', top: '400px', height: '432px', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '20px' }) },
          eyebrow,
          p.speakers ? h('p', { style: st(TXT, { fontFamily: SANS, fontSize: '48px', lineHeight: 1.2, fontWeight: 700, color: C.heading }) }, p.speakers) : null,
          p.venue ? h('p', { style: T.lead }, p.venue) : null),
        list(p.logos).length ? logoRow(list(p.logos)) : null);
    }
    /* function replacers: a $& or $1 in the URL or the label must land as written, not as a replacement pattern */
    var mark = p.markSrc ? SLIDE_COVER_NETWORK.replace('@@MARK_SRC@@', function () { return escapeHtml(p.markSrc); }) : SLIDE_COVER_NETWORK.replace(/<image [^>]*\/>/, '');
    var svgOpen = '<svg ' + (p.bandLabel ? 'role="img" aria-label="' + escapeHtml(p.bandLabel) + '"' : 'aria-hidden="true"') + ' style="display:block;max-width:none" ';
    var deep = SLIDE_COVER_NETWORK.match(/height="([\d.]+)"/)[1];
    var speakerLine = [p.speakers, p.venue].filter(Boolean).join(' · ');
    /* the slide format caps padding at 256px, so the rest of the 416px sits on the title block */
    return h('section', { style: section({ padding: '256px 128px 128px', justifyContent: 'space-between', gap: '24px' }) },
      h('div', { 'data-band': 'network', style: { position: 'absolute', left: 0, top: 0, width: '1920px', height: deep + 'px' },
        dangerouslySetInnerHTML: { __html: mark.replace('<svg ', function () { return svgOpen; }) } }),
      p.children || h('div', { style: st(COL, { position: 'relative', gap: '24px', paddingTop: '160px' }) },
        eyebrow,
        h('h1', { 'data-fit': 'none', style: st(T.display, { width: '1500px' }) }, title),
        p.subtitle ? h('p', { style: st(T.lead, { width: '1400px' }) }, p.subtitle) : null),
      speakerLine ? h('p', { style: st(TXT, { position: 'relative', fontFamily: SANS, fontSize: '28px', lineHeight: 1.3, fontWeight: 700, color: C.heading }) }, speakerLine) : null);
  }

  /* the cards hang from one blue line: it starts at a ring node 48px into the left margin, a blue node sits over
     each card's first 64px (its icon), and it ends at a ring node on the right margin */
  function cardLine(n) {
    var col = (WIDE - 24 * (n - 1)) / n, nodes = [];
    for (var i = 0; i < n; i++) nodes.push(dot(i, Math.round(i * (col + 24) + 32), 12, 10, C.blue));
    return h('svg', { width: WIDE + 72, height: 24, viewBox: '-60 0 ' + (WIDE + 72) + ' 24', 'aria-hidden': 'true', style: { position: 'absolute', left: '-60px', top: 0, display: 'block', maxWidth: 'none' } },
      h('path', { d: 'M-48 12 H' + WIDE, fill: 'none', stroke: C.blue, strokeWidth: 3 }),
      dot('s', -48, 12, 8, C.surface, C.blue),
      dot('e', WIDE, 12, 8, C.surface, C.blue),
      nodes);
  }

  /* A row of cards hanging from cardLine: each a 64px picture, an optional eyebrow, the title in the serif at 48px and
     an optional line of body. The picture and the title carry a card; the body is off by default (minimal text). */
  function cardRow(cards) {
    return h('div', { style: { position: 'relative', paddingTop: '40px' } },
      cardLine(cards.length),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + cards.length + ', 1fr)', gap: '24px' } }, cards.map(function (c, i) {
        return h('div', { key: i, style: st(COL, { gap: '12px', padding: '0 32px 0 0' }) },
          c.iconSrc ? h('img', { src: c.iconSrc, alt: c.iconAlt || '', style: { width: '64px', height: '64px', objectFit: 'contain', display: 'block', marginBottom: '12px' } }) : null,
          c.eyebrow ? h('p', { style: st(T.eyebrow, { color: C.muted }) }, c.eyebrow) : null,
          h('h3', { style: T.heading }, c.title),
          c.body ? h('p', { style: T.body }, c.body) : null);
      })));
  }

  /* the body sits in the middle of the space under the title block, so a slide of few words is not top-heavy */
  function SlideFrame(p) {
    var cards = list(p.cards), panel = list(p.panel), gap = p.gap || '48px';
    return h('section', { style: section({ gap: gap }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: st(COL, { flex: 1, justifyContent: 'center', gap: gap }) },
        cards.length ? cardRow(cards) : null,
        p.children,
        panel.length ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + panel.length + ', 1fr)', background: C.surface, border: HAIR } }, panel.map(function (col, i) {
          return h('div', { key: i, style: st(COL, { gap: '12px', padding: '32px 40px', borderLeft: i ? HAIR : 'none' }) },
            col.eyebrow ? h('p', { style: st(T.eyebrow, { color: C.muted }) }, col.eyebrow) : null,
            h('p', { style: T.body }, col.text));
        })) : null),
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  function SlidePlan(p) {
    return h('section', { style: section({ justifyContent: 'center', gap: '64px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h(SlideRail, { stops: p.stops, numbered: true }),
      h(SlideFooter, { number: p.number }));
  }

  function SlideSectionStop(p) {
    return h('section', { style: section({ gap: '32px' }) },
      h(SlideHead, { eyebrow: p.part, heading: p.heading }),
      h('div', { style: st(ROW, { flex: 1, gap: '48px', alignItems: 'center' }) },
        h('p', { style: st(T.numeral, { width: '300px', flex: 'none' }) }, p.stepNumber),
        p.sentence ? h('p', { style: st(T.heading, { flex: 1 }) }, p.sentence) : null),
      h(SlideRail, { stops: p.stops, current: p.current || 0, step: true }),
      h(SlideFooter, { number: p.number }));
  }

  /* The content slides' new look (the spec's "Extended by Claude"): white surfaces, square corners, 2px border
     hairlines, text-muted eyebrows, blue as the one working colour, coral and yellow only as small spots. Their
     text is Nunito Sans, as the footer row's is. */
  var ITEM = T.item, LABEL = T.label;
  var MUTED_EYEBROW = st(T.eyebrow, { color: C.muted });
  /* a small coloured disc: the one place coral and yellow appear on a content slide */
  function spot(color, size) {
    return h('span', { 'aria-hidden': 'true', style: { display: 'inline-block', flex: 'none', width: (size || 14) + 'px', height: (size || 14) + 'px', borderRadius: '50%', background: color } });
  }

  function SlideBuild(p) {
    var steps = list(p.steps), rows = list(p.rows), cols = p.columns || {};
    var shown = p.shown == null ? rows.length : p.shown;
    var cur = p.current == null ? shown - 1 : p.current;
    /* the argued-for cell is marked by a 3px blue rule on its left, as the slide's line is drawn, not by a tint */
    function cell(c, argued) {
      return h('div', { style: st(COL, { gap: '8px', padding: argued ? '8px 24px' : '8px 0', borderLeft: argued ? '3px solid ' + C.blue : 'none' }) },
        h('p', { style: T.heading }, c.title),
        c.text ? h('p', { style: st(T.small, { color: C.muted }) }, c.text) : null);
    }
    /* a cell is a word or two in the serif at 48px: sized so four rows of one-line cells and the step line fit the
       816px flow at the last step (about 725px); 240px holds a two-word label ("NOT ASKABLE") on one line, rows are
       padded 16px, cells 8px, and the label drops 22px so it sits level with the cell's first line */
    var GRID = { display: 'grid', gridTemplateColumns: '240px 1fr 1fr', gap: '24px' };
    return h('section', { style: section({ gap: '32px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      steps.length ? h(SlideRail, { stops: steps.map(function (label, i) { return (i + 1) + ' · ' + label; }), current: cur }) : null,
      h('div', { style: COL },
        h('div', { style: st(GRID, { alignItems: 'end', paddingBottom: '12px', borderBottom: HAIR }) },
          h('div', null),
          h('p', { style: MUTED_EYEBROW }, cols.left),
          h('p', { style: T.eyebrow }, cols.right)),
        rows.slice(0, shown).map(function (r, i) {
          return h('div', { key: i, style: st(GRID, { alignItems: 'start', padding: '16px 0', borderTop: i ? HAIR : 'none', opacity: i < shown - 1 ? 0.35 : 1 }) },
            /* a coral row's spot hangs 12px left of its label, in the margin, so the label keeps the column's width */
            h('p', { style: st(MUTED_EYEBROW, { position: 'relative', paddingTop: '22px' }) },
              r.tone === 'coral' ? h('span', { style: { position: 'absolute', left: '-26px', top: '29px', display: 'flex' } }, spot(C.coral)) : null, r.label),
            cell(r.left || {}, false), cell(r.right || {}, true));
        })),
      p.children,
      h(SlideFooter, { number: p.number }));
  }

  /* the tiles sit in columns divided by 2px hairlines, in the middle of the space under the title block; the list
     they summarise, when given, sits under one */
  function SlideStats(p) {
    var tiles = list(p.tiles), panel = list(p.panel);
    return h('section', { style: section({ gap: '48px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: st(COL, { flex: 1, justifyContent: 'center', gap: '48px' }) },
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + (tiles.length || 1) + ', 1fr)' } }, tiles.map(function (t, i) {
        var series = list(t.series), max = series.length ? Math.max.apply(null, series.map(function (s) { return s.value; })) : 1;
        return h('div', { key: i, style: st(COL, { gap: '12px', padding: i ? '0 32px' : '0 32px 0 0', borderLeft: i ? HAIR : 'none' }) },
          t.value != null ? h('p', { style: T.stat }, t.value) : null,
          t.label ? h('p', { style: st(T.small, { lineHeight: 1.3, color: C.muted }) }, t.label) : null,
          series.length ? h('div', { style: st(ROW, { alignItems: 'flex-end', gap: '12px', paddingTop: '16px' }) }, series.map(function (s, j) {
            return h('div', { key: j, style: st(COL, { flex: 1, alignItems: 'center', gap: '4px' }) },
              h('p', { style: st(LABEL, { fontWeight: 800, color: C.heading }) }, s.value),
              h('div', { style: { width: '48px', height: Math.max(2, Math.round(160 * s.value / max)) + 'px', background: C.blue } }),
              h('p', { style: st(T.small, { color: C.muted }) }, s.label));
          })) : null,
          t.marks ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(6, 48px)', gap: '12px', paddingTop: '16px' } }, list(t.marks).map(function (m, j) {
            return h('img', { key: j, src: m.src, alt: m.alt || '', style: { width: '48px', height: '48px', objectFit: 'contain', display: 'block' } });
          })) : null);
      })),
      panel.length ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + panel.length + ', 1fr)', gap: '32px', paddingTop: '32px', borderTop: HAIR } }, panel.map(function (col, i) {
        return h('div', { key: i, style: st(COL, { gap: '8px' }) },
          h('p', { style: ITEM }, col.title),
          list(col.items).map(function (it, j) { return h('p', { key: j, style: T.small }, it); }));
      })) : null,
      p.children),
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  /* A funnel and a meter side by side, or either alone. Alone, a form takes the slide's width and height: the bars
     and the meter grow so the drawing carries the point and the words can stay few. */
  function SlideFunnel(p) {
    var f = p.funnel, m = p.meter, both = !!(f && m);
    var stages = f ? list(f.stages) : [];
    /* the last bar is the coral spot when it marks the point; markLast: false keeps every bar blue */
    var mark = f && f.markLast !== false && stages.length > 1;
    var BAR = both ? { h: 26, w: 400 } : { h: 64, w: 1100 };
    var PCT = st(LABEL, { fontWeight: 800, color: C.heading }, both ? null : { fontSize: '36px' });
    /* alone, the meter's labels are slide-item size (28px), as its boxes are */
    var FILL = st(LABEL, { fontWeight: 800 }, both ? null : { fontSize: '28px' });
    function meterBox(o) {
      var centre = { justifyContent: 'center', alignItems: 'center' };
      if (o.fill === 'all') return h('div', { style: st(COL, centre, { flex: 1, background: C.blue }) },
        h('p', { style: st(FILL, { color: C.onAccent, textAlign: 'center' }) }, o.fillLabel));
      if (o.fill === 'promise') return h('div', { style: st(COL, centre, { flex: 1, padding: '0 12px', border: '3px dashed ' + C.blue }) },
        h('p', { style: st(FILL, { color: C.blue, textAlign: 'center' }) }, o.fillLabel));
      return h('div', { style: st(COL, centre, { height: both ? '28px' : '56px', background: C.blue }) },
        h('p', { style: st(FILL, { color: C.onAccent }) }, o.fillLabel));
    }
    return h('section', { style: section({ gap: '40px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: { flex: both ? 'none' : 1, display: 'grid', gridTemplateColumns: both ? '1fr 1.4fr' : '1fr', gap: '24px' } },
        f ? h('div', { style: st(COL, { gap: both ? '16px' : '32px', justifyContent: both ? 'flex-start' : 'center', background: C.surface, border: HAIR, padding: both ? '32px' : '48px' }) },
          f.eyebrow ? h('p', { style: MUTED_EYEBROW }, f.eyebrow) : null,
          f.base ? h('p', { style: st(T.small, { color: C.muted }) }, f.base) : null,
          h('div', { style: st(COL, { gap: both ? '16px' : '32px' }) }, stages.map(function (s, i) {
            return h('div', { key: i, style: both ? st(COL, { gap: '8px' }) : st(ROW, { alignItems: 'center', gap: '24px' }) },
              h('p', { style: both ? st(T.small, { color: C.heading }) : st(ITEM, { width: '240px', flex: 'none' }) }, s.label),
              h('div', { style: st(ROW, { alignItems: 'center', gap: '16px' }) },
                h('div', { style: { height: BAR.h + 'px', width: Math.round(BAR.w * s.pct / (stages[0].pct || 1)) + 'px', background: mark && i === stages.length - 1 ? C.coral : C.blue } }),
                h('p', { style: PCT }, s.pct + '%')));
          })),
          f.note ? h('p', { style: T.small }, f.note) : null) : null,
        m ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + list(m.options).length + ', 1fr)', gap: both ? '16px' : '24px' } }, list(m.options).map(function (o, i) {
          return h('div', { key: i, style: st(COL, { gap: '16px', background: C.surface, border: o.recommended ? '2px solid ' + C.blue : HAIR, padding: '24px' }) },
            h('p', { style: o.recommended ? T.eyebrow : MUTED_EYEBROW }, o.eyebrow),
            h('div', { style: st(COL, { height: both ? '180px' : 'auto', flex: both ? 'none' : 1, boxSizing: 'border-box', background: C.surface, border: HAIR, justifyContent: 'flex-end' }) }, meterBox(o)),
            o.text ? h('p', { style: T.small }, o.text) : null);
        })) : null),
      p.children,
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  /* The steps hang on a vertical blue line with a filled node at each title, spread down the window's height: the
     line counts them, so they carry no numerals. The window fills the height under the title block; its bars grow
     into whatever its title, tabs and captions leave. */
  function SlideWindow(p) {
    var steps = list(p.steps), w = p.window || {}, bars = list(w.bars);
    var max = bars.length ? Math.max.apply(null, bars.map(function (b) { return b.value; })) : 1;
    var labelled = bars.some(function (b) { return b.label; });
    var pill = { padding: '4px 16px', border: HAIR };
    /* the node sits on the title's first line: 36px serif at 1.15, so its middle is 21px down */
    var NODE = 21;
    function rail(i) {
      var seg = { position: 'absolute', left: '10px', width: '3px', background: C.blue };
      return h('div', { style: { position: 'relative', width: '24px', flex: 'none', alignSelf: 'stretch' } },
        i ? h('div', { style: st(seg, { top: 0, height: NODE + 'px' }) }) : null,
        i < steps.length - 1 ? h('div', { style: st(seg, { top: NODE + 'px', bottom: 0 }) }) : null,
        h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': 'true', style: { position: 'absolute', left: 0, top: (NODE - 12) + 'px', display: 'block', maxWidth: 'none' } },
          dot('n', 11.5, 12, 11, C.blue)));
    }
    return h('section', { style: section({ gap: '40px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      /* 24px more above (64px under the title block) and 24px clear above the bottom margin, 64px over the footer */
      h('div', { style: st(ROW, { flex: 1, minHeight: 0, gap: '48px', alignItems: 'stretch', margin: '24px 0' }) },
        h('div', { style: st(COL, { width: '520px', flex: 'none' }) },
          steps.map(function (s, i) {
            return h('div', { key: i, style: st(ROW, { flex: i < steps.length - 1 ? 1 : 'none', gap: '24px', alignItems: 'flex-start' }) },
              rail(i),
              h('div', { style: st(COL, { gap: '8px', flex: 1, paddingBottom: i < steps.length - 1 ? '32px' : 0 }) },
                h('p', { style: T.subheading }, s.title),
                s.text ? h('p', { style: T.small }, s.text) : null));
          }),
          p.link ? h('p', { style: st(LABEL, { color: C.blue, paddingTop: '32px' }) }, p.link + ' →') : null),
        h('div', { style: st(COL, { flex: 1, background: C.surface, border: HAIR, overflow: 'hidden' }) },
          h('div', { style: st(ROW, { gap: '12px', alignItems: 'center', padding: '12px 16px', borderBottom: HAIR }) },
            [0, 1, 2].map(function (i) { return h('div', { key: i, style: { width: '14px', height: '14px', borderRadius: '50%', background: C.border, flex: 'none' } }); }),
            h('p', { style: st(T.small, pill, { color: C.muted, flex: 1 }) }, w.url)),
          w.imageSrc ? h('img', { src: w.imageSrc, alt: w.imageAlt || '', style: { width: '100%', display: 'block' } })
            : h('div', { style: st(COL, { flex: 1, gap: '16px', padding: '24px 32px 32px' }) },
              w.title || w.tabs ? h('div', { style: st(ROW, { justifyContent: 'space-between', alignItems: 'center' }) },
                h('p', { style: ITEM }, w.title),
                w.tabs ? h('div', { style: st(ROW, { gap: '8px' }) }, list(w.tabs).map(function (t, i) {
                  return h('p', { key: i, style: st(LABEL, pill, t.active ? { color: C.onAccent, background: C.blue, border: '2px solid ' + C.blue } : { color: C.heading }) }, t.label);
                })) : null) : null,
              w.stat ? h('p', { style: st(T.small, { color: C.muted }) }, w.stat) : null,
              w.chartLabel ? h('p', { style: st(T.small, { paddingTop: '8px' }) }, w.chartLabel) : null,
              bars.length ? h('div', { style: st(ROW, { flex: 1, minHeight: '150px', alignItems: 'flex-end', gap: '8px', paddingTop: '16px' }) }, bars.map(function (b, i) {
                return h('div', { key: i, style: { flex: 1, height: Math.max(1, Math.round(100 * b.value / max)) + '%', background: C.blue } });
              })) : null,
              bars.length ? h('div', { style: { height: '2px', flex: 'none', background: C.borderStrong } }) : null,
              labelled ? h('div', { style: st(ROW, { gap: '8px' }) }, bars.map(function (b, i) {
                return h('p', { key: i, style: st(T.small, { flex: 1, textAlign: 'center', color: C.muted }) }, b.label);
              })) : null))),
      p.caption ? h('p', { style: st(T.small, { color: C.muted }) }, p.caption) : null,
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  /* The questions hang from the cards' line, one node each, in the serif, in the middle of the slide: the slide puts
     them to the audience and nothing else competes. A row's problem (an eyebrow over the question) and change (a line
     under it), and the cases and the credit, are there when a deck needs them; the contact row is the footer row. */
  function SlideQuestions(p) {
    var rows = list(p.rows), cases = list(p.cases), logos = list(p.logos);
    var SPOT = { coral: C.coral, yellow: C.yellow, blue: C.blue };
    return h('section', { style: section({ padding: '128px', gap: '48px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: st(COL, { flex: 1, justifyContent: 'center', gap: '48px' }) },
        rows.length ? cardRow(rows.map(function (r) { return { eyebrow: r.problem, title: r.question, body: r.change }; })) : null,
        cases.length ? h('div', { style: st(COL, { gap: '12px' }) },
          p.casesLabel ? h('p', { style: MUTED_EYEBROW }, p.casesLabel) : null,
          h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + cases.length + ', 1fr)', gap: '24px' } }, cases.map(function (c, i) {
            return h('div', { key: i, style: st(COL, { gap: '8px', background: C.surface, border: HAIR, padding: '24px 32px' }) },
              h('div', { style: st(ROW, { gap: '12px', alignItems: 'center' }) },
                spot(SPOT[c.tint] || (i % 2 ? C.yellow : C.blue)),
                h('p', { style: st(ITEM, { lineHeight: 1.25 }) }, c.title)),
              c.text ? h('p', { style: T.small }, c.text) : null);
          }))) : null),
      /* the contact row is this slide's footer row: the email address and the site are uncounted, the credit counts */
      h('div', { style: st(ROW, { justifyContent: 'space-between', alignItems: 'center' }) },
        h('div', { style: st(ROW, { gap: '32px', alignItems: 'center' }) },
          p.email ? h('p', st(UNCOUNTED, { style: st(ITEM, { color: C.blue }) }), 'Email ' + p.email + ' →') : null,
          h('p', st(UNCOUNTED, { style: ITEM }), p.site || 'datadonation.eu')),
        h('div', { style: st(ROW, { gap: '24px', alignItems: 'center' }) },
          p.credit ? h('p', { style: st(T.small, { color: C.muted }) }, p.credit) : null,
          logos.map(function (l, i) { return h('img', { key: i, src: l.src, alt: l.alt || '', style: { width: (l.width || 120) + 'px', height: '44px', objectFit: 'contain', display: 'block' } }); }))));
  }

  /* A slide as a markup string, for a Slides deck: renders the component into a detached element with the
     page's ReactDOM 18 and returns its HTML (one <section>, inline styles with hex colours, data-fit kept). */
  function slideMarkup(Comp, props) {
    var RD = window.ReactDOM;
    if (!RD || !RD.createRoot || !RD.flushSync) throw new Error('D3I.slideMarkup needs ReactDOM 18 on window.ReactDOM');
    var box = document.createElement('div');
    var root = RD.createRoot(box);
    RD.flushSync(function () { root.render(h(Comp, props || {})); });
    var html = box.innerHTML;
    root.unmount();
    /* the browser writes colours as rgb(); the Slides format takes hex */
    return html.replace(/rgb\((\d+), (\d+), (\d+)\)/g, function (m, r, g, b) {
      return '#' + [r, g, b].map(function (n) { var x = (+n).toString(16); return x.length < 2 ? '0' + x : x; }).join('');
    });
  }

  /* export ------------------------------------------------------------------- */

  var api = {
    SiteHeader: SiteHeader,
    SectionSubnav: SectionSubnav,
    SiteFooter: SiteFooter,
    FrontPage: FrontPage,
    Band: Band,
    Note: Note,
    ArrowDisc: ArrowDisc,
    Link: Link,
    HomeCard: HomeCard,
    ListRow: ListRow,
    ActionLink: ActionLink,
    ContactBlock: ContactBlock,
    Postit: Postit,
    Callout: Callout,
    NewsCard: NewsCard,
    ArchiveCard: ArchiveCard,
    InstitutionCard: InstitutionCard,
    ProjectCard: ProjectCard,
    PeopleGrid: PeopleGrid,
    PageIntro: PageIntro,
    SidebarPanel: SidebarPanel,
    TableOfContents: TableOfContents,
    Routes: Routes,
    JourneyNext: JourneyNext,
    HubStep: HubStep,
    Prose: Prose,
    Figure: Figure,
    NewsArticle: NewsArticle,
    EventDetails: EventDetails,
    UsageFigures: UsageFigures,
    SlideCover: SlideCover,
    SlideFrame: SlideFrame,
    SlidePlan: SlidePlan,
    SlideSectionStop: SlideSectionStop,
    SlideBuild: SlideBuild,
    SlideStats: SlideStats,
    SlideFunnel: SlideFunnel,
    SlideWindow: SlideWindow,
    SlideQuestions: SlideQuestions,
    slideMarkup: slideMarkup
  };
  var ns = window.D3I || (window.D3I = {});
  for (var k in api) ns[k] = api[k];
})();
