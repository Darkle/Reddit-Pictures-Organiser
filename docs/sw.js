self.addEventListener('install',(event)=>{console.log('service worker installed')
event.waitUntil(caches.open('v1').then((cache)=>{return cache.addAll(['/',])}))})
self.addEventListener('fetch',function(event){event.respondWith(caches.match(event.request))})