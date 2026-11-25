// Scout2Bench: funziona senza rete dopo il primo caricamento / works offline after the first load
const CACHE = 's2b-a7f5fcc069b2', FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "py/pyodide-lock.json", "py/pyodide.asm.mjs", "py/pyodide.asm.wasm", "py/pyodide.js", "py/python_stdlib.js"];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
