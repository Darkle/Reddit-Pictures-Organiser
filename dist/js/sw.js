 self.addEventListener('install', (event) => {
  console.log('service worker installed')
})
 self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request))
})