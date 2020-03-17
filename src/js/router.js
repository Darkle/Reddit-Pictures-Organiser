import Navigo from './web_modules/navigo.js'

import {loadHomePage} from './views/homePage.js'
import {loadSubredditPage} from './views/subredditPage.js'
import {loadManagePage} from './views/managePage.js'
import {loadFoldersPage} from './views/foldersPage.js'
import {loadImageViewer} from './views/imageViewer.js'
import { noSubsStored } from './utils.js'
import { logger } from './logger.js'

let router = null // eslint-disable-line functional/no-let
const root = null
const useHash = true 
const hash = '#!'

function initRouter(){ // eslint-disable-line max-lines-per-function
  router = new Navigo(root, useHash, hash)
  router
      // Show them the manage page to add new subs if they are new.
    .on(() => noSubsStored() ? router.navigate('/manage') : loadHomePage())
    .on('/sub/:subreddit', loadSubredditPage)
    .on('/sub/:subreddit/imageviewer', loadImageViewer)
    .on('/manage', loadManagePage)
    .on('/folders', loadFoldersPage)
    .notFound(() => {
      logger.error('Page not found. Redirecting to home page')
      router.navigate('/')
    })
    .resolve()  
}

export {
  initRouter,
  router,
}