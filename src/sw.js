/*****
  This file needs to be in the site root to capture requests from root https://developers.google.com/web/fundamentals/primers/service-workers#register_a_service_worker
*****/
self.addEventListener('fetch',function(event){
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    fetch(event.request).catch(err => { console.error(err)})
  )
})