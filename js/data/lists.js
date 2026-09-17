/* DEPARTURE LISTS — 10 Sep 2026. The lists themselves live in two printable documents in downloads/
   (one for Dad, one for Mica). This page just hands them out and keeps the ticket-office sheet for the trains.
   Split rule: all bookings, tickets, money admin and paperwork sit with Mica. Dad's list is his own prep only. */
(function(){
const P=window.PAGES;
const TRAINS=P.TRAINS;
const DEPART=new Date('2026-09-18T12:35:00+01:00');

P.renderLists=function(){
 const ms=DEPART-new Date();
 const days=Math.max(0,Math.ceil(ms/86400000));
 const countdown = ms<=0 ? 'YOU ARE ON YOUR WAY' : (days===1?'TOMORROW':'<b>'+days+' DAY'+(days===1?'':'S')+'</b> UNTIL')+' THE 12:35 FROM GATWICK • FRI 18 SEP';
 let h='<div class="hero" style="box-shadow:8px 8px 0 #000;margin:20px 0"><div class="hbody" style="padding:18px 16px">'+
   '<div class="datebar">PACKING</div>'+
   '<h2 style="font-size:30px;margin:6px 0 4px">🎒 Packing &amp; prep lists</h2>'+
   '<p class="mono" style="font-size:11.5px;margin:6px 0 0">'+countdown+'</p>'+
   '</div></div>';

 if(P.renderFinal) h+=P.renderFinal();

 h+='<div class="sec blue"><h3>Dad\'s lists</h3><div class="sub">Packing and pre-departure, two pages</div></div>';
 h+='<div class="btnrow" style="margin-bottom:22px"><a class="btn yellow big" style="flex:1" href="downloads/dad-departure-list.pdf" download>⬇ PDF (PRINT)</a><a class="btn mini" href="downloads/dad-departure-list.docx" download>⬇ WORD</a></div>';

 h+='<div class="sec pink"><h3>Mica\'s lists</h3><div class="sub">This week · next week · in Japan · packing · mini-trip packing</div></div>';
 h+='<div class="btnrow" style="margin-bottom:22px"><a class="btn red big" style="flex:1" href="downloads/mica-departure-lists.pdf" download>⬇ PDF (PRINT)</a></div>';

 h+='<div class="sec" style="margin-top:22px"><h3>The eight trains — all booked</h3><div class="sub">Reservation numbers and seats; 📄 opens each booking confirmation. The four e5489 paper tickets are collected at Kyoto Station on 19 Sep; the HARUKA at the airport; the rest are digital</div></div>';
 h+='<div style="overflow-x:auto"><table class="simple mini"><tr><th>DATE</th><th>TRAIN</th><th>ROUTE</th><th>REF · SEATS</th><th>DOC</th></tr>'+
   TRAINS.map(x=>{ const K={'HARUKA':'haruka','HASHIDATE 5':'hashidate5','HASHIDATE 2':'hashidate2','AONIYOSHI':'aoniyoshi','NOZOMI 22':'nozomi22','SHINANO 17':'shinano17','SHINANO 2':'shinano2','NOZOMI 122':'nozomi122'};
     const key=Object.keys(K).find(k=>x.n.split(' (')[0]===k||(k==='HARUKA'&&/HARUKA/.test(x.n)));
     const u=key&&window.confFor?confFor('key',K[key]):'';
     return '<tr><td style="white-space:nowrap">'+x.d.split(' ·')[0]+'</td><td><b>'+x.n+'</b></td><td>'+x.r+'</td><td><b>'+x.ref+'</b><br>'+x.seat+'</td><td style="text-align:center">'+(u?'<a target="_blank" rel="noopener" href="'+u+'" style="text-decoration:none;font-size:16px">📄</a>':'')+'</td></tr>'; }).join('')+'</table></div>';
 /* ticket-office sheet — referenced from Mica's printed list */
 h+='<div class="sec orange" style="margin-top:22px"><h3>Ticket-office sheet</h3><div class="sub">If the machine will not release a booking, show this at the JR ticket office (みどりの窓口 Midori no Madoguchi). Kyoto Station: by the central gates, outside the ticket barriers, 05:30–23:00</div></div>';
 h+='<div class="jpsheet"><div class="jph">e5489で予約したきっぷを受け取りたいです（大人2名・決済したクレジットカードと予約番号、電話番号下4桁）</div>';
 TRAINS.filter(x=>!/HARUKA|NOZOMI|AONIYOSHI/.test(x.n)).forEach(x=>{ h+='<div class="jpl">'+x.jp+'</div>'; });
 h+='<div class="jpf">支払い済みです。ありがとうございます。</div></div>';
 h+='<div class="btnrow"><button class="btn mini" onclick="window.print()">🖨 PRINT THIS SHEET</button></div>';

 return h;
};
})();
