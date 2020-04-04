/*****
  This file needs to be in the site root to capture requests from root https://developers.google.com/web/fundamentals/primers/service-workers#register_a_service_worker
*****/
// self.addEventListener('install', (event) => {
//   console.log('service worker installed')
//   // @ts-ignore
//   event.waitUntil(
//     caches.open('v1').then((cache) => {
//       return cache.addAll([
//         '/',
//       ])
//     })
//   )
// })
self.addEventListener('fetch', function(event) {
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    fetch(event.request).catch(function() {
      // @ts-ignore
      return caches.match(event.request)
    })
  )
})