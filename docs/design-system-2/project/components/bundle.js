/* @ds-bundle: {"format":4,"namespace":"D3I","components":[{"name":"SiteHeader"},{"name":"SectionSubnav"},{"name":"SiteFooter"},{"name":"HomepageHero"},{"name":"ActionLink"},{"name":"ContactBlock"},{"name":"Postit"},{"name":"Callout"},{"name":"NewsCard"},{"name":"ArchiveCard"},{"name":"MovementCard"},{"name":"InstitutionCard"},{"name":"ProjectCard"},{"name":"PeopleGrid"},{"name":"PageIntro"},{"name":"SidebarPanel"},{"name":"TableOfContents"},{"name":"Routes"},{"name":"JourneyNext"},{"name":"HubStep"},{"name":"Prose"},{"name":"Figure"},{"name":"EventDetails"},{"name":"UsageFigures"},{"name":"SlideCover"},{"name":"SlideFrame"},{"name":"SlidePlan"},{"name":"SlideSectionStop"},{"name":"SlideBuild"},{"name":"SlideStats"},{"name":"SlideFunnel"},{"name":"SlideWindow"},{"name":"SlideQuestions"}]} */
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
  /* the arrow every action link ends with; the label never carries it */
  function arrow() {
    return h('span', { 'aria-hidden': 'true' }, '→');
  }
  function list(v) {
    return Array.isArray(v) ? v : [];
  }
  function pad2(n) {
    var s = String(n);
    return s.length < 2 ? '0' + s : s;
  }

  var ACCENT_TEXT = {
    primary: 'var(--blue)',
    secondary: 'var(--coral)',
    tertiary: 'var(--yellow-text)'
  };
  var ACCENT_TINT = {
    primary: 'var(--blue-tint)',
    secondary: 'var(--coral-tint)',
    tertiary: 'var(--yellow-tint)'
  };

  /* Actions --------------------------------------------------------------- */

  function ActionLink(p) {
    var variant = p.variant || 'section';
    var attrs = Object.assign(rest(p, ['href', 'external', 'variant', 'accent', 'className', 'style']), linkAttrs(p.href, p.external));
    if (variant === 'accent') {
      attrs.className = cx('movement-card__link', p.className);
      attrs.style = Object.assign({ color: ACCENT_TEXT[p.accent || 'primary'] }, p.style);
      return h('a', attrs, p.children, ' →');
    }
    attrs.className = cx(variant === 'compact' ? 'cta-link' : 'section-cta', p.className);
    if (p.style) attrs.style = p.style;
    return h('a', attrs, p.children, ' ', arrow());
  }

  function ContactBlock(p) {
    var subject = p.subject ? '?subject=' + encodeURIComponent(p.subject) : '';
    var email = h('p', { className: 'contact-cta__email' },
      h('a', { href: 'mailto:' + p.email + subject }, p.emailLabel || 'Email ' + p.email));
    var lead = h('p', { className: 'contact-cta__lead' }, p.lead);
    var topics = list(p.topics);
    var attrs = rest(p, ['lead', 'email', 'subject', 'emailLabel', 'intro', 'topics', 'constrained', 'className']);
    if (topics.length === 0) {
      attrs.className = cx('contact-cta', 'contact-cta--centered', p.constrained && 'contact-cta--constrained', p.className);
      return h('section', attrs, lead, email);
    }
    attrs.className = cx('contact-cta', p.constrained && 'contact-cta--constrained', p.className);
    return h('section', attrs,
      h('div', { className: 'contact-cta__row' },
        h('div', { className: 'contact-cta__left' }, lead, email),
        h('div', { className: 'contact-cta__topics' },
          p.intro ? h('p', { className: 'contact-cta__intro' }, p.intro) : null,
          h('ul', null, topics.map(function (t, i) { return h('li', { key: i }, t); })))));
  }

  /* Notes ------------------------------------------------------------------ */

  function Postit(p) {
    var body = p.body != null ? p.body : p.children;
    var attrs = rest(p, ['eyebrow', 'title', 'body', 'link', 'inline', 'className']);
    attrs.className = cx('postit', p.inline && 'postit--inline', p.className);
    return h('aside', attrs,
      h('p', { className: 'postit__eyebrow' }, p.eyebrow || 'Updates'),
      h('h3', { className: 'postit__title' }, p.title),
      body != null ? h('p', { className: 'postit__body' }, body) : null,
      p.link ? h('a', Object.assign({ className: 'postit__link' }, linkAttrs(p.link.href, p.link.external)), p.link.label) : null);
  }

  function Callout(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('callout', p.className);
    return h('div', attrs, h('p', null, p.children));
  }

  /* Cards ------------------------------------------------------------------ */

  function newsAccent(p) {
    if (p.accent === 0 || p.accent === 1 || p.accent === 2) return p.accent;
    return String(p.title || '').length % 3;
  }
  function NewsCard(p) {
    var link = linkAttrs(p.href, p.external);
    var attrs = rest(p, ['title', 'href', 'external', 'date', 'summary', 'image', 'accent', 'variant', 'linkLabel', 'className']);
    attrs.className = cx('news-card', p.variant === 'row' && 'news-card--row', p.className);
    return h('article', attrs,
      h('a', Object.assign({ className: 'news-card__media news-card__media--accent-' + newsAccent(p), tabIndex: -1, 'aria-hidden': 'true' }, link),
        p.image ? h('img', { src: p.image.src, alt: p.image.alt || '' }) : null),
      h('div', { className: 'news-card__body' },
        h('h3', { className: 'news-card__title' }, h('a', link, p.title)),
        p.date ? h('p', { className: 'news-card__date' }, p.date) : null,
        p.summary ? h('p', { className: 'news-card__summary' }, p.summary) : null,
        h('a', Object.assign({ className: 'cta-link news-card__link' }, link), p.linkLabel || 'Read more', ' ', arrow())));
  }
  NewsCard.Grid = function NewsCardGrid(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('news-grid', p.className);
    return h('div', attrs, p.children);
  };
  NewsCard.List = function NewsCardList(p) {
    var attrs = rest(p, ['className']);
    attrs.className = cx('news-list', p.className);
    return h('div', attrs, p.children);
  };
  NewsCard.Band = function NewsCardBand(p) {
    var attrs = rest(p, ['title', 'moreLink', 'className']);
    attrs.className = cx('home-news', p.className);
    return h('section', attrs,
      h('div', { className: 'home-news__inner' },
        h('div', { className: 'home-news__header' },
          h('h2', { className: 'home-news__title' }, p.title || 'Latest news'),
          p.moreLink ? h('a', Object.assign({ className: 'cta-link' }, linkAttrs(p.moreLink.href, p.moreLink.external)), p.moreLink.label, ' ', arrow()) : null),
        h('div', { className: 'news-carousel' }, h('div', { className: 'news-grid' }, p.children))));
  };

  function ArchiveCard(p) {
    var actions = list(p.actions);
    if (p.href) actions = [{ label: p.hrefLabel || 'View details', href: p.href, external: p.external }].concat(actions);
    var meta = [p.date, p.location].filter(Boolean).join(' · ');
    var details = list(p.details);
    var attrs = rest(p, ['title', 'date', 'location', 'summary', 'details', 'actions', 'href', 'hrefLabel', 'external', 'featured', 'className']);
    attrs.className = cx('archive-card', p.featured && 'archive-card--featured', p.className);
    return h('article', attrs,
      h('div', { className: 'archive-card__content' },
        h('h3', { className: 'archive-card__title' }, p.title),
        meta ? h('p', { className: 'archive-card__meta' }, meta) : null,
        p.summary ? h('p', { className: 'archive-card__summary' }, p.summary) : null,
        details.length > 0 ? h('dl', { className: 'archive-card__details' }, details.map(function (d, i) {
          return h('div', { className: 'archive-card__detail', key: i }, h('dt', null, d.label), h('dd', null, d.value));
        })) : null),
      actions.length > 0 ? h('div', { className: 'archive-card__actions' }, actions.map(function (a, i) {
        return h('a', Object.assign({ className: 'cta-link', key: i }, linkAttrs(a.href, a.external)), a.label, ' ', arrow());
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

  function MovementCard(p) {
    var accent = p.accent || 'primary';
    var color = ACCENT_TEXT[accent];
    var attrs = rest(p, ['eyebrow', 'heading', 'body', 'image', 'link', 'accent', 'className']);
    attrs.className = cx('movement-card', p.className);
    return h('article', attrs,
      h('div', { className: 'movement-card__figure', style: { background: ACCENT_TINT[accent] } },
        p.image ? h('img', { src: p.image.src, alt: p.image.alt || '' }) : null),
      h('div', { className: 'movement-card__text' },
        p.eyebrow ? h('span', { className: 'movement-card__eyebrow', style: { color: color } }, p.eyebrow) : null,
        h('h2', { className: 'movement-card__heading' }, p.heading),
        p.body ? h('p', { className: 'movement-card__body' }, p.body) : null,
        p.link ? h('a', Object.assign({ className: 'movement-card__link', style: { color: color } }, linkAttrs(p.link.href, p.link.external)), p.link.label, ' →') : null));
  }
  MovementCard.Group = function MovementCardGroup(p) {
    var R_ = R();
    var items = R_.Children.toArray(p.children);
    var active = Math.max(0, Math.min(items.length - 1, p.active || 0));
    var carousel = { className: cx('movements-carousel', p.wide && 'is-enhanced') };
    var track = { className: 'movements-carousel__track' };
    if (p.wide) {
      carousel.style = { '--slide-basis': '100%' };
      if (active > 0) track.style = { transform: 'translateX(' + (-100 * active) + '%)' };
    }
    var attrs = rest(p, ['wide', 'active', 'className']);
    attrs.className = cx('homepage-stops', p.className);
    return h('section', attrs,
      h('div', carousel,
        h('div', { className: 'movements-carousel__viewport' },
          h('div', track, items.map(function (c, i) {
            return h('div', { className: 'movements-carousel__slide', key: i, 'aria-hidden': p.wide && i !== active ? 'true' : undefined }, c);
          })))));
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
  function ProjectCard(p) {
    var inv = list(p.investigators);
    var details = list(p.details);
    var refs = list(p.references);
    var attrs = rest(p, ['title', 'image', 'investigators', 'institution', 'summary', 'details', 'references', 'referencesLabel', 'className']);
    attrs.className = cx('project-card', p.className);
    var invLine = inv.length > 0 || p.institution
      ? h.apply(null, ['p', { className: 'project-card__investigators' }].concat(joinNames(inv), p.institution ? [(inv.length ? ', ' : '') + p.institution] : []))
      : null;
    return h('article', attrs,
      h('h3', { className: 'project-card__title' }, p.title),
      p.image ? h('img', { className: 'project-card__image', src: p.image.src, alt: p.image.alt || '' }) : null,
      invLine,
      p.summary ? h('p', { className: 'project-card__summary' }, p.summary) : null,
      details.length > 0 ? h.apply(null, ['dl', { className: 'project-card__details' }].concat(details.map(function (d, i) {
        return frag(h('dt', { key: 't' + i }, d.label), h('dd', { key: 'd' + i }, d.value));
      }))) : null,
      refs.length > 0 ? h('details', { className: 'project-card__refs' },
        h('summary', null, p.referencesLabel || 'References'),
        h('ul', null, refs.map(function (r, i) { return h('li', { key: i }, r); }))) : null);
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
            return h('a', Object.assign({ className: 'cta-link', key: i }, linkAttrs(a.href, a.external)), a.label, ' ', arrow());
          })) : null)));
  }

  function SidebarPanel(p) {
    var attrs = rest(p, ['title', 'href', 'items', 'label', 'className']);
    attrs.className = cx('section-nav', 'sidebar-panel', p.className);
    attrs['aria-label'] = p.label || (typeof p.title === 'string' ? p.title : undefined);
    return h('nav', attrs,
      h('ul', { className: 'section-nav__list' },
        h('li', { className: 'section-nav__item section-nav__item--parent' },
          h('a', { className: 'section-nav__heading sidebar-panel__title', href: p.href }, p.title),
          h('div', { className: 'sidebar-panel__body' },
            h('ul', { className: 'section-nav__children' }, list(p.items).map(function (it, i) {
              var subs = list(it.sections);
              return h('li', { className: 'section-nav__child', key: i },
                h('a', { className: cx('section-nav__link', 'sidebar-panel__link', it.active && 'is-active'), href: it.href }, it.label),
                subs.length > 0 ? h('ul', { className: 'section-nav__grandchildren' }, subs.map(function (s, j) {
                  return h('li', { className: 'section-nav__grandchild', key: j }, h('a', { className: 'section-nav__sublink', href: s.href }, s.label));
                })) : null);
            }))))));
  }

  function TableOfContents(p) {
    var attrs = rest(p, ['title', 'items', 'className']);
    var title = p.title || 'Contents';
    attrs.className = cx('content-page__toc', p.className);
    attrs['aria-label'] = typeof title === 'string' ? title : 'Contents';
    return h('nav', attrs,
      h('p', { className: 'content-page__toc-title' }, title),
      h('ul', { className: 'toc__menu content-page__toc-list' }, list(p.items).map(function (it, i) {
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
              s.link ? h('a', Object.assign({ className: 'section-cta route__step-link' }, linkAttrs(s.link.href, s.link.external)), s.link.label, ' ', arrow()) : null);
          })));
      })),
      attribution ? h('p', { className: 'routes__attribution' }, attribution) : null);
  }

  function JourneyNext(p) {
    var id = R().useId();
    var labelId = 'journey-next-label' + id.replace(/:/g, '');
    var attrs = rest(p, ['number', 'title', 'body', 'link', 'after', 'label', 'className']);
    attrs.className = cx('journey-next', p.className);
    attrs['aria-labelledby'] = labelId;
    var after = p.after;
    return h('aside', attrs,
      h('p', { className: 'journey-next__label', id: labelId }, p.label || 'Next step'),
      h('div', { className: 'journey-next__step' },
        h('span', { className: 'journey-next__number', 'aria-hidden': 'true' }, p.number),
        h('div', { className: 'journey-next__text' },
          h('h2', { className: 'journey-next__title' }, p.title),
          p.body ? h('p', { className: 'journey-next__body' }, p.body) : null,
          p.link ? h('a', Object.assign({ className: 'section-cta journey-next__link' }, linkAttrs(p.link.href, p.link.external)), p.link.label, ' ', arrow()) : null,
          after ? h('p', { className: 'journey-next__after' }, 'After that: ',
            h('span', { className: 'journey-next__after-number' }, after.number), ' ',
            h('a', { href: after.href }, after.title)) : null)));
  }

  function HubStep(p) {
    var attrs = rest(p, ['number', 'title', 'body', 'image', 'link', 'side', 'className']);
    attrs.className = cx('hub__movement', p.side === 'right' ? 'hub__movement--right' : 'hub__movement--left', p.className);
    return h('article', attrs,
      h('div', { className: 'hub__movement-image' }, p.image ? h('img', { src: p.image.src, alt: p.image.alt || '' }) : null),
      h('div', { className: 'hub__movement-text' },
        p.number ? h('span', { className: 'hub__movement-number', 'aria-hidden': 'true' }, p.number) : null,
        h('h2', { className: 'hub__movement-title' }, p.title),
        p.body ? h('p', { className: 'hub__movement-body' }, p.body) : null,
        p.link ? h('a', Object.assign({ className: 'hub__movement-link' }, linkAttrs(p.link.href, p.link.external)), p.link.label, ' ', arrow()) : null));
  }
  /* The journey hub: optional hero, then the steps, alternating sides and numbered 01, 02 … unless a step sets its own. */
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

  function SiteHeader(p) {
    var attrs = rest(p, ['name', 'subtitle', 'href', 'items', 'className']);
    attrs.className = cx('site-header', p.className);
    return h('header', attrs,
      h('div', { className: 'site-header__inner' },
        h('a', { className: 'site-header__brand', href: p.href || '/' },
          h('span', { className: 'site-header__name' }, p.name || 'datadonation.eu'), ' ',
          h('span', { className: 'site-header__subtitle' }, p.subtitle || 'Data donation for research')),
        h('nav', { className: 'site-nav', 'aria-label': 'Primary' },
          h('ul', { className: 'site-nav__list' }, list(p.items).map(function (it, i) {
            return h('li', { className: cx('site-nav__item', it.active && 'is-active'), key: i }, h('a', { href: it.href }, it.label));
          })))));
  }

  function SectionSubnav(p) {
    var attrs = rest(p, ['label', 'items', 'className']);
    attrs.className = cx('section-subnav', p.className);
    attrs['aria-label'] = p.label;
    return h('nav', attrs,
      h('div', { className: 'section-subnav__inner' },
        h('ul', { className: 'section-subnav__list' }, list(p.items).map(function (it, i) {
          return h('li', { className: cx('section-subnav__item', it.active && 'is-active'), key: i }, h('a', { href: it.href }, it.label));
        }))));
  }

  function footerLogo(l) {
    return h('img', { className: 'site-footer__logo site-footer__logo--' + l.mark, src: l.src, alt: l.name });
  }
  function SiteFooter(p) {
    var year = p.year || new Date().getFullYear();
    var partners = list(p.partners);
    var attrs = rest(p, ['providedBy', 'supportedBy', 'partners', 'partnersLabel', 'year', 'owner', 'className']);
    attrs.className = cx('site-footer', p.className);
    return h('footer', attrs,
      h('div', { className: 'site-footer__inner' },
        h('div', { className: 'site-footer__sentence' },
          h('p', { className: 'site-footer__label' },
            'A service provided by ',
            p.providedBy ? h('span', { className: 'site-footer__inline-logo' }, footerLogo(p.providedBy)) : null,
            ' and supported by ',
            p.supportedBy ? h('span', { className: 'site-footer__inline-logo' }, footerLogo(p.supportedBy)) : null)),
        partners.length > 0 ? h('div', { className: 'site-footer__group site-footer__group--members' },
          h('p', { className: 'site-footer__label' }, p.partnersLabel || 'Project partners'),
          h('div', { className: 'site-footer__logo-strip' }, partners.map(function (l, i) {
            return h('div', { className: 'site-footer__logo-cell', key: i }, footerLogo(l));
          }))) : null,
        h('p', { className: 'site-footer__copyright' }, '© ' + year + ' ' + (p.owner || 'datadonation.eu'))));
  }

  function HomepageHero(p) {
    var s = p.sprites || {};
    var sprite = function (name) {
      return s[name] ? h('img', { className: 'homepage-road__sprite homepage-road__sprite--' + name, src: s[name], alt: '' }) : null;
    };
    var attrs = rest(p, ['title', 'subtitle', 'cta', 'postit', 'sprites', 'className']);
    attrs.className = cx('homepage-hero', p.className);
    return h('section', attrs,
      h('div', { className: 'homepage-hero__moon', 'aria-hidden': 'true' }),
      s.clouds ? h('img', { className: 'homepage-hero__clouds', src: s.clouds, alt: '', 'aria-hidden': 'true' }) : null,
      s.plane ? h('img', { className: 'homepage-hero__plane', src: s.plane, alt: '', 'aria-hidden': 'true' }) : null,
      h('div', { className: 'homepage-hero__row' },
        h('div', { className: 'homepage-hero__intro' },
          h('h1', { className: 'homepage-hero__title' }, p.title),
          p.subtitle ? h('p', { className: 'homepage-hero__subtitle' }, p.subtitle) : null,
          p.cta ? h('a', Object.assign({ className: 'homepage-hero__cta' }, linkAttrs(p.cta.href, p.cta.external)), p.cta.label, ' →') : null),
        p.postit ? h(Postit, p.postit) : null),
      h('div', { className: 'homepage-road', 'aria-hidden': 'true' },
        h('div', { className: 'homepage-road__bar' }, h('div', { className: 'homepage-road__dash' })),
        sprite('walker'), sprite('mountains'), sprite('trees'), sprite('car'), sprite('cyclist')));
  }

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
  Figure.MediaGrid = function FigureMediaGrid(p) {
    var attrs = rest(p, ['images', 'className']);
    attrs.className = cx('media-grid', p.className);
    return h('div', attrs, list(p.images).map(function (im, i) { return h('img', { key: i, src: im.src, alt: im.alt || '' }); }));
  };

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
  UsageFigures.Stats = function UsageStats(p) {
    var attrs = rest(p, ['stats', 'className']);
    attrs.className = cx('usage-stat-row', p.className);
    return h('div', attrs, list(p.stats).map(function (s, i) {
      return h('div', { className: 'usage-stat', key: i },
        h('b', { style: { color: 'var(--chart-' + (s.series || ((i % 5) + 1)) + ')' } }, s.value),
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
    surface: '#ffffff', tint: '#f5f7fb', strong: '#eceff5', border: '#e2e6ed', borderStrong: '#878e9b',
    heading: '#252a34', text: '#363b46', muted: '#626976',
    blue: '#4272ef', blueTint: '#eef3fe', coral: '#ff5e5e', coralTint: '#ffefef',
    yellow: '#ffcf60', yellowText: '#e8b53c', yellowTint: '#fff6d6', road: '#c6d5fa', onAccent: '#ffffff',
    chart: ['#4272ef', '#ff5e5e', '#f4a52b', '#27b3a3', '#8b5cf6']
  };
  var NUNITO = "'Nunito', Arial, sans-serif", SANS = "'Nunito Sans', Arial, sans-serif";
  /* the three tints in sibling order, each with the colour of its eyebrow */
  var TINTS = [{ bg: C.blueTint, fg: C.blue }, { bg: C.coralTint, fg: C.coral }, { bg: C.yellowTint, fg: C.yellowText }];

  function st() {
    var o = {};
    for (var i = 0; i < arguments.length; i++) { var a = arguments[i]; if (a) for (var k in a) o[k] = a[k]; }
    return o;
  }
  var TXT = { margin: 0, padding: 0 };
  /* the Slides styles in tokens.json, as inline styles */
  var T = {
    numeral: st(TXT, { fontFamily: NUNITO, fontSize: '200px', lineHeight: 1, fontWeight: 900, letterSpacing: '-6px', color: C.coral }),
    display: st(TXT, { fontFamily: NUNITO, fontSize: '96px', lineHeight: 1.05, fontWeight: 900, letterSpacing: '-2px', color: C.heading }),
    title: st(TXT, { fontFamily: NUNITO, fontSize: '64px', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-1px', color: C.heading }),
    stat: st(TXT, { fontFamily: NUNITO, fontSize: '64px', lineHeight: 1, fontWeight: 900, letterSpacing: '-1px' }),
    heading: st(TXT, { fontFamily: NUNITO, fontSize: '48px', lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.5px', color: C.heading }),
    subheading: st(TXT, { fontFamily: NUNITO, fontSize: '36px', lineHeight: 1.2, fontWeight: 800, color: C.heading }),
    lead: st(TXT, { fontFamily: SANS, fontSize: '36px', lineHeight: 1.4, fontWeight: 400, color: C.muted }),
    item: st(TXT, { fontFamily: NUNITO, fontSize: '28px', lineHeight: 1.3, fontWeight: 800, color: C.heading }),
    body: st(TXT, { fontFamily: SANS, fontSize: '28px', lineHeight: 1.4, fontWeight: 400 }),
    small: st(TXT, { fontFamily: SANS, fontSize: '24px', lineHeight: 1.4, fontWeight: 400 }),
    label: st(TXT, { fontFamily: NUNITO, fontSize: '24px', lineHeight: 1.3, fontWeight: 700 }),
    eyebrow: st(TXT, { fontFamily: NUNITO, fontSize: '24px', lineHeight: 1.2, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: C.blue })
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

  /* eyebrow and title at the top margin; data-fit="none" stops the Slides canvas from shrinking them */
  function SlideHead(p) {
    return h('div', { style: st(COL, { gap: '16px' }) },
      p.eyebrow ? h('p', { 'data-fit': 'none', style: T.eyebrow }, p.eyebrow) : null,
      h('h2', { 'data-fit': 'none', style: T.title }, p.heading));
  }
  function SlideFooter(p) {
    return h('div', { style: st(ROW, { position: 'absolute', left: '128px', right: '128px', bottom: '64px', justifyContent: 'space-between' }) },
      h('p', { style: p.source ? st(T.small, { color: C.muted }) : st(T.label, { color: C.muted }) }, p.source || p.site || 'datadonation.eu'),
      h('p', { style: st(T.label, { color: C.muted }) }, p.number != null ? String(p.number) : ''));
  }
  function dash(color) {
    return h('div', { style: { flex: 1, height: 0, borderTop: '6px dashed ' + color } });
  }
  function stop(size, fill, ring) {
    return h('div', { style: { width: size + 'px', height: size + 'px', boxSizing: 'border-box', border: '4px solid ' + ring, borderRadius: '50%', background: fill, flex: 'none' } });
  }

  /* the road with one stop per part: numbered on the plan, passed / current / ahead on a section opener */
  function SlideRoad(p) {
    var stops = list(p.stops), n = stops.length || 1;
    return h('div', { style: st(COL, { gap: p.numbered ? '16px' : '12px' }) },
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + n + ', 1fr)', background: C.road, borderRadius: '16px', padding: p.numbered ? '16px 0' : '8px 0' } },
        stops.map(function (label, i) {
          var mark;
          if (p.numbered) {
            var last = i === n - 1;
            mark = h('div', { style: st(COL, { width: '80px', height: '80px', borderRadius: '50%', background: last ? C.coral : C.blue, justifyContent: 'center', alignItems: 'center', flex: 'none' }) },
              h('p', { style: st(T.item, { fontWeight: 900, color: last ? C.heading : C.onAccent }) }, two(i)));
          } else {
            mark = i < p.current ? stop(28, C.blue, C.blue) : i === p.current ? stop(40, C.coral, C.coral) : stop(28, C.surface, C.blue);
          }
          return h('div', { key: i, style: st(ROW, { alignItems: 'center' }) }, dash(i === 0 ? C.surface : C.blue), mark, dash(i === n - 1 ? C.surface : C.blue));
        })),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + n + ', 1fr)', gap: p.numbered ? '16px' : 0 } },
        stops.map(function (label, i) {
          if (p.numbered) return h('p', { key: i, style: st(T.subheading, { textAlign: 'center' }) }, label);
          var current = i === p.current;
          return h('p', { key: i, style: st(T.label, { textAlign: 'center', fontWeight: current ? 800 : 700, color: current ? C.coral : i < p.current ? C.heading : C.muted }) }, label);
        })));
  }

  function SlideCover(p) {
    var dots = [[1271, 46], [1224, 42], [1177, 38], [1130, 36], [1083, 36], [1036, 36], [942, 41], [896, 45], [849, 51], [803, 58], [757, 66], [710, 76], [664, 87], [618, 99]];
    var band = h('svg', {
      'aria-label': p.bandLabel || 'The datadonation.eu road: the four columns of the D3I mark at left; at right a phone on the road, from which one small piece of its data travels in an arc to the mark while the rest stays beside the phone; three travellers at the far right',
      style: { position: 'absolute', left: 0, top: 0, width: '1920px', height: '224px' }, viewBox: '0 0 1920 224', width: '1920', height: '224'
    },
      h('rect', { fill: C.heading, x: 192, y: 48, width: 64, height: 112, rx: 32 }),
      h('rect', { fill: C.blue, x: 288, y: -64, width: 64, height: 224, rx: 32 }),
      h('rect', { fill: C.coral, x: 384, y: 16, width: 64, height: 144, rx: 32 }),
      h('rect', { fill: C.yellow, x: 480, y: -16, width: 64, height: 176, rx: 32 }),
      dots.map(function (d, i) { return h('circle', { key: 'a' + i, fill: C.blue, opacity: 0.4, cx: d[0], cy: d[1], r: 6 }); }),
      h('rect', { fill: C.coral, x: 975, y: 26, width: 24, height: 24, rx: 5, transform: 'rotate(12 987 38)' }),
      h('rect', { fill: C.surface, stroke: C.heading, strokeWidth: 4, x: 1316, y: 40, width: 68, height: 120, rx: 10 }),
      [[68, 28], [84, 40], [100, 20], [116, 34]].map(function (l, i) { return h('rect', { key: 'l' + i, fill: C.blue, x: 1330, y: l[0], width: l[1], height: 7, rx: 3 }); }),
      h('rect', { fill: C.heading, x: 1340, y: 146, width: 20, height: 4, rx: 2 }),
      [[1404, 112], [1404, 138], [1430, 138]].map(function (q, i) { return h('rect', { key: 's' + i, fill: C.blueTint, stroke: C.road, strokeWidth: 2, x: q[0], y: q[1], width: 22, height: 22, rx: 5 }); }),
      h('rect', { fill: C.coral, x: 1520, y: 80, width: 64, height: 80, rx: 32 }),
      h('rect', { fill: C.blue, x: 1616, y: 32, width: 64, height: 128, rx: 32 }),
      h('rect', { fill: C.yellow, x: 1712, y: 96, width: 64, height: 64, rx: 32 }),
      h('rect', { fill: C.road, x: 0, y: 160, width: 1920, height: 48 }),
      [0, 176, 352, 528, 704, 880, 1056, 1232, 1408, 1584, 1760].map(function (x) { return h('rect', { key: 'd' + x, fill: C.blue, x: x, y: 181, width: 60, height: 6 }); }));
    /* the slide format caps padding at 256px, so the last 64px of offset sit on the title block */
    return h('section', { style: section({ padding: '256px 128px 128px', justifyContent: 'space-between', gap: '24px' }) },
      band,
      p.children || h('div', { style: st(COL, { gap: '24px', paddingTop: '64px' }) },
        h('p', { 'data-fit': 'none', style: T.eyebrow }, p.eyebrow || 'D3I · datadonation.eu'),
        h('h1', { 'data-fit': 'none', style: st(T.display, { width: '1500px' }) }, p.title),
        p.lead ? h('p', { style: st(T.lead, { width: '1400px' }) }, p.lead) : null),
      p.byline ? h('p', { style: T.item }, p.byline) : null);
  }

  function SlideFrame(p) {
    var cards = list(p.cards), panel = list(p.panel);
    return h('section', { style: section(p.gap ? { gap: p.gap } : null) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      cards.length ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + cards.length + ', 1fr)', gap: '24px' } }, cards.map(function (c, i) {
        var t = c.plain ? null : TINTS[i % 3];
        return h('div', { key: i, style: st(COL, { gap: '12px', background: t ? t.bg : C.surface, border: t ? 'none' : '1px solid ' + C.border, borderRadius: '16px', padding: '32px' }) },
          c.iconSrc ? h('img', { src: c.iconSrc, alt: c.iconAlt || '', style: { width: '48px', height: '48px', objectFit: 'contain', display: 'block' } }) : null,
          c.eyebrow ? h('p', { style: st(T.eyebrow, { color: t ? t.fg : C.muted }) }, c.eyebrow) : null,
          h('h3', { style: T.subheading }, c.title),
          c.body ? h('p', { style: T.body }, c.body) : null);
      })) : null,
      p.children,
      panel.length ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + panel.length + ', 1fr)', gap: '48px', background: C.tint, borderRadius: '16px', padding: '32px 40px' } }, panel.map(function (col, i) {
        return h('div', { key: i, style: st(COL, { gap: '12px' }) },
          h('p', { style: st(T.eyebrow, { color: C.muted }) }, col.eyebrow),
          h('p', { style: T.body }, col.text));
      })) : null,
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  function SlidePlan(p) {
    return h('section', { style: section({ justifyContent: 'center', gap: '64px' }) },
      h(SlideHead, { eyebrow: p.eyebrow || 'Overview', heading: p.heading }),
      h(SlideRoad, { stops: p.stops, numbered: true }),
      h(SlideFooter, { number: p.number }));
  }

  function SlideSectionStop(p) {
    return h('section', { style: section({ gap: '32px' }) },
      h(SlideHead, { eyebrow: p.part, heading: p.heading }),
      h('div', { style: st(ROW, { flex: 1, gap: '48px', alignItems: 'center' }) },
        h('p', { style: st(T.numeral, { width: '300px', flex: 'none' }) }, p.stepNumber),
        h('p', { style: st(T.heading, { flex: 1 }) }, p.sentence)),
      h(SlideRoad, { stops: p.stops, current: p.current || 0 }),
      h(SlideFooter, { number: p.number }));
  }

  function SlideBuild(p) {
    var steps = list(p.steps), rows = list(p.rows), cols = p.columns || {};
    var shown = p.shown == null ? rows.length : p.shown;
    var cur = p.current == null ? shown - 1 : p.current;
    function line(color) { return h('div', { style: { flex: 1, height: '3px', background: color } }); }
    function cell(c, tinted, coral) {
      return h('div', { style: st(COL, { gap: '8px', padding: tinted ? '16px 24px' : '16px 0', background: tinted ? (coral ? C.coralTint : C.blueTint) : 'transparent', borderRadius: '16px' }) },
        h('p', { style: T.item }, c.title),
        c.text ? h('p', { style: st(T.small, { color: C.muted }) }, c.text) : null);
    }
    return h('section', { style: section({ gap: '40px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      steps.length ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + steps.length + ', 1fr)' } }, steps.map(function (label, i) {
        var passed = i < cur, current = i === cur, last = i === steps.length - 1;
        return h('div', { key: i, style: st(COL, { gap: '8px' }) },
          h('div', { style: st(ROW, { alignItems: 'center' }) },
            line(i === 0 ? C.surface : passed || current ? C.blue : C.road),
            h('div', { style: { width: '24px', height: '24px', boxSizing: 'border-box', border: '3px solid ' + (passed ? C.blue : current ? C.coral : C.road), borderRadius: '50%', background: passed ? C.blue : current ? C.coral : C.surface, flex: 'none' } }),
            line(last ? C.surface : passed ? C.blue : C.road)),
          h('p', { style: st(T.label, { textAlign: 'center', fontWeight: current ? 800 : 700, color: current ? C.coral : passed ? C.heading : C.muted }) }, (i + 1) + ' · ' + label));
      })) : null,
      h('div', { style: COL },
        h('div', { style: { display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: '32px', alignItems: 'end', paddingBottom: '16px', borderBottom: '1px solid ' + C.border } },
          h('p', { style: T.small }, ' '),
          h('p', { style: st(T.eyebrow, { color: C.muted }) }, cols.left),
          h('p', { style: T.eyebrow }, cols.right)),
        rows.slice(0, shown).map(function (r, i) {
          var coral = r.tone === 'coral';
          return h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: '32px', alignItems: 'start', padding: '24px 0', borderTop: i ? '1px solid ' + C.border : 'none', opacity: i < shown - 1 ? 0.35 : 1 } },
            h('p', { style: st(T.eyebrow, { color: coral ? C.coral : C.heading, paddingTop: '16px' }) }, r.label),
            cell(r.left || {}, false), cell(r.right || {}, true, coral));
        })),
      p.children,
      h(SlideFooter, { number: p.number }));
  }

  function SlideStats(p) {
    var tiles = list(p.tiles), panel = list(p.panel);
    return h('section', { style: section({ gap: '40px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + (tiles.length || 1) + ', 1fr)', gap: '24px' } }, tiles.map(function (t, i) {
        var series = list(t.series), max = series.length ? Math.max.apply(null, series.map(function (s) { return s.value; })) : 1;
        return h('div', { key: i, style: st(COL, { gap: '8px', background: C.surface, border: '1px solid ' + C.border, borderRadius: '16px', padding: '32px' }) },
          t.value != null ? h('p', { style: st(T.stat, { color: C.chart[i % 5] }) }, t.value) : null,
          t.label ? h('p', { style: st(T.small, { lineHeight: 1.3, color: C.muted }) }, t.label) : null,
          series.length ? h('div', { style: st(ROW, { alignItems: 'flex-end', gap: '12px', paddingTop: '16px' }) }, series.map(function (s, j) {
            return h('div', { key: j, style: st(COL, { flex: 1, alignItems: 'center', gap: '4px' }) },
              h('p', { style: st(T.label, { fontWeight: 800, color: C.heading }) }, s.value),
              h('div', { style: { width: '48px', height: Math.max(2, Math.round(56 * s.value / max)) + 'px', background: C.chart[0], borderRadius: '4px 4px 0 0' } }),
              h('p', { style: st(T.small, { color: C.muted }) }, s.label));
          })) : null,
          t.marks ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '12px', paddingTop: '8px' } }, list(t.marks).map(function (m, j) {
            return h('img', { key: j, src: m.src, alt: m.alt || '', style: { width: '32px', height: '32px', objectFit: 'contain', display: 'block' } });
          })) : null);
      })),
      panel.length ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + panel.length + ', 1fr)', gap: '32px', background: C.tint, borderRadius: '16px', padding: '32px' } }, panel.map(function (col, i) {
        return h('div', { key: i, style: st(COL, { gap: '8px' }) },
          h('p', { style: T.item }, col.title),
          list(col.items).map(function (it, j) { return h('p', { key: j, style: T.small }, it); }));
      })) : null,
      p.children,
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  function SlideFunnel(p) {
    var f = p.funnel, m = p.meter;
    var blue = f && f.color === 'blue';
    function meterBox(o) {
      var centre = { justifyContent: 'center', alignItems: 'center' };
      if (o.fill === 'all') return h('div', { style: st(COL, centre, { height: '180px', background: C.coral, borderRadius: '8px' }) },
        h('p', { style: st(T.label, { fontWeight: 800, color: C.heading, textAlign: 'center' }) }, o.fillLabel));
      if (o.fill === 'promise') return h('div', { style: st(COL, centre, { height: '180px', boxSizing: 'border-box', background: C.coralTint, border: '3px dashed ' + C.coral, borderRadius: '8px' }) },
        h('p', { style: st(T.label, { fontWeight: 800, color: C.coral, textAlign: 'center' }) }, o.fillLabel));
      return h('div', { style: st(COL, centre, { height: '28px', background: C.blue, borderRadius: '0 0 8px 8px' }) },
        h('p', { style: st(T.label, { fontWeight: 800, color: C.onAccent }) }, o.fillLabel));
    }
    return h('section', { style: section({ gap: '40px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: { display: 'grid', gridTemplateColumns: f && m ? '1fr 1.4fr' : '1fr', gap: '24px' } },
        f ? h('div', { style: st(COL, { gap: '16px', background: blue ? C.blueTint : C.coralTint, borderRadius: '16px', padding: '32px' }) },
          f.eyebrow ? h('p', { style: st(T.eyebrow, { color: blue ? C.blue : C.coral }) }, f.eyebrow) : null,
          f.base ? h('p', { style: st(T.small, { color: C.muted }) }, f.base) : null,
          h('div', { style: st(COL, { gap: '16px' }) }, list(f.stages).map(function (s, i) {
            return h('div', { key: i, style: st(COL, { gap: '8px' }) },
              h('p', { style: st(T.small, { color: C.heading }) }, s.label),
              h('div', { style: st(ROW, { alignItems: 'center', gap: '12px' }) },
                h('div', { style: { height: '26px', width: Math.round(400 * s.pct / (f.stages[0].pct || 1)) + 'px', background: blue ? C.blue : C.coral, borderRadius: '8px' } }),
                h('p', { style: st(T.label, { fontWeight: 800, color: C.heading }) }, s.pct + '%')));
          })),
          f.note ? h('p', { style: T.small }, f.note) : null) : null,
        m ? h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + list(m.options).length + ', 1fr)', gap: '16px' } }, list(m.options).map(function (o, i) {
          return h('div', { key: i, style: st(COL, { gap: '16px', background: o.recommended ? C.blueTint : C.surface, border: '1px solid ' + (o.recommended ? C.road : C.border), borderRadius: '16px', padding: '24px' }) },
            h('p', { style: st(T.eyebrow, { color: o.recommended ? C.blue : C.muted }) }, o.eyebrow),
            h('div', { style: st(COL, { height: '180px', background: o.recommended ? C.surface : C.strong, borderRadius: '8px', justifyContent: 'flex-end' }) }, meterBox(o)),
            o.text ? h('p', { style: T.small }, o.text) : null);
        })) : null),
      p.children,
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  function SlideWindow(p) {
    var steps = list(p.steps), w = p.window || {}, bars = list(w.bars);
    var max = bars.length ? Math.max.apply(null, bars.map(function (b) { return b.value; })) : 1;
    return h('section', { style: section({ gap: '40px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: st(ROW, { gap: '32px', alignItems: 'stretch' }) },
        h('div', { style: st(COL, { width: '520px', flex: 'none' }) },
          steps.map(function (s, i) {
            return h('div', { key: i, style: st(ROW, { gap: '16px', alignItems: 'flex-start', padding: i ? '24px 0' : '0 0 24px 0', borderTop: i ? '1px solid ' + C.border : 'none' }) },
              h('p', { style: st(T.stat, { fontSize: '48px', color: C.coral, width: '64px', flex: 'none' }) }, two(i)),
              h('div', { style: st(COL, { gap: '8px', flex: 1 }) },
                h('p', { style: T.item }, s.title),
                s.text ? h('p', { style: T.small }, s.text) : null));
          }),
          h('div', { style: { flex: 1 } }),
          p.link ? h('p', { style: st(T.label, { color: C.coral }) }, p.link + ' →') : null),
        h('div', { style: st(COL, { flex: 1, background: C.surface, border: '1px solid ' + C.border, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(37,42,52,.04), 0 8px 24px -12px rgba(66,114,239,.2)' }) },
          h('div', { style: st(ROW, { gap: '12px', alignItems: 'center', background: C.tint, padding: '12px 16px', borderBottom: '1px solid ' + C.border }) },
            [0, 1, 2].map(function (i) { return h('div', { key: i, style: { width: '14px', height: '14px', borderRadius: '50%', background: C.borderStrong, flex: 'none' } }); }),
            h('p', { style: st(T.small, { color: C.muted, background: C.surface, borderRadius: '999px', padding: '4px 16px', flex: 1 }) }, w.url)),
          w.imageSrc ? h('img', { src: w.imageSrc, alt: w.imageAlt || '', style: { width: '100%', display: 'block' } })
            : h('div', { style: st(COL, { gap: '16px', padding: '24px 32px 32px' }) },
              h('div', { style: st(ROW, { justifyContent: 'space-between', alignItems: 'center' }) },
                h('p', { style: T.item }, w.title),
                w.tabs ? h('div', { style: st(ROW, { gap: '8px' }) }, list(w.tabs).map(function (t, i) {
                  return h('p', { key: i, style: st(T.label, { color: t.active ? C.onAccent : C.heading, background: t.active ? C.blue : C.strong, borderRadius: '999px', padding: '4px 16px' }) }, t.label);
                })) : null),
              w.stat ? h('p', { style: st(T.small, { color: C.muted }) }, w.stat) : null,
              w.chartLabel ? h('p', { style: st(T.small, { paddingTop: '8px' }) }, w.chartLabel) : null,
              bars.length ? h('div', { style: st(ROW, { alignItems: 'flex-end', gap: '8px', height: '150px' }) }, bars.map(function (b, i) {
                return h('div', { key: i, style: { flex: 1, height: Math.max(2, Math.round(150 * b.value / max)) + 'px', background: C.chart[0], borderRadius: '4px 4px 0 0' } });
              })) : null,
              bars.length ? h('div', { style: { height: '1px', background: C.borderStrong } }) : null,
              bars.length ? h('div', { style: st(ROW, { gap: '8px' }) }, bars.map(function (b, i) {
                return h('p', { key: i, style: st(T.small, { flex: 1, textAlign: 'center', color: C.muted }) }, b.label);
              })) : null))),
      p.caption ? h('p', { style: st(T.small, { color: C.muted }) }, p.caption) : null,
      h(SlideFooter, { number: p.number, source: p.source }));
  }

  function SlideQuestions(p) {
    var headers = p.headers || ['The problem', 'What changes', 'The question'];
    var hc = [C.muted, C.blue, C.coral], cases = list(p.cases), logos = list(p.logos);
    var GRID = { display: 'grid', gridTemplateColumns: '300px 1fr 1fr', gap: '32px' };
    return h('section', { style: section({ padding: '128px', gap: '32px' }) },
      h(SlideHead, { eyebrow: p.eyebrow, heading: p.heading }),
      h('div', { style: COL },
        h('div', { style: st(GRID, { alignItems: 'end', paddingBottom: '16px', borderBottom: '1px solid ' + C.border }) },
          headers.map(function (t, i) { return h('p', { key: i, style: st(T.eyebrow, { color: hc[i] }) }, t); })),
        list(p.rows).map(function (r, i) {
          return h('div', { key: i, style: st(GRID, { alignItems: 'start', padding: '16px 0', borderTop: i ? '1px solid ' + C.border : 'none' }) },
            h('p', { style: st(T.item, { lineHeight: 1.25 }) }, r.problem),
            h('p', { style: T.small }, r.change),
            h('p', { style: T.small }, r.question));
        })),
      cases.length ? h('div', { style: st(COL, { gap: '12px' }) },
        p.casesLabel ? h('p', { style: st(T.eyebrow, { color: C.muted }) }, p.casesLabel) : null,
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + cases.length + ', 1fr)', gap: '24px' } }, cases.map(function (c, i) {
          var bg = c.tint === 'coral' ? C.coralTint : c.tint === 'yellow' ? C.yellowTint : c.tint === 'blue' ? C.blueTint : (i % 2 ? C.yellowTint : C.blueTint);
          return h('div', { key: i, style: st(COL, { gap: '8px', background: bg, borderRadius: '16px', padding: '24px 32px' }) },
            h('p', { style: st(T.item, { lineHeight: 1.25 }) }, c.title),
            h('p', { style: T.small }, c.text));
        }))) : null,
      h('div', { style: { flex: 1 } }),
      h('div', { style: st(ROW, { justifyContent: 'space-between', alignItems: 'center' }) },
        h('div', { style: st(ROW, { gap: '32px', alignItems: 'center' }) },
          p.email ? h('p', { style: st(T.item, { color: C.coral }) }, 'Email ' + p.email + ' →') : null,
          h('p', { style: st(T.item, { color: C.blue }) }, p.site || 'datadonation.eu')),
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
    HomepageHero: HomepageHero,
    ActionLink: ActionLink,
    ContactBlock: ContactBlock,
    Postit: Postit,
    Callout: Callout,
    NewsCard: NewsCard,
    ArchiveCard: ArchiveCard,
    MovementCard: MovementCard,
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
