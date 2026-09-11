/* DEPARTURE LISTS — 10 Sep 2026. The lists themselves live in two printable documents in downloads/
   (one for Dad, one for Mica). This page just hands them out and keeps the ticket-office sheet for the trains.
   Split rule: all bookings, tickets, money admin and paperwork sit with Mica. Dad's list is his own prep only. */
(function(){
const P=window.PAGES;
const TRAINS=P.TRAINS;
const DEPART=new Date('2026-09-18T12:35:00+01:00');

P.renderLists=function(){
 const days=Math.max(0,Math.ceil((DEPART-new Date())/86400000));
 let h='<div class="hero" style="box-shadow:8px 8px 0 #000;margin:20px 0"><div class="hbody" style="padding:18px 16px">'+
   '<div class="datebar">PACKING</div>'+
   '<h2 style="font-size:30px;margin:6px 0 4px">🎒 Packing &amp; prep lists</h2>'+
   '<p class="mono" style="font-size:11.5px;margin:6px 0 0"><b>'+days+' DAYS</b> UNTIL THE 12:35 FROM GATWICK • FRI 18 SEP</p>'+
   '</div></div>';

 h+='<div class="sec blue"><h3>Dad\'s lists</h3><div class="sub">Packing and pre-departure, two pages</div></div>';
 h+='<div class="btnrow" style="margin-bottom:22px"><a class="btn yellow big" style="flex:1" href="downloads/dad-departure-list.pdf" download>⬇ PDF (PRINT)</a><a class="btn mini" href="downloads/dad-departure-list.docx" download>⬇ WORD</a></div>';

 h+='<div class="sec pink"><h3>Mica\'s lists</h3><div class="sub">This week · next week · in Japan · packing · mini-trip packing</div></div>';
 h+='<div class="btnrow" style="margin-bottom:22px"><a class="btn red big" style="flex:1" href="downloads/mica-departure-lists.pdf" download>⬇ PDF (PRINT)</a></div>';

 h+='<div class="sec" style="margin-top:22px"><h3>The eight trains — quick reference</h3><div class="sub">Times and booking links for every reserved seat</div></div>';
 h+='<div style="overflow-x:auto"><table class="simple mini"><tr><th>DATE</th><th>TRAIN</th><th>ROUTE</th><th>BOOK</th></tr>'+
   TRAINS.map(x=>'<tr><td style="white-space:nowrap">'+x.d.split(' ·')[0]+'</td><td><b>'+x.n+'</b></td><td>'+x.r+'</td><td><a class="btn mini yellow" target="_blank" rel="noopener" href="'+x.u+'">↗ BOOK</a></td></tr>').join('')+'</table></div>';
 /* ticket-office sheet — referenced from Mica's printed list */
 h+='<div class="sec orange" style="margin-top:22px"><h3>Ticket-office sheet</h3><div class="sub">If a train website says no, show this at any JR ticket office (みどりの窓口 Midori no Madoguchi). Kyoto Station: by the central gates, 05:30–23:00</div></div>';
 h+='<div class="jpsheet"><div class="jph">乗車券・特急券をお願いします（大人2名）</div>';
 TRAINS.filter(x=>!/HARUKA|NOZOMI|AONIYOSHI/.test(x.n)).forEach(x=>{ h+='<div class="jpl">'+x.jp+'</div>'; });
 h+='<div class="jpf">クレジットカードで支払います。ありがとうございます。</div></div>';
 h+='<div class="btnrow"><button class="btn mini" onclick="window.print()">🖨 PRINT THIS SHEET</button></div>';

 return h;
};
})();
