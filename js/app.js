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
/* ---- Google Places photos (12 Sep): live when online, Commons/none as fallback ---- */
window.GKEY='AIzaSyAClHP_O_NyrjkZ5OYRkQct-8EFOKo3Owc';
function gpic(c){ const g=(window.GPHOTOS||{})[c.name]; if(!g||!navigator.onLine) return null; return {u:'https://places.googleapis.com/v1/'+g.ph+'/media?maxWidthPx=900&maxHeightPx=900&key='+window.GKEY, c:'Photo: '+(g.a||'Google Maps contributor')+' via Google Maps'}; }
function picOf(c){ const g=gpic(c); if(g) return {u:g.u,c:g.c,fb:c.img||''}; if(c.img) return {u:c.img,c:c.imgCredit||'',fb:''}; return null; }
window.picFail=function(el){ const fb=el.getAttribute('data-fb'); if(fb){ el.removeAttribute('data-fb'); el.src=fb; return; } if(el.classList.contains('th')) imgFail(el); else { el.parentNode.classList.add('noimg'); el.remove(); } };
function thumb(c,i){
  const P=picOf(c); if(P) return '<img class="th" loading="lazy" src="'+P.u+'"'+(P.fb?' data-fb="'+P.fb+'"':'')+' alt="'+esc(c.name)+'" onerror="picFail(this)" onclick="event.preventDefault();event.stopPropagation();openLB(\''+lbPack([{u:this&&this.src||P.u,t:c.name,c:P.c}])+'\',0)">';
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
    (!picOf(c)?'<a class="btn mini" target="_blank" rel="noopener" href="'+photosUrl(c.name+' '+(c.photoQ||'Japan'))+'">📷 PHOTOS</a>':'')+'</div>';
  /* 'Last checked' audit lines hidden (12 Sep) */
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
    var P=picOf(c); var img=P?'<img loading="lazy" src="'+P.u+'"'+(P.fb?' data-fb="'+P.fb+'"':'')+' alt="'+esc(c.name)+'" onerror="picFail(this)">':'';
    var lbl=(c.labels||[]).filter(function(l){return l!=='CORE PLAN';})[0]||'';
    var band=kind==='food'?mealType(c):(c.type||'');
    h+='<div class="ccard'+(P?'':' noimg')+'" style="--ph:'+phColor(c.name,i)+'" onclick="openCard(\''+id+'\')">'+img+
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
window.openHtmlSheet=function(k){ var html=(window.__SHEETS||{})[k]; if(!html) return; var sh=document.getElementById('sheet'); sh.querySelector('.sheetbody').innerHTML='<div class="sheetplain">'+html+'</div>'; sh.classList.add('on'); document.body.style.overflow='hidden'; };
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
  var h='<details class="area'+(opt?' opt':'')+(ci===0?' first':'')+'"><summary>'+
    '<div class="an"><span class="ai">'+(opt?'◇':String(ci+1))+'</span><div><div class="at">'+esc(nm.replace(/^Cluster\s+[A-Z]\s*—\s*/i,''))+'</div>'+
    '<div class="as">'+(cl.time?'⏱ '+esc(cl.time)+' · ':'')+(stops.length?stops.filter(function(s){return !s.far}).length+' places · ':'')+(cl.walk?esc(cl.walk):'')+'</div></div><span class="exp"><span class="exp-o">TAP TO OPEN ▾</span><span class="exp-c">CLOSE ▴</span></span></div>'+
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
  { const ch=chapterOf(idx), sub=subOf(idx);
    h+='<div class="chline"><span class="cp '+ch.k+'">'+ch.n+(ch.k==='f'?'':' CHAPTER')+'</span>'+(sub?'<span class="cp away '+sub.cls+'">'+sub.t+'</span>':'')+'<span>DAY '+(idx+1)+' OF 18 · '+esc(d.dow.slice(0,3).toUpperCase())+' '+esc(d.date)+'</span></div>';
    if(idx>=5&&idx<=8) h+='<div class="awaysticker">🎒 Small bag only<small>Big cases stay at Henn na Kyoto until Sunday · 4 nights away</small></div>'; }
  h+='<h2>'+esc(d.title)+'</h2>';
  h+='<div class="mono" style="font-size:12px;font-weight:700;color:#374151">'+esc(d.strapline||'')+'</div>';
  const paceTag=(d.pace||'').split(/\s+—|,/)[0].trim(), walkTag=(d.walking||'').split(/\s+—|,/)[0].trim();
  h+='<div class="dtags" style="margin:9px 0 0">'+
    (paceTag?'<span class="tag low">PACE: '+esc(paceTag.toUpperCase())+'</span>':'')+
    (walkTag?'<span class="tag rain">WALKING: '+esc(walkTag.toUpperCase())+'</span>':'')+
    (d.travelDay?'<span class="tag book">TRAVEL DAY</span>':'')+'</div>';
  h+='<p style="font-size:14.5px;font-weight:600;margin:12px 0 0;line-height:1.5">'+d.summary+'</p>';
  if(d.short&&d.short.length){ h+='<ol class="short">'+d.short.map((x,i)=>'<li><span class="sn">'+(i+1)+'</span><span>'+esc(x)+'</span></li>').join('')+'</ol>'+(d.swap?'<p class="swap"><b>If you\'d rather:</b> '+esc(d.swap)+'</p>':''); }
  h+='__TILES__';
  if(d.anchor&&!/^none/i.test(d.anchor)) h+='<div class="anchorline">📌 TIMED TODAY: '+esc(d.anchor)+'</div>';
  const S2=!!window.SITE2; const SH={};
  if(d.shape){
    const steps=t=>String(t||'').split(/\s*→\s*/).map(x=>'<div class="step">'+x+'</div>').join('');
    let sh='<div class="tl">'+
      '<div class="tln"><span class="plabel">MORNING</span>'+steps(d.shape.m)+'</div>'+
      '<div class="tln"><span class="plabel">AFTERNOON</span>'+steps(d.shape.a)+'</div>'+
      '<div class="tln" style="padding-bottom:2px"><span class="plabel">EVENING</span>'+steps(d.shape.e)+'</div></div>';
    if(d.shape.flex) sh+='<div class="flexline">↔ <b>If the day overflows:</b> '+d.shape.flex+'</div>';
    if(S2) SH.order='<h3 class="sht">🧭 Order of play</h3>'+sh; else h+='<details class="shapex"><summary>🧭 A suggested order of play <span class="exp">▾</span></summary>'+sh+'</details>';
  }
  h+='<div class="wsline">🛏 WAKE: '+esc(d.wake)+'  →  SLEEP: '+esc(d.sleep)+'</div>';
  h+='</div></div>';

  { const ab='<div class="axbody">'+d.about+
     (d.deeper?'<div class="axmore">'+d.deeper+'</div>':'')+
     (d.holiday?'<div style="margin-top:10px;border-top:2px dashed #15803d;padding-top:8px"><b>'+esc(d.holidayName||'Holiday lens')+':</b> '+d.holiday+'</div>':'')+
     '</div>';
    if(S2) SH.about='<h3 class="sht">'+esc(d.aboutLabel||'About this place')+'</h3>'+ab; else h+='<details class="aboutx"><summary><span class="axl">'+(d.aboutLabel||'About this place')+'</span><span class="axm">TAP TO READ</span><span class="exp">▾</span></summary>'+ab+'</details>'; }

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
    const tsub=esc(d.travelSub||t0.route)+(d.travel.length>1?' • '+d.travel.length+' legs':'');
    if(S2) SH.travel={sub:tsub, html:'<h3 class="sht">🚄 Today\'s travel</h3><div class="sub" style="margin-bottom:12px">'+tsub+'</div>'+tinner};
    else h+='<details class="secx blue"><summary><h3>🚄 Today\'s Travel</h3><div class="sub">'+tsub+' — tap to open</div><span class="exp">▾</span></summary><div class="secbody">'+tinner+'</div></details>';
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
    const hbody='<div class="secbody">'+
      '<div class="hrow">'+thumb(H,idx)+
      '<div style="flex:1;min-width:0"><div class="nm">'+esc(H.name)+'</div><div class="ol">'+esc(H.checkin?('Check-in '+H.checkin):'')+'</div>'+
      '<div style="margin-top:3px"><span class="tag '+(String(H.status).indexOf('BOOKED')>=0?'ok':'warn')+'">'+esc(H.status)+'</span></div></div></div>'+inner+'</div>';
    if(S2){ const P=picOf(H); SH.base={name:H.name, pic:P, html:'<h3 class="sht">🏨 Tonight\'s base</h3>'+hbody}; }
    else h+='<details class="secx blue"><summary><h3>🏨 Tonight\'s Base</h3><div class="sub">'+esc(H.name)+' — tap for address, check-in and stay notes</div><span class="exp">▾</span></summary>'+hbody+'</details>';
  }
  if(S2){
    window.__SHEETS={travel:SH.travel&&SH.travel.html, base:SH.base&&SH.base.html, order:SH.order, about:SH.about};
    let tiles='';
    if(SH.travel) tiles+='<button class="tile t-travel" onclick="openHtmlSheet(\'travel\')"><span class="tk">🚄 TRAVEL</span><span class="tv">'+SH.travel.sub+'</span><span class="ta">OPEN →</span></button>';
    if(SH.base) tiles+='<button class="tile t-base'+(SH.base.pic?' haspic':'')+'" onclick="openHtmlSheet(\'base\')"'+(SH.base.pic?' style="background-image:url(\''+SH.base.pic.u+'\')"':'')+'><span class="tk">🏨 BASE</span><span class="tv">'+esc(SH.base.name)+'</span><span class="ta">OPEN →</span></button>';
    if(SH.about) tiles+='<button class="tile t-about" onclick="openHtmlSheet(\'about\')"><span class="tk">📖 HISTORY</span><span class="tv">'+esc(d.aboutLabel||'About this place')+'</span><span class="ta">OPEN →</span></button>';
    let block=tiles?'<div class="tiles n'+(tiles.split('<button').length-1)+'">'+tiles+'</div>':'';
    if(SH.order) block+='<div class="btnrow tiles2"><button class="btn mini" onclick="openHtmlSheet(\'order\')">🧭 ORDER OF PLAY — MORNING · AFTERNOON · EVENING</button></div>';
    h=h.replace('__TILES__',block);
  }
  h=h.replace('__TILES__','');
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
  { const hu=((window.HEADSUP||{})[d.id]||[]).slice();
    const avoid=[], tips=[], look=[];
    if(d.alert) avoid.push(d.alert);
    hu.filter(x=>x.k==='closed').forEach(x=>avoid.push('<b>Closed today:</b> '+x.t));
    hu.filter(x=>x.k==='avoid').forEach(x=>avoid.push(x.t));
    (d.notice||[]).forEach(n=>tips.push(n));
    hu.filter(x=>x.k==='tip').forEach(x=>tips.push(x.t));
    clusters.forEach(function(cl){ if(/^(OPTIONAL|ALTERNATIVE|BONUS|Plan B|Rain switch|Evening option)/i.test(cl.name||'')) return; ['explore','activities','shopping','food'].forEach(function(k){ (cl[k]||[]).forEach(function(e){ if(e.tips) tips.push('<b>'+esc(e.name)+':</b> '+e.tips); }); }); });
    hu.filter(x=>x.k==='look').forEach(x=>look.push(x.t));
    hu.filter(x=>x.k==='nook').forEach(x=>look.push('<b>Worth finding:</b> '+x.t));
    hu.filter(x=>x.k==='shop').forEach(x=>look.push('<b>Bring home:</b> '+x.t));
    const grp=(cls,title,arr)=>arr.length?'<div class="hug '+cls+'"><h4>'+title+'</h4><ul>'+arr.map(t=>'<li>'+t+'</li>').join('')+'</ul></div>':'';
    if(avoid.length||tips.length||look.length){
      h+='<div class="sec orange" style="margin-top:26px"><h3>Heads up</h3></div>'+grp('avoid','🚫 Avoid',avoid)+grp('tips','💡 Tips',tips)+grp('look','👀 Look out for',look); } }
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
const PLAN_LOCS=[['kyoto','Kyoto'],['osaka','Osaka'],['arashiyama','Arashiyama'],['ine','Ine'],['nara','Nara'],['kiso','Kiso Valley'],['tokyo','Tokyo']];
function planLoc(d,e,idx){
  const la=e.lat,ln=e.lng;
  if(la&&ln){ if(la>=34.98&&la<=35.05&&ln>=135.62&&ln<=135.71) return 'arashiyama'; if(la>=35.40&&la<=35.80&&ln>=134.80&&ln<=135.40) return 'ine'; if(la>=34.55&&la<=34.85&&ln>=135.35&&ln<=135.62) return 'osaka'; if(la>=34.60&&la<=34.72&&ln>=135.78&&ln<=135.90) return 'nara'; if(la>=35.35&&la<=36.10&&ln>=137.40&&ln<=137.95) return 'kiso'; if(la>=35.45&&la<=35.90&&ln>=139.40&&ln<=139.95) return 'tokyo'; if(la>=34.90&&la<=35.12&&ln>=135.60&&ln<=135.90) return 'kyoto'; }
  if(idx===4) return 'osaka'; if(idx===5||idx===6) return 'arashiyama'; if(idx===7||idx===8) return 'ine'; if(idx>=10&&idx<=13) return 'kiso'; if(idx>=14) return 'tokyo'; return 'kyoto';
}
function renderPlanner(){
  const rows=[];
  DAYS.forEach(function(d,di){
    (d.clusters||[]).forEach(function(c){
      ['explore','activities','shopping','food'].forEach(function(k){
        (c[k]||[]).forEach(function(e){
          rows.push({d:d, c:c, e:e, kind:k, tags:planTags(e,k), loc:planLoc(d,e,di)});
        });
      });
    });
  });
  let h='<div class="sec pink"><h3>🧭 Trip Planner</h3><div class="sub">Everything on the trip in one place — '+rows.length+' things to do. Pick places and kinds together: Tokyo + History shows the history stops in Tokyo</div></div>';
  h+='<div class="pfilters" id="plocs"><span class="pfl">WHERE</span>'+PLAN_LOCS.map(function(l){ const n=rows.filter(function(r){return r.loc===l[0];}).length; return n?'<button class="pf" data-k="'+l[0]+'" onclick="planToggle(this)">'+l[1].toUpperCase()+' <span class="pn">'+n+'</span></button>':''; }).join('')+'</div>';
  h+='<div class="pfilters" id="pfilters"><span class="pfl">WHAT</span>';
  h+='<button class="pf on" data-k="all" onclick="planClear()">ALL <span class="pn">'+rows.length+'</span></button>';
  PLAN_CATS.forEach(function(cat){
    const n=rows.filter(function(r){return r.tags.indexOf(cat.k)>=0;}).length;
    if(!n) return;
    h+='<button class="pf" data-k="'+cat.k+'" onclick="planToggle(this)">'+cat.i+' '+cat.n.toUpperCase()+' <span class="pn">'+n+'</span></button>';
  });
  h+='</div><div class="pcount" id="pcount"></div>';
  h+='<div id="planrows">';
  rows.forEach(function(r,ix){
    const e=r.e;
    const opt=/^OPTIONAL|^ALTERNATIVE|^BONUS|^EVENING OPTION|^Plan B/i.test(r.c.name);
    h+='<div class="prow" data-tags="'+r.tags.join(' ')+'" data-loc="'+r.loc+'">'+
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
window.planToggle=function(btn){ btn.classList.toggle('on'); const all=document.querySelector('#pfilters .pf[data-k="all"]'); if(all) all.classList.toggle('on', !document.querySelector('#pfilters .pf.on:not([data-k="all"])')); planApply(); };
window.planClear=function(){ document.querySelectorAll('#pfilters .pf, #plocs .pf').forEach(function(b){ b.classList.toggle('on', b.dataset.k==='all'); }); planApply(); };
function planApply(){
  const locs=[].map.call(document.querySelectorAll('#plocs .pf.on'),function(b){return b.dataset.k;});
  const cats=[].map.call(document.querySelectorAll('#pfilters .pf.on:not([data-k="all"])'),function(b){return b.dataset.k;});
  let shown=0;
  document.querySelectorAll('#planrows .prow').forEach(function(r){
    const okLoc=!locs.length||locs.indexOf(r.dataset.loc)>=0;
    const tags=' '+r.dataset.tags+' ';
    const okCat=!cats.length||cats.some(function(k){return tags.indexOf(' '+k+' ')>=0;});
    const ok=okLoc&&okCat; r.style.display=ok?'':'none'; if(ok) shown++;
  });
  const pc=document.getElementById('pcount'); if(pc) pc.textContent=(locs.length||cats.length)?shown+' things match':'';
}
window.planFilter=function(k){ planClear(); if(k!=='all'){ const b=document.querySelector('#pfilters .pf[data-k="'+k+'"]'); if(b) planToggle(b); } };

/* ---- v58: chapters ---- */
function chapterOf(i){ if(i===0) return {k:'f',n:'FLY OUT'}; if(i===17) return {k:'f',n:'FLY HOME'}; if(i<=9) return {k:'k',n:'KYOTO'}; if(i<=13) return {k:'m',n:'MOUNTAINS'}; return {k:'t',n:'TOKYO'}; }
function subOf(i){ if(i===4) return {t:'DAY TRIP · OSAKA',cls:'trip'}; if(i===5||i===6) return {t:'THE RETREAT · NIGHT '+(i-4)+' OF 2',cls:'retreat'}; if(i===7||i===8) return {t:'THE SEASIDE · NIGHT '+(i-6)+' OF 2',cls:'seaside'}; if(i===9) return {t:'HOME TONIGHT · VIA NARA',cls:'away'}; return null; }
window.chapterOf=chapterOf;
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
  (function(){ let last=''; return rows.map(function(r){ const ch=chapterOf(r.day-1); const sub=subOf(r.day-1); const grp=ch.k==='k'&&sub&&(sub.cls==='retreat'||sub.cls==='seaside'||sub.cls==='away')?'KYOTO · THE RETREAT + THE SEASIDE':(ch.k==='f'?'✈ '+ch.n:ch.n); const head=grp!==last?'<tr><th colspan="4" class="gl-grp">'+grp+'</th></tr>':''; last=grp; return head+'<tr onclick="location.hash=\'day/'+r.id+'\'" style="cursor:pointer"><td style="white-space:nowrap"><span class="k '+r.k+'"></span>'+esc(r.d)+'</td><td><b>'+esc(r.what)+'</b></td><td>'+esc(r.route)+'</td><td>'+r.tag+'</td></tr>';}).join(''); })()+'</table></div>'+
  '<div class="legend">'+flexTag('must')+' only train that works, or your seat is on it &nbsp; '+flexTag('res')+' booked seat, swappable &nbsp; '+flexTag('fixed')+' no booking, but gaps — aim for the one named &nbsp; '+flexTag('go')+' take the next one &nbsp; '+flexTag('arr')+' sorted with a person, not a timetable</div>'; };

/* ---- v58: the journey map (simplified / to scale) ---- */
const JSTOPS=[
 {id:'kyo',n:'KYOTO',sub:'19–23 · home',kind:'k',lat:35.01,lng:135.76,r:['2026-09-19','2026-09-22'],city:true,S:[300,230],L:{dx:26,dy:6,a:'start'}},
 {id:'osa',n:'OSAKA',sub:'day trip · Tue 22',kind:'k',lat:34.69,lng:135.50,r:['2026-09-22','2026-09-22'],city:true,S:[185,335],L:{dx:0,dy:34,a:'middle'}},
 {id:'ara',n:'ARASHIYAMA',sub:'the retreat · 23–25',kind:'loop',lat:35.02,lng:135.67,r:['2026-09-23','2026-09-24'],S:[180,180],L:{dx:-20,dy:6,a:'end'}},
 {id:'ine',n:'INE',sub:'the seaside · 25–27',kind:'loop',lat:35.67,lng:135.29,r:['2026-09-25','2026-09-26'],S:[245,62],L:{dx:0,dy:-22,a:'middle'}},
 {id:'nar',n:'NARA',sub:'day trip · Sun 27',kind:'loop',lat:34.68,lng:135.83,r:['2026-09-27','2026-09-27'],S:[380,335],L:{dx:0,dy:34,a:'middle'}},
 {id:'kis',n:'KISO VALLEY',sub:'28 Sep – 1 Oct',kind:'m',lat:35.60,lng:137.61,r:['2026-09-28','2026-09-30'],S:[540,150],L:{dx:0,dy:-22,a:'middle'}},
 {id:'tok',n:'TOKYO',sub:'1–5 Oct',kind:'t',lat:35.68,lng:139.70,r:['2026-10-01','2026-10-05'],city:true,S:[760,200],L:{dx:0,dy:-24,a:'middle'}}
];
const JCOL={k:'#e11d48',loop:'#ffcc00',m:'#15803d',t:'#2563eb'};
const JLINES=[['kyo','ara','loop'],['ara','ine','loop'],['ine','kyo','loop'],['kyo','nar','loop',true],['kyo','osa','k',true],['kyo','kis','m'],['kis','tok','t']];
function renderJourneyMap(mode){
  const t=jstDateStr(), during=tripState()==='during';
  const W=840,H=420; const P={};
  if(mode==='scale'){ const lng0=135.1,lng1=139.9,lat0=34.5,lat1=35.85; JSTOPS.forEach(x=>{ P[x.id]=[((x.lng-lng0)/(lng1-lng0))*(W-120)+60, H-50-((x.lat-lat0)/(lat1-lat0))*(H-110)]; }); P.ara[0]-=22; P.ara[1]-=6; /* 8 km apart in reality — nudged so the dots do not touch */ }
  else JSTOPS.forEach(x=>{ P[x.id]=x.S.slice(); });
  // label offsets for the to-scale view (the Kyoto cluster needs care)
  const LS={kyo:{dx:24,dy:6,a:'start'},osa:{dx:-18,dy:6,a:'end'},ara:{dx:-16,dy:6,a:'end'},ine:{dx:0,dy:-20,a:'middle'},nar:{dx:18,dy:6,a:'start'},kis:{dx:0,dy:-20,a:'middle'},tok:{dx:0,dy:-20,a:'middle'}};
  let g='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="The journey">';
  g+='<rect width="'+W+'" height="'+H+'" fill="#fff"/>';
  JLINES.forEach(function(l){ const a=P[l[0]],b=P[l[1]]; g+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+JCOL[l[2]]+'" stroke-width="9" stroke-linecap="round"'+(l[3]?' stroke-dasharray="3 13"':'')+'/>'; });
  JSTOPS.forEach(function(x){ const p=P[x.id]; const on=during&&t>=x.r[0]&&t<=x.r[1]; const rr=x.city?17:11; const L=mode==='scale'?LS[x.id]:x.L;
    g+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+rr+'" fill="'+(on?'#000':'#fff')+'" stroke="#000" stroke-width="4"/>'+(on?'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+JCOL[x.kind]+'"/>':'');
    const above=L.dy<0; const ny=above?p[1]+L.dy-13-(x.city?6:0):p[1]+L.dy+(L.a==='middle'?12:0); const sy=above?p[1]+L.dy-(x.city?6:0):ny+13;
    g+='<text class="jm-n" x="'+(p[0]+L.dx)+'" y="'+ny+'" text-anchor="'+L.a+'" font-size="'+(x.city?16:12.5)+'">'+x.n+'</text>';
    g+='<text class="jm-s" x="'+(p[0]+L.dx)+'" y="'+sy+'" text-anchor="'+L.a+'">'+x.sub+'</text>'; });
  g+='</svg>';
  return g+'<div class="jm-foot"><span></span><button class="btn mini" onclick="MAPMODE=\''+(mode==='scale'?'simple':'scale')+'\';document.getElementById(\'homemap\').innerHTML=renderJourneyMap(MAPMODE)">'+(mode==='scale'?'↩ SIMPLE VIEW':'📐 TO SCALE')+'</button></div>';
}
window.renderJourneyMap=renderJourneyMap;

function renderHome(){
  const st=tripState(), g=goInfo(), c=countdown(), t=jstDateStr();
  let h='<div class="hero fade"><div class="himg b"><img src="images/hero.jpg" alt="Mica and Dad in Japan" onerror="this.style.display=\'none\'">'+
    '<div class="grad"></div><div class="sticker"><div class="n">'+c.n+'</div><div class="t">'+c.t+'</div></div><div class="ht"><h1>LAMPTEYS<br><span class="y">ON TOUR</span></h1></div></div>';
  h+='<div class="hbody">';
  h+='<a class="goround" href="'+g.href+'"><div class="k">'+g.label+'</div><div class="d">'+g.day+'</div><div class="ar">→</div></a>';
  h+='<div class="mono" style="font-weight:700;font-size:12px;margin:6px 0 4px">18 SEP – 5 OCT • LONDON → OSAKA (KIX) ⇢ TOKYO (HND) → LONDON</div>';
  h+='<div class="mapbox" id="homemap">'+renderJourneyMap(window.MAPMODE||'simple')+'</div>';
  h+='<div class="views">OR SEE THE WHOLE TRIP AS A <a href="#map">🗺️ MAP</a><a href="#planner">☰ LIST</a></div>';
  h+='<div class="ctas"><a class="c-ph" href="#phrases">Handy Japanese phrases!</a><a class="c-et" href="#etiquette">Learn the etiquette</a></div>';
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
  daynav.innerHTML='<div class="band"><div class="tabs">'+DAYS.map((d,i)=>{ const sub=subOf(i);
    return '<div class="dtab'+(i===activeIdx?' active':'')+(sub?' '+sub.cls:'')+'" data-i="'+i+'" onclick="location.hash=\'day/'+d.id+'\'">'+
      (i===5?'<span class="tag2">RETREAT</span>':'')+(i===7?'<span class="tag2">SEASIDE</span>':'')+(i===9?'<span class="tag2">← HOME</span>':'')+(i===4?'<span class="tag2">DAY TRIP</span>':'')+
      '<div>'+d.date+'</div><div class="c">'+(i===9?'KYO':d.chip)+'</div></div>'; }).join('')+'</div></div>';
  const el=daynav.querySelector('.dtab[data-i="'+activeIdx+'"]'); if(el) el.scrollIntoView({inline:'center',block:'nearest'});
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
