/* =========================================================================
   THE MEMORY ATLAS — CONTENT MODEL
   This is the atlas's "second brain": every node, company, relationship,
   journey stop and investor view. It is the ONLY file a content refresh
   should need to touch.

   • Edit here, then `npm run build` — the build inlines this file between the
     @@DATA markers in index.html (single-file delivery stays intact) and
     regenerates the /read/ text edition from the same source.
   • Plain ES module: no THREE, no DOM. Node imports it to prerender /read/.
   • Bump DATA_ASOF whenever facts are re-verified — it is what the
     "Data as of" chip shows.
   ========================================================================= */

export const DATA_ASOF='2026-09-13';

export const CO= {
  // memory makers
  skhynix:{n:'SK Hynix',tk:'000660.KS',ctry:'South Korea',slug:'',ic:'assets/skhynix.png',role:'#1 HBM maker (~50–62% share). First to qualify each generation at NVIDIA; HBM more than doubled YoY. The bellwether of the whole cycle.',makes:'HBM3E / HBM4 stacks',mx:['HBM bit-share','NVIDIA qualification','HBM4 ramp']},
  samsung:{n:'Samsung',tk:'005930.KS',ctry:'South Korea',slug:'samsung',role:'#2 in HBM, racing to qualify HBM4 at NVIDIA. Huge DRAM + foundry + packaging base.',makes:'HBM, DRAM, foundry',mx:['HBM qual status','DRAM ASP','foundry ramp']},
  micron:{n:'Micron',tk:'MU',ctry:'USA (fab Japan/Taiwan)',slug:'',role:'#3 HBM, the only US-HQ DRAM maker. HBM sold out through FY2026; 12-Hi HBM3E runs ~30% lower power — its edge in winning NVIDIA allocation.',makes:'HBM3E, DDR5, CXL modules',mx:['HBM bit-share','sold-out status','HBM gross margin']},
  // packaging / equipment
  tsmc:{n:'TSMC',tk:'TSM',ctry:'Taiwan',slug:'',ic:'assets/tsmc.png',role:'Makes the GPU die AND the CoWoS packaging that bonds HBM to it. CoWoS is booked through 2027 (52–78 wk lead times) — the single tightest link in AI. A Taiwan disruption stops the whole stack.',makes:'Logic + CoWoS packaging + Si photonics',mx:['CoWoS wafers/month','advanced-node share','packaging lead time']},
  besi:{n:'BE Semiconductor',tk:'BESI',ctry:'Netherlands',slug:'',role:'Hybrid-bonding tool leader — the technique HBM4 / future stacking needs. Tiny float, huge optionality.',makes:'Hybrid-bonding die attach',mx:['hybrid-bond orders','HBM4 adoption']},
  asml:{n:'ASML',tk:'ASML',ctry:'Netherlands',slug:'',ic:'assets/asml.png',role:'Monopoly on EUV lithography — every leading-edge logic + DRAM die needs it. Ultimate chokepoint.',makes:'EUV / DUV litho systems',mx:['EUV bookings','China export rules','High-NA ramp']},
  amat:{n:'Applied Materials',tk:'AMAT',ctry:'USA',slug:'',role:'Deposition/etch + packaging tools used across HBM TSV and advanced packaging.',makes:'Wafer-fab & packaging equipment',mx:['packaging tool orders','DRAM capex']},
  // materials
  shinetsu:{n:'Shin-Etsu',tk:'4063.T',ctry:'Japan',slug:'',role:'World #1 silicon wafers + photoresist. Japan\'s quiet grip on materials.',makes:'Silicon wafers, photoresist',mx:['wafer pricing','resist share']},
  // consumers
  nvidia:{n:'NVIDIA',tk:'NVDA',ctry:'USA (fab TSMC)',slug:'nvidia',role:'Buys the most HBM, NVLink, and optics on earth. Sets the roadmap; locks up supply (lasers, CoWoS, HBM).',makes:'GPUs, NVLink, NVSwitch, photonic switches',mx:['data-center revenue','supply lockups','NVLink roadmap']},
  amd:{n:'AMD',tk:'AMD',ctry:'USA (fab TSMC)',slug:'amd',role:'MI-series GPUs with leading HBM capacity; backs UALink to break NVLink lock-in.',makes:'MI GPUs, UALink',mx:['MI ramp','HBM capacity lead','UALink traction']},
  // interconnect / CXL
  astera:{n:'Astera Labs',tk:'ALAB',ctry:'USA (fab TSMC)',slug:'',ic:'assets/astera.png',role:'The only large-cap pure-play on AI connectivity — Aries retimers, Leo CXL controllers, Scorpio fabric switches. FY25 revenue $852M (+115%), ~76% gross margin. Risk: one customer is >70% of revenue.',makes:'Retimers, CXL controllers, fabric switches',mx:['Scorpio switch design wins','customer concentration','revenue growth']},
  marvell:{n:'Marvell',tk:'MRVL',ctry:'USA (fab TSMC)',slug:'',role:'~70% optical-DSP share + custom AI silicon + Celestial AI photonic memory fabric ($3.25B). Most complete optical stack in public equities.',makes:'Optical DSP, custom XPU, Photonic Fabric',mx:['DSP share','custom-silicon wins','Celestial run-rate']},
  broadcom:{n:'Broadcom',tk:'AVGO',ctry:'USA (fab TSMC)',slug:'broadcom',role:'Tomahawk switching + CPO (Davisson 102.4 Tbps) + custom XPUs for hyperscalers. Anchor of the UALink/merchant-silicon camp.',makes:'Ethernet switches, CPO, custom AI ASICs',mx:['custom-ASIC ramp','CPO attach','switch share']},
  montage:{n:'Montage Tech',tk:'688008.SH',ctry:'China',slug:'',role:'CXL memory controllers + DDR5 RCD/MRDIMM buffers. China\'s CXL silicon play.',makes:'CXL controllers, memory interface',mx:['CXL revenue','MRDIMM ramp']},
  rambus:{n:'Rambus',tk:'RMBS',ctry:'USA',slug:'',role:'Memory-interface IP + chips (CXL, MRDIMM, PCIe). Licensing royalties scale with every DDR5/CXL device.',makes:'Memory IP, buffer chips',mx:['royalty growth','CXL IP wins']},
  intel:{n:'Intel',tk:'INTC',ctry:'USA',slug:'intel',role:'Originated CXL; Xeon is the CPU host for CXL memory. Foundry + photonics IP.',makes:'Xeon CPUs, CXL host, Si photonics',mx:['Xeon CXL support','foundry progress']},
  // photonics
  coherent:{n:'Coherent',tk:'COHR',ctry:'USA',slug:'',role:'~25% transceiver share + vertically integrated InP lasers (sold out to 2027). NVIDIA put $2B in to lock laser supply.',makes:'InP lasers, 800G/1.6T transceivers',mx:['datacenter mix >50%','InP lead times','book-to-bill']},
  lumentum:{n:'Lumentum',tk:'LITE',ctry:'USA',slug:'',role:'Laser specialist — only volume supplier of 200G/lane EML lasers (needed for 1.6T). Purest laser-chokepoint play.',makes:'EML / CW lasers',mx:['EML ASP','laser bookings','CPO laser POs']},
  fabrinet:{n:'Fabrinet',tk:'FN',ctry:'Thailand',slug:'',role:'Contract assembler for Coherent, Lumentum, Ciena. The cleanest pluggable-demand barometer.',makes:'Precision optical assembly',mx:['quarterly revenue','utilization','Bldg-10 ramp']},
  innolight:{n:'InnoLight',tk:'688161.SH',ctry:'China',slug:'',role:'>50% of 800G modules in GB200; ~60% of NVIDIA volume with Eoptolink. Depends on US DSPs + JP/US lasers.',makes:'800G / 1.6T transceivers',mx:['module units','1.6T share','DSP dependency']},
  ayar:{n:'Ayar Labs',tk:'PRIVATE',ctry:'USA',slug:'',role:'In-package optical I/O chiplets (TeraPHY). $3.75B Series E; NVIDIA/AMD/Intel backed. IPO signaled.',makes:'Optical I/O chiplets',mx:['volume-production','design wins','IPO timing']},
  lightmatter:{n:'Lightmatter',tk:'PRIVATE',ctry:'USA',slug:'',role:'Passage photonic interposer (114 Tbps). $4.4B valuation; T. Rowe / Google / HPE backed.',makes:'Photonic interposer / CPO',mx:['valuation','customer pilots']},
  celestial:{n:'Celestial AI',tk:'→ MRVL',ctry:'USA',slug:'',role:'Photonic Fabric for optical memory disaggregation. Acquired by Marvell for $3.25B — the valuation anchor.',makes:'Photonic memory fabric',mx:['Marvell run-rate','disaggregation wins']},
  corning:{n:'Corning',tk:'GLW',ctry:'USA',slug:'',role:'Optical fiber + connectors for the AI backbone and CPO fiber arrays.',makes:'Fiber, FAUs, connectors',mx:['optical-fiber demand','CPO content']},
  sumitomo:{n:'Sumitomo Electric',tk:'5802.T',ctry:'Japan',slug:'',role:'InP/CW lasers, fiber, connectors. Stock +85% in 2025 on laser tightness. Japan\'s component grip.',makes:'Lasers, fiber, FAUs',mx:['laser supply','AI optics mix']},
  // --- chokepoint deep-cuts (packaging, materials, equipment, optics) ---
  ajinomoto:{n:'Ajinomoto',tk:'2802.T',ctry:'Japan',slug:'',ic:'assets/ajinomoto.png',role:'Yes — the food company. Invented ABF, the insulating film inside every high-end chip substrate. Controls ~95% of the ABF market and hiked prices 30%. The quietest monopoly in AI.',makes:'ABF build-up film',mx:['ABF price','95% monopoly','AI substrate demand']},
  ibiden:{n:'Ibiden',tk:'4062.T',ctry:'Japan',slug:'',role:'~35% of high-end FC-BGA substrates — the board every GPU/CPU package rides on. ¥500B expansion; substrates back in shortage H1 2026.',makes:'FC-BGA / IC substrates',mx:['FC-BGA utilization','substrate lead time','shortage status']},
  ase:{n:'ASE Technology',tk:'ASX',ctry:'Taiwan',slug:'',role:'World\'s largest OSAT. Takes TSMC\'s CoWoS overflow — a relief valve for the packaging bottleneck, not a substitute at the leading edge.',makes:'Assembly, test, CoWoS overflow',mx:['CoWoS sub-contract volume','OSAT utilization']},
  amkor:{n:'Amkor',tk:'AMKR',ctry:'USA',slug:'',role:'#2 OSAT (ops in Korea, Vietnam, Arizona). Licensed Intel EMIB; the US-footprint packaging hedge.',makes:'Advanced packaging, test',mx:['CoWoS overflow','Arizona ramp']},
  lam:{n:'Lam Research',tk:'LRCX',ctry:'USA',slug:'',role:'Etch & deposition tools for HBM\'s through-silicon vias. HBM tool revenue +50% YoY — equipment ordered today = chips in 12–24 months.',makes:'TSV etch / deposition',mx:['HBM tool orders','memory WFE split']},
  disco:{n:'Disco',tk:'6146.T',ctry:'Japan',slug:'',role:'Near-monopoly on wafer dicing & grinding — every advanced chip is thinned and cut on Disco tools. A quiet utilization barometer.',makes:'Dicing / grinding tools',mx:['utilization','advanced-packaging activity']},
  kla:{n:'KLA',tk:'KLAC',ctry:'USA',slug:'',role:'Process control & inspection — finds defects in HBM stacks and advanced packages. Yield gating as stacks go 12-Hi+.',makes:'Inspection / metrology',mx:['packaging inspection orders','yield ramp']},
  lumentum2:{n:'Lumentum',tk:'LITE',ctry:'USA',slug:'',role:'Only volume supplier of 200G/lane EML lasers — the exact part 1.6T optics needs. NVIDIA put ~$2B in to lock supply. Purest laser-chokepoint play.',makes:'EML / CW lasers',mx:['EML ASP','laser bookings','CPO POs']},
  ciena:{n:'Ciena',tk:'CIEN',ctry:'USA',slug:'',role:'Coherent long-haul transport (WaveLogic) — the pipes between data centers. Indirect AI beneficiary via data-center interconnect, not intra-cluster optics.',makes:'Coherent DWDM transport',mx:['DCI demand','WaveLogic wins']},
  microchip:{n:'Microchip',tk:'MCHP',ctry:'USA',slug:'',role:'Broad-line PCIe/CXL retimers — lower ASP, broader base than Astera. A diversified way to play connectivity content growth.',makes:'PCIe/CXL retimers',mx:['retimer attach','PCIe gen transition']},
};

export const COURL={
  nvidia:'https://investor.nvidia.com/',amd:'https://ir.amd.com/',intel:'https://www.intc.com/',
  skhynix:'https://news.skhynix.com/',samsung:'https://semiconductor.samsung.com/news-events/news/',micron:'https://investors.micron.com/',
  tsmc:'https://investor.tsmc.com/english',asml:'https://www.asml.com/en/investors',besi:'https://www.besi.com/investor-relations/',
  ajinomoto:'https://www.ajinomoto.co.jp/company/en/ir/',ibiden:'https://www.ibiden.com/ir/',shinetsu:'https://www.shinetsu.co.jp/en/ir/',
  lam:'https://investor.lamresearch.com/',kla:'https://ir.kla.com/',disco:'https://www.disco.co.jp/eg/ir/',ase:'https://www.aseglobal.com/en/investors/',amkor:'https://ir.amkor.com/',
  astera:'https://www.asteralabs.com/news/',marvell:'https://investor.marvell.com/',broadcom:'https://investors.broadcom.com/',rambus:'https://investors.rambus.com/',montage:'https://www.montage-tech.com/',microchip:'https://www.microchip.com/en-us/about/investor-relations',
  coherent:'https://investors.coherent.com/',lumentum2:'https://investor.lumentum.com/',fabrinet:'https://investor.fabrinet.com/',innolight:'https://www.innolight.com/',ciena:'https://investor.ciena.com/',corning:'https://www.corning.com/worldwide/en/about-us/investor-relations.html',sumitomo:'https://sumitomoelectric.com/ir',
  ayar:'https://ayarlabs.com/news/',lightmatter:'https://lightmatter.co/',celestial:'https://www.marvell.com/company/newsroom.html',
};

export const HIER=[
  {id:'reg',name:'Registers',kind:'On-chip SRAM',col:'#d7e3f2',cap:'~32 MB',bw:'>20 TB/s',lat:'~0.5 ns',en:'~0.1 pJ/b',sev:1,
   blurb:'The fastest memory that exists. Each GPU Streaming Multiprocessor holds ~256 KB of register file — the operands of instructions in flight. ~32 MB aggregate on an H100.',
   biz:'Not separately investable — it ships inside the GPU. The economics flow to whoever designs the GPU (<b>NVIDIA</b>, <b>AMD</b>) and the foundry that prints it (<b>TSMC</b>).',
   cos:['nvidia','amd','tsmc'],geo:[['KOR/USA','GPU design — NVIDIA, AMD']],
   mx:[['On-die SRAM','grows slowly per node — SRAM scaling has stalled, a quiet driver of HBM reliance']],related:['hbm','wall']},
  {id:'sram',name:'L1 / L2 SRAM',kind:'On-chip cache',col:'#bff7ef',cap:'256 KB–50 MB',bw:'12–33 TB/s',lat:'5–100 ns',en:'~10 pJ/b',sev:1,
   blurb:'L1/shared (256 KB/SM) and a 50 MB L2 shared across the die. FlashAttention exists entirely to keep data here and avoid touching HBM.',
   biz:'SRAM does not scale with Moore\'s law anymore — the reason designers lean ever harder on HBM bandwidth. Again captured by <b>TSMC</b> + the GPU designers.',
   cos:['tsmc','nvidia','amd'],geo:[['TWN','TSMC fabrication'],['USA','design']],
   mx:[['SRAM density','flat across nodes → bandwidth pressure pushed onto HBM']],related:['reg','hbm']},
  {id:'hbm',name:'HBM3E / HBM4',kind:'On-package DRAM · the prize',col:'#5eead4',cap:'80–288 GB',bw:'3.35–8 TB/s',lat:'150–220 ns',en:'~4 pJ/b',sev:5,
   why:'Only three companies on earth can make HBM (SK Hynix, Samsung, Micron) — and even their output is capped from outside: every stack must be bonded to the GPU on TSMC\'s CoWoS packaging line (booked into 2027) and printed on ASML\'s EUV machines (a literal monopoly). Demand runs a year ahead of supply, so <b>allocation</b>, not price, decides who ships GPUs.',
   blurb:'High Bandwidth Memory — DRAM dies stacked 8–12 high with through-silicon vias, bonded to the GPU package via a silicon interposer. A single stack runs a 1,024-bit bus. The single most fought-over component in AI.',
   biz:'<span class="hl">The center of gravity.</span> A 3-way oligopoly (<b>SK Hynix</b>, <b>Samsung</b>, <b>Micron</b>) makes the stacks; <b>TSMC</b> CoWoS packaging is the real ceiling on supply; <b>Besi</b>/<b>ASML</b>/Japan materials gate it from below. HBM is ~5–10× the cost/GB of DDR and sells out a year ahead.',
   cos:['skhynix','samsung','micron','tsmc','besi','asml','lam','disco','ase','ajinomoto','ibiden','shinetsu'],
   geo:[['KOR','HBM stacks — SK Hynix, Samsung (95%+ in 2 cities)'],['TWN','CoWoS packaging — TSMC (sold out to 2027)'],['NLD','EUV litho — ASML (100% monopoly); bonding — Besi'],['JPN','wafers/resist/ABF — Shin-Etsu, Ajinomoto, Ibiden'],['USA','Micron HBM, Lam tools, GPU design']],
   share:{title:'HBM market share (≈ 2025)',seg:[['SK Hynix',62,'#5eead4'],['Micron',21,'#46c8e0'],['Samsung',17,'#5aa9ff']]},
   mx:[['HBM bit-growth','industry HBM bit supply YoY — the core volume signal'],['CoWoS capacity','TSMC packaging adds gate every GPU shipped'],['HBM ASP / margin','memory-maker gross margin = cycle health'],['NVIDIA allocation','who gets qualified at NVIDIA = who wins']],
   related:['sram','ddr','cxl','wall','photonics']},
  {id:'ddr',name:'Host DDR5',kind:'CPU-attached DRAM',col:'#5aa9ff',cap:'0.5–8 TB',bw:'50–410 GB/s',lat:'80–100 ns',en:'~15 pJ/b',sev:2,
   why:'Commodity by design: dozens of fabs, a deep spot market, and three suppliers with swing capacity. Prices cycle hard, but nothing structurally gates AI here — which is exactly why the money crowds into HBM instead.',
   blurb:'The CPU\'s main memory. 8–20× less bandwidth than HBM but 10–40× the capacity at a fraction of the cost. The GPU reaches it only across PCIe.',
   biz:'Same three DRAM makers, plus the interface layer: <b>Rambus</b> and <b>Montage</b> sell the RCD/MRDIMM buffer chips that scale with every server. A commodity-cycle business with an AI-content kicker.',
   cos:['skhynix','samsung','micron','rambus','montage'],
   geo:[['KOR','DRAM — Hynix, Samsung'],['USA','Micron, Rambus IP'],['CHN','Montage buffers']],
   mx:[['DDR5 ASP / spot','the classic memory cycle indicator'],['MRDIMM attach','buffer content per server rising'],['server DRAM content','GB per AI server']],related:['hbm','cxl']},
  {id:'cxl',name:'CXL Memory',kind:'Coherent · poolable',col:'#9a8cff',cap:'TB → tens of TB',bw:'64–256 GB/s',lat:'170–270 ns',en:'~15 pJ/b',sev:3,
   why:'Not scarce hardware — scarce <b>silicon and standards</b>: the DRAM inside is commodity, but the controllers and switches that make it poolable come from a handful of design houses (Astera, Montage, Rambus, Microchip), and adoption is gated on each CPU generation actually supporting it.',
   blurb:'Compute Express Link memory expanders attach over the PCIe physical layer with cache coherence — and can be pooled and shared across many hosts. The escape valve when HBM + DDR run out.',
   biz:'The connectivity layer is where merchant silicon makes real money: <b>Astera Labs</b> (controllers, switches), <b>Marvell</b>, <b>Rambus</b> + <b>Montage</b> (controllers), <b>Microchip</b>. Adoption is early but Azure shipped the first production cloud CXL in 2025. <span class="hl2">Open the CXL region for the full fabric.</span>',
   cos:['astera','marvell','rambus','montage','microchip','micron'],
   geo:[['USA','controllers/switches — Astera, Marvell, Rambus'],['CHN','Montage'],['KOR','CXL modules — Samsung/Hynix']],
   mx:[['Connectivity $/GPU','content per accelerator rising with PCIe gen'],['CXL design wins','controller sockets at hyperscalers'],['Astera revenue','the pure-play tape on AI connectivity']],
   related:['ddr','hbm','region_cxl','photonics']},
  {id:'ssd',name:'NVMe SSD',kind:'Local flash',col:'#3f6fb0',cap:'4–30 TB',bw:'7–14 GB/s',lat:'20–100 µs',en:'—',sev:2,
   blurb:'PCIe Gen5 flash — ~14 GB/s but microsecond latency, 3–5 orders slower than DRAM. Holds weights at rest, checkpoints, last-ditch KV overflow.',
   biz:'NAND oligopoly: <b>Samsung</b>, SK Hynix (Solidigm), <b>Micron</b>, Kioxia, plus controllers. AI lifts enterprise SSD demand but it is a separate cycle from HBM.',
   cos:['samsung','skhynix','micron'],
   geo:[['KOR','NAND — Samsung, Hynix'],['USA/JPN','Micron, Kioxia']],
   mx:[['NAND ASP','flash cycle'],['enterprise SSD bit-growth','AI checkpoint/storage demand']],related:['ddr','net']},
  {id:'net',name:'Network / Fabric',kind:'Scale-out + remote',col:'#27406a',cap:'~unlimited',bw:'25 GB/s → 130 TB/s',lat:'µs → s',en:'—',sev:4,
   why:'The cables aren\'t the chokepoint — three specific things are. <b>(1) NVLink lock-in:</b> inside a rack, GPUs talk over NVIDIA\'s proprietary fabric, so rival accelerators can\'t join the cluster. <b>(2) Lasers:</b> between racks, data travels as light, and every optical port needs an indium-phosphide laser — fewer than five firms make them at volume, sold out into 2027 after NVIDIA\'s ~$4B lockup. <b>(3) Switch silicon:</b> a near-duopoly (Broadcom, NVIDIA). Miss any one and the cluster stops scaling.',
   blurb:'From 400/800G InfiniBand & Ethernet to the NVLink switch fabric inside a GB200 NVL72 rack (130 TB/s). The point where "the rack" becomes the unit of compute — and where optics takes over from copper.',
   biz:'The interconnect battleground: <b>NVIDIA</b> (NVLink moat) vs the merchant camp <b>Broadcom</b> + <b>Marvell</b> + <b>Astera</b> (UALink/Ethernet). Optics is the fastest-growing slice. <span class="hl2">Open the Photonics region.</span>',
   cos:['nvidia','broadcom','marvell','astera','coherent','lumentum2','fabrinet','innolight','ciena'],
   geo:[['USA','switch/DSP/laser silicon — Broadcom, Marvell, Coherent, Lumentum'],['CHN','optical modules — InnoLight, Eoptolink (~60% volume)'],['THA','assembly — Fabrinet'],['JPN','laser components — Sumitomo']],
   mx:[['Optical content $/GPU','rising every generation'],['NVLink vs UALink','the standards war decides the TAM split'],['switch share','Broadcom vs NVIDIA vs Marvell']],
   related:['cxl','region_photonics','wall']},
];

export const REGIONS={
  region_cxl:{name:'CXL Fabric',col:'#9a8cff',into:'cxl'},
  region_photonics:{name:'Photonics',col:'#7ee787',into:'photonics'},
  wall:{name:'The Memory Wall',col:'#f6a345',into:'ai'},
  region_kv:{name:'Inside the KV Cache',col:'#5aa9ff',into:'kvcache'},
};

export const EXTRA={
  cxl_switch:{id:'cxl_switch',name:'The Interconnect War',kind:'CXL · NVLink · UALink',col:'#9a8cff',sev:4,
    why:'Standards lock-in, not manufacturing: whoever wins NVLink vs UALink decides which chipmakers get the design wins for years. NVIDIA defends the lock (even paying ~$2B to keep Marvell in its camp); everyone else funds the challenger.',
    stats:[['Scale-up','NVLink 1.8 TB/s'],['Open rival','UALink 1.0'],['Memory','CXL 3.x'],['Switch backlog','AVGO $10B+']],
    blurb:'Inside a rack, GPUs must talk to each other and to pooled memory at terabytes per second. Three standards fight for it: NVIDIA\'s proprietary <b>NVLink</b> (shipping, 1.8 TB/s — the moat), the open <b>UALink</b> consortium (AMD, Broadcom, Intel, Google, Meta — spec done, silicon ~2027), and <b>CXL</b> for coherent memory pooling.',
    biz:'The highest-stakes battleground in AI hardware. <b>NVLink wins</b> → NVIDIA\'s lock-in holds. <b>UALink wins</b> → <b>Astera</b> (switches), <b>Broadcom</b> (silicon), <b>AMD</b> (competitive GPUs at scale) all benefit. Most likely they coexist — and <span class="hl2">Astera wins either way</span> as a multi-standard chip house. NVIDIA put ~$2B into Marvell to keep it inside the NVLink camp.',
    cos:['astera','broadcom','marvell','nvidia','amd','montage','rambus'],
    geo:[['USA','switch/retimer silicon — Astera, Broadcom, Marvell'],['CHN','domestic CXL — Montage'],['—','standards bodies: UALink · CXL · Ultra Ethernet']],
    mx:[['UALink tape-outs','first production silicon = 2027 on track?'],['Astera Scorpio wins','switch TAM ~10× retimers'],['NVLink Fusion breadth','who joins NVIDIA\'s camp'],['CXL attach rate','<5% of servers today → ~30% by 2028']],
    related:['cxl','net','cxl_module','wall']},
  cxl_module:{id:'cxl_module',name:'CXL Memory Module',kind:'Type 3 expander',col:'#9a8cff',sev:3,
    why:'The DRAM inside is commodity — the pinch is the controller chip that fronts it (Astera Leo, Montage, Rambus IP). Few firms ship it, and every module pays them.',
    stats:[['Bandwidth','36–256 GB/s'],['Added latency','~70–90 ns'],['Capacity','128–512 GB'],['First cloud','Azure M-series']],
    blurb:'A box of DDR5 behind a CXL controller that the CPU sees as a slower, poolable tier of memory. Samsung CMM-D, Micron and SK Hynix ship the modules; the controller silicon is where the value sits.',
    biz:'For the memory makers this is an <b>ASP premium</b> on the same DRAM die. The real margin is the controller: <b>Astera</b> (Leo), <b>Montage</b>, and <b>Rambus</b> IP underneath. Adoption is early — Azure shipped the first production cloud CXL in 2025; the pooling revolution is ~12–18 months ahead of deployments.',
    cos:['samsung','micron','skhynix','astera','montage','rambus'],
    geo:[['KOR','modules — Samsung, SK Hynix'],['USA','controllers/IP — Astera, Rambus, Micron'],['CHN','controllers — Montage']],
    mx:[['CXL design wins','controller sockets at hyperscalers'],['MRDIMM vs CXL','competing expansion paths'],['Rambus royalties','every DDR5/CXL module pays IP']],
    related:['cxl','ddr','cxl_switch']},
  cxl_host:{id:'cxl_host',name:'A Compute Host',kind:'GPU / CPU server',col:'#7ee787',sev:3,
    stats:[['GPU box','8× GPU + HBM'],['Memory','fixed & stranded'],['Borrows via','CXL switch'],['Pays for','more HBM + pooling']],
    blurb:'A <b>host</b> is one server doing the work — either a <b>GPU box</b> (8 accelerators, fast but memory-starved) or a <b>CPU box</b> (lots of slow DRAM). The problem: each one\'s memory is <b>locked inside its own chassis</b>. A GPU server can run out of HBM mid-job while the CPU box next to it has hundreds of idle gigabytes — <span class="hl">stranded</span> and unreachable.',
    biz:'Every memory-starved host is a <b>customer</b> for this whole atlas. It buys more <b>HBM</b> (SK Hynix/Micron) when it can, and reaches through a <b>CXL switch</b> (Astera) to borrow from a shared pool when it can\'t. The demand signal that pulls the entire supply chain starts <em>here</em> — at the box that needs more memory than it owns.',
    cos:['nvidia','amd','astera','skhynix','micron'],
    geo:[['USA','GPU/CPU silicon — NVIDIA, AMD'],['—','deployed in every hyperscaler rack']],
    mx:[['memory per GPU','HBM4 = 288 GB, still not enough'],['pooling attach','% of racks wired for CXL'],['stranded DRAM','the waste CXL recovers']],
    related:['cxl_switch','cxl_module','hbm','wall']},
  phot_laser:{id:'phot_laser',name:'The Laser Bottleneck',kind:'EML / InP lasers',col:'#f6a345',sev:5,
    why:'Physics, not factories: silicon cannot emit light, so lasers must be grown on indium-phosphide wafers at 15–50% yields — capacity can\'t simply be bought. Fewer than five firms do it at volume, and NVIDIA pre-paying ~$4B to lock supply through 2027 shows exactly how binding that is.',
    stats:[['Suppliers','<5 globally'],['Lead time','past 2027'],['NVIDIA lockup','~$4B'],['EML price','double-digit ↑']],
    blurb:'Every optical link begins with a laser — and silicon cannot make light. EML/CW lasers are grown on indium-phosphide (InP), not silicon, at 15–50% yields. Fewer than five firms make them at volume.',
    biz:'<span class="hl">The single tightest link in optics.</span> <b>Lumentum</b> is the only volume supplier of 200G/lane EML lasers (needed for 1.6T). NVIDIA committed ~$2B each to <b>Lumentum</b> and <b>Coherent</b> to lock supply through 2027 — capacity capture disguised as investment. Everyone else gets rationed.',
    cos:['lumentum2','coherent','sumitomo'],
    geo:[['USA','InP lasers — Lumentum, Coherent'],['JPN','lasers/components — Sumitomo, Mitsubishi, Furukawa']],
    mx:[['EML laser ASP','rising = supply still tight'],['InP lead times','past 2027 = severe'],['CPO laser POs','the NVIDIA lockup orders']],
    related:['phot_cpo','phot_transceiver','net']},
  phot_cpo:{id:'phot_cpo',name:'Co-Packaged Optics',kind:'CPO + optical I/O',col:'#7ee787',sev:3,
    why:'Manufacturing yield, not demand: attaching fibres to silicon at scale is still unsolved, there\'s no interoperable standard yet, and every CPO design needs the same scarce lasers as everything else.',
    stats:[['Broadcom TH6','102.4 Tb/s'],['NVIDIA','Spectrum-X'],['Power','~70% less'],['At scale','2028–30']],
    blurb:'Move the optics into the switch/GPU package — millimetres of silicon instead of centimetres of lossy copper. Broadcom\'s Davisson (102.4 Tb/s) and NVIDIA\'s Spectrum-X are sampling; Ayar and Lightmatter push optics right beside the compute die.',
    biz:'CPO <b>helps</b> Broadcom, NVIDIA, the laser makers, <b>TSMC</b> (Si-photonics foundry) and pure-plays <b>Ayar</b>/<b>Lightmatter</b>. It <b>threatens</b> pluggable-module volume (InnoLight, Fabrinet) — but only from ~2028. Marvell paid <b>$3.25B for Celestial AI</b>, the valuation anchor for the whole theme.',
    cos:['broadcom','nvidia','marvell','ayar','lightmatter','celestial','tsmc'],
    geo:[['USA','CPO + pure-plays — Broadcom, NVIDIA, Ayar, Lightmatter'],['TWN','Si-photonics foundry — TSMC'],['—','no interoperable CPO standard yet']],
    mx:[['CPO attach rate','hyperscaler deployments'],['Ayar/Lightmatter IPO','private-market temperature'],['yield / fiber-attach','the manufacturing gate']],
    related:['phot_laser','phot_transceiver','net','hbm']},
  phot_transceiver:{id:'phot_transceiver',name:'Optical Transceivers',kind:'800G / 1.6T modules',col:'#7ee787',sev:3,
    why:'Assembly is abundant (China builds ~60% of modules) — but every single module needs a US-designed DSP chip and a scarce laser inside. One export-control decision or one laser shortage stalls the whole segment.',
    stats:[['China share','~60% volume'],['Marvell DSP','~70% share'],['2026 800G','~33M units'],['Assembler','Fabrinet']],
    share:{title:'800G module volume (est.)',seg:[['InnoLight',38,'#7ee787'],['Eoptolink',22,'#46c8e0'],['Coherent / others',40,'#3a4a66']]},
    blurb:'The pluggable modules that light up every switch port. InnoLight + Eoptolink dominate volume, Coherent is vertically integrated, Fabrinet assembles for everyone — and every module needs a Marvell or Broadcom DSP inside.',
    biz:'The photon moves through <b>Chinese</b> hardware but the brains are <b>US-designed</b> — a Marvell/Broadcom DSP sits in every 800G+ module. That makes a US DSP export control more disruptive than any tariff. <b>Fabrinet</b> is the cleanest pluggable-demand barometer.',
    cos:['innolight','coherent','fabrinet','marvell','ciena'],
    geo:[['CHN','modules — InnoLight, Eoptolink (~60%)'],['USA','DSP + integrated — Marvell, Coherent'],['THA','assembly — Fabrinet']],
    mx:[['800G→1.6T units','the transition pace'],['Fabrinet utilization','pluggable demand'],['DSP export policy','the China risk']],
    related:['phot_laser','phot_cpo','net']},
  kv_how:{id:'kv_how',name:'How the KV Cache Works',kind:'attention · step by step',col:'#5aa9ff',sev:2,
    stats:[['Per new word','1 K/V pair'],['Without cache','recompute ALL'],['Prompt','prefilled in 1 pass'],['Growth','linear with context']],
    blurb:'When a model writes a word, that word becomes a <b>query</b> — it asks "who here matters to me?" Every earlier word answers through its <b>key</b> (how relevant am I?) and contributes through its <b>value</b> (what do I offer?). Those K/V vectors never change once computed — so the model <b>stores</b> them. Each new word computes exactly one new pair and appends it; the prompt itself is "prefilled" in a single pass. Without the cache, every single step would recompute K and V for the entire conversation — the same numbers, again and again.',
    biz:'This one engineering trick is why long conversations are <em>possible</em> — and why they are <em>expensive</em>. The cache turns quadratic recomputation into linear growth, but that linear growth lands in <b>HBM</b>, the scarcest memory on earth. Every extra word of context is a permanent tenant in the GPU\'s memory until the chat ends. <span class="hl2">Open The Wall to see what that does to GPU counts.</span>',
    cos:['nvidia','skhynix','micron'],
    geo:[['—','an algorithm, not a place — but its appetite lands on Korean HBM and Taiwanese packaging']],
    mx:[['context-length trend','every jump (8K→128K→1M) multiplies cache size'],['MLA adoption','DeepSeek-style compression cuts KV ~7× — watch who copies it'],['prefill vs decode pricing','APIs price them differently because the cache is the cost']],
    why:'Not a supply chokepoint — a <b>demand engine</b>. The cache is pure memory pressure: it must live in HBM (nothing slower keeps up with decode), it grows with every word and every user, and it can\'t be shared between chats. It is the single biggest reason inference wants more memory every year.',
    related:['kv_econ','hbm','wall']},
  kv_econ:{id:'kv_econ',name:'KV-Cache Economics',kind:'why memory is the wall',col:'#f6a345',sev:4,
    why:'A demand chokepoint rather than a supply one: every doubling of context length or concurrent users doubles the memory a GPU must hold, and it has to be HBM-fast. That pressure lands directly on the three HBM makers and TSMC\'s packaging line — the tightest links in the whole chain.',
    stats:[['Decode','memory-bound'],['H100 starve','~1,200× wait'],['Fix #1','more HBM'],['Fix #2','CXL + photonics']],
    blurb:'LLM decode reads every weight plus the entire KV cache from HBM for each token. The GPU computes ~1,200× faster than it can fetch — so it idles on memory. Longer context and bigger batches explode the cache (drag the sliders).',
    biz:'This is <span class="hl">why the whole supply chain exists</span>. It converts straight into demand for <b>HBM</b> (SK Hynix/Micron), <b>CoWoS</b> (TSMC), pooled <b>CXL</b> (Astera) and optical <b>disaggregation</b> (Marvell/Celestial). Every doubling of context is a doubling of memory demand.',
    cos:['nvidia','skhynix','micron','astera','marvell'],
    geo:[['—','a demand signal, not a place — but it pulls Korea HBM + Taiwan CoWoS']],
    mx:[['context-length trend','1M-token models = more KV'],['HBM bit-growth','the volume tape'],['inference cost/token','what KV pressure sets']],
    related:['hbm','cxl','net','wall','region_kv','kv_how']},
};

export const ELI={
  reg:'The handful of numbers the GPU is touching this exact instant — like the figures lit up on a calculator\'s screen. Far too tiny to invest in on its own; the value sits with whoever <em>designs</em> the chip (NVIDIA, AMD) and whoever <em>prints</em> it (TSMC).',
  sram:'On-chip scratch paper the GPU scribbles on so it can avoid the slow trip out to main memory. Crucially, it has almost stopped getting cheaper each generation — which is a big reason the industry leans so hard on HBM instead.',
  hbm:'Picture bolting a stack of ultra-fast memory chips <em>directly onto</em> the GPU so data barely has to travel. That\'s HBM. It is the scarcest, most fought-over part in all of AI: only three companies can make it, it costs 5–10× normal memory, and it sells out a year ahead. If you remember one thing from this whole map, make it this.',
  ddr:'Ordinary server memory — slower than HBM but far bigger and much cheaper. Made by the same three giants, plus a few firms (Rambus, Montage) that sell the little buffer chips every memory stick needs.',
  cxl:'A newer kind of plumbing that lets many servers share one big pool of memory instead of each hoarding its own. Still early, but it\'s where merchant chip firms like Astera Labs are starting to make real money.',
  ssd:'Flash storage — vast and cheap, but thousands of times slower than memory. It holds models and data <em>at rest</em>, never the live work. Runs on its own boom-bust cycle, separate from HBM.',
  net:'How racks of GPUs actually talk to each other. Inside a rack that\'s NVIDIA\'s NVLink today; the rest of the industry is pushing open alternatives. This is also where optics (light) is taking over from copper — the fastest-growing slice of the whole build-out.',
  cxl_switch:'The fight over how GPUs are wired together inside a rack. NVIDIA\'s NVLink is the locked-in champion; a coalition called UALink wants to pry it open. Whoever wins decides which chipmakers get the design wins for years — and Astera Labs sells the connecting silicon <em>either way</em>, which is why it\'s the cleanest bet.',
  cxl_module:'A plug-in box of memory the computer treats as extra (slightly slower) RAM that machines can share. For memory makers it\'s just a higher-margin version of the same chips; the real brains — and the real margin — is the little controller, made by Astera, Montage, and Rambus.',
  cxl_host:'One server doing the actual work — a GPU box or a CPU box. The catch: the memory inside it is bolted in and can\'t be shared, so one machine starves while its neighbour wastes hundreds of idle gigabytes. CXL is the plumbing that lets the starving one borrow. Every box that runs short of memory is, ultimately, a customer for everything else on this map.',
  phot_laser:'To send data as light you first need a laser — and lasers can\'t be made from ordinary silicon, so they come from a tiny club of specialists. Demand is running so far ahead of supply that NVIDIA pre-paid ~$4B just to lock it up. When something is this scarce, the few suppliers get real pricing power.',
  phot_cpo:'Instead of plugging fibre-optic cables into the edge of a switch, you build the light engine <em>right into</em> the chip package — less power, far more bandwidth. Broadcom and NVIDIA are first out; startups Ayar and Lightmatter push it even closer to the GPU. Real technology, but mostly a 2028-and-beyond story at scale.',
  phot_transceiver:'The little modules that convert electrical signals into light at every switch port. China\'s InnoLight and Eoptolink build most of them — but the critical brain inside each one is a US-made chip (Marvell). That dependency is the real point of leverage in the whole optics story.',
  kv_how:'Think of the newest word as someone walking into a room asking "who here matters to me?" Everyone already in the room holds up a card (their key) and an offer (their value). Those cards never change — so the model keeps them in a stack instead of asking everyone to rewrite them for every new arrival. That stack is the KV cache: one new card per word, forever growing, living in the GPU\'s fastest memory.',
  kv_econ:'Here\'s why everything else on this map exists: when an AI writes an answer, it has to re-read its entire memory of the conversation for <em>every single word</em> it produces. That memory (the "KV cache") balloons with longer chats and more users, and it has to live in expensive HBM. More memory pressure → more demand for every company in this atlas.',
};

export const SRC={
  hbm:[['Counterpoint — DRAM & HBM market share','https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share'],['Astute — SK Hynix 62% / Micron overtakes Samsung','https://www.astutegroup.com/news/general/sk-hynix-holds-62-of-hbm-micron-overtakes-samsung-2026-battle-pivots-to-hbm4/'],['Epoch AI — HBM & packaging were the 2025 bottleneck','https://epoch.ai/data-insights/ai-chip-supply-chain-constraints']],
  ddr:[['Micron Q2 FY26 results','https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-results-second-quarter-fiscal-2026'],['Rambus FY25 results','https://www.rambus.com/fourth-quarter-and-fiscal-year-2025-financial-results/']],
  cxl:[['CXL Consortium','https://computeexpresslink.org/'],['Astera Labs — Leo CXL on Azure','https://www.asteralabs.com/news/astera-labs-leo-cxl-smart-memory-controllers-on-microsoft-azure-m-series-virtual-machines-overcome-the-memory-wall/']],
  net:[['UALink 1.0 final spec — Tom’s Hardware','https://www.tomshardware.com/tech-industry/ualink-has-nvidias-nvlink-in-the-crosshairs-final-specs-support-up-to-1-024-gpus-with-200-gt-s-bandwidth'],['Ultra Ethernet 1.0 — HPCwire','https://www.hpcwire.com/2025/09/09/ultra-ethernet-has-arrived-one-network-to-rule-them-all/']],
  cxl_switch:[['NVLink Fusion: embrace, extend, extinguish','https://www.fabricatedknowledge.com/p/nvlink-fusion-embrace-extend-extinguish'],['NVIDIA invests $2B in Marvell / NVLink Fusion','https://techfundingnews.com/nvidia-2-billion-marvell-nvlink-fusion-ai-ecosystem/'],['Astera Scorpio X-Series switch','https://www.asteralabs.com/news/astera-labs-extends-leadership-in-open-ai-scale-up-networking-with-new-320-lane-scorpio-x-series-smart-fabric-switch/']],
  cxl_module:[['Astera Labs Q1 2026 results','https://www.asteralabs.com/news/astera-labs-reports-first-quarter-2026-financial-results/'],['Introl — CXL 4.0 / UALink guide','https://introl.com/blog/ualink-cxl-4-gpu-interconnect-memory-pooling-guide-2025']],
  cxl_host:[['Astera Labs — beating the memory wall on Azure','https://www.asteralabs.com/news/astera-labs-leo-cxl-smart-memory-controllers-on-microsoft-azure-m-series-virtual-machines-overcome-the-memory-wall/'],['Introl — CXL memory pooling guide','https://introl.com/blog/ualink-cxl-4-gpu-interconnect-memory-pooling-guide-2025']],
  phot_laser:[['Indium phosphide — the quiet bottleneck','https://yianisz.substack.com/p/indium-phosphide-inp-the-quiet-bottleneck'],['NVIDIA’s $4B laser lockup — TechTimes','https://www.techtimes.com/articles/317281/20260527/ai-data-center-optical-component-shortage-nvidias-4b-laser-lockup-pushes-rivals-past-2027.htm'],['NVIDIA $4B optical strategy — IO Fund','https://io-fund.com/ai-stocks/nvidia-4b-optical-strategy-cpo-ai-data-centers']],
  phot_cpo:[['Broadcom Tomahawk-6 Davisson (102.4 Tb/s CPO)','https://www.broadcom.com/company/news/product-releases/63626'],['NVIDIA Spectrum-X Photonics','https://nvidianews.nvidia.com/news/nvidia-spectrum-x-co-packaged-optics-networking-switches-ai-factories'],['Marvell completes Celestial AI acquisition','https://www.marvell.com/company/newsroom/marvell-completes-acquisition-of-celestial-ai.html']],
  phot_transceiver:[['InnoLight & Eoptolink dominate 60% of 800G','https://ip-fiber.com/blogs/news/nvidia-orders-surge-innolight-and-eoptolink-dominate-60-of-800g-sfp-optical-modules-supply'],['Marvell optical DSP','https://www.marvell.com/solutions/data-center/optical-dsp.html'],['Fabrinet at OFC 2026','https://www.investing.com/news/transcripts/fabrinet-at-2026-optical-fiber-conference-sustained-growth-amid-challenges-93CH-4567256']],
  kv_how:[['KV cache, explained intuitively — Saad Ahmed','https://medium.com/@saad.ahmed1926q/kv-cache-explained-intuitively-2b425a36dfc7'],['DeepSeek-V2 paper — MLA compressed KV','https://arxiv.org/pdf/2405.04434'],['A visual guide to attention variants — Sebastian Raschka','https://magazine.sebastianraschka.com/p/visual-attention-variants']],
  kv_econ:[['Epoch AI — AI chip supply-chain constraints','https://epoch.ai/data-insights/ai-chip-supply-chain-constraints'],['SemiAnalysis — Co-Packaged Optics','https://newsletter.semianalysis.com/p/co-packaged-optics-cpo-book-scaling']],
};

export const WATCH_GROUPS=[
  {t:'Memory · HBM oligopoly',ids:['skhynix','samsung','micron']},
  {t:'Advanced packaging & equipment',ids:['tsmc','besi','asml','lam','disco','kla','ase','amkor']},
  {t:'Materials & substrates',ids:['ajinomoto','ibiden','shinetsu']},
  {t:'Connectivity · CXL · switching',ids:['astera','marvell','broadcom','montage','rambus','microchip']},
  {t:'Optics · photonics',ids:['coherent','lumentum2','fabrinet','innolight','ciena','sumitomo','corning','ayar','lightmatter','celestial']},
  {t:'The AI buyers',ids:['nvidia','amd','intel']},
];

export const ROADMAP=[
  {y:'2025 · H2',k:'shipping',c:'#5eead4',t:'First production cloud CXL + photonic switches ship',d:'Azure ships CXL-attached memory (Astera Leo) — the first in a commercial cloud. NVIDIA Quantum-X Photonics and Broadcom\'s Tomahawk-6 Davisson (102.4 Tb/s CPO) begin sampling to tier-1 hyperscalers.',cos:['astera','nvidia','broadcom']},
  {y:'2026 · H1',k:'catalyst',c:'#46c8e0',t:'HBM4 qualifies at NVIDIA (Rubin)',d:'SK Hynix and Samsung deliver HBM4 — the next bandwidth leap (a 2,048-bit bus). TSMC races CoWoS toward ~130k wafers/month. Whoever qualifies first wins the allocation.',cos:['skhynix','samsung','tsmc']},
  {y:'2026',k:'bottleneck',c:'#f6a345',t:'1.6T optics ramp & the EML-laser squeeze',d:'1.6T transceivers ramp (InnoLight volume, Marvell DSP inside). EML lasers sell out through 2027 after NVIDIA\'s ~$4B Lumentum/Coherent lockup. ABF substrate back in shortage (Ibiden). Scarcity = pricing power.',cos:['innolight','marvell','lumentum2','coherent','ibiden']},
  {y:'2027',k:'catalyst',c:'#9a8cff',t:'The interconnect war goes live',d:'CXL 3.0 host CPUs arrive (Intel Diamond Rapids, AMD Zen 6); first UALink production silicon challenges NVLink. CoWoS-L enables bigger packages with more HBM stacks. Astera sells the connecting silicon either way.',cos:['intel','amd','astera','broadcom','tsmc']},
  {y:'2028 – 2030',k:'horizon',c:'#7ee787',t:'Light takes over — CPO & memory disaggregation at scale',d:'Co-packaged optics reach mass deployment; optical I/O chiplets ship in products (Ayar, Lightmatter); photonic memory disaggregation arrives (Marvell/Celestial). HBM4E pushes ~4 TB/s per stack. The rack becomes one machine.',cos:['ayar','lightmatter','marvell','celestial','broadcom','nvidia']},
];

export const GEO=[
  {cc:'TWN',country:'Taiwan',sev:5,role:'Logic die (TSMC N3/N2) + CoWoS advanced packaging — ~90% of leading-edge logic and near-100% of CoWoS. A disruption here halts the entire AI hardware stack within months.',cos:['tsmc','ase']},
  {cc:'KOR',country:'South Korea',sev:5,role:'HBM manufacturing — SK Hynix + Samsung, 95%+ of global HBM in two cities. The memory every AI GPU is built around.',cos:['skhynix','samsung']},
  {cc:'NLD',country:'Netherlands',sev:5,role:'EUV lithography — ASML, a 100% monopoly. No sub-7nm chip (logic or HBM base die) exists without it. Plus Besi hybrid bonding.',cos:['asml','besi']},
  {cc:'JPN',country:'Japan',sev:4,role:'The silent materials chokepoint — photoresist, silicon wafers, ABF film (Ajinomoto ~95%) & substrates (Ibiden), and InP lasers (Sumitomo). Low visibility, huge leverage.',cos:['ajinomoto','ibiden','shinetsu','sumitomo']},
  {cc:'USA',country:'United States',sev:3,role:'Design & IP — NVIDIA, AMD, Marvell, Astera, Broadcom — plus Micron HBM, Lumentum/Coherent lasers, Lam/KLA tools and EDA. Owns the value; outsources the fabrication.',cos:['nvidia','amd','marvell','astera','broadcom','micron','lumentum2','coherent','lam','kla']},
  {cc:'CHN',country:'China',sev:3,role:'Optical-module volume — InnoLight + Eoptolink (~60% of transceivers) — plus Montage CXL silicon. Dominates assembly but depends on US DSPs and US/Japan lasers. A geopolitical flashpoint.',cos:['innolight','montage']},
  {cc:'THA',country:'Thailand',sev:2,role:'Precision optical assembly — Fabrinet builds transceivers for Coherent, Lumentum, Ciena. A quiet single-country concentration in optics.',cos:['fabrinet']},
];

export const SHORTLIST=[
  {t:'Chokepoint monopolies',d:'Single points of failure — if any one stalls, the whole stack stalls. Highest barriers, near-impossible to displace.',items:[
    ['tsmc','Makes the GPU AND the CoWoS packaging that bonds HBM to it — everything routes through its fabs. CoWoS booked to 2027.'],
    ['asml','A 100% EUV-lithography monopoly. No sub-7nm chip — logic or HBM base die — exists without an ASML machine.'],
    ['ajinomoto','~95% of ABF film, the insulating layer in every high-end chip package. The quietest monopoly in the whole chain.'],
  ]},
  {t:'The scale players',d:'The deepest revenue pools — where the AI build-out shows up first and largest in the P&L.',items:[
    ['nvidia','The demand engine. Sets the roadmap, buys the most HBM and optics, and pre-buys supply to lock out rivals.'],
    ['skhynix','The HBM bellwether — #1 in the scarcest, most fought-over component; first to qualify each new generation.'],
    ['broadcom','Switching (Tomahawk) + custom XPUs for hyperscalers; the anchor of the merchant-silicon / UALink camp.'],
    ['marvell','The most complete optical stack — ~70% DSP share + Celestial photonic fabric + custom AI silicon.'],
  ]},
  {t:'The pure-plays',d:'Concentrated bets — smaller floats, high leverage to one specific part of the build-out.',items:[
    ['astera','The cleanest pure-play on AI connectivity — retimers, CXL, fabric switches. Wins the interconnect war either way.'],
    ['lumentum2','The laser chokepoint — the only volume supplier of 200G/lane EML lasers; NVIDIA pre-paid ~$2B to lock it.'],
    ['besi','The hybrid-bonding tool the next HBM generations require. Tiny float, enormous optionality.'],
  ]},
];

// Model classes, mid-2026 (researched via /last30days 2026-07-05):
// W = weights in GB (fp16; 1T-class is fp8 as shipped). kvTok = KV-cache bytes
// per token: GQA (Llama-style) = 2·L·kv_heads·head_dim·2B; the 1T MoE class
// (Kimi K2.6 / DeepSeek recipe) uses MLA — compressed-latent KV ≈ 70 KB/token,
// SMALLER than the 405B despite 2.5× the parameters. That contrast is the point.
/* SERVING CONTRACT — the one source for the GPU the Wall reasons about.
   Headline, caption, dock, rim label and the math all consume these. */
export const SERVING={GPU:'B200',CAP_GB:192,COST_K:35,BW_FACTOR:8};

export const MODELS=[
  {n:'8B',W:16,kvTok:131072,tip:'Today: Qwen3-8B, Llama-3.1-8B, Ministral 8B. GQA attention. The "runs on one GPU (even a gaming card)" class.'},
  {n:'70B',W:140,kvTok:327680,tip:'Today: Llama-3.3-70B, Qwen2.5-72B, R1-Distill-70B. GQA (~8× KV compression). 140 GB of weights — one B200, or 2× H100.'},
  {n:'405B',W:810,kvTok:516096,tip:'Today: Llama-3.1-405B (dense), Qwen3.5-397B (MoE). The classic heavyweight — an 8-GPU node, and the heaviest KV per chat here.'},
  {n:'1T MoE',W:1000,kvTok:70272,tip:'Today: Kimi K2.6 (1T, 32B active), DeepSeek V4 (1.6T), Ling 2.5. MLA compresses KV ~7× below the 405B — a giant model with tiny per-chat memory. Cluster territory.'},
];

export const JOURNEY=[
  {r:'map',t:'The map — the whole story on one graph',cap:'Welcome. Every layer, bottleneck and company in the AI memory chain is a node on this graph — the <b>gold row</b> is the money. Glide around with <b>WASD</b> or the <b>arrow keys</b>, click anything to read it, or keep hitting <b>Next ▶</b> (or press <b>N</b>) and the atlas walks you from zero to expert, stop by stop.'},
  {r:'ai',n:'kv_econ',t:'Start with the problem',cap:'AI is bottlenecked by <b>memory</b>, not math. To write each word, a GPU re-reads the entire model from memory — and sits idle ~1,200× waiting on it. That one fact is what this whole map is about.'},
  {r:'ai',t:'The Wall, live',cap:'One glass tank = one GPU\'s memory. The blue block is the model; every chat adds a green slab that grows with the conversation. <b>Drag the sliders below</b> — when the tank overflows, you\'re buying whole extra GPUs.'},
  {r:'kvcache',t:'Watch the cache being written',cap:'This is the thing filling those tanks. The gold cube is the word being written; the beams look back at every stored key/value pair. <b>Toggle the cache off</b> below to see the waste it prevents.'},
  {r:'kvcache',n:'kv_how',t:'How the KV cache works'},
  {r:'hierarchy',t:'The memory stack — 7 layers',cap:'Fast, tiny and costly at the top; vast, slow and cheap at the bottom. Slab width = capacity, particle speed = bandwidth, ◆ = a genuine supply chokepoint. The next stops walk every layer.'},
  {r:'hierarchy',n:'reg',t:'Registers — where the math happens'},
  {r:'hierarchy',n:'sram',t:'L1/L2 SRAM — on-chip scratch paper'},
  {r:'hierarchy',n:'hbm',t:'HBM — the prize',cap:'If you remember one stop, make it this one. Just three firms make HBM and it sells out a year ahead — gated from below by TSMC\'s CoWoS packaging, ASML\'s EUV monopoly and Ajinomoto\'s 95% grip on ABF. The bottleneck is packaging, not the chip. Tap <b>"Who makes it"</b> in the panel.'},
  {r:'hierarchy',n:'ddr',t:'Host DDR5 — the big, slower pool'},
  {r:'hierarchy',n:'cxl',t:'CXL memory — the escape valve'},
  {r:'hierarchy',n:'ssd',t:'NVMe SSD — weights at rest'},
  {r:'hierarchy',n:'net',t:'Network / fabric — racks become one computer'},
  {r:'cxl',t:'The CXL fabric, live',cap:'When a model outgrows one GPU\'s memory, CXL lets many servers borrow from <b>one shared pool</b>. Toggle Expansion / Pooling / Sharing below and watch the memory move.'},
  {r:'cxl',n:'cxl_switch',t:'The interconnect war',cap:'NVLink vs UALink vs CXL — whoever wins decides which chipmakers get the design wins for years. <b>Astera Labs</b> is the pure-play that wins whichever way it breaks.'},
  {r:'cxl',n:'cxl_module',t:'The CXL memory module'},
  {r:'cxl',n:'cxl_host',t:'A compute host — the customer'},
  {r:'photonics',t:'Copper vs light',cap:'Copper dies after ~1 metre and runs hot; light travels far and carries ~10× the data. At rack scale, optics is taking over — watch both lanes run.'},
  {r:'photonics',n:'phot_laser',t:'The laser bottleneck',cap:'Silicon cannot make light. Every optical link starts with an indium-phosphide laser — fewer than five firms make them at volume, and NVIDIA locked up ~$4B of Lumentum & Coherent supply through 2027.'},
  {r:'photonics',n:'phot_cpo',t:'Co-packaged optics'},
  {r:'photonics',n:'phot_transceiver',t:'Optical transceivers'},
  {intel:'short',t:'The investor shortlist',cap:'Now the money. These are the names that structurally define the map — chokepoint monopolies, scale players and pure-plays — and exactly why each one matters.'},
  {intel:'watch',t:'Every ticker, by layer'},
  {intel:'geo',t:'Where the single points of failure live'},
  {intel:'road',t:'The roadmap — what ships when'},
  {r:'map',t:'You can read the map now',cap:'You\'ve walked the whole chain: the wall → the cache → HBM → the chokepoints → CXL → photonics → the money. Click any node to go deeper — and click a <b>company</b> to see every layer it touches. The floor is yours.'},
];
