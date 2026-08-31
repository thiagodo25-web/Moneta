importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "calculadora-offline-v1";

// 1. Cambia esto por la ruta de tu página principal (o archivos estáticos)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css', // reemplaza por tus archivos reales
  './app.js'
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// 2. Guarda los archivos en caché durante la instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// 3. Responde con la caché cuando no haya internet
self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      // Intenta usar la precarga de red o la red directa
      const preloadResp = await event.preloadResponse;
      if (preloadResp) return preloadResp;

      const networkResp = await fetch(event.request);
      return networkResp;
    } catch (error) {
      // Si la red falla (offline), busca el recurso solicitado en la caché
      const cache = await caches.open(CACHE);
      const cachedResp = await cache.match(event.request);
      
      // Si el recurso específico no está, devuelve el index.html
      return cachedResp || await cache.match('./index.html');
    }
  })());
});
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
