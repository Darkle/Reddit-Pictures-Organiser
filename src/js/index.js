import {init as initDb} from './store/db.js'
import {logger} from './logger.js'
import { initRouter } from './router.js'
import {store} from './store/store.js'

if(!window.location.hash.includes('#')) window.location.hash = '!/' // eslint-disable-line functional/immutable-data

initDb().then(initRouter).then(() => {
  console.log(store.subreddits)
}).catch(logger.error)

if('serviceWorker' in navigator){
  // service worker path is relative to the html file
  navigator.serviceWorker.register('sw.js').catch(logger.error)
}