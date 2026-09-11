/* LAMPTEYS ON TOUR — app.js v2 (compact rendering). Content lives in js/data/. */
(function(){
const $=s=>document.querySelector(s);
const app=$('#app'), daynav=$('#daynav');
const DAYS=window.DAYS1.concat(window.DAYS2, window.DAYS3);
const P=window.PAGES;

/* ---------- helpers ---------- */
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
function jstNow(){ return new Date(Date.now() + (9*60 + new Date().getTimezoneOffset())*60000); }
function jstDateStr(){ const d=jstNow(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function currentDayIndex(){ const t=jstDateStr(); return DAYS.findIndex(d=>d.iso===t); }
function tripState(){ const t=jstDateStr(); if(t<DAYS[0].iso) return 'before'; if(t>DAYS[DAYS.length-1].iso) return 'after'; return 'during'; }
function mapsUrl(q){ return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q); }
/* ---- v53: plain-English transport labels ---- */
const FLEX={must:['fx-must','MUST NOT MISS'],res:['fx-res','RESERVED SEAT'],fixed:['fx-fixed','FIXED TIME'],go:['fx-go','TURN UP & GO'],arr:['fx-arr','ARRANGE']};
function legFlex(d,t){
  const s=((t.service||'')+' | '+(t.status||'')).toLowerCase();
  if(/air china|british airways|ba6/.test(s)) return 'res';
  if(/hashidate|shinano/.test(s)) return 'must';
  if(d.iso==='2026-09-27'&&/tankai/.test(s)) return 'must';          // the 08:11 is the only bus that makes the train
  if(/nozomi|aoniyoshi/.test(s)) return 'res';
  if(/tankai|chuo line locals|kiso rail/.test(s)) return 'fixed';
  if(/host|hotel transfer|hotel boat|sea taxi|arranged|ask the desk|book at reception|taxi to shinagawa|reception|with hotel|slot to reserve|book the taxi/.test(s)) return 'arr';
  if(/taxi/.test(s)&&/book|arrange|ask/.test(s)) return 'arr';
  return 'go';
}
function flexTag(k){ return '<span class="tag '+FLEX[k][0]+'">'+FLEX[k][1]+'</span>'; }
window.legFlex=legFlex; window.FLEX=FLEX;
function dirUrl(f,t){ return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(f)+'&destination='+encodeURIComponent(t)+'&travelmode=transit'; }
function photosUrl(q){ return 'https://www.google.com/search?tbm=isch&q='+encodeURIComponent(q); }
window.copyTxt=function(t,btn){ navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>{ if(btn){btn.textContent='COPIED ✓'; setTimeout(()=>btn.textContent='COPY',1400);} }); };
window.showBig=function(jp,en){ $('#bp-jp').textContent=jp; $('#bp-en').textContent=en; $('#bigphrase').style.display='flex'; };
window.showPlace=function(enc){ const o=JSON.parse(decodeURIComponent(enc)); const jp=o.jp||o.en; const lines=[]; if(o.jp) lines.push(o.en); if(o.addr) lines.push(o.addr); lines.push('ここに行きたいです — I\u2019d like to go here');
  $('#bp-jp').textContent=jp; $('#bp-en').textContent=lines.join('\n'); $('#bigphrase').style.display='flex'; };
function placeBtns(e,fallbackArea){ const q=e.mapsQ||(e.name+' '+(e.addr||fallbackArea||'Japan'));
  return '<button class="btn mini" onclick="showMap(\''+encodeURIComponent(q)+'\')">🗺️ MAP</button>'+
    '<a class="btn mini" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(q)+'&travelmode=walking">📍 FROM HERE</a>'+
    '<button class="btn mini yellow" onclick="showPlace(\''+encodeURIComponent(JSON.stringify({jp:e.jp||'',en:e.name,addr:e.addr||''}))+'\')">🈁 SHOW NAME</button>'; }
window.showMap=function(qe){ const q=decodeURIComponent(qe); const m=$('#mapmodal'), f=$('#mm-frame'), off=$('#mm-off');
  $('#mm-open').href=mapsUrl(q);
  if(navigator.onLine){ f.style.display='block'; off.style.display='none'; f.src='https://maps.google.com/maps?q='+encodeURIComponent(q)+'&z=16&output=embed'; }
  else { f.style.display='none'; off.style.display='flex'; }
  m.style.display='flex';
};
window.hideMap=function(){ const m=$('#mapmodal'), f=$('#mm-frame'); if(f) f.src='about:blank'; if(m) m.style.display='none'; };
window.showRoute=function(fe,te){ const f0=decodeURIComponent(fe), t0=decodeURIComponent(te);
  const m=$('#mapmodal'), f=$('#mm-frame'), off=$('#mm-off');
  $('#mm-open').href=dirUrl(f0,t0);
  if(navigator.onLine){ f.style.display='block'; off.style.display='none';
    f.src='https://maps.google.com/maps?saddr='+encodeURIComponent(f0)+'&daddr='+encodeURIComponent(t0)+'&dirflg=r&output=embed'; }
  else { f.style.display='none'; off.style.display='flex'; }
  m.style.display='flex';
};
function setOffline(){ document.body.classList.toggle('offline', !navigator.onLine); }
window.addEventListener('online',setOffline); window.addEventListener('offline',setOffline); setOffline();

/* tick-off persistence (real deployed site — storage is available here) */
function chkState(){ try{ return JSON.parse(localStorage.getItem('lampteys-ticks')||'{}'); }catch(e){ return {}; } }
window.toggleChk=function(id,el){
  const st=chkState(); st[id]=!st[id];
  try{ localStorage.setItem('lampteys-ticks',JSON.stringify(st)); }catch(e){}
  el.classList.toggle('done',st[id]); const b=el.querySelector('.box'); if(b) b.textContent=st[id]?'✓':'';
};
function chkRow(id,title,desc,meta,url,preTicked){
  const st=chkState(); const on=st[id]!==undefined?st[id]:!!preTicked;
  return '<div class="chk'+(on?' done':'')+'" id="chk-'+id+'" onclick="toggleChk(\''+id+'\',this)">'+
    '<div class="box">'+(on?'✓':'')+'</div><div style="flex:1"><div class="t">'+title+'</div>'+
    (desc?'<div class="d">'+desc+'</div>':'')+(meta?'<div class="meta">'+meta+'</div>':'')+
    (url?'<div class="btnrow"><a class="btn mini yellow" target="_blank" rel="noopener" href="'+url+'" onclick="event.stopPropagation()">↗ BOOK / CHECK</a></div>':'')+'</div></div>';
}
window.CHKROW=chkRow;

const PH_COLORS=['#ff2a2a','#0044ff','#ffcc00','#15803d','#9333ea','#f97316','#ec4899'];
function phColor(n,i){ return PH_COLORS[((n||'x').length+(i||0))%PH_COLORS.length]; }
function phBlock(name,i){ return '<div class="ph" style="background:'+phColor(name,i)+'">'+esc(name)+'</div>'; }
window.imgFail=function(el){
  const name=el.getAttribute('alt')||'';
  if(el.classList.contains('th')){ const d=document.createElement('div'); d.className='th thc'; d.style.background=phColor(name,0); d.textContent=(name[0]||'*').toUpperCase(); el.parentNode.replaceChild(d,el); return; }
  const d=document.createElement('div'); d.className='ph'; d.style.background=phColor(name,0); d.textContent=name; el.parentNode.replaceChild(d,el);
};
function thumb(c,i){
  if(c.img) return '<img class="th" loading="lazy" src="'+c.img+'" alt="'+esc(c.name)+'" onerror="imgFail(this)" onclick="event.preventDefault();event.stopPropagation();openLB(\''+lbPack([{u:c.img,t:c.name,c:c.imgCredit||''}])+'\',0)">';
  return '<div class="th thc" style="background:'+phColor(c.name,i)+'">'+esc((c.name[0]||'*').toUpperCase())+'</div>';
}
function tagRow(labels,limit){ if(!labels||!labels.length) return '';
  const cls={'CORE PLAN':'core','OPTIONAL':'opt','BOOK AHEAD':'book','VERY LOCAL':'local','LOWER ENERGY':'low','RAIN FRIENDLY':'rain','FREE':'free','SCENIC':'scenic','HISTORY':'hist','CULTURE':'culture','FOOD':'food','CAKE':'cake','SHOPPING':'shop','ENTERTAINMENT':'ent','GLORIOUSLY WEIRD':'weird','CONFIRMED':'ok','ESTIMATED':'est','NEEDS RECHECK':'warn','BOOKING NOT OPEN':'est','TECH':'ent','DESIGN':'shop','NATURE':'scenic','🚇 SHORT RIDE':'ride'};
  const ls=limit?labels.slice(0,limit):labels;
  return ls.map(l=>'<span class="tag '+(cls[l]||'')+'">'+esc(l)+'</span>').join('');
}
function kv(rows){ let h='<div class="kv">'; rows.forEach(r=>{ if(r[1]) h+='<div class="k">'+r[0]+'</div><div>'+r[1]+'</div>'; }); return h+'</div>'; }
function firstBit(t){ if(!t) return ''; const s=t.replace(/<[^>]+>/g,''); const i=s.indexOf('. '); return i>0&&i<150?s.slice(0,i+1):s.slice(0,140)+(s.length>140?'…':''); }


/* ---------- image lightbox: tap any picture to see it whole ---------- */
window.__LB={list:[],i:0};
window.openLB=function(list,idx){
  try{ window.__LB.list = (typeof list==='string') ? JSON.parse(decodeURIComponent(list)) : list; }
  catch(e){ window.__LB.list=[]; }
  if(!window.__LB.list.length) return;
  window.__LB.i = idx||0;
  document.getElementById('lightbox').classList.add('on');
  document.body.style.overflow='hidden';
  paintLB();
}
window.paintLB=function(){
  var L=window.__LB.list, i=window.__LB.i, o=L[i]||{};
  document.getElementById('lbimg').src=o.u||'';
  document.getElementById('lbcap').textContent=o.t||'';
  document.getElementById('lbcred').textContent=o.c||'';
  document.getElementById('lbcount').textContent = L.length>1 ? (i+1)+' / '+L.length : '';
  var show = L.length>1 ? 'block':'none';
  document.querySelector('#lightbox .lbprev').style.display=show;
  document.querySelector('#lightbox .lbnext').style.display=show;
}
window.stepLB=function(d){ var L=window.__LB.list; if(!L.length) return;
  window.__LB.i=(window.__LB.i+d+L.length)%L.length; paintLB(); }
window.closeLB=function(){ document.getElementById('lightbox').classList.remove('on'); document.body.style.overflow=''; }
document.addEventListener('keydown',function(e){
  if(!document.getElementById('lightbox').classList.contains('on')) return;
  if(e.key==='Escape') closeLB();
  if(e.key==='ArrowLeft') stepLB(-1);
  if(e.key==='ArrowRight') stepLB(1);
});
window.lbPack=function(arr){ return encodeURIComponent(JSON.stringify(arr)); }

/* ---------- recommendation card: compact row, expands ---------- */
function recCard(c,i){
  let inner='';
  if(c.why) inner+='<p style="font-size:13.5px;margin:0 0 7px">'+c.why+'</p>';
  if(c.history) inner+='<p style="font-size:12.5px;margin:7px 0;color:#374151"><b>The story:</b> '+c.history+'</p>';
  if(c.expect) inner+='<p style="font-size:12.5px;margin:7px 0;color:#374151"><b>Expect:</b> '+c.expect+'</p>';
  const facts=[];
  if(c.best) facts.push(['BEST TIME',esc(c.best)]);
  if(c.time) facts.push(['TIME NEEDED',esc(c.time)]);
  if(c.price) facts.push(['PRICE',esc(c.price)]);
  if(c.hours) facts.push(['HOURS',esc(c.hours)]);
  if(c.closed) facts.push(['CLOSED',esc(c.closed)]);
  if(c.crowd) facts.push(['CROWDS',esc(c.crowd)]);
  if(c.station) facts.push(['STATION',esc(c.station)+(c.exit?' — '+esc(c.exit):'')]);
  if(c.floor) facts.push(['FLOOR / BUILDING',esc(c.floor)]);
  if(c.booking) facts.push(['BOOKING',esc(c.booking)]);
  if(c.access) facts.push(['EFFORT',esc(c.access)]);
  if(c.wear) facts.push(['WEAR / BRING',esc(c.wear)]);
  if(facts.length) inner+=kv(facts);
  if(c.directions&&c.directions.length) inner+='<details class="more"><summary>📍 Step-by-step: finding it</summary><div class="inner"><ol class="steps">'+c.directions.map(s=>'<li>'+s+'</li>').join('')+'</ol></div></details>';
  if(c.guide) inner+='<div class="guide-box" data-label="🎧 Worth a guide">'+c.guide+'</div>';
  if(c.tips) inner+='<div class="info-box" data-label="On the ground" style="margin:12px 0 4px">'+c.tips+'</div>';
  if(c.nearby) inner+='<p style="font-size:11.5px;margin:8px 0 0;font-family:JetBrains Mono,monospace;color:#6b7280">NEARBY: '+esc(c.nearby)+'</p>';
  inner+='<div class="btnrow">'+placeBtns(c)+
    (c.url?'<a class="btn mini" target="_blank" rel="noopener" href="'+c.url+'">↗ OFFICIAL</a>':'')+
    (!c.img?'<a class="btn mini" target="_blank" rel="noopener" href="'+photosUrl(c.name+' '+(c.photoQ||'Japan'))+'">📷 PHOTOS</a>':'')+'</div>';
  if(c.checked) inner+='<div class="lastchecked">Last checked '+esc(c.checked)+(c.confidence?' • '+esc(c.confidence):'')+'</div>';
  return '<details class="xr fade"><summary>'+thumb(c,i)+
    '<div style="flex:1;min-width:0"><div class="nm">'+esc(c.name)+(c.jp?' <span class="jpn">'+esc(c.jp)+'</span>':'')+'</div>'+
    '<div class="ol">'+esc(firstBit(c.why||c.expect||''))+'</div><div style="margin-top:3px">'+tagRow((c.labels&&c.labels.indexOf('🚇 SHORT RIDE')>=0)?['🚇 SHORT RIDE'].concat(c.labels.filter(function(l){return l!=='🚇 SHORT RIDE';})):c.labels,3)+'</div></div>'+
    '<span class="exp">▾</span></summary><div class="inner2">'+inner+'</div></details>';
}

/* ---------- food card: compact row, expands ---------- */
function mealType(f){
  if(f.meal) return f.meal;
  const t=((f.band||'')+' '+(f.cuisine||'')+' '+(f.name||'')+' '+(f.best||'')+' '+(f.why||'')+' '+(f.dishes||'')).toLowerCase();
  if(/karaoke|\bbars?\b|sake|brewery|nightcap|listening bar/.test(t)) return '🍶 DRINKS / BAR';
  if(/lunch|teishoku|shokudo/.test(t)) return '🍜 LUNCH';
  if(/dinner|izakaya|kaiseki|okonomiyaki|supper/.test(t)) return '🌙 DINNER';
  if(/breakfast|bakery|morning set/.test(t)) return '☕ BREAKFAST';
  if(/cake|patisserie|dessert|sweet|wagashi|puff|coffee|kissaten|taiyaki|ohagi|mochi|parfait|pudding|soft serve|snack|tearoom/.test(t)) return '🍰 SNACK / CAKE';
  return '🍽 FOOD';
}
const MEAL_CLS={'☕ BREAKFAST':'book','🍜 LUNCH':'scenic','🌙 DINNER':'food','🍶 DRINKS / BAR':'local','🍰 SNACK / CAKE':'cake','🍽 FOOD':'opt'};
function foodCard(f,i){
  let inner='';
  if(f.why) inner+='<p style="margin:0 0 7px;font-size:13.5px">'+f.why+'</p>';
  if(f.dishes) inner+='<p style="margin:0 0 7px;font-size:12.5px"><b>Order:</b> '+esc(f.dishes)+'</p>';
  inner+='<div style="font-size:12px;border:2px solid #000;padding:7px 9px;background:#fafafa;margin:8px 0">'+
     '<div><b>MICA</b> (no meat; fish &amp; seafood fine): '+esc(f.mica||'ask')+'</div>'+
     '<div style="margin-top:3px"><b>DAD</b> (meat &amp; cooked fish; nothing raw): '+esc(f.dad||'ask')+'</div>'+
     (f.warning?'<div style="margin-top:3px;color:#b91c1c"><b>⚠</b> '+esc(f.warning)+'</div>':'')+'</div>';
  const facts=[];
  if(f.hours) facts.push(['HOURS',esc(f.hours)]);
  if(f.closed) facts.push(['CLOSED',esc(f.closed)]);
  if(f.best) facts.push(['GO',esc(f.best)]);
  if(f.queue) facts.push(['QUEUE',esc(f.queue)]);
  if(f.booking) facts.push(['BOOKING',esc(f.booking)]);
  if(f.station) facts.push(['STATION',esc(f.station)]);
  if(f.floor) facts.push(['WHERE',esc(f.floor)]);
  if(facts.length) inner+=kv(facts);
  if(f.tips) inner+='<p style="font-size:12px;margin:7px 0 0;color:#374151">💡 '+f.tips+'</p>';
  inner+='<div class="btnrow">'+placeBtns(f,f.area)+
    (f.url?'<a class="btn mini" target="_blank" rel="noopener" href="'+f.url+'">↗ MENU / SITE</a>':'')+
    '<a class="btn mini" target="_blank" rel="noopener" href="'+photosUrl(f.name+' '+(f.photoQ||f.area||'Japan')+' food')+'">📷 PHOTOS</a></div>';
  if(f.checked) inner+='<div class="lastchecked">Last checked '+esc(f.checked)+'</div>';
  return '<details class="xr fade"><summary><div class="th thc" style="background:'+phColor(f.name,i)+'">🍽</div>'+
    '<div style="flex:1;min-width:0"><div class="nm">'+esc(f.name)+(f.jp?' <span class="jpn">'+esc(f.jp)+'</span>':'')+'</div>'+
    '<div style="margin:2px 0"><span class="tag '+(MEAL_CLS[mealType(f)]||'opt')+'">'+mealType(f)+'</span>'+(f.band?' <span class="tag est">'+esc(f.band)+'</span>':'')+'</div>'+
    '<div class="ol">'+esc(f.cuisine||'')+(f.price?' • '+esc(f.price):'')+'</div></div>'+
    '<span class="exp">▾</span></summary><div class="inner2">'+inner+'</div></details>';
}


/* ---------- v27: area cards — map with pins, walk strip, carousels, detail sheet ---------- */
function kmBetween(a,b){ var R=6371,dl=(b.lat-a.lat)*Math.PI/180,dn=(b.lng-a.lng)*Math.PI/180,q=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dn/2)*Math.sin(dn/2); return 2*R*Math.asin(Math.sqrt(q)); }
function walkMins(a,b){ return Math.max(1,Math.round(kmBetween(a,b)*1000/80*1.3)); }
function clusterStops(cl){
  var stops=[]; ['activities','explore','shopping','food'].forEach(function(k){ (cl[k]||[]).forEach(function(e){ if(e.lat&&e.lng) stops.push({name:e.name,lat:e.lat,lng:e.lng,kind:k,q:e.mapsQ||e.name}); }); });
  if(stops.length<2) return stops;
  // centre = medoid (the stop closest to all the others); anything over 1.5 km from it is "off this map"
  var best=null,bd=1e9; stops.forEach(function(a){ var t=0; stops.forEach(function(b){ t+=kmBetween(a,b); }); if(t<bd){bd=t;best=a;} });
  stops.forEach(function(s){ s.far = kmBetween(s,best)>1.5; });
  var near=stops.filter(function(s){return !s.far;}), far=stops.filter(function(s){return s.far;});
  // walking order: start from the stop named first in the cluster's ORDER text (or the first activity), then nearest-neighbour
  var start=near[0];
  if(cl.order){ var first=String(cl.order).split(/→|,/)[0].toLowerCase().replace(/[^a-z]/g,''); var hit=near.filter(function(s){ var n=s.name.toLowerCase().replace(/[^a-z]/g,''); return first.length>3&&(n.indexOf(first)>=0||first.indexOf(n.slice(0,6))>=0); })[0]; if(hit) start=hit; }
  var ordered=[start], rest=near.filter(function(s){return s!==start;});
  while(rest.length){ var cur=ordered[ordered.length-1], bi=0, bdist=1e9; rest.forEach(function(s,i){ var dd=kmBetween(cur,s); if(dd<bdist){bdist=dd;bi=i;} }); ordered.push(rest.splice(bi,1)[0]); }
  return ordered.concat(far);
}
function gmapsEmbed(stops){
  var pts=stops.filter(function(s){return !s.far;}).slice(0,9);
  if(!pts.length) return '';
  if(pts.length===1) return 'https://maps.google.com/maps?q='+encodeURIComponent(pts[0].q)+'&z=16&output=embed';
  var s0=pts[0], last=pts[pts.length-1], mids=pts.slice(1,-1);
  var daddr=encodeURIComponent(last.lat+','+last.lng)+(mids.length?'+to:'+mids.map(function(p){return encodeURIComponent(p.lat+','+p.lng);}).join('+to:'):'');
  // waypoints in order: saddr = first, then "to:" hops — Google draws the whole walk with lettered pins
  var d=pts.slice(1).map(function(p){return encodeURIComponent(p.q);});
  return 'https://maps.google.com/maps?saddr='+encodeURIComponent(s0.q)+'&daddr='+d.join('+to:')+'&dirflg=w&output=embed';
}
function gmapsOpen(stops){
  var pts=stops.filter(function(s){return !s.far;}).slice(0,10);
  if(!pts.length) return '#';
  if(pts.length===1) return mapsUrl(pts[0].q);
  var o=pts[0], dst=pts[pts.length-1], wp=pts.slice(1,-1);
  return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(o.q)+'&destination='+encodeURIComponent(dst.q)+(wp.length?'&waypoints='+encodeURIComponent(wp.map(function(p){return p.q;}).join('|')):'')+'&travelmode=walking';
}
function walkStrip(stops){
  var pts=stops.filter(function(s){return !s.far;});
  if(pts.length<2) return '';
  var h='<div class="wstrip">';
  pts.forEach(function(p,i){
    h+='<div class="wstop"><span class="wn '+(p.kind==='food'?'f':'')+'">'+String.fromCharCode(65+i)+'</span><span class="wnm">'+esc(p.name)+'</span></div>';
    if(i<pts.length-1){ var m=walkMins(p,pts[i+1]); h+='<div class="wgap"><i></i><b>'+m+' min</b> '+Math.round(kmBetween(p,pts[i+1])*1000)+' m on foot</div>'; }
  });
  var far=stops.filter(function(s){return s.far;});
  if(far.length){ h+='<div class="wfar">Off this map: '+far.map(function(f){return esc(f.name)+' ('+kmBetween(f,pts[0]).toFixed(1)+' km away)';}).join(' · ')+'</div>'; }
  return h+'</div>';
}
window.__CARDS={};
function carousel(title,color,arr,kind,cid){
  if(!arr||!arr.length) return '';
  var h='<div class="crow"><div class="crh" style="border-color:'+color+'">'+title+' <span class="crn">'+arr.length+'</span></div><div class="cscroll">';
  arr.forEach(function(c,i){
    var id=cid+'-'+kind+'-'+i; window.__CARDS[id]={c:c,kind:kind};
    var img=c.img?'<img loading="lazy" src="'+c.img+'" alt="'+esc(c.name)+'" onerror="this.parentNode.classList.add(\'noimg\');this.remove()">':'';
    var lbl=(c.labels||[]).filter(function(l){return l!=='CORE PLAN';})[0]||'';
    var band=kind==='food'?mealType(c):(c.type||'');
    h+='<div class="ccard'+(c.img?'':' noimg')+'" style="--ph:'+phColor(c.name,i)+'" onclick="openCard(\''+id+'\')">'+img+
       '<div class="cb"><div class="cnm">'+esc(c.name)+'</div><div class="cmeta">'+esc(band)+(lbl?' · '+esc(lbl):'')+'</div>'+
       (c.hours?'<div class="chrs">🕐 '+esc(String(c.hours).split('.')[0].slice(0,38))+'</div>':'')+'</div></div>';
  });
  return h+'</div></div>';
}
window.openCard=function(id){
  var o=window.__CARDS[id]; if(!o) return;
  var html=(o.kind==='food'?foodCard(o.c,0):recCard(o.c,0)).replace('<details class="xr fade">','<details class="xr fade sheetcard" open>');
  var sh=document.getElementById('sheet'); sh.querySelector('.sheetbody').innerHTML=html; sh.classList.add('on'); document.body.style.overflow='hidden';
};
window.closeSheet=function(){ var sh=document.getElementById('sheet'); sh.classList.remove('on'); document.body.style.overflow=''; };
function learnCards(d,cl){
  var out=[];
  ['explore','activities','shopping','food'].forEach(function(k){ (cl[k]||[]).forEach(function(e){ if(e.history||e.guide) out.push({name:e.name,img:e.img,imgCredit:e.imgCredit,labels:['HISTORY'],type:e.history?'THE STORY':'WITH A GUIDE',why:e.history||'',guide:e.guide,history:null,checked:e.checked,mapsQ:e.mapsQ}); }); });
  return out;
}
function areaCard(d,cl,ci,prevSpot){
  var stops=clusterStops(cl);
  var dest=(stops[0]&&stops[0].q)||cl.station||cl.name;
  var nm=cl.name; var opt=/^OPTIONAL|^ALTERNATIVE|^BONUS|^EVENING OPTION|^Plan B|^Rain switch/i.test(nm);
  var h='<details class="area'+(opt?' opt':'')+(ci===0?' first':'')+'"'+(ci===0?' open':'')+'><summary>'+
    '<div class="an"><span class="ai">'+(opt?'◇':String(ci+1))+'</span><div><div class="at">'+esc(nm.replace(/^Cluster\s+[A-Z]\s*—\s*/i,''))+'</div>'+
    '<div class="as">'+(cl.time?'⏱ '+esc(cl.time)+' · ':'')+(stops.length?stops.filter(function(s){return !s.far}).length+' places · ':'')+(cl.walk?esc(cl.walk):'')+'</div></div><span class="exp">▾</span></div>'+
    (cl.why?'<div class="aw">'+cl.why+'</div>':'')+'</summary><div class="abody">';
  var meta=[];
  if(cl.station) meta.push(['GET HERE',esc(cl.station)]);
  if(cl.order) meta.push(['ORDER',esc(cl.order)]);
  if(cl.best) meta.push(['BEST TIME',esc(cl.best)]);
  if(cl.rain) meta.push(['IF RAINING',esc(cl.rain)]);
  if(cl.lower) meta.push(['SHORTER VERSION',esc(cl.lower)]);
  if(cl.skip) meta.push(['SHORT ON TIME? SKIP',esc(cl.skip)]);
  if(meta.length) h+=kv(meta);
  var emb=gmapsEmbed(stops);
  if(emb){
    h+='<div class="amap">'+(navigator.onLine?'<iframe loading="lazy" src="'+emb+'" title="'+esc(nm)+' map"></iframe>':'<div class="map-off">📡 The live map needs signal. The walking list below works offline.</div>')+'</div>';
    h+='<div class="btnrow amapbtns"><a class="btn mini yellow" target="_blank" rel="noopener" href="'+gmapsOpen(stops)+'">🗺️ OPEN IN GOOGLE MAPS</a>'+
       '<a class="btn mini" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent((stops.filter(function(s){return !s.far})[0]||stops[0]).q)+'&travelmode=transit">📍 DIRECTIONS FROM WHERE I AM</a></div>';
    h+=walkStrip(stops);
  } else if(prevSpot){
    h+='<div class="btnrow"><button class="btn mini" onclick="showRoute(\''+encodeURIComponent(prevSpot)+'\',\''+encodeURIComponent(dest)+'\')">🗺️ ROUTE MAP</button></div>';
  }
  var cid='c'+d.id+'-'+ci;
  h+=carousel('SEE','var(--yellow)',cl.explore,'explore',cid);
  h+=carousel('DO','var(--red)',cl.activities,'activities',cid);
  h+=carousel('SHOP','var(--blue)',cl.shopping,'shopping',cid);
  h+=carousel('EAT &amp; DRINK','var(--orange)',cl.food,'food',cid);
  h+=carousel('LEARN','#7c3aed',learnCards(d,cl),'learn',cid);
  return h+'</div></details>';
}

/* ---------- day page ---------- */
function renderDay(idx){
  const d=DAYS[idx]; let h='<div class="dayviews"><a class="on" href="#day/'+d.id+'">📅 DAY VIEW</a><a href="#map">🗺️ MAP</a><a href="#planner">☰ LIST</a></div>';
  var gal=[]; if(d.img) gal.push({u:d.img,t:d.title||d.base,c:d.imgCredit||''});
  (d.clusters||[]).forEach(function(cl){ ['explore','activities','shopping','food'].forEach(function(k){
    (cl[k]||[]).forEach(function(e){ if(e.img) gal.push({u:e.img,t:e.name,c:e.imgCredit||''}); }); }); });
  h+='<div class="dayhero fade"><div class="dh-img"'+(d.img?' onclick="openLB(\''+lbPack(gal)+'\',0)"':'')+'>'+
    (d.img?'<img src="'+d.img+'" alt="'+esc(d.base)+'" onerror="imgFail(this)">':phBlock(d.base,idx))+
    (d.img?'<div class="zoomhint">⤢ TAP TO EXPAND'+(gal.length>1?' · '+gal.length+' PHOTOS':'')+'</div>':'')+
    (d.imgCredit?'<div class="credit">'+esc(d.imgCredit)+'</div>':'')+'</div><div class="dh-body">';
  h+='<div class="mono" style="font-size:11px;color:#6b7280">DAY '+(idx+1)+' OF 18 // '+esc(d.date)+' ('+esc(d.dow)+') // '+esc(d.base.toUpperCase())+'</div>';
  h+='<h2>'+esc(d.title)+'</h2>';
  h+='<div class="mono" style="font-size:12px;font-weight:700;color:#374151">'+esc(d.strapline||'')+'</div>';
  const paceTag=(d.pace||'').split(/\s+—|,/)[0].trim(), walkTag=(d.walking||'').split(/\s+—|,/)[0].trim();
  h+='<div class="dtags" style="margin:9px 0 0">'+
    (paceTag?'<span class="tag low">PACE: '+esc(paceTag.toUpperCase())+'</span>':'')+
    (walkTag?'<span class="tag rain">WALKING: '+esc(walkTag.toUpperCase())+'</span>':'')+
    (d.travelDay?'<span class="tag book">TRAVEL DAY</span>':'')+'</div>';
  h+='<p style="font-size:14.5px;font-weight:600;margin:12px 0 0;line-height:1.5">'+d.summary+'</p>';
  if(d.short&&d.short.length){ h+='<div class="shortbox"><div class="shl">TODAY IN SHORT</div><ol>'+d.short.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>'+(d.swap?'<div class="shs"><b>If you\'d rather:</b> '+esc(d.swap)+'</div>':'')+'</div>'; }
  if(d.anchor&&!/^none/i.test(d.anchor)) h+='<div class="anchorline">📌 TIMED TODAY: '+esc(d.anchor)+'</div>';
  if(d.shape){
    const steps=t=>String(t||'').split(/\s*→\s*/).map(x=>'<div class="step">'+x+'</div>').join('');
    h+='<details class="shapex"><summary>🧭 A suggested order of play <span class="exp">▾</span></summary><div class="tl">'+
      '<div class="tln"><span class="plabel">MORNING</span>'+steps(d.shape.m)+'</div>'+
      '<div class="tln"><span class="plabel">AFTERNOON</span>'+steps(d.shape.a)+'</div>'+
      '<div class="tln" style="padding-bottom:2px"><span class="plabel">EVENING</span>'+steps(d.shape.e)+'</div></div>';
    if(d.shape.flex) h+='<div class="flexline">↔ <b>If the day overflows:</b> '+d.shape.flex+'</div>';
    h+='</details>';
  }
  h+='<div class="wsline">🛏 WAKE: '+esc(d.wake)+'  →  SLEEP: '+esc(d.sleep)+'</div>';
  h+='</div></div>';
  if(d.alert) h+='<div class="warn-box" data-label="Heads up">'+d.alert+'</div>';
  h+='<details class="aboutx"><summary><span class="axl">'+(d.aboutLabel||'About this place')+'</span><span class="axm">TAP TO READ</span><span class="exp">▾</span></summary>'+
     '<div class="axbody">'+d.about+
     (d.deeper?'<div class="axmore">'+d.deeper+'</div>':'')+
     (d.holiday?'<div style="margin-top:10px;border-top:2px dashed #15803d;padding-top:8px"><b>'+esc(d.holidayName||'Holiday lens')+':</b> '+d.holiday+'</div>':'')+
     '</div></details>';
  if(d.notice&&d.notice.length) h+='<div class="info-box" data-label="💡 Tips of the day"><ul style="margin:0;padding-left:18px">'+d.notice.map(n=>'<li style="margin:4px 0">'+n+'</li>').join('')+'</ul></div>';
  if(d.travel&&d.travel.length){
    let tinner='';
    d.travel.forEach(t=>{
      tinner+='<div class="legblk"><div class="lt">'+esc(t.route)+' '+flexTag(legFlex(d,t))+'</div>';
      if(t.what) tinner+='<p style="margin:6px 0 8px;font-size:13px"><b>'+esc(t.service)+'</b> — '+t.what+'</p>';
      tinner+=kv([['LEAVE',t.leave&&esc(t.leave)],['DURATION',t.duration&&esc(t.duration)],['CHANGES',t.changes!=null?esc(t.changes):null],
        ['FREQUENCY',t.freq&&esc(t.freq)],['PRICE',t.price&&esc(t.price)],['STATUS',t.status&&esc(t.status)],
        ['TICKETS',t.tickets&&esc(t.tickets)],['SEATS',t.seats&&esc(t.seats)],['LUGGAGE',t.luggage&&esc(t.luggage)],['SCENERY',t.scenic&&esc(t.scenic)]]);
      if(t.steps&&t.steps.length) tinner+='<details class="more"><summary>📍 Step-by-step</summary><div class="inner"><ol class="steps">'+t.steps.map(x=>'<li>'+x+'</li>').join('')+'</ol></details>'.replace('</ol></details>','</ol></div></details>');
      if(t.alt) tinner+='<p style="font-size:12.5px;margin:9px 0 0"><b>Plan B:</b> '+t.alt+'</p>';
      if(t.missed) tinner+='<p style="font-size:12.5px;margin:6px 0 0"><b>If it goes wrong:</b> '+t.missed+'</p>';
      tinner+='<div class="btnrow">'+(t.live?'<a class="btn mini red" target="_blank" rel="noopener" href="'+t.live+'">🕐 LIVE TIMES</a>':'')+
        (t.bookUrl?'<a class="btn mini yellow" target="_blank" rel="noopener" href="'+t.bookUrl+'">🎫 BOOK / CHECK</a>':'')+
        (t.mapFrom&&t.mapTo?'<a class="btn mini" target="_blank" rel="noopener" href="'+dirUrl(t.mapFrom,t.mapTo)+'">🗺️ ROUTE</a>':'')+'</div>'+
        (t.live&&/jorudan/.test(t.live)?'<p style="font-size:11px;color:#6b7280;margin:6px 0 0;font-family:JetBrains Mono,monospace">LIVE TIMES opens Jorudan (Japanese, but the times and platform numbers read the same) pre-filled with this exact day and leg. For disruptions: <a href="https://trafficinfo.westjr.co.jp/en/" target="_blank" rel="noopener">JR West status</a> · <a href="https://traininfo.jr-central.co.jp/shinkansen/sp/en/ti08.html" target="_blank" rel="noopener">JR Central status</a></p>':'')+'</div>';
    });
    const t0=d.travel[0];
    h+='<details class="secx blue"><summary><h3>🚄 Today\'s Travel</h3><div class="sub">'+esc(d.travelSub||t0.route)+(d.travel.length>1?' • '+d.travel.length+' legs':'')+' — tap to open</div><span class="exp">▾</span></summary><div class="secbody">'+tinner+'</div></details>';
  }
  const H=d.hotel;
  if(H){
    let inner='';
    if(H.desc) inner+='<p style="font-size:13.5px;margin:0 0 8px">'+H.desc+'</p>';
    inner+=kv([['ADDRESS',esc(H.addr)+' <button class="copybtn" onclick="event.stopPropagation();copyTxt(\''+esc(H.addr).replace(/'/g,"\\'")+'\',this)">COPY</button>'],
      ['日本語住所',H.jpAddr?esc(H.jpAddr)+' <button class="copybtn" onclick="event.stopPropagation();copyTxt(\''+esc(H.jpAddr).replace(/'/g,"\\'")+'\',this)">COPY</button>':null],
      ['PHONE',H.phone&&('<a href="tel:'+String(H.phone).replace(/[^+0-9]/g,'')+'">'+esc(H.phone)+'</a>')],
      ['CHECK-IN',H.checkin&&esc(H.checkin)],['CHECK-OUT',H.checkout&&esc(H.checkout)],
      ['ROOMS',H.rooms&&esc(H.rooms)],['MEALS',H.meals&&esc(H.meals)],
      ['NEARBY',H.nearby&&esc(H.nearby)],['GETTING BACK',H.back&&esc(H.back)],['LATE ARRIVAL',H.late&&esc(H.late)]]);
    if(H.note) inner+='<div class="info-box" data-label="Stay notes">'+H.note+'</div>';
    inner+='<div class="btnrow"><button class="btn mini" onclick="showMap(\''+encodeURIComponent(H.mapsQ||H.name)+'\')">🗺️ VIEW ON MAP</button>'+
      (H.url?'<a class="btn mini" target="_blank" rel="noopener" href="'+H.url+'">↗ OFFICIAL SITE</a>':'')+'</div>';
    h+='<details class="secx blue"><summary><h3>🏨 Tonight\'s Base</h3><div class="sub">'+esc(H.name)+' — tap for address, check-in and stay notes</div><span class="exp">▾</span></summary><div class="secbody">'+
      '<div class="hrow"><div class="th thc" style="background:#000">🏨</div>'+
      '<div style="flex:1;min-width:0"><div class="nm">'+esc(H.name)+'</div><div class="ol">'+esc(H.checkin?('Check-in '+H.checkin):'')+'</div>'+
      '<div style="margin-top:3px"><span class="tag '+(String(H.status).indexOf('BOOKED')>=0?'ok':'warn')+'">'+esc(H.status)+'</span></div></div></div>'+inner+'</div></details>';
  }
  const clusters=(d.clusters||[]).map(c=>Object.assign({},c));
  if(d.cake){
    let target=null;
    for(let j=clusters.length-1;j>=0;j--){ if(clusters[j].food&&clusters[j].food.length){ target=clusters[j]; break; } }
    if(!target&&clusters.length){ target=clusters[clusters.length-1]; target.food=(target.food||[]).slice(); }
    if(target){ const ck=Object.assign({},d.cake); ck.band=(ck.band?ck.band+' • ':'')+"TODAY'S CAKE 🍰"; target.food=(target.food||[]).concat([ck]); }
  }
  let prevSpot=(H&&(H.mapsQ||H.name))||d.wake||'';
  h+='<div class="sec"><h3>Areas today</h3><div class="sub">Each one is a walkable patch. Open it for the map, the walking order and what is there — see, do, eat, learn. Pick on the day.</div></div>';
  clusters.forEach((cl,ci)=>{ h+=areaCard(d,cl,ci,prevSpot); });
  h+='<div class="btnrow" style="margin-top:26px">'+
     (idx>0?'<a class="btn" style="flex:1" href="#day/'+DAYS[idx-1].id+'">← '+esc(DAYS[idx-1].date)+'</a>':'')+
     (idx<DAYS.length-1?'<a class="btn red" style="flex:1" href="#day/'+DAYS[idx+1].id+'">'+esc(DAYS[idx+1].date)+' →</a>':'')+'</div>';
  app.innerHTML=h;
}
function dayMapBlock(d,clusters){
  const places=[];
  (clusters||d.clusters||[]).forEach(cl=>{['explore','activities','shopping'].forEach(k=>(cl[k]||[]).forEach(c=>places.push({n:c.name,q:c.mapsQ||c.name+' '+(c.addr||'Japan'),a:c.addr})));
    (cl.food||[]).forEach(f=>places.push({n:f.name,q:f.mapsQ||f.name+' '+(f.area||'Japan'),a:f.addr}));});
  if(d.hotel) places.unshift({n:d.hotel.name+' (HOTEL)',q:d.hotel.mapsQ||d.hotel.name,a:d.hotel.addr});
  let h='<div class="mapframe">'+(navigator.onLine?'<iframe id="dmap" loading="lazy" src="https://maps.google.com/maps?q='+encodeURIComponent((places[0]||{q:d.base+' Japan'}).q)+'&z=14&output=embed"></iframe>':'<div class="map-off">📡 The live map needs signal.<br>All addresses and written directions above still work offline.</div>')+'</div>';
  h+='<p style="font-size:11px;font-family:JetBrains Mono,monospace;color:#6b7280;margin:0 0 10px">TAP A PLACE TO FOCUS THE MAP • DETAILS LIVE IN THE CARDS ABOVE</p>';
  places.forEach(p=>{ h+='<div class="pin-row"><div><div class="n">'+esc(p.n)+'</div>'+(p.a?'<div class="a">'+esc(p.a)+'</div>':'')+'</div>'+
    '<div style="display:flex;gap:6px">'+
    '<button class="copybtn" onclick="copyTxt(\''+esc(p.a||p.n).replace(/'/g,"\\'")+'\',this)">COPY</button>'+
    '<button class="copybtn" onclick="var f=document.getElementById(\'dmap\'); if(f) f.src=\'https://maps.google.com/maps?q='+encodeURIComponent(p.q).replace(/'/g,"\\'")+'&z=16&output=embed\'; window.scrollTo({top:document.querySelector(\'.mapframe\').offsetTop-140,behavior:\'smooth\'})">FOCUS</button>'+
    '<a class="copybtn" style="text-decoration:none" target="_blank" rel="noopener" href="'+mapsUrl(p.q)+'">OPEN ↗</a></div></div>'; });
  return h;
}


/* ---------- TRIP PLANNER: everything, filterable by tag ---------- */
const PLAN_CATS=[
 {k:'history', n:'History & learning', i:'⛩️'},
 {k:'culture', n:'Culture', i:'🎎'},
 {k:'food',    n:'Food',    i:'🍜'},
 {k:'drink',   n:'Drink',   i:'🍶'},
 {k:'weird',   n:'Weird & memorable', i:'🛸'},
 {k:'nature',  n:'Nature',  i:'🌿'},
 {k:'travel',  n:'Travel experiences', i:'🚞'},
 {k:'craft',   n:'Shopping & craft', i:'🧵'},
 {k:'view',    n:'Views',   i:'🌇'},
 {k:'free',    n:'Free',    i:'💸'},
 {k:'rain',    n:'Rain-friendly', i:'☔'},
 {k:'book',    n:'Needs booking', i:'📌'},
 {k:'easy',    n:'Low energy', i:'🪑'}
];
function planTags(e,kind){
  const nm=((e.name||'')+' '+(e.type||'')+' '+(e.band||'')+' '+(e.cuisine||'')).toLowerCase();
  const why=(e.why||'').toLowerCase();
  const L=(e.labels||[]).join(' ').toUpperCase();
  const t=[];
  if(/temple|shrine|museum|castle|zen|samurai|architect|preserved|post town|gallery|historic|monument|checkpoint/.test(nm)||/HISTORY|CULTURE/.test(L)) t.push('history');
  if(/tea|matcha|ceremon|kabuki|sumo|geisha|maiko|kimono|calligraph|dye|lacquer|pottery|ceramic|craft|festival|zazen|cooking class/.test(nm)||/CULTURE/.test(L)) t.push('culture');
  if(kind==='food'&&!/bar\b|sake|whisky|cocktail|izakaya|brewery|karaoke|drinks/.test(nm)) t.push('food');
  if(/bar\b|sake|whisky|cocktail|nomihodai|izakaya|brewery|karaoke|listening bar|dagashi bar/.test(nm)||/DRINKS/.test((e.band||'').toUpperCase())) t.push('drink');
  if(/robot|monster|muscle|kart|dagashi|figurine|masked|teamlab|magician|ninja|dinosaur|go-kart|small worlds/.test(nm)||/GLORIOUSLY WEIRD|BIZARRE/.test(L)) t.push('weird');
  if(/garden|forest|bamboo|gorge|valley|park|moss|bay|trail|waterfall|beach|island|river|mountain|onsen/.test(nm)||/NATURE/.test(L)) t.push('nature');
  if(/train|boat|ferry|cable|ropeway|funicular|bicycle|bike|torokko|shinkansen|monorail|kart|sea taxi|cruise|rickshaw|railway/.test(nm)) t.push('travel');
  if(/shop|market|antique|embroider|knife|vintage|secondhand|souvenir|omiyage|flea|arcade|department|record|street\b|studio/.test(nm)||/SHOPPING/.test(L)) t.push('craft');
  if(/view|panoram|observat|skyline|sunset|lookout|terrace|rooftop|deck|tower|skyway/.test(nm)||/\bview\b/.test(why.slice(0,90))) t.push('view');
  if(/FREE/.test(L)) t.push('free');
  if(/RAIN FRIENDLY/.test(L)) t.push('rain');
  if(/BOOK AHEAD/.test(L)||/required|reservation only|no walk-ins/i.test(e.booking||'')) t.push('book');
  if(/LOWER ENERGY/.test(L)) t.push('easy');
  return t;
}
function renderPlanner(){
  const rows=[];
  DAYS.forEach(function(d){
    (d.clusters||[]).forEach(function(c){
      ['explore','activities','shopping','food'].forEach(function(k){
        (c[k]||[]).forEach(function(e){
          rows.push({d:d, c:c, e:e, kind:k, tags:planTags(e,k)});
        });
      });
    });
  });
  let h='<div class="sec pink"><h3>🧭 Trip Planner</h3><div class="sub">Everything on the trip in one place — '+rows.length+' things to do, filterable. Tap a tag to narrow it down</div></div>';
  h+='<div class="pfilters" id="pfilters">';
  h+='<button class="pf on" data-k="all" onclick="planFilter(\'all\')">ALL <span class="pn">'+rows.length+'</span></button>';
  PLAN_CATS.forEach(function(cat){
    const n=rows.filter(function(r){return r.tags.indexOf(cat.k)>=0;}).length;
    if(!n) return;
    h+='<button class="pf" data-k="'+cat.k+'" onclick="planFilter(\''+cat.k+'\')">'+cat.i+' '+cat.n.toUpperCase()+' <span class="pn">'+n+'</span></button>';
  });
  h+='</div>';
  h+='<div id="planrows">';
  rows.forEach(function(r,ix){
    const e=r.e;
    const opt=/^OPTIONAL|^ALTERNATIVE|^BONUS|^EVENING OPTION|^Plan B/i.test(r.c.name);
    h+='<div class="prow" data-tags="'+r.tags.join(' ')+'">'+
      '<div class="pday"><a href="#day/'+r.d.id+'">'+esc(r.d.date)+'</a><span>'+esc(r.d.dow)+'</span></div>'+
      '<div class="pmain"><div class="pnm">'+esc(e.name)+(e.jp?' <span class="jpn">'+esc(e.jp)+'</span>':'')+
        (opt?' <span class="tag opt">OPTION</span>':'')+'</div>'+
        '<div class="pwhy">'+esc(firstBit(e.why||e.expect||''))+'</div>'+
        '<div class="ptags">'+r.tags.map(function(t){
            const c=PLAN_CATS.filter(function(x){return x.k===t;})[0];
            return c?'<span class="ptag">'+c.i+' '+esc(c.n)+'</span>':'';}).join('')+'</div>'+
        (e.hours?'<div class="phrs">🕐 '+esc(e.hours)+'</div>':'')+
        (e.closed?'<div class="phrs cl">⛔ '+esc(e.closed)+'</div>':'')+
      '</div></div>';
  });
  h+='</div>';
  h+='<div class="info-box" data-label="What the tags mean">Tags are worked out from what each place actually is, so something can carry several — the Sagano Romantic Train is both <b>travel experience</b> and <b>nature</b>. <b>OPTION</b> means it sits in an optional cluster: a choice for the day, not a commitment.</div>';
  return h;
}
window.planFilter=function(k){
  document.querySelectorAll('#pfilters .pf').forEach(function(b){ b.classList.toggle('on', b.dataset.k===k); });
  let shown=0;
  document.querySelectorAll('#planrows .prow').forEach(function(r){
    const ok = k==='all' || (' '+r.dataset.tags+' ').indexOf(' '+k+' ')>=0;
    r.style.display = ok?'':'none'; if(ok) shown++;
  });
  window.scrollTo({top:0,behavior:'smooth'});
};

/* ---------- home (v53, design B) ---------- */
const BASES=[['KYOTO','2026-09-19','2026-09-21'],['OSAKA','2026-09-22','2026-09-22'],['ARASHIYAMA','2026-09-23','2026-09-24'],['INE','2026-09-25','2026-09-26'],['KISO','2026-09-28','2026-09-30'],['TOKYO','2026-10-01','2026-10-05']];
function goInfo(){ const st=tripState(); const ci=currentDayIndex(); const i=st==='during'&&ci>=0?ci:(st==='after'?DAYS.length-1:0); const d=DAYS[i];
  return {i:i, label:(st==='after'?'BACK TO':'GO TO'), day:'DAY '+(i+1), sub:d.dow.slice(0,3)+' '+d.date+' · '+d.base, href:'#day/'+d.id}; }
function countdown(){ const st=tripState(); const t=jstDateStr();
  const between=(a,b)=>Math.round((new Date(b+'T00:00:00Z')-new Date(a+'T00:00:00Z'))/86400000);
  if(st==='before') return {n:between(t,DAYS[0].iso), t:'DAYS UNTIL JAPAN'};
  if(st==='during'){ const i=currentDayIndex(); const left=DAYS.length-1-i; return {n:i+1, t:'OF 18 · '+(left===0?'LAST DAY':left+' DAYS LEFT')}; }
  return {n:'✓', t:'TOUR COMPLETE · おかえりなさい'}; }
function glanceKind(t){ const s=((t.service||'')+' '+(t.route||'')).toLowerCase();
  if(/air china|british airways|ba6/.test(s)) return 'flight';
  if(/haruka|hashidate|nozomi|shinano|aoniyoshi|shinkansen|rapid|jr |line|kintetsu|keikyu|metro|locals/.test(s)) return 'train';
  return 'transfer'; }
function glanceRows(){ const rows=[]; let lastHotel=null;
  DAYS.forEach(function(d,i){ (d.travel||[]).forEach(function(t){ const k=glanceKind(t); const fx=legFlex(d,t);
      rows.push({k:k,d:d.date,day:i+1,id:d.id,what:(t.service||'').split(' — ')[0].split(' (')[0],route:t.route,tag:(k==='flight'?'<span class="tag ok">BOOKED</span>':flexTag(fx))}); });
    if(d.hotel&&d.hotel.name!==lastHotel){ lastHotel=d.hotel.name; let j=i; while(j+1<DAYS.length&&DAYS[j+1].hotel&&DAYS[j+1].hotel.name===lastHotel) j++;
      rows.push({k:'hotel',d:d.date+(j>i?' – '+DAYS[j].date:''),day:i+1,id:d.id,what:d.hotel.name,route:(j-i+1)+' night'+(j>i?'s':''),tag:'<span class="tag ok">BOOKED</span>'}); }
  }); return rows; }
window.GLANCE_FILTER='all';
window.renderGlance=function(){ const F=window.GLANCE_FILTER; const rows=glanceRows().filter(function(r){return F==='all'||r.k===F;});
  return '<div class="gf">'+['all','flight','hotel','train','transfer'].map(function(k){return '<button class="'+(F===k?'on':'')+'" onclick="GLANCE_FILTER=\''+k+'\';document.getElementById(\'glance\').innerHTML=renderGlance()">'+(k==='all'?'ALL':k+'s')+'</button>';}).join('')+'</div>'+
  '<div style="overflow-x:auto"><table class="simple mini gl"><tr><th>DATE</th><th>WHAT</th><th>DETAIL</th><th></th></tr>'+
  rows.map(function(r){return '<tr onclick="location.hash=\'day/'+r.id+'\'" style="cursor:pointer"><td style="white-space:nowrap"><span class="k '+r.k+'"></span>'+esc(r.d)+'</td><td><b>'+esc(r.what)+'</b></td><td>'+esc(r.route)+'</td><td>'+r.tag+'</td></tr>';}).join('')+'</table></div>'+
  '<div class="legend">'+flexTag('must')+' only train that works, or your seat is on it &nbsp; '+flexTag('res')+' booked seat, swappable &nbsp; '+flexTag('fixed')+' no booking, but gaps — aim for the one named &nbsp; '+flexTag('go')+' take the next one &nbsp; '+flexTag('arr')+' sorted with a person, not a timetable</div>'; };
function renderHome(){
  const st=tripState(), g=goInfo(), c=countdown(), t=jstDateStr();
  let h='<div class="hero fade"><div class="himg b"><img src="images/hero.jpg" alt="Mica and Dad in Japan" onerror="this.style.display=\'none\'">'+
    '<div class="grad"></div><div class="sticker"><div class="n">'+c.n+'</div><div class="t">'+c.t+'</div></div><div class="ht"><h1>LAMPTEYS<br><span class="y">ON TOUR</span></h1></div></div>';
  h+='<div class="hbody">';
  h+='<a class="goround" href="'+g.href+'"><div class="k">'+g.label+'</div><div class="d">'+g.day+'</div><div class="ar">→</div></a>';
  h+='<div class="gosub">'+esc(g.sub)+'</div>';
  h+='<div class="datebar">JAPAN 2026 • MICA &amp; DAD</div>';
  h+='<div class="mono" style="font-weight:700;font-size:12px;margin:6px 0 4px">18 SEP – 5 OCT • LONDON → OSAKA (KIX) ⇢ TOKYO (HND) → LONDON</div>';
  h+='<div class="route">'+BASES.map(function(b){ const on=st==='during'&&t>=b[1]&&t<=b[2]; return '<span class="stop'+(on?' now':'')+'">'+b[0]+'</span>'; }).join('')+'</div>';
  h+='<div class="views">OR SEE THE WHOLE TRIP AS A <a href="#map">🗺️ MAP</a><a href="#planner">☰ LIST</a></div>';
  h+='<div class="ctas"><a class="c-ph" href="#phrases">Handy Japanese phrases!<small>Tap a phrase to show it big</small></a><a class="c-et" href="#etiquette">Learn the etiquette<small>Ten things before you land</small></a></div>';
  h+='</div></div>';
  h+='<div class="sec"><h3>The tour at a glance</h3><div class="sub">16 nights · 6 bases · every flight, stay, train and transfer — tap a row for the day</div></div>';
  h+='<div id="glance">'+renderGlance()+'</div>';
  h+='<div class="hist-box" data-label="Silver Week — why our first five days are special">'+P.silverWeek+'</div>';
  h+='<div class="narr" data-label="How we eat" style="box-shadow:6px 6px 0 var(--orange)">'+P.howWeEat+'</div>';
  app.innerHTML=h;
}

/* ---------- nav & routing ---------- */
window.toggleMenu=function(){ document.getElementById('menu').classList.toggle('open'); };
function renderSubnav(){ const g=goInfo(); const el=document.getElementById('m-guide-s'); if(el) el.textContent=g.day; document.getElementById('menu').classList.remove('open'); }
function renderDaynav(activeIdx){
  daynav.style.display='flex';
  daynav.innerHTML=DAYS.map((d,i)=>'<div class="dtab'+(i===activeIdx?' active':'')+'" onclick="location.hash=\'day/'+d.id+'\'">'+
    
    '<div>'+d.date+'</div><div class="c">'+d.chip+'</div></div>').join('');
  const el=daynav.children[activeIdx]; if(el) el.scrollIntoView({inline:'center',block:'nearest'});
}
function route(){
  const hash=location.hash||'#home';
  daynav.style.display='none';
  window.scrollTo(0,0);
  if(hash.startsWith('#day/')){
    const id=hash.slice(5); let idx=DAYS.findIndex(d=>d.id===id); if(idx<0) idx=0;
    renderSubnav('#guide'); renderDaynav(idx); renderDay(idx);
  } else if(hash==='#guide'){ const ci=currentDayIndex(); location.hash='day/'+DAYS[ci>=0?ci:0].id; return; }
  else if(hash==='#planner'){ renderSubnav(hash); app.innerHTML=renderPlanner(); }
  else if(/^#(lists|mica|mark|todo|bookings|packing)$/.test(hash)){ renderSubnav('#packing'); app.innerHTML=P.renderLists(); }
  else if(hash==='#budget'){ renderSubnav(hash); app.innerHTML=P.renderBudget(); }
  else if(hash==='#etiquette'){ renderSubnav(hash); app.innerHTML=P.renderEtiquette(); }
  else if(hash==='#phrases'){ renderSubnav(hash); app.innerHTML=P.renderPhrases(); }
  else if(hash==='#map'){ renderSubnav(hash); app.innerHTML=P.renderMap(DAYS); }
  else { renderSubnav('#home'); renderHome(); }
}
window.addEventListener('hashchange',function(){ var bp=document.getElementById('bigphrase'); if(bp) bp.style.display='none'; route(); });
window.REC=recCard; window.FOODC=foodCard; window.TAGROW=tagRow; window.KV=kv; window.ESC=esc; window.MAPS=mapsUrl;
route();
})();
