import {init as initDb} from './store/db.js'
import {logger} from './logger.js'
import { initRouter } from './router.js'

if(!window.location.hash.includes('#')) window.location.hash = '!/' // eslint-disable-line functional/no-conditional-statement,functional/immutable-data

initDb().then(initRouter).catch(logger.error)
// import('./devDataMock.js').catch(logger.error)