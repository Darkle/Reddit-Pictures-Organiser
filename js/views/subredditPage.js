import html from '../web_modules/yo-yo.js'

import {emitter} from '../actions.js'
import {appState} from '../appState.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {log} from '../logger.js'
import {$} from '../utils.js'

function loadSubredditPage({params:{subreddit}}) {
  document.title = `RPO - ${subreddit}`
  /*****
    appState.viewingSubredditPage is so we can cancel any pending 'fetch
    and renders' that are still queued when the user navigates away.
  *****/
  appState.viewingSubredditPage = true
  // remove the old stored sub images
  emitter.emit('remove-stored-fetched-subreddit-images')
  emitter.emit('remove-last-fetched-subreddit-image')

  renderSubPage()

  fetchSubImages(subreddit)
    .then(renderSubPage)
    .then(() => fetchSubImages(subreddit))
    .then(renderSubPage)
    .then(() => fetchSubImages(subreddit))
    .then(renderSubPage)
    .then(() => fetchSubImages(subreddit))
    .then(renderSubPage)
    .catch(log)
}
/*****
  We are throwing here if a fetch is sent and received, but the user navigates away, we want to stop
  any more fetch requests and html updates.
*****/
function renderSubPage(){
  if(!appState.viewingSubredditPage) Promise.reject(new Error('change this to be from my error class'))
  return html.update($('#app'), subredditPage())
}

function subredditPage(){
  console.log(appState.fetchedSubredditImages.length)
  return html`
   <main id="app" class="subredditPage">
    ${ !appState.fetchedSubredditImages.length ? 
      html`<div class="subLoadingNotifier">Loading Images...</div>` : 
        appState.fetchedSubredditImages.map(image => {
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