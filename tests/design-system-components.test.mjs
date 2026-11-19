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

test('every class a website component emits is used by the site', () => {
  const used = classesOfSite();
  const missing = [];
  for (const name of previews.filter((n) => !n.startsWith('Slide'))) {
    for (const c of classesIn(runPreview(previewPath(name), bundle()))) {
      if (c.startsWith('pv')) continue; // preview scaffolding (pv, pv-row), not component output
      if (!used.has(c)) missing.push(`${name} → ${c}`);
    }
  }
  assert.deepEqual(missing, [], `classes the site does not use:\n  ${missing.join('\n  ')}`);
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
