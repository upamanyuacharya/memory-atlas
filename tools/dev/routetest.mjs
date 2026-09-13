import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge', headless: true, args:['--use-gl=angle','--use-angle=swiftshader'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function state(){ return p.evaluate(()=>({hash:location.hash,region:__atlas.region,reading:document.body.classList.contains('reading'),h2:(document.querySelector('#panel h2')||{}).textContent||'',intel:document.getElementById('watchModal').classList.contains('on'),jI:__atlas.jI,jTitle:document.getElementById('jTitle').textContent,asof:document.getElementById('asof')?.textContent})); }
const tests=[['#node/hbm'],['#stop/9'],['#intel/geo'],['#wall/3/64/32'],['#photonics'],['#node/phot_laser'],['#stop/22'],['#bogus']];
for(const [h] of tests){ await p.goto('about:blank'); await p.goto('http://127.0.0.1:4323/'+h,{waitUntil:'load'}); await wait(2600); console.log(h,'→',JSON.stringify(await state())); }
// hashchange in-page
await p.goto('http://127.0.0.1:4323/',{waitUntil:'load'}); await wait(2200);
await p.evaluate(()=>{location.hash='#node/cxl_switch';}); await wait(1200); console.log('hashchange →',JSON.stringify(await state()));
await p.evaluate(()=>{location.hash='#kvcache';}); await wait(1200); console.log('hashchange →',JSON.stringify(await state()));
// state → hash
await p.evaluate(()=>__atlas.go('cxl')); await wait(300); console.log('go cxl →',await p.evaluate(()=>location.hash));
await p.evaluate(()=>__atlas.jGo(3)); await wait(900); console.log('jGo 3 →',await p.evaluate(()=>location.hash));
await p.evaluate(()=>__atlas.jGo(4)); await wait(1200); console.log('jGo 4 (node stop) →',await p.evaluate(()=>location.hash), await p.evaluate(()=>document.querySelector('#panel h2')?.textContent));
await p.evaluate(()=>__atlas.setKV(2,32,4)); await wait(300); console.log('setKV on kvcache region (no hash change expected) →',await p.evaluate(()=>location.hash));
await p.evaluate(()=>__atlas.go('ai')); await wait(300); console.log('go ai w/ custom kv →',await p.evaluate(()=>location.hash));
// copy link
await p.context().grantPermissions(['clipboard-read','clipboard-write']);
await p.evaluate(()=>__atlas.route('#node/hbm')); await wait(800);
await p.click('#panel .pshare'); await wait(300);
console.log('toast:',await p.evaluate(()=>document.getElementById('toast').textContent), '| clip:', await p.evaluate(()=>navigator.clipboard.readText()).catch(e=>'n/a'));
console.log('share buttons:',await p.evaluate(()=>[!!document.querySelector('.pshare'),!!document.querySelector('.wmshare'),!!document.querySelector('#jCapShare')]));
console.log('ERRORS:',errs);
await b.close();
