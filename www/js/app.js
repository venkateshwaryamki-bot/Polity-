/* Router, navigation, app shell (sidebar on laptops, tab bar on phones), Android integration. */
window.App=(function(){
  const {$,$$} = UI;
  const NAV=[
    {g:'Learn'},
    {href:'#/',ic:'🏠',t:'Home'},
    {href:'#/learn',ic:'📚',t:'Chapters'},
    {href:'#/updates',ic:'🆕',t:"What's New",badge:'2026'},
    {href:'#/syllabus',ic:'🗺️',t:'Syllabus Map'},
    {g:'Practice'},
    {href:'#/quiz',ic:'🎯',t:'Practice'},
    {href:'#/lightning',ic:'⚡',t:'Lightning Round'},
    {href:'#/pyq',ic:'📝',t:'PYQs'},
    {href:'#/flashcards',ic:'🃏',t:'Cards'},
    {href:'#/mains',ic:'✍️',t:'Answer Studio'},
    {g:'Reference'},
    {href:'#/articles',ic:'📜',t:'Articles'},
    {href:'#/amendments',ic:'🧾',t:'Amendments'},
    {href:'#/revision',ic:'💡',t:'Quick Revise'},
    {href:'#/profile',ic:'👤',t:'Profile'},
  ];
  const TABS=[{href:'#/',ic:'🏠',t:'Home'},{href:'#/learn',ic:'📚',t:'Chapters'},{href:'#/quiz',ic:'🎯',t:'Practice'},{href:'#/flashcards',ic:'🃏',t:'Cards'}];
  const MORE=[['#/lightning','⚡','Lightning'],['#/pyq','📝','PYQs'],['#/mains','✍️','Answer Studio'],['#/updates','🆕',"What's New"],['#/articles','📜','Articles'],['#/amendments','🧾','Amendments'],['#/revision','💡','Quick Revise'],['#/syllabus','🗺️','Syllabus'],['#/profile','👤','Profile']];
  const curPath=()=>'#'+((location.hash.slice(1).split('?')[0]||'/').split('#')[0]||'/');
  const isActive=(href,path)=>href==='#/'?path==='#/':(path===href||path.startsWith(href+'/')||(href==='#/learn'&&path.startsWith('#/chapter'))||(href==='#/profile'&&path==='#/progress'));

  function renderNav(){
    const path=curPath();
    $('#nav').innerHTML=NAV.map(n=>n.g?`<div class="group">${n.g}</div>`:`<a href="${n.href}" class="${isActive(n.href,path)?'active':''}"><span class="ic">${n.ic}</span>${n.t}${n.badge?`<span class="badge">${n.badge}</span>`:''}</a>`).join('');
    const moreActive=!TABS.some(t=>isActive(t.href,path));
    $('#tabbar').innerHTML=TABS.map(t=>`<a href="${t.href}" class="${isActive(t.href,path)?'active':''}"><span class="ti">${t.ic}</span>${t.t}</a>`).join('')+`<button type="button" id="more-btn" class="${moreActive?'active':''}"><span class="ti">☰</span>More</button>`;
    $('#more-btn').onclick=()=>{ UI.haptic('tap'); $('#more-sheet').hidden=false; };
  }
  $('#more-grid').innerHTML=MORE.map(([h,i,t])=>`<a href="${h}"><span class="si">${i}</span>${t}</a>`).join('');
  $('#more-sheet').onclick=e=>{ if(e.target.id==='more-sheet'||e.target.closest('a')) $('#more-sheet').hidden=true; };

  function route(){
    const raw=location.hash.slice(1)||'/';
    const [pathPart,query='']=raw.split('?');
    const [pathOnly,anchor]=pathPart.split('#');
    const params=new URLSearchParams(query);
    const seg=pathOnly.split('/').filter(Boolean);
    const main=$('#main'); let html='';
    try{
      const r=seg[0]||'';
      if(!r) html=V.home();
      else if(r==='learn') html=V.learn();
      else if(r==='syllabus') html=V.syllabus();
      else if(r==='chapter') html=V.chapter(seg[1],seg[2]);
      else if(r==='pyq') html=V.pyq(params);
      else if(r==='quiz') html=V.quizSetup(params);
      else if(r==='lightning') html=Fun.lightning();
      else if(r==='flashcards') html=V.flashcards(params);
      else if(r==='articles') html=V.articles(params);
      else if(r==='amendments') html=V.amendments(params);
      else if(r==='mains') html=seg[1]?V.mainsQ(seg[1]):V.mains(params);
      else if(r==='revision') html=V.revision(params);
      else if(r==='updates') html=V.updates(params);
      else if(r==='profile'||r==='progress') html=V.progress();
      else html='<div class="empty">Page not found. <a href="#/">Go home</a></div>';
    }catch(e){ console.error(e); html=`<div class="empty">Something went wrong on this page.<br><code>${MD.esc(e.message)}</code></div>`; }
    main.innerHTML=html; V.runAfter(); renderNav(); bind(seg,params);
    document.title=((main.querySelector('h1')||{}).textContent||'Civix').replace(/\s+/g,' ').trim()+' · Civix';
    if(anchor){ const t=document.getElementById(anchor); if(t) setTimeout(()=>t.scrollIntoView({block:'start'}),30); } else window.scrollTo({top:0});
    $('#more-sheet').hidden=true;
  }
  function setParam(k,v){ const raw=location.hash.slice(1)||'/'; const [p,q='']=raw.split('?'); const ps=new URLSearchParams(q); if(v===''||v==null||v==='all'&&k!=='type') ps.delete(k); else ps.set(k,v); location.hash=p+(ps.toString()?'?'+ps.toString():''); }

  function bind(seg,params){
    const main=$('#main');
    // chapter tabs
    $$('.tabs button[data-tab]',main).forEach(b=>b.onclick=()=>{ UI.sound('tap'); location.hash=`#/chapter/${seg[1]}/${b.dataset.tab}`; });
    const md=$('#mark-done',main); if(md) md.onclick=()=>{ const id=seg[1]; if(Store.s.done[id]){ Store.unmarkDone(id); UI.toast('Marked as not done'); } else { Store.markDone(id); UI.confetti(); UI.sound('level'); UI.haptic('success'); } route(); };
    // article chips in notes
    $$('.prose .art',main).forEach(a=>a.onclick=()=>{ location.hash = a.dataset.art? `#/articles?q=${a.dataset.art}` : `#/articles?q=${encodeURIComponent(a.dataset.q)}`; });
    // TOC highlighting
    const toc=$$('.toc a',main); if(toc.length){ const obs=new IntersectionObserver(es=>{es.forEach(e=>{ if(e.isIntersecting){ toc.forEach(a=>a.classList.toggle('active',a.dataset.toc===e.target.id)); } });},{rootMargin:'-80px 0px -70% 0px'}); $$('.prose h2',main).forEach(h=>obs.observe(h)); }
    // pyq filters
    $$('[data-f]',main).forEach(el=>{ if(el.tagName==='BUTTON') el.onclick=()=>{ setParam('type',el.dataset.v); setParam('topic','all'); setParam('year','all'); }; else if(el.type==='search') el.oninput=debounce(()=>setParam('q',el.value),350); else el.onchange=()=>setParam(el.dataset.f,el.value); });
    // quiz form
    const qf=$('#quiz-form',main); if(qf) qf.onsubmit=e=>{ e.preventDefault(); const fd=new FormData(qf); UI.sound('tap'); location.hash=`#/quiz?go=1&topic=${fd.get('topic')}&kind=${fd.get('kind')}&n=${fd.get('n')}&timer=${fd.get('timer')}`; };
    // flashcard scope
    const fs=$('#fc-scope',main); if(fs) fs.onchange=()=>{ location.hash='#/flashcards'+(fs.value?'?ch='+fs.value:''); };
    // articles
    const aq=$('#art-q',main); if(aq){ aq.oninput=debounce(()=>setParam('q',aq.value),300); if(params.get('q')) aq.focus(); }
    const ap=$('#art-part',main); if(ap) ap.onchange=()=>{ setParam('part',ap.value); };
    // mains filters
    const mt=$('#m-topic',main); if(mt) mt.onchange=()=>setParam('topic',mt.value); const my=$('#m-year',main); if(my) my.onchange=()=>setParam('year',my.value);
    // mains writing
    const mtx=$('#m-text',main); if(mtx){
      const q=PYQ_MAINS.find(x=>x.id===seg[1]); const limit=q.marks===10?150:250; const mins=q.marks===10?7:11;
      mtx.oninput=()=>{ const w=mtx.value.trim().split(/\s+/).filter(Boolean).length; $('#m-words').textContent=`${w} / ${limit} words`; $('#m-words').style.color=w>limit*1.15?'var(--red)':''; };
      let left=mins*60, tm=null; $('#m-start').onclick=()=>{ if(tm){clearInterval(tm);tm=null;$('#m-start').textContent='▶ Resume';return;} $('#m-start').textContent='⏸ Pause'; tm=setInterval(()=>{ left--; const t=$('#m-timer'); if(!t){clearInterval(tm);return;} t.textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`; if(left<=60) t.classList.add('low'); if(left<=0){clearInterval(tm); UI.toast('⏰ Time! Pens down in the real exam.'); UI.haptic('error');} },1000); };
      $('#m-save').onclick=()=>{ const w=mtx.value.trim().split(/\s+/).filter(Boolean).length; if(w<30){UI.toast('Write at least 30 words first.');return;} const first=!Store.s.mains[seg[1]]; Store.s.mains[seg[1]]={...(Store.s.mains[seg[1]]||{}),written:mtx.value,words:w,date:Store.today()}; Store.save(); $('#m-rubric').hidden=false; if(first) Store.addXP(25,'Answer written'); else UI.toast('Saved'); Store.checkBadges(); };
      $('#m-grade').onclick=()=>{ const checked=$$('#m-rubric input:checked').map(i=>+i.dataset.r); const est=Math.round((checked.length/8)*q.marks*0.75*10)/10; Store.s.mains[seg[1]]={...(Store.s.mains[seg[1]]||{}),rubric:checked}; Store.save(); $('#m-score').textContent=`Estimated ${est}/${q.marks}`; Store.addXP(checked.length*2,'Self-graded'); };
    }
    // profile settings
    $$('.seg[data-set]',main).forEach(g=>$$('button',g).forEach(b=>b.onclick=()=>{
      const k=g.dataset.set; let v=b.dataset.v; if(k==='dailyXP') v=+v;
      Store.setSetting(k,v); if(k==='theme') applyTheme();
      UI.sound('tap'); UI.haptic('tap'); UI.renderXP();
      $$('button',g).forEach(x=>x.classList.toggle('on',x===b));
    }));
    $$('[data-toggle]',main).forEach(c=>c.onchange=()=>{ Store.setSetting(c.dataset.toggle,c.checked); if(c.checked){ UI.sound('tap'); UI.haptic('tap'); } });
    const nm=$('#set-name',main); if(nm) nm.onchange=()=>{ Store.setSetting('name',nm.value.trim().slice(0,24)); UI.toast('Name saved'); };
    // backup and reset
    const panel=$('#data-panel',main), box=$('#data-box',main);
    const ex=$('#exp',main); if(ex) ex.onclick=()=>{ panel.hidden=false; box.value=Store.exportJSON(); box.select(); };
    const ib=$('#impbtn',main); if(ib) ib.onclick=()=>{ panel.hidden=false; box.value=''; box.focus(); };
    const cp=$('#copy',main); if(cp) cp.onclick=()=>{ const t=box.value; (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>UI.toast('Copied')).catch(()=>{ box.select(); UI.toast('Selected: press Ctrl/Cmd + C'); }); };
    const di=$('#doimp',main); if(di) di.onclick=()=>{ if(Store.importJSON(box.value)){ UI.toast('Progress imported'); applyTheme(); route(); UI.renderXP(); } else UI.toast('That code is not valid. Paste the full backup code.'); };
    const rs=$('#reset',main); if(rs) rs.onclick=()=>{ if(rs.dataset.armed){ Store.reset(); } else { rs.dataset.armed='1'; rs.textContent='Tap again to delete all progress'; setTimeout(()=>{ if(rs.isConnected){ delete rs.dataset.armed; rs.textContent='Reset everything'; } },4000); } };
  }
  function debounce(fn,ms){ let t; return (...a)=>{clearTimeout(t); t=setTimeout(()=>fn(...a),ms);}; }

  /* theme */
  function applyTheme(){
    const t=(Store.s.settings&&Store.s.settings.theme)||'auto';
    if(t==='auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme=t;
    const dark=t==='dark'||(t==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);
    const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.setAttribute('content',dark?'#0A0E1C':'#F5F6FA');
    const SB=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.StatusBar;
    if(SB){ try{ SB.setStyle({style:dark?'DARK':'LIGHT'}); SB.setBackgroundColor({color:dark?'#0A0E1C':'#F5F6FA'}); }catch(e){} }
  }

  /* search */
  const modal=$('#search-modal'), inp=$('#search-input'), res=$('#search-results'); let sel=0;
  function openSearch(){ modal.hidden=false; inp.value=''; res.innerHTML='<div class="muted small" style="padding:12px">Type an Article number (like 32), a case, a chapter or any keyword.</div>'; setTimeout(()=>inp.focus(),10); }
  function closeSearch(){ modal.hidden=true; }
  $('#search-trigger').onclick=openSearch; $('#search-mobile').onclick=openSearch;
  modal.onclick=e=>{ if(e.target===modal) closeSearch(); };
  inp.oninput=()=>{ const r=V.search(inp.value); sel=0; res.innerHTML=r.length?r.map((x,i)=>`<a class="sr ${i===0?'sel':''}" href="${x.href}"><span class="t">${x.t}</span><div style="min-width:0"><b>${MD.esc(x.title)}</b><span>${MD.esc(x.d||'')}</span></div></a>`).join(''):'<div class="muted small" style="padding:12px">No results.</div>'; };
  res.onclick=e=>{ if(e.target.closest('a')) closeSearch(); };
  document.addEventListener('keydown',e=>{
    const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName);
    if(!modal.hidden){ const items=$$('.sr',res); if(e.key==='Escape') closeSearch(); if(e.key==='ArrowDown'){sel=Math.min(items.length-1,sel+1);} if(e.key==='ArrowUp'){sel=Math.max(0,sel-1);} if(e.key==='Enter'&&items[sel]){ location.hash=items[sel].getAttribute('href'); closeSearch(); } items.forEach((it,i)=>it.classList.toggle('sel',i===sel)); if(items[sel]) items[sel].scrollIntoView({block:'nearest'}); return; }
    if(e.key==='Escape'&&!$('#more-sheet').hidden){ $('#more-sheet').hidden=true; return; }
    if(typing) return;
    if(e.key==='/'||(e.key==='k'&&(e.metaKey||e.ctrlKey))){ e.preventDefault(); openSearch(); }
    if(e.key===' '&&window.__flip&&document.getElementById('fc')){ e.preventDefault(); window.__flip(); }
    if(/^[1-4]$/.test(e.key)){ const b=$$('#main .opt:not(:disabled)')[+e.key-1]; if(b) b.click(); }
    if(e.key==='Enter'&&$('#nextq')) $('#nextq').click();
  });

  /* Android (Capacitor): hardware back button, splash screen */
  const P=window.Capacitor&&Capacitor.Plugins;
  if(P&&P.App){ P.App.addListener('backButton',()=>{
    if(!modal.hidden){ closeSearch(); return; }
    if(!$('#more-sheet').hidden){ $('#more-sheet').hidden=true; return; }
    if(curPath()!=='#/') history.back(); else P.App.exitApp();
  }); }
  if(P&&P.SplashScreen){ try{ P.SplashScreen.hide(); }catch(e){} }
  try{ matchMedia('(prefers-color-scheme: dark)').addEventListener('change',applyTheme); }catch(e){}

  applyTheme(); Store.touch(); UI.renderXP(); Store.checkBadges();
  window.addEventListener('hashchange',route); route();
  Fun.onboard();
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !window.Capacitor){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }
  return {route};
})();
