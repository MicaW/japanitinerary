/* PAGES: bookings, budget, packing, etiquette, phrases, map + home extras. */
(function(){
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const P={};

/* ---------- HOME EXTRAS ---------- */
P.glance=[
 ["18 SEP","Flight LGW→KIX","<span class='tag ok'>BOOKED</span>","Air China, one connection, arrive Sat lunchtime"],
 ["19–23 SEP","Kyoto — Henn na Hotel","<span class='tag ok'>BOOKED</span>","Kyoto Station base: Higashiyama, Zen day, Osaka day trip"],
 ["23–25 SEP","Arashiyama — HOSHINOYA retreat","<span class='tag ok'>BOOKED</span> <span class='tag book'>MEALS/TRANSFER TO RESERVE</span>","Riverside retreat in the Arashiyama gorge"],
 ["25–27 SEP","Ine — Miyabi funaya","<span class='tag ok'>BOOKED</span> <span class='tag book'>DINNERS TO RESERVE</span>","Boathouse village over the sea; sea taxi with a fisherman"],
 ["27–28 SEP","Kyoto reset — Henn na","<span class='tag ok'>BOOKED</span>","Afternoon in Nara (Great Buddha, deer), Fushimi Inari at dusk, laundry"],
 ["28–29 SEP","Kiso — Yui-an farmhouse","<span class='tag ok'>BOOKED</span>","200-year-old farmhouse, communal dinner"],
 ["29 SEP–1 OCT","Kiso — MOUNTAinn Nagiso","<span class='tag ok'>BOOKED</span>","Magome→Tsumago walk + Narai rail day; same family as Yui-an"],
 ["1–5 OCT","Tokyo — Shimokitazawa apartment","<span class='tag ok'>BOOKED</span>","Design, vintage, museums, teamLab, the surreal finale"],
 ["5 OCT","Flight HND→LHR","<span class='tag ok'>BOOKED</span>","BA6 nonstop, 13:05 → 19:50 London"]];
P.howWeEat="<b>Cheap breakfasts:</b> konbini egg sandos, bakery runs (SIZUYA's ¥300 Carnet roll in Kyoto Station, Shimokita's bakeries in Tokyo). <b>Big lunches:</b> teishoku set-lunches and market grazes — the same kitchens charge half their dinner prices at noon (Nishiki, Kuromon, Ameyoko, Narai soba, Funaya Shokudo). <b>Local dinners:</b> holes-in-the-wall and yokocho lanes — station izakaya, Nonbei Yokocho's 38 tiny bars, Omoide Yokocho's smoke and skewers, plus the inn dinners already included in the mountains. Eat like this and the generous ¥12,000/day food budget becomes ~¥10,000 without ever feeling cheap.";
P.silverWeek="Our first five days sit inside a rare five-day national break — <b>Silver Week</b> (weekend + Respect for the Aged Day 21st + Citizens' Holiday 22nd + Autumnal Equinox 23rd). It means bigger crowds at famous places, full trains and busy restaurants — and it's also a gift: Japan on holiday is Japan at its most itself. The plan already works around it (dawn starts, taxis over buses, one reserved meal a day maximum), and each day page carries the holiday's meaning, not just its queues. One transport rule: all Nozomi Shinkansen seats are reserved-only 18–23 Sep — no winging it on bullet trains that week.";


/* ---------- TRAINS TO RESERVE (verified against 2026 timetables, 2 Sep 2026) ---------- */
const TRAINS=[
 {d:"19 SEP · SAT",n:"HARUKA (any train)",r:"Kansai Airport → Kyoto",t:"Any HARUKA after landing (~every 30 min)",p:"¥2,200 each (discounted one-way)",w:"JR-WEST ONLINE TRAIN RESERVATION → 'HARUKA One-way Ticket' → KIX–Kyoto ×2. Real credit card only. Collect at the KIX ticket machine after landing (reservation no. + your PIN + the card + passports), then add seats on the next train at the same machine",u:"https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/",jp:"はるか　関西空港→京都　大人2名　※「HARUKA One-way Ticket」ネット予約済み",note:"NOT sold inside Japan — JR West's own rule. Without it you pay ~¥3,640 each at the airport."},
 {d:"25 SEP · FRI",n:"HASHIDATE 5 (はしだて5号)",r:"Kameoka 10:43 → Amanohashidate 12:36 (also stops Kyoto 10:25, Nijo 10:30, Sonobe 10:55)",t:"10:43 from Kameoka — or book from Kyoto and board at Kameoka; boarding part-way on a Kyoto ticket is allowed",p:"¥4,820 each from Kameoka",w:"e5489 (JR West online) → search 'Kameoka → Amanohashidate', 25 Sep, 10:43 → 2 reserved seats → collect at any JR West ticket machine (Kyoto Station on 19 Sep). Or the Kyoto ticket office with the sheet below",u:"https://www.jr-odekake.net/goyoyaku/e5489/",jp:"9月25日（金）　特急はしだて5号　亀岡 10:43発 → 天橋立 12:36着　指定席　大人2名　※はしだて号車でお願いします",note:"Two trains in one — sit in the seat printed on the ticket and you are in the right half."},
 {d:"27 SEP · SUN",n:"HASHIDATE 2 (はしだて2号)",r:"Amanohashidate 09:50 → Kyoto 12:07 (platform 31)",t:"09:50",p:"¥5,000 each",w:"e5489, same session as above → 'Amanohashidate → Kyoto', 27 Sep, 09:50 → 2 reserved seats → collect with the others",u:"https://www.jr-odekake.net/goyoyaku/e5489/",jp:"9月27日（日）　特急はしだて2号　天橋立 9:50発 → 京都 12:07着　指定席　大人2名",note:"The 08:11 bus from Ine is the only one that makes it."},
 {d:"27 SEP · SUN",n:"AONIYOSHI (あをによし) — optional",r:"Kyoto 12:55 → Kintetsu-Nara 13:28",t:"12:55",p:"~¥1,490 each (fare ¥760 + express ¥520 + special car ¥210)",w:"Kintetsu 'Internet reservation' site → 27 Sep → Kyoto → Kintetsu-Nara → 12:55 → twin seats ×2, ticketless. If full, skip: the ordinary limited express at 13:25 is bought at the Kintetsu machine on the day (¥1,280)",u:"https://www.ticket.kintetsu.co.jp/vs/en/e-ticket/",jp:"9月27日（日）　観光特急あをによし　京都 12:55発 → 近鉄奈良 13:28着　ツインシート　大人2名",note:"Runs every day except Thursday. 84 seats — check availability now."},
 {d:"28 SEP · MON",n:"NOZOMI (any ~13:15–13:30)",r:"Kyoto → Nagoya (34 min)",t:"~13:2x — anything reaching Nagoya by 14:30",p:"¥5,710 each",w:"SmartEX app/site → 28 Sep → Kyoto → Nagoya → pick a Nozomi around 13:20 → 2 reserved seats, D+E → register your ICOCA/Suica so you tap through the gates",u:"https://smart-ex.jp/en/index.php",jp:"9月28日（月）　のぞみ　京都 13:2x発 → 名古屋　指定席　大人2名　※スマートEX予約済み",note:"Nozomi runs every 10–15 min; this one is not precious."},
 {d:"28 SEP · MON",n:"SHINANO 17 (しなの17号)",r:"Nagoya 15:00 → Nagiso 16:00",t:"15:00 — platform 10 at Nagoya",p:"~¥3,400 each reserved",w:"e5489 → 'Nagoya → Nagiso', 28 Sep, 15:00 → 2 reserved seats (the seat map lets you pick) → collect at Kyoto with the Hashidates. Or the Kyoto ticket office with the sheet",u:"https://www.jr-odekake.net/goyoyaku/e5489/",jp:"9月28日（月）　特急しなの17号　名古屋 15:00発 → 南木曽 16:00着　指定席　大人2名",note:"The ONLY afternoon Shinano that stops at Nagiso. Paper tickets — no IC cards at Nagiso."},
 {d:"1 OCT · THU",n:"SHINANO 2 (しなの2号)",r:"Nagiso 08:09 → Nagoya 09:18",t:"08:09",p:"~¥3,400 each reserved",w:"e5489, same session → 'Nagiso → Nagoya', 1 Oct, 08:09 → 2 reserved seats → collect at Kyoto",u:"https://www.jr-odekake.net/goyoyaku/e5489/",jp:"10月1日（木）　特急しなの2号　南木曽 8:09発 → 名古屋 9:18着　指定席　大人2名",note:"The only morning Shinano that stops at Nagiso southbound. Next is 15:55."},
 {d:"1 OCT · THU",n:"NOZOMI (~11:30)",r:"Nagoya → Shinagawa (~1h 30)",t:"~11:3x (the 10:49 → 12:17 also fine)",p:"¥11,100 each",w:"SmartEX → 1 Oct → Nagoya → Shinagawa → 2 reserved seats, D+E — E is the Fuji window",u:"https://smart-ex.jp/en/index.php",jp:"10月1日（木）　のぞみ　名古屋 11:3x発 → 品川　指定席　大人2名　E席（富士山側）　※スマートEX予約済み",note:"Flat check-in is 15:00 — no need to take an earlier one."}
];
P.TRAINS=TRAINS;

/* Bookings / To Do / Packing lists moved to js/data/lists.js (Dad + Mica departure lists, 7 Sep 2026) */
P.renderBudget=function(){
 const SHEET='https://docs.google.com/spreadsheets/d/1bad1u4OgQd_rjvglhP8X8n3OR7R6hVGBMK79HcNTPjk';

 /* ---------- THE NUMBERS (edit here only) ----------
    Every advance booking, with the date the payment is (or was) taken.
    date: ISO yyyy-mm-dd = the day the card is charged. paid:true = already paid, date not needed.
    est:true = a train fare that is an estimate until it is actually booked; if you have not booked it
    yet, move its date to the day you plan to. The page works out PAID vs LEFT TO PAY from today's date. */
 const BOOKINGS=[
  {n:"Flights — LGW→KIX, HND→LHR (both paid)",     amt:1139.67, paid:true},
  {n:"Ine Funaya Miyabi — 25–27 Sep",              amt:605.96,  paid:true},
  {n:"Amanohashidate trains, both ways",           amt:108.42,  date:"2026-09-12", est:true},
  {n:"Kyoto→Nagoya + Nagoya→Nagiso",               amt:100.64,  date:"2026-09-12", est:true},
  {n:"U Place Shimokitazawa — 1–5 Oct",            amt:712.41,  date:"2026-08-31"},
  {n:"Kiso→Nagoya + Nagoya→Tokyo",                 amt:157.37,  date:"2026-09-12", est:true},
  {n:"Henn na Kyoto — 19–23 Sep",                  amt:843.78,  date:"2026-09-17"},
  {n:"Hostel Yui-an — 28–29 Sep",                  amt:148.71,  date:"2026-09-20"},
  {n:"MOUNTAinn Nagiso — 29 Sep–1 Oct",            amt:422.00,  date:"2026-09-21"},
  {n:"Henn na Kyoto reset — 27–28 Sep",            amt:109.00,  date:"2026-09-25"}
 ];
 const SPEND_TWO=2077, SPEND_EACH=1038;   /* spending money, estimated — see the table below */

 /* ---------- WORK IT OUT FROM TODAY ---------- */
 const now=new Date();
 const today=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
 const isPaid=b=>b.paid||(b.date&&b.date<=today);
 const money=(v,approx)=>(approx?'~':'')+'£'+v.toLocaleString('en-GB',{minimumFractionDigits:approx?0:2,maximumFractionDigits:approx?0:2});
 const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 const dshort=iso=>{const p=iso.split('-');return parseInt(p[2],10)+' '+MON[parseInt(p[1],10)-1];};
 const sum=a=>Math.round(a.reduce((t,b)=>t+b.amt,0)*100)/100;
 const paidList=BOOKINGS.filter(isPaid), leftList=BOOKINGS.filter(b=>!isPaid(b));
 const paidTot=sum(paidList), leftTot=sum(leftList), bookTot=paidTot+leftTot;
 const tripTot=bookTot+SPEND_TWO, share=tripTot/2, dadOwes=bookTot/2, dadTopUp=dadOwes-SPEND_EACH;
 const next=leftList.slice().sort((a,b)=>a.date<b.date?-1:1)[0];

 let h='<div class="sec blue"><h3>💰 Budget</h3><div class="sub">Shared costs, split down the middle · ¥190/£ · paid/unpaid as of today, '+now.getDate()+' '+MON[now.getMonth()]+'</div></div>';

 /* ---------- HEADLINE ---------- */
 h+='<div class="bigfig">'+
   '<div class="bf tot"><div class="bfk">TRIP COST</div><div class="bfv">'+money(tripTot,true)+'</div><div class="bfs">Everything shared · '+money(share,true)+' each</div></div>'+
   '<div class="bf"><div class="bfk">SPENDING MONEY</div><div class="bfv">'+money(SPEND_EACH,true)+'</div><div class="bfs">Each, for the whole trip</div></div>'+
   '</div>';

 h+='<div class="bigfig two">'+
   '<details class="bf exp"><summary><div class="bfk">BOOKINGS PAID</div><div class="bfv">'+money(paidTot)+'</div>'+
     '<div class="bfs">'+paidList.length+' of '+BOOKINGS.length+' · all by Mica · tap for detail</div></summary>'+
     '<div class="bfbody"><table class="simple mini"><tr><th>WHAT</th><th>TAKEN</th><th>PAID</th></tr>'+
     paidList.map(b=>'<tr><td>'+b.n+'</td><td>'+(b.date?dshort(b.date):'—')+'</td><td>'+money(b.amt)+(b.est?' <span style="opacity:.6">est.</span>':'')+'</td></tr>').join('')+
     '<tr class="tr-tot"><td>TOTAL</td><td></td><td>'+money(paidTot)+'</td></tr></table>'+
     (paidList.some(b=>b.est)?'<p class="bfnote">est. = fare still to be confirmed against the receipt.</p>':'')+
     '</div></details>'+

   '<details class="bf exp"><summary><div class="bfk">BOOKINGS LEFT TO PAY</div><div class="bfv">'+money(leftTot)+'</div>'+
     '<div class="bfs">'+(next?'Next: '+dshort(next.date)+' · tap for dates':'Nothing left — all paid')+'</div></summary>'+
     '<div class="bfbody">'+(leftList.length?'<table class="simple mini"><tr><th>WHAT</th><th>WHEN</th><th>AMOUNT</th></tr>'+
     leftList.map(b=>'<tr><td>'+b.n+'</td><td><b>'+dshort(b.date)+'</b></td><td>'+money(b.amt)+(b.est?' <span style="opacity:.6">est.</span>':'')+'</td></tr>').join('')+
     '<tr class="tr-tot"><td>TOTAL</td><td></td><td>'+money(leftTot)+'</td></tr></table>'+
     '<p class="bfnote">Hotels are charged on the date shown and are cancellable until then.</p>':'<p class="bfnote">Every advance booking has been taken.</p>')+
     '</div></details>'+
   '</div>';

 /* ---------- WHO PAYS WHAT ---------- */
 h+='<div class="sec"><h3>You and Dad</h3><div class="sub">Mica pays every advance booking and Dad transfers half. Spending money is separate — each pays their own on the ground</div></div>';
 h+='<div style="overflow-x:auto"><table class="simple"><tr><th></th><th>MICA</th><th>DAD</th></tr>'+
  '<tr><td>Bookings paid so far</td><td>'+money(paidTot)+'</td><td>£0</td></tr>'+
  '<tr><td>Bookings still to pay</td><td>'+money(leftTot)+'</td><td>£0</td></tr>'+
  '<tr><td><b>All advance bookings</b></td><td><b>'+money(bookTot)+'</b></td><td><b>£0</b></td></tr>'+
  '<tr class="tr-tot"><td>DAD TRANSFERS TO MICA</td><td></td><td>'+money(dadOwes)+'</td></tr>'+
  '<tr><td>Spending money, each</td><td>'+money(SPEND_EACH,true)+'</td><td>'+money(SPEND_EACH,true)+'</td></tr>'+
  '<tr><td>Total each</td><td>'+money(share,true)+'</td><td>'+money(share,true)+'</td></tr></table></div>';
 h+='<div class="info-box" data-label="How it settles">Dad sends <b>'+money(dadOwes)+'</b> — half of the flights, hotels and reserved trains — before you fly. In Japan everything is split as you go, about <b>'+money(SPEND_EACH,true)+' each</b>.</div>';

 /* ---------- SPENDING MONEY ---------- */
 h+='<div class="sec"><h3>Spending money — £1,038 each</h3><div class="sub">Everything you pay for once you are there. Nothing here needs booking</div></div>';
 h+='<div style="overflow-x:auto"><table class="simple"><tr><th>CATEGORY</th><th>FOR TWO</th><th>EACH</th><th>WHAT IT COVERS</th></tr>'+
  '<tr><td>Transport paid on the day</td><td>~£274</td><td>~£137</td><td>HARUKA from the airport, all local trains and metro, taxis, the Ine buses, the Kiso rail day, the airport run home</td></tr>'+
  '<tr><td>Activities — core plan</td><td>~£475</td><td>~£238</td><td>Sumo show, cooking class, zazen, Golden Gai night</td></tr>'+
  '<tr><td>Activities — optional</td><td>~£318</td><td>~£159</td><td>Bikes, Kagaya, gigs and the other optional extras</td></tr>'+
  '<tr><td>Food &amp; drink</td><td>~£1,010</td><td>~£505</td><td>Deliberately generous. Konbini lunches pull this down hard</td></tr>'+
  '<tr class="tr-tot"><td>TOTAL</td><td>~£2,077</td><td>~£1,038</td><td></td></tr></table></div>';
 h+='<div class="info-box" data-label="In yen">£1,038 each is roughly <b>¥197,000</b> at ¥190/£ — call it ¥200,000 a head for the fortnight, or about ¥11,000 a day. Draw cash on 18 Sep before the banks shut for Silver Week.</div>';

 /* ---------- TRANSPORT SPLIT ---------- */
 h+='<div class="sec"><h3>Transport — what to reserve, and when</h3><div class="sub">Six legs need reserved seats. Everything else you simply turn up for</div></div>';
 h+='<div style="overflow-x:auto"><table class="simple"><tr><th>LEG</th><th>BOOK BY</th><th>FARE (TWO)</th><th>NOTE</th></tr>'+
  '<tr><td>Kameoka → Amanohashidate — 25 Sep</td><td>OPEN NOW</td><td>£50.74</td><td>HASHIDATE 5, 10:43 → 12:36. ¥4,820 each, confirmed</td></tr>'+
  '<tr><td>Amanohashidate → Kyoto — 27 Sep</td><td>OPEN NOW</td><td>£52.63</td><td>HASHIDATE 2, 09:50 → 12:07. ¥5,000 each, confirmed</td></tr>'+
  '<tr><td>Kyoto → Nagoya — 28 Sep</td><td>OPEN NOW</td><td>£60.11</td><td>Nozomi ~13:2x via SmartEX</td></tr>'+
  '<tr><td>Nagoya → Nagiso — 28 Sep</td><td>OPEN NOW</td><td>~£35.79</td><td>SHINANO 17, 15:00 → 16:00 — the only afternoon one that stops</td></tr>'+
  '<tr><td>Nagiso → Nagoya — 1 Oct</td><td>OPEN NOW</td><td>~£35.79</td><td>SHINANO 2, 08:09 → 09:18 — the only morning one that stops</td></tr>'+
  '<tr><td>Nagoya → Shinagawa — 1 Oct</td><td>OPEN NOW</td><td>£116.84</td><td>Nozomi ~11:30 via SmartEX. Seat E for Fuji</td></tr>'+
  '<tr class="tr-tot"><td>RESERVED SEATS — in the bookings total</td><td></td><td>~£352</td><td></td></tr>'+
  '<tr><td colspan="4" style="padding-top:10px"><b>Paid on the day, in spending money:</b> HARUKA airport express (¥2,200pp, bought online before flying), Kyoto↔Osaka (¥580 each way), Kyoto→Nara and back via Fushimi Inari (~¥2,300pp incl. the AONIYOSHI), all local trains and metro, taxis to Kiyomizu and Daitoku-ji, the Amanohashidate–Ine bus (¥400pp), the Ine sea taxi, the Kiso rail day (~¥5,500–7,000 for two), Tokyo metro hops, and the Haneda run on 5 Oct. <b>~£274 for two.</b></td></tr>'+
  '</table></div>';

 /* ---------- THE GIFT, QUIETLY ---------- */
 h+='<div class="info-box" data-label="HOSHINOYA Kyoto — 23–25 Sep">£0 — birthday gift. Not counted in any total on this page.</div>';

 /* ---------- SHEET ---------- */
 h+='<div class="sec"><h3>The live sheet</h3><div class="sub">The record. Log real spend as you go</div></div>';
 h+='<div class="btnrow" style="margin-bottom:12px"><a class="btn yellow big" style="flex:1" target="_blank" rel="noopener" href="'+SHEET+'/edit">📊 OPEN IN GOOGLE SHEETS</a></div>';
 h+='<div class="btnrow" style="margin-bottom:14px"><a class="btn mini" target="_blank" rel="noopener" href="'+SHEET+'/export?format=xlsx">⬇ XLSX</a><a class="btn mini" target="_blank" rel="noopener" href="'+SHEET+'/export?format=pdf">⬇ PDF</a></div>';
 h+='<div class="mapframe" style="height:420px">'+(navigator.onLine?'<iframe loading="lazy" src="'+SHEET+'/preview"></iframe>':'<div class="map-off">📡 The live sheet needs signal — the summary above is saved offline.</div>')+'</div>';
 return h;
};

/* ---------- ETIQUETTE ---------- */
const TIPS=[
 ["Check the LAST ORDER, not the closing time","The single most repeated warning in everything we read. A restaurant closing at 22:00 often stops taking orders at 21:00, and a temple closing at 16:30 often stops admitting at 16:00. Assume the useful deadline is 30–60 minutes before the published one."],
 ["Read the price tag properly","The BIG number on a Japanese shelf tag is usually 税抜 — the price EXCLUDING tax. The smaller number beside it, marked 税込, is what you actually pay. A tag reading ¥1,450 / ¥1,595 means you are paying ¥1,595."],
 ["Ticket machines come before seats","In most ramen shops, food halls and cheap eateries you buy a ticket from a machine at the door and hand it over. Many now have photos and English. Red or unlit buttons mean sold out — check before pressing."],
 ["Konbini lunch, proper dinner","The habit that stretches the food budget furthest: eat the hotel breakfast, buy lunch at a convenience store for a few hundred yen, then spend properly in the evening. Konbini food in Japan is genuinely good, not a compromise."],
 ["Bring cash, and get it before the 19th","Plenty of small places are cash-only or cash-and-QR-only — Uoshin in Sangenjaya, most market stalls, the Ine buses, rural Kiso. Bank counters shut 19–23 Sep for Silver Week; 7-Eleven ATMs keep working and take UK cards."],
 ["Where your IC card stops working","Suica/ICOCA on the phone covers Kyoto, Osaka, Nara, Tokyo and every big-city train and bus. It does NOT work on: the Tankai bus to Ine (cash only), the Tango Railway section beyond Fukuchiyama (your paper reserved tickets cover it), any JR station between Nakatsugawa and Shiojiri — so Nagiso, Narai, Kiso-Fukushima and Agematsu are paper tickets from the machine — and the Nagiso town buses (cash to the driver). Rule of thumb: mountains and fishing villages = cash and paper."],
 ["Find bus stops with Google Maps","Search the place name plus the words 'bus stop' rather than just the place — it returns the actual boarding point instead of the destination. Especially useful in Nara, Ine and the Kiso valley where the stop can be a long way from the sight."],
 ["Look up — restaurants are stacked","Japanese cities put restaurants on the 5th, 8th, 9th floor of ordinary buildings. Namba Ramen Ichiza is a whole ramen street on the 9th floor above an electronics shop. If a street looks like it has nothing, read the vertical signs."],
 ["Ordering a drink is a multi-step flow","Bubble tea and coffee chains ask size, then ice level, then toppings. Worth knowing that 'no ice' often costs MORE (¥80–100), not less, because you get more drink."],
 ["Buying matcha, ranked","If you want the good stuff: Horii Shichimeien, Ippodo and Marukyu Koyamaen are the top tier. Yamasa Koyamaen, Nakamura Tokichi, Hoshino Seichaen and Ooikaen are the next. Tsujiri and Matcha Republic are the tourist-facing ones — fine, but not what a Kyoto tea person would buy."],
 ["Korean skincare is far cheaper here","Roughly half the UK or US price in Japanese drugstores, with testers out on the shelf. If anyone at home wants something bringing back, this is the easiest win in the country."],
 ["Forward the bags, do not drag them","Takkyubin luggage forwarding is normal, cheap and beloved — hotels arrange it at the desk. Roughly ¥2,000–2,500 a bag per leg, and it turns the awkward transfer days into easy ones."],
 ["Sunday is the wrong day for some things","Kappabashi loses about 60% of its shops on a Sunday. Tsukiji outer market is a market-closure day. Toridai in Jujo shuts. Museums shut on Mondays instead. Check the day before you build a morning around somewhere."],
 ["Twenty centimetres of water","From the Honjo disaster centre: 20 cm of floodwater makes a door feel 25 kg heavier — do not count on opening one against it. And in a fire, stay low and crawl under the smoke. Worth knowing in typhoon season."],
 ["Some places hide their address on purpose","Several of the venues in this guide came from posts where the account only releases the address if you comment a keyword. Where that is the case the card says so — pin the place before you go rather than hunting on the night."]
];
const ET=[
 ["Queuing & public space","Queues are sacred and self-organising: platform markings show where doors open — stand on the marks. Escalators: stand LEFT in Tokyo, RIGHT in Osaka (yes, really — follow the locals). Blowing your nose loudly in public is worse than sniffing; step aside."],
 ["Trains & buses","Phones on silent ('manner mode'), calls are never taken aboard. Talk quietly. Priority seats go to whoever needs them; bags on laps or racks, not seats. Eating on local trains: no. On Shinkansen/limited expresses with tray tables: yes — the ekiben is a tradition."],
 ["Luggage","Big cases are the enemy of narrow trains and rural buses — which is why the plan forwards or stores them. On the Shinkansen, oversized cases (>160cm total) need the reserved baggage seats we book. Takkyubin (luggage delivery) is normal and beloved: hotels arrange it at the desk."],
 ["Shoes & indoors","The genkan (entrance step) is the border: shoes off whenever there's a step up, a shoe rack, or slippers waiting. Slippers off on tatami (socks only). Separate TOILET slippers live in the loo — wearing them back out to dinner is the classic visitor error; the recovery is a laugh and a swap."],
 ["Ryokan, minshuku & the farmhouse","Staff may enter to lay futons — that's the service, not an intrusion. Yukata: LEFT side over right (right-over-left dresses the dead). Dinner times are fixed and early; being late strands the kitchen. In old timber houses sound carries — corridor voices at library volume after 21:00."],
 ["Temples","Hats off in halls, shoes off where indicated, photography rules posted at each hall (no-photo means it). Speak softly; worshippers outrank sightseers everywhere. At Zen sessions, sit as instructed and let silence be comfortable — nobody is grading you."],
 ["Shrines","Small bow at the torii. Purify at the water basin: right hand washes left, left washes right, pour into cupped hand to rinse mouth (never drink from the ladle). Prayer: coin in, two bows, two claps, wish, one bow. Walk the path's edges — the centre line belongs to the deity."],
 ["Tea, zen & calligraphy sessions","Arrive 10 minutes early, phones off entirely. Handle bowls and brushes as shown, both hands. Questions are welcome after the quiet parts, not during. It's fine to be a beginner — that's the entire premise."],
 ["Onsen & baths","The full procedure: everything off (no swimwear), sit at a stool and wash + rinse THOROUGHLY before the tub, small towel stays OUT of the water (on your head is traditional), hair up, no splashing or swimming. Tattoos: small ones increasingly fine, but private baths (like Miyabi's) skip the question. Hydrate after."],
 ["Restaurants","Say 'sumimasen' to summon staff — it's expected, not rude. Oshibori (hot towel) is for hands, not face (Dad: faces happen, nobody dies). Slurping noodles is correct and improves them. Don't pour your own drink when sharing a bottle — pour each other's. Tipping is not done and will be politely chased down the street."],
 ["Chopsticks","Never stand them upright in rice (funeral rite) and never pass food chopstick-to-chopstick (also funeral). Resting: on the holder or across the bowl. Spearing food: forgiven for visitors. Ask for a fork without shame at okonomiyaki — the spatula is the real tool anyway."],
 ["Bars & karaoke","Small bars (Golden Gai, Shimokita counters) seat 5–8: enter with a greeting, accept the cover charge as rent for the seat, talk to the master and neighbours — that's what the room is FOR. Karaoke rooms are private; enthusiasm outranks talent by law."],
 ["Shopping & payment trays","Money goes in the little tray by the till, not hand-to-hand; change comes back the same way. Items are wrapped with care — receiving nicely is part of the exchange. Eating while walking is frowned on in most places: stand and finish by the stall (Yanaka and festival streets relax this)."],
 ["Photography","People need permission — especially anyone working, anyone in Gion, and absolutely anyone mourning (23 Sep). No-photo signs mean it. Private lanes in Gion carry fines. The rule of thumb: photograph places freely, people politely, rituals rarely."],
 ["Private homes & funaya","Ine's boathouses are homes: the sea-facing openings are their garages and living rooms. Photograph from the road and the water, never through doorways; keep voices down on the lanes; buy something local — that's what keeps the village consenting to visitors."],
 ["Historic streets & rural paths","Magome/Tsumago/Narai are lived-in, not sets: keep to edges when residents pass, don't block shopfronts for photos, ring the bear bells on the trail (they're functional), and greet fellow walkers — 'konnichiwa' on a mountain path is near-mandatory and delightful."],
 ["Rubbish","There are no public bins — carry a bag for your rubbish (packing list has one) and empty it at konbini bins or home base. Separating burnable/plastic/cans at the apartment: the host's chart explains; when in doubt, rinse and separate."],
 ["Smoking","Illegal on most streets outside marked smoking corners; fine inside designated rooms/areas. The marked pavement boxes are the only outdoor option."],
 ["When you get it wrong","You will, several times, and it will not matter: a small bow, a smile, 'sumimasen', and moving on repairs almost everything. Nobody expects perfection from visitors — they notice effort. The whole game is: observe what others do, follow signs, avoid inconveniencing people, ask politely when unsure."]];
P.renderEtiquette=function(){
 let h='<div class="sec"><h3>🙇 Japan Etiquette 101</h3><div class="sub">Practical, reassuring, and scannable — the one-line version: watch, follow, don\'t block, ask</div></div>';
 h+='<div class="narr" data-label="The whole guide in one sentence">Observe what others are doing, follow the signs, avoid inconveniencing people, and ask politely when unsure — that\'s 95% of Japanese etiquette. The rest below is detail.</div>';
 ET.forEach(e=>{h+='<details class="more" style="margin-bottom:10px;background:#fff"><summary>'+e[0]+'</summary><div class="inner">'+e[1]+'</div></details>';});
 
 h+='<div class="sec yellow" style="margin-top:26px"><h3>💡 Practical tips</h3><div class="sub">Collected from the research and the saved posts — the things that are not etiquette but will save you money, time or a wasted trip</div></div>';
 TIPS.forEach((t,ix)=>{
  h+='<details class="tdcard b4" style="box-shadow:3px 3px 0 #000;margin-bottom:9px"><summary>'+
     '<div class="tdi">💡</div><div class="tdt"><div class="tdh" style="font-size:14.5px">'+esc(t[0])+'</div></div>'+
     '<span class="exp">▾</span></summary><div class="tdbody"><p style="font-size:13.5px;margin:6px 0">'+t[1]+'</p></div></details>';
 });
 return h;
};

/* ---------- PHRASES ---------- */
const PH=[
 {c:"Greetings & thanks",items:[
  ["Hello","こんにちは","Konnichiwa","kon-nee-chee-wah","Daytime default"],
  ["Good morning","おはようございます","Ohayō gozaimasu","oh-ha-yoh go-zai-mass","Until ~11:00; inn hosts love it"],
  ["Thank you very much","ありがとうございます","Arigatō gozaimasu","ah-ree-gah-toh go-zai-mass","The workhorse — use constantly"],
  ["Excuse me / sorry","すみません","Sumimasen","soo-mee-mah-sen","Summons staff, apologises, thanks — the magic word"],
  ["Please (requesting)","お願いします","Onegai shimasu","oh-neh-guy shee-mass","Attach to any request"],
  ["It was delicious","ごちそうさまでした","Gochisōsama deshita","go-chee-soh-sah-mah desh-ta","Said leaving any meal — melts hearts"],
  ["Cheers!","乾杯","Kanpai","kahm-pie","Glasses up"],
  ["Goodbye (casual)","じゃあまた","Jā mata","jah mah-tah","See you"]]},
 {c:"Asking for help",items:[
  ["Do you speak English?","英語を話せますか？","Eigo o hanasemasu ka?","ay-go oh ha-nah-seh-mass-ka","Opens most doors"],
  ["I don't understand","わかりません","Wakarimasen","wah-kah-ree-mah-sen","Honest and useful"],
  ["Please write it down","書いてください","Kaite kudasai","kai-teh koo-dah-sai","Numbers, names, times"],
  ["Where is …?","…はどこですか？","… wa doko desu ka?","wah doh-koh dess-ka","Point at the written place name"],
  ["Please help me","助けてください","Tasukete kudasai","tass-keh-teh koo-dah-sai","For real trouble"],
  ["Is this OK?","これで大丈夫ですか？","Kore de daijōbu desu ka?","koh-reh deh dai-joh-boo dess-ka","Universal checker"]]},
 {c:"Transport & stations",items:[
  ["Which platform for …?","…は何番線ですか？","… wa nanbansen desu ka?","nan-ban-sen dess-ka","Show the destination in writing"],
  ["Does this train stop at …?","この電車は…に止まりますか？","Kono densha wa … ni tomarimasu ka?","toh-mah-ree-mass-ka","Vital for the Shinano (not all stop at Nagiso!)"],
  ["Where is this bus stop?","このバス停はどこですか？","Kono basutei wa doko desu ka?","bass-tay wah doh-koh","Show the stop name"],
  ["I want to get off at …","…で降りたいです","… de oritai desu","deh oh-ree-tie dess","Rural buses appreciate warning"],
  ["Reserved seats","指定席","shiteiseki","shtay-seh-kee","vs 自由席 jiyūseki (unreserved)"],
  ["Where is the exit for …?","…の出口はどこですか？","… no deguchi wa doko desu ka?","deh-goo-chee","Hachijo Exit = 八条口"]]},
 {c:"Taxis",items:[
  ["To this address, please","この住所までお願いします","Kono jūsho made onegai shimasu","joo-show mah-deh","Show the Japanese address from the hotel card"],
  ["Here is fine","ここで大丈夫です","Koko de daijōbu desu","koh-koh deh dai-joh-boo","To stop"],
  ["Receipt, please","領収書をお願いします","Ryōshūsho o onegai shimasu","ryoh-shoo-show","For the budget sheet"],
  ["Doors open automatically!","(ドアは自動です)","(Doa wa jidō desu)","","Not a phrase — a warning: don't touch taxi doors, they're automatic"]]},
 {c:"Hotels & inns",items:[
  ["Check-in, please","チェックインをお願いします","Chekku-in o onegai shimasu","","With a bow, unstoppable"],
  ["Can you store our luggage?","荷物を預かってもらえますか？","Nimotsu o azukatte moraemasu ka?","nee-moh-tsu ah-zoo-kah-teh","The trip's key logistics phrase"],
  ["What time is breakfast?","朝食は何時ですか？","Chōshoku wa nanji desu ka?","choh-shoh-koo nan-jee","Inn mornings run on schedule"],
  ["The room is wonderful","素敵な部屋ですね","Suteki na heya desu ne","soo-teh-kee nah heh-yah","Hosts glow"]]},
 {c:"Restaurants",items:[
  ["Two people, please","二人です","Futari desu","foo-tah-ree dess","Hold up two fingers, done"],
  ["Menu, please","メニューをお願いします","Menyū o onegai shimasu","","English menu: 英語のメニュー eigo no menyū"],
  ["I'll have this","これをください","Kore o kudasai","koh-reh oh koo-dah-sai","Point at menu/model — the pointing is traditional"],
  ["Recommended dish?","おすすめは何ですか？","Osusume wa nan desu ka?","oh-soo-soo-meh","Then order it — asking and refusing is odd"],
  ["The bill, please","お会計お願いします","O-kaikei onegai shimasu","oh-kai-kay","Or cross index fingers (the X gesture)"],
  ["No chopsticks needed / fork please","フォークをお願いします","Fōku o onegai shimasu","foh-koo","Zero shame"]]},
 {c:"MICA'S DIETARY CARD — show this",big:true,items:[
  ["I don't eat meat (beef, pork, chicken). Fish and seafood are fine. Please no meat broth or meat stock either.","私は肉（牛肉・豚肉・鶏肉）を食べられません。魚と魚介類は大丈夫です。肉のだしやスープも入れないでください。","Watashi wa niku (gyūniku, butaniku, toriniku) o taberaremasen. Sakana to gyokairui wa daijōbu desu. Niku no dashi ya sūpu mo irenaide kudasai.","","Show full-screen to staff — covers meat AND meat stock. Fish dashi is fine and near-universal"],
  ["Does this contain meat or meat broth?","これに肉や肉のだしは入っていますか？","Kore ni niku ya niku no dashi wa haitte imasu ka?","","Point at the menu item"]]},
 {c:"DAD'S DIETARY CARD — show this",big:true,items:[
  ["I can't eat raw fish or raw seafood (no sushi, no sashimi). Cooked fish and meat are fine.","私は生の魚や生の魚介類（寿司・刺身）を食べられません。火を通した魚と肉は大丈夫です。","Watashi wa nama no sakana ya nama no gyokairui (sushi, sashimi) o taberaremasen. Hi o tōshita sakana to niku wa daijōbu desu.","","Show full-screen — 'hi o tōshita' = cooked through, the key phrase for kaiseki and inn dinners"],
  ["Please cook this instead of serving it raw","生ではなく、焼くか火を通してもらえますか？","Nama de wa naku, yaku ka hi o tōshite moraemasu ka?","","For set menus with a sashimi course"]]},
 {c:"Shopping",items:[
  ["How much is this?","これはいくらですか？","Kore wa ikura desu ka?","ee-koo-rah","Numbers below decode the answer"],
  ["Can I try this on?","試着できますか？","Shichaku dekimasu ka?","shee-chah-koo","Vintage shops expect it"],
  ["Just looking, thank you","見ているだけです","Mite iru dake desu","mee-teh ee-roo dah-keh","Releases hovering staff kindly"],
  ["Can you gift-wrap it?","プレゼント用にお願いします","Purezento-yō ni onegai shimasu","","They will exceed expectations"]]},
 {c:"Temples, onsen & culture",items:[
  ["May I take a photo?","写真を撮ってもいいですか？","Shashin o totte mo ii desu ka?","shah-sheen oh toh-teh","THE politeness phrase of the trip"],
  ["Is it OK to enter?","入ってもいいですか？","Haitte mo ii desu ka?","hai-teh moh ee","At any threshold in doubt"],
  ["Where do I take off my shoes?","靴はどこで脱ぎますか？","Kutsu wa doko de nugimasu ka?","koo-tsoo noo-ghee-mass","Asked = respected"],
  ["Goshuin (temple stamp), please","御朱印をお願いします","Goshuin o onegai shimasu","go-shoo-een","If Dad starts a stamp book — a great collector hobby, ~¥300–500 each"]]},
 {c:"Medical & emergencies",big:true,items:[
  ["Please call an ambulance","救急車を呼んでください","Kyūkyūsha o yonde kudasai","kyoo-kyoo-shah yon-deh","Emergency number: 119 (ambulance/fire), 110 (police)"],
  ["I need a doctor","医者が必要です","Isha ga hitsuyō desu","ee-shah gah hee-tsoo-yoh","Hotels will help — show them this"],
  ["It hurts here","ここが痛いです","Koko ga itai desu","koh-koh gah ee-tie","Point"],
  ["I'm allergic to …","…アレルギーがあります","… arerugī ga arimasu","ah-reh-roo-ghee","Fill the blank with the written word"],
  ["Where is a pharmacy?","薬局はどこですか？","Yakkyoku wa doko desu ka?","yahk-kyoh-koo","Matsumoto Kiyoshi = the big chain"],
  ["I lost my passport","パスポートをなくしました","Pasupōto o nakushimashita","","Then: UK Embassy Tokyo +81 3-5211-1100"]]},
 {c:"Directions & signs to recognise",items:[
  ["Left / right / straight","左 / 右 / まっすぐ","hidari / migi / massugu","hee-dah-ree / mee-ghee / mahs-soo-goo","The pointing trio"],
  ["Entrance / exit","入口 / 出口","iriguchi / deguchi","","Learn the kanji: 入口 in, 出口 out"],
  ["Open / closed","営業中 / 準備中","eigyōchū / junbichū","","On every shop door curtain"],
  ["Toilet","お手洗い / トイレ","otearai / toire","oh-teh-ah-rai","Universally understood"],
  ["Push / pull","押 / 引","osu / hiku","","On doors — 押 push, 引 pull"],
  ["Free (no charge)","無料","muryō","moo-ryoh","vs 有料 yūryō = paid"]]},
 {c:"Numbers, time & money",items:[
  ["1–5","一 二 三 四 五","ichi, ni, san, yon, go","ee-chee nee sahn yon goh","Fingers work too"],
  ["6–10","六 七 八 九 十","roku, nana, hachi, kyū, jū","roh-koo nah-nah hah-chee kyoo joo",""],
  ["100 / 1,000 / 10,000","百 / 千 / 万","hyaku / sen / man","hyah-koo / sen / mahn","¥10,000 = ichi-man — the key unit"],
  ["What time?","何時ですか？","Nanji desu ka?","nan-jee dess-ka","Answers come with fingers"],
  ["Cash only?","現金だけですか？","Genkin dake desu ka?","gen-keen dah-keh","Rural Japan says yes"]]},
 {c:"Trip place names (show these)",items:[
  ["Kyoto Station","京都駅","Kyōto-eki","kyoh-toh eh-kee",""],
  ["Kiyomizu-dera","清水寺","Kiyomizu-dera","","Taxi destination day 3"],
  ["Daitoku-ji / Daiji-in","大徳寺 / 大慈院","Daitokuji / Daijiin","","Taxi destination day 4 — show BOTH"],
  ["HOSHINOYA boat lounge","星のや京都 舟待合","Hoshinoya Kyōto funa-machiai","","Near Togetsukyo bridge, south side"],
  ["Amanohashidate","天橋立","Amanohashidate","ah-mah-noh-hash-dah-teh",""],
  ["Ine","伊根","Ine","ee-neh","The bus front sign"],
  ["Nagiso Station","南木曽駅","Nagiso-eki","nah-ghee-soh",""],
  ["Magome / Tsumago","馬籠 / 妻籠","Magome / Tsumago","mah-goh-meh / tsoo-mah-goh",""],
  ["Shimokitazawa","下北沢","Shimokitazawa","shee-moh-kee-tah-zah-wah","Home, for the last four nights"],
  ["Haneda Airport Terminal 3","羽田空港第3ターミナル","Haneda kūkō dai-san tāminaru","","The taxi destination that matters most"]]}];
P.renderPhrases=function(){
 let h='<div class="sec"><h3>🗣️ Japanese Phrases</h3><div class="sub">Tap a section to open it, then tap any phrase for full-screen SHOW-THIS mode</div></div>';
 h+='<div class="info-box" data-label="How these were made">Core phrases use standard polite Japanese. The dietary, medical and emergency cards were written and checked with care — explicit, unambiguous wording (e.g. \'hi o tōshita\' = cooked through) rather than machine translation.</div>';
 PH.forEach((cat,ci)=>{
  let body='';
  cat.items.forEach(p=>{
   const jp=p[1].replace(/'/g,"’"), en=p[0].replace(/'/g,"’");
   body+='<div class="phrase" onclick="showBig(\''+jp+'\',\''+en+'\')">'+
      '<div class="en">'+esc(p[0])+'</div><div class="jp">'+esc(p[1])+'</div>'+
      '<div class="ro">'+esc(p[2])+(p[3]?' • say: '+esc(p[3]):'')+'</div>'+
      (p[4]?'<div class="use">'+esc(p[4])+'</div>':'')+
      '<div class="mono" style="font-size:9px;color:#9ca3af;margin-top:4px">TAP FOR FULL-SCREEN ↗</div></div>';
  });
  h+='<details class="tdcard '+(cat.big?'crit':'b4')+'"'+(cat.big?' open':'')+'><summary>'+
     '<div class="tdi">'+(cat.big?'⚠️':'💬')+'</div>'+
     '<div class="tdt"><div class="tdh">'+esc(cat.c)+'</div>'+
     '<div class="tds">'+(cat.big?'Show these to someone — full screen':'Tap a phrase to enlarge it')+'</div></div>'+
     '<div class="tdn">'+cat.items.length+'</div><span class="exp">▾</span></summary>'+
     '<div class="tdbody">'+body+'</div></details>';
 });
 return h;
};

/* ---------- MAP ---------- */
const AREAS=[
 {n:"Kyoto",q:"Kyoto Station",pins:[
  ["Henn na Hotel (base ×5 nights)","15 Higashikujo Higashisanno-cho, Minami-ku","Henn na Hotel Premier Kyoto Station Hachijo Exit Front"],
  ["Kyoto Station","Shimogyo-ku, Kyoto","Kyoto Station"],
  ["Kiyomizu-dera","1-294 Kiyomizu, Higashiyama-ku","Kiyomizu-dera"],
  ["Kodai-ji","526 Shimokawara-cho, Higashiyama-ku","Kodai-ji Kyoto"],
  ["Yasaka Shrine","625 Gionmachi Kitagawa","Yasaka Shrine Kyoto"],
  ["Gion / Shirakawa","Gion, Higashiyama-ku","Gion Shirakawa Kyoto"],
  ["Kagizen Yoshifusa (wagashi)","264 Gionmachi Kitagawa, Shijo-dori","Kagizen Yoshifusa"],
  ["Sanjusangen-do","657 Sanjusangendo-mawari","Sanjusangendo"],
  ["Daitoku-ji / Daiji-in","53 Murasakino Daitokuji-cho, Kita-ku","Daijiin Daitokuji Kyoto"],
  ["Ippodo Tea","Teramachi-dori Nijo-agaru","Ippodo Tea Kyoto"],
  ["SOU・SOU shops","Nakano-cho alley, Nakagyo-ku","SOU SOU tabi Kyoto"],
  ["RAU / GOOD NATURE STATION","318-6 Inari-cho, Shimogyo-ku","GOOD NATURE STATION Kyoto"],
  ["Kinkaku-ji","1 Kinkakuji-cho, Kita-ku","Kinkakuji"],
  ["Higashi Hongan-ji","754 Tokiwa-cho, Shimogyo-ku","Higashi Honganji"],
  ["Shosei-en Garden","Higashitamamizu-cho, Shimogyo-ku","Shoseien Garden Kyoto"],
  ["Fushimi Inari Taisha","68 Fukakusa Yabunouchi-cho, Fushimi-ku","Fushimi Inari Taisha"],
  ["Patisserie S","300-1 Hanjo-cho, Shimogyo-ku","Patisserie S Kyoto"]]},
 {n:"Osaka (day trip)",q:"Osaka Castle",pins:[
  ["Osaka Castle","1-1 Osakajo, Chuo-ku","Osaka Castle"],
  ["Masahiko Ozumi Paris","2-4-8 Otemae, Chuo-ku","Masahiko Ozumi Paris"],
  ["Amerikamura / Triangle Park","Nishishinsaibashi, Chuo-ku","Amerikamura Osaka"],
  ["Orange Street","Minamihorie, Nishi-ku","Orange Street Horie Osaka"],
  ["Hozenji Yokocho","1-2-16 Namba, Chuo-ku","Hozenji Yokocho"],
  ["Dotonbori / Glico sign","Dotonbori, Chuo-ku","Dotonbori Glico sign"],
  ["Mizuno okonomiyaki","1-4-15 Dotonbori","Mizuno Okonomiyaki Dotonbori"],
  ["Shinsekai / Tsutenkaku","Ebisuhigashi, Naniwa-ku","Shinsekai Osaka"]]},
 {n:"Arashiyama / HOSHINOYA",q:"Togetsukyo Bridge",pins:[
  ["HOSHINOYA boat lounge","60 Arashiyama Nakaoshita-cho, Nishikyo-ku","HOSHINOYA Kyoto Arashiyama lounge"],
  ["HOSHINOYA Kyoto (hotel)","11-2 Arashiyama Genrokuzan-cho","HOSHINOYA Kyoto"],
  ["Togetsukyo Bridge","Arashiyama","Togetsukyo Bridge"],
  ["Tenryu-ji","68 Susukinobaba-cho, Ukyo-ku","Tenryuji"],
  ["Bamboo Grove","Saga-Ogurayama, Ukyo-ku","Arashiyama Bamboo Grove"],
  ["Okochi Sanso Villa","8 Tabuchiyama-cho, Ukyo-ku","Okochi Sanso Villa"],
  ["Saga-Arashiyama Station","Saga, Ukyo-ku","Saga-Arashiyama Station"]]},
 {n:"Amanohashidate & Ine",q:"Ine Kyoto",pins:[
  ["Amanohashidate Station","Monju, Miyazu","Amanohashidate Station"],
  ["View Land chairlift","Monju, Miyazu","Amanohashidate View Land"],
  ["Ine Funaya Miyabi (stay)","464 Hide, Ine-cho","Ine Funaya Miyabi"],
  ["Ine Tourist Info (sea taxi bookings)","491 Hirata, Ine-cho","Ine Tourist Information"],
  ["Funaya Shokudo","491 Hirata, Ine-cho (2F)","Funaya Shokudo Ine"],
  ["INE CAFE","593-1 Hirata, Ine-cho","INE CAFE"],
  ["Mukai Shuzo brewery","67 Hirata, Ine-cho","Mukai Shuzo Ine"],
  ["Ine-wan sightseeing boat dock","11 Hide, Ine-cho","Ine Bay sightseeing boat"]]},
 {n:"Kiso Valley",q:"Tsumago-juku",pins:[
  ["Nagiso Station","Nagiso, Kiso District","Nagiso Station"],
  ["Hostel Yui-an","4828 Yomikaki, Nagiso","Hostel Yui-an Nagiso"],
  ["Magome-juku (trail start)","Magome, Nakatsugawa","Magome-juku"],
  ["Tsumago-juku (trail end)","Azuma, Nagiso","Tsumago-juku"],
  ["Waki-Honjin Okuya museum","Tsumago","Tsumago Wakihonjin Okuya"],
  ["Narai-juku","Narai, Shiojiri","Narai-juku"],
  ["Nezame-no-toko / Rinsenji","Agematsu","Nezame no Toko"],
  ["Kiso-Fukushima checkpoint","Kiso-Fukushima","Fukushima Sekisho Kiso"]]},
 {n:"Tokyo",q:"Shimokitazawa",pins:[
  ["U Place Shimokitazawa (home)","Kitazawa, Setagaya-ku","U Place Shimokitazawa by Tranova"],
  ["Shimokitazawa Station","Kitazawa 2, Setagaya-ku","Shimokitazawa Station"],
  ["Shiro-Hige's Cream Puff Factory","5-3-1 Daita, Setagaya-ku","Shirohige Cream Puff Factory"],
  ["New York Joe Exchange","3-26-4 Kitazawa","New York Joe Exchange"],
  ["Prada Aoyama","5-2-6 Minami-Aoyama","Prada Aoyama"],
  ["UN GRAIN","6-8-17 Minami-Aoyama","UN GRAIN Minami Aoyama"],
  ["Cat Street","Jingumae, Shibuya-ku","Cat Street Harajuku"],
  ["Shibuya Sky / Scramble Square","2-24-12 Shibuya","Shibuya Sky"],
  ["Shibuya PARCO","15-1 Udagawa-cho","Shibuya PARCO"],
  ["Meiji Shrine","1-1 Yoyogikamizonocho","Meiji Jingu"],
  ["Tokyo National Museum","13-9 Ueno Park, Taito-ku","Tokyo National Museum"],
  ["Yanaka Ginza","3-13 Yanaka, Taito-ku","Yanaka Ginza"],
  ["Nezu Shrine","1-28-9 Nezu, Bunkyo-ku","Nezu Shrine Tokyo"],
  ["Samurai Ninja Museum (Asakusa)","1-8-13 Nishi-Asakusa","Samurai Ninja Museum Tokyo"],
  ["Senso-ji","2-3-1 Asakusa","Sensoji"],
  ["Kappabashi kitchen street","Nishi-Asakusa","Kappabashi Street"],
  ["teamLab Borderless / Azabudai Hills","Azabudai Hills Garden Plaza B","teamLab Borderless Azabudai"],
  ["Avatar Robot Cafe DAWN","3-8-3 Nihonbashi-Honcho","Avatar Robot Cafe DAWN"],
  ["Nakano Broadway","5-52-15 Nakano","Nakano Broadway"],
  ["Gotokuji Temple","2-24-7 Gotokuji, Setagaya-ku","Gotokuji Temple"],
  ["Golden Gai","1 Kabukicho, Shinjuku-ku","Golden Gai"],
  ["Haneda Airport Terminal 3","2-6-5 Hanedakuko, Ota-ku","Haneda Airport Terminal 3"]]}];
P.renderMap=function(DAYS){
 /* ---- collect every pinned place straight from the day data ---- */
 const CITY=[
  {k:'arash', n:'Arashiyama & Sagano', c:'#f97316', lat:[34.98,35.05], lng:[135.62,135.71]},
  {k:'kyoto', n:'Kyoto',        c:'#e11d48', lat:[34.90,35.12], lng:[135.60,135.90]},
  {k:'osaka', n:'Osaka',        c:'#7c3aed', lat:[34.55,34.85], lng:[135.35,135.62]},
  {k:'ine',   n:'Ine & the north coast', c:'#0891b2', lat:[35.40,35.80], lng:[134.80,135.40]},
  {k:'kiso',  n:'Kiso Valley',  c:'#15803d', lat:[35.35,36.10], lng:[137.40,137.95]},
  {k:'tokyo', n:'Tokyo',        c:'#2563eb', lat:[35.45,35.90], lng:[139.40,139.95]}
 ];
 function cityOf(la,ln){
  for(const c of CITY){ if(la>=c.lat[0]&&la<=c.lat[1]&&ln>=c.lng[0]&&ln<=c.lng[1]) return c; }
  return {k:'other',n:'Elsewhere',c:'#6b7280'};
 }
 const pins=[]; const seen={};
 (DAYS||[]).forEach(function(d){
  function add(e,kind){
   if(!e||!e.lat||!e.lng) return;
   const key=e.name+'|'+e.lat;
   if(seen[key]) return; seen[key]=1;
   pins.push({n:e.name, jp:e.jp||'', la:e.lat, ln:e.lng, day:d.id, date:d.date,
              kind:kind, q:e.mapsQ||e.name, geo:e.geo||'medium', city:cityOf(e.lat,e.lng)});
  }
  if(d.hotel) add(d.hotel,'hotel');
  (d.clusters||[]).forEach(function(c){ ['explore','activities','shopping','food'].forEach(function(k){
    (c[k]||[]).forEach(function(e){ add(e,k); }); }); });
 });

 const ICON={hotel:'🛏',explore:'📍',activities:'🎯',shopping:'🛍',food:'🍽'};
 let h='<div class="sec blue"><h3>🗺️ Map</h3><div class="sub">'+pins.length+' places pinned with real coordinates. The route runs Kyoto → Osaka → Arashiyama → Ine → Kiso → Tokyo</div></div>';

 /* ---- the route strip ---- */
 h+='<div class="routestrip">'+
   [['1','KYOTO','19–23 SEP','#e11d48'],['2','OSAKA','22 SEP day trip','#7c3aed'],
    ['3','ARASHIYAMA','23–25 SEP','#f97316'],['4','INE','25–27 SEP','#0891b2'],
    ['5','KISO VALLEY','28 SEP–1 OCT','#15803d'],['6','TOKYO','1–5 OCT','#2563eb']]
   .map(function(x){return '<div class="rs"><div class="rsn" style="background:'+x[3]+'">'+x[0]+'</div>'+
     '<div><div class="rst">'+x[1]+'</div><div class="rsd">'+x[2]+'</div></div></div>';}).join('<div class="rsar">→</div>')+
   '</div>';

 /* ---- live map (needs signal) ---- */
 h+='<div id="bigmap" class="bigmap"><div class="mapload">🗺️ Loading the map…<br><span>Needs signal the first time. Once loaded on wifi it stays cached for Japan.</span></div></div>';
 h+='<div class="btnrow" style="margin:8px 0 18px"><button class="btn mini" onclick="mapFilter(\'all\')">ALL</button>'+
    CITY.map(function(c){return '<button class="btn mini" onclick="mapFilter(\''+c.k+'\')">'+c.n+'</button>';}).join('')+'</div>';

 /* ---- offline fallback: real relative positions, no tiles needed ---- */
 h+='<div class="sec"><h3>Offline plans</h3><div class="sub">Drawn from the same coordinates — works with no signal at all. Distances are to scale within each area</div></div>';
 CITY.forEach(function(c){
  const ps=pins.filter(function(p){return p.city.k===c.k;});
  if(!ps.length) return;
  const las=ps.map(function(p){return p.la;}), lns=ps.map(function(p){return p.ln;});
  let laMin=Math.min.apply(null,las), laMax=Math.max.apply(null,las);
  let lnMin=Math.min.apply(null,lns), lnMax=Math.max.apply(null,lns);
  const padLa=Math.max((laMax-laMin)*0.12,0.004), padLn=Math.max((lnMax-lnMin)*0.12,0.004);
  laMin-=padLa; laMax+=padLa; lnMin-=padLn; lnMax+=padLn;
  const W=880, H=430;
  const x=function(ln){return ((ln-lnMin)/(lnMax-lnMin))*W;};
  const y=function(la){return H-((la-laMin)/(laMax-laMin))*H;};
  const kmW=(lnMax-lnMin)*111*Math.cos(laMin*Math.PI/180);
  let svg='<svg viewBox="0 0 '+W+' '+H+'" class="svgmap" preserveAspectRatio="xMidYMid meet">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="#fbfbf8"/>';
  for(let g=1;g<6;g++){ svg+='<line x1="'+(W/6*g)+'" y1="0" x2="'+(W/6*g)+'" y2="'+H+'" stroke="#e8e8e0" stroke-width="1"/>'; }
  for(let g=1;g<4;g++){ svg+='<line x1="0" y1="'+(H/4*g)+'" x2="'+W+'" y2="'+(H/4*g)+'" stroke="#e8e8e0" stroke-width="1"/>'; }
  ps.forEach(function(p,ix){
   const px=x(p.ln), py=y(p.la);
   svg+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="7" fill="'+c.c+'" stroke="#000" stroke-width="2"/>';
   svg+='<text x="'+px.toFixed(1)+'" y="'+(py+3.5).toFixed(1)+'" font-size="8" fill="#fff" text-anchor="middle" font-family="monospace">'+(ix+1)+'</text>';
  });
  svg+='<g><rect x="14" y="'+(H-34)+'" width="150" height="22" fill="#fff" stroke="#000" stroke-width="1.5"/>'+
       '<text x="20" y="'+(H-19)+'" font-size="11" font-family="monospace">≈ '+kmW.toFixed(1)+' km across</text></g>';
  svg+='</svg>';
  h+='<details class="tdcard b4" style="border-left-color:'+c.c+'"><summary><div class="tdi">🗺</div>'+
      '<div class="tdt"><div class="tdh">'+c.n+'</div><div class="tds">'+ps.length+' places, to scale</div></div>'+
      '<span class="exp">▾</span></summary><div class="tdbody">'+svg+
      '<ol class="pinlist">'+ps.map(function(p){
        return '<li><b>'+esc(p.n)+'</b> <span class="pl-d">'+esc(p.date)+'</span>'+
        (p.geo==='low'?' <span class="tag warn">approx</span>':'')+
        ' <button class="copybtn" onclick="showMap(\''+encodeURIComponent(p.q)+'\')">MAP</button></li>';}).join('')+'</ol>'+
      '</div></details>';
 });

 h+='<div class="info-box" data-label="About the pins">Every pin is a real coordinate, checked to be within 60 km of the day it belongs to. Anything marked <b>approx</b> is a street or district-level fix rather than a doorway — mostly small bars and guesthouses that no mapping service publishes precisely. Ten places have no pin at all because they are not fixed locations (a rail day, a curry hit-list, an unnamed gig).</div>';

 /* ---- boot the live map after render ---- */
 setTimeout(function(){ window.bootMap(pins, CITY); }, 60);
 return h;
};

window.__MAPSTATE={};
window.bootMap=function(pins, CITY){
 const el=document.getElementById('bigmap'); if(!el) return;
 function start(){
  try{
   const map=L.map('bigmap',{scrollWheelZoom:false}).setView([36.2,137.0],6);
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     {maxZoom:18, attribution:'© OpenStreetMap'}).addTo(map);
   const group=L.layerGroup().addTo(map);
   const markers=[];
   pins.forEach(function(p){
    const m=L.circleMarker([p.la,p.ln],{radius:6,color:'#000',weight:2,fillColor:p.city.c,fillOpacity:1});
    m.bindPopup('<b>'+p.n+'</b><br>'+p.date+(p.geo==='low'?'<br><i>approximate</i>':''));
    m.__city=p.city.k; m.addTo(group); markers.push(m);
   });
   const BASES=[[34.9858,135.7588],[34.7025,135.4959],[35.0163,135.6666],[35.6760,135.2905],[35.5986,137.6080],[35.6609,139.6666]];
   L.polyline(BASES,{color:'#e11d48',weight:4,opacity:.85,dashArray:'9 7'}).addTo(map);
   BASES.forEach(function(b,ix){
    L.marker(b,{icon:L.divIcon({className:'basepin',html:'<span>'+(ix+1)+'</span>',iconSize:[26,26]})}).addTo(map);
   });
   map.fitBounds(L.latLngBounds(pins.map(function(p){return [p.la,p.ln];})).pad(0.08));
   window.__MAPSTATE={map:map, markers:markers, group:group};
  }catch(e){
   el.innerHTML='<div class="map-off">📡 The live map needs signal. The offline plans below work regardless.</div>';
  }
 }
 if(window.L){ start(); return; }
 const css=document.createElement('link'); css.rel='stylesheet';
 css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
 const js=document.createElement('script'); js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
 js.onload=start;
 js.onerror=function(){ el.innerHTML='<div class="map-off">📡 The live map needs signal. The offline plans below work regardless — they use the same coordinates.</div>'; };
 document.head.appendChild(js);
 setTimeout(function(){ if(!window.L&&el.querySelector('.mapload')) js.onerror(); }, 9000);
};
window.mapFilter=function(k){
 const st=window.__MAPSTATE; if(!st.map) return;
 const shown=[];
 st.markers.forEach(function(m){
  const on = k==='all' || m.__city===k;
  if(on){ m.addTo(st.group); shown.push(m.getLatLng()); } else { st.group.removeLayer(m); }
 });
 if(shown.length) st.map.fitBounds(L.latLngBounds(shown).pad(0.12));
};


window.PAGES=P;
})();
