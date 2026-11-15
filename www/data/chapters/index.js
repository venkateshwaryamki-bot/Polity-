/* Registry: units + the CHAPTERS array that unit files push into. */
window.SITE_META={updated:'14 November 2026',edition:'Laxmikanth 6th edition (2019) baseline, updated through Nov 2026'};
window.UNITS=[
  {id:'u1',n:1,color:'#3657F0',emoji:'🏛️',title:'Constitutional Framework',short:'Framework'},
  {id:'u2',n:2,color:'#7356F0',emoji:'⚖️',title:'System of Government',short:'System'},
  {id:'u3',n:3,color:'#E5483B',emoji:'🇮🇳',title:'Central Government',short:'Centre'},
  {id:'u4',n:4,color:'#0B9A94',emoji:'🏙️',title:'State Government',short:'States'},
  {id:'u5',n:5,color:'#12A365',emoji:'🏘️',title:'Local Government',short:'Local'},
  {id:'u6',n:6,color:'#D98A04',emoji:'🗺️',title:'Union Territories & Special Areas',short:'UTs'},
  {id:'u7',n:7,color:'#C13F9A',emoji:'🏢',title:'Constitutional Bodies',short:'Const. bodies'},
  {id:'u8',n:8,color:'#2E8BD8',emoji:'🧾',title:'Non-Constitutional Bodies',short:'Non-const. bodies'},
  {id:'u9',n:9,color:'#8A5A2B',emoji:'📐',title:'Other Constitutional Dimensions',short:'Dimensions'},
  {id:'u10',n:10,color:'#F06C1D',emoji:'🗳️',title:'Political Dynamics',short:'Politics'},
  {id:'u11',n:11,color:'#4B5BA8',emoji:'🧭',title:'Working of the Constitution & Governance (GS-II)',short:'Governance'},
];
window.CHAPTERS=[];
window.addChapter=function(c){ c.n=CHAPTERS.length+1; CHAPTERS.push(c); };
