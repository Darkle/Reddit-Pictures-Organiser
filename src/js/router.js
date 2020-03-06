import Navigo from './web_modules/navigo.js'

import {loadHomePage} from './views/homePage.js'
import {loadSubredditPage} from './views/subredditPage.js'
import {loadImageViewer} from './views/imageViewer.js'
import { setPageTitle } from './utils.js'

let router = null

function initRouter(){ // eslint-disable-line max-lines-per-function
  const root = null
  const useHash = true // Defaults to: false
  const hash = '#!' // Defaults to: '#'
  router = new Navigo(root, useHash, hash)

  router
    .on(() => {
      //TODO: set current hash route in store??
      console.log('empty navigo func')
      console.log(router?.getLinkPath())
    })
    .on('/home', loadHomePage)
    .on('/sub/:subreddit', loadSubredditPage)
    .on('/sub/:subreddit/imageviewer', ({params:{subreddit}}) => {
      console.log(`/sub/${subreddit}`)
      loadImageViewer()
    })
    .on('/manage', ({params:{subreddit}}) => {
      setPageTitle(`RPO - Manage Subs`)
    })
    .on('/folders', ({params:{subreddit}}) => {
      setPageTitle(`RPO - Folders`)
    })
    .notFound(() => {
      console.error('Page not found. Redirecting to /home')
      router.navigate('/home')
    })
    .resolve()  
}

export {
  initRouter,
  router,
}