import {init as initDb} from './store/db.js'
import {logger} from './logger.js'
import { initRouter } from './router.js'

if(!window.location.hash.includes('#')) window.location.hash = '!/' // eslint-disable-line functional/immutable-data

initDb().then(initRouter).catch(logger.error)
// service worker path is relative to the html file
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/js/service-worker.js').catch(logger.error)
}