LAMPTEYS ON TOUR — JAPAN 2026
=============================
The offline-first trip guidebook for Mica & Dad, 18 Sept – 5 Oct 2026.

WHAT THIS IS
------------
A self-contained website (no build tools, no accounts, no database):
  index.html          — the whole app shell + pop-art styling
  js/app.js           — rendering only (routing, cards, maps, phrases)
  js/data/days.js     — days 1–6  (18–23 Sep)   ← ALL CONTENT LIVES IN THESE FOUR FILES
  js/data/days2.js    — days 7–12 (24–29 Sep)
  js/data/days3.js    — days 13–18 (30 Sep–5 Oct)
  js/data/pages.js    — bookings, budget, packing, etiquette, phrases, map pins
  sw.js               — service worker (offline caching)
  manifest.webmanifest— makes it installable on the iPhone home screen
  images/             — hero + icons (hero.jpg = your image; swap any time)
  downloads/          — printable packing + before-you-go PDFs

PUT IT ON YOUR PHONES (2 minutes)
---------------------------------
1. Go to https://app.netlify.com/drop (free, no account needed to start).
2. Drag the whole "site" folder onto the page. You get a URL like
   https://something.netlify.app — you can rename it in settings.
3. Open that URL in Safari on each phone → Share → "Add to Home Screen".
4. With the app open ON WIFI once, tap through every page (Home, each day,
   Bookings, Budget, Packing, Etiquette, Phrases, Map). The service worker
   saves everything — including the place photos — for offline use.
5. Test: airplane mode on → open the app → everything written still works.
   (Live Google Maps, the budget sheet embed and booking links need signal.)

UPDATING CONTENT LATER
----------------------
Everything editable is plain text in js/data/*.js — no code knowledge needed
beyond keeping the quotes and commas intact:
- Booking statuses: js/data/pages.js (BK.done / BK.crit / BK.todo) and each
  day's hotel "status" field.
- When trains are booked: each day's travel legs have status/seats fields —
  paste in the real train number, platform, carriage and seats.
- When the Kiso base is confirmed: replace the "Second Kiso base" hotel block
  in days2.js (29-sep) and days3.js (30-sep) with the real property.
- After editing, re-drag the folder to Netlify Drop (same URL if you made an
  account) and bump the VERSION string at the top of sw.js (v1 → v2) so
  phones fetch the update.
The master Excel workbook remains the source of truth — update it first,
then mirror the change here.

BUDGET SHEET EMBED
------------------
The Budget page embeds the "Japan Spend" Google Sheet. If it shows a login
wall on the site: open the sheet → Share → "Anyone with the link: Viewer".
The OPEN button works for you both regardless.

IMAGES & ACCURACY
-----------------
Place photos are accurately identified Wikimedia Commons photographs of the
actual places (credit shown on each image; attribution stored in
js/data/days.js). Venues with no reliable free photo show a styled
placeholder + a PHOTOS button to official images — accuracy over decoration.
To use your own photos: drop a file in images/ and set the card's "img".

Built 30 Jul 2026 from japan_itinerary_website_master_2026 workbook.
Updated 17 Aug 2026 (v19): 40+ places, activities and food stops added from 90
saved Instagram posts. New clusters on 22 Sep (Tenjinbashisuji; Expo Park &
Tower of the Sun), 24 Sep (Plan B+ — the wider Arashiyama), 25 Sep (en-route
context), 27 Sep (the low-key night; Kibune) and 3 Oct (alternative local
evening), plus an OPTIONAL Toji flea market cluster on 21 Sep. Optional and
alternative clusters are now prefixed OPTIONAL — or ALTERNATIVE — so they read
as decide-on-the-day rather than as schedule. Anything that must be booked in
advance is ALSO listed on the TO DO page. Everything new carries a 17 Aug 2026 'checked' stamp and anything
unverified says so on the card. See PROVISIONAL.md for what still needs
checking before the trip.

Updated 2 Sep 2026 (v27):
- Every train and bus leg re-checked against date-specific 2026 timetables (Jorudan, JR West,
  Tankai, Nagiso Tourism, Kintetsu). Corrections: the Ine→Amanohashidate bus on Sun 27 Sep must be
  the 08:11 (the 09:25 misses the only morning express); the 1 Oct Shinano from Nagiso is the 08:09
  (nothing else stops until 15:55); the 28 Sep Shinano that stops at Nagiso is the 15:00; the HARUKA
  discount ticket must be bought online before flying; Tankai buses and all Kiso stations are cash /
  paper-ticket only. Each travel card now has a LIVE TIMES button (Jorudan, pre-filled for the day).
- Nara added: Sun 27 Sep afternoon via the AONIYOSHI sightseeing express, home through Fushimi Inari.
- To Do: "Trains to reserve" card with all eight legs, where to book, and a Japanese request sheet.
- Packing: gaps filled (sun/insect, earplugs, coin purse, host gift, 100V note, 4-night bag) and a
  copy-as-text "Dad's copy" list.
- Day pages rebuilt around AREA CARDS: each cluster = Google map with every pin (walking route,
  lettered A–H to match the list), open-in-Google-Maps, directions from where you are, a walking
  list with minutes between stops, then swipeable rows: SEE · DO · SHOP · EAT & DRINK · LEARN.
  Tap a card for the full detail sheet. "About this place" and the suggested order are collapsed.
- 46 more verified Wikimedia photographs (credits stored per image in js/data/days.js WIMG).
