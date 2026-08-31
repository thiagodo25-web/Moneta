const CACHE_NAME = 'moneta-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './coin1.png',
  './coin2.png'
];

// Instalar y guardar recursos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).then(() => self.skipWaiting())
  );
});

// Activar el SW inmediatamente
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Estrategia: Buscar en Caché primero, si no está ir a la Red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Entrega el archivo guardado localmente
      }
      return fetch(event.request);
    })
  );
});
