import page from './web_modules/page.js'

import { appState } from './appState.js'
import {init as initDb} from './db.js'
import {log} from './logger.js'
import {loadHomePage} from './views/homePage.js'
import {loadSubredditPage} from './views/subredditPage.js'
import {loadImageViewer} from './imageViewer.js'

//we need a router for back/forwards

initDb().then(initRouter).catch(log)

function initRouter(){ // eslint-disable-line max-lines-per-function
  page('/', loadHomePage)
  page('/sub/:subreddit', loadSubredditPage)
  page.exit('/sub/:subreddit', () => {
    appState.viewingSubredditPage = false
  })
  page('/sub/imageviewer/:subreddit', loadImageViewer)
  page('/folders', () => {
    document.title = `RPO - Folders`
  })
  page('/manage', () => {
    document.title = `RPO - Manage Subs`
  })
  page('*', () => {
    log('log error here for 404')
    // redirect back to home page
    page('/')
  })
  page({
    hashbang: true
  })
}

