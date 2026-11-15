/* UI helpers: toasts, celebrations, confetti, sound, haptics, header widgets. */
window.UI = (function(){
  const $=(sel,root=document)=>root.querySelector(sel);
  const $$=(sel,root=document)=>[...root.querySelectorAll(sel)];
  const h=(strings,...vals)=>strings.reduce((a,s,i)=>a+s+(vals[i]??''),'');
  function toast(msg,type=''){ const w=$('#toasts'); if(!w) return; const t=document.createElement('div'); t.className='toast '+type; t.innerHTML=msg; w.appendChild(t); setTimeout(()=>t.classList.add('out'),2400); setTimeout(()=>t.remove(),2800); }
  function celebrate(msg){ confetti(); sound('level'); haptic('success'); const el=$('#celebrate'); if(!el) return toast(msg); el.innerHTML=`<div class="celebrate-card">${msg}</div>`; el.hidden=false; clearTimeout(el._t); el._t=setTimeout(()=>{el.hidden=true;},2200); }
  function confetti(){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c=$('#confetti'); if(!c) return; const ctx=c.getContext('2d'); c.width=innerWidth; c.height=innerHeight;
    const cols=['#FF8A00','#3D5AFE','#12B76A','#F04438','#7A5AF8','#0BA5A0','#FFC24B'];
    const ps=Array.from({length:150},()=>({x:innerWidth/2+(Math.random()-.5)*240,y:innerHeight*.45,vx:(Math.random()-.5)*15,vy:-Math.random()*15-4,r:4+Math.random()*5,c:cols[Math.floor(Math.random()*cols.length)],a:Math.random()*6,s:(Math.random()-.5)*.3}));
    let t=0; (function f(){ ctx.clearRect(0,0,c.width,c.height); ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.vx*=.99;p.a+=p.s;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);ctx.restore();}); if(++t<110) requestAnimationFrame(f); else ctx.clearRect(0,0,c.width,c.height); })();
  }
  /* sound: tiny synthesized cues, no audio files */
  let ac=null;
  function sound(kind){
    if(!Store.s.settings.sound) return;
    try{ ac=ac||new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return; }
    const notes={good:[[660,0],[990,.08]],bad:[[220,0],[180,.09]],tap:[[520,0]],level:[[523,0],[659,.1],[784,.2],[1046,.3]],flip:[[440,0]]}[kind]||[[500,0]];
    const now=ac.currentTime;
    notes.forEach(([f,d])=>{ const o=ac.createOscillator(), g=ac.createGain(); o.type=kind==='bad'?'sawtooth':'sine'; o.frequency.value=f; g.gain.setValueAtTime(0.0001,now+d); g.gain.exponentialRampToValueAtTime(kind==='bad'?0.05:0.12,now+d+0.01); g.gain.exponentialRampToValueAtTime(0.0001,now+d+0.16); o.connect(g).connect(ac.destination); o.start(now+d); o.stop(now+d+0.18); });
  }
  function haptic(kind){
    if(!Store.s.settings.haptics) return;
    const H=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Haptics;
    try{
      if(H){ if(kind==='success') H.notification({type:'SUCCESS'}); else if(kind==='error') H.notification({type:'ERROR'}); else H.impact({style:'LIGHT'}); return; }
      if(navigator.vibrate) navigator.vibrate(kind==='error'?[40,40,40]:kind==='success'?[20,30,20]:12);
    }catch(e){}
  }
  function ring(pct,size=64,stroke=7,color='var(--primary)',label=''){
    const r=(size-stroke)/2, c=2*Math.PI*r, off=c*(1-Math.min(100,Math.max(0,pct))/100);
    return `<svg class="ringsvg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--track)" stroke-width="${stroke}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size/2} ${size/2})"/>${label?`<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" class="ringtxt">${label}</text>`:''}</svg>`;
  }
  function renderXP(){
    const L=Store.level(), s=Store.s, tx=Store.todayXP(), g=s.settings.dailyXP;
    $$('.js-xp').forEach(el=>el.innerHTML=`<span class="pill-ic">${L.icon}</span><span class="pill-t"><b>${s.xp.toLocaleString('en-IN')}</b> XP</span>`);
    $$('.js-streak').forEach(el=>el.innerHTML=`<span class="pill-ic">${s.streak>0?'🔥':'🕯️'}</span><b>${s.streak}</b>`);
    $$('.js-goal').forEach(el=>el.innerHTML=ring(Math.round(tx/g*100),34,4,'var(--accent)',tx>=g?'✓':'🎯'));
    const side=$('#side-level'); if(side) side.innerHTML=`<div class="row between"><span class="small"><b>${L.icon} ${L.name}</b> · Lv ${L.n}</span><span class="small muted">${L.next?`${L.to-s.xp} to ${L.next}`:'Max level'}</span></div><div class="bar"><i style="width:${L.pct}%"></i></div>`;
  }
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const pick=(a,n)=>shuffle(a).slice(0,n);
  const pct=(a,b)=>b?Math.round(a/b*100):0;
  const fmtDate=d=>new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const weightDots=w=>`<span class="weight" title="Exam weight ${w} of 5">${[1,2,3,4,5].map(i=>`<i class="${i<=w?'on':''}"></i>`).join('')}</span>`;
  const seeded=str=>{let x=2166136261;for(let i=0;i<str.length;i++){x^=str.charCodeAt(i);x=Math.imul(x,16777619);}return (x>>>0)/4294967295;};
  return {$,$$,h,toast,celebrate,confetti,sound,haptic,ring,renderXP,shuffle,pick,pct,fmtDate,weightDots,seeded};
})();
