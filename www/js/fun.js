/* Fun layer: Lightning Round, onboarding, floating XP. */
window.Fun=(function(){
  const {$,$$,h,shuffle}=UI;
  function floater(el,text){
    const r=el.getBoundingClientRect(); const f=document.createElement('div'); f.className='floater'; f.textContent=text;
    f.style.left=(r.right-60)+'px'; f.style.top=(r.top-6)+'px'; document.body.appendChild(f); setTimeout(()=>f.parentNode&&f.parentNode.removeChild(f),950);
  }
  function pool(){ return [...PYQ_PRELIMS,...CHAPTERS.flatMap(c=>(c.mcqs||[]).map((m,i)=>({id:`${c.id}-m${i}`,ch:c.id,...m})))].filter(q=>q.q.length<520); }

  /* Lightning Round: 60 seconds, auto-advance */
  function lightning(){
    const best=Store.s.quiz.lightningBest;
    V.after(()=>{ const b=$('#lr-start'); if(b) b.onclick=start; });
    return h`<div class="fade-in">
      <div class="card hero-card" style="padding:26px;text-align:center">
        <div style="font-size:3rem">⚡</div>
        <h1 style="color:#fff;margin:.2em 0">Lightning Round</h1>
        <p class="muted" style="max-width:44ch;margin:0 auto 18px">60 seconds on the clock. Answer as many as you can. Right answers add 2 seconds, wrong ones cost 3.</p>
        <div class="row" style="justify-content:center;gap:8px;margin-bottom:18px"><span class="chip" style="background:rgba(255,255,255,.16);color:#fff;border:0">🏆 Best: ${best}</span><span class="chip" style="background:rgba(255,255,255,.16);color:#fff;border:0">+5 XP per correct</span></div>
        <button class="btn white" id="lr-start" type="button" style="font-size:1.05rem;padding:14px 28px">Start</button>
      </div>
    </div>`;
  }
  function start(){
    const el=$('#main'); const qs=shuffle(pool()); let i=0, score=0, wrong=0, left=60, lock=false, combo=0;
    UI.sound('tap'); UI.haptic('tap');
    el.innerHTML=`<div class="fade-in"><div class="q-top" style="margin-bottom:12px"><span class="chip saffron" id="lr-score">⚡ 0</span><span class="combo" id="lr-combo" hidden></span><span class="timer" id="lr-time">60</span></div><div class="q-progress"><i id="lr-bar" style="width:100%;background:var(--accent)"></i></div><div id="lr-q"></div></div>`;
    const tick=setInterval(()=>{ left--; upd(); if(left<=0) end(); },1000);
    function upd(){ const t=$('#lr-time'); if(!t){ clearInterval(tick); return; } t.textContent=Math.max(0,left); t.classList.toggle('low',left<=10); $('#lr-bar').style.width=Math.max(0,Math.min(100,left/60*100))+'%'; $('#lr-score').textContent='⚡ '+score; const c=$('#lr-combo'); c.hidden=combo<2; c.textContent='🔥 '+combo+'×'; }
    function show(){
      const q=qs[i%qs.length]; lock=false;
      $('#lr-q').innerHTML=h`<div class="q-card fade-in" style="margin-top:12px"><div class="q-stem">${MD.esc(q.q)}</div><div class="opts">${q.opts.map((o,k)=>h`<button class="opt" data-i="${k}"><span class="k">${'ABCD'[k]}</span><span>${MD.esc(o)}</span></button>`).join('')}</div></div>`;
      $$('#lr-q .opt').forEach(b=>b.onclick=()=>{
        if(lock) return; lock=true; const k=+b.dataset.i, ok=k===q.ans;
        Store.recordQ(q.id,ok);
        $$('#lr-q .opt').forEach(x=>{ const j=+x.dataset.i; if(j===q.ans) x.classList.add('correct'); else if(j===k) x.classList.add('wrong'); });
        if(ok){ score++; combo++; left+=2; UI.sound('good'); UI.haptic('tap'); floater(b,'+1'); Store.setCombo(combo); } else { wrong++; combo=0; left-=3; UI.sound('bad'); UI.haptic('error'); }
        upd(); setTimeout(()=>{ if(left>0&&$('#lr-q')){ i++; show(); } }, ok?380:900);
      });
    }
    function end(){
      clearInterval(tick); if(!$('#lr-q')) return;
      const isBest=Store.setLightning(score); const xp=score*5;
      Store.recordQuiz({date:Store.today(),topic:'lightning',n:score+wrong,correct:score,xp});
      if(xp) Store.addXP(xp,'Lightning Round');
      if(isBest&&score>0) UI.celebrate(`🏆 New best: ${score}!`);
      el.innerHTML=h`<div class="q-card fade-in result-hero"><div class="eyebrow">Time's up</div><div class="big">${score}</div><p style="font-weight:800;font-size:1.1rem;margin:.4em 0">${isBest&&score>0?'New personal best!':score>=10?'Lightning fast.':score>=5?'Good pace. Go again?':'Warm-up done. Try again!'}</p><div class="row" style="justify-content:center;gap:8px"><span class="chip green">✓ ${score} right</span><span class="chip red">✗ ${wrong} wrong</span><span class="chip saffron">+${xp} XP</span><span class="chip">🏆 best ${Store.s.quiz.lightningBest}</span></div><div class="row" style="justify-content:center;margin-top:18px"><button class="btn primary" id="lr-again" type="button">⚡ Play again</button><a class="btn ghost" href="#/quiz">Other modes</a></div></div>`;
      $('#lr-again').onclick=start;
    }
    show();
  }

  /* Onboarding: three quick steps on first launch */
  function onboard(){
    const ob=$('#onboard'); if(!ob || Store.s.settings.onboarded) return;
    let step=0; const st={name:'',goal:'prelims',dailyXP:50};
    const dots=()=>`<div class="ob-dots">${[0,1,2].map(i=>`<i class="${i===step?'on':''}"></i>`).join('')}</div>`;
    function draw(){
      if(step===0) ob.innerHTML=`<div class="ob-card" style="text-align:center;align-items:center"><img class="ob-logo" src="assets/logo.svg" alt=""><h1 style="margin:0">Welcome to Civix</h1><p class="muted" style="margin:0">Indian Polity for UPSC, built to be finished. ${CHAPTERS.length} chapters, ${PYQ_PRELIMS.length+PYQ_MAINS.length} PYQs, quizzes, cards and streaks.</p>${dots()}<button class="btn block" id="ob-next" type="button">Get started</button><button class="btn ghost block" id="ob-skip" type="button">Skip</button></div>`;
      if(step===1) ob.innerHTML=`<div class="ob-card"><h2 style="margin:0">What should we call you?</h2><input type="text" id="ob-name" placeholder="Your first name" value="${MD.esc(st.name)}" autocomplete="given-name"><h3 style="margin:8px 0 0">What are you preparing for?</h3><div class="choice" id="ob-goal">${[['prelims','🎯','Prelims','MCQs, facts, PYQs'],['mains','✍️','Mains','Answer writing, analysis'],['both','🏆','Both','The full journey']].map(([v,i,t,d])=>`<button type="button" data-v="${v}" class="${st.goal===v?'on':''}"><span class="ci">${i}</span><span><b>${t}</b><br><small class="muted">${d}</small></span></button>`).join('')}</div>${dots()}<button class="btn block" id="ob-next" type="button">Continue</button></div>`;
      if(step===2) ob.innerHTML=`<div class="ob-card"><h2 style="margin:0">Pick a daily goal</h2><p class="muted" style="margin:0">You can change it any time in Profile.</p><div class="choice" id="ob-xp">${[[30,'🌱','Casual','30 XP · about 10 min'],[50,'📘','Regular','50 XP · about 20 min'],[100,'🔥','Serious','100 XP · about 40 min'],[200,'🚀','Intense','200 XP · 1 hour+']].map(([v,i,t,d])=>`<button type="button" data-v="${v}" class="${st.dailyXP===v?'on':''}"><span class="ci">${i}</span><span><b>${t}</b><br><small class="muted">${d}</small></span></button>`).join('')}</div>${dots()}<button class="btn primary block" id="ob-next" type="button">Start learning</button></div>`;
      const nm=$('#ob-name'); if(nm){ nm.oninput=()=>{ st.name=nm.value.slice(0,24); }; }
      $$('#ob-goal button').forEach(b=>b.onclick=()=>{ st.goal=b.dataset.v; UI.sound('tap'); draw(); });
      $$('#ob-xp button').forEach(b=>b.onclick=()=>{ st.dailyXP=+b.dataset.v; UI.sound('tap'); draw(); });
      const sk=$('#ob-skip'); if(sk) sk.onclick=finish;
      $('#ob-next').onclick=()=>{ if(step<2){ step++; draw(); } else finish(); };
    }
    function finish(){ Object.entries(st).forEach(([k,v])=>Store.setSetting(k,v)); Store.setSetting('onboarded',true); ob.hidden=true; UI.renderXP(); if(window.App) App.route(); }
    ob.hidden=false; draw();
  }
  return {floater,lightning,onboard};
})();
