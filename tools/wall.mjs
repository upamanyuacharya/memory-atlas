/**
 * /read/wall.html — The Wall calculator as a standalone, shareable page (v2.0.0).
 *
 * The most quotable thing in the atlas is "your N-user, K-token chat needs X GPUs and
 * costs $Y" — and it was buried at journey stop 3 inside a WebGL scene. This page is
 * the same SERVING contract and MODELS table (imported from data/atlas-data.js, so it
 * can never drift from the 3D Wall), rendered as a plain 2D calculator that works on
 * a phone, prefills from the URL (#m/ctx/chats — the same route the 3D Wall uses),
 * and copies a one-line result for sharing.
 */
export function wallPage({ page, esc, asofLabel, MODELS, SERVING, SITE }) {
  const models = JSON.stringify(MODELS.map(m => ({ n: m.n, W: m.W, kvTok: m.kvTok, tip: m.tip })));
  const serving = JSON.stringify(SERVING);
  const body = `
<div class="tier" style="color:#f6a345"><span class="dot"></span>The Memory Wall · live calculator</div>
<h1>What does one chat cost in GPUs?</h1>
<p class="lede">Pick a model class, a conversation length and how many people are chatting at once. The calculator fills one <b>${esc(SERVING.GPU)}</b> (${SERVING.CAP_GB} GB) with the model's weights, then adds each chat's KV cache — and tells you when you're buying whole extra GPUs.</p>
<p><a class="cta" href="../#wall">▶&nbsp; See the tanks fill in 3D</a> &nbsp; <a class="cta ghost" href="kv_econ.html">Why memory is the wall</a></p>

<div class="blk" id="calc">
  <div class="kmini">Model class</div>
  <div class="pills" id="mdl"></div>
  <p id="mtip" style="font-size:15.5px;color:var(--dim);margin:8px 0 18px"></p>
  <div class="kmini">Context per chat <span id="ctxV" style="color:var(--ink);margin-left:8px"></span></div>
  <input type="range" id="ctx" min="1" max="256" value="16" style="width:100%;accent-color:#5eead4">
  <div class="kmini" style="margin-top:18px">Simultaneous chats <span id="batV" style="color:var(--ink);margin-left:8px"></span></div>
  <input type="range" id="bat" min="1" max="128" value="8" style="width:100%;accent-color:#5eead4">
</div>

<div class="stats" id="out">
  <div class="stat"><div class="l">Weights</div><div class="v" id="oW">—</div></div>
  <div class="stat"><div class="l">KV cache · total</div><div class="v" id="oKV" style="color:#7ee787">—</div></div>
  <div class="stat"><div class="l">GPUs needed</div><div class="v" id="oG" style="font-size:26px">—</div></div>
  <div class="stat"><div class="l">ms / token</div><div class="v" id="oT">—</div></div>
  <div class="stat"><div class="l">Hardware</div><div class="v" id="oC">—</div></div>
</div>
<div class="tankwrap"><div class="tank" id="tank"></div><div id="tankL" class="kmini" style="margin:8px 0 0"></div></div>
<p id="headline" class="lede" style="margin-top:18px"></p>
<p><button class="cta" id="share" style="border:0;cursor:pointer">⧉&nbsp; Copy this result</button> <span id="toast" style="font-family:var(--mono);font-size:12px;color:var(--faint);margin-left:10px"></span></p>

<h2>How it's calculated</h2>
<p>Weights are fixed per model class (fp16, fp8 for the 1T MoE class). The KV cache is <b>bytes per token × context × chats</b> — and bytes per token is the number that architecture decides: a GQA model like the 405B class stores ~504 KB per token, while an MLA model like the 1T MoE class compresses that to ~69 KB. A GPU is "full" at ${SERVING.CAP_GB} GB; anything over spills into another GPU at roughly $${SERVING.COST_K}k each. Speed is memory-bound: a decode step must re-read weights plus the whole cache, so ms/token scales with what's resident.</p>
<p>The same numbers drive the 3D Wall — <a href="../#wall">watch the tanks overflow</a>, or read <a href="kv_how.html">how the KV cache works</a> word by word.</p>
<style>
.tankwrap{margin:16px 0 0}.tank{height:26px;border-radius:8px;border:1px solid var(--hair2);background:var(--glass);display:flex;overflow:hidden}.tank i{display:block;height:100%}.tank .w{background:#5aa9ff}.tank .k{background:#7ee787}.tank .s{background:#f6a345}
#mdl .pill{cursor:pointer}#mdl .pill.on{color:#06110f;background:var(--accent);border-color:var(--accent);font-weight:600}
</style>
<script>
(function(){
const MODELS=${models},S=${serving};
const $=id=>document.getElementById(id);
let m=1,ctx=16,bat=8;
const h=location.hash.replace(/^#\\/?/,'').split('/').map(Number);
if(h.length===3&&MODELS[h[0]]&&h[1]>=1&&h[1]<=256&&h[2]>=1&&h[2]<=128){m=h[0];ctx=h[1];bat=h[2];}
$('ctx').value=ctx;$('bat').value=bat;
$('mdl').innerHTML=MODELS.map((x,i)=>'<button class="pill" data-i="'+i+'">'+x.n+'</button>').join('');
function kvGB(x,c,b){return (x.kvTok*c*1024*b)/1e9;}
function fmt$(k){return k<1000?'$'+Math.round(k)+'k':'$'+(k/1000).toFixed(2)+'M';} // identical to the 3D Wall's format
function render(){
  const x=MODELS[m];const kv=kvGB(x,ctx,bat);const total=x.W+kv;const g=Math.max(1,Math.ceil(total/S.CAP_GB));
  const perChat=kvGB(x,ctx,1);const fits=Math.max(0,Math.floor((S.CAP_GB-x.W)/Math.max(perChat,1e-9)));
  document.querySelectorAll('#mdl .pill').forEach(b=>b.classList.toggle('on',+b.dataset.i===m));
  $('mtip').textContent=x.tip;$('ctxV').textContent=ctx+'K tokens';$('batV').textContent=bat+' chats';
  $('oW').textContent=x.W+' GB';$('oKV').textContent=(kv<10?kv.toFixed(1):Math.round(kv))+' GB';$('oG').textContent=g+' × '+S.GPU;$('oC').textContent=fmt$(g*S.COST_K);
  const wp=Math.min(100,x.W/S.CAP_GB*100),kp=Math.min(100-wp,kv/S.CAP_GB*100),sp=Math.max(0,(total-S.CAP_GB)/S.CAP_GB*100);
  $('tank').innerHTML='<i class="w" style="width:'+wp+'%"></i><i class="k" style="width:'+kp+'%"></i>'+(sp>0?'<i class="s" style="width:'+Math.min(100-wp-kp,sp)+'%"></i>':'');
  $('tankL').innerHTML='<span style="color:#5aa9ff">■ weights</span> &nbsp; <span style="color:#7ee787">■ KV cache</span>'+(sp>0?' &nbsp; <span style="color:#f6a345">■ spills into GPU #'+(g)+'</span>':'')+' &nbsp; · one tank = one '+S.GPU+' ('+S.CAP_GB+' GB)';
  const msTok=total/(g*S.BW_FACTOR); // same SERVING contract as the 3D Wall (index.html updateKV)
  $('oT').textContent=msTok<10?msTok.toFixed(1):Math.round(msTok);
  $('headline').innerHTML=g===1?('A <b>'+x.n+'</b> model serving <b>'+bat+'</b> chats at <b>'+ctx+'K</b> tokens fits in one '+S.GPU+' — '+Math.round(total)+' of '+S.CAP_GB+' GB used, room for about '+fits+' chats this size.'):
    ('A <b>'+x.n+'</b> model serving <b>'+bat+'</b> chats at <b>'+ctx+'K</b> tokens needs <b>'+g+' × '+S.GPU+'</b> (~'+fmt$(g*S.COST_K)+' of hardware) — the cache alone is '+Math.round(kv)+' GB, '+(kv>x.W?'bigger than the model itself.':'on top of '+x.W+' GB of weights.'));
  try{history.replaceState(null,'','#'+m+'/'+ctx+'/'+bat);}catch(e){}
  if(window.gtag)try{gtag('event','wall_change',{model:x.n,ctx:ctx,chats:bat,gpus:g,page:'read'});}catch(e){}
}
$('mdl').addEventListener('click',e=>{const b=e.target.closest('.pill');if(!b)return;m=+b.dataset.i;render();});
$('ctx').addEventListener('input',()=>{ctx=+$('ctx').value;render();});
$('bat').addEventListener('input',()=>{bat=+$('bat').value;render();});
$('share').addEventListener('click',()=>{const txt=document.getElementById('headline').textContent+' — '+location.href;const done=()=>{$('toast').textContent='copied';setTimeout(()=>$('toast').textContent='',1800);if(window.gtag)try{gtag('event','share_copy',{route:'read/wall'});}catch(e){}};
  if(navigator.clipboard)navigator.clipboard.writeText(txt).then(done,()=>prompt('Copy',txt));else prompt('Copy',txt);});
window.addEventListener('hashchange',()=>{const h=location.hash.replace(/^#\\/?/,'').split('/').map(Number);if(h.length===3&&MODELS[h[0]]){m=h[0];ctx=h[1];bat=h[2];$('ctx').value=ctx;$('bat').value=bat;render();}});
render();
})();
</script>`;
  return page({ file: 'wall.html', title: 'The Wall calculator', ogTitle: 'What does one AI chat cost in GPUs? — The Wall calculator', desc: `Pick a model class, a context length and a number of simultaneous chats; see how much KV cache they need, when they overflow a ${SERVING.GPU}, and what the extra GPUs cost.`, body, crumbs: [['Text edition', './'], ['The Wall calculator']], jsonld: { '@type': 'WebApplication', applicationCategory: 'EducationalApplication' } });
}
