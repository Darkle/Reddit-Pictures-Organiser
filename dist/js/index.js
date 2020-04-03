import{init as initDb}from './store/db.js'
import{logger}from './logger.js'
import{initRouter}from './router.js'
if(!window.location.hash.includes('#'))window.location.hash='!/'
initDb().then(initRouter).catch(logger.error)
if('serviceWorker'in navigator){navigator.serviceWorker.register('/js/sw.js').catch(logger.error)}