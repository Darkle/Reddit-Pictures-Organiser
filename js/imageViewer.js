import page from './web_modules/page.js'

import {appState} from './appState.js'

function loadImageViewer({params:{subreddit}}) {
  document.title = `RPO - ${subreddit} Images`
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so load the subreddit page
  *****/
  if(!appState.fetchedSubredditImages.length) {
    page(`/sub/${subreddit}`)
  }
  else{
    imageViewer()
  }
}

function imageViewer(params) {
  
}

export {
  loadImageViewer
}