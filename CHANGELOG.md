# Changelog

All notable changes to The Memory Atlas. Versioning: semantic, via git tags.

## [1.9.0] — 2026-07-07

Hands on the map. Second round of reader feedback, same day.

### Added — WASD / arrow-key glide
- Holding **WASD or the arrow keys** now glides the camera around the current
  scene (smooth, frame-loop driven, leashed to each region's rig so you can't
  get lost). Works in every region, pauses while reading or in a modal.
- The journey therefore moved off the arrows: **N** = next stop, **P** =
  previous (PageDown/Up too), plus the ◀ ▶ buttons as before. All on-screen
  copy updated.

### Added — START HERE, everywhere it's mentioned
- The rail's lede no longer just *names* the START HERE pill — it **is** one:
  the same bouncing accent pill, recreated as a real button that starts the
  journey.

### Added — mobile heads-up sheet
- Phones (coarse pointer + short viewport) get a bottom sheet on load:
  *"Heads up — built for desktop"*, with a grip bar you can **swipe down to
  dismiss** or a "Proceed anyway →" button. Once per session; never shown on
  desktop or tablets.

### Changed — every map node is now a real model
- All 15 satellites swapped their spheres for **hardware miniatures** from the
  v1.7.0 procedural library: silicon dies, an HBM stack, a DIMM, switch chips,
  an M.2 stick, a fabric switch, a 2U server, a laser TO-can — plus three new
  minis: a **CPO package** (substrate, compute die, optics chiplets, fibre
  stub), a **pluggable transceiver** (steel body, gold fingers, latch, LED)
  and a **mini memory tank** for KV economics. Satellites slowly rotate and
  are tipped toward the camera so flat parts read.
- The gold investor nodes became **stacks of gold ingots** (4-sided frustum
  bars) with a pulsing glow — the money is unmistakable.

### Harness
- New **glide behavioral gate** (KeyD/ArrowLeft/KeyW must move the camera
  target; release stops it) and the journey gate now asserts arrows do NOT
  navigate while **N** does. All baselines re-blessed.

## [1.8.0] — 2026-07-07

The reader's cut. Built directly from first-user feedback (a non-technical
reader): *"I see the visual first but I don't know where to start"*, *"I
accidentally click things and don't know how to go back"*, *"the guided tour
is fine but removed from the visual itself"*. Three structural changes follow.

### Changed — the landing IS the map
- **No popup, no nudge.** Nothing auto-opens on load anymore. The welcome
  intro survives only behind "? What is this".
- **The full knowledge graph.** The Map region now carries *every* topic in
  the atlas as a node — 5 theme hubs (miniature hardware models, zig-zagging
  left→right in story order, KV Cache promoted to its own hub), 15 satellite
  topics (all 7 stack layers + every deep node) hanging off their hubs, and
  relationship edges with plain-sentence labels.
- **▾ START HERE** — a bobbing pointer over The Memory Wall hub (the story's
  first stop). Clicking it starts the journey.

### Added — the journey (replaces the detached tour card)
- A persistent **journey bar** at the bottom centre: `⌂ Map · ◀ · step/26 +
  progress · Next ▶ · ◎ Investor`. **26 ordered stops** cover every region,
  every stack layer, every deep node and all four Investor Intelligence tabs.
- **← / → arrow keys** walk the same spine from anywhere (form controls are
  never hijacked).
- The old tour's teaching (and its voice) lives on as **journey captions**:
  region stops float a dismissable card stacked above the dock; node stops
  lead their reading page with an "ON THE JOURNEY · n/26" block.
- **Free exploration re-syncs the pointer** — click any node or tab and Next
  continues from where you actually are, not where the script thinks you are.

### Changed — reading mode (text is the focus)
- Clicking a node no longer opens a side panel: the file opens as a **centred
  reading column** while the whole 3D world **dims, desaturates and blurs into
  the background** (`body.reading #app` filter — costs nothing at rest thanks
  to render-on-demand).
- A prominent **"← Back to the 3D view"** button heads every page (plus ✕,
  scrim-click and Esc) — the "how do I go back?" problem, answered four ways.
- Satellites open their file **directly over the map** — no region jump needed.

### Changed — the investor layer is now structural
- **4 gold nodes** (octahedra + gold threads climbing to the tech they price)
  sit in their own row at the bottom of the graph: The Shortlist · Tickers by
  Layer · Country Risk · Roadmap 2025→30 — each opens its Intel tab directly.
- A persistent gold **◎ Investor** button lives in the journey bar; the last
  four journey stops walk all four tabs.
- The duplicate top-bar and rail buttons are gone (the top CTA row and the
  rail's Investor block were the two "no one clicks this" placements).

### Harness
- New **journey behavioral gate**: steps must open the right region/panel/tab,
  ArrowRight must advance the pointer, and the graph must carry ≥15 satellite
  labels, exactly 4 gold nodes and the START HERE pointer.
- Reading-mode assertions (body.reading + back button) added to `stack-hbm`;
  camera rigs re-tuned (CXL pool, Wall tanks, KV sentence all clear the moved
  dock band); all baselines re-blessed.

## [1.7.0] — 2026-07-06

Real hardware, not primitives. A /last30days research sweep (12-month window)
on 3D assets for Three.js education scenes converged on a clear verdict: AI
mesh generators fail hardest on manufactured rectilinear objects (the Aircada
"3D slop autopsy"), downloads break the single-file property, and the winning
move for a scene like this is detailed **procedural models** — licence-clean,
tiny, and stylistically coherent.

### Added — procedural hardware model library
- **Model builders** (each sub-assembly is a merged BufferGeometry = ONE draw
  call): GPU card (PCB, gold fingers, shroud, twin fans, fin stack, lit accent),
  HBM die stack (interposer, logic die, 8 DRAM dies with glowing TSV gaps),
  CXL switch silicon (substrate, ball grid, lid, glowing die seam, lanes),
  2U rack server (drive bays, status LEDs, rack ears), laser TO-can (gold
  header, pins, window ring), M.2 NVMe stick, mini fabric switch, silicon die.
- **Map**: the four theme nodes are now miniatures of the real thing — a
  memory-stack totem, CXL switch silicon, a GPU card, a laser firing light —
  in place of the old rounded cubes.
- **Stack**: every layer carries a recognizable mini of its hardware on the
  slab (die, HBM stack, DIMM, CXL module, M.2 stick, fabric switch). The
  width-∝-capacity slab encoding is untouched — the miniatures identify, the
  slabs still teach.
- **CXL**: the abstract icosahedron is now real switch silicon; the four hosts
  are 2U rack servers with drive bays and capability-reactive status LEDs.
- **Photonics**: the GPU is a real package (compute die + 6 HBM stacks on a
  substrate), the switch is a lidded ASIC, the laser is a proper TO-can, the
  fibre gained glass cladding + metal ferrules, the copper run gained DAC
  connector shells.
- **The Wall**: the hero tank now stands on an SXM-style GPU module board
  (gold edge connectors, under-board fin block) — one tank = one GPU, literally.

### Design contract
- Conceptual regions (KV Cache word-by-word, the Wall's tank arithmetic, the
  Stack's slab encoding) stay abstract on purpose — realism is reserved for
  the physical objects; the abstractions ARE the pedagogy.
- Hover now lifts the whole assembly (hit-proxy pattern), not the invisible
  hit box.
- All 8 verification gates pass, including idle-rest (render-on-demand does
  zero work when settled); baselines re-blessed for the new visuals.

## [1.6.0] — 2026-07-06

The real idle-fan fix. A Codex adversarial review plus a /last30days sweep of
three.js practice converged on the same root cause: the app kept the GPU busy
even when nothing was happening, and asked for the discrete GPU it never needed.

### Fixed (performance)
- **Dropped `powerPreference:'high-performance'`.** Since Chrome 80 the default
  is 'low-power' precisely to keep the discrete GPU asleep on dual-GPU laptops;
  requesting high-performance woke the dGPU (and cost a ~1s GPU-switch hitch at
  launch) for an ambient explainer that never needed it. This was the single
  biggest thermal win — wattage, not framerate, is what spins the fan.
- **Rest-state render-on-demand.** The render loop now does ZERO work when the
  scene is settled — no `renderer.render`, no CSS2D layout — and only wakes
  within 9s of an interaction, during a tween, or while the KV auto-writer runs.
  Measured: idle 0 fps / active 31 fps (was a perpetual 12 fps idle). This is the
  three.js-recommended pattern (threejs.org/manual "Rendering on Demand"); the
  project's own issues #7670 / #20131 flag the continuous loop as the energy sink.
- **Removed the 350 ms hidden-tab heartbeat** — it forced a full render three
  times a second forever, even backgrounded. `visibilitychange` repaints one
  fresh frame when the tab returns instead.
- **Removed the map's perpetual idle auto-rotate** — motion the scene ran for an
  empty room, and it would have kept the GPU awake forever under rest-state.

### Fixed (launch jank + memory)
- **`renderer.compileAsync()` shader warm-up** on every region build (behind the
  loader at launch) — precompiles materials off the main thread via
  KHR_parallel_shader_compile, killing first-frame "shader compilation stutter".
- **Backdrop texture leak.** `disposeGroup()` disposed materials but not their
  `.map` textures; the Wall/Photonics PNGs were re-decoded and re-uploaded on
  every revisit, stranding the old GPU textures. Now cached once and reused for
  the app lifetime, and per-group textures are explicitly disposed.

### Harness
- New behavioral gate `idle-rest`: asserts the loop draws 0 frames while idle and
  wakes on interaction — a loud regression guard against any future continuous
  loop. 9 states total, all green.

## [1.5.0] — 2026-07-06

A dedicated **KV Cache region** — the mechanism itself, not just its economics —
visualizing the query/keys/values intuition from Saad Ahmed's "KV cache,
explained intuitively" (linked as a source in the panel).

### Added
- Region 04 "KV Cache": a model writes a sentence word by word. The gold cube is
  the QUERY ("who here matters to me?"); every earlier word holds a stored
  KEY + VALUE slab in a growing glass cache bracket; attention beams (weighted
  differently — friend vs passer-by) look back from the query. Each step appends
  exactly ONE new pair; the prompt is marked as prefilled in one pass.
- Cache ON/OFF toggle: OFF flashes every stored pair red on each step — the
  recompute-everything waste — with live counters (K/V computed this word,
  total computations: n vs n(n+1)/2, cache size in MB on an 8B).
- Controls: +1 word, auto-write, reset. Everything clickable opens a new
  "How the KV Cache Works" panel node (plain-English room-of-cards analogy,
  why it's a demand engine rather than a supply chokepoint, sources).
- The Wall's legend link now leads here ("how the cache works →"); the Wall
  stays the economics half of the story and the caption cross-links back.
- Harness: new `kvcache` state (word count, per-step counter, cache-off
  headline flip, teal key-slab pixel probe) — 8 states total, all deterministic.
  The page-error gate caught two real bugs during this build (a TDZ boot error
  and an unescaped-quote SyntaxError) before any human saw them.

## [1.4.0] — 2026-07-05

Renderer-contract hardening — five principles adopted from a GPU-renderer review
skill, chosen because each one maps to a bug this project actually shipped.
No visual change (the harness proves it: 0.00–0.15% frame drift vs baselines).

### Added
- **Verification harness** (`tools/verify.mjs`, `npm run verify`): 7 deterministic
  states across all regions, gated by DOM probes, pixel-class content probes
  (green chat slabs present, amber spill present per state — stats alone don't
  prove pixels), and mean-diff baseline comparison. Its very first run caught a
  real boot bug (seeded-RNG declaration after first use).
- **Determinism contract**: all scene randomness via seeded `srand()` (reset per
  region build); all animation keys off an owned, freezable clock
  (`__atlas.freeze(t)` / `thaw()`), replacing `clock.elapsedTime` and every
  `Math.random()` in scene code. Harness hooks: `__atlas.go(region)`,
  `__atlas.setKV(model, ctx, chats)`.
- **Camera owner**: one `RIGS` table + `camEnter`/`camGlide` own every region's
  framing (UI safe areas baked in); all five hand-rolled `flyTo` poses and the
  Wall's ad-hoc recenter tween now route through it.
- **Render-phase contract**: `PHASE` constants with `glassify()` (transparent,
  depth-read-only, renders after contents — the v1.2.0 ghost-fill bug, now
  impossible by construction) and `fxPoints()` (additive, depth-read-only) owning
  what were four hand-set flag combinations.
- **`SERVING` contract**: GPU name, 192 GB capacity, $35k/GPU and bandwidth
  factor single-sourced; headline, caption, dock, rim label and math all consume it.

## [1.3.1] — 2026-07-05

Declutter pass on The Wall ("isn't this way too cluttered?"). New rule: one message
per zone — headline strip = the answer + legend, 3D scene = only labels anchored to
objects, caption = the arithmetic, dock = the controls. Nothing is said twice.

### Removed from the scene
- The "doesn't fit — spills to the next GPU" pill (the headline, red rim and visible
  ghost tanks already say it).
- The floating "N chats × y GB = z GB of KV cache" pill (its numbers moved into the
  legend and caption; the dock shows the total).
- The floating "what exactly is the KV cache?" pill — now an inline link in the
  fixed legend, where it can never clip.
- "THE MODEL · x GB" and "one B200 GPU = 192 GB →" hide during spillover, when the
  panned camera would clip them behind the rail.

### Changed
- Legend is now dynamic and single-line: model size, per-chat GB at the current
  context, and the KV-cache link.
- Caption carries only the arithmetic; GPU count + cost live in the headline only.
- "+N more GPUs" floats above GPU 4 instead of clipping at the screen edge.
- The Wall's sidebar copy cut to two lines; backdrop scrim darkened.

## [1.3.0] — 2026-07-05

CPU fix + Wall v2, from direct user feedback ("framerate still super low, CPU goes
insanely high", "the wall section needs to be bigger", "tutorial too prominent",
"chokepoint sources need explaining", "slider effects unclear", "there are 1T models now").

### Performance (this time it was the compositor, on the CPU)
- Removed `backdrop-filter` from the 3D labels — a blur region that MOVES every
  rendered frame forces a full CPU re-blur per frame; this was the biggest burner.
- Removed `mix-blend-mode` from the film-grain overlay (blending a fixed layer over
  a per-frame-changing canvas re-composites the whole screen on the CPU).
- Removed the full-screen backdrop blur from the welcome overlay; halved blur radii
  on the remaining glass panels; stripped blur from all small pills.
- Hover raycasting throttled to ≤20 Hz (was: every mousemove event).
- Resolution-aware pixel budget (~3.2M canvas pixels max) so 1440p/4K screens don't
  quadruple raster cost. Verified 29 fps active / 12 fps idle with zero errors.

### The Wall v2 (researched via /last30days, 2026-07-05)
- Four model classes with real mid-2026 anchors and hover cards: 8B (Qwen3-8B…),
  70B (Llama-3.3-70B…), 405B (Llama-3.1-405B, Qwen3.5-397B), and **1T MoE**
  (Kimi K2.6, DeepSeek V4, Ling 2.5) — including the MLA twist: the 1T class
  carries ~7× LESS KV per chat than the 405B (70 KB vs 516 KB per token).
- The headline now answers the question directly and live: "This serves on ONE
  B200 GPU — 9 GB to spare" ↔ "Serving this needs 6 × B200 GPUs · ~$210k".
  It's fixed DOM, so it can never collide with 3D labels.
- Default state is 70B · 16K · 8 chats ≈ 183/192 GB — near-full, so every slider
  nudge visibly spills; slabs alternate two shades so individual chats are countable.
- The control dock is now the main instrument: larger type and sliders, the live
  caption docked INSIDE the shell (text overlap is structurally impossible now).

### Understandability
- Every layer's panel now explains WHERE its chokepoint comes from (or why it
  isn't one) — e.g. Network/Fabric: NVLink lock-in + the InP laser supply
  (<5 firms, sold out into 2027) + the Broadcom/NVIDIA switch duopoly.
- The Wall's sidebar ties the tank to the Stack's HBM chokepoint explicitly.
- The welcome modal no longer auto-opens: first-time visitors get a small
  side nudge offering the tour; the full intro stays behind "? What is this".
- Top region nav centered and enlarged.

## [1.2.0] — 2026-07-05

Performance overhaul + an intuitive KV-cache visualiser, from direct user feedback
("performance is too slow", "the KV cache visualiser is not intuitive").

### Performance
- Removed post-processing entirely (EffectComposer + UnrealBloomPass) — it was the
  single biggest GPU cost per frame and it defeated MSAA. The scene now renders
  directly: real antialiasing, roughly half the GPU work. Glow comes from emissive
  materials, halos and additive particles (emissives retuned to compensate).
- Adaptive frame budget: ~30 fps while interacting or the camera is moving,
  ~12 fps once everything settles, ~7 fps behind the welcome overlay. All motion
  is dt-based so animation speeds are unchanged. Measured: 29 fps active / 12 idle.
- `pixelRatio` cap lowered 1.4 → 1.25; `powerPreference: high-performance`.
- The KV visualiser now pools its meshes, materials and labels — dragging the
  sliders no longer allocates geometry (the old one rebuilt boxes + labels per tick).

### The Wall — KV visualiser rethought
- New mental model: **one tank = one GPU (192 GB); blue block = the model (fixed);
  each green slab = ONE chat's memory (KV cache), growing with conversation length.**
- When the tank fills, the excess visibly pours into ghost GPU tanks on the right
  ("GPU 2 · 192 GB", …, "+ N more GPUs…"), the rim turns red, and the camera
  gently reframes the row — the cost of scale is something you *watch happen*.
- Headline labels track the camera so they never drift under the fixed UI.
- Persistent legend ("THE MODEL · x GB", "N chats × y GB = z GB of KV cache") and a
  rewritten live caption tying it together ("Longer chats × more users = more GPUs").
- Fixed a transparent-sort bug where the glass tank depth-occluded its own contents
  (glass is now depthWrite:false with late renderOrder).

## [1.1.0] — 2026-07-05

The public-launch release: readability, design polish, SEO, and the move to
[memory.upamanyuacharya.com](https://memory.upamanyuacharya.com).

### Fixed
- Active tab text in the top navigation was invisible on Stack / CXL / Photonics / The Wall
  (inline colour styles were overriding the active state).
- The Investor Intelligence button in the left rail had styles but was never rendered — restored.
- Map: the "KV offload" edge label sat on top of the Memory Stack node's sub-label.
- CXL: the headline clipped under the nav bar; the leftmost server hid behind the rail;
  the shared-pool title was buried behind the control dock.
- Photonics: the GPU chip and the copper-wire label clipped behind the left rail.
- The Wall: the memory tank was nearly invisible against its backdrop — shell and edge
  opacity raised, scrim darkened, "what is the KV cache" callout moved beside the tank.
- CSS/data bugs: broken `.cocard .chn` selector, undefined `--gold` variable,
  duplicate `ibiden` company entry, duplicate `.share-bar` rule.

### Changed
- Global type scale raised across the app (panel body 15.5→16.5 px, plain-English
  block 14→15.5 px, 3D labels 13→14.5 px, and every micro-label lifted with them).
- Reading panel widened 472→560 px with a stronger focus scrim — reading is now
  the prominent act, not a sidebar afterthought.
- Left rail widened to 336 px with larger copy.
- Tabular numerals for all stat readouts.

### Added
- Mobile layout: the reading panel becomes a bottom sheet; the nav scrolls horizontally.
- SEO: canonical URL, absolute Open Graph / Twitter card URLs, JSON-LD
  (WebApplication + LearningResource), `robots.txt`, `sitemap.xml`, and a real
  `<noscript>` fallback.
- Footer pills ("What is this", GitHub), author credit and a not-investment-advice
  disclaimer in the welcome card.
- `docs/` screenshots, this changelog, MIT license.

## [1.0.0] — 2026-06-25

Baseline as built across the original `/loop` sessions:

- Five 3D regions (Map, Stack, CXL, Photonics, The Wall) in one continuous world.
- Fractal reading panel (Overview · Who makes it · Metrics · Geography) with
  plain-English intros, market-share bars, severity meters and company backlinks.
- Investor Intelligence modal (shortlist · by layer · by country · roadmap).
- 6-step guided tour with Socratic questions; Khan-style welcome onboarding.
- Live KV-cache calculator ("memory tank") with GPUs / $ / ms-per-token outputs.
- ~34-company dictionary with IR links; per-node further-reading sources.
- Company icon set (TSMC, ASML, Ajinomoto, SK Hynix, Astera) and concept-art
  backdrops generated with gpt-5.4-image-2.
