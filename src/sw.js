/*****
  This file needs to be in the site root to capture requests from root https://developers.google.com/web/fundamentals/primers/service-workers#register_a_service_worker
*****/
self.addEventListener('install', function(event) {
  // @ts-ignore
  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        console.log('Opened cache')
        return cache.addAll([
          '/',
        ])
      })
  )
})
self.addEventListener('fetch', function(event) {
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response
        }
        // @ts-ignore
        return fetch(event.request)
      }
    )
  )
})