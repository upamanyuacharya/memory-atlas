# Changelog

All notable changes to The Memory Atlas. Versioning: semantic, via git tags.

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
