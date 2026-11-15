/* Tiny markdown-lite renderer for chapter notes.
   Supports: ## / ### headings, paragraphs, **bold**, *italic*, ==mark==, `code`,
   - bullets (nested by 2 spaces), 1. numbered, > quotes, | tables |, ---, 
   :::type Title ... ::: callouts (tip|warn|info|update|mnemonic), and [[Art 356]] article links. */
window.MD = (function(){
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function inline(s){
    s = esc(s);
    s = s.replace(/\[\[(Art(?:icle)?s?\.?\s*)([0-9]+[A-Z]*)([^\]]*)\]\]/g,(m,a,n,rest)=>`<span class="art" data-art="${n}">Art. ${n}${esc(rest)}</span>`);
    s = s.replace(/\[\[([^\]]+)\]\]/g,'<span class="art" data-q="$1">$1</span>');
    s = s.replace(/`([^`]+)`/g,'<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<em>$2</em>');
    s = s.replace(/==([^=]+)==/g,'<mark>$1</mark>');
    s = s.replace(/\[([^\]]+)\]\((#[^)]+)\)/g,'<a href="$2">$1</a>');
    return s;
  }
  function render(src){
    if(!src) return '';
    const lines = src.replace(/\r/g,'').split('\n');
    let out=[], i=0;
    const listStack=[];
    function closeLists(toDepth=-1){
      while(listStack.length && listStack.length-1>toDepth){ out.push(listStack.pop()==='ol'?'</ol>':'</ul>'); }
    }
    while(i<lines.length){
      let l=lines[i];
      if(/^\s*$/.test(l)){ closeLists(); i++; continue; }
      let m;
      if((m=l.match(/^:::(\w+)\s*(.*)$/))){
        closeLists();
        const type=m[1], title=m[2]; let body=[]; i++;
        while(i<lines.length && !/^:::\s*$/.test(lines[i])){ body.push(lines[i]); i++; }
        i++;
        if(type==='mnemonic'){ out.push(`<div class="mnemonic"><b>🧠 ${title||'Mnemonic'}</b><div>${render(body.join('\n'))}</div></div>`); }
        else { const icon={tip:'💡',warn:'⚠️',info:'ℹ️',update:'🆕',pyq:'📝',mains:'✍️'}[type]||'📌'; out.push(`<div class="callout ${type}"><b class="title">${icon} ${title||type}</b>${render(body.join('\n'))}</div>`); }
        continue;
      }
      if((m=l.match(/^(#{2,4})\s+(.*)$/))){ closeLists(); const lv=m[1].length; const id=m[2].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); out.push(`<h${lv} id="${id}">${inline(m[2])}</h${lv}>`); i++; continue; }
      if(/^---+\s*$/.test(l)){ closeLists(); out.push('<hr>'); i++; continue; }
      if(/^>\s?/.test(l)){ closeLists(); let q=[]; while(i<lines.length && /^>\s?/.test(lines[i])){ q.push(lines[i].replace(/^>\s?/,'')); i++; } out.push(`<blockquote>${inline(q.join(' '))}</blockquote>`); continue; }
      if(/^\|/.test(l)){ closeLists(); let rows=[]; while(i<lines.length && /^\|/.test(lines[i])){ rows.push(lines[i]); i++; }
        rows = rows.filter(r=>!/^\|\s*:?-{2,}/.test(r));
        const cells=r=>r.replace(/^\||\|$/g,'').split('|').map(c=>inline(c.trim()));
        let h='<div class="table-wrap"><table><thead><tr>'+cells(rows[0]).map(c=>`<th>${c}</th>`).join('')+'</tr></thead><tbody>';
        for(let r=1;r<rows.length;r++) h+='<tr>'+cells(rows[r]).map(c=>`<td>${c}</td>`).join('')+'</tr>';
        out.push(h+'</tbody></table></div>'); continue; }
      if((m=l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/))){
        const depth=Math.floor(m[1].replace(/\t/g,'  ').length/2); const type=/\d/.test(m[2])?'ol':'ul';
        while(listStack.length>depth+1) out.push(listStack.pop()==='ol'?'</ol>':'</ul>');
        if(listStack.length<depth+1){ listStack.push(type); out.push(type==='ol'?'<ol>':'<ul>'); }
        out.push(`<li>${inline(m[3])}</li>`); i++; continue; }
      closeLists();
      let p=[l]; i++;
      while(i<lines.length && !/^\s*$/.test(lines[i]) && !/^(#{2,4}\s|:::|---|>|\||\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])){ p.push(lines[i]); i++; }
      out.push(`<p>${inline(p.join(' '))}</p>`);
    }
    closeLists();
    return out.join('\n');
  }
  return {render, inline, esc};
})();
