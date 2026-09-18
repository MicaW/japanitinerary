/* FINAL ACTIONS & DECISIONS — 17 Sep 2026, the night before departure.
   One prioritised list, rendered inside the packing page: bookings, decisions and host messages
   sorted by when the deadline actually bites, not by which category they belong to.
   Rows reuse the site's existing .chk / .gf / .sec components — no new visual language.
   No booking numbers, PINs or collection codes here: those live in the private confirmation docs. */
(function(){
const P=window.PAGES;

/* t=what · d=why/how · meta=timing · s=state · p=sort priority · u=external link · day=day id · doc=confirmation key */
const BOOK=[
 {s:'must',p:1,t:'Screenshot the five reservation numbers',meta:'TONIGHT · 5 min · DO THIS FIRST',
  d:'The HARUKA plus the four e5489 bookings. Open each confirmation 📄 while you are on wifi, screenshot the page showing the <b>reservation number and the 4-digit number</b>, and put those screenshots on <b>both</b> phones. The machine at Kansai on Saturday and the machine at Kyoto on the 19th both ask for them, and the Google Docs will not load without signal — which is exactly the moment you will need them.',
  day:'19-sep'},
 {s:'must',p:1,t:'Visit Japan Web — both of you, tonight',meta:'TONIGHT · 15 min for two · FREE',
  d:'The government site that turns immigration and customs into a scan instead of a paper form. One account can hold both travellers. You need <b>both passports, the flight (Air China, arriving KIX 19 Sep) and the first night&rsquo;s address</b> — Henn na Hotel Premier Kyoto Station Hachijo Exit Front. It issues QR codes at the end: <b>screenshot every one of them onto both phones</b> and do not rely on being able to load the site at Kansai. Doing it on airport wifi in the immigration queue costs about forty minutes.',
  u:'https://services.digital.go.jp/en/visit-japan-web/',ub:'VISIT JAPAN WEB'},
 {s:'must',p:1,t:'Install and set up the eSIMs — do NOT wait until you land',meta:'TONIGHT · 10 min each phone',
  d:'Install the eSIM profile while you are on wifi at home; it will not install without a connection, and Kansai&rsquo;s free wifi is exactly where you do not want to be doing it. Then leave it <b>installed but not started</b> if your plan counts days from activation. On landing: Settings → Mobile Data → turn the Japan eSIM on for data, leave the UK line on for calls and texts with <b>data roaming off</b>, so no accidental UK charges. Check both phones can actually see the profile before you pack — an eSIM that will not install is fixable tonight and not fixable at 12:40 on Saturday in Osaka.'},
 {s:'must',p:1,t:'Download the apps onto both phones',meta:'TONIGHT ON WIFI · 10 min',
  d:'Do these on the sofa, not at the airport. <b>Google Maps</b> with Kyoto, Osaka and Tokyo downloaded for offline use. <b>Wallet</b> — add an ICOCA card to each phone and put ¥3,000 on it <i>tonight</i>, because a foreign card is sometimes refused for Japanese transit top-up and the fallback (a plastic ICOCA bought with cash at Kansai) is easy at home and annoying at a gate. <b>SmartEX</b>, signed in, <b>with an IC card registered</b> — tap that card at the Shinkansen barrier on the 28th and the 1st. Smart EX also issues a QR ticket that the barrier reads (Reservation Details → Display QR-Ticket), so you have two ways through and neither needs a paper ticket. <b>GO</b>, the taxi app, with a card saved. <b>Jorudan</b> as the backup train planner. Then screenshot the Tokyo subway map and the Kyoto bus map. All of them are on the Getting around page with links.',
  u:'#getting',ub:'GETTING AROUND'},
 {s:'must',p:1,t:'Manryo — tell them about the no-meat diet',meta:'TONIGHT · 5 min · CLASS IS 21 SEP 12:30',
  d:'The class is <b>ramen, gyoza and onigiri</b>, and all three are pork or chicken by default — the broth, the filling, and often the stock in the rice seasoning. Email them tonight: no meat and no meat stock for one of the two, <b>fish dashi is fine</b>, which makes it easy for them to solve. Ask them to confirm in writing before the 21st. You pay on the day, so there is no booking flow that would have caught this.',
  day:'21-sep',doc:'manryo'},
 {s:'must',p:1,t:'Screenshot the Henn na Booking.com chat',meta:'TONIGHT · 2 min',
  d:'Names registered and the big cases agreed at ¥700 per bag per night, 23–27 Sep. Both replies live in the Booking.com chat, not email — <b>screenshot that chat before you fly</b>, because you will not have it offline, and the bag storage is what the 23rd depends on.',
  day:'19-sep',doc:'henn1'},
 {s:'must',p:1,t:'Decide where the big cases sleep, 28–30 Sep',meta:'TONIGHT · the decision, not the booking',
  d:'The Tokyo flat <b>cannot receive a forwarded case before you are in it</b> — the host has said parcels need a timed slot with someone in the room, and you check in at 15:00 on 1 Oct. So the cases cannot go ahead to Tokyo from Kyoto. That leaves two honest options: <b>carry them</b> (Shinano on the 28th, Yui-an move them to MOUNTAinn while you walk the trail on the 29th, Shinano and Nozomi on the 1st), or <b>leave them at Henn na</b> at ¥700 a bag a night and collect them — which you cannot, because you do not come back to Kyoto. <b>They travel with you.</b> The site now says so everywhere; this row exists so you have read it once before you pack.',
  day:'28-sep'},
 {s:'must',p:2,t:'Shibuya Sky — 2 Oct sunset',meta:'ON SALE NOW · BOOK TONIGHT · 10 min',
  d:'The official site releases slots about <b>four weeks</b> ahead, not two — so 2 Oct has been on sale since early September and the good sunset slots may already be thin. Book it tonight: <b>Adult · entry from 15:00 (¥3,400 each)</b> → 2 Oct → the 16:40–17:00 slot. If sunset has gone, take the next slot after 17:00 rather than chasing returns. Turn on 3-D Secure first; foreign cards fail without it. Free cancellation until the day before, and the rooftop shuts in rain or strong wind (indoor floors stay open, no refund).',
  u:'https://www.shibuya-scramble-square.com/sky/ticket/',ub:'BUY TICKETS',day:'2-oct'},
 {s:'must',p:2,t:'Sumo — pick ONE of the two, then book it',meta:'TONIGHT · 15 min · ONE SUMO, NOT TWO',
  d:'Both are now on their day pages with what each one is actually like, so you can pick by mood rather than by price. <b>Option A — Sumo An, Kyoto, Mon 21 Sep 18:00:</b> show-only from ¥10,000 each (with chanko meal from ¥12,800), evening shows 18:00–20:00, free cancellation up to 24 hours before. Book first, then email them the diets — their vegetarian option is arranged by email after booking, and the standard chanko is chicken-based. It clashes with Fushimi Inari at dusk that evening, and if you take it the 21st stops being a free afternoon. <b>Option B — the Asakusa show, Sat 3 Oct:</b> cheaper and already near Senso-ji, but it only works if you take the Asakusa track that day <i>instead of</i> Ueno and the museum, not as well as. <b>Pick one</b> — the budget pays for one sumo show. Kyoto is the close-up, explained version early in the trip; Asakusa is the loud, end-of-trip one.',
  u:'https://sumoan-kyoto.com/',ub:'BOOK SUMO AN',day:'21-sep'},
 {s:'must',p:2,t:'DAWN robot café — 4 Oct 15:00',meta:'TONIGHT · 10 min',
  d:'Book the <b>OriHime Diner</b> seating, where the robot at your table is operated by a remote pilot. ¥5,500 each including a dish and a drink, paid by card when booking, minimum two people, <b>no same-day bookings</b> — so if it is not booked before you fly it does not happen. Ask for a fish and vegetable plate, and for English interaction.',
  u:'https://www.tablecheck.com/en/shops/dawncafe2021/reserve',ub:'BOOK DAWN',day:'4-oct'},
 {s:'must',p:2,t:'Ine — both dinners, breakfast and the sea taxi',meta:'TONIGHT · draft ready in Gmail',
  d:'Nothing in Ine is arranged. Miyabi is room-only and has not replied since 14 Sep. Settle <b>dinner on the 25th and the 26th</b> (the village has no restaurant open in the evening and no shop), breakfast before the 08:11 bus on the 27th, the exact bus stop and the walk to the building, and the sea taxi time. Their rule: <b>no contact by 17:00 on arrival day and the room is released.</b> If they still do not reply, ring the Ine tourism office on +81-772-32-0277 — they arrange both for visitors. Ask in the same message whether Mukai can do a short tasting.',
  day:'25-sep',doc:'miyabi'},
 {s:'must',p:2,t:'Nagiso — dinner on both nights',meta:'TONIGHT · draft ready in Gmail',
  d:'Fukusuke, opposite the station, needs a dinner reservation for <b>29 Sep</b> and is normally closed on Wednesday <b>30 Sep</b>. MOUNTAinn serves no food at all — it is a self-catering kitchen — so the 30th is either the Yui-an table again (same family, taxi back at ¥2,000–3,000) or a supermarket shop in Nagiso. Ask MOUNTAinn what the kitchen has. Same message confirms the Nagiso→Magome taxi on the 29th, and note their self check-in form lands around 26 Sep while you are in Ine with patchy signal.',
  day:'29-sep',doc:'mountainn'},
 {s:'must',p:3,t:'Samurai sword session — Asakusa, Sat 3 Oct morning',meta:'ONLY WITH THE ASAKUSA TRACK · ~¥8,100 EACH',
  d:'The Samurai Ninja Museum runs three branches and the <b>Asakusa flagship is a five-minute walk from Senso-ji</b> — which is already the shape of Saturday 3 Oct. Their <b>Samurai Sword experience</b> is about two hours: a katana lesson and actual tatami-mat cutting, rather than the one-hour armour-and-photos basic ticket (¥3,500). Book the <b>09:30 or 10:00 slot</b> and you are at Senso-ji and Kappabashi by lunchtime. <b>But note:</b> 3 Oct is a choose-one day — Asakusa <i>or</i> Ueno and the Tokyo National Museum, not both. This only fits if you take the Asakusa track, which also carries the Asakusa sumo show. Slots go every 15 minutes and weekend ones sell out.<br><br><b>If Saturday fills up:</b> the same company has a Kyoto branch near Nijo Castle — that would fit Tuesday 22 Sep, which is still an open day, or a Sunday-morning slot on the 20th before the 16:30 zazen. And their Shinjuku branch is two minutes from the station if you would rather pair it with a Shinjuku evening on the 3rd.',
  u:'https://samuraininjamuseum.com/',ub:'SAMURAI NINJA MUSEUM',day:'3-oct'},
 {s:'ask',p:3,t:'HOSHINOYA — what to actually ask',meta:'23–25 SEP',
  d:'The à la carte dinners <b>cannot be booked ahead</b> — the dining hall takes same-day orders only. So do not email asking to reserve them. Ask instead which dishes the kitchen can guarantee for each diet, settle the in-room asa-nabe breakfast for the 24th, the Morning Stretch, and the <b>departure transfer on the 25th</b>, which has to be ~09:00 to make the 10:14 from Saga-Arashiyama. The arrival boat is already booked for 14:50 — nothing to do there.',
  day:'23-sep',doc:'boat'},
 {s:'ask',p:3,t:'Yui-an — confirm the pickup and the bags',meta:'28–29 SEP',
  d:'Confirm the pick-up you chose on the check-in sheet (16:00 at Nagiso, off the Shinano), the 07:40 shuttle on the 29th, and that your bags travel to MOUNTAinn while you walk the trail. Ask too whether their dinner table is free on the 30th, which is the honest fallback for that night.',
  day:'28-sep',doc:'yuian'},
 {s:'ask',p:3,t:'U Place, Shimokitazawa',meta:'1–5 OCT',
  d:'The bed and futon layout — the listing says one bedroom plus a futon in one place and two bedrooms in another, and that decides where Dad sleeps for four nights. Then: whether they will hold bags before 15:00 on the 1st, and the exact corner for the airport taxi on the 5th. They do not accept parcels without a timed slot, so nothing gets forwarded there.',
  day:'1-oct',doc:'uplace'},
 {s:'ask',p:4,t:'Two door codes arrive while you are away',meta:'~26 SEP AND EARLY OCT',
  d:'<b>MOUNTAinn</b> emails its registration form and security code about three days before arrival, around 26 Sep — you will be in Ine with patchy signal, so watch for it there. <b>U Place</b> emails a door-entry PDF after the check-in form. <b>Neither goes on this website.</b> When they land, save them into the booking confirmation docs in Drive so they are with everything else and reachable offline.',
  day:'29-sep',doc:'mountainn'},
 {s:'opt',p:4,t:'Shigetsu, Tenryu-ji — Wed 23 Sep lunch',meta:'ONLY IF YOU WANT THE BIGGER SETS · by 21 Sep',
  d:'Zen vegetarian lunch inside the temple before the 14:50 boat, and the easiest shared meal of the trip — meat-free by definition for you, entirely cooked by definition for Dad. <b>It closes on Thursdays, so it is the 23rd or not at all.</b> The Snow set (¥3,300, seven dishes) is usually walk-in; the Moon and Flower sets need a day&rsquo;s notice. Plus ¥500 garden entry each. Phone 075-882-9725 (09:00–17:00 Japan = 01:00–09:00 UK) or ask Henn na&rsquo;s desk. <b>It means going west after breakfast instead of eating at Kyoto Station</b> — the card on the day page explains the reshuffle.',
  u:'https://www.tenryuji.com/en/shigetsu/',ub:'SHIGETSU',day:'23-sep'},
 {s:'opt',p:4,t:'Unagiya Hirokawa — 24 Sep dinner',meta:'ONLY WITH THE TRANSFER AGREED',
  d:'Cooked eel over rice, the one village dinner that suits you both. Booking takes a ¥3,000 deposit that is not refunded, and it only works if HOSHINOYA agrees the return transfer first — so ask the hotel, then book. Until both have happened, the 24th&rsquo;s dinner is the retreat dining hall.',
  u:'https://unagi-hirokawa.jp/orders/en',ub:'BOOK',day:'24-sep'},
 {s:'opt',p:4,t:'Saihō-ji moss temple — 24 Sep',meta:'BOOK TONIGHT, DECIDE BY 20 SEP',
  d:'Numbers are capped daily and card payment is taken at least a day ahead — but cancellation is free up to four days before, so <b>holding a slot tonight and deciding on the 20th costs nothing</b>. All four entry times had space when checked. Pick 10:30 or later, after the morning at the hotel. It is not walkable from Arashiyama: Hankyu Arashiyama → Matsuo-taisha then 15 minutes on foot, or about ¥2,000 by taxi.',
  u:'https://intosaihoji.com/en/booking/nichinichi',ub:'BOOK',day:'24-sep'},
 {s:'opt',p:5,t:'Kiso guided day — 30 Sep',meta:'HOLD TONIGHT · free until 23 Sep',
  d:'Two different operators, two different prices, and the day page lists them both. <b>Really Rural Japan&rsquo;s Kiso-Fukushima day</b> is ¥45,000 for the two of you including guide, transport, lunch, entry fees and a sake tasting, about 8 km and flat, free cancellation to 7 days before. <b>MOUNTAinn&rsquo;s hosts</b> can also arrange a guided half-day of the valley for roughly ¥15,000–25,000 for two — cheaper, shorter, and booked by messaging them. Holding the first tonight costs nothing and keeps the decision open to the 23rd. Ask for the town-focused version.',
  u:'https://reallyruraljapan.com/kiso-fukushima-walking-tour',ub:'ENQUIRE',day:'30-sep'},
 {s:'opt',p:5,t:'Ine resident walk + Mukai sake',meta:'TONIGHT · needs 3 days&rsquo; notice',
  d:'Beyond the Postcard, 26 Sep, 90 minutes, ¥12,000 for two, cash, meeting at the Ine tourist information centre (491 Hirata). Say no to the fishing-trap activity. If you book it, the 26th gains a fixed 90-minute appointment in the afternoon — the boat is in the morning, so they do not clash.',
  u:'https://www.ine-kankou.jp/e_active/beyond-the-postcard',ub:'ENQUIRE',day:'26-sep'},
 {s:'opt',p:5,t:'Hantei or a tempura counter — 3 Oct lunch',meta:'ASK FIRST',
  d:'Hantei serves lunch 11:30–15:00 with last orders at 14:00, and it is a set course — so book around 12:30 and <b>say the no-meat request when you book, not on arrival</b>. Ask whether they can serve a set without pork and with vegetable frying oil. If the answer is no, book a tempura counter instead — cooked, not sushi, and egg tempura is usually on the menu. If you take Hantei, Ameyoko becomes a ten-minute graze on the way, not lunch.',
  u:'https://www.tablecheck.com/en/hantei-nezu',ub:'HANTEI',day:'3-oct'},
 {s:'opt',p:5,t:'Golf at TGX Osaka — 22 Sep',meta:'TONIGHT OR DROP',
  d:'Booked through their LINE account or by phone only — there is no web slot, and they are cashless. ¥3,300 for the first person plus ¥2,200 for the second per 50 minutes, plus ¥550 each for clubs. Holiday hours 09:00–21:00.<br><br><b>The message to paste into LINE:</b><br><span class="mono" style="font-size:12px">9月22日（火）に2名で50分の打席を予約したいです。クラブのレンタルも2名分お願いします。英語は少しだけ話せます。よろしくお願いいたします。</span>',
  u:'https://line.me/R/ti/p/@405bwtvw',ub:'OPEN LINE',day:'22-sep'},
 {s:'ask',p:6,t:'Airport taxi, 5 Oct',meta:'BOOK 3–4 OCT',
  d:'GO app, 08:45 pickup for a 10:00 target at Haneda Terminal 3, card saved, pin dropped exactly on the flat&rsquo;s door. Decide then between taxi all the way (~¥9,000–12,000) or taxi to Shinagawa and the Keikyu line (~¥3,500 plus ¥300 each). <b>If the car is not there by 08:55</b>, walk to Shimokitazawa and take the train — the day page has the route.',
  u:'https://go.goinc.jp/en/',ub:'GO APP',day:'5-oct'}
];

const DECIDE=[
 {s:'dec',p:5,t:'Osaka, Tue 22 Sep — which shape',meta:'BOOK FROM JAPAN, 19–21 SEP',
  d:'Four options, described here because three of them cannot be booked until you land: <b>Taka&rsquo;s Temma bar crawl, 18:00</b> — about ¥7,000 each in cash on top, pescatarian fine · <b>a daytime shared walk</b> with Osaka Localized, who publish only 10–14 days ahead · <b>Deep Osaka food dinner</b>, ¥13,000 each, meat-heavy menu that needs a written swap · <b>no tour at all</b>, and the Tower of the Sun interior instead, reserved the day before. The castle, Kuromon, Amerikamura and Dotonbori clusters on the day page work under any of them. Last direct train back is 22:00 from JR Osaka; the final one is 00:00 — and the 00:10 is not it, that one terminates at Takatsuki.',day:'22-sep'},
 {s:'dec',p:5,t:'Kiso, Wed 30 Sep — which kind of day',meta:'BY 23 SEP IF GUIDED',
  d:'<b>Guided</b> — either Really Rural Japan&rsquo;s Kiso-Fukushima day (¥45,000 for two, all in, free cancel to the 23rd) or MOUNTAinn&rsquo;s own half-day (~¥15,000–25,000) · <b>Narai alone</b> (08:11 or 10:19 up the valley, preserved street, soba — but <b>30 Sep is a Wednesday, Narai&rsquo;s closing day</b>, so ring 0264-34-3160 on the 29th and ask what is open) · <b>Nezame gorge at Agematsu</b> instead of Narai · <b>a quiet day in Nagiso</b>. One of them, not a circuit.',day:'30-sep'},
 {s:'dec',p:5,t:'Monday 21 Sep — which morning',meta:'NIGHT BEFORE',
  d:'Pick one and be finished by 11:45 for the 12:30 class: Fushimi Inari at 07:00 · To-ji&rsquo;s Kobo market (only on the 21st, and it is in the far south while the class is at Sanjo) · Kinkaku-ji · Nanzen-ji and the aqueduct · Nijo Castle · Ginkaku-ji and the Philosopher&rsquo;s Path · Ryoan-ji.',day:'21-sep'},
 {s:'dec',p:5,t:'Fushimi Inari — morning or dusk',meta:'EITHER DAY',
  d:'Monday 21 at 07:00, quiet and cool before breakfast; or Sunday 27 at dusk on the way back from Nara — five minutes from Kyoto Station, lit gates, far fewer people, at the end of a long travel day. Both are on their pages with the timings. Once, not twice.',day:'27-sep'},
 {s:'dec',p:5,t:'Nishiki market — when',meta:'21 SEP',
  d:'Monday 21 at 16:00 is a browse with some stalls already closing, and it is the realistic one: the 28th has a single spare hour before the 13:21 train and that hour is already the station depachika and an early lunch. If you want Nishiki properly, take it on the 21st.',day:'21-sep'},
 {s:'dec',p:5,t:'24 Sep at the retreat',meta:'ON THE DAY (two need booking)',
  d:'Stay on the property · Otagi Nenbutsu-ji and Saga Toriimoto · Gio-ji · the bamboo grove and Tenryu-ji garden. <b>Saihō-ji and the Sagano scenic train are the two that must be booked beforehand</b>; the rest are same-day decisions with a hotel transfer. If you do go out early, the grove comes first at 07:15 and Tenryu-ji second when it opens at 08:30 — not the other way round.',day:'24-sep'},
 {s:'dec',p:6,t:'Saturday night in Tokyo, 3 Oct',meta:'BY 1 OCT',
  d:'Shinjuku dinner → Golden Gai → Champion for singing with strangers · Rocky Top in Ginza for a live act · NINJA Tokyo as the whole evening · or a quiet night in Shimokitazawa. Ask the cover charge and smoking policy before sitting down in any small bar. Champion&rsquo;s door-time on a Saturday is 20:30, so dinner is 18:00–20:00, and <b>draw ¥20,000–25,000 in cash first</b> — Champion, Omoide Yokocho and most of Golden Gai take no cards.',day:'3-oct'},
 {s:'dec',p:6,t:'2 Oct evening · 4 Oct afternoon',meta:'ON THE DAY',
  d:'After Shibuya Sky: dinner in Shibuya and Nonbei Yokocho, or home to Shimokitazawa. After DAWN: Nakano Broadway or a last Shimokita lap — one of them, not both, and you still have to pack.',day:'4-oct'}
];

/* ONE list, in the order the deadlines actually bite — not split by where you will be standing. */
const DEF={must:2,ask:4,dec:5,opt:6};
const ALL=BOOK.concat(DECIDE)
  .map(function(x,i){ return [x.p||DEF[x.s]||6, i, x]; })
  .sort(function(a,b){ return a[0]-b[0] || a[1]-b[1]; })
  .map(function(t){ return t[2]; });
const KIND={must:['!','BOOK OR DO NOW'],ask:['✉','MESSAGE THEM'],dec:['◇','DECIDE IN JAPAN'],opt:['?','OPTIONAL']};

function rows(list){
  return list.map(function(x){
    const doc=(x.doc&&window.confFor)?confFor('key',x.doc):'';
    const k=KIND[x.s]||KIND.opt;
    return '<div class="chk'+(x.s==='opt'?' secondary':'')+'">'+
      '<div class="box">'+k[0]+'</div>'+
      '<div style="flex:1;min-width:0">'+
        '<div class="t">'+x.t+'</div>'+
        '<div class="d">'+x.d+'</div>'+
        '<div class="meta">'+k[1]+' · '+x.meta+'</div>'+
        '<div class="btnrow" style="margin-top:8px">'+
          (x.u?'<a class="btn mini yellow" target="_blank" rel="noopener" href="'+x.u+'">'+(x.ub||'OPEN')+' ↗</a>':'')+
          (x.day?'<a class="btn mini" href="#day/'+x.day+'">📅 THAT DAY</a>':'')+
          (doc&&window.confLink?confLink(doc,true):'')+
        '</div>'+
      '</div></div>';
  }).join('');
}

P.renderFinal=function(){
  let h='<div class="sec red"><h3>Prioritised to-dos outstanding</h3>'+
    '<div class="sub">'+ALL.length+' left, most urgent first</div></div>';
  h+=rows(ALL);
  h+='<div class="btnrow" style="margin:6px 0 26px"><button class="btn mini" onclick="window.print()">🖨 PRINT THIS LIST</button></div>';
  return h;
};
P.FINAL_COUNT=ALL.length;
})();
