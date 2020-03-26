import Navigo from './web_modules/navigo.js'

import {loadHomePage} from './views/homePage.js'
import {loadSubredditPage} from './views/subredditPage/subredditPage.js'
import {loadManagePage} from './views/managePage.js'
import {loadFoldersPage} from './views/foldersPage.js'
import {loadFolderPage} from './views/folderPage.js'
import {loadImageViewer} from './views/imageViewerPage/imageViewerPage.js'
import {loadImageEditor} from './views/imageEditorPage/imageEditorPage.js'
import { noSubsStored } from './utils.js'
import { logger } from './logger.js'

const root = null
const useHash = true 
const hash = '#!'
const router = new Navigo(root, useHash, hash)

function initRouter(){
  router
      // Show them the manage page to add new subs if they are new.
    .on(() => noSubsStored() ? router.navigate('/manage') : loadHomePage())
    .on('/sub/:subreddit/:timefilter', loadSubredditPage)
    .on('/sub/:subreddit/:timefilter/imageviewer/:imageId', loadImageViewer)
    .on('/sub/:subreddit/:timefilter/imageviewer/edit/:imageId', loadImageEditor)
    .on('/manage', loadManagePage)
    .on('/folders', loadFoldersPage)
    .on('/folders/:folder', loadFolderPage)
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