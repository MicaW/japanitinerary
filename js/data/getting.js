/* GETTING AROUND — 17 Sep 2026.
   Which transport planner, app or map is the right one in each place, and when you actually need it.
   Everything here is a link to an operator or city, not a third-party aggregator, because those go stale.
   Built from the site's existing .sec / .chk / .btn components — no new visual language. */
(function(){
const P=window.PAGES;

/* s: 'core' = install or save before you fly · 'use' = open it when you are there · 'map' = a map to save offline */
const GROUPS=[

 {k:'BEFORE YOU FLY', c:'red',
  sub:'Five minutes each, on wifi, tonight. All of them are slower and less reliable on airport wifi.',
  items:[
  {s:'core',t:'Google Maps — download Kyoto, Osaka and Tokyo offline',meta:'DO IT TONIGHT · 10 min',
   d:'Google Maps is the one that works everywhere in Japan, including buses, and it is the only planner both of you already know how to drive. Search a city → tap its name at the bottom → <b>Download offline map</b> → drag the box over the whole urban area. Offline maps give you the map, walking directions and every saved pin <b>without signal</b>. They do not give you live train times, which is what the operator links below are for.',
   u:'https://www.google.com/maps',ub:'GOOGLE MAPS'},
  {s:'core',t:'Put ICOCA (or Suica) in Apple Wallet — both phones',meta:'DO IT TONIGHT · 5 min each',
   d:'Wallet → + → Transit Card → Japan → ICOCA or Suica → top up with the card on file. <b>Do this tonight, not on arrival</b> — a foreign card is sometimes refused for Japanese transit top-up (Amex and Mastercard are the better bets; Visa is the one that fails). If it will not take a top-up, the fallback is a plastic ICOCA bought with cash from any JR West machine at Kansai, which works identically at every gate. Inconvenient, never fatal. It taps you through almost every gate, bus and konbini for the whole trip, and it means neither of you is ever stuck at a ticket machine working out a fare. <b>Two separate cards — one per phone.</b> Top up ¥3,000 each to start; you can add more from the phone at any time.',
   u:'https://support.apple.com/en-gb/HT207154',ub:'HOW TO ADD IT'},
  {s:'core',t:'eSIM — install it here, on wifi, not at Kansai',meta:'DO IT TONIGHT · 10 min each phone',
   d:'An eSIM profile will not install without a connection, so the one place you must not do it is the arrivals hall. Install both tonight and leave them switched off if your plan counts days from activation. On landing: Japan eSIM on for data, UK line on for calls and texts with <b>data roaming off</b>. If a profile refuses to install, you want to know tonight rather than on Saturday lunchtime in Osaka.'},
  {s:'core',t:'Visit Japan Web — register both of you and screenshot the QR codes',meta:'DO IT TONIGHT · 15 min',
   d:'Immigration and customs become a scan instead of a form. One account holds both travellers; you need both passports, the Air China arrival into KIX on the 19th, and the Henn na address. <b>Screenshot every QR code it gives you, onto both phones.</b>',
   u:'https://services.digital.go.jp/en/visit-japan-web/',ub:'VISIT JAPAN WEB'},
  {s:'core',t:'Save the three offline sheets',meta:'DO IT TONIGHT · 5 min',
   d:'Screenshot, do not bookmark: the <b>Tokyo subway map</b> (linked below), the <b>Kyoto bus and subway map</b>, and the <b>Henn na Booking.com chat</b> with the luggage agreement. Screenshots survive no signal, a flat battery on one phone, and a Google account that decides to ask for a verification code at the worst moment.'},
  {s:'core',t:'One backup planner, in English',meta:'OPTIONAL BUT USEFUL · 3 min',
   d:'When Google Maps gives you a route that feels wrong — and around Kyoto buses and rural Kyōtango it sometimes does — <b>Jorudan</b> is the one Japanese people actually use, and it has a full English version. It knows limited expresses, reserved seats and the difference between a rapid and a local, which Google blurs.',
   u:'https://world.jorudan.co.jp/mln/en/',ub:'JORUDAN (ENGLISH)'},
  ]},

 {k:'THE UK LEGS — 18 SEP AND 5 OCT', c:'blue',
  sub:'Two mornings, both of them early, both of them at a station or an airport where the board is the listing of truth.',
  items:[
  {s:'use',t:'National Rail — live departures from Norwich',meta:'18 SEP, 05:00',
   d:'The 05:33 is the first one that works. If it is cancelled or delayed, this page tells you before the platform does, and the staff at the gateline can move you onto the next service on the same ticket. Bookmark the Norwich departures page, not the homepage.',
   u:'https://www.nationalrail.co.uk/live-trains/departures/NRW/',ub:'NORWICH DEPARTURES'},
  {s:'use',t:'Gatwick — which terminal, and the shuttle',meta:'18 SEP, 09:14',
   d:'The railway station is in the <b>South</b> terminal. Air China checks in at the <b>North</b>. The free inter-terminal shuttle runs 24 hours and takes about two minutes; signs start at the station exit. Gatwick&rsquo;s own airline list is the thing to check if anything ever looks different from what this site says.',
   u:'https://www.gatwickairport.com/flights/which-terminal.html',ub:'GATWICK TERMINALS'},
  ]},

 {k:'KANSAI AIRPORT → KYOTO — 19 SEP', c:'green',
  sub:'One train, no changes, already booked. The only tool you need is the machine that prints the tickets.',
  items:[
  {s:'use',t:'JR West — the HARUKA and the four e5489 bookings',meta:'19 SEP, AT THE MACHINE',
   d:'Everything on this leg is a JR West booking. The airport machine releases the HARUKA; the machines at Kyoto Station release the four paper limited-express tickets. Both want the card that paid, the reservation number and a 4-digit number — all of which live in the booking confirmation docs, not here.',
   u:'https://e5489.jr-odekake.net/e5489/cspc/CBTopMenuPC',ub:'e5489'},
  {s:'use',t:'JR West English timetables and disruption',meta:'IF SOMETHING MOVES',
   d:'If a JR West train is delayed or cancelled anywhere on this trip — HARUKA, either Hashidate, either Shinano — this is the operator page that says so first.',
   u:'https://www.westjr.co.jp/global/en/',ub:'JR WEST (ENGLISH)'},
  ]},

 {k:'KYOTO — 19–23 AND 27 SEP', c:'orange',
  sub:'Kyoto is a bus city with two subway lines bolted on. Google Maps handles it, but when a bus does not come, these are what the locals check.',
  items:[
  {s:'use',t:'Arukumachi Kyoto — the city&rsquo;s own bus and train planner',meta:'WHEN A BUS IS LATE',
   d:'Kyoto City&rsquo;s official route planner, in English. It is better than Google Maps at the thing Kyoto does badly: telling you which of three buses at the same stop is the one that actually goes where you want, and how far behind it is running.',
   u:'https://www.arukumachikyoto.jp/index.php?lang=en',ub:'ARUKUMACHI KYOTO'},
  {s:'map',t:'Kyoto bus and subway route map',meta:'SCREENSHOT THIS',
   d:'The city&rsquo;s own map of every bus route and both subway lines. Save the image to your phone — Kyoto bus stops have a map on the pole, but it is in Japanese and it is dark by the time you need it.',
   u:'https://www2.city.kyoto.lg.jp/kotsu/webguide/en/comm/routemap.html',ub:'KYOTO ROUTE MAP'},
  {s:'use',t:'Kyoto City Bus &amp; Subway — fares, passes and the rules',meta:'REFERENCE',
   d:'Board at the back, pay at the front as you get off. Inside the central flat-fare zone it is ONE tap, on the way out. On the routes that run outside it you tap on as you board and again as you leave. If in doubt, watch the person in front. This is the official page that explains it, if either of you wants to read it once rather than guess at the door.',
   u:'https://www2.city.kyoto.lg.jp/kotsu/webguide/en/',ub:'KYOTO TRANSPORT GUIDE'},
  ]},

 {k:'OSAKA — 22 SEP', c:'purple',
  sub:'A day trip on a subway network that is much easier than Kyoto&rsquo;s buses. ICOCA taps through everything.',
  items:[
  {s:'use',t:'Osaka Metro — official route search',meta:'22 SEP',
   d:'Nine colour-coded lines, all signed in English, all IC-card. The Midosuji line (red) runs the length of the city and connects almost everything on the Osaka day.',
   u:'https://subway.osakametro.co.jp/en/',ub:'OSAKA METRO'},
  {s:'map',t:'Osaka Metro route map',meta:'SCREENSHOT THIS',
   d:'One image, nine lines. Worth having offline for the same reason as the Tokyo one — you will want it underground, where there is no signal.',
   u:'https://subway.osakametro.co.jp/en/guide/routemap.php',ub:'OSAKA ROUTE MAP'},
  {s:'use',t:'Osaka-Info — the city&rsquo;s own visitor guide',meta:'IF THE DAY IS STILL OPEN',
   d:'The official tourism site. Useful for opening hours and area maps if you decide the shape of the Osaka day once you are there, which is still the plan.',
   u:'https://osaka-info.jp/en/',ub:'OSAKA-INFO'},
  ]},

 {k:'NARA — 27 SEP', c:'green',
  sub:'One booked train in, and then it is a walking town. Nothing to install.',
  items:[
  {s:'use',t:'Kintetsu — the AONIYOSHI',meta:'27 SEP, 12:55',
   d:'The express ticket is already bought and ticketless; you tap ICOCA for the basic fare at the gate. Kintetsu&rsquo;s English site is where to check the train if anything changes — it does not run on Thursdays, but the 27th is a Sunday.',
   u:'https://www.ticket.kintetsu.co.jp/vs/en/e-ticket/',ub:'KINTETSU E-TICKET'},
  ]},

 {k:'AMANOHASHIDATE AND INE — 25–27 SEP', c:'pink',
  sub:'The one stretch of the trip where apps stop helping. It is two buses and a boat, run by small local operators, and the timetable on the wall is the truth.',
  items:[
  {s:'use',t:'Tankai Bus — the Ine buses',meta:'25 AND 27 SEP',
   d:'The buses between Amanohashidate and Ine are run by Tankai (丹海バス). The site is Japanese only — use your phone&rsquo;s camera translation on it, or better, <b>photograph the printed timetable at the bus stop on the day you arrive</b>. The 08:11 on the 27th is the only one that makes the 09:50 train, so that photograph matters more than any app.',
   u:'https://www.tankai.jp/',ub:'TANKAI BUS (JAPANESE)'},
  {s:'use',t:'Amanohashidate &amp; Ine tourism — English',meta:'REFERENCE',
   d:'The area&rsquo;s own English site, with the boat, the cable car and the sandbar. The Ine tourism association runs the sea taxi listings and the guide bookings.',
   u:'https://www.amanohashidate.jp/en/',ub:'AMANOHASHIDATE'},
  {s:'use',t:'Ine tourism association',meta:'THE SEA TAXI AND GUIDES',
   d:'Where the funaya tours, the sea taxi and the Beyond the Postcard walk are listed. If Miyabi is slow to answer, this is the other end of the same village.',
   u:'https://www.ine-kankou.jp/',ub:'INE KANKOU'},
  ]},

 {k:'THE KISO VALLEY — 28 SEP–1 OCT', c:'orange',
  sub:'Rural single-track rail and a handful of buses a day. Google Maps knows the trains and is unreliable on the buses.',
  items:[
  {s:'use',t:'Nagiso town — access, buses and the Magome–Tsumago walk',meta:'28 SEP–1 OCT',
   d:'The town&rsquo;s own English access page: the Chūō line trains, the bus between Tsumago and Nagiso (13:00 · 13:50 · 15:40 · 16:10), and the trailhead. This is more accurate than any app for the valley.',
   u:'https://en.nagiso.jp/access/',ub:'NAGISO ACCESS'},
  {s:'use',t:'JR Central — the Shinano and the Nozomi',meta:'28 SEP AND 1 OCT',
   d:'Both Shinano limited expresses and both Nozomi are JR Central services. English timetables and live disruption. <b>The 15:00 Shinano 17 on the 28th and the 08:09 Shinano 2 on the 1st are the only ones that stop at Nagiso</b> at those times of day — this is the page to check if anything wobbles.',
   u:'https://global.jr-central.co.jp/en/info/timetable/',ub:'JR CENTRAL'},
  ]},

 {k:'THE SHINKANSEN — 28 SEP AND 1 OCT', c:'blue',
  sub:'Both bullet-train legs are already booked and digital. One app, two journeys.',
  items:[
  {s:'core',t:'SmartEX — the two Nozomi',meta:'INSTALL BEFORE YOU FLY',
   d:'Both Nozomi are SmartEX bookings. Install the app and sign in <b>before you leave</b>, then link an IC card in the app and tap that card at the gate. Smart EX also issues a QR ticket that the barrier reads — Reservation Details, then Display QR-Ticket — so there are two ways through and neither needs a paper ticket. A forgotten password is much easier to sort out now than at Kyoto Station on the 28th with a train to catch.',
   u:'https://smart-ex.jp/en/index.php',ub:'SMARTEX'},
  ]},

 {k:'TOKYO — 1–5 OCT', c:'purple',
  sub:'Two subway companies plus JR East share the same city. The IC card works on all of them; the fares do not merge. The map you want covers all three.',
  items:[
  {s:'map',t:'Tokyo subway map — Metro and Toei together',meta:'SCREENSHOT THIS',
   d:'The most useful offline image of the trip. It covers both subway operators on one sheet. Save it to your photos tonight; you will look at it underground, where nothing loads.',
   u:'https://www.tokyometro.jp/tst/assets/pdf/train-route--en.pdf',ub:'TOKYO SUBWAY MAP (PDF)'},
  {s:'use',t:'Tokyo Metro — route search and live status',meta:'1–5 OCT',
   d:'Nine of the lines. Their English site has a route search and a live service status page that is worth checking before a long hop across the city.',
   u:'https://www.tokyometro.jp/en/',ub:'TOKYO METRO'},
  {s:'use',t:'Toei Subway — the other four lines',meta:'1–5 OCT',
   d:'Ōedo, Asakusa, Mita and Shinjuku are run by the city, not by Tokyo Metro. Same IC card, same gates — but two different fares. Change from a Metro line to a Toei line mid-journey and you pay both base fares; the IC card knocks about ¥70 off and that is all. If a day has three or more crossings, the visitor-only <b>Tokyo Subway Ticket</b> (24h ¥800, 48h ¥1,200, 72h ¥1,500) covers both operators and is sold at Haneda and the big stations. No Tokyo Metro day pass is valid on Toei.',
   u:'https://www.kotsu.metro.tokyo.jp/eng/',ub:'TOEI SUBWAY'},
  {s:'use',t:'Taxis: when the app works, and when to ask the desk',meta:'READ ONCE, APPLIES ALL TRIP',
   d:'<b>Use the GO app</b> when you want a taxi now, in Kyoto, Osaka or Tokyo. Card saved, English, drop the pin precisely, and it is usually a few minutes. That covers most of the trip.<br><br><b>Ask the hotel or the restaurant instead</b> in three situations. <b>1 · A pickup at a set time in advance</b> — the 06:30 to Kiyomizu, the 08:45 to Shinagawa on the last morning. Reception books a car that turns up; the app finds whatever is free at the moment you press it, which at dawn may be nothing. <b>2 · Anywhere rural.</b> GO has no meaningful coverage in Ine, the Kyotango coast or the Kiso valley — there, a taxi means the host or the inn phoning a local firm, and it can take half an hour to arrive. <b>3 · When the address is hard.</b> A Japanese address read out by a person beats a pin dropped on a lane.<br><br>Either way, say the destination in Japanese if you can — the day pages give it where it matters.',
   u:'https://go.goinc.jp/en/',ub:'GO APP'},
  {s:'use',t:'GO TOKYO — how the subway actually works',meta:'READ ONCE',
   d:'The city&rsquo;s official explainer: transferring between operators, what the numbered station codes mean (G-09, and so on), and why following the letter-and-number is easier than reading the name.',
   u:'https://www.gotokyo.org/en/plan/getting-around/subways/index.html',ub:'GO TOKYO'},
  ]},

 {k:'HANEDA → LONDON — 5 OCT', c:'blue',
  sub:'One flight, one terminal, nothing to change.',
  items:[
  {s:'use',t:'British Airways — Manage My Booking',meta:'CHECK IN SUN 4 OCT FROM 13:05 JAPAN TIME',
   d:'Online check-in opens 24 hours before, which is Sunday lunchtime in Tokyo. Haneda Terminal 3 is the international terminal, so there is no terminal hop at this end.',
   u:'https://www.britishairways.com/travel/managebooking/public/en_gb',ub:'BA MANAGE BOOKING'},
  ]},
];

function itemRow(x){
  return '<div class="chk'+(x.s==='map'?'':'')+'">'+
    '<div class="box">'+(x.s==='core'?'!':x.s==='map'?'▣':'→')+'</div>'+
    '<div style="flex:1;min-width:0">'+
      '<div class="t">'+x.t+'</div>'+
      '<div class="d">'+x.d+'</div>'+
      '<div class="meta">'+x.meta+'</div>'+
      (x.u?'<div class="btnrow" style="margin-top:8px"><a class="btn mini yellow" target="_blank" rel="noopener" href="'+x.u+'">'+x.ub+' ↗</a></div>':'')+
    '</div></div>';
}

P.renderGetting=function(){
  let h='<div class="hero" style="box-shadow:8px 8px 0 #000;margin:20px 0"><div class="hbody" style="padding:18px 16px">'+
    '<div class="datebar">GETTING AROUND</div>'+
    '<h2 style="font-size:30px;margin:6px 0 4px">🚉 Which app, which map, when</h2>'+
    '<p class="mono" style="font-size:11.5px;margin:6px 0 0">EVERY PLACE ON THE TRIP · WHAT TO INSTALL TONIGHT · WHAT TO SAVE OFFLINE</p>'+
    '</div></div>';
  h+='<div class="info-box" style="margin-bottom:22px"><b>The short version.</b> Google Maps with the cities downloaded, ICOCA in both phones, and screenshots of three maps will carry you through the entire trip. Everything else on this page is for the moment when something does not turn up — a bus in Kyoto, a boat in Ine, a train in the Kiso valley — and you want the operator&rsquo;s own answer rather than a guess.<br><br><b>! </b>do it before you fly &nbsp; <b>▣ </b>a map to save offline &nbsp; <b>→ </b>open it when you are there</div>';
  GROUPS.forEach(function(g){
    h+='<div class="sec '+g.c+'"><h3>'+g.k+'</h3><div class="sub">'+g.sub+'</div></div>';
    h+=g.items.map(itemRow).join('');
  });
  h+='<div class="sec red"><h3>Save this site to your phone — 2 minutes, do it on wifi</h3><div class="sub">It then opens like an app, with no signal, anywhere on the trip</div></div>';
  h+='<div class="info-box" style="margin-bottom:22px"><b>iPhone, in Safari (it must be Safari — Chrome on iOS cannot do this):</b><br>'+
    '1. Open this site on <b>wifi</b> and let it finish loading.<br>'+
    '2. Tap through a few day pages, the map view and the planning page. Every page you open gets stored; the whole site is only a few megabytes.<br>'+
    '3. Tap the <b>Share</b> button (the square with the arrow) → scroll down → <b>Add to Home Screen</b> → Add.<br>'+
    '4. A LAMPTEYS icon appears on your home screen. Open it once more while still on wifi.<br>'+
    '5. Test it properly: turn on Aeroplane Mode and open the icon. Everything should still be there. If it is, you are done.<br><br>'+
    '<b>Do this on both phones</b>, tonight, before you pack. Doing it at Kansai on airport wifi is possible but miserable.<br><br>'+
    '<b>Updating it:</b> the site refreshes itself whenever it is opened with signal. If something looks out of date, pull down to refresh on the home page.</div>';
  h+='<div class="sec"><h3>What works with no signal</h3><div class="sub">Worth knowing before you are standing somewhere with one bar</div></div>';
  h+='<div class="info-box" style="margin-bottom:26px"><b>Works offline:</b> this whole website once you have opened it on wifi, the Google Maps areas you downloaded, every screenshot, the ICOCA card in your Wallet, and the SmartEX QR codes if you screenshot them.<br><br><b>Needs signal:</b> live train times, the 📄 booking confirmation links (they are Google Docs — open each one once on wifi and star it for offline in the Google Docs app if you want them without signal), the GO taxi app, and any map you did not download.<br><br><b>Where signal is poor:</b> Ine and the Kyōtango coast, and parts of the Kiso valley between Magome and Tsumago. Both are places where the printed timetable at the stop beats anything on a phone — photograph it when you arrive.</div>';
  h+='<div class="sec orange"><h3>Changing this site while you are away</h3><div class="sub">The honest version, including what will not work</div></div>';
  h+='<div class="info-box" style="margin-bottom:22px">'+
    '<b>How the site actually updates.</b> It is a set of files in a GitHub repository. Anything committed to the <b>main</b> branch appears on the live site about a minute later. That is the whole mechanism — there is no server, no login, no admin panel.<br><br>'+
    '<b>The route that always works, from any phone:</b> open <b>github.com/MicaW/japanitinerary</b> in a browser, sign in, tap into the file, tap the pencil, edit the text, and commit to main. Fiddly on a phone but completely reliable, and it needs nothing installed. If you change anything, also bump the version string at the top of <b>sw.js</b> (<span class="mono">lampteys-vNN</span> → the next number), or phones that already have the site saved will keep showing the old one.<br><br>'+
    '<b>Asking Claude from your phone:</b> ask for the exact replacement text, then paste it into github.com yourself with the pencil. Two minutes, and it needs nothing set up. Claude can only publish directly if the change is routed through the laptop, so assume the paste-it-yourself route is the one you have.<br><br>'+
    '<b>What a phone cannot do:</b> rebuild the booking confirmation PDFs or the whole-site PDF set. Those need a computer. The PDFs in your Drive folder are the snapshot you carry instead.</div>';
  h+='<div class="btnrow" style="margin-bottom:26px"><button class="btn mini" onclick="window.print()">🖨 PRINT THIS PAGE</button></div>';
  return h;
};
})();
