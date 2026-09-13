import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'msedge', headless: true, args:['--use-gl=angle','--use-angle=swiftshader'] });
const p = await b.newPage({ viewport:{width:1440,height:900} });
const errs=[]; p.on('pageerror',e=>errs.push(e.message+'\n'+(e.stack||'').split('\n').slice(0,3).join('\n'))); p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.type()+': '+m.text());});
await p.goto('http://127.0.0.1:4323/'+(process.argv[2]||''),{waitUntil:'load'}); await new Promise(r=>setTimeout(r,4000));
console.log('atlas?',await p.evaluate(()=>typeof window.__atlas)); console.log(errs.join('\n---\n')||'no errors');
await b.close();
