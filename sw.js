importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js')

const { warmStrategyCache } = workbox.recipes
const { CacheFirst, StaleWhileRevalidate, NetworkFirst } = workbox.strategies
const { registerRoute } = workbox.routing
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration

// Set up page cache
const pageCache = new NetworkFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60, //30 * 24 * 60 * 60,
    }),
  ],
})

warmStrategyCache({
  urls: ['/classk/index.html', 'classk/'],
  strategy: pageCache,
})

registerRoute(({ request }) => request.mode === 'navigate', pageCache)

registerRoute(
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new NetworkFirst({
      cacheName: 'asset-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    }),
  )
  