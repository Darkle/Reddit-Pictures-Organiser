self.addEventListener('install',function(event){event.waitUntil(caches.open('v1').then(function(cache){console.log('Opened cache')
return cache.addAll(['/',])}))})
self.addEventListener('fetch',function(event){event.respondWith(caches.match(event.request).then(function(response){if(response){return response}
return fetch(event.request)}))})