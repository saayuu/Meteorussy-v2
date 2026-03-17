const C = 'mrs-v8';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(['/'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== C).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('openweathermap') || e.request.url.includes('fonts')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
