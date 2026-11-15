/* Civix offline support for the web version. The Android app bundles all files, so it does not use this. */
const VERSION = 'civix-2026-11-15';
const CORE = ["./", "index.html", "privacy.html", "manifest.webmanifest", "assets/favicon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png", "assets/icons/maskable-512.png", "assets/logo.svg", "css/app.css", "data/amendments.js", "data/articles.js", "data/chapters/index.js", "data/chapters/u01.js", "data/chapters/u02.js", "data/chapters/u03.js", "data/chapters/u04.js", "data/chapters/u05.js", "data/chapters/u06.js", "data/chapters/u07.js", "data/chapters/u08.js", "data/chapters/u09.js", "data/chapters/u10.js", "data/chapters/u11.js", "data/pyq_mains.js", "data/pyq_mains_fw.js", "data/pyq_prelims.js", "data/revision.js", "data/syllabus.js", "data/updates.js", "js/app.js", "js/fun.js", "js/md.js", "js/store.js", "js/ui.js", "js/views.js"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Network first (so updates show up), cache as fallback (so it works offline). Fonts are cached as they load. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
