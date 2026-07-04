# The Memory Atlas

An interactive 3D explainer of the **AI memory & interconnect supply chain** — HBM, CXL and silicon photonics — built for a business/investor lens: *who makes what, the bottlenecks, which countries, the metrics, and who matters most.* It takes someone from zero knowledge to a working grasp of where the value and the chokepoints sit.

Single self-contained file: **`index.html`** (no build step). Loads Three.js r161 and Google Fonts from CDNs, so it needs an internet connection.

---

## Run it

- **Quickest:** double-click `index.html` (clicks work on `file://` — the raycaster is bound to the canvas and refreshes the camera matrix before every pick).
- **Local server (for the preview tooling / clean reloads):**
  ```
  cd memory-stack-explorer
  python -m http.server 4319
  # open http://127.0.0.1:4319/
  ```

## Deploy it (to make it shareable)

It's a static file — drop `index.html` on any static host. For the existing WordOps box (`root@172.104.47.189`, webroot `/var/www/upamanyuacharya.com`), e.g.:
```
scp index.html root@172.104.47.189:/var/www/<site>/htdocs/memory-atlas/index.html
```
or fold it into the Jeff reports pipeline (`jeff.upamanyuacharya.com/reports/<slug>/`). The OG/Twitter meta tags are already set for link previews (an `og:image` is still TODO — generate a 1200×630 hero if you want rich social cards).

---

## What's in it

Five interlinked **regions** in one continuous 3D world (drag to orbit; the overview map idle-orbits and stops on interaction):

| Region | What it shows |
|---|---|
| **Map** | A knowledge-graph of the 4 themes as glowing rounded-cube nodes joined by labelled relationship edges ("HBM holds the KV cache", "optical CXL"…). Click a node to fly in. |
| **Stack** | The 8-layer memory hierarchy (Registers → L1/L2 → HBM → DDR5 → CXL → NVMe → Network) as premium glass slabs; width ∝ capacity, particle speed ∝ bandwidth. |
| **CXL** | A coherent switch + hosts + Type-3 memory modules; toggle Expansion / Pooling / Sharing. |
| **Photonics** | Copper-vs-light: a lossy electrical link vs a WDM optical waveguide; the laser bottleneck callout. |
| **The Wall** | The memory-wall curves + a **live KV-cache calculator**: model / context / batch → KV size, GPUs needed, $ cost, ms/token, with an adaptive plain-English takeaway. |

Every clickable object opens a **fractal panel** (Overview · Who-makes-it · Metrics · Geography) with an *"In plain English"* intro, a market-share bar where there's an oligopoly, a bottleneck-severity meter, and **company cards** that link two ways ("where it shows up" backlinks jump you to every other node a company touches).

Two top-bar entry points: a **guided zero-to-expert tour** (6 narrated steps, ←/→ to navigate) and the **Investor Intelligence** panel with four tabs — **Shortlist** (who matters most), **By layer**, **By country** (single-point-of-failure risk), and **Roadmap** (2025–2030 catalysts).

---

## Architecture (all in `index.html`)

It's one HTML file: `<style>` (design system) + an importmap + one ES-module `<script>`.

**Content data (edit these to extend):**
- `CO` — the company dictionary, keyed by id: `{n, tk (ticker), ctry, slug (Simple Icons or ''), role, makes, mx (watch-metrics)}`.
- `HIER` — the 8 hierarchy-layer nodes: `{id, name, kind, col, cap/bw/lat/en, sev, blurb, biz, cos:[companyIds], geo, mx, related, share?}`.
- `EXTRA` — the deep CXL/photonics/AI nodes (`cxl_switch`, `phot_laser`, `kv_econ`, …) with the same shape (use `stats:[]` instead of cap/bw when not a memory layer).
- `ELI` — the plain-English paragraph per node id.
- `WATCH_GROUPS`, `GEO`, `ROADMAP`, `SHORTLIST` — the four Investor Intelligence tabs.
- `MAPNODES` / `MAPEDGES` — the overview graph (positions, the optional 4th edge value is the label arc-height).

**Engine:** `findNode(id)` resolves HIER+EXTRA; `companyBacklinks(cid)` computes the reverse index; `openNode` / `renderPanelBody` draw the fractal panel; `buildMap/buildHierarchy/buildCXL/buildPhotonics/buildAI` build each region's Three.js group; `enterRegion` swaps regions; `renderIntel` drives the modal tabs.

**To add a company:** add an entry to `CO`, then list its id in any node's `cos`, the relevant `WATCH_GROUPS`/`GEO`/`ROADMAP`/`SHORTLIST`. Backlinks and chips wire up automatically.

---

## Constraints & gotchas (learned while building)

- **Raycasting:** bind to `renderer.domElement` (canvas), *not* the CSS2D label layer (it's `pointer-events:none`), and call `camera.updateMatrixWorld()` before each pick — otherwise clicks miss when the frame loop is paused.
- **Hidden-tab rendering:** `requestAnimationFrame` AND CSS animations both pause when the tab is backgrounded. A `setInterval(()=>{if(document.hidden)renderOnce()},350)` heartbeat keeps the canvas paintable (needed for screenshot tooling). Consequence: **don't gate content visibility on a CSS entry animation** — it strands content invisible in a paused tab.
- **Materials:** `MeshPhysicalMaterial` `transmission` is too heavy with bloom → use clearcoat + `RoomEnvironment` env map instead. Bloom is tuned low (strength 0.26) so colour-coding isn't washed out.
- **Logos:** only ~5 of these firms exist in icon libraries (nvidia/amd/intel/samsung/broadcom). Everything else uses a deterministic colour-tinted monogram — don't add a `slug` unless `https://cdn.simpleicons.org/<slug>` returns 200, or it'll 404-flash.
- **Debug:** `window.__atlas` exposes `render()/probe()/frames()/lastErr()` for verification — harmless, but strip for a polished public launch if you care.

## Content provenance

Figures (HBM share, CoWoS lead times, Astera revenue, the EML-laser lockup, ASML/Ajinomoto monopolies, the NVLink-vs-UALink timeline, etc.) were compiled mid-2026 from manufacturer disclosures, TrendForce/Counterpoint/Dell'Oro-type trade reporting, and company filings via three research passes. Market shares move quarter to quarter — treat them as directional. The tool is **educational structural analysis, not personalized investment advice.**
