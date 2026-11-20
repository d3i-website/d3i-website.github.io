// The design system's website components, rendered from their own previews.
//
// Each preview's script runs against bundle.js with a stub React (tests/lib/stub-react.mjs), and
// what it renders is checked against the built site: run `bundle exec jekyll build` first.
//
//   node --test tests/design-system-components.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBundle, renderToHtml, classesIn, runPreview } from './lib/stub-react.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const components = join(root, 'docs/design-system-2/project/components');
const site = join(root, '_site');

// Folders under components/ that hold no component: the React files, and the system's cover card.
const NOT_COMPONENTS = ['lib', 'Cover'];

const folders = readdirSync(components, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !NOT_COMPONENTS.includes(d.name))
  .map((d) => d.name)
  .sort();
const previews = folders.filter((name) => existsSync(join(components, name, 'preview.html')));
const previewPath = (name) => join(components, name, 'preview.html');

function bundle() {
  return loadBundle(join(components, 'bundle.js'));
}

function walk(dir, ext, out = []) {
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) walk(p, ext, out);
    else if (d.name.endsWith(ext)) out.push(p);
  }
  return out;
}

// Every class the built site writes into its pages, and every string literal its scripts hold
// (a script adds some classes itself, such as the open menu's). The scripts are assets/js/*.js
// and the inline ones in the built pages (the people grid's adds is-ready); a script that writes
// markup as a string (usage-figures.js) gives its class="…" attributes too.
function addScriptClasses(src, into) {
  for (const m of src.matchAll(/'([^'\\\n]*)'|"([^"\\\n]*)"|`([^`\\$]*)`/g)) {
    for (const c of (m[1] ?? m[2] ?? m[3]).split(/\s+/)) if (c) into.add(c);
  }
  for (const c of classesIn(src)) into.add(c);
}
let siteClasses;
function classesOfSite() {
  if (siteClasses) return siteClasses;
  assert.ok(existsSync(site), '_site is missing: run `bundle exec jekyll build` first');
  siteClasses = new Set();
  for (const file of walk(site, '.html')) {
    const html = readFileSync(file, 'utf8');
    for (const c of classesIn(html)) siteClasses.add(c);
    for (const m of html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)) addScriptClasses(m[1], siteClasses);
  }
  const js = join(root, 'assets/js');
  for (const file of readdirSync(js).filter((f) => f.endsWith('.js'))) {
    addScriptClasses(readFileSync(join(js, file), 'utf8'), siteClasses);
  }
  return siteClasses;
}

test('header, d3i and folders agree', () => {
  const src = readFileSync(join(components, 'bundle.js'), 'utf8');
  const first = src.split('\n')[0];
  const header = JSON.parse(first.match(/^\/\* @ds-bundle: (\{.*\}) \*\/$/)[1]);
  const fromHeader = header.components.map((c) => c.name).sort();

  const { D3I } = bundle();
  const fromD3I = Object.keys(D3I).filter((k) => /^[A-Z]/.test(k)).sort();

  const dts = readFileSync(join(components, 'index.d.ts'), 'utf8');
  const fromDts = [...dts.matchAll(/^export declare (?:function|const) ([A-Z]\w*)/gm)].map((m) => m[1]).sort();

  assert.deepEqual(fromD3I, fromHeader, 'D3I against the @ds-bundle header');
  assert.deepEqual(fromDts, fromHeader, 'index.d.ts against the @ds-bundle header');
  assert.deepEqual(folders, fromHeader, 'components/*/ folders against the @ds-bundle header');
});

test('bundle.css has no colour literals', () => {
  const css = readFileSync(join(components, 'bundle.css'), 'utf8');
  const found = css.match(/#[0-9a-fA-F]{3,8}\b/g);
  assert.equal(found, null, `colour literals in bundle.css: ${found && found.join(', ')}`);
});

test('every preview renders', () => {
  for (const name of previews) {
    let html;
    assert.doesNotThrow(() => { html = runPreview(previewPath(name), bundle()); }, `${name} preview throws`);
    assert.ok(html.length > 0, `${name} preview renders nothing`);
  }
});

// The system leads the site: a component whose new look changes its markup may emit classes the
// built site does not have yet. Each is listed here under its component; the site adopts it when
// that page is redone, and then it leaves the map. Only these components may have entries.
const PENDING_COMPONENTS = ['ActionLink', 'JourneyNext', 'Postit', 'HubStep', 'NewsCard', 'ArchiveCard',
  'ProjectCard', 'Callout', 'SidebarPanel', 'ContactBlock'];
const PENDING_SITE_CLASSES = {
  JourneyNext: [
    'journey-next__disc', // new markup, site adopts on redo
  ],
  Callout: [
    'callout__node', // new markup, site adopts on redo
    'callout__ring', // new markup, site adopts on redo
  ],
  Postit: [
    'postit__paper', // new markup, site adopts on redo
    'postit__note', // new markup, site adopts on redo
    'postit__tab', // new markup, site adopts on redo
    'postit__over', // new markup, site adopts on redo
    'postit__route', // new markup, site adopts on redo
    'postit__run', // new markup, site adopts on redo
    'postit__disc', // new markup, site adopts on redo
  ],
};

const websitePreviews = () => previews.filter((n) => !n.startsWith('Slide'));

test('every class a website component emits is used by the site', () => {
  const used = classesOfSite();
  const missing = [];
  for (const name of websitePreviews()) {
    const pending = PENDING_SITE_CLASSES[name] || [];
    for (const c of classesIn(runPreview(previewPath(name), bundle()))) {
      if (c.startsWith('pv')) continue; // preview scaffolding (pv, pv-row), not component output
      if (!used.has(c) && !pending.includes(c)) missing.push(`${name} → ${c}`);
    }
  }
  assert.deepEqual(missing, [], `classes the site does not use:\n  ${missing.join('\n  ')}`);
});

// A pending class is one the site does not have yet, that its own component emits, and that no
// other component uses.
test('pending site classes are new, used, and their own component\'s', () => {
  const used = classesOfSite();
  const wrong = [];
  const owner = new Map();
  for (const [name, classes] of Object.entries(PENDING_SITE_CLASSES)) {
    if (!PENDING_COMPONENTS.includes(name)) wrong.push(`${name} may not have pending classes`);
    for (const c of classes) {
      if (used.has(c)) wrong.push(`${name} → ${c}: the site has it now, drop it from the map`);
      owner.set(c, name);
    }
  }
  for (const name of websitePreviews()) {
    const emitted = classesIn(runPreview(previewPath(name), bundle()));
    for (const c of PENDING_SITE_CLASSES[name] || []) if (!emitted.has(c)) wrong.push(`${name} → ${c}: its preview does not emit it`);
    for (const c of emitted) if (owner.has(c) && owner.get(c) !== name) wrong.push(`${name} → ${c}: pending for ${owner.get(c)} only`);
  }
  assert.deepEqual(wrong, [], wrong.join('\n  '));
});

// mailto: and data: point at no file, so they pass too: ContactBlock builds its mailto: link from
// the address, and PeopleGrid's preview draws its placeholder photo as a data: URL.
test('previews point only at uploads', () => {
  const bad = [];
  for (const name of previews) {
    const html = runPreview(previewPath(name), bundle());
    for (const m of html.matchAll(/\s(src|href)="([^"]*)"/g)) {
      const url = m[2];
      const ok = url === '#' || /^(\/_blob\/|https:\/\/|mailto:|data:)/.test(url);
      if (!ok) bad.push(`${name} → ${m[1]}="${url}"`);
    }
  }
  assert.deepEqual(bad, [], `previews pointing elsewhere:\n  ${bad.join('\n  ')}`);
});

/* Band ------------------------------------------------------------------------------------ */

// The band's drawing is _includes/home/band.html, copied into bundle.js by build_band_markup.py.
test('band markup is current', () => {
  execFileSync('python3', ['-I', join(root, 'docs/design-system-2/tools/build_band_markup.py'), '--check'], { stdio: 'pipe' });
});

const BAND_PROPS = {
  titleLines: ['Open Infrastructure for', 'Data Donation Research'],
  subtitle: 'Digital Trace Data, donated to science by citizens.',
};

test('band renders both title lines and the subtitle', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Band, BAND_PROPS));
  assert.ok(html.includes('Open Infrastructure for'), 'first title line');
  assert.ok(html.includes('Data Donation Research'), 'second title line');
  assert.ok(html.includes('Digital Trace Data, donated to science by citizens.'), 'subtitle');
});

// The note is _includes/home/note.html: its classes are note and note__*.
test('band without a note', () => {
  const { D3I, React } = bundle();
  const classes = [...classesIn(renderToHtml(React.createElement(D3I.Band, BAND_PROPS)))];
  assert.deepEqual(classes.filter((c) => c === 'note' || c.startsWith('note__')), []);
});

// The stub itself, so a renderer slip is not mistaken for a component's.
test('renderToHtml writes what React would', () => {
  const { React } = bundle();
  const h = React.createElement;
  function Item(p) { return h('li', { className: 'a b', key: 'x' }, p.label, ' & ', p.n); }
  const tree = h(React.Fragment, null,
    h('ul', { 'aria-label': 'L', onClick() {}, hidden: false, tabIndex: -1 }, [h(Item, { key: 1, label: '<x>', n: 2 }), null, false]),
    h('img', { src: '/_blob/1', alt: '' }),
    h('div', { style: { marginTop: 8, lineHeight: 1.2, '--k': '100%', opacity: 0 }, dangerouslySetInnerHTML: { __html: '<b>raw</b>' } }),
    h('svg', { viewBox: '0 0 1 1' }, h('path', { strokeWidth: '2', d: 'M0 0' })));
  assert.equal(renderToHtml(tree),
    '<ul aria-label="L" tabindex="-1"><li class="a b">&lt;x&gt; &amp; 2</li></ul>'
    + '<img src="/_blob/1" alt=""/>'
    + '<div style="margin-top:8px;line-height:1.2;--k:100%;opacity:0"><b>raw</b></div>'
    + '<svg viewBox="0 0 1 1"><path stroke-width="2" d="M0 0"></path></svg>');
  assert.deepEqual([...classesIn('<p class="x  y"><i class="y z">')].sort(), ['x', 'y', 'z']);
});

// Band fills its title and subtitle into a markup string, so it must escape them itself. The
// drawing has one <b> of its own (the thread's line), so the title must add none.
test('band escapes its text', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Band, { titleLines: ['A & <b>', 'x'], subtitle: 's' }));
  const plain = renderToHtml(React.createElement(D3I.Band, BAND_PROPS));
  assert.ok(html.includes('A &amp; &lt;b&gt;'), 'the title line, escaped');
  assert.equal(html.split('<b>').length, plain.split('<b>').length, 'no <b> element from the title');
});

/* FrontPage, Note, ArrowDisc, Link --------------------------------------------------------- */

test('front page wraps its children in .home', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.FrontPage, null, React.createElement('p', null, 'x')));
  assert.equal(html, '<div class="home"><p>x</p></div>');
});

// The note is _includes/home/note.html. With a link it carries the arrow disc twice, as the site
// does: note__go below 1280px and note__disc on the corner from 1280px; one shows at each width.
const NOTE_PROPS = {
  eyebrow: 'Position',
  title: 'GDPR Omnibus Proposal',
  body: 'The European Omnibus Act poses a direct risk.',
  link: { label: 'Read our letter', href: '#' },
};
const count = (html, s) => html.split(s).length - 1;

test('note with every field', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Note, NOTE_PROPS));
  assert.ok(html.startsWith('<a class="note" href="#">'), 'the whole note is one link');
  assert.ok(html.includes('<p class="note__eyebrow">Position</p>'), 'eyebrow');
  assert.ok(html.includes('<p class="note__title">GDPR Omnibus Proposal</p>'), 'title');
  assert.ok(html.includes('<p class="note__text">The European Omnibus Act poses a direct risk.</p>'), 'body');
  assert.ok(html.includes('<span class="note__link">Read our letter</span>'), 'link label');
  assert.equal(count(html, 'class="note__disc"'), 1, 'one arrow disc on the corner');
  assert.equal(count(html, 'class="note__go"'), 1, 'one arrow disc below 1280px');
});

test('note without a link', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Note, { ...NOTE_PROPS, link: undefined }));
  assert.ok(html.startsWith('<div class="note">'), 'a plain div');
  assert.ok(!html.includes('<a'), 'no link');
  assert.ok(!/note__(disc|go|link)/.test(html), 'no arrow disc, no link label');
});

test('note without a body', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Note, { ...NOTE_PROPS, body: undefined }));
  assert.ok(!html.includes('note__text'), 'no body element');
  assert.ok(html.includes('note__title'), 'still the title');
});

test('note without a link label has an empty tab', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Note, { ...NOTE_PROPS, link: { href: '#' } }));
  assert.ok(html.includes('class="note__disc"'), 'still the arrow disc');
  assert.ok(!html.includes('note__link'), 'no link label');
});

test('arrow disc label is visually hidden', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.ArrowDisc, { label: ' news' }));
  assert.ok(html.includes('<span class="visually-hidden"> news</span>'), 'the label, visually hidden');
  assert.equal(count(html, 'class="go"'), 1, 'one disc');
  assert.ok(!renderToHtml(React.createElement(D3I.ArrowDisc, {})).includes('visually-hidden'), 'no label, no hidden text');
});

// The site styles every bare <a> as a running-text link (_sass/_site.scss), so Link adds no class.
test('link is a bare <a>', () => {
  const { D3I, React } = bundle();
  assert.equal(renderToHtml(React.createElement(D3I.Link, { href: '#' }, 'newsletter')), '<a href="#">newsletter</a>');
});

/* HomeCard, ListRow ------------------------------------------------------------------------ */

// A row's date is _includes/home/lists.html's: the month as %b over the day as %-d.
test('list row shows month and day', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-11-20', title: 'Unlocking Data', href: '#' }));
  assert.ok(html.includes('<p class="date"><span>Nov</span><b class="serif">20</b></p>'), 'Nov over 20');
  const early = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-03-05', title: 'x', href: '#' }));
  assert.ok(early.includes('<span>Mar</span><b class="serif">5</b>'), 'the day without a leading zero');
});

test('event row shows its place, news row does not', () => {
  const { D3I, React } = bundle();
  const event = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-11-20', title: 'Unlocking Data', href: '#', place: 'Webinar' }));
  const news = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-11-09', title: 'Ready to reproduce', href: '#' }));
  assert.ok(event.includes('<p class="where">Webinar</p>'), 'the place, in .where');
  assert.ok(!classesIn(news).has('where'), 'no .where without a place');
});

// "More" is lists.html's: the hidden second word comes straight after it, before the dots and the disc.
test('More has its hidden word', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.ListRow.List, { title: 'Upcoming events', moreHref: '#', moreLabel: 'events' }));
  assert.ok(html.includes('<a class="more" href="#">More<span class="visually-hidden"> events</span><i class="more__dots"></i><svg class="go"'), 'More, then " events" hidden, the dots and the disc');
  assert.equal(count(html, 'visually-hidden'), 1, 'one hidden word');
});

// A multi-day event's date is lists.html's range: the days joined by "–", one month when both are in it.
test('list row shows a range within one month', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-12-07', endDate: '2026-12-08', title: 'x', href: '#' }));
  assert.ok(html.includes('<p class="date"><span>Dec</span><b class="serif">7–8</b></p>'), 'Dec over 7–8');
});

test('list row shows a range across months', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-10-30', endDate: '2026-11-02', title: 'x', href: '#' }));
  assert.ok(html.includes('<p class="date"><span>Oct–Nov</span><b class="serif">30–2</b></p>'), 'Oct–Nov over 30–2');
});

test('list row with an end date on its start date shows one day', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-11-20', endDate: '2026-11-20', title: 'x', href: '#' }));
  assert.ok(html.includes('<span>Nov</span><b class="serif">20</b>'), 'no range');
});

// lists.html opens an external_url in a new tab.
test('external row opens in a new tab', () => {
  const { D3I, React } = bundle();
  const ext = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-11-20', title: 'x', href: 'https://example.org/', external: true }));
  const own = renderToHtml(React.createElement(D3I.ListRow, { date: '2026-11-20', title: 'x', href: '#' }));
  assert.ok(ext.includes('<a href="https://example.org/" target="_blank" rel="noopener noreferrer"><span>x</span></a>'), 'target and rel');
  assert.ok(!/target=|rel=/.test(own), 'none without external');
});

/* ActionLink, JourneyNext, Callout, Postit ---------------------------------------------------- */

// The front page's "More" form: the label, its hidden word straight after it, the dots, the disc.
test('action link is the More form', () => {
  const { D3I, React } = bundle();
  const h = React.createElement;
  const section = renderToHtml(h(D3I.ActionLink, { href: '#', hiddenLabel: ' about data donation' }, 'Learn more'));
  assert.ok(section.startsWith('<a class="section-cta" href="#">Learn more<span class="visually-hidden"> about data donation</span><i class="more__dots"></i><svg class="go"'),
    'the label, the hidden word, the dots and the disc');
  assert.equal(count(section, 'class="go"'), 1, 'one arrow disc');
  assert.ok(!section.includes('→'), 'no text arrow');
  const compact = renderToHtml(h(D3I.ActionLink, { href: '#', variant: 'compact' }, 'Read more'));
  assert.ok(compact.startsWith('<a class="cta-link" href="#">Read more<i class="more__dots"></i><svg class="go"'), 'the compact form, no hidden word');
  const ext = renderToHtml(h(D3I.ActionLink, { href: 'https://example.org/', external: true }, 'x'));
  assert.ok(ext.includes('target="_blank" rel="noopener noreferrer"'), 'external opens a new tab');
});

// The title is the block's link, and the block ends in the 36px arrow disc; "After that" sits
// below the step, outside the area the title's link covers.
test('journey next ends in the arrow disc', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.JourneyNext, {
    number: '02', title: 'Pick a platform', body: 'b', href: '/pick/', after: { number: '03', title: 'Go further', href: '/further/' },
  }));
  assert.ok(html.includes('<h2 class="journey-next__title"><a href="/pick/"><span>Pick a platform</span></a></h2>'), 'the title is the link');
  assert.equal(count(html, 'class="journey-next__disc"'), 1, 'one arrow disc');
  assert.ok(html.includes('width="36"'), 'the note-sized disc');
  assert.ok(!/section-cta|journey-next__link|→/.test(html), 'no action link');
  assert.ok(html.includes('</svg></div><p class="journey-next__after">'), 'after that, below the step');
  const bare = renderToHtml(React.createElement(D3I.JourneyNext, { number: '02', title: 'x' }));
  assert.ok(!/<a[\s>]/.test(bare) && !bare.includes('journey-next__disc'), 'without href, no link and no disc');
});

const ruleFor = (selector) => cssRules(readFileSync(join(components, 'bundle.css'), 'utf8'))
  .filter(([sel]) => sel.split(',').map((s) => s.trim()).includes(selector)).map(([, decl]) => decl).join(';');

test('callout sits on a line', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Callout, null, 'SURF is down.'));
  assert.equal(html, '<div class="callout"><i class="callout__node"></i><p>SURF is down.</p><i class="callout__ring"></i></div>');
  assert.match(ruleFor('.callout__node'), /background:var\(--coral\)/, 'a coral node');
  assert.match(ruleFor('.callout__ring'), /background:var\(--surface\).*border:1\.4px solid var\(--blue\)/, 'a ring node');
  assert.match(ruleFor('.callout::before'), /background:var\(--blue\)/, 'on a blue line');
  assert.doesNotMatch(ruleFor('.callout'), /tint|border-left/, 'no panel, no left rule');
});

// The front page's note, in postit classes: paper, tab, dotted line, coral corner node, disc.
test('postit renders the note', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Postit, NOTE_PROPS));
  assert.ok(html.startsWith('<a class="postit" href="#"><div class="postit__paper"><div class="postit__note">'), 'the whole postit is one link');
  assert.ok(html.includes('<p class="postit__eyebrow">Position</p>'), 'eyebrow');
  assert.ok(html.includes('<h3 class="postit__title">GDPR Omnibus Proposal</h3>'), 'title');
  assert.ok(html.includes('<p class="postit__body">The European Omnibus Act poses a direct risk.</p>'), 'body');
  assert.ok(html.includes('<svg class="postit__tab"'), 'the tab');
  assert.ok(html.includes('fill="#ff5e5e"'), 'the coral corner node');
  assert.equal(count(html, 'class="postit__disc"'), 1, 'one arrow disc');
  assert.ok(html.includes('<span class="postit__link">Read our letter</span>'), 'the label on the tab');
  const plain = renderToHtml(React.createElement(D3I.Postit, { ...NOTE_PROPS, link: { label: 'x' }, inline: true }));
  assert.ok(plain.startsWith('<aside class="postit postit--inline">'), 'without link.href an aside, inline');
  assert.ok(!/<a[\s>]/.test(plain) && !/postit__(disc|link)/.test(plain), 'not a link, no disc, no label');
  const bare = renderToHtml(React.createElement(D3I.Postit, { title: 't' }));
  assert.ok(!/postit__(eyebrow|body)/.test(bare), 'no eyebrow or body unless given');
  assert.match(ruleFor('.postit__note'), /background:var\(--paper\)/, 'on paper');
  assert.match(ruleFor('.postit__paper'), /drop-shadow\(var\(--shadow-note\)\)/, 'under the note shadow');
});

/* SiteHeader, SiteFooter ------------------------------------------------------------------- */

const HEADER_PROPS = {
  brand: 'datadonation.eu',
  tagline: 'Data donation for research',
  href: '#',
  links: [{ label: 'Data donation', href: '#' }, { label: 'Software', href: '#', current: true }],
};
const header = (props) => {
  const { D3I, React } = bundle();
  return renderToHtml(React.createElement(D3I.SiteHeader, { ...HEADER_PROPS, ...props }));
};

// site-menu.js keeps the panel's state in the button's aria-expanded, and the stylesheet opens the
// panel from it. Without the script (menu 'none') the site hides the button and the links wrap.
test('header menu states', () => {
  const button = (expanded) => `<button class="site-header__menu" type="button" aria-expanded="${expanded}" aria-controls="site-nav">Menu</button>`;
  assert.ok(header({ menu: 'open' }).includes(button('true')), "'open': aria-expanded true");
  assert.ok(header({ menu: 'closed' }).includes(button('false')), "'closed': aria-expanded false");
  assert.equal(header({}), header({ menu: 'closed' }), "closed by default");
  const none = header({ menu: 'none' });
  assert.ok(!none.includes('<button'), "'none': no Menu button");
  assert.ok(none.includes('<nav class="site-nav" id="site-nav" aria-label="Primary"><ul class="site-nav__list">'), "'none': the list");
});

test('header marks the current link', () => {
  const html = header({});
  assert.ok(html.includes('<li class="site-nav__item is-active"><a href="#">Software</a></li>'), 'is-active on the current link');
  assert.ok(html.includes('<li class="site-nav__item"><a href="#">Data donation</a></li>'), 'none on the others');
  assert.ok(html.includes('<span class="site-header__subtitle">Data donation for research</span>'), 'the tagline');
  assert.ok(!header({ tagline: undefined }).includes('site-header__subtitle'), 'no tagline, no subtitle');
});

const PROVIDERS = [
  { name: 'ODISSEI', key: 'odissei', logo: '/_blob/693138a09fb55860252fdf53cdfdee18' },
  { name: 'Eyra', key: 'eyra', logo: '/_blob/87afcf44ac9de2aea316b5c81eda8dd5' },
];
const footer = (props) => {
  const { D3I, React } = bundle();
  return renderToHtml(React.createElement(D3I.SiteFooter, { providers: PROVIDERS, copyright: '© 2026 datadonation.eu', ...props }));
};

// _includes/site-footer.html: each logo in a cell whose class sizes it (site-footer__cell--<key>).
test('footer with no partners', () => {
  const html = footer({ partners: [] });
  const classes = classesIn(html);
  assert.ok(html.includes('<div class="site-footer__provider"><p class="site-footer__label site-footer__label--small">Provided by</p>'
    + '<div class="site-footer__cell site-footer__cell--odissei"><img src="/_blob/693138a09fb55860252fdf53cdfdee18" alt="ODISSEI"/></div></div>'), 'ODISSEI, provided by');
  assert.ok(html.includes('<p class="site-footer__label site-footer__label--small">Supported by</p>'
    + '<div class="site-footer__cell site-footer__cell--eyra">'), 'Eyra, supported by');
  assert.equal(count(html, 'class="site-footer__provider"'), 2, 'the provider pair');
  assert.ok(!classes.has('site-footer__grid') && !classes.has('site-footer__partners'), 'no partner grid');
  assert.ok(html.includes('<p class="site-footer__copyright">© 2026 datadonation.eu</p>'), 'the copyright line');
});

test('footer rejects a logo the site has not measured', () => {
  assert.throws(() => footer({ partners: [{ name: 'X', key: 'x', logo: '/_blob/1' }] }), /_footer\.scss/);
});

/* Figure, NewsArticle ---------------------------------------------------------------------- */

// The rules of bundle.css, media queries flattened: [selector, declarations].
function cssRules(css) {
  const out = [];
  for (const m of css.replace(/@media[^{]*\{/g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)) out.push([m[1].trim(), m[2]]);
  return out;
}

// Every figure is square and framed by a hairline (#145, carried to the floated one too): no class
// a Figure renders is painted surface-tint.
const tintedSelectors = () => cssRules(readFileSync(join(components, 'bundle.css'), 'utf8'))
  .filter(([, decl]) => decl.includes('var(--surface-tint)')).map(([sel]) => sel);
const classRe = (c) => new RegExp(`\\.${c.replace(/[-_]/g, '\\$&')}(?![\\w-])`);

test('figure has no tint panel', () => {
  const { D3I, React } = bundle();
  const forms = {
    content: { src: '/_blob/1', alt: 'x', caption: 'A caption.' },
    floated: { variant: 'panel', float: 'right', src: '/_blob/1', alt: 'x' },
  };
  const tinted = tintedSelectors();
  const found = [];
  for (const [form, props] of Object.entries(forms)) {
    for (const c of classesIn(renderToHtml(React.createElement(D3I.Figure, props)))) {
      for (const sel of tinted) if (classRe(c).test(sel)) found.push(`${form}: ${c} in ${sel}`);
    }
  }
  assert.deepEqual(found, [], `Figure classes on surface-tint:\n  ${found.join('\n  ')}`);
});

// _includes/page-sections.html: <figure class="page-section__figure page-section__figure--right"><img …></figure>
test('floated figure emits page-section__figure', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.Figure, { variant: 'panel', float: 'right', src: '/_blob/1', alt: 'x' }));
  assert.equal(html, '<figure class="page-section__figure page-section__figure--right"><img src="/_blob/1" alt="x"/></figure>');
});

// _includes/content-page-intro.html writes the date as %-d %B %Y in a <time> with %Y-%m-%d, and
// _includes/news-rail.html each row's date as %b over %-d, then the title as the row's link.
const RAIL = [
  { title: 'Building a Shared Knowledge Base', date: '2026-11-03', href: '#' },
  { title: 'Data Donation Early Career Network', date: '2026-10-12', href: '#' },
  { title: 'Workshop Recap', date: '2026-09-01', href: 'https://example.org/', external: true },
];
const article = (props) => {
  const { D3I, React } = bundle();
  return renderToHtml(React.createElement(D3I.NewsArticle,
    { title: 'Ready to reproduce', date: '2026-11-09', allHref: '#', rail: RAIL, ...props },
    React.createElement('p', null, 'Body')));
};

test('news article rail', () => {
  const html = article({});
  // React writes the prop dateTime as the attribute dateTime; HTML reads attribute names in any case.
  assert.match(html, /<p class="content-page__date"><time datetime="2026-11-09">9 November 2026<\/time><\/p>/i, 'the date as the site writes it');
  assert.ok(html.includes('<h1 class="content-page__title">Ready to reproduce</h1>'), 'the title');
  assert.ok(html.includes('<div class="prose"><p>Body</p></div>'), 'the body in .prose');
  assert.equal(count(html, 'class="news-rail__link"'), 3, 'three rail links');
  assert.ok(html.includes('<li class="news-rail__row"><p class="news-rail__date"><span>Nov</span><b>3</b></p>'
    + '<a class="news-rail__link" href="#">Building a Shared Knowledge Base</a></li>'), 'a row: Nov over 3, then the link');
  assert.ok(html.includes('<span>Sep</span><b>1</b></p><a class="news-rail__link" href="https://example.org/" target="_blank" rel="noopener noreferrer">'), 'an external row opens in a new tab');
  assert.ok(html.includes('<a class="news-rail__all" href="#">All<span class="visually-hidden"> news</span><i class="news-rail__dots"></i><svg class="news-rail__disc" width="22" height="22"'), '"All", its hidden word, the dots and the disc');
});

test('news article without a rail has no aside', () => {
  const html = article({ rail: [] });
  assert.ok(!html.includes('news-rail'), 'no rail');
  assert.ok(html.startsWith('<article class="content-page content-page--news"><div class="content-page__grid content-page__grid--full"><div class="content-page__main">'), 'the article column');
});

/* Slides ----------------------------------------------------------------------------------- */

const slidePreviews = previews.filter((n) => n.startsWith('Slide'));

// The light value of every colour token in tokens.json, lower case, with {references} resolved:
// slides carry the light theme's hex values.
function lightColours() {
  const tokens = JSON.parse(readFileSync(join(root, 'docs/design-system-2/project/tokens.json'), 'utf8')).color.tokens;
  const byName = Object.fromEntries(tokens.map((t) => [t.name, t.value]));
  const light = (v) => {
    const s = typeof v === 'string' ? v : v.light;
    const ref = s.match(/^\{(.+)\}$/);
    return ref ? light(byName[ref[1]]) : s.toLowerCase();
  };
  return { byName: Object.fromEntries(tokens.map((t) => [t.name, light(t.value)])), values: new Set(tokens.map((t) => light(t.value))) };
}

// Every colour a slide writes: its #hex values, and each rgb() as the #hex slideMarkup turns it into.
function slideColours(html) {
  const hex = (n) => (+n).toString(16).padStart(2, '0');
  return [...html.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0].toLowerCase())
    .concat([...html.matchAll(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g)].map((m) => '#' + hex(m[1]) + hex(m[2]) + hex(m[3])));
}

// Pictures are never recoloured (like logos), so the band artwork's own colours (the portraits') are allowed too.
// That lets a slide use an artwork colour (say the portrait's #f15f60) as a UI colour unnoticed; accepted, because
// the new-look tests below catch the likely slip (coral or yellow as text, a tint) and a review sees the rest.
function artworkColours() {
  const dir = join(root, 'docs/design-system-2/project/assets/Network');
  const out = new Set();
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
    for (const m of readFileSync(join(dir, f), 'utf8').matchAll(/#[0-9a-fA-F]{3,8}\b/g)) out.add(m[0].toLowerCase());
  }
  return out;
}
// The colours in html that are neither a token's light value nor one of the band artwork's own.
function strayColours(html) {
  const { values } = lightColours(), art = artworkColours();
  return [...new Set(slideColours(html))].filter((c) => !values.has(c) && !art.has(c));
}

test('slide colours are tokens', () => {
  assert.ok(slidePreviews.length >= 9, 'every Slide preview');
  const bad = [];
  for (const name of slidePreviews) {
    for (const c of strayColours(runPreview(previewPath(name), bundle()))) bad.push(`${name} → ${c}`);
  }
  assert.deepEqual(bad, [], `slide colours that are no token's value:\n  ${bad.join('\n  ')}`);
});

test('a stray slide colour is caught', () => {
  assert.deepEqual(strayColours('<p style="color:#123456">x</p>'), ['#123456'], 'a hex that is no token and not in the artwork');
  assert.deepEqual(strayColours('<p style="color:rgb(18, 52, 86)">x</p>'), ['#123456'], 'the same colour as rgb()');
  assert.deepEqual(strayColours('<p style="color:rgb(66, 114, 239)">x</p>'), [], "blue's rgb() form");
  assert.deepEqual(strayColours('<path fill="#ffd1d2"/>'), [], "the portraits' skin, from the artwork");
});

test('no slide draws the road', () => {
  const src = readFileSync(join(components, 'bundle.js'), 'utf8');
  assert.ok(!src.includes('SlideRoad'), 'SlideRoad is gone from the bundle');
  const road = lightColours().byName.road;
  const found = slidePreviews.filter((name) => slideColours(runPreview(previewPath(name), bundle())).includes(road));
  assert.deepEqual(found, [], `slides drawing the road's ${road}`);
});

// The nodes a slide draws: each <circle>, by its fill and stroke. Filled is a blue disc, a ring is a
// surface disc with a blue ring, and the current part is a coral disc.
function slideNodes(html) {
  const { byName } = lightColours();
  const out = { filled: 0, ring: 0, coral: 0, other: 0 };
  for (const m of html.matchAll(/<circle\b([^>]*)>/g)) {
    const attr = (k) => (m[1].match(new RegExp(`\\s${k}="([^"]*)"`)) || [])[1]?.toLowerCase();
    const fill = attr('fill'), stroke = attr('stroke');
    if (fill === byName.blue && !stroke) out.filled++;
    else if (fill === byName.surface && stroke === byName.blue) out.ring++;
    else if (fill === byName.coral) out.coral++;
    else out.other++;
  }
  return out;
}

const STOPS = ['The data', 'The method', 'Use to date', 'One case in depth', 'For official statistics'];

test('section stop marks the current part', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.SlideSectionStop,
    { part: 'Part II', heading: 'The method', stepNumber: '02', sentence: 'x', stops: STOPS, current: 1, number: 8 }));
  assert.deepEqual(slideNodes(html), { filled: 1, ring: 3, coral: 1, other: 0 }, 'one passed, the current one, three ahead');
  STOPS.forEach((s) => assert.ok(html.includes('>' + s + '</p>'), `the label ${s}`));
});

test('frame cards hang from a line', () => {
  const { D3I, React } = bundle();
  const blue = lightColours().byName.blue;
  for (const n of [2, 3]) {
    const cards = Array.from({ length: n }, (_, i) => ({ eyebrow: 'E' + i, title: 'T' + i, body: 'B' + i }));
    const html = renderToHtml(React.createElement(D3I.SlideFrame, { heading: 'H', cards, number: 5 }));
    assert.match(html, new RegExp(`<path[^>]*stroke="${blue}"`, 'i'), `${n} cards: a blue line`);
    const nodes = slideNodes(html);
    assert.equal(nodes.filled, n, `${n} cards: a filled node above each card`);
    assert.equal(nodes.ring, 2, `${n} cards: a ring node at each end of the line`);
  }
  const bare = renderToHtml(React.createElement(D3I.SlideFrame, { heading: 'H', number: 5 }));
  assert.ok(!bare.includes('<circle'), 'no cards, no line');
});

/* The new look on every slide (docs/superpowers/specs/2026-11-20-slides-new-look-design.md) ---- */

const slideHtml = () => slidePreviews.map((name) => [name, runPreview(previewPath(name), bundle())]);
// A slide's inline style declarations, as [property, value]; SVG attributes are not styles.
const declarations = (html) => [...html.matchAll(/\sstyle="([^"]*)"/g)]
  .flatMap((m) => m[1].split(';').map((d) => d.split(/:(.*)/s).slice(0, 2).map((x) => x.trim())));

// Square corners: a circle (50%) is the only rounding a slide draws.
test('no slide has rounded corners', () => {
  const bad = [];
  for (const [name, html] of slideHtml()) {
    for (const [k, v] of declarations(html)) if (k === 'border-radius' && v !== '50%') bad.push(`${name} → border-radius:${v}`);
  }
  assert.deepEqual(bad, [], `rounded corners:\n  ${bad.join('\n  ')}`);
});

// No tints: a slide's surfaces are white; the band's sky is the one colour block, and only on the cover.
test('no slide paints a tint or a shadow', () => {
  const { byName } = lightColours();
  const tints = ['surface-tint', 'surface-strong', 'blue-tint', 'coral-tint', 'yellow-tint', 'paper'].map((n) => byName[n]);
  const bad = [];
  for (const [name, html] of slideHtml()) {
    for (const c of tints) if (slideColours(html).includes(c)) bad.push(`${name} → ${c}`);
    for (const [k, v] of declarations(html)) if (k === 'box-shadow') bad.push(`${name} → box-shadow:${v}`);
  }
  assert.deepEqual(bad, [], `tints and shadows on slides:\n  ${bad.join('\n  ')}`);
});

// Hairlines are 2px, because 1px thins out on a projector.
test('slide hairlines are 2px', () => {
  const bad = [];
  for (const [name, html] of slideHtml()) {
    for (const [k, v] of declarations(html)) if (/^border/.test(k) && /^1px\b/.test(v)) bad.push(`${name} → ${k}:${v}`);
  }
  assert.deepEqual(bad, [], `1px rules on slides:\n  ${bad.join('\n  ')}`);
});

// Coral and yellow are spots (nodes, a bar that marks the point), never text.
test('coral and yellow are never slide text', () => {
  const { byName } = lightColours();
  const spots = new Set(['coral', 'yellow', 'yellow-text'].map((n) => byName[n]));
  const bad = [];
  for (const [name, html] of slideHtml()) {
    for (const [k, v] of declarations(html)) if (k === 'color' && spots.has(v.toLowerCase())) bad.push(`${name} → color:${v}`);
  }
  assert.deepEqual(bad, [], `coral or yellow text:\n  ${bad.join('\n  ')}`);
});

// Every slide's heading is the serif at 420; its eyebrow is text-muted caps.
test('slide titles are the serif', () => {
  const { byName } = lightColours();
  for (const [name, html] of slideHtml().filter(([n]) => n !== 'SlideCover')) {
    const h2 = html.match(/<h2 [^>]*style="([^"]*)"/);
    assert.ok(h2, `${name}: a title`);
    assert.match(h2[1], /font-family:(?:'|&#x27;)Libre Caslon Condensed(?:'|&#x27;), serif;[^"]*font-weight:420/, `${name}: the title in the serif at 420`);
    const eyebrow = html.match(/<p data-fit="none" style="([^"]*text-transform:uppercase[^"]*)"/);
    if (eyebrow) assert.match(eyebrow[1], new RegExp(`color:${byName['text-muted']}`, 'i'), `${name}: the eyebrow in text-muted`);
  }
});

// slideMarkup needs ReactDOM 18 and a DOM, which the stub has not, so this checks what it would turn
// into markup: each slide is one <section> of inline styles, with no stylesheet and no class to need one.
test('every slide is one section of inline styles', () => {
  assert.equal(slidePreviews.length, 9, 'nine slides');
  for (const name of slidePreviews) {
    const b = bundle();
    runPreview(previewPath(name), b);
    assert.ok(b.ReactDOM.roots.length > 0, `${name}: renders a slide`);
    for (const html of b.ReactDOM.roots.map((r) => renderToHtml(r.tree))) {
      assert.ok(html.startsWith('<section style="') && html.endsWith('</section>'), `${name}: a <section>`);
      assert.equal(count(html, '<section'), 1, `${name}: one <section> per slide`);
      assert.ok(!html.includes('<style'), `${name}: no <style>`);
      assert.ok(!/\sclass=/.test(html), `${name}: no class=`);
    }
  }
  // the previews render SlideCover in its default layout; the band-title layout is checked here
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.SlideCover, { layout: 'band-title', title: 'T', subtitle: 'S' }));
  assert.ok(html.startsWith('<section style="') && html.endsWith('</section>'), 'SlideCover band-title: a <section>');
  assert.equal(count(html, '<section'), 1, 'SlideCover band-title: one <section>');
  assert.ok(!html.includes('<style'), 'SlideCover band-title: no <style>');
  assert.ok(!/\sclass=/.test(html), 'SlideCover band-title: no class=');
});

// The rounded Nunito is retired: slides set headings in the serif and everything else in Nunito Sans.
test('no slide sets the rounded Nunito', () => {
  const { D3I, React } = bundle();
  const htmls = slideHtml().map(([, h]) => h);
  for (const layout of ['network', 'band-title']) htmls.push(renderToHtml(React.createElement(D3I.SlideCover, { layout, title: 'T', subtitle: 'S' })));
  const bad = [];
  for (const html of htmls) for (const m of html.matchAll(/font-family:\s*(?:'|&#x27;)Nunito(?:'|&#x27;)/g)) bad.push(m[0]);
  assert.equal(bad.length, 0, `${bad.length} slide font-family declarations are the rounded Nunito`);
});

// The words a slide shows: its visible text, split on whitespace, less the parts marked data-uncounted (the
// footer row's site name and slide number, and on SlideQuestions' contact row the site and the email address).
// Any other footer text (a source, a credit line) counts. A word is a token with a letter or a digit in it, so
// numerals count and a lone "·" or "→" does not.
function dropUncounted(html) {
  const start = html.search(/<[a-z]+ data-uncounted="true"/);
  if (start < 0) return html;
  const tag = html.slice(start + 1).match(/^[a-z]+/)[0];
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g');
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (!depth) return dropUncounted(html.slice(0, start) + html.slice(re.lastIndex));
  }
  throw new Error('an uncounted element is not closed');
}
function slideWords(html) {
  const text = dropUncounted(html).replace(/<[^>]*>/g, ' ')
    .replace(/&(amp|lt|gt|quot|#x27);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#x27': "'" })[e]);
  return text.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t));
}

test('slide words leave out only the site name, the slide number and the email address', () => {
  const html = '<section><p>Two words</p><p>51 · 2025 →</p><div><p data-uncounted="true"><b>datadonation.eu</b></p><p>a credit</p></div><p>end</p></section>';
  assert.deepEqual(slideWords(html), ['Two', 'words', '51', '2025', 'a', 'credit', 'end']);
  const { D3I, React } = bundle();
  const frame = renderToHtml(React.createElement(D3I.SlideFrame, { heading: 'One two three', number: 7 }));
  assert.deepEqual(slideWords(frame), ['One', 'two', 'three'], 'the site name and the slide number are uncounted');
  const source = 'one two three four five six seven eight nine ten';
  const cited = renderToHtml(React.createElement(D3I.SlideFrame, { heading: 'One two three', number: 7, source }));
  assert.equal(slideWords(cited).length, 13, 'a source in the footer row counts');
  const questions = renderToHtml(React.createElement(D3I.SlideQuestions, { heading: 'H', rows: [{ question: 'Q?' }], email: 'a@b.nl' }));
  assert.deepEqual(slideWords(questions), ['H', 'Q?'], "the closing slide's email and site are uncounted");
  const credited = renderToHtml(React.createElement(D3I.SlideQuestions, { heading: 'H', rows: [{ question: 'Q?' }], email: 'a@b.nl', credit: 'A service provided by ODISSEI and supported by Eyra' }));
  assert.equal(slideWords(credited).length, 11, 'the credit line counts');
});

// A text-only slide has 50 words at the very most (README, Slides · Voice). SlideFrame's panel-only form, with the
// panel the frame preview carried before Task 9.5 (real copy, not made up for the test), stays inside it.
test('a panel-only frame stays under 50 words', () => {
  const { D3I, React } = bundle();
  const html = renderToHtml(React.createElement(D3I.SlideFrame, {
    eyebrow: 'Part I · The data', heading: 'Digital trace data are by-products of platform use', number: 5,
    panel: [
      { eyebrow: 'Definition', text: 'The records that platforms, apps and services retain as a by-product of their use.' },
      { eyebrow: 'Why they matter', text: 'Behaviour observed at a level of detail, and over durations, that self-report cannot provide.' },
    ],
  }));
  assert.ok(slideWords(html).length <= 50, `${slideWords(html).length} words`);
});

// Slides are not read: about 20 words cue the presenter, and the drawing carries the point (README, Slides · Voice).
// Every preview shows that default, each of its slides (both cover layouts, each funnel form).
test('slides stay under 20 words', () => {
  const bad = [];
  for (const name of slidePreviews) {
    const b = bundle();
    runPreview(previewPath(name), b);
    b.ReactDOM.roots.forEach((r, i) => {
      const words = slideWords(renderToHtml(r.tree));
      if (words.length > 20) bad.push(`${name} #${i + 1}: ${words.length} words`);
    });
  }
  assert.deepEqual(bad, [], `slides over 20 words:\n  ${bad.join('\n  ')}`);
});

test('the funnel and the meter in the new look', () => {
  const { D3I, React } = bundle();
  const { byName } = lightColours();
  const stages = [{ label: 'a', pct: 30 }, { label: 'b', pct: 20 }, { label: 'c', pct: 10 }];
  const bars = (html) => [...html.matchAll(/<div style="height:\d+px;width:\d+px;background:(#[0-9a-f]{6})"/gi)].map((m) => m[1].toLowerCase());
  const marked = renderToHtml(React.createElement(D3I.SlideFunnel, { heading: 'H', funnel: { stages } }));
  assert.deepEqual(bars(marked), [byName.blue, byName.blue, byName.coral], 'blue bars, the last one coral: it marks the point');
  const plain = renderToHtml(React.createElement(D3I.SlideFunnel, { heading: 'H', funnel: { stages, markLast: false } }));
  assert.deepEqual(bars(plain), [byName.blue, byName.blue, byName.blue], 'markLast: false, every bar blue');
  const options = [{ eyebrow: 'A', fill: 'all', fillLabel: 'x' }, { eyebrow: 'B', fill: 'strip', fillLabel: 'y', recommended: true }];
  const meter = renderToHtml(React.createElement(D3I.SlideFunnel, { heading: 'H', meter: { options } }));
  const frames = [...meter.matchAll(/background:(#[0-9a-f]{6});border:2px solid (#[0-9a-f]{6});padding:24px"/gi)].map((m) => m.slice(1).join(' ').toLowerCase());
  assert.deepEqual(frames, [`${byName.surface} ${byName.border}`, `${byName.surface} ${byName.blue}`], 'white cards in 2px frames, the recommended one blue');
});

/* SlideCover ------------------------------------------------------------------------------- */

// The network cover's band is project/assets/Slides/cover-network.svg, copied into bundle.js by
// build_slide_cover.py.
test('cover network markup is current', () => {
  execFileSync('python3', ['-I', join(root, 'docs/design-system-2/tools/build_slide_cover.py'), '--check'], { stdio: 'pipe' });
});

const COVER_PROPS = {
  eyebrow: 'D3I · datadonation.eu',
  title: 'Data donation as a data collection method',
  subtitle: 'Digital trace data, donated to science by citizens',
  speakers: 'Niek de Schipper · Danielle McCool',
  venue: 'ODISSEI Conference 2026',
};
const LOGOS = [{ key: 'uu', src: '/_blob/7d397e017f62efccfed2ba8d019a8c9c' }, { key: 'eyra', src: '/_blob/87afcf44ac9de2aea316b5c81eda8dd5' }];
const cover = (props) => {
  const { D3I, React } = bundle();
  return renderToHtml(React.createElement(D3I.SlideCover, { ...COVER_PROPS, ...props }));
};
// The band is one <div data-band="…"> holding no other <div>: its drawing and, on the band-title
// cover, the title and subtitle.
const bandOf = (html) => {
  const m = html.match(/<div data-band="([^"]*)"[^>]*>([\s\S]*?)<\/div>/);
  return m ? { layout: m[1], inner: m[2] } : null;
};

test('cover layouts', () => {
  const network = cover({ markSrc: '/_blob/be4813582be16fc83074c1ca7f78674a' });
  assert.equal(bandOf(network)?.layout, 'network', "'network' by default");
  assert.ok(!bandOf(network).inner.includes(COVER_PROPS.title), "'network': no title in the band");
  assert.ok(network.includes('>' + COVER_PROPS.title + '</h1>'), "'network': the title, under the band");
  assert.ok(network.includes('Niek de Schipper · Danielle McCool · ODISSEI Conference 2026'), "'network': speakers and venue on one line");
  assert.match(bandOf(network).inner, /<image href="\/_blob\/be4813582be16fc83074c1ca7f78674a"/, "'network': the D3I mark from markSrc");
  assert.ok(!bandOf(cover({})).inner.includes('<image'), "'network' without markSrc: no mark, no default picture");

  const titled = cover({ layout: 'band-title', logos: LOGOS });
  assert.equal(bandOf(titled)?.layout, 'band-title');
  assert.ok(bandOf(titled).inner.includes(COVER_PROPS.title), "'band-title': the title in the band");
  assert.ok(bandOf(titled).inner.includes(COVER_PROPS.subtitle), "'band-title': the subtitle in the band");
  assert.match(bandOf(titled).inner, /<p style="[^"]*font-size:24px[^"]*">Digital trace data/, "'band-title': the subtitle at 24px, the projector floor");
  assert.equal(count(titled, '<img '), 2, "'band-title': a logo per entry");
  assert.match(titled, /border-top:2px solid #d5dae3/i, "'band-title': the hairline over the logos");

  const bare = cover({ layout: 'band-title' });
  assert.ok(!bare.includes('<img'), "'band-title' without logos: no logo row");
  assert.ok(!/border-top:2px/.test(bare), "'band-title' without logos: no hairline");
});

// The logo row uses SiteFooter's equal-ink-area sizes (bundle.css's site-footer__cell--<key> and the
// img rule under it) at 1rem = 19.2px, for every logo the footer measures, one logo per row so each
// is drawn at the full 19.2px.
test('cover logos are sized as the footer sizes them', () => {
  const css = readFileSync(join(components, 'bundle.css'), 'utf8');
  const keys = [...css.matchAll(/\.site-footer__cell--([a-z]+)\{/g)].map((m) => m[1]);
  assert.ok(keys.length >= 8, 'every footer logo key');
  const px = (v) => (v * 19.2).toFixed(1) + 'px';
  for (const key of keys) {
    const cell = css.match(new RegExp(`\\.site-footer__cell--${key}\\{width:calc\\(var\\(--logo-scale, 1\\)\\*([\\d.]+)rem\\);height:calc\\(var\\(--logo-scale, 1\\)\\*([\\d.]+)rem\\)`));
    const img = css.match(new RegExp(`\\.site-footer__cell--${key} img\\{[^}]*height:calc\\(var\\(--logo-scale, 1\\)\\*([\\d.]+)rem\\);margin-left:calc\\(var\\(--logo-scale, 1\\)\\*-?([\\d.]+)rem\\);margin-top:calc\\(var\\(--logo-scale, 1\\)\\*-?([\\d.]+)rem\\)`));
    assert.ok(cell && img, `${key}: its cell and img rules in bundle.css`);
    const html = cover({ layout: 'band-title', logos: [{ key, src: '/_blob/1' }] });
    assert.ok(html.includes(`width:${px(+cell[1])};height:${px(+cell[2])}`), `${key}: its cell is ${px(+cell[1])} × ${px(+cell[2])}`);
    const style = html.match(/<img src="\/_blob\/1" alt="" style="([^"]*)"/)[1];
    const [, imgH, left, top] = img.map(Number);
    assert.match(style, new RegExp(`;height:${px(imgH)};`), `${key}: the image is ${px(imgH)} tall`);
    assert.match(style, new RegExp(`margin:-${px(top)} 0 0 -${px(left)}$`), `${key}: the image sits ${px(top)} up and ${px(left)} left`);
  }
  assert.throws(() => cover({ layout: 'band-title', logos: [{ key: 'x', src: '/_blob/1' }] }), /_footer\.scss/);
});

// The cover fills markSrc and bandLabel into a markup string; a replacement pattern ($&, $1, $`)
// in either must come out as written, not as the text it would match.
test('cover keeps $ patterns in its text literally', () => {
  const html = cover({ markSrc: '/_blob/$&x$1', bandLabel: 'a $& b $` c' });
  assert.match(bandOf(html).inner, /<image href="\/_blob\/\$&amp;x\$1"/, 'markSrc, literally');
  assert.ok(bandOf(html).inner.includes('aria-label="a $&amp; b $` c"'), 'bandLabel, literally');
});

// The cover fills its text and the mark's URL into markup, so it must escape them, as the Band does.
test('cover escapes its text', () => {
  for (const layout of ['network', 'band-title']) {
    const plain = cover({ layout });
    const html = cover({ layout, title: 'A & <b>', subtitle: 'S & <i>', speakers: '<b>x</b>', markSrc: '/_blob/1" onload="x' });
    assert.ok(html.includes('A &amp; &lt;b&gt;'), `${layout}: the title, escaped`);
    assert.ok(html.includes('S &amp; &lt;i&gt;'), `${layout}: the subtitle, escaped`);
    assert.equal(count(html, '<b>'), count(plain, '<b>'), `${layout}: no <b> element from the text`);
    assert.ok(!html.includes('" onload="'), `${layout}: markSrc cannot add an attribute`);
  }
});
