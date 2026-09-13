/**
 * Memory Atlas build.
 *   node tools/build.mjs        → inline data/atlas-data.js into index.html (between the
 *                                 @@DATA markers) and prerender the /read/ text edition.
 *   node tools/build.mjs --check  → fail if index.html is out of date vs the data file.
 *
 * index.html stays the single-file deliverable; data/atlas-data.js is the only
 * thing a content refresh edits. The engine never imports the data at runtime —
 * it is inlined, so file:// and the no-build README promise both still hold.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX = path.join(ROOT, 'index.html');
const DATA = path.join(ROOT, 'data', 'atlas-data.js');
const CHECK = process.argv.includes('--check');
const BEGIN = '/*@@DATA:BEGIN@@*/', END = '/*@@DATA:END@@*/';

const html = fs.readFileSync(INDEX, 'utf8');
const a = html.indexOf(BEGIN), b = html.indexOf(END);
if (a < 0 || b < 0 || b < a) throw new Error('index.html is missing the @@DATA markers');

let data = fs.readFileSync(DATA, 'utf8');
// strip the file header comment (engine already documents the model) and `export `
data = data.replace(/^\/\*[\s\S]*?\*\/\s*/, '').replace(/^export const /gm, 'const ');
const inlined = `${BEGIN}\n// ---- generated from data/atlas-data.js by tools/build.mjs — edit THAT file, not this block ----\n${data.trim()}\n${END}`;
const out = html.slice(0, a) + inlined + html.slice(b + END.length);

if (CHECK) {
  if (out !== html) { console.error('index.html is stale — run `npm run build`'); process.exit(1); }
  console.log('index.html is in sync with data/atlas-data.js');
} else {
  if (out !== html) { fs.writeFileSync(INDEX, out); console.log('index.html: data block rebuilt'); }
  else console.log('index.html: data block unchanged');
}

// /read/ text edition
const { buildRead } = await import(pathToFileURL(path.join(ROOT, 'tools', 'read.mjs')).href);
const n = await buildRead({ check: CHECK });
console.log(`/read/: ${n} pages ${CHECK ? 'checked' : 'written'}`);
