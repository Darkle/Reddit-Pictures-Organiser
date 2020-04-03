self.addEventListener('install', (event) => {
  console.log('service worker installed')
  // @ts-ignore
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
      ])
    })
  )
})
 self.addEventListener('fetch', function(event) {
   // @ts-ignore
  event.respondWith(caches.match(event.request))
})