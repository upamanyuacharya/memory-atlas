import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge', headless: true });
const p = await b.newPage({ viewport:{width:1440,height:900} });
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
for (const [h,f] of [['#intel/numbers','intel-numbers'],['#intel/road','intel-road'],['#node/china','node-china'],['#node/dram_cycle','node-dram'],['#wall','wall-default']]) {
  await p.goto('about:blank'); await p.goto('http://127.0.0.1:4323/'+h,{waitUntil:'load'}); await wait(2600);
  await p.evaluate(()=>window.__atlas.freeze(3)); await p.screenshot({path:`tools/shots/${f}.png`});
}
console.log('errors',errs); await b.close();
