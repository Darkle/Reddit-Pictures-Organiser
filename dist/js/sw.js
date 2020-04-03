
 self.addEventListener('fetch', function(event) {
  event.respondWith(event.request)
})