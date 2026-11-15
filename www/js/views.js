/* All page views. Each returns an HTML string and optionally registers an `after` hook via V.after. */
window.V = (function(){
  const {$,$$,h,shuffle,pick,pct,fmtDate,weightDots} = UI;
  let afterHook=null; const after=fn=>{afterHook=fn;}; const runAfter=()=>{const f=afterHook;afterHook=null;f&&f();};
  const chById = id => CHAPTERS.find(c=>c.id===id);
  const unitOf = c => UNITS.find(u=>u.id===c.unit);
  const pyqFor = id => PYQ_PRELIMS.filter(q=>q.ch===id);
  const mainsFor = id => PYQ_MAINS.filter(q=>(q.ch||[]).includes(id));
  const doneCount = () => Object.keys(Store.s.done).filter(id=>chById(id)).length;
  const topicName = id => (chById(id)||{}).title || id;
  const greeting = () => { const hr=new Date().getHours(); return hr<5?'Burning the midnight oil':hr<12?'Good morning':hr<17?'Good afternoon':'Good evening'; };
  const artLink = n => `<a class="mini-link" href="#/articles?q=${n}">Art. ${n}</a>`;

  /* ───────────── HOME ───────────── */
  function home(){
    const s=Store.s, L=Store.level(), done=doneCount(), total=CHAPTERS.length;
    const name=(s.settings.name||'').trim();
    const tx=Store.todayXP(), goal=s.settings.dailyXP;
    const dueCards=Store.srsDue(allCardIds()).length;
    const last=Object.entries(s.read).sort((a,b)=>b[1].localeCompare(a[1]))[0];
    const cont=last?chById(last[0]):CHAPTERS[0];
    const next=CHAPTERS.find(c=>!s.done[c.id])||CHAPTERS[0];
    const day=Math.floor(Date.now()/864e5);
    const aod=ARTICLES.list[day%ARTICLES.list.length];
    const fact=REVISION.facts[day%REVISION.facts.length];
    const qToday=s.quiz.attempts.filter(a=>a.date===Store.today()).reduce((a,b)=>a+b.n,0);
    const lightToday=s.quiz.attempts.some(a=>a.date===Store.today()&&a.topic==='lightning');
    const quests=[
      {ic:'📖',t:`Read: ${next.title}`,d:`${next.mins} min · ${unitOf(next).short}`,href:`#/chapter/${next.id}`,done:!!s.done[next.id],xp:40},
      {ic:'🎯',t:'Daily 10 challenge',d:qToday>=10?`${qToday} answered today`:'Same 10 for everyone today',href:'#/quiz?mode=daily',done:qToday>=10,xp:'2×'},
      {ic:'⚡',t:'Lightning Round',d:s.quiz.lightningBest?`Your best: ${s.quiz.lightningBest}`:'60 seconds. How many can you get?',href:'#/lightning',done:lightToday,xp:'+'},
      {ic:'🃏',t:dueCards?`Review ${dueCards} cards`:'Cards all caught up',d:dueCards?'Spaced repetition':'Read a chapter to add more',href:'#/flashcards',done:dueCards===0&&Object.keys(s.srs).length>0,xp:5},
    ];
    const qd=quests.filter(q=>q.done).length;
    const recent=UPDATES.slice(0,4);
    return h`<div class="fade-in">
      <section class="home-hero">
        <div class="card hero-card greet" style="padding:24px;display:flex;flex-direction:column;gap:16px;justify-content:space-between">
          <div>
            <div class="eyebrow" style="color:rgba(255,255,255,.75)">${greeting()}${name?', '+MD.esc(name):''} 👋</div>
            <h1>Let's own Polity today.</h1>
            <p class="muted" style="margin:0;max-width:52ch">${total} chapters · ${PYQ_PRELIMS.length} Prelims PYQs · ${PYQ_MAINS.length} Mains PYQs · updated ${SITE_META.updated}</p>
          </div>
          <div class="row">
            <a class="btn white" href="#/chapter/${cont.id}">▶ Continue · ${cont.title}</a>
            <a class="btn glass" href="#/lightning">⚡ Lightning</a>
          </div>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:14px">
          <div class="goal-wrap">
            <div style="position:relative">${UI.ring(Math.round(tx/goal*100),96,10,'var(--accent)')}<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center"><div><b class="tnum" style="font-family:var(--font-display);font-size:1.25rem">${tx}</b><div class="small muted" style="line-height:1">/${goal} XP</div></div></div></div>
            <div class="stack" style="gap:6px;flex:1;min-width:0">
              <div class="eyebrow">Today's goal</div>
              <b style="font-size:1.05rem">${tx>=goal?'Goal smashed 🎉':`${goal-tx} XP to go`}</b>
              <div class="row" style="gap:6px"><span class="chip saffron">🔥 ${s.streak} day streak</span><span class="chip blue">${L.icon} ${L.name}</span></div>
            </div>
          </div>
          <div class="divider" style="margin:0"></div>
          <div class="grid tri" style="gap:8px">
            <div class="stat"><b>${done}<span class="muted" style="font-size:.9rem">/${total}</span></b><span>chapters</span></div>
            <div class="stat"><b>${Object.values(s.quiz.perQ).reduce((a,b)=>a+b.seen,0)}</b><span>questions</span></div>
            <div class="stat"><b>${s.quiz.bestCombo}</b><span>best combo</span></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Daily quests</h2><span class="chip ${qd===quests.length?'green':''}">${qd}/${quests.length} done</span></div>
        <div class="grid c2">${quests.map(t=>h`<a class="task ${t.done?'done':''}" href="${t.href}"><span class="ic">${t.done?'✅':t.ic}</span><div style="min-width:0"><b>${t.t}</b><small>${t.d}</small></div><span class="xpb">${t.xp==='+'?'XP':t.xp==='2×'?'2× XP':'+'+t.xp}</span></a>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Jump in</h2></div>
        <div class="quick">
          ${[['#/learn','📚','Chapters',total+' to master','#3657F0'],['#/quiz','🎯','Practice','Quizzes & simulator','#E5483B'],['#/pyq','📝','PYQs',PYQ_PRELIMS.length+PYQ_MAINS.length+' questions','#7356F0'],['#/mains','✍️','Answer Studio','Write & self-grade','#12A365'],['#/flashcards','🃏','Cards','Spaced repetition','#D98A04'],['#/updates','🆕',"What's New",'2019 → 2026','#C13F9A'],['#/articles','📜','Articles','Every Article','#2E8BD8'],['#/revision','⚡','Quick Revise','Numbers, cases, firsts','#0B9A94']].map(([href,ic,t,d,c])=>h`<a href="${href}" style="--u:${c}"><span class="qi">${ic}</span><b>${t}</b><small>${d}</small></a>`).join('')}
        </div>
      </section>

      <section class="section grid c2">
        <div class="card saffron">
          <div class="eyebrow" style="color:rgba(43,22,0,.7)">Article of the day</div>
          <h2 style="margin:.3em 0 .15em">Article ${aod.n}</h2>
          <p style="font-weight:800;margin-bottom:4px">${aod.t}</p>
          <p class="muted" style="margin:0">${MD.inline(aod.d)}</p>
          <div style="margin-top:12px"><a class="btn small" style="background:#2b1600;color:#fff" href="#/articles?q=${aod.n}">Open Part ${aod.part}</a></div>
        </div>
        <div class="card">
          <div class="eyebrow">Fact of the day</div>
          <p style="font-size:1.05rem;font-weight:650;margin:.6em 0">${MD.inline(fact)}</p>
          <a class="mini-link" href="#/revision">More quick facts →</a>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Units</h2><a class="mini-link" href="#/learn">All chapters</a></div>
        <div class="unit-strip">${UNITS.map(u=>{const chs=CHAPTERS.filter(c=>c.unit===u.id),d=chs.filter(c=>s.done[c.id]).length;return h`<a class="unit-tile" style="--u:${u.color}" href="#/learn#unit-${u.n}"><span class="unit-ico">${u.emoji}</span><b class="small">${u.short}</b><div class="progress" style="height:6px"><i style="width:${pct(d,chs.length)}%;background:${u.color}"></i></div><small class="muted">${d}/${chs.length}</small></a>`;}).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><h2>What's new since 2019</h2><a class="mini-link" href="#/updates">All ${UPDATES.length}</a></div>
        <div class="grid c2">${recent.map(u=>h`<a class="card pad-sm" href="#/updates"><div class="row between"><span class="chip ${u.color||'saffron'}">${u.tag}</span><small class="muted mono">${u.date}</small></div><b style="display:block;margin-top:8px">${u.title}</b><p class="small muted" style="margin:4px 0 0">${u.summary}</p></a>`).join('')}</div>
      </section>
      <p class="footer-note">Civix covers UPSC CSE Prelims and Mains GS-II. Content current to ${SITE_META.updated}. Recheck figures that change, like office-holders and pending Bills.</p>
    </div>`;
  }

  /* ───────────── SYLLABUS ───────────── */
  function syllabus(){
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Syllabus mapper</div><h1>Prelims + Mains, mapped to chapters</h1><p>Every line of the official UPSC syllabus for Polity and Governance, with the chapters that cover it and how heavily UPSC has tested it (share of polity questions, 2013–2026).</p></div>
      <div class="grid c2" style="margin-bottom:22px">
        <div class="card pad-sm"><div class="eyebrow">Prelims GS-I</div><b>Indian Polity and Governance</b><p class="small muted" style="margin:4px 0 0">"Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc." · typically 12–18 of 100 questions</p></div>
        <div class="card pad-sm"><div class="eyebrow">Mains GS-II</div><b>Governance, Constitution, Polity, Social Justice & IR</b><p class="small muted" style="margin:4px 0 0">250 marks · ~8–12 polity questions each year (10 & 15 markers)</p></div>
      </div>
      <h2>Prelims syllabus → chapters</h2>
      ${SYLLABUS.prelims.map(t=>h`<div class="syll-item"><div class="pct" title="Share of polity PYQs">${t.share}%</div><div style="flex:1"><b>${t.topic}</b><div class="chips">${t.chapters.map(id=>chById(id)?h`<a class="mini-link" href="#/chapter/${id}">${chById(id).title}</a>`:'').join('')}</div></div></div>`).join('')}
      <h2 style="margin-top:30px">Mains GS-II syllabus → chapters</h2>
      ${SYLLABUS.mains.map(t=>h`<div class="syll-item"><div class="pct">${t.code}</div><div style="flex:1"><b>${t.topic}</b><div class="chips">${t.chapters.map(id=>chById(id)?h`<a class="mini-link" href="#/chapter/${id}">${chById(id).title}</a>`:'').join('')}</div></div></div>`).join('')}
      <div class="callout tip" style="margin-top:24px"><b class="title">How to use this</b>Study unit-wise, but revise topic-wise. The high-share prelims topics (Parliament, Judiciary, FRs, Executive, Amendments) deserve two full passes plus all PYQs before the exam.</div>
    </div>`;
  }

  /* ───────────── LEARN (unit list) ───────────── */
  function learn(){
    const s=Store.s, done=doneCount();
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Chapters</div><h1>${CHAPTERS.length} chapters in ${UNITS.length} units</h1><p>Standard Laxmikanth order, plus a Governance unit for GS-II. Each chapter has notes, key facts, what's new, Mains angles, PYQs, cards and a quiz.</p>
      <div class="row" style="margin-top:12px"><div class="progress saffron" style="flex:1;max-width:360px"><i style="width:${pct(done,CHAPTERS.length)}%"></i></div><span class="small muted tnum">${done}/${CHAPTERS.length} done</span></div></div>
      ${UNITS.map(u=>{ const chs=CHAPTERS.filter(c=>c.unit===u.id); const d=chs.filter(c=>s.done[c.id]).length; return h`
        <div class="unit-head" id="unit-${u.n}" style="--u:${u.color}"><span class="unit-ico">${u.emoji}</span><div style="min-width:0"><div class="eyebrow">Unit ${u.n}</div><h2>${u.title}</h2></div><span class="chip ${d===chs.length?'green':''}" style="margin-left:auto">${d}/${chs.length}</span></div>
        <div class="grid auto">${chs.map(c=>h`<a class="ch-card ${s.done[c.id]?'done':''}" style="--u:${u.color}" href="#/chapter/${c.id}"><span class="emoji">${c.emoji}</span><div style="flex:1;min-width:0"><div class="num">CH ${String(c.n).padStart(2,'0')}</div><h3>${c.title}</h3><div class="meta"><span>⏱ ${c.mins}m</span>${weightDots(c.weight)}<span>${pyqFor(c.id).length} PYQs</span></div></div>${s.done[c.id]?'<span class="tick">✓</span>':''}</a>`).join('')}</div>`;}).join('')}
    </div>`;
  }

  /* ───────────── CHAPTER ───────────── */
  function chapter(id, tab){
    const c=chById(id); if(!c) return `<div class="empty">Chapter not found. <a href="#/learn">Back to Learn</a></div>`;
    Store.markRead(id); Store.touch();
    const s=Store.s, u=unitOf(c), idx=CHAPTERS.indexOf(c), prev=CHAPTERS[idx-1], next=CHAPTERS[idx+1];
    const pyqs=pyqFor(id), mq=mainsFor(id);
    tab=tab||'notes';
    const tabs=[['notes','📖 Notes'],['facts','⚡ Facts',(c.facts||[]).length],['updates','🆕 What\'s new',(c.updates||[]).length],['mains','✍️ Mains'],['pyq','📝 PYQs',pyqs.length+mq.length],['cards','🃏 Cards',(c.cards||[]).length],['quiz','🎯 Quiz']];
    let body='';
    if(tab==='notes'){
      const html=MD.render(c.notes);
      const heads=[...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map(m=>[m[1],m[2].replace(/<[^>]+>/g,'')]);
      body=h`<div class="layout-2"><article class="prose" id="notes">${html}
        <div class="divider"></div>
        <div class="row between"><button class="btn ${s.done[id]?'soft':'primary'}" id="mark-done">${s.done[id]?'✅ Completed · tap to undo':'Mark as complete · +40 XP'}</button><a class="btn ghost" href="#/chapter/${id}/quiz">Take the quiz →</a></div>
      </article><aside><nav class="toc"><div class="eyebrow" style="padding:0 10px 6px">On this page</div>${heads.map(([i,t])=>h`<a href="#/chapter/${id}#${i}" data-toc="${i}">${t}</a>`).join('')}</nav></aside></div>`;
    } else if(tab==='facts'){
      body=h`<div class="facts">${(c.facts||[]).map(([k,v])=>h`<div class="fact"><small>${k}</small><b>${MD.inline(v)}</b></div>`).join('')}</div>
      ${c.articles&&c.articles.length?h`<h3 style="margin-top:24px">Articles in this chapter</h3><div class="row">${c.articles.map(a=>artLink(a)).join('')}</div>`:''}`;
    } else if(tab==='updates'){
      body=(c.updates&&c.updates.length)?h`<div class="timeline">${c.updates.map(u=>h`<div class="tl-item ${u.major?'major':''}"><div class="yr">${u.d}</div><h4>${u.t}</h4><div class="small">${MD.render(u.b)}</div></div>`).join('')}</div>`:`<div class="empty">Nothing major has changed in this chapter since 2019. The facts are stable, so focus on PYQs.</div>`;
    } else if(tab==='mains'){
      const m=c.mains||{};
      body=h`<div class="grid c2">
        <div class="card"><div class="eyebrow">Angles UPSC loves</div><ul style="padding-left:1.2em;margin:.6em 0">${(m.angles||[]).map(a=>`<li>${MD.inline(a)}</li>`).join('')}</ul></div>
        <div class="card"><div class="eyebrow">Judgments to cite</div><ul style="padding-left:1.2em;margin:.6em 0">${(m.judgments||[]).map(a=>`<li>${MD.inline(a)}</li>`).join('')}</ul></div>
        <div class="card"><div class="eyebrow">Committees & reports</div><ul style="padding-left:1.2em;margin:.6em 0">${(m.committees||[]).map(a=>`<li>${MD.inline(a)}</li>`).join('')}</ul></div>
        <div class="card"><div class="eyebrow">Quotable lines</div><ul style="padding-left:1.2em;margin:.6em 0">${(m.quotes||[]).map(a=>`<li><em>${MD.inline(a)}</em></li>`).join('')}</ul></div>
      </div>
      ${mq.length?h`<h3 style="margin-top:24px">Mains PYQs on this chapter</h3>${mq.map(q=>h`<a class="task" href="#/mains/${q.id}" style="margin-bottom:8px"><span class="ic">✍️</span><div><b>${q.q}</b><small>UPSC ${q.year} · ${q.marks} marks</small></div></a>`).join('')}`:''}`;
    } else if(tab==='pyq'){
      body=pyqs.length?pyqs.sort((a,b)=>b.year-a.year).map(q=>pyqItem(q)).join(''):'<div class="empty">No prelims PYQ tagged to this chapter yet. Try the chapter quiz instead.</div>';
      if(mq.length) body+=h`<h3 style="margin-top:24px">Mains questions</h3>${mq.map(q=>h`<a class="task" href="#/mains/${q.id}" style="margin-bottom:8px"><span class="ic">✍️</span><div><b>${q.q}</b><small>UPSC ${q.year} · ${q.marks} marks</small></div></a>`).join('')}`;
    } else if(tab==='cards'){
      body=flashDeck((c.cards||[]).map((cd,i)=>({id:`${id}-${i}`,q:cd[0],a:cd[1],ch:c.title})),`Flashcards · ${c.title}`);
    } else if(tab==='quiz'){
      const pool=[...pyqs.map(q=>({...q,src:'PYQ '+q.year})),...(c.mcqs||[]).map((m,i)=>({id:`${id}-m${i}`,...m,src:'Practice'}))];
      body=quizPlayer(pool.length?shuffle(pool).slice(0,12):[], {title:`Chapter quiz · ${c.title}`, topic:id});
    }
    return h`<div class="fade-in" style="--u:${u.color}">
      <div class="ch-hero" data-emoji="${c.emoji}">
        <div class="row between"><div class="eyebrow">Unit ${u.n} · ${u.title} · Chapter ${c.n}</div><div class="row" style="gap:8px">${weightDots(c.weight)}<span class="chip">⏱ ${c.mins} min</span></div></div>
        <h1>${c.title}</h1>
        <p>${c.tagline}</p>
        <div class="row" style="gap:8px">${(c.articles||[]).slice(0,8).map(a=>`<span class="chip">Art. ${a}</span>`).join('')}${c.articles&&c.articles.length>8?`<span class="chip">+${c.articles.length-8} more</span>`:''}</div>
      </div>
      <div class="tabs">${tabs.map(([k,l,n])=>h`<button class="${tab===k?'active':''}" data-tab="${k}">${l}${n!==undefined?`<span class="n">${n}</span>`:''}</button>`).join('')}</div>
      <div id="tab-body">${body}</div>
      <div class="ch-nav">${prev?h`<a href="#/chapter/${prev.id}"><small>← Previous</small><b>${prev.title}</b></a>`:'<span style="flex:1"></span>'}${next?h`<a class="next" href="#/chapter/${next.id}"><small>Next →</small><b>${next.title}</b></a>`:'<span style="flex:1"></span>'}</div>
    </div>`;
  }

  function pyqItem(q){
    const perf=Store.s.quiz.perQ[q.id];
    return h`<details class="pyq-item"><summary><span class="yr">UPSC ${q.year}</span><span style="flex:1">${MD.esc(q.q).slice(0,140)}${q.q.length>140?'…':''}</span>${perf?`<span class="chip ${perf.right?'green':'red'}">${perf.right}/${perf.seen}</span>`:''}</summary>
      <div class="q-stem" style="font-weight:500">${MD.esc(q.q)}</div>
      <div class="opts">${q.opts.map((o,i)=>h`<div class="opt ${i===q.ans?'correct':''}" style="cursor:default"><span class="k">${'ABCD'[i]}</span><span>${MD.esc(o)}</span></div>`).join('')}</div>
      <div class="explain"><b class="res" style="color:var(--green)">Answer: ${'ABCD'[q.ans]}</b>${MD.render(q.exp)}${q.ch&&chById(q.ch)?h`<div style="margin-top:8px"><a class="mini-link" href="#/chapter/${q.ch}">📖 ${chById(q.ch).title}</a></div>`:''}</div></details>`;
  }

  /* ───────────── PYQ BANK ───────────── */
  function pyq(params){
    const year=params.get('year')||'all', topic=params.get('topic')||'all', type=params.get('type')||'prelims', q=(params.get('q')||'').toLowerCase();
    const years=[...new Set(PYQ_PRELIMS.map(x=>x.year))].sort((a,b)=>b-a);
    const myears=[...new Set(PYQ_MAINS.map(x=>x.year))].sort((a,b)=>b-a);
    let list = type==='prelims'? PYQ_PRELIMS : PYQ_MAINS;
    if(year!=='all') list=list.filter(x=>String(x.year)===year);
    if(topic!=='all') list=list.filter(x=> type==='prelims'? x.ch===topic : (x.ch||[]).includes(topic));
    if(q) list=list.filter(x=>(x.q+' '+(x.exp||'')).toLowerCase().includes(q));
    list=[...list].sort((a,b)=>b.year-a.year);
    const topics=[...new Set((type==='prelims'?PYQ_PRELIMS.map(x=>x.ch):PYQ_MAINS.flatMap(x=>x.ch||[])))].filter(Boolean).map(id=>[id,topicName(id)]).sort((a,b)=>a[1].localeCompare(b[1]));
    const sel=(name,opts,cur)=>h`<select data-f="${name}">${opts.map(([v,l])=>`<option value="${v}" ${String(v)===String(cur)?'selected':''}>${l}</option>`).join('')}</select>`;
    const byYear = years.map(y=>[y,PYQ_PRELIMS.filter(x=>x.year===y).length]);
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Previous Year Questions</div><h1>PYQ Bank</h1><p>${PYQ_PRELIMS.length} prelims polity questions (${years[years.length-1]}–${years[0]}) with explanations, and ${PYQ_MAINS.length} mains GS-II questions with answer frameworks. Filter, read, or turn any filter into a timed test.</p><p class="small muted" style="margin-top:6px">ℹ️ ${type==='prelims'?PYQ_NOTE:PYQ_MAINS_NOTE}</p></div>
      <div class="toolbar">
        <div class="tabs" style="margin:0;border:0"><button class="${type==='prelims'?'active':''}" data-f="type" data-v="prelims">Prelims</button><button class="${type==='mains'?'active':''}" data-f="type" data-v="mains">Mains</button></div>
        ${sel('year',[['all','All years'],...(type==='prelims'?years:myears).map(y=>[y,y])],year)}
        ${sel('topic',[['all','All chapters'],...topics],topic)}
        <input type="search" data-f="q" value="${MD.esc(q)}" placeholder="Search in questions…" style="flex:1;min-width:160px">
        ${type==='prelims'&&list.length?h`<a class="btn primary small" href="#/quiz?src=pyq&year=${year}&topic=${topic}&n=${Math.min(list.length,25)}">⏱ Test on these ${Math.min(list.length,25)}</a>`:''}
      </div>
      ${type==='prelims'&&year==='all'&&topic==='all'&&!q?h`<div class="card pad-sm" style="margin-bottom:16px"><div class="eyebrow" style="margin-bottom:8px">Polity questions per year (in this bank)</div><div class="row" style="gap:6px">${byYear.map(([y,n])=>h`<a class="chip btn-chip" href="#/pyq?year=${y}">${y} <b>${n}</b></a>`).join('')}</div></div>`:''}
      <div class="muted small" style="margin-bottom:10px">${list.length} question${list.length===1?'':'s'}</div>
      ${list.length? (type==='prelims'? list.map(pyqItem).join('') : list.map(mq=>h`<a class="task" href="#/mains/${mq.id}" style="margin-bottom:8px"><span class="ic">✍️</span><div style="flex:1"><b>${mq.q}</b><small>UPSC ${mq.year} · ${mq.marks} marks · ${(mq.ch||[]).map(topicName).join(', ')}</small></div>${Store.s.mains[mq.id]?'<span class="chip green">written</span>':''}</a>`).join('')) : '<div class="empty">No questions match. Loosen the filters.</div>'}
    </div>`;
  }

  /* ───────────── QUIZ ───────────── */
  function quizSetup(params){
    const mode=params.get('mode'), src=params.get('src');
    if(mode==='daily'){
      const seed=Math.floor(Date.now()/864e5); const pool=[...PYQ_PRELIMS, ...CHAPTERS.flatMap(c=>(c.mcqs||[]).map((m,i)=>({id:`${c.id}-m${i}`,ch:c.id,...m})))];
      const r=pool.map((q,i)=>[UI.seeded(seed+':'+q.id),q]).sort((a,b)=>a[0]-b[0]).slice(0,10).map(x=>x[1]);
      return h`<div class="fade-in"><div class="page-head"><div class="eyebrow">Daily challenge</div><h1>Today's 10</h1><p>Same 10 questions for everyone today. 90 seconds each. Earn double XP.</p></div>${quizPlayer(r,{title:'Daily 10',topic:'daily',timer:90,bonus:2})}</div>`;
    }
    if(src==='pyq'||params.get('topic')||params.get('go')){
      const year=params.get('year')||'all', topic=params.get('topic')||'all', n=+(params.get('n')||15), kind=params.get('kind')||'all', timer=+(params.get('timer')||0);
      let pool=[];
      if(kind!=='practice') pool.push(...PYQ_PRELIMS.map(q=>({...q,src:'PYQ '+q.year})));
      if(kind!=='pyq') pool.push(...CHAPTERS.flatMap(c=>(c.mcqs||[]).map((m,i)=>({id:`${c.id}-m${i}`,ch:c.id,...m,src:'Practice'}))));
      if(year!=='all') pool=pool.filter(q=>String(q.year)===year);
      if(topic!=='all'){ const ids=topic.startsWith('unit:')? CHAPTERS.filter(c=>c.unit===topic.slice(5)).map(c=>c.id) : [topic]; pool=pool.filter(q=>ids.includes(q.ch)); }
      if(params.get('weak')==='1'){ const w=Store.s.quiz.perQ; pool=pool.filter(q=>w[q.id]&&w[q.id].right<w[q.id].seen).concat(pool.filter(q=>!w[q.id])); }
      return h`<div class="fade-in"><div class="page-head"><div class="eyebrow">Quiz</div><h1>${topic==='all'?'Mixed polity':topic.startsWith('unit:')?UNITS.find(u=>u.id===topic.slice(5)).title:topicName(topic)}${year!=='all'?' · '+year:''}</h1></div>${quizPlayer(shuffle(pool).slice(0,n),{title:'Quiz',topic,timer:timer||undefined})}</div>`;
    }
    const s=Store.s; const att=[...s.quiz.attempts].reverse().slice(0,6);
    const weak=Object.entries(s.quiz.perQ).filter(([id,v])=>v.right<v.seen).length;
    const label=a=>a.topic==='all'?'Mixed':a.topic==='daily'?'Daily 10':a.topic==='lightning'?'Lightning':a.topic.startsWith('unit:')?(UNITS.find(u=>u.id===a.topic.slice(5))||{}).title:topicName(a.topic);
    const modes=[['#/quiz?mode=daily','📅','Daily 10','Same 10 for everyone · 90 s each · 2× XP','#3657F0'],['#/lightning','⚡','Lightning Round','60 seconds · auto-advance · beat your best'+(s.quiz.lightningBest?` (${s.quiz.lightningBest})`:''),'#FF8A00'],['#/quiz?go=1&n=25&kind=pyq&timer=72','🏁','Prelims Simulator','25 PYQs · 72 s each · negative marking','#E5483B'],['#/quiz?go=1&n=15&weak=1','🩹','Fix Weak Spots',weak?weak+' questions you missed before':'Unseen questions first','#12A365']];
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Practice</div><h1>Pick your mode</h1><p>PYQs and practice questions in UPSC's statement style. Chain correct answers for combo bonuses.</p></div>
      <div class="grid c2" style="margin-bottom:18px">${modes.map(([href,ic,t,d,c])=>h`<a class="card mode-card" href="${href}" style="--u:${c}"><span class="mode-ic">${ic}</span><h3 style="margin:0">${t}</h3><p class="small muted" style="margin:0">${d}</p></a>`).join('')}</div>
      <div class="card">
        <h3>Build your own quiz</h3>
        <form id="quiz-form" class="grid c4" style="gap:10px;align-items:end">
          <label class="stack" style="gap:4px"><span class="small muted">Scope</span><select name="topic" id="qf-topic"><option value="all">All polity</option>${UNITS.map(u=>`<optgroup label="Unit ${u.n} · ${u.title}"><option value="unit:${u.id}">Whole unit</option>${CHAPTERS.filter(c=>c.unit===u.id).map(c=>`<option value="${c.id}">${c.title}</option>`).join('')}</optgroup>`).join('')}</select></label>
          <label class="stack" style="gap:4px"><span class="small muted">Source</span><select name="kind" id="qf-kind"><option value="all">PYQ + practice</option><option value="pyq">PYQ only</option><option value="practice">Practice only</option></select></label>
          <label class="stack" style="gap:4px"><span class="small muted">Questions</span><select name="n" id="qf-n"><option>10</option><option selected>15</option><option>25</option><option>50</option><option>100</option></select></label>
          <label class="stack" style="gap:4px"><span class="small muted">Timer</span><select name="timer" id="qf-timer"><option value="0">None</option><option value="60">60 s</option><option value="72">72 s (UPSC)</option><option value="90">90 s</option></select></label>
          <button class="btn primary" type="submit" style="grid-column:1/-1">Start quiz →</button>
        </form>
      </div>
      ${att.length?h`<div class="section"><h3>Recent attempts</h3><div class="table-wrap"><table><thead><tr><th>Date</th><th>Mode</th><th>Score</th><th>Accuracy</th><th>XP</th></tr></thead><tbody>${att.map(a=>h`<tr><td>${fmtDate(a.date)}</td><td>${label(a)}</td><td class="tnum">${a.correct}/${a.n}</td><td><span class="chip ${pct(a.correct,a.n)>=70?'green':pct(a.correct,a.n)>=50?'saffron':'red'}">${pct(a.correct,a.n)}%</span></td><td class="tnum">+${a.xp}</td></tr>`).join('')}</tbody></table></div></div>`:''}
    </div>`;
  }

  function quizPlayer(qs, opts={}){
    if(!qs.length) return '<div class="empty">No questions available for this selection yet.</div>';
    const uid='qz'+Math.random().toString(36).slice(2,7);
    window.__quiz={qs,opts,i:0,correct:0,answers:[],uid,start:Date.now(),combo:0,best:0,bonusXP:0};
    after(()=>renderQ());
    return `<div id="${uid}"></div>`;
  }
  function renderQ(){
    const Q=window.__quiz; if(!Q) return; const el=document.getElementById(Q.uid); if(!el) return;
    if(Q.i>=Q.qs.length) return renderResult();
    const q=Q.qs[Q.i];
    el.innerHTML=h`<div class="q-card fade-in">
      <div class="q-top"><div class="q-meta"><span class="chip tnum">${Q.i+1} / ${Q.qs.length}</span>${q.src||q.year?`<span class="chip blue">${q.src||('PYQ '+q.year)}</span>`:''}${q.ch&&chById(q.ch)?`<span class="chip">${chById(q.ch).title}</span>`:''}</div><div class="row" style="gap:6px">${Q.combo>=2?`<span class="combo ${Q.combo>=5?'hot':''}">🔥 ${Q.combo}× combo</span>`:''}${Q.opts.timer?`<span class="timer" id="qt">${Q.opts.timer}</span>`:''}</div></div>
      <div class="q-progress"><i style="width:${Math.round(Q.i/Q.qs.length*100)}%"></i></div>
      <div class="q-stem">${MD.esc(q.q)}</div>
      <div class="opts">${q.opts.map((o,i)=>h`<button class="opt" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span>${MD.esc(o)}</span></button>`).join('')}</div>
      <div id="qx"></div>
    </div>`;
    let left=Q.opts.timer, tm=null;
    if(left){ tm=setInterval(()=>{ left--; const t=document.getElementById('qt'); if(!t){clearInterval(tm);return;} t.textContent=left; if(left<=10) t.classList.add('low'); if(left<=0){ clearInterval(tm); answer(-1); } },1000); }
    function answer(i){
      if(tm) clearInterval(tm);
      const right = i===q.ans;
      Q.answers.push({id:q.id,i,right}); if(right) Q.correct++;
      Store.recordQ(q.id,right);
      if(right){ Q.combo++; Q.best=Math.max(Q.best,Q.combo); Store.setCombo(Q.combo); const bonus=Q.combo>=3?Math.min(10,Q.combo):0; Q.bonusXP+=bonus; UI.sound('good'); UI.haptic('success'); const btn=el.querySelector(`.opt[data-i="${i}"]`); if(btn&&window.Fun) Fun.floater(btn,`+${8+bonus}`); }
      else { Q.combo=0; UI.sound('bad'); UI.haptic('error'); }
      $$('.opt',el).forEach(b=>{ b.disabled=true; const k=+b.dataset.i; if(k===q.ans) b.classList.add('correct'); else if(k===i) b.classList.add('wrong'); else b.classList.add('dim'); });
      $('#qx',el).innerHTML=h`<div class="explain"><b class="res" style="color:${right?'var(--green)':'var(--red)'}">${right?'✅ Correct':i===-1?'⏰ Time up':'❌ Not quite'} · Answer ${'ABCD'[q.ans]}</b>${MD.render(q.exp||'')}<div class="row between" style="margin-top:12px">${q.ch&&chById(q.ch)?h`<a class="mini-link" href="#/chapter/${q.ch}">📖 Revise: ${chById(q.ch).title}</a>`:'<span></span>'}<button class="btn primary small" id="nextq">${Q.i+1<Q.qs.length?'Next →':'See result'}</button></div></div>`;
      $('#nextq',el).onclick=()=>{Q.i++;renderQ();};
      $('#nextq',el).focus();
    }
    $$('.opt',el).forEach(b=>b.onclick=()=>answer(+b.dataset.i));
  }
  function renderResult(){
    const Q=window.__quiz; const el=document.getElementById(Q.uid); const n=Q.qs.length, c=Q.correct, wrong=Q.answers.filter(a=>!a.right&&a.i!==-1).length;
    const upsc=(c*2 - wrong*0.66).toFixed(2);
    const xp=Math.max(5,Math.round((c*8 + (c===n?30:0) + (Q.bonusXP||0)) * (Q.opts.bonus||1)));
    Store.recordQuiz({date:Store.today(),topic:Q.opts.topic||'all',n,correct:c,xp});
    Store.addXP(xp,'Quiz finished');
    if(pct(c,n)>=80) UI.confetti();
    const msg=pct(c,n)===100?'Flawless. Topper energy. 👑':pct(c,n)>=80?'Excellent. That beats the cut-off.':pct(c,n)>=60?'Solid. Read the explanations and go again.':'Every miss here is a mark saved in the real exam.';
    el.innerHTML=h`<div class="q-card fade-in"><div class="result-hero"><div class="eyebrow">Result</div><div class="big">${c}<span class="muted" style="font-size:2rem">/${n}</span></div><p style="font-weight:700;font-size:1.1rem;margin:.4em 0">${msg}</p>
      <div class="row" style="justify-content:center;gap:10px"><span class="chip ${pct(c,n)>=70?'green':'saffron'}">${pct(c,n)}% accuracy</span><span class="chip blue">UPSC-style score: ${upsc} (2 / −0.66)</span><span class="chip saffron">+${xp} XP</span><span class="chip">🔥 best combo ${Q.best||0}</span><span class="chip">${Math.round((Date.now()-Q.start)/1000)} s</span></div>
      <div class="row" style="justify-content:center;margin-top:16px;gap:10px"><button class="btn primary" id="retry">Retry wrong ones</button><a class="btn ghost" href="#/quiz">New quiz</a></div></div>
      <h3>Review</h3>${Q.qs.map((q,i)=>{const a=Q.answers[i]; return h`<details class="pyq-item ${a.right?'':'wrong'}"><summary><span class="chip ${a.right?'green':'red'}">${a.right?'✓':'✗'}</span><span style="flex:1">${MD.esc(q.q).slice(0,120)}…</span></summary><div class="q-stem" style="font-weight:500">${MD.esc(q.q)}</div><div class="opts">${q.opts.map((o,k)=>h`<div class="opt ${k===q.ans?'correct':k===a.i?'wrong':'dim'}" style="cursor:default"><span class="k">${'ABCD'[k]}</span><span>${MD.esc(o)}</span></div>`).join('')}</div><div class="explain">${MD.render(q.exp||'')}${q.ch&&chById(q.ch)?h`<div style="margin-top:8px"><a class="mini-link" href="#/chapter/${q.ch}">📖 ${chById(q.ch).title}</a></div>`:''}</div></details>`;}).join('')}
    </div>`;
    $('#retry',el).onclick=()=>{ const wrongQs=Q.qs.filter((q,i)=>!Q.answers[i].right); if(!wrongQs.length){UI.toast('Nothing to retry. Perfect score!');return;} window.__quiz={qs:wrongQs,opts:{...Q.opts,bonus:1},i:0,correct:0,answers:[],uid:Q.uid,start:Date.now(),combo:0,best:0,bonusXP:0}; renderQ(); };
  }

  /* ───────────── FLASHCARDS ───────────── */
  function allCards(){ return CHAPTERS.flatMap(c=>(c.cards||[]).map((cd,i)=>({id:`${c.id}-${i}`,q:cd[0],a:cd[1],ch:c.title,chId:c.id}))); }
  function allCardIds(){ return allCards().map(c=>c.id); }
  function flashcards(params){
    const scope=params.get('ch');
    let cards=allCards(); if(scope) cards=cards.filter(c=>c.chId===scope);
    const due=cards.filter(c=>Store.srsGet(c.id).due<=Date.now());
    const newC=cards.filter(c=>Store.srsGet(c.id).reps===0 && !Store.s.srs[c.id]);
    const learned=cards.filter(c=>Store.srsGet(c.id).iv>=7).length;
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Cards · spaced repetition</div><h1>${cards.length} cards${scope?' · '+topicName(scope):''}</h1><p>Tap to flip. Swipe right if you knew it, left if you didn't. Hard cards come back sooner.</p></div>
      <div class="grid c4" style="margin-bottom:20px"><div class="card pad-sm stat"><b>${due.length}</b><span>due now</span></div><div class="card pad-sm stat"><b>${newC.length}</b><span>never seen</span></div><div class="card pad-sm stat"><b>${learned}</b><span>mastered (7d+)</span></div><div class="card pad-sm stat"><b>${Object.values(Store.s.srs).reduce((a,b)=>a+b.reps,0)}</b><span>total reviews</span></div></div>
      <div class="toolbar"><select id="fc-scope"><option value="">All chapters</option>${UNITS.map(u=>`<optgroup label="${u.title}">${CHAPTERS.filter(c=>c.unit===u.id).map(c=>`<option value="${c.id}" ${c.id===scope?'selected':''}>${c.title} (${(c.cards||[]).length})</option>`).join('')}</optgroup>`).join('')}</select></div>
      ${flashDeck(due.length?shuffle(due):shuffle(cards).slice(0,20), due.length?`${due.length} due`:'Free review (nothing due)')}
    </div>`;
  }
  function flashDeck(cards, title){
    if(!cards.length) return '<div class="empty">No flashcards here yet.</div>';
    const uid='fd'+Math.random().toString(36).slice(2,7);
    window.__deck={cards,i:0,uid,title,reviewed:0};
    after(()=>renderCard());
    return `<div id="${uid}"></div>`;
  }
  function renderCard(){
    const D=window.__deck; const el=document.getElementById(D.uid); if(!el) return;
    if(D.i>=D.cards.length){ el.innerHTML=h`<div class="card" style="text-align:center;padding:36px"><div style="font-size:3rem">🎉</div><h3>Deck complete</h3><p class="muted">${D.reviewed} cards reviewed. Come back tomorrow for the ones you rated hard.</p><div class="row" style="justify-content:center"><a class="btn primary" href="#/flashcards">More cards</a><a class="btn ghost" href="#/lightning">⚡ Lightning Round</a></div></div>`; return; }
    const c=D.cards[D.i];
    el.innerHTML=h`<div class="row between" style="margin-bottom:10px"><span class="chip">${D.title}</span><span class="chip tnum">${D.i+1} / ${D.cards.length}</span></div>
      <div class="flash" id="fc"><span class="swipe-tag l">AGAIN</span><span class="swipe-tag r">GOT IT</span><div class="inner"><div class="face front"><small>${c.ch}</small><div>${MD.inline(c.q)}</div><span class="hint">Tap to flip · swipe → knew it · ← again</span></div><div class="face back"><small>Answer</small><div>${MD.inline(c.a)}</div></div></div></div>
      <div class="rate" id="rate"><button class="again" data-g="0">Again<small>&lt;1 min</small></button><button class="hard" data-g="1">Hard<small>1–2 days</small></button><button class="good" data-g="2">Good<small>${Math.max(1,Math.round((Store.srsGet(c.id).iv||1)*Store.srsGet(c.id).ease))} days</small></button><button class="easy" data-g="3">Easy<small>${Math.max(2,Math.round((Store.srsGet(c.id).iv||1)*Store.srsGet(c.id).ease*1.3)+1)} days</small></button></div>`;
    const fc=$('#fc',el), inner=$('.inner',fc), tl=$('.swipe-tag.l',fc), tr=$('.swipe-tag.r',fc);
    const flip=()=>{ fc.classList.toggle('flipped'); UI.sound('flip'); UI.haptic('tap'); };
    const rate=g=>{ Store.srsRate(c.id,g); D.reviewed++; D.i++; if(D.reviewed%5===0) Store.addXP(5,'5 cards reviewed'); Store.checkBadges(); renderCard(); };
    window.__flip=flip;
    let sx=0, dx=0, drag=false;
    fc.addEventListener('pointerdown',e=>{ sx=e.clientX; dx=0; drag=true; fc.setPointerCapture(e.pointerId); });
    fc.addEventListener('pointermove',e=>{ if(!drag) return; dx=e.clientX-sx; if(Math.abs(dx)>6){ inner.style.transition='none'; inner.style.transform=`translateX(${dx}px) rotate(${dx/20}deg) ${fc.classList.contains('flipped')?'rotateY(180deg)':''}`; tl.style.opacity=dx<-40?1:0; tr.style.opacity=dx>40?1:0; } });
    fc.addEventListener('pointerup',()=>{ drag=false; inner.style.transition=''; inner.style.transform=''; tl.style.opacity=0; tr.style.opacity=0; if(dx>90){ UI.sound('good'); rate(2); } else if(dx<-90){ UI.sound('bad'); rate(0); } else if(Math.abs(dx)<6){ flip(); } });
    fc.addEventListener('pointercancel',()=>{ drag=false; inner.style.transform=''; });
    $$('#rate button',el).forEach(b=>b.onclick=()=>rate(+b.dataset.g));
  }

  /* ───────────── ARTICLES ───────────── */
  function articles(params){
    const q=(params.get('q')||'').trim(); const part=params.get('part')||'';
    let list=ARTICLES.list;
    if(part) list=list.filter(a=>a.part===part);
    if(q){ const ql=q.toLowerCase(); const num=q.match(/^\d+[A-Z]*$/i); list=ARTICLES.list.filter(a=> num? a.n.toLowerCase()===ql || a.n.toLowerCase().startsWith(ql) : (a.t+' '+a.d).toLowerCase().includes(ql)); }
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Articles explorer</div><h1>The Constitution, article by article</h1><p>${ARTICLES.list.length} entries across 25 Parts and 12 Schedules, each with a one-line gist and the chapter that explains it. Type a number or a keyword.</p></div>
      <div class="toolbar"><input type="search" id="art-q" value="${MD.esc(q)}" placeholder="Article number or keyword, e.g. 32, money bill, Governor" style="flex:1;min-width:200px"><select id="art-part"><option value="">All Parts</option>${ARTICLES.parts.map(p=>`<option value="${p.part}" ${p.part===part?'selected':''}>Part ${p.part} · ${p.title} (${p.arts})</option>`).join('')}</select></div>
      ${!q&&!part?h`<div class="row" style="gap:8px;margin-bottom:18px">${ARTICLES.parts.map(p=>h`<a class="part-pill" href="#/articles?part=${p.part}"><span class="n">${p.part}</span>${p.title}<span class="muted small">${p.arts}</span></a>`).join('')}</div>
      <h3>Schedules</h3><div class="table-wrap" style="margin-bottom:20px"><table><thead><tr><th>Schedule</th><th>Deals with</th><th>Articles</th></tr></thead><tbody>${ARTICLES.schedules.map(s=>h`<tr><td><b>${s.n}</b></td><td>${MD.inline(s.d)}</td><td class="mono small">${s.arts}</td></tr>`).join('')}</tbody></table></div>
      <h3>Parts</h3>`:''}
      <div class="card flat" style="padding:0;overflow:hidden">${list.length?list.map(a=>h`<div class="art-row"><div class="no">Art. ${a.n}</div><div><b>${a.t}</b><div class="d">${MD.inline(a.d)}</div><div class="row" style="gap:6px;margin-top:4px"><span class="chip">Part ${a.part}</span>${a.ch&&chById(a.ch)?h`<a class="mini-link" href="#/chapter/${a.ch}">📖 ${chById(a.ch).title}</a>`:''}</div></div></div>`).join(''):'<div class="empty">No article matches.</div>'}</div>
    </div>`;
  }

  /* ───────────── AMENDMENTS ───────────── */
  function amendments(params){
    const f=params.get('f')||'major';
    let list=AMENDMENTS; if(f==='major') list=list.filter(a=>a.major);
    const pending=AMENDMENT_BILLS;
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Amendments</div><h1>106 amendments, one timeline</h1><p>Every Constitution Amendment Act from 1951 to 2023 with its gist, plus the pending bills (129th, 130th, 131st) that your book could not have covered.</p></div>
      <div class="toolbar"><a class="chip btn-chip ${f==='major'?'on':''}" href="#/amendments?f=major">⭐ Exam-important (${AMENDMENTS.filter(a=>a.major).length})</a><a class="chip btn-chip ${f==='all'?'on':''}" href="#/amendments?f=all">All 106</a><a class="chip btn-chip ${f==='pending'?'on':''}" href="#/amendments?f=pending">🕒 Pending bills (${pending.length})</a><a class="btn small ghost" href="#/quiz?topic=amendment&n=15" style="margin-left:auto">Quiz me on amendments</a></div>
      ${f==='pending'? h`<div class="timeline">${pending.map(a=>h`<div class="tl-item major"><div class="yr">${a.year} · ${a.status}</div><h4>${a.t}</h4><div class="small">${MD.render(a.d)}</div></div>`).join('')}</div>` :
      h`<div class="timeline">${list.map(a=>h`<div class="tl-item ${a.major?'major':''}"><div class="yr">${a.year} · ${a.n}${a.n===1?'st':a.n===2?'nd':a.n===3?'rd':'th'} Amendment</div><h4>${a.t}</h4><div class="small">${MD.inline(a.d)}</div></div>`).join('')}</div>`}
    </div>`;
  }

  /* ───────────── MAINS LAB ───────────── */
  function mains(params){
    const topic=params.get('topic')||'all'; const year=params.get('year')||'all';
    let list=PYQ_MAINS; if(topic!=='all') list=list.filter(q=>(q.ch||[]).includes(topic)); if(year!=='all') list=list.filter(q=>String(q.year)===year);
    list=[...list].sort((a,b)=>b.year-a.year);
    const topics=[...new Set(PYQ_MAINS.flatMap(x=>x.ch||[]))].map(id=>[id,topicName(id)]).sort((a,b)=>a[1].localeCompare(b[1]));
    const years=[...new Set(PYQ_MAINS.map(x=>x.year))].sort((a,b)=>b-a);
    const written=Object.keys(Store.s.mains).length;
    return h`<div class="fade-in">
      <div class="page-head"><div class="eyebrow">Answer Studio</div><h1>Write like a topper</h1><p>${PYQ_MAINS.length} real GS-II polity questions (2013–2025). Each comes with a structure, the constitutional hooks, judgments and committee reports to cite, and a timer. Write, self-grade on the UPSC rubric, earn XP.</p></div>
      <div class="grid c3" style="margin-bottom:20px"><div class="card pad-sm stat"><b>${written}</b><span>answers written</span></div><div class="card pad-sm stat"><b>${Object.values(Store.s.mains).reduce((a,b)=>a+(b.words||0),0)}</b><span>words written</span></div><div class="card pad-sm"><div class="eyebrow">The 7-minute formula</div><p class="small" style="margin:4px 0 0">1 min plan · 5 min write · 1 min conclude. Intro = define/context (2 lines). Body = 3–4 headed points with Article/judgment/committee. Conclusion = way forward.</p></div></div>
      <div class="toolbar"><select id="m-topic"><option value="all">All chapters</option>${topics.map(([v,l])=>`<option value="${v}" ${v===topic?'selected':''}>${l}</option>`).join('')}</select><select id="m-year"><option value="all">All years</option>${years.map(y=>`<option ${String(y)===year?'selected':''}>${y}</option>`).join('')}</select><a class="btn primary small" href="#/mains/${list.length?shuffle(list)[0].id:''}" style="margin-left:auto">🎲 Random question</a></div>
      <h3>Answer-writing toolkit</h3>
      <div class="grid c2" style="margin-bottom:22px">${MAINS_TOOLKIT.map(t=>h`<details class="card pad-sm"><summary style="cursor:pointer;font-weight:800">${t.t}</summary><div class="small" style="margin-top:8px">${MD.render(t.b)}</div></details>`).join('')}</div>
      <h3>Questions (${list.length})</h3>
      ${list.map(q=>h`<a class="task" href="#/mains/${q.id}" style="margin-bottom:8px"><span class="ic">${Store.s.mains[q.id]?'✅':'✍️'}</span><div style="flex:1"><b>${q.q}</b><small>UPSC ${q.year} · ${q.marks} marks · ${q.marks===10?'150':'250'} words · ${(q.ch||[]).map(topicName).join(', ')}</small></div></a>`).join('')}
    </div>`;
  }
  function mainsQ(id){
    const q=PYQ_MAINS.find(x=>x.id===id); if(!q) return '<div class="empty">Question not found.</div>';
    const saved=Store.s.mains[id]||{}; const words=q.marks===10?150:250; const mins=q.marks===10?7:11;
    const fw=q.fw||{};
    const rubric=['Intro defines the key term / gives constitutional context','Directly addresses every part of the question (all demand words)','Cites at least one Article or constitutional provision','Cites a Supreme Court judgment or committee report','Uses sub-headings / point format, not one block','Balanced: gives both sides or counter-view','Conclusion offers a way forward / recent development','Within word limit'];
    return h`<div class="fade-in">
      <a class="mini-link" href="#/mains">← Answer Studio</a>
      <div class="ch-hero" data-emoji="✍️" style="margin-top:10px"><div class="eyebrow">UPSC CSE Mains ${q.year} · GS-II · ${q.marks} marks · ${words} words</div><h1 style="font-size:1.6rem">${q.q}</h1><div class="row" style="gap:8px">${(q.ch||[]).map(c=>chById(c)?h`<a class="chip" style="background:rgba(255,255,255,.14);color:#fff;border-color:transparent" href="#/chapter/${c}">📖 ${chById(c).title}</a>`:'').join('')}</div></div>
      <div class="grid c2">
        <div class="stack">
          <div class="card"><div class="row between"><h3 style="margin:0">Your answer</h3><div class="row" style="gap:8px"><span class="timer" id="m-timer">${String(mins).padStart(2,'0')}:00</span><button class="btn small soft" id="m-start">▶ Start timer</button></div></div>
            <textarea id="m-text" placeholder="Demand words: ${(q.q.match(/\b(Discuss|Examine|Critically|Evaluate|Analyse|Analyze|Comment|Elucidate|Explain|Compare|Justify|Illustrate|Account|To what extent|Do you think|How far)\b/gi)||['Discuss']).join(', ')}. Plan for 60 seconds before you type.">${MD.esc(saved.written||'')}</textarea>
            <div class="row between" style="margin-top:8px"><span class="small muted" id="m-words">${(saved.written||'').trim().split(/\s+/).filter(Boolean).length} / ${words} words</span><button class="btn primary small" id="m-save">Save & self-grade</button></div></div>
          <div class="card" id="m-rubric" ${saved.written?'':'hidden'}><h3>Self-grade on UPSC's rubric</h3><div class="rubric">${rubric.map((r,i)=>h`<label><input type="checkbox" data-r="${i}" ${(saved.rubric||[]).includes(i)?'checked':''}>${r}</label>`).join('')}</div><div class="row between" style="margin-top:12px"><b id="m-score">${saved.rubric?`Estimated ${Math.round((saved.rubric.length/rubric.length)*q.marks*0.75*10)/10}/${q.marks}`:''}</b><button class="btn small" id="m-grade">Compute score (+XP)</button></div></div>
        </div>
        <div class="stack">
          <details class="card" open><summary style="cursor:pointer;font-weight:800">🧭 Suggested structure</summary><div class="small" style="margin-top:10px"><b>Introduction</b>${MD.render(fw.intro||'Define the key term and set the constitutional context in 2 lines.')}<b>Body</b><ul style="padding-left:1.2em">${(fw.body||[]).map(b=>`<li>${MD.inline(b)}</li>`).join('')}</ul><b>Conclusion</b>${MD.render(fw.conclusion||'End with a balanced way forward tied to a recent development.')}</div></details>
          <details class="card"><summary style="cursor:pointer;font-weight:800">💎 Value additions (Articles · cases · committees · data)</summary><ul class="small" style="padding-left:1.2em;margin-top:10px">${(fw.value||[]).map(v=>`<li>${MD.inline(v)}</li>`).join('')}</ul></details>
          <details class="card"><summary style="cursor:pointer;font-weight:800">📝 Model answer (sketch)</summary><div class="small prose" style="margin-top:10px;font-size:.92rem">${MD.render(fw.model||'_Use the structure above; a full model answer is given for the highest-yield questions._')}</div></details>
        </div>
      </div>
    </div>`;
  }

  /* ───────────── REVISION ───────────── */
  function revision(params){
    const tab=params.get('t')||'facts';
    const tabs=[['facts','⚡ '+REVISION.facts.length+' facts'],['numbers','🔢 Numbers'],['compare','⚖️ Comparisons'],['committees','🧑‍⚖️ Committees'],['cases','📚 Landmark cases'],['doctrines','🧩 Doctrines & terms'],['firsts','🥇 Firsts & heads']];
    let body='';
    if(tab==='facts') body=`<ol style="padding-left:1.4em;columns:1;font-size:1rem;line-height:1.7">${REVISION.facts.map(f=>`<li style="margin:.35em 0">${MD.inline(f)}</li>`).join('')}</ol>`;
    if(tab==='numbers') body=`<div class="table-wrap"><table><thead><tr><th>Number</th><th>What</th><th>Where</th></tr></thead><tbody>${REVISION.numbers.map(r=>`<tr><td><b class="mono">${r[0]}</b></td><td>${MD.inline(r[1])}</td><td class="small muted">${MD.inline(r[2]||'')}</td></tr>`).join('')}</tbody></table></div>`;
    if(tab==='compare') body=REVISION.comparisons.map(c=>h`<div class="card" style="margin-bottom:14px"><h3>${c.title}</h3><div class="compare"><div><div class="eyebrow">${c.a.name}</div><ul style="padding-left:1.2em;margin:.4em 0">${c.a.points.map(p=>`<li>${MD.inline(p)}</li>`).join('')}</ul></div><div><div class="eyebrow">${c.b.name}</div><ul style="padding-left:1.2em;margin:.4em 0">${c.b.points.map(p=>`<li>${MD.inline(p)}</li>`).join('')}</ul></div></div></div>`).join('');
    if(tab==='committees') body=`<div class="table-wrap"><table><thead><tr><th>Committee / Commission</th><th>Year</th><th>Known for</th></tr></thead><tbody>${REVISION.committees.map(r=>`<tr><td><b>${r[0]}</b></td><td class="mono small">${r[1]}</td><td>${MD.inline(r[2])}</td></tr>`).join('')}</tbody></table></div>`;
    if(tab==='cases') body=`<div class="table-wrap"><table><thead><tr><th>Case</th><th>Year</th><th>Held</th></tr></thead><tbody>${REVISION.cases.map(r=>`<tr><td><b>${r[0]}</b></td><td class="mono small">${r[1]}</td><td>${MD.inline(r[2])}</td></tr>`).join('')}</tbody></table></div>`;
    if(tab==='doctrines') body=`<div class="facts">${REVISION.doctrines.map(r=>`<div class="fact"><small>${r[0]}</small><b style="font-weight:500">${MD.inline(r[1])}</b></div>`).join('')}</div>`;
    if(tab==='firsts') body=`<div class="table-wrap"><table><thead><tr><th>Office / First</th><th>Who</th><th>Note</th></tr></thead><tbody>${REVISION.firsts.map(r=>`<tr><td><b>${r[0]}</b></td><td>${MD.inline(r[1])}</td><td class="small muted">${MD.inline(r[2]||'')}</td></tr>`).join('')}</tbody></table></div>`;
    return h`<div class="fade-in"><div class="page-head"><div class="eyebrow">Quick Revise</div><h1>The night-before pack</h1><p>Everything that is pure recall, in one place. Read it the week before Prelims and the morning of GS-II.</p></div>
      <div class="tabs">${tabs.map(([k,l])=>h`<a href="#/revision?t=${k}"><button class="${tab===k?'active':''}">${l}</button></a>`).join('')}</div>${body}</div>`;
  }

  /* ───────────── UPDATES ───────────── */
  function updates(params){
    const tag=params.get('tag')||'all';
    const tags=[...new Set(UPDATES.map(u=>u.tag))];
    const list=tag==='all'?UPDATES:UPDATES.filter(u=>u.tag===tag);
    return h`<div class="fade-in"><div class="page-head"><div class="eyebrow">What's new</div><h1>Everything since 2019</h1><p>The 6th edition stops around 2019. Here is every amendment, judgment, law and appointment since, linked to the chapter it changes. Updated to ${SITE_META.updated}.</p></div>
      <div class="toolbar"><a class="chip btn-chip ${tag==='all'?'on':''}" href="#/updates">All (${UPDATES.length})</a>${tags.map(t=>h`<a class="chip btn-chip ${tag===t?'on':''}" href="#/updates?tag=${encodeURIComponent(t)}">${t}</a>`).join('')}</div>
      <div class="timeline">${list.map(u=>h`<div class="tl-item ${u.major?'major':''}"><div class="row between"><span class="yr">${u.date}</span><span class="chip ${u.color||'saffron'}">${u.tag}</span></div><h4>${u.title}</h4><div class="small">${MD.render(u.body)}</div><div class="row" style="gap:6px;margin-top:8px">${(u.ch||[]).map(c=>chById(c)?h`<a class="mini-link" href="#/chapter/${c}">📖 ${chById(c).title}</a>`:'').join('')}</div></div>`).join('')}</div></div>`;
  }

  /* ───────────── PROFILE ───────────── */
  function progress(){
    const s=Store.s, L=Store.level(), st=s.settings;
    const days=Array.from({length:26*7},(_,i)=>{const d=new Date(Date.now()-(26*7-1-i)*864e5); const k=new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10); return [k,s.activity[k]||0];});
    const lvl=x=>x===0?'':x<30?'l1':x<80?'l2':x<160?'l3':'l4';
    const perUnit=UNITS.map(u=>{const chs=CHAPTERS.filter(c=>c.unit===u.id);return [u,chs.filter(c=>s.done[c.id]).length,chs.length];});
    const qs=Object.values(s.quiz.perQ); const seen=qs.reduce((a,b)=>a+b.seen,0), right=qs.reduce((a,b)=>a+b.right,0);
    const byCh={}; Object.entries(s.quiz.perQ).forEach(([id,v])=>{ const q=PYQ_PRELIMS.find(x=>x.id===id); const ch=q?q.ch:id.split('-m')[0]; if(!chById(ch)) return; byCh[ch]=byCh[ch]||{s:0,r:0}; byCh[ch].s+=v.seen; byCh[ch].r+=v.right; });
    const weak=Object.entries(byCh).filter(([,v])=>v.s>=3).map(([id,v])=>[id,pct(v.r,v.s),v.s]).sort((a,b)=>a[1]-b[1]).slice(0,6);
    const seg=(key,opts,cur)=>`<div class="seg" data-set="${key}">${opts.map(([v,l])=>`<button type="button" data-v="${v}" class="${String(cur)===String(v)?'on':''}">${l}</button>`).join('')}</div>`;
    const sw=(key,on)=>`<label class="switch"><input type="checkbox" data-toggle="${key}" id="sw-${key}" ${on?'checked':''}><span></span></label>`;
    return h`<div class="fade-in">
      <div class="card hero-card" style="padding:22px;margin-bottom:16px">
        <div class="row" style="gap:16px">
          <div style="font-size:2.6rem;width:72px;height:72px;border-radius:22px;background:rgba(255,255,255,.16);display:grid;place-items:center">${L.icon}</div>
          <div style="flex:1;min-width:0"><div class="eyebrow" style="color:rgba(255,255,255,.75)">Level ${L.n}</div><h1 style="color:#fff;margin:.1em 0">${st.name?MD.esc(st.name):L.name}</h1><div class="muted">${L.name} · ${s.xp.toLocaleString('en-IN')} XP${L.next?` · ${L.to-s.xp} XP to ${L.next}`:''}</div></div>
        </div>
        <div class="bar" style="margin-top:14px;background:rgba(255,255,255,.2)"><i style="width:${L.pct}%;background:#fff"></i></div>
      </div>
      <div class="grid c4" style="margin-bottom:16px"><div class="card pad-sm stat"><b>${s.streak}🔥</b><span>streak · best ${s.bestStreak}</span></div><div class="card pad-sm stat"><b>${doneCount()}/${CHAPTERS.length}</b><span>chapters</span></div><div class="card pad-sm stat"><b>${seen?pct(right,seen):0}%</b><span>accuracy · ${seen} Qs</span></div><div class="card pad-sm stat"><b>${s.quiz.lightningBest}</b><span>Lightning best</span></div></div>
      <div class="card" style="margin-bottom:16px"><div class="eyebrow" style="margin-bottom:10px">Activity · last 26 weeks</div><div class="heat">${days.map(([d,x])=>`<i class="${lvl(x)}" title="${d}: ${x} XP"></i>`).join('')}</div></div>
      <div class="grid c2">
        <div class="card"><h3>Coverage by unit</h3>${perUnit.map(([u,d,t])=>h`<div style="margin:10px 0"><div class="row between small"><span>${u.emoji} ${u.short}</span><b class="tnum">${d}/${t}</b></div><div class="progress" style="height:7px"><i style="width:${pct(d,t)}%;background:${u.color}"></i></div></div>`).join('')}</div>
        <div class="card"><h3>Weakest chapters</h3>${weak.length?weak.map(([id,p,n])=>h`<a class="task" href="#/quiz?topic=${id}&n=10" style="margin-bottom:8px"><span class="ic">🩹</span><div style="flex:1;min-width:0"><b>${topicName(id)}</b><small>${p}% over ${n} attempts · tap to drill</small></div></a>`).join(''):'<p class="muted small">Take a few quizzes and your weak spots will show up here.</p>'}</div>
      </div>
      <div class="section"><div class="section-head"><h2>Badges</h2><span class="chip">${Object.keys(s.badges).length}/${Store.BADGES.length}</span></div><div class="badge-grid">${Store.BADGES.map(b=>h`<div class="badge-tile ${s.badges[b.id]?'':'locked'}"><div class="ic">${b.ic}</div><b>${b.name}</b><small>${s.badges[b.id]?'Earned '+fmtDate(s.badges[b.id]):b.desc}</small></div>`).join('')}</div></div>
      <div class="section card" id="settings"><h2>Settings</h2>
        <div class="setting"><div><b>Your name</b><div class="small muted">Shown on Home</div></div><input type="text" id="set-name" value="${MD.esc(st.name||'')}" placeholder="Your name" style="max-width:200px"></div>
        <div class="setting"><div><b>Preparing for</b></div>${seg('goal',[['prelims','Prelims'],['mains','Mains'],['both','Both']],st.goal)}</div>
        <div class="setting"><div><b>Daily XP goal</b></div>${seg('dailyXP',[[30,'Casual 30'],[50,'Regular 50'],[100,'Serious 100'],[200,'Intense 200']],st.dailyXP)}</div>
        <div class="setting"><div><b>Theme</b></div>${seg('theme',[['auto','Auto'],['light','Light'],['dark','Dark']],st.theme)}</div>
        <div class="setting"><div><b>Sound effects</b></div>${sw('sound',st.sound)}</div>
        <div class="setting"><div><b>Vibration</b><div class="small muted">On supported phones</div></div>${sw('haptics',st.haptics)}</div>
      </div>
      <div class="section card"><h3>Backup</h3><p class="small muted">Progress stays on this device. Copy the export code to move it to another phone or laptop.</p><div class="row"><button class="btn small soft" id="exp" type="button">Show export code</button><button class="btn small soft" id="impbtn" type="button">Import from code</button><button class="btn small danger" id="reset" type="button">Reset everything</button></div><div id="data-panel" hidden style="margin-top:12px"><textarea id="data-box" class="data-box" placeholder="Paste an export code here, or copy the one shown."></textarea><div class="row" style="margin-top:8px"><button class="btn small" id="copy" type="button">Copy</button><button class="btn small primary" id="doimp" type="button">Import this code</button></div></div></div>
      <p class="footer-note">Civix · <a href="privacy.html">Privacy</a> · Content current to ${SITE_META.updated}</p>
    </div>`;
  }

  /* ───────────── SEARCH ───────────── */
  function search(q){
    q=q.trim().toLowerCase(); if(q.length<2) return [];
    const out=[];
    const num=q.match(/^(?:art(?:icle)?\.?\s*)?(\d+[a-z]?)$/i);
    if(num){ ARTICLES.list.filter(a=>a.n.toLowerCase()===num[1]).forEach(a=>out.push({t:'Article',title:`Art. ${a.n} · ${a.t}`,d:a.d,href:`#/articles?q=${a.n}`})); const am=AMENDMENTS.find(a=>String(a.n)===num[1]); if(am) out.push({t:'Amendment',title:`${am.n}th Amendment (${am.year}) · ${am.t}`,d:am.d,href:'#/amendments?f=all'}); }
    CHAPTERS.forEach(c=>{ const hay=(c.title+' '+c.tagline).toLowerCase(); if(hay.includes(q)) out.push({t:'Chapter',title:c.title,d:c.tagline,href:`#/chapter/${c.id}`}); });
    CHAPTERS.forEach(c=>{ const i=(c.notes||'').toLowerCase().indexOf(q); if(i>-1 && !out.some(o=>o.href===`#/chapter/${c.id}`)) out.push({t:'Notes',title:c.title,d:'…'+c.notes.slice(Math.max(0,i-60),i+80).replace(/[#*>|:]/g,' ')+'…',href:`#/chapter/${c.id}`}); });
    ARTICLES.list.forEach(a=>{ if(!num && (a.t+' '+a.d).toLowerCase().includes(q)) out.push({t:'Article',title:`Art. ${a.n} · ${a.t}`,d:a.d,href:`#/articles?q=${a.n}`}); });
    AMENDMENTS.forEach(a=>{ if(!num && (a.t+' '+a.d).toLowerCase().includes(q)) out.push({t:'Amendment',title:`${a.n}th Amendment (${a.year})`,d:a.t,href:'#/amendments?f=all'}); });
    PYQ_PRELIMS.forEach(p=>{ if(p.q.toLowerCase().includes(q)) out.push({t:'PYQ '+p.year,title:p.q.slice(0,90)+'…',d:topicName(p.ch),href:`#/pyq?q=${encodeURIComponent(q)}`}); });
    PYQ_MAINS.forEach(p=>{ if(p.q.toLowerCase().includes(q)) out.push({t:'Mains '+p.year,title:p.q.slice(0,90)+'…',d:(p.ch||[]).map(topicName).join(', '),href:`#/mains/${p.id}`}); });
    REVISION.cases.forEach(c=>{ if((c[0]+' '+c[2]).toLowerCase().includes(q)) out.push({t:'Case',title:c[0]+' ('+c[1]+')',d:c[2],href:'#/revision?t=cases'}); });
    REVISION.doctrines.forEach(c=>{ if((c[0]+' '+c[1]).toLowerCase().includes(q)) out.push({t:'Concept',title:c[0],d:c[1],href:'#/revision?t=doctrines'}); });
    UPDATES.forEach(u=>{ if((u.title+' '+u.body).toLowerCase().includes(q)) out.push({t:'Update',title:u.title,d:u.summary,href:'#/updates'}); });
    return out.slice(0,40);
  }

  return {home,syllabus,learn,chapter,pyq,quizSetup,flashcards,articles,amendments,mains,mainsQ,revision,updates,progress,search,runAfter,after,allCardIds,chById,renderQ,unitOf,topicName};
})();
