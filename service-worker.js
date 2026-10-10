const CACHE_NAME = "frictionhub-shell-v1";
const BASE_URL = new URL("./", self.registration.scope);

const APP_SHELL = [
  "./", "./index.html", "./style.css", "./script.js", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png"
].map(path => new URL(path, BASE_URL).toString());

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith("frictionhub-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const scopeUrl = new URL(self.registration.scope);
  if (url.origin !== scopeUrl.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const home = await caches.match(new URL("./index.html", BASE_URL).toString());
        if (home) return home;
        return new Response(
          "<!doctype html><html><meta charset='utf-8'><meta name='viewport' content='width=device-width'><title>Offline</title><body style='font-family:system-ui;background:#101018;color:white;padding:2rem'><h1>You are offline</h1><p>Reconnect to open this page for the first time.</p><a style='color:#ffd866' href='./index.html'>Return to FrictionHub</a></body></html>",
          {headers: {"Content-Type":"text/html; charset=utf-8"}}
        );
      })
    );
    return;
  }

  event.respondWith(caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response && response.ok && response.type === "basic") {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    });
  }));
});
