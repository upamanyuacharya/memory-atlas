/**
 * Memory Atlas verification harness.
 *
 * Drives every region into a known state, freezes the owned clock
 * (__atlas.freeze) so frames are deterministic, then applies two kinds of gate:
 *   1. Content probes  — DOM assertions + pixel-class counts per visual class
 *                        ("amber spill pixels exist in the right half"), because
 *                        healthy stats do NOT prove the GPU rendered anything.
 *   2. Baseline diffs  — mean |Δ| per channel vs tools/baselines/<state>.png.
 *
 * Usage:
 *   npm i                    (once; playwright-core drives the installed Edge)
 *   npm run verify           compare against baselines, fail on drift
 *   npm run verify:update    re-bless baselines after an intended visual change
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { PNG } from 'pngjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOTS = path.join(ROOT, 'tools', 'shots');
const BASE = path.join(ROOT, 'tools', 'baselines');
const UPDATE = process.argv.includes('--update');
const PORT = 4321;
const DIFF_TOLERANCE = 0.035; // mean abs channel diff (0..1)

const MIME = { '.html': 'text/html', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain', '.js': 'text/javascript', '.json': 'application/json' };
function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]) === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
      fs.readFile(p, (err, data) => {
        if (err) { rsp.writeHead(404); rsp.end(); return; }
        rsp.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
        rsp.end(data);
      });
    }).listen(PORT, () => res(srv));
  });
}

/* ---------- pixel helpers (pngjs) ---------- */
const isGreen = (r, g, b) => g > 110 && g - r > 25 && g - b > 30;
const isAmber = (r, g, b) => r > 140 && g > 80 && r - g > 30 && g - b > 40;
const isTeal = (r, g, b) => g > 150 && b > 140 && g - r > 40;
function countClass(png, rect, cls) {
  const [x0, y0, x1, y1] = rect.map((v, i) => Math.floor(v * (i % 2 ? png.height : png.width)));
  let n = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const i = (y * png.width + x) * 4;
    if (cls(png.data[i], png.data[i + 1], png.data[i + 2])) n++;
  }
  return n;
}
function lumaStddev(png, rect) {
  const [x0, y0, x1, y1] = rect.map((v, i) => Math.floor(v * (i % 2 ? png.height : png.width)));
  let s = 0, s2 = 0, n = 0;
  for (let y = y0; y < y1; y += 2) for (let x = x0; x < x1; x += 2) {
    const i = (y * png.width + x) * 4;
    const l = 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
    s += l; s2 += l * l; n++;
  }
  const m = s / n;
  return Math.sqrt(Math.max(0, s2 / n - m * m));
}
function meanDiff(a, b) {
  if (a.width !== b.width || a.height !== b.height) return 1;
  let d = 0, n = 0;
  for (let i = 0; i < a.data.length; i += 16) { // stride 4 px
    d += Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    n += 3;
  }
  return d / n / 255;
}

/* ---------- states: setup + probes ----------
   rects are viewport-relative [x0,y0,x1,y1]. */
const STATES = [
  {
    name: 'map',
    setup: async p => { await p.evaluate(() => window.__atlas.go('map')); await p.waitForTimeout(1700); },
    dom: async p => {
      const s = await p.evaluate(() => ({
        css2d: window.__atlas.countCSS2D(), region: window.__atlas.region,
        sats: document.querySelectorAll('.lbl3d.sat').length,
        gold: document.querySelectorAll('.lbl3d.gold').length,
        start: !!document.querySelector('.lbl3d.starthere'),
      }));
      if (s.region !== 'map') throw `region=${s.region}`;
      if (s.css2d < 10) throw `only ${s.css2d} labels`;
      if (s.sats < 15) throw `only ${s.sats} satellite topics on the map (expected 15)`;
      if (s.gold !== 4) throw `${s.gold} gold investor nodes (expected 4)`;
      if (!s.start) throw 'START HERE pointer missing';
    },
    px: png => { if (lumaStddev(png, [0.35, 0.2, 0.75, 0.8]) < 8) throw 'centre crop looks blank'; },
  },
  {
    name: 'stack-hbm',
    setup: async p => {
      await p.evaluate(() => window.__atlas.go('hierarchy')); await p.waitForTimeout(1500);
      await p.click('#railcore [data-layer="hbm"]'); await p.waitForTimeout(900);
    },
    dom: async p => {
      const s = await p.evaluate(() => ({
        open: document.getElementById('panel').classList.contains('open'),
        reading: document.body.classList.contains('reading'),
        back: !!document.querySelector('#panel .pback'),
        h2: (document.querySelector('#phead h2') || {}).textContent,
        eli: !!document.querySelector('.pblk.eli'),
        why: document.body.textContent.includes('WHERE THE CHOKEPOINT COMES FROM'),
      }));
      if (!s.open) throw 'panel not open';
      if (!s.reading) throw 'reading mode not engaged (body.reading missing)';
      if (!s.back) throw 'panel back button missing';
      if (s.h2 !== 'HBM3E / HBM4') throw `h2=${s.h2}`;
      if (!s.eli) throw 'plain-english block missing';
      if (!s.why) throw 'chokepoint-why block missing';
    },
    px: png => { if (lumaStddev(png, [0.05, 0.2, 0.5, 0.8]) < 8) throw 'stack crop looks blank'; },
  },
  {
    name: 'cxl',
    setup: async p => { await p.evaluate(() => window.__atlas.go('cxl')); await p.waitForTimeout(1700); },
    dom: async p => {
      const s = await p.evaluate(() => ({ seg: document.querySelectorAll('#cxlSeg button').length, css2d: window.__atlas.countCSS2D() }));
      if (s.seg !== 3) throw `cxl seg buttons=${s.seg}`;
      if (s.css2d < 10) throw `only ${s.css2d} labels`;
    },
    px: png => { if (lumaStddev(png, [0.3, 0.15, 0.8, 0.85]) < 8) throw 'cxl crop looks blank'; },
  },
  {
    name: 'photonics',
    setup: async p => { await p.evaluate(() => window.__atlas.go('photonics')); await p.waitForTimeout(1700); },
    dom: async p => {
      const s = await p.evaluate(() => ({ wdm: !!document.getElementById('wdmT'), err: window.__atlas.lastErr() }));
      if (!s.wdm) throw 'WDM toggle missing';
    },
    px: png => { if (lumaStddev(png, [0.3, 0.15, 0.85, 0.75]) < 8) throw 'photonics crop looks blank'; },
  },
  {
    name: 'kvcache',
    setup: async p => {
      await p.evaluate(() => window.__atlas.go('kvcache')); await p.waitForTimeout(1700);
      await p.evaluate(() => { window.__atlas.kvStep(); window.__atlas.kvStep(); window.__atlas.kvStep(); });
      await p.waitForTimeout(700);
    },
    dom: async p => {
      const s = await p.evaluate(() => ({ n: document.getElementById('kvrN').textContent, head: document.getElementById('whT').textContent, step: document.getElementById('kvrStep').textContent }));
      if (s.n !== '6') throw `words=${s.n}`;
      if (!/ONE/.test(s.head)) throw `headline=${s.head}`;
      if (s.step !== '1') throw `per-step=${s.step}`;
      // cache-off mode flips the story (DOM-only check, then restore)
      const off = await p.evaluate(() => { window.__atlas.kvCache(false); return document.getElementById('whT').textContent; });
      if (!/ALL 6 pairs/.test(off)) throw `off-headline=${off}`;
      await p.evaluate(() => window.__atlas.kvCache(true));
      await p.waitForTimeout(150);
    },
    px: png => {
      const t = countClass(png, [0.2, 0.45, 0.8, 0.8], isTeal);
      if (t < 300) throw `only ${t} teal key-slab pixels`;
    },
  },
  {
    name: 'wall-fit',
    setup: async p => {
      await p.evaluate(() => { window.__atlas.go('ai'); window.__atlas.setKV(1, 16, 8); });
      await p.waitForTimeout(1800);
    },
    dom: async p => {
      const s = await p.evaluate(() => ({ head: document.getElementById('whT').textContent, gpus: document.getElementById('kvGpus').textContent }));
      if (!/ONE B200/.test(s.head)) throw `headline=${s.head}`;
      if (s.gpus !== '1') throw `gpus=${s.gpus}`;
    },
    px: png => {
      const g = countClass(png, [0.42, 0.2, 0.62, 0.45], isGreen);
      if (g < 300) throw `only ${g} green chat-slab pixels in tank crop`;
    },
  },
  {
    name: 'wall-spill',
    setup: async p => { await p.evaluate(() => window.__atlas.setKV(1, 16, 24)); await p.waitForTimeout(1500); },
    dom: async p => {
      const s = await p.evaluate(() => ({ head: document.getElementById('whT').textContent, gpus: document.getElementById('kvGpus').textContent }));
      if (!/2 × B200 GPUs/.test(s.head)) throw `headline=${s.head}`;
      if (s.gpus !== '2') throw `gpus=${s.gpus}`;
    },
    px: png => {
      const a = countClass(png, [0.5, 0.15, 0.95, 0.8], isAmber);
      if (a < 800) throw `only ${a} amber spill pixels in right half`;
    },
  },
  {
    name: 'wall-1t',
    setup: async p => { await p.evaluate(() => window.__atlas.setKV(3, 16, 24)); await p.waitForTimeout(1500); },
    dom: async p => {
      const s = await p.evaluate(() => ({ head: document.getElementById('whT').textContent, gpus: document.getElementById('kvGpus').textContent }));
      if (!/6 × B200 GPUs/.test(s.head)) throw `headline=${s.head}`;
      if (s.gpus !== '6') throw `gpus=${s.gpus}`;
    },
    px: png => {
      const a = countClass(png, [0.45, 0.15, 0.98, 0.85], isAmber);
      if (a < 2000) throw `only ${a} amber pixels across ghost GPUs`;
    },
  },
  {
    // Behavioral: the journey spine actually drives the app — stepping opens
    // regions, reading panels and the investor tabs, and Home returns to the map.
    name: 'journey',
    behavioral: true,
    setup: async p => { await p.evaluate(() => window.__atlas.go('map')); await p.waitForTimeout(1400); },
    dom: async p => {
      const len = await p.evaluate(() => window.__atlas.jLen);
      if (len < 20) throw `journey too short (${len} steps) — topics missing`;
      // step 1: the problem (reading mode over The Wall)
      await p.evaluate(() => window.__atlas.jGo(1));
      await p.waitForTimeout(1600);
      let s = await p.evaluate(() => ({ region: window.__atlas.region, open: document.getElementById('panel').classList.contains('open'), h2: (document.querySelector('#phead h2') || {}).textContent }));
      if (s.region !== 'ai') throw `step 1 region=${s.region}`;
      if (!s.open || !/KV-Cache Economics/.test(s.h2)) throw `step 1 panel: open=${s.open} h2=${s.h2}`;
      // an investor step opens the Intel modal on the right tab
      const gold = await p.evaluate(() => { window.__atlas.jGo(21); return null; });
      await p.waitForTimeout(700);
      s = await p.evaluate(() => ({ on: document.getElementById('watchModal').classList.contains('on'), txt: document.getElementById('wmBody').textContent.slice(0, 400) }));
      if (!s.on) throw 'investor step did not open the Intel modal';
      // arrow key advances
      await p.evaluate(() => window.__atlas.jGo(0));
      await p.waitForTimeout(900);
      await p.keyboard.press('ArrowRight');
      await p.waitForTimeout(1400);
      const ji = await p.evaluate(() => window.__atlas.jI);
      if (ji !== 1) throw `ArrowRight moved pointer to ${ji}, expected 1`;
      await p.evaluate(() => { window.__atlas.jGo(0); });
      await p.waitForTimeout(900);
      const err = await p.evaluate(() => window.__atlas.lastErr());
      if (err) throw `lastErr: ${err}`;
    },
  },
  {
    // Behavioral: prove the loop renders ZERO frames while idle (the fan fix),
    // and that it WAKES on interaction. This is the regression guard for the
    // rest-state model — a reintroduced continuous loop fails here loudly.
    name: 'idle-rest',
    behavioral: true,
    setup: async p => {
      await p.evaluate(() => window.__atlas.go('map'));
      await p.waitForTimeout(2200); // let the fly-in tween finish
    },
    dom: async p => {
      await p.evaluate(() => window.__atlas.sleep()); // drop the wake window; no tweens now → truly idle
      await p.waitForTimeout(400);
      const f0 = await p.evaluate(() => window.__atlas.frames());
      await p.waitForTimeout(1600);
      const f1 = await p.evaluate(() => window.__atlas.frames());
      const idleFrames = f1 - f0;
      if (idleFrames > 1) throw `idle loop drew ${idleFrames} frames in 1.6s — rest-state broken (expected 0)`;
      // now prove it wakes on a region change
      await p.evaluate(() => window.__atlas.go('cxl'));
      await p.waitForTimeout(600);
      const f2 = await p.evaluate(() => window.__atlas.frames());
      if (f2 - f1 < 3) throw `scene did not wake on region change (${f2 - f1} frames)`;
    },
  },
];

/* ---------- main ---------- */
const srv = await serve();
fs.mkdirSync(SHOTS, { recursive: true });
fs.mkdirSync(BASE, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
page.on('pageerror', e => pageErrors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') pageErrors.push(m.text()); });

await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2800);
// determinism: pause CSS animations/transitions too — the owned clock only governs the canvas
await page.addStyleTag({ content: '*{animation-play-state:paused!important;transition:none!important}' });
await page.evaluate(() => { try { localStorage.setItem('atlas_seen', '1'); } catch (e) {} });

let failed = 0;
for (const st of STATES) {
  let verdicts = [];
  try {
    await page.evaluate(() => window.__atlas.thaw());
    await st.setup(page);
    // behavioral gates assert runtime behavior (frame counts, wake/sleep) — no frozen
    // frame, no screenshot, no baseline. The dom() callback owns the assertions.
    if (st.behavioral) {
      const err0 = await page.evaluate(() => window.__atlas.lastErr());
      if (err0) throw `lastErr: ${err0}`;
      await st.dom(page);
      console.log(`✓ ${st.name}  behavioral gate passed`);
      continue;
    }
    await page.evaluate(() => window.__atlas.freeze(11.0));
    await page.waitForTimeout(120);
    const err = await page.evaluate(() => window.__atlas.lastErr());
    if (err) throw `lastErr: ${err}`;
    await st.dom(page);
    const shotPath = path.join(SHOTS, `${st.name}.png`);
    await page.screenshot({ path: shotPath });
    const png = PNG.sync.read(fs.readFileSync(shotPath));
    st.px(png);
    const basePath = path.join(BASE, `${st.name}.png`);
    if (UPDATE) { fs.copyFileSync(shotPath, basePath); verdicts.push('baseline blessed'); }
    else if (fs.existsSync(basePath)) {
      const d = meanDiff(png, PNG.sync.read(fs.readFileSync(basePath)));
      if (d > DIFF_TOLERANCE) throw `baseline drift ${(d * 100).toFixed(1)}% > ${(DIFF_TOLERANCE * 100).toFixed(1)}%`;
      verdicts.push(`diff ${(d * 100).toFixed(2)}%`);
    } else verdicts.push('no baseline (run verify:update)');
    console.log(`✓ ${st.name}  ${verdicts.join(' · ')}`);
  } catch (e) {
    failed++;
    console.error(`✗ ${st.name}  ${e}`);
  }
}
if (pageErrors.length) { failed++; console.error(`✗ page errors:\n  ${pageErrors.join('\n  ')}`); }

await browser.close();
srv.close();
console.log(failed ? `\n${failed} gate(s) FAILED` : '\nall gates passed');
process.exit(failed ? 1 : 0);
