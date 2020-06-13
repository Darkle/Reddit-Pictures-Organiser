import{init as initDb}from './store/db.js'
import{logger}from './logger.js'
import{initRouter}from './router.js'
import{store}from './store/store.js'
if(!window.location.hash.includes('#'))window.location.hash='!/'
initDb().then(initRouter).then(()=>{console.log(JSON.stringify(store.subreddits))}).catch(logger.error)
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js').catch(logger.error)}