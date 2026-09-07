// Validate admin/config.yml against the JSON schema published with the
// Sveltia CMS version pinned in admin/index.html — the same schema the CMS
// checks at load time. A failure here means nobody can sign in to the admin.
//
// Usage (needs Node 20+; deps are not committed):
//   npm install --no-save --no-package-lock @cfworker/json-schema yaml
//   node cms/validate-config.mjs [path/to/config.yml]
//
// Behind a proxy, set NODE_USE_ENV_PROXY=1 so fetch honours HTTPS_PROXY, or
// download the schema yourself and point SVELTIA_SCHEMA at the file.
//
// Unknown options are reported by Sveltia as console warnings, not errors,
// so the closed-object constraints are dropped before validating: what
// remains are the hard errors (missing required options, wrong types or
// values) that block sign-in.
import { readFileSync } from 'node:fs';
import { Validator } from '@cfworker/json-schema';
import { parse } from 'yaml';

const configPath = process.argv[2] ?? 'admin/config.yml';
const html = readFileSync('admin/index.html', 'utf8');
const version = html.match(/@sveltia\/cms@(\d+\.\d+\.\d+)\/dist\//)?.[1];

if (!version) {
  console.error('admin/index.html must load a pinned @sveltia/cms@<version>/dist/sveltia-cms.js');
  process.exit(1);
}

const loadSchema = async () => {
  if (process.env.SVELTIA_SCHEMA) {
    return JSON.parse(readFileSync(process.env.SVELTIA_SCHEMA, 'utf8'));
  }

  const schemaUrl = `https://unpkg.com/@sveltia/cms@${version}/schema/sveltia-cms.json`;
  const response = await fetch(schemaUrl);

  if (!response.ok) {
    console.error(`Could not fetch ${schemaUrl}: HTTP ${response.status}`);
    process.exit(1);
  }

  return response.json();
};

const openObjects = (node) => {
  if (Array.isArray(node)) return node.map(openObjects);
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node)
        .filter(([key, value]) => !(key === 'additionalProperties' && value === false))
        .map(([key, value]) => [key, openObjects(value)]),
    );
  }
  return node;
};

const schema = openObjects(await loadSchema());
const config = parse(readFileSync(configPath, 'utf8'));
const { valid, errors } = new Validator(schema, '7', false).validate(config);

if (valid) {
  console.log(`${configPath} is valid against the Sveltia CMS ${version} schema`);
  process.exit(0);
}

// The schema is built from unions of object types, so the raw output lists
// every branch that didn't match. Keep the leaf problems and their locations.
const containers = ['anyOf', 'oneOf', 'allOf', 'if', 'then', 'else', 'properties', 'items', '$ref', 'not'];
const problems = [...new Set(
  errors
    .filter(({ keyword }) => !containers.includes(keyword))
    .map(({ instanceLocation, error }) => `${instanceLocation}: ${error}`),
)];

console.error(`${configPath} FAILS the Sveltia CMS ${version} schema (${problems.length} problems):`);
problems.slice(0, 60).forEach((line) => console.error(`  ${line}`));
process.exit(1);
