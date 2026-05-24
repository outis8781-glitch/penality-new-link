const cacheName = "Gomida-penaliity shootout game-2.0";
const contentToCache = [
    "Build/00c8ad29e653e75c252f088a4459ece6.loader.js",
    "Build/7dd3f3d120db43d6fc8fbd844c709cf3.framework.js.unityweb",
    "Build/551bc6e91dfe7608293902db16fae93a.data.unityweb",
    "Build/29cc72bedcb1cd37b46af3cde80c3023.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
