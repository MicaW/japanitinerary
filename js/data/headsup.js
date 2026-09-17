/* HEADS UP — per-day list at the end of each day page: what is closed, what to avoid, what to look out for, and the small spots worth finding.
   Researched 11–12 Sep 2026 from official sites, guides and community write-ups. Keys by day id. */
(function(){
const HU={
 "18-sep":[
  {k:'tip',t:'Air China: one cabin bag at 5 kg — weigh it at home. Power banks in the cabin only, never in the hold.'},
  {k:'avoid',t:'Do not fill in Visit Japan Web at the airport on airport wifi. Have both QR codes screenshotted before you leave the house.'}
 ],
 "19-sep":[
  {k:'closed',t:'Silver Week starts tomorrow: Sat 19 is the last normal banking day. Draw cash today if you did not on the 18th — ATMs in 7-Eleven work 24 hours, bank counters will not.'},
  {k:'avoid',t:'The HARUKA discounted ticket is not sold in Japan. Collect it at the KIX machine with the reservation number, the card you paid with and passports — do not join the airport ticket-office queue.'},
  {k:'tip',t:'Kyoto Station is busy all evening this week. Eat on the 10F ramen street or in Porta underground rather than the 11F restaurants, which take a queue ticket.'},
  {k:'nook',t:'The station Skyway (10F, free) is a glass corridor across the roof — go up after dark for the city and the tower. Nobody is there.'}
 ],
 "20-sep":[
  {k:'closed',t:'Nothing on the plan is closed today. Arabica Shokudo and Kaikado Café close midweek, not Sundays.'},
  {k:'avoid',t:'Gion: the small private alleys off Hanamikoji are closed to visitors, with fines. Hanamikoji itself and Shirakawa Minami-dori are public and fine. Never photograph a geiko or maiko without asking, and do not stop them.'},
  {k:'avoid',t:'Kiyomizu at 08:00 is the difference between a temple and a theme park. The slopes fill from about 09:30; the coaches arrive 10:00–11:00.'},
  {k:'avoid',t:'Eating while walking on Sannenzaka and Ninenzaka is frowned on and signed. Finish at the stall.'},
  {k:'tip',t:'Sunday of a holiday weekend: Kodai-ji and Kiyomizu will have queues at the ticket windows after 10:00; buy Kiyomizu tickets at the machines, not the manned window.'},
  {k:'nook',t:'Ishibe-koji, the stone-walled lane below Kodai-ji, is the quietest thirty metres in Higashiyama. Shirakawa Minami-dori at dusk, with the willows over the canal, is the picture most people miss because they are on Hanamikoji.'},
  {k:'shop',t:'Kiyomizu-yaki: the pottery street is Chawan-zaka, the lane running down from the temple gate — kilns and family shops, not souvenir stands. Folding fans at Miyawaki Baisen-an (Rokkaku-dori) since 1823. Incense from Shoyeido on Karasuma. All three are made in Kyoto and nowhere else.'}
 ],
 "21-sep":[
  {k:'closed',t:'Respect for the Aged Day — a national holiday. Everything on the plan is open; museums keep holiday hours and some shops shut on Tue 22 instead. Toji flea market runs today (it is the 21st) rain or shine.'},
  {k:'avoid',t:'Daitoku-ji: most sub-temples are permanently closed to visitors; do not wander into gates without a sign. Koto-in, Zuiho-in, Daisen-in and Ryogen-in are the ones that admit. Last entry ~16:00.'},
  {k:'avoid',t:'Kinkaku-ji on a holiday afternoon is shoulder to shoulder. If you do the bike ride, be there before 09:30 or leave it.'},
  {k:'tip',t:'Bike hire: Kyoto Eco Trip is 09:00–18:00. Park only in marked bicycle parking — Kyoto tows, and the fine plus the walk to the pound ruins an afternoon.'},
  {k:'nook',t:'The Kitano Tenmangu evening opening (through 23 Sep) puts lanterns along the plum-grove paths. Ten minutes from Kinkaku-ji, almost no overseas visitors.'},
  {k:'shop',t:'Ippodo tea on Teramachi (since 1717) and Kaikado’s hand-made tea caddies by Kawaramachi-Shichijo are the two Kyoto objects people regret not buying. Aritsugu at Nishiki will engrave a knife while you wait. Toji market today: old kimono and obi from ¥1,000, tea bowls, tools.'}
 ],
 "22-sep":[
  {k:'closed',t:'THE SUMO HALL HIRAKUZA is closed on Tuesdays, holiday or not, so it has been taken off today. Your sumo is the Asakusa show on Sat 3 Oct. Several Orange Street shops also close Wednesdays and Tuesdays — expect a few shutters.'},
  {k:'avoid',t:'Dotonbori touts: any bar whose staff invite you in from the street will have a cover charge that is not on the board. No street tout, no problem. Keep bags cross-body on Ebisu-bashi and do not hand your phone to anyone who asks you to hold it.'},
  {k:'avoid',t:'Kuromon Market prices have climbed with the crowds; graze one or two things, do not make it lunch. The restaurants directly beside Osaka Castle are the dearest in the city — walk five minutes.'},
  {k:'avoid',t:'Counterfeit "designer" goods in the small Shinsaibashi arcades: if the price is impossible, it is.'},
  {k:'tip',t:'Holiday Tuesday: Osaka Castle keep opens 09:00 and the queue is on the stairs inside, not outside. Go straight up and work down.'},
  {k:'nook',t:'Hozenji Yokocho is two minutes from the Glico sign and a different century. Ura-Namba, the lanes south-east of Namba station, is where Osakans actually eat — cheap and good. Nakazakicho, north of Umeda, is the vintage-and-café quarter almost nobody visits.'},
  {k:'shop',t:'Doguyasuji, the kitchenware arcade beside Namba, is where Osaka’s restaurants buy: takoyaki pans, Sakai knives, wooden rice tubs, plastic food models. Amerikamura for vintage; Orange Street for furniture you cannot carry and small-batch homeware you can.'}
 ],
 "23-sep":[
  {k:'closed',t:'Autumnal Equinox Day — a national holiday. Higashi Hongan-ji is open (it is a working temple). Some Kyoto Station shops run holiday hours.'},
  {k:'avoid',t:'Do not take the big cases to Arashiyama. The retreat is reached by boat; the cases stay at Henn na until Sunday.'},
  {k:'tip',t:'Afternoon tea at the HOSHINOYA lounge is online-only and must be booked in advance; the lounge itself is walk-in. Your 14:50 boat is the fixed point of the day — be at the Togetsukyo lounge by 14:20.'},
  {k:'nook',t:'Shosei-en, the walled garden five minutes from Higashi Hongan-ji, is the quietest place in central Kyoto on a holiday morning.'}
 ],
 "24-sep":[
  {k:'closed',t:'The Sagano Romantic Train does not run on Wednesdays — today is Thursday, so it runs. Okochi Sanso and the Saga Toriimoto temples are open.'},
  {k:'avoid',t:'The Bamboo Grove after 08:30 is a slow-moving queue. Either go at 07:00 or skip it: Adashino Nenbutsu-ji has its own bamboo lane with almost nobody in it.'},
  {k:'avoid',t:'Rickshaw touts cluster at the bridge and the grove entrance. A polite no and keep walking. Shigetsu, the temple restaurant inside Tenryu-ji, is the tourist-priced option; the tofu places on the lanes are half the money.'},
  {k:'tip',t:'Ask the desk tonight for tomorrow’s 09:00 transfer down the gorge — it is not automatic.'},
  {k:'nook',t:'Otagi Nenbutsu-ji (09:00–16:30), at the top of Saga Toriimoto, has 1,200 carved rakan faces and on a weekday you may have it to yourself. Gio-ji’s moss garden next door is tiny and perfect.'},
  {k:'shop',t:'Arashiyama is bamboo country: the workshops along the main street sell baskets, tea scoops and chopsticks cut from the local groves — look for the shop’s own name on the box, not a tourist-board sticker. Shigetsu-style pickles from the lane stalls travel well.'}
 ],
 "25-sep":[
  {k:'closed',t:'Mukai Shuzo closes Thursdays — today is Friday. Funaya Shokudo closes Thursdays too; INE CAFE closes Tuesdays.'},
  {k:'avoid',t:'The Tankai bus is cash only (¥400, coins or ¥1,000 notes) and strict on luggage: one bag each, small. Do not arrive with a suitcase.'},
  {k:'avoid',t:'In Ine, stay on the road. The boathouses are homes: no stepping onto ramps, no photos through windows, no drones (it is a no-fly zone). Sound carries on the water, so keep it down after dark.'},
  {k:'tip',t:'The 13:57 bus is the one to make — backups 14:37, 15:11 and 16:18, and the last useful one is 16:18. Buy provisions at Amanohashidate; the village has almost no shops.'},
  {k:'nook',t:'Ineura Park is the small waterfront park that gets you closest to the boathouses without trespassing. The Amanohashidate sandbar is walkable end to end in 45 minutes if the timing falls right.'},
  {k:'shop',t:'Mukai Shuzo’s Ine Mankai — the rosé-pink red-rice sake — is made in this one brewery and is the bottle to carry home. The Tango peninsula is also where chirimen silk crepe is woven; small scarves and pouches turn up in the Amanohashidate station shops.'}
 ],
 "26-sep":[
  {k:'closed',t:'Nothing closed. Sea taxis run about 09:00–16:00 by arrangement, weather permitting; if the bay is rough they simply do not go.'},
  {k:'avoid',t:'Ine Bay sightseeing boat (¥1,200) versus the sea taxi: the taxi is the one to do — a fisherman, a small boat, in among the funaya. The big boat is a lap of the bay with gulls.'},
  {k:'tip',t:'Cash for everything today: the sea taxi, Funaya Shokudo, the café. Nowhere in the village takes cards reliably.'},
  {k:'nook',t:'Funaya-no-Sato observation deck, up behind the roadside station, is the only place you see the whole curve of the bay. Go at golden hour.'}
 ],
 "27-sep":[
  {k:'closed',t:'Mo-an (the tea house on the hill) closes Mondays and Tuesdays but opens on holidays; today is Sunday, fine. L’Escamoteur is open Sundays (closed Thursdays), 12 seats, walk-in only, from 20:00.'},
  {k:'avoid',t:'Nara deer in September and October are in rut. The stags are pushy and can butt or kick; do not tease with crackers, do not turn your back on one that has decided you have food. Buy one pack of crackers, give it away fast, and keep the empty hands visible.'},
  {k:'avoid',t:'The 08:11 bus is the only one that makes the 09:50 train. The 09:25 does not.'},
  {k:'look',t:'Fushimi Inari is open 24 hours and lit after dark. Past the Yotsutsuji junction the crowds thin to nothing — that is where the mossy fox statues and the small shrines are.'},
  {k:'nook',t:'Kasuga Taisha’s forest edge is where the deer are calm and the tourists are not. The Nigatsu-do balcony above Todai-ji is free, and the view west at 17:00 is the best in Nara.'},
  {k:'shop',t:'Nara-zarashi linen (Nakagawa Masashichi, Naramachi, since 1716) and hand-made ink sticks and brushes from Kobaien (since 1577) — both are Nara-only crafts and both shops are ten minutes from the park. Fushimi: the mini torii with your name, and a sake from one of the Fushimi breweries.'}
 ],
 "28-sep":[
  {k:'closed',t:'Coin lockers and the luggage counter at Kyoto Station are open from 07:00; takkyubin at the hotel desk closes for the day around 15:00, so send the big case before you leave, not on the way out.'},
  {k:'avoid',t:'SHINANO 17 at 15:00 is the only afternoon train that stops at Nagiso. There is no plan B on the same day.'},
  {k:'tip',t:'Nozomi trains are reserved-seat only until 23 Sep; from today unreserved cars are back, but your seats are booked anyway. Nagiso has no IC-card gates — paper tickets in hand.'},
  {k:'nook',t:'At Nagoya, platform 10 for the Shinano. There is a Kishimen (flat noodle) stand on the platform — the right lunch if you have missed one.'}
 ],
 "29-sep":[
  {k:'closed',t:'Nothing closes on a Tuesday here, but everything closes early: Magome and Tsumago shops shut around 17:00 and the trail tea house is staffed only to about 16:00.'},
  {k:'avoid',t:'Between Magome and Tsumago there is almost no food. Eat in Magome before you set off or carry it. Everything in both towns is cash only.'},
  {k:'avoid',t:'The last buses from Tsumago to Nagiso are 15:30 and 16:30. Your pickup is arranged, but if it falls through those are the numbers.'},
  {k:'look',t:'Bear warning signs are posted on the trail; encounters on this stretch are extremely rare, and the bells hung along the path are there to be rung. Ring them.'},
  {k:'tip',t:'Luggage shuttle Magome→Tsumago: ¥500 a bag, drop 08:30–11:30 at the Magome information centre, collect after 13:00 at Tsumago. Useful if the small bags feel heavy.'},
  {k:'nook',t:'The Ichikokutochi tea house at the pass is free, the tea is hot, and the man who runs it has been there for decades. In Tsumago, the Waki-honjin (the inn for retainers) is the one interior worth paying for.'}
 ],
 "30-sep":[
  {k:'closed',t:'Wednesday: many Narai shops close today — expect half the shutters down, the soba houses and the lacquer shops mostly open. The Kiso-Hirasawa lacquer museum closes Mondays, so it is open. Rinsenji at Nezame-no-toko 08:00–17:00.'},
  {k:'avoid',t:'Kiso local trains run roughly hourly with gaps. Photograph the timetable at Nagiso in the morning and plan the day around the gaps, not the sights.'},
  {k:'tip',t:'Narai soba houses sell out early on busy days — lunch at 11:30, not 13:30.'},
  {k:'nook',t:'Kiso-no-Ohashi, the wooden bridge at the north end of Narai, has no shops and no crowds. Kiso-Hirasawa, one stop south, is where the lacquer is actually made — workshops, not gift shops.'},
  {k:'shop',t:'The wooden things: Kiso lacquerware from the workshops in Kiso-Hirasawa (buy from a maker, ask to see the back), hinoki cypress bath goods and chopsticks that still smell of the tree, and the oroku-gushi combs Narai has made since the Edo road. Gohei-mochi from the street stalls is the snack.'}
 ],
 "1-oct":[
  {k:'closed',t:'SHINANO 2 at 08:09 is the only morning train that stops at Nagiso. Shimokitazawa vintage shops mostly open at 12:00, so an empty afternoon there is normal.'},
  {k:'avoid',t:'Kabukicho touts near the Godzilla head (tomorrow onward): the same rule as Osaka — nobody invited off the street, ever.'},
  {k:'tip',t:'Flat check-in from 15:00. Ask the host for the exact door code and whether they accept forwarded luggage before you send anything.'},
  {k:'nook',t:'Shimokitazawa is two neighbourhoods: the vintage lanes north of the station and the curry-and-bars lanes south. The listening bars are south. Bonus Track, the low-rise strip along the old railway line, is where the new small places open.'}
 ],
 "2-oct":[
  {k:'closed',t:'Japan Folk Crafts Museum (Mingeikan) closes Mondays — it is open today. Manga School Nakano runs weekdays only, so if you want it, today is the only day.'},
  {k:'avoid',t:'Shibuya Sky sunset slots sell out days ahead; if you have not got the 16:40–17:00 ticket by now, go for a daytime slot instead of queueing for same-day returns. Takeshita-dori on a Friday afternoon is a crush; Cat Street is the same shops without the crush.'},
  {k:'look',t:'Sunny Hills on Minami-Aoyama gives a free pineapple cake and tea to anyone who walks in — they are selling, gently.'},
  {k:'nook',t:'The Prada building and the flagship crawl are free architecture. Nonbei Yokocho, the two lanes of 38 tiny bars behind Shibuya station, is the drink at the end.'},
  {k:'shop',t:'Tenugui cloths from Kamawanu (Daikanyama) or the stalls on Cat Street; stationery at Itoya in Ginza if the route bends that way. The Shibuya PARCO 6F is the place for the Nintendo and Pokémon things that only exist in Japan.'}
 ],
 "3-oct":[
  {k:'closed',t:'Honjo Life Safety Learning Center closes Wednesdays and the third Thursday; Monster Party and Champion run Saturdays. Everything on the plan is open.'},
  {k:'avoid',t:'Golden Gai: no photographs of the alleys, bar fronts or people without asking; bars marked "members only" or "regulars only" mean it; parties of more than three are turned away. Most bars are cash only — carry ¥10,000 each. Cover charges are ¥500–1,500 and should be posted at the door; if not, ask before sitting.'},
  {k:'avoid',t:'The Samurai Ninja Museum opened a second, larger site in Shinjuku in 2025. Check which one your ticket is for before you set off, and book a slot — the late afternoon ones sell out on Saturdays.'},
  {k:'tip',t:'Tokyo National Museum: the 70+ free entry needs ID. Hantei takes lunch from 12:30 and is a set course; say the no-meat request when you book, not on arrival.'},
  {k:'nook',t:'Albatross (no cover) has a rooftop; Bar Araku and Ace’s are the other two that welcome first-timers. The Yanaka sunset stairs (Yuyake Dandan) at about 17:15 tonight.'},
  {k:'shop',t:'Kappabashi, the kitchen-tool street, is fifteen minutes from the sumo show: Kama-Asa and Tsubaya for knives (engraved on the spot), plus the plastic food models. Yanaka Ginza: cat-shaped everything, and Kanekichien for tea and tea tins.'}
 ],
 "4-oct":[
  {k:'closed',t:'Tofu Cuisine Sorano: the Ebisu branch closes Sundays, so it has to be the Shibuya branch today. Ebisu Dagashi Bar and Muscle Girls Bar are open Sundays. Gotokuji cat corner ~08:00–16:30.'},
  {k:'avoid',t:'teamLab Borderless has no re-entry and no bags bigger than a daypack; lockers are before the entrance. Wear trousers and flat shoes — mirrored floors.'},
  {k:'tip',t:'DAWN café diner seating is for two or more and must be booked ahead — they take no same-day bookings; be five minutes early, they release tables.'},
  {k:'nook',t:'Todoroki Valley, reopened in March 2026 after a long closure, is a shaded ravine walk twenty minutes from Gotokuji and feels like leaving the city. Kagaya (Hatanodai) is reservation only, 14 seats.'},
  {k:'shop',t:'Edo kiriko cut glass — the Tokyo craft — from the small showrooms in Nihonbashi. Last records and vintage in Shimokitazawa, where the shops open at noon and the good stuff is on the second floors.'}
 ],
 "5-oct":[
  {k:'closed',t:'Ebisu Dagashi Bar closes Mondays, in case anyone had ideas. Edo Koji at Haneda T3 is on the 4F BEFORE security — do the shops and the purin first, then go through.'},
  {k:'avoid',t:'Taxi to Shinagawa at 08:45 is the fixed point. Book it the night before on the GO app or through the host; do not rely on hailing one in Shimokitazawa on a Monday morning.'},
  {k:'tip',t:'BA6 departs 13:05. Bag drop at T3 opens three hours before. Keikyu from Shinagawa takes about 15 minutes to T3.'}
 ]
};
window.HEADSUP=HU;
})();
