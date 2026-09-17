/* LAMPTEYS ON TOUR — service worker: precache app shell + runtime-cache everything (incl. remote images & fonts). */
const VERSION = 'lampteys-v97';
const SHELL = [
  './','index.html','manifest.webmanifest',
  'js/app.js','js/data/days.js','js/data/days2.js','js/data/days3.js','js/data/pages.js','js/data/lists.js','js/data/headsup.js','js/data/gphotos.js','js/data/confirm.js','js/data/final.js','js/data/getting.js',
  'images/hero.jpg','images/icon-192.png','images/icon-512.png',
  'downloads/dad-departure-list.pdf','downloads/mica-departure-lists.pdf','downloads/lampteys-japan-places.kml',
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&family=Zen+Kaku+Gothic+New:wght@900&display=swap'
];
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    // Shell: fail install only if local shell fails; remote extras are best-effort.
    await c.addAll(SHELL.filter(u => !u.startsWith('http')).map(u => new Request(u, { cache: 'reload' })));
    await Promise.allSettled(SHELL.filter(u => u.startsWith('http')).map(u => c.add(u)));
    // Best-effort precache of the day-page images declared in data files.
    try {
      const urls = [];
      const reg = /https:\/\/upload\.wikimedia\.org[^"']+/g;
      for (const f of ['js/data/days.js']) {
        const t = await (await fetch(f)).text();
        (t.match(reg) || []).forEach(u => urls.push(u));
      }
      await Promise.allSettled([...new Set(urls)].map(u => c.add(new Request(u, { mode: 'no-cors' }))));
    } catch (err) { /* offline install still works without remote images */ }
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.pathname.indexOf('/preview/') >= 0) return; // previews always come straight from the network
  // Never intercept Google Maps / Sheets embeds — live-only content.
  if (/google\.(com|co)|gstatic|googleapis\.com\/maps|places\.googleapis|googleusercontent/.test(url.host) && !/fonts\./.test(url.host)) return;
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    const cached = await c.match(req, { ignoreSearch: false });
    if (cached) {
      // Stale-while-revalidate for local files.
      if (url.origin === location.origin) fetch(new Request(req, { cache: 'no-cache' })).then(r => { if (r && r.ok) c.put(req, r.clone()); }).catch(() => {});
      return cached;
    }
    try {
      const mode = url.origin === location.origin ? undefined : 'no-cors';
      const res = await fetch(mode ? new Request(req, { mode }) : req);
      if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
      return res;
    } catch (err) {
      if (req.mode === 'navigate') return c.match('index.html');
      return new Response('', { status: 408 });
    }
  })());
});
