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
let out = html.slice(0, a) + inlined + html.slice(b + END.length);

// <noscript> index — generated from the data so its counts and links can never go stale
const D = await import(pathToFileURL(DATA).href + `?t=${Date.now()}`);
const NB = '<!--@@NOSCRIPT:BEGIN@@-->', NE = '<!--@@NOSCRIPT:END@@-->';
const na = out.indexOf(NB), nb = out.indexOf(NE);
if (na < 0 || nb < 0) throw new Error('index.html is missing the @@NOSCRIPT markers');
const nodes = D.HIER.concat(Object.values(D.EXTRA));
const escT = s => String(s).replace(/<[^>]+>/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
const li = (href, t) => `      <li><a href="${href}" style="color:#5eead4">${escT(t)}</a></li>`;
const noscript = `${NB}
    <p>The 3D explorer needs JavaScript and WebGL. <b>Every file in it is also available as plain pages:</b> <a href="read/" style="color:#5eead4">the text edition</a> — the ${D.JOURNEY.length}-stop journey, ${nodes.length} files, all ${Object.keys(D.CO).length} companies and the investor views. Data as of ${D.DATA_ASOF}.</p>
    <ul style="columns:2;gap:24px;padding-left:18px">
${nodes.map(n => li(`read/${n.id}.html`, n.name)).join('\n')}
${li('read/investor.html', 'Investor Intelligence')}
${li('read/companies.html', 'All companies')}
${li('read/wall.html', 'The Wall calculator')}
    </ul>
    ${NE}`;
out = out.slice(0, na) + noscript + out.slice(nb + NE.length);

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
