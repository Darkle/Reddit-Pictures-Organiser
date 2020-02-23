import {html, render} from '../web_modules/snabbx.js'

import {emitter} from '../actions.js'
import {appState} from '../appState.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {log} from '../logger.js'
import {$} from '../utils.js'

function loadSubredditPage({params:{subreddit}}) {
  document.title = `RPO - ${subreddit}`
  /*****
    appState.viewingSubredditPage is so we can cancel any pending fetch 
    and renders if we are still doing that and the user navigates away.
  *****/
  appState.viewingSubredditPage = true
  // remove the old stored sub images
  emitter.emit('remove-stored-fetched-subreddit-images')
  emitter.emit('remove-last-fetched-subreddit-image')

  fetchSubImages(subreddit)
    .then(rerenderSubPage)
    .then(() => fetchSubImages(subreddit))
    .then(rerenderSubPage)
    .then(() => fetchSubImages(subreddit))
    .then(rerenderSubPage)
    .catch(log)
}

function rerenderSubPage(){
  if(!appState.viewingSubredditPage) Promise.reject(new Error('change this to be from my error class'))
  return render($('#app'), subredditPage())
}

function subredditPage(){
  return html`
   <main id="app" class="subredditPage">
     ${appState.fetchedSubredditImages.map(image => {
        return html`<div class="thumbnail-container">
          <img class="thumbnail" src="${image.thumbnail}" data-id="${image.id}" />
        </div>
        `})
      }
   </main>
  `
}

export {
  loadSubredditPage
}