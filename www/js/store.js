/* Learner state: XP, levels, streaks, goals, quiz history, spaced repetition, badges, settings. */
window.Store = (function(){
  const KEY='civix-v1';
  const today = () => { const d=new Date(); return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10); };
  const defaults = () => ({
    xp:0, created:today(), lastActive:null, streak:0, bestStreak:0,
    activity:{}, done:{}, read:{},
    quiz:{attempts:[], perQ:{}, bestCombo:0, lightningBest:0},
    srs:{}, mains:{}, badges:{},
    settings:{name:'', goal:'prelims', dailyXP:50, sound:true, haptics:true, theme:'auto', onboarded:false},
    bookmarks:{}
  });
  let s;
  try{ const raw=JSON.parse(localStorage.getItem(KEY)||'{}'); s=Object.assign(defaults(),raw); s.settings=Object.assign(defaults().settings,raw.settings||{}); s.quiz=Object.assign(defaults().quiz,raw.quiz||{}); }catch(e){ s=defaults(); }
  const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} };

  const LEVELS=[[0,'Rookie','🌱'],[150,'Learner','📘'],[400,'Explorer','🧭'],[800,'Scholar','🎓'],[1400,'Analyst','🔎'],[2200,'Strategist','♟️'],[3200,'Expert','🏅'],[4500,'Ace','🚀'],[6000,'Elite','💎'],[8000,'Legend','👑']];
  function level(){ let i=0; for(let k=0;k<LEVELS.length;k++) if(s.xp>=LEVELS[k][0]) i=k; const cur=LEVELS[i], next=LEVELS[i+1]; return {i,n:i+1,name:cur[1],icon:cur[2],from:cur[0],to:next?next[0]:cur[0],next:next?next[1]:null,pct:next?Math.min(100,Math.round((s.xp-cur[0])/(next[0]-cur[0])*100)):100}; }

  function touch(){
    const t=today();
    if(s.lastActive!==t){
      const y=new Date(Date.now()-864e5); const ys=new Date(y.getTime()-y.getTimezoneOffset()*6e4).toISOString().slice(0,10);
      s.streak=(s.lastActive===ys)?s.streak+1:1; s.bestStreak=Math.max(s.bestStreak,s.streak); s.lastActive=t; save();
    }
  }
  const todayXP=()=>s.activity[today()]||0;
  function addXP(n, why, quiet){
    touch();
    const before=level().n, goalBefore=todayXP()>=s.settings.dailyXP;
    s.xp+=n; s.activity[today()]=(s.activity[today()]||0)+n; save();
    if(!quiet) UI.toast(`<b>+${n} XP</b> · ${why}`,'xp');
    const after=level();
    if(after.n>before){ UI.celebrate(`Level up! You're now ${after.icon} ${after.name}`); }
    else if(!goalBefore && todayXP()>=s.settings.dailyXP){ UI.celebrate('🎯 Daily goal complete!'); }
    checkBadges(); UI.renderXP();
  }
  function markDone(id){ if(s.done[id]) return false; s.done[id]=today(); save(); addXP(40,'Chapter completed'); return true; }
  function unmarkDone(id){ delete s.done[id]; save(); UI.renderXP(); }
  function markRead(id){ s.read[id]=today(); save(); }
  function recordQuiz(att){ s.quiz.attempts.push(att); if(s.quiz.attempts.length>200) s.quiz.attempts.shift(); save(); }
  function recordQ(id,right){ const q=s.quiz.perQ[id]||{seen:0,right:0}; q.seen++; if(right) q.right++; s.quiz.perQ[id]=q; save(); }
  function setCombo(c){ if(c>s.quiz.bestCombo){ s.quiz.bestCombo=c; save(); } }
  function setLightning(sc){ const isBest=sc>s.quiz.lightningBest; if(isBest){ s.quiz.lightningBest=sc; save(); } return isBest; }
  function setSetting(k,v){ s.settings[k]=v; save(); }

  function srsGet(id){ return s.srs[id]||{due:0,iv:0,ease:2.5,reps:0}; }
  function srsRate(id,grade){
    const c=Object.assign({},srsGet(id)); let iv=c.iv;
    if(grade===0){ iv=0; c.ease=Math.max(1.3,c.ease-0.2); c.reps=0; }
    else { c.reps++; if(c.reps===1) iv=1; else if(c.reps===2) iv=3; else iv=Math.round(iv*c.ease);
      if(grade===1){ iv=Math.max(1,Math.round(iv*0.6)); c.ease=Math.max(1.3,c.ease-0.15); }
      if(grade===3){ iv=Math.round(iv*1.3)+1; c.ease+=0.15; } }
    c.iv=iv; c.due=Date.now()+iv*864e5+(grade===0?60e3:0); s.srs[id]=c; save();
  }
  function srsDue(ids){ const now=Date.now(); return ids.filter(id=>srsGet(id).due<=now); }

  const seenQ=()=>Object.values(s.quiz.perQ).reduce((a,b)=>a+b.seen,0);
  const BADGES=[
    {id:'first-step',ic:'🚶',name:'First Step',desc:'Finish your first chapter',test:()=>Object.keys(s.done).length>=1},
    {id:'ten',ic:'🔟',name:'Ten Down',desc:'Complete 10 chapters',test:()=>Object.keys(s.done).length>=10},
    {id:'half',ic:'🌓',name:'Halfway There',desc:'Complete 44 chapters',test:()=>Object.keys(s.done).length>=44},
    {id:'all',ic:'🏆',name:'Full Syllabus',desc:'Complete every chapter',test:()=>window.CHAPTERS&&Object.keys(s.done).length>=CHAPTERS.length},
    {id:'streak3',ic:'🔥',name:'On Fire',desc:'3-day streak',test:()=>s.bestStreak>=3},
    {id:'streak7',ic:'⚡',name:'Week Warrior',desc:'7-day streak',test:()=>s.bestStreak>=7},
    {id:'streak30',ic:'🌟',name:'Unstoppable',desc:'30-day streak',test:()=>s.bestStreak>=30},
    {id:'combo5',ic:'🎯',name:'Combo x5',desc:'5 correct in a row',test:()=>s.quiz.bestCombo>=5},
    {id:'combo15',ic:'🧨',name:'Combo x15',desc:'15 correct in a row',test:()=>s.quiz.bestCombo>=15},
    {id:'perfect',ic:'💯',name:'Perfect Score',desc:'100% in a 10+ question quiz',test:()=>s.quiz.attempts.some(a=>a.n>=10&&a.correct===a.n)},
    {id:'q100',ic:'🧠',name:'Century',desc:'Answer 100 questions',test:()=>seenQ()>=100},
    {id:'q500',ic:'📚',name:'Question Machine',desc:'Answer 500 questions',test:()=>seenQ()>=500},
    {id:'lightning10',ic:'⚡',name:'Quick Thinker',desc:'Score 10 in a Lightning Round',test:()=>s.quiz.lightningBest>=10},
    {id:'cards50',ic:'🃏',name:'Card Shark',desc:'Review 50 flashcards',test:()=>Object.values(s.srs).reduce((a,b)=>a+b.reps,0)>=50},
    {id:'mains1',ic:'✍️',name:'Answer Writer',desc:'Write your first Mains answer',test:()=>Object.keys(s.mains).length>=1},
    {id:'mains10',ic:'🖋️',name:'Essayist',desc:'Write 10 Mains answers',test:()=>Object.keys(s.mains).length>=10},
    {id:'xp1000',ic:'💎',name:'1K Club',desc:'Earn 1,000 XP',test:()=>s.xp>=1000},
    {id:'night',ic:'🦉',name:'Night Owl',desc:'Study after midnight',test:()=>new Date().getHours()<4},
  ];
  function checkBadges(){ BADGES.forEach(b=>{ if(!s.badges[b.id]&&b.test()){ s.badges[b.id]=today(); save(); UI.celebrate(`🏅 Badge unlocked: ${b.name}`); } }); }
  function reset(){ s=defaults(); save(); location.hash='#/'; location.reload(); }
  function exportJSON(){ return JSON.stringify(s); }
  function importJSON(t){ try{ const o=JSON.parse(t); if(typeof o.xp!=='number') return false; s=Object.assign(defaults(),o); s.settings=Object.assign(defaults().settings,o.settings||{}); save(); return true; }catch(e){ return false; } }
  return { get s(){return s;}, save, today, todayXP, LEVELS, level, touch, addXP, markDone, unmarkDone, markRead, recordQuiz, recordQ, setCombo, setLightning, setSetting, srsGet, srsRate, srsDue, BADGES, checkBadges, reset, exportJSON, importJSON };
})();
