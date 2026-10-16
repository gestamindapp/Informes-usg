/* Informes USG · funcionamiento sin internet.
   Al publicar una versión nueva, cambiar VERSION: el navegador detecta el cambio
   y la app muestra el aviso "Hay una versión nueva". */
var VERSION = "1.1.0";
var CACHE = "usg-app-" + VERSION;
var FONTS = "usg-fonts";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./lib/pdfmake.min.js",
  "./icons/icon-192-v2.png",
  "./icons/icon-512-v2.png",
  "./icons/icon-maskable-512-v2.png",
  "./icons/apple-touch-icon-v2.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(ASSETS.map(function (u) { return new Request(u, { cache: "reload" }); }));
  }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) {
      return k.indexOf("usg-app-") === 0 && k !== CACHE;
    }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  /* letras de la interfaz (Google Fonts): copia guardada, se renueva en segundo plano */
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) {
          if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  /* la app: siempre desde la copia de esta versión */
  if (req.mode === "navigate") {
    e.respondWith(caches.match("./index.html").then(function (hit) {
      return hit || fetch(req);
    }));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (hit) {
    return hit || fetch(req);
  }));
});
