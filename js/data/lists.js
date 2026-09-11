/* DEPARTURE LISTS — 10 Sep 2026. The lists themselves live in two printable documents in downloads/
   (one for Mark, one for Mica). This page just hands them out and keeps the ticket-office sheet for the trains.
   Split rule: all bookings, tickets, money admin and paperwork sit with Mica. Dad's list is his own prep only. */
(function(){
const P=window.PAGES;
const TRAINS=P.TRAINS;
const DEPART=new Date('2026-09-18T12:35:00+01:00');

P.renderLists=function(){
 const days=Math.max(0,Math.ceil((DEPART-new Date())/86400000));
 let h='<div class="hero" style="box-shadow:8px 8px 0 #000;margin:20px 0"><div class="hbody" style="padding:18px 16px">'+
   '<div class="datebar">PACKING</div>'+
   '<h2 style="font-size:30px;margin:6px 0 4px">🎒 Packing &amp; prep</h2>'+
   '<p class="mono" style="font-size:11.5px;margin:6px 0 0"><b>'+days+' DAYS</b> UNTIL THE 12:35 FROM GATWICK • FRI 18 SEP • ONE LIST EACH, PRINTED</p>'+
   '</div></div>';

 h+='<div class="sec blue"><h3>Dad</h3><div class="sub">Packing then to-do, two pages, round tick boxes. Personal prep only — nothing on it needs a booking. The Word file is the editable original</div></div>';
 h+='<div class="btnrow" style="margin-bottom:18px"><a class="btn yellow big" style="flex:1" href="downloads/mark-departure-list.pdf" download>⬇ DAD — PDF (PRINT)</a><a class="btn mini" href="downloads/mark-departure-list.docx" download>⬇ WORD</a></div>';

 h+='<div class="sec pink"><h3>Mica</h3><div class="sub">One document, black-and-white zine style: this week · next week · in Japan · packing · mini-trip packing — each list starts on its own page, so print just the pages you need</div></div>';
 h+='<div class="btnrow" style="margin-bottom:18px"><a class="btn red big" style="flex:1" href="downloads/mica-departure-lists.pdf" download>⬇ MICA — PDF (PRINT)</a></div>';

 h+='<div class="info-box" data-label="The split">All the admin — bookings, tickets, insurance, Visit Japan Web, money plan, luggage plan, the Gatwick journey — is on Mica\'s list. Mark\'s list is his own prep: passport, medication, cash, phone set-up, packing. If something is not on his list, it is already being handled.</div>';

 /* ticket-office sheet — referenced from Mica's printed list */
 h+='<div class="sec orange" style="margin-top:22px"><h3>If a train website says no — the ticket-office sheet</h3><div class="sub">Show this at any JR ticket office (みどりの窓口 Midori no Madoguchi). Kyoto Station: by the central gates, 05:30–23:00</div></div>';
 h+='<div class="jpsheet"><div class="jph">乗車券・特急券をお願いします（大人2名）</div>';
 TRAINS.filter(x=>!/HARUKA|NOZOMI|AONIYOSHI/.test(x.n)).forEach(x=>{ h+='<div class="jpl">'+x.jp+'</div>'; });
 h+='<div class="jpf">クレジットカードで支払います。ありがとうございます。</div></div>';
 h+='<div class="btnrow"><button class="btn mini" onclick="window.print()">🖨 PRINT THIS SHEET</button></div>';

 h+='<div class="sec" style="margin-top:22px"><h3>The eight trains — quick reference</h3><div class="sub">Full detail is in Mica\'s printed list. Verified against the 2026 timetables on 2 Sep</div></div>';
 h+='<div style="overflow-x:auto"><table class="simple mini"><tr><th>DATE</th><th>TRAIN</th><th>ROUTE</th><th>BOOK</th></tr>'+
   TRAINS.map(x=>'<tr><td style="white-space:nowrap">'+x.d.split(' ·')[0]+'</td><td><b>'+x.n+'</b></td><td>'+x.r+'</td><td><a class="btn mini yellow" target="_blank" rel="noopener" href="'+x.u+'">↗ BOOK</a></td></tr>').join('')+'</table></div>';
 return h;
};
})();
