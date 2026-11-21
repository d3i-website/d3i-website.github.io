// A stub React 18 that is enough to run the design system's bundle.js and its previews in Node
// and turn what they render into HTML, with no dependencies.
//
//   loadBundle(path)              runs bundle.js in a node:vm context with the stub on window
//   renderToHtml(tree)            the HTML React would put in the DOM for tree
//   classesIn(html)               every class in html's class attributes
//   runPreview(path, bundle)      runs a preview.html's inline script in bundle's context and
//                                 returns the HTML it rendered
//
// Hooks do not re-render: useState returns its initial value and a setter that does nothing,
// effects never run. That is a component's first render, which is what a preview shows.
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const ELEMENT = Symbol.for('react.element');
const FRAGMENT = Symbol.for('react.fragment');
const contexts = new WeakMap();

function noop() {}

function createElement(type, config, ...children) {
  const props = {};
  let key = null;
  if (config != null) {
    if (config.key !== undefined) key = String(config.key);
    for (const k in config) if (k !== 'key' && k !== 'ref') props[k] = config[k];
  }
  if (children.length === 1) props.children = children[0];
  else if (children.length > 1) props.children = children;
  return { $$typeof: ELEMENT, type, key, props };
}

function isValidElement(x) {
  return x != null && typeof x === 'object' && x.$$typeof === ELEMENT;
}

function cloneElement(el, config, ...children) {
  const props = Object.assign({}, el.props);
  let key = el.key;
  if (config != null) {
    if (config.key !== undefined) key = String(config.key);
    for (const k in config) if (k !== 'key' && k !== 'ref') props[k] = config[k];
  }
  if (children.length === 1) props.children = children[0];
  else if (children.length > 1) props.children = children;
  return { $$typeof: ELEMENT, type: el.type, key, props };
}

/* React.Children: null, undefined and booleans count as empty; nested arrays flatten. */
function flatten(children, out = []) {
  if (Array.isArray(children)) for (const c of children) flatten(c, out);
  else out.push(children == null || typeof children === 'boolean' ? null : children);
  return out;
}
const Children = {
  toArray: (children) => flatten(children).filter((c) => c !== null),
  map(children, fn) {
    if (children == null) return children;
    return flatten(flatten(children).map((c, i) => fn(c, i))).filter((c) => c !== null);
  },
  forEach(children, fn) { flatten(children).forEach((c, i) => fn(c, i)); },
  count: (children) => flatten(children).length,
  only(children) {
    if (!isValidElement(children)) throw new Error('React.Children.only expected to receive a single React element child.');
    return children;
  },
};

function makeReact() {
  let ids = 0;
  return {
    createElement,
    cloneElement,
    isValidElement,
    Children,
    Fragment: FRAGMENT,
    useState: (initial) => [typeof initial === 'function' ? initial() : initial, noop],
    useEffect: noop,
    useLayoutEffect: noop,
    useRef: (current) => ({ current }),
    useMemo: (fn) => fn(),
    useCallback: (fn) => fn,
    useId: () => ':r' + (ids++).toString(32) + ':',
  };
}

function makeReactDOM() {
  const roots = [];
  return {
    roots,
    createRoot(container) {
      const root = { container, tree: undefined, render(tree) { root.tree = tree; }, unmount() { root.tree = undefined; } };
      roots.push(root);
      return root;
    },
  };
}

export function loadBundle(path) {
  const React = makeReact();
  const ReactDOM = makeReactDOM();
  const document = {
    getElementById: (id) => ({ id }),
    createElement: (tagName) => ({ tagName }),
  };
  const context = vm.createContext({ React, ReactDOM, document, console });
  context.window = context;
  vm.runInContext(readFileSync(path, 'utf8'), context, { filename: path });
  const bundle = { D3I: context.D3I, React, ReactDOM };
  contexts.set(bundle, context);
  return bundle;
}

/* HTML ------------------------------------------------------------------------------------- */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const BOOLEAN = new Set(['allowFullScreen', 'async', 'autoFocus', 'autoPlay', 'checked', 'controls', 'default', 'defer', 'disabled',
  'formNoValidate', 'hidden', 'loop', 'multiple', 'muted', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed',
  'selected']);
/* props whose attribute is spelled differently; SVG's camelCase presentation attributes take hyphens */
const ATTR = {
  className: 'class', htmlFor: 'for', tabIndex: 'tabindex', readOnly: 'readonly', autoFocus: 'autofocus', autoPlay: 'autoplay',
  playsInline: 'playsinline', crossOrigin: 'crossorigin', srcSet: 'srcset', colSpan: 'colspan', rowSpan: 'rowspan',
  maxLength: 'maxlength', autoComplete: 'autocomplete', xlinkHref: 'xlink:href', xmlnsXlink: 'xmlns:xlink',
};
const SVG_HYPHENATED = ['alignmentBaseline', 'clipPath', 'clipRule', 'dominantBaseline', 'fillOpacity', 'fillRule', 'floodColor',
  'floodOpacity', 'fontFamily', 'fontSize', 'fontWeight', 'markerEnd', 'markerMid', 'markerStart', 'paintOrder', 'shapeRendering',
  'stopColor', 'stopOpacity', 'strokeDasharray', 'strokeDashoffset', 'strokeLinecap', 'strokeLinejoin', 'strokeMiterlimit',
  'strokeOpacity', 'strokeWidth', 'textAnchor', 'textDecoration', 'vectorEffect'];
for (const k of SVG_HYPHENATED) ATTR[k] = k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
/* CSS properties that take a bare number; every other number gets px */
const UNITLESS = new Set(['animationIterationCount', 'aspectRatio', 'borderImageOutset', 'borderImageSlice', 'borderImageWidth',
  'columnCount', 'columns', 'flex', 'flexGrow', 'flexShrink', 'flexOrder', 'flexPositive', 'flexNegative', 'gridArea', 'gridRow',
  'gridRowEnd', 'gridRowSpan', 'gridRowStart', 'gridColumn', 'gridColumnEnd', 'gridColumnSpan', 'gridColumnStart', 'fontWeight',
  'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'scale', 'tabSize', 'widows', 'zIndex', 'zoom', 'fillOpacity',
  'floodOpacity', 'stopOpacity', 'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth']);

function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' })[c]);
}

function css(style) {
  const out = [];
  for (const k in style) {
    const v = style[k];
    if (v == null || typeof v === 'boolean' || v === '') continue;
    const custom = k.startsWith('--');
    const name = custom ? k : k.replace(/^ms(?=[A-Z])/, '-ms').replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
    const value = typeof v === 'number' && v !== 0 && !custom && !UNITLESS.has(k) ? v + 'px' : String(v).trim();
    out.push(name + ':' + value);
  }
  return out.join(';');
}

function attributes(props) {
  let out = '';
  for (const k in props) {
    const v = props[k];
    if (k === 'children' || k === 'dangerouslySetInnerHTML' || k === 'key' || k === 'ref') continue;
    if (/^on[A-Z]/.test(k) || typeof v === 'function' || typeof v === 'symbol' || v == null) continue;
    if (k === 'style') {
      const s = css(v);
      if (s) out += ' style="' + escape(s) + '"';
      continue;
    }
    const name = ATTR[k] || k;
    if (typeof v === 'boolean') {
      if (k.startsWith('aria-') || k.startsWith('data-')) out += ' ' + name + '="' + v + '"';
      else if (v && BOOLEAN.has(k)) out += ' ' + name + '=""';
      continue;
    }
    out += ' ' + name + '="' + escape(v) + '"';
  }
  return out;
}

export function renderToHtml(tree) {
  if (tree == null || typeof tree === 'boolean') return '';
  if (typeof tree === 'string' || typeof tree === 'number') return escape(tree);
  if (Array.isArray(tree)) return tree.map(renderToHtml).join('');
  if (!isValidElement(tree)) throw new Error('renderToHtml: not a React node: ' + String(tree));
  const { type, props } = tree;
  if (type === FRAGMENT) return renderToHtml(props.children);
  if (typeof type === 'function') return renderToHtml(type(props));
  if (typeof type !== 'string') throw new Error('renderToHtml: unknown element type ' + String(type));
  const open = '<' + type + attributes(props);
  if (VOID.has(type)) return open + '/>';
  const inner = props.dangerouslySetInnerHTML ? props.dangerouslySetInnerHTML.__html : renderToHtml(props.children);
  return open + '>' + inner + '</' + type + '>';
}

export function classesIn(html) {
  const out = new Set();
  for (const m of html.matchAll(/\sclass=(?:"([^"]*)"|'([^']*)')/g)) {
    for (const c of (m[1] ?? m[2]).split(/\s+/)) if (c) out.add(c);
  }
  return out;
}

export function runPreview(previewPath, bundle) {
  const context = contexts.get(bundle);
  if (!context) throw new Error('runPreview: pass a bundle that loadBundle returned');
  const html = readFileSync(previewPath, 'utf8');
  const roots = bundle.ReactDOM.roots;
  const before = roots.length;
  for (const m of html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    vm.runInContext(m[1], context, { filename: previewPath });
  }
  return roots.slice(before).map((r) => renderToHtml(r.tree)).join('');
}
