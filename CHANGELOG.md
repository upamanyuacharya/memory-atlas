# Changelog

All notable changes to The Memory Atlas. Versioning: semantic, via git tags.

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
