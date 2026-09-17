/* FINAL ACTIONS & DECISIONS — 17 Sep 2026, the night before departure.
   Three tabs on the planning page: what to book now, what to decide in Japan, what to ask the hosts.
   Rows reuse the site's existing .chk / .gf / .sec components — no new visual language.
   No booking numbers, PINs or collection codes here: those live in the private confirmation docs. */
(function(){
const P=window.PAGES;

/* t=what · d=why/how · meta=timing · s=state · u=external link · day=day id · doc=confirmation key */
const BOOK=[
 {s:'must',t:'Shibuya Sky — 2 Oct sunset',meta:'ON SALE NOW · 10 min',
  d:'Tickets are sold exactly two weeks ahead, so 2 Oct opened when the Japan date turned to 18 Sep. Choose <b>Adult · entry from 15:00 (¥3,400 each)</b> → 2 Oct → the 16:40–17:00 slot. Turn on 3-D Secure first; foreign cards fail without it. Free cancellation until the day before, and the rooftop shuts in rain or strong wind (indoor floors stay open, no refund).',
  u:'https://www.shibuya-scramble-square.com/sky/ticket/',ub:'BUY TICKETS',day:'2-oct'},
 {s:'must',t:'Sumo An, Kyoto — 21 Sep 18:00',meta:'TONIGHT · 15 min',
  d:'Show-only from ¥10,000 each (with chanko meal from ¥12,800). Evening shows run 18:00–20:00. Free cancellation up to 24 hours before. <b>Book first, then email them the diets</b> — their vegan/vegetarian option is arranged by email after booking: no meat or meat/chicken stock for Mica, nothing raw for Dad.',
  u:'https://sumoan-kyoto.com/',ub:'BOOK SUMO AN',day:'21-sep'},
 {s:'must',t:'DAWN robot café — 4 Oct 15:00',meta:'TONIGHT · 10 min',
  d:'Book the <b>OriHime Diner</b> seating, where the robot at your table is operated by a remote pilot. ¥5,500 each including a dish and a drink, paid by card when booking, minimum two people, no same-day bookings. Ask in the notes for a fish/vegetable plate and English interaction.',
  u:'https://www.tablecheck.com/en/shops/dawncafe2021/reserve',ub:'BOOK DAWN',day:'4-oct'},
 {s:'must',t:'Ine — both dinners, breakfast and the sea taxi',meta:'TONIGHT · draft ready in Gmail',
  d:'Miyabi is room-only and has not replied since 14 Sep. Settle dinner on <b>25 and 26 Sep</b>, breakfast before the 08:11 bus on the 27th, the exact bus stop and walk to the building, and the sea taxi time. Their rule: no contact by 17:00 on arrival day and the room is released.',
  day:'25-sep'},
 {s:'must',t:'Nagiso — dinner on both nights',meta:'TONIGHT · draft ready in Gmail',
  d:'Fukusuke, opposite the station, needs a dinner reservation for <b>29 Sep</b> and is normally closed on Wednesday <b>30 Sep</b> — so that night is a MOUNTAinn arrangement or food bought earlier. Same message confirms the Nagiso→Magome taxi on the 29th.',
  day:'29-sep'},
 {s:'must',t:'Mark’s meal on BA6',meta:'2 min',
  d:'Mica has a special meal on the flight home; Mark doesn’t. If he wants one, add it in Manage My Booking — it has to be done well before the flight, not at the gate.',
  u:'https://www.britishairways.com/travel/managebooking/public/en_gb',ub:'MANAGE BOOKING',day:'5-oct',doc:'ba6'},
 {s:'opt',t:'Kiso guided day — 30 Sep',meta:'HOLD TONIGHT · free until 23 Sep',
  d:'Really Rural Japan’s Kiso-Fukushima day: <b>¥45,000 for the two of you, including guide, transport, lunch, entry fees and a sake tasting</b>, about 8 km and flat. Free cancellation up to 7 days before, so holding it tonight costs nothing and keeps the decision open until the 23rd. Ask for the town-focused version.',
  u:'https://reallyruraljapan.com/kiso-fukushima-walking-tour',ub:'ENQUIRE',day:'30-sep'},
 {s:'opt',t:'Ine resident walk + Mukai sake',meta:'TONIGHT · needs 3 days’ notice',
  d:'Beyond the Postcard, 26 Sep, 90 minutes, ¥12,000 for two, cash, meeting at the tourist information centre. Say no to the fishing-trap activity. Ask in the same message whether Mukai can do a short tasting that day — the red-rice Ine Mankai is the one to ask about.',
  u:'https://www.ine-kankou.jp/e_active/beyond-the-postcard',ub:'ENQUIRE',day:'26-sep'},
 {s:'opt',t:'Shigetsu, Tenryu-ji — 23 Sep lunch',meta:'BY 21 SEP · phone',
  d:'Zen vegetarian lunch inside the temple, 11:00–12:00, before the 14:50 boat. <b>Closed Thursdays, so it is the 23rd and not the 24th.</b> Yuki set ¥3,800 plus ¥500 garden entry each; two days’ notice. Phone 075-882-9725 (09:00–17:00 Japan = 01:00–09:00 UK) or ask Henn na’s desk to call.',
  u:'https://www.tenryuji.com/en/shigetsu/',ub:'SHIGETSU',day:'23-sep'},
 {s:'opt',t:'Hantei or a tempura counter — 3 Oct lunch',meta:'ASK FIRST',
  d:'Ask Hantei whether they can serve a set without pork and with vegetable frying oil before booking anything. If the answer is no, book a tempura counter instead — cooked, not sushi, and egg tempura is usually on the menu.',
  u:'https://www.tablecheck.com/en/hantei-nezu',ub:'HANTEI',day:'3-oct'},
 {s:'opt',t:'Saihō-ji moss temple — 24 Sep',meta:'DECIDE BY 20 SEP',
  d:'All four entry times had space when checked. Card payment at least a day ahead, free cancellation up to 4 days before — so booking now and deciding by the 20th costs nothing. Pick 10:30 or later, after the morning at the hotel.',
  u:'https://intosaihoji.com/en/booking/nichinichi',ub:'BOOK',day:'24-sep'},
 {s:'opt',t:'Unagiya Hirokawa — 24 Sep dinner',meta:'ONLY WITH THE TRANSFER AGREED',
  d:'Cooked eel over rice, the one village dinner that suits you both. Booking takes a ¥3,000 deposit that is not refunded, and it only works if HOSHINOYA agrees the return transfer first — so ask the hotel, then book.',
  u:'https://unagi-hirokawa.jp/orders/en',ub:'BOOK',day:'24-sep'},
 {s:'opt',t:'Golf at TGX Osaka — 22 Sep',meta:'TONIGHT OR DROP',
  d:'Booked through their LINE account or by phone only — there is no web slot, and they are cashless. ¥3,300 for the first person plus ¥2,200 for the second per 50 minutes, plus ¥550 each for clubs. Holiday hours 09:00–21:00. The Japanese message to paste is in the booking list.',
  u:'https://line.me/R/ti/p/@405bwtvw',ub:'OPEN LINE',day:'22-sep'}
];

const DECIDE=[
 {s:'dec',t:'Osaka, Tue 22 Sep — which shape',meta:'BOOK FROM JAPAN, 19–21 SEP',
  d:'All four stay on the day page with the castle, Kuromon, Amerikamura and Dotonbori clusters underneath: <b>Taka’s Temma bar crawl 18:00</b> (about ¥7,000 each in cash on top, pescatarian fine) · <b>a daytime shared walk</b> (Osaka Localized publishes only 10–14 days ahead, so it can only be booked once you land) · <b>Deep Osaka food dinner</b> (¥13,000 each, meat-heavy menu needs a written swap) · <b>no tour and the Tower of the Sun interior instead</b> (reserve the day before). Last direct train back is 22:00 from JR Osaka; the final one is 00:00.',day:'22-sep'},
 {s:'dec',t:'Kiso, Wed 30 Sep — which kind of day',meta:'BY 23 SEP IF GUIDED',
  d:'<b>Guided Kiso-Fukushima</b> (¥45,000 for two, all in, free cancel to the 23rd) · <b>Narai alone</b> (08:11 or 10:19 up the valley, preserved street, soba; some kitchens shut on Wednesdays) · <b>Kakizore waterfalls</b> (from ¥36,000, a second walking day) · <b>a quiet day in Nagiso</b>. All four are on the day page.',day:'30-sep'},
 {s:'dec',t:'Monday 21 Sep — which morning',meta:'NIGHT BEFORE',
  d:'Pick one and be finished by 10:45 for the 12:30 class: Fushimi Inari at 07:00 · To-ji’s Kobo market (only on the 21st) · Kinkaku-ji · Nanzen-ji and the aqueduct · Nijo Castle · Ginkaku-ji and the Philosopher’s Path · Ryoan-ji.',day:'21-sep'},
 {s:'dec',t:'Fushimi Inari — morning or dusk',meta:'EITHER DAY',
  d:'Monday 21 at 07:00, quiet and cool before breakfast; or Sunday 27 at dusk on the way back from Nara — five minutes from Kyoto Station, lit gates, far fewer people, at the end of a long travel day. Both are on their pages with the timings.',day:'27-sep'},
 {s:'dec',t:'Nishiki market — quick or proper',meta:'21 OR 28 SEP',
  d:'Monday 21 at 16:00 is a short browse with some stalls already closing. Monday 28, 10:00–11:15, is the fuller visit and still leaves the 13:21 train comfortable.',day:'28-sep'},
 {s:'dec',t:'24 Sep at the retreat',meta:'ON THE DAY (two need booking)',
  d:'Stay on the property · Otagi Nenbutsu-ji and Saga Toriimoto · Gio-ji · the bamboo grove and Tenryu-ji garden. <b>Saihō-ji and the Sagano scenic train are the two that must be booked beforehand</b>; the rest are same-day decisions with a hotel transfer.',day:'24-sep'},
 {s:'dec',t:'Saturday night in Tokyo, 3 Oct',meta:'BY 1 OCT',
  d:'Shinjuku dinner → Golden Gai → Champion for singing with strangers · Rocky Top in Ginza for a live act · NINJA Tokyo as the whole evening · or a quiet night in Shimokitazawa. Ask the cover charge and smoking policy before sitting down in any small bar.',day:'3-oct'},
 {s:'dec',t:'2 Oct evening · 4 Oct afternoon',meta:'ON THE DAY',
  d:'After Shibuya Sky: dinner in Shibuya and Nonbei Yokocho, or home to Shimokitazawa. After DAWN: Nakano Broadway, Gotokuji or a last Shimokita lap — one of them, not three.',day:'4-oct'}
];

const ASK=[
 {s:'ask',t:'HOSHINOYA',meta:'23–25 SEP',
  d:'Both dinners with the two diets accepted in writing, breakfast, and the departure transfer on the 25th. The arrival boat is booked for 14:50 — nothing to do there.',day:'23-sep',doc:'boat'},
 {s:'ask',t:'Miyabi, Ine',meta:'25–27 SEP',
  d:'Dinner on both nights, breakfast before the 08:11 bus, the exact building and bus stop with the walk, and the sea taxi. This is the one with a deadline built in: no contact by 17:00 on the 25th and the booking is cancelled.',day:'25-sep',doc:'miyabi'},
 {s:'ask',t:'Yui-an',meta:'28–29 SEP',
  d:'Confirm the pick-up you chose on the check-in sheet (16:00 at Nagiso, off the Shinano), the 07:40 shuttle on the 29th, and that your bags travel to MOUNTAinn while you walk.',day:'28-sep',doc:'yuian'},
 {s:'ask',t:'MOUNTAinn',meta:'29 SEP–1 OCT',
  d:'Wednesday 30 Sep dinner, and what the kitchen has if you cook. Their self check-in form email arrives around 26 Sep, while you are in Ine with patchy signal — watch for it.',day:'29-sep',doc:'mountainn'},
 {s:'ask',t:'Henn na Kyoto',meta:'NOTHING OUTSTANDING',
  d:'Names registered and the big cases agreed at ¥700 per bag per night, 23–27 Sep. Both replies live in the Booking.com chat, not email — <b>screenshot that chat before you fly</b>, because you will not have it offline.',day:'19-sep',doc:'henn1'},
 {s:'ask',t:'U Place, Shimokitazawa',meta:'1–5 OCT',
  d:'The bed and futon layout, whether they will hold bags before 15:00 on the 1st, and the exact corner for the airport taxi on the 5th. They do not accept parcels without a timed slot, so nothing gets forwarded there without agreeing it first.',day:'1-oct',doc:'uplace'},
 {s:'ask',t:'Airport taxi, 5 Oct',meta:'BOOK 3–4 OCT',
  d:'GO app, 08:45 pickup for a 10:00 target at Haneda Terminal 3, card saved, pin dropped exactly on the flat’s door. Decide then between taxi all the way or taxi to Shinagawa and the Keikyu line.',
  u:'https://go.goinc.jp/en/',ub:'GO APP',day:'5-oct'}
];

const TABS=[['book','BOOK OR ASK NOW',BOOK],['decide','DECIDE IN JAPAN',DECIDE],['ask','THE HOSTS',ASK]];
window.FINAL_TAB='book';

function rows(list){
  return list.map(function(x){
    const doc=(x.doc&&window.confFor)?confFor('key',x.doc):'';
    return '<div class="chk'+(x.s==='opt'?' secondary':'')+'">'+
      '<div class="box">'+(x.s==='must'?'!':x.s==='opt'?'?':x.s==='dec'?'◇':'✉')+'</div>'+
      '<div style="flex:1;min-width:0">'+
        '<div class="t">'+x.t+'</div>'+
        '<div class="d">'+x.d+'</div>'+
        '<div class="meta">'+x.meta+'</div>'+
        '<div class="btnrow" style="margin-top:8px">'+
          (x.u?'<a class="btn mini yellow" target="_blank" rel="noopener" href="'+x.u+'">'+(x.ub||'OPEN')+' ↗</a>':'')+
          (x.day?'<a class="btn mini" href="#day/'+x.day+'">📅 THAT DAY</a>':'')+
          (doc&&window.confLink?confLink(doc,true):'')+
        '</div>'+
      '</div></div>';
  }).join('');
}

P.renderFinal=function(){
  let h='<div class="sec red"><h3>Final actions &amp; decisions</h3>'+
    '<div class="sub">Everything still open on the night before departure: what to book now, what to choose once you are there, and what the hosts still have to confirm. Booking numbers stay in the private confirmation docs.</div></div>';
  h+='<div class="gf" id="finaltabs">'+TABS.map(function(t){
      return '<button class="'+(window.FINAL_TAB===t[0]?'on':'')+'" onclick="FINAL_TAB=\''+t[0]+'\';document.getElementById(\'finalbody\').innerHTML=PAGES.renderFinalBody();PAGES.syncFinalTabs()">'+t[1]+' ('+t[2].length+')</button>';
    }).join('')+'</div>';
  h+='<div id="finalbody">'+P.renderFinalBody()+'</div>';
  h+='<div class="btnrow" style="margin:6px 0 26px"><button class="btn mini" onclick="window.print()">🖨 PRINT THIS PANEL</button></div>';
  return h;
};
P.renderFinalBody=function(){
  const t=TABS.filter(function(x){return x[0]===window.FINAL_TAB;})[0]||TABS[0];
  const intro={book:'Tonight and tomorrow morning. Anything not done by the time you board can still be done from Japan, except Shibuya Sky, which sells out.',
    decide:'Nothing here needs deciding before you fly. Each row keeps every option on its day page; the deadline column is the only thing that bites.',
    ask:'Messages, not bookings. Drafts for these are waiting in Gmail.'}[t[0]];
  return '<p style="font-size:13.5px;margin:2px 0 12px">'+intro+'</p>'+rows(t[2]);
};
P.syncFinalTabs=function(){
  const b=document.querySelectorAll('#finaltabs button');
  for(let i=0;i<b.length;i++) b[i].className=(TABS[i][0]===window.FINAL_TAB?'on':'');
};
P.FINAL_COUNTS={book:BOOK.length,decide:DECIDE.length,ask:ASK.length};
})();
