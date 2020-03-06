import html from '../web_modules/yo-yo.js'

import {emitter} from '../actions.js'
import {appState} from '../appState.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {log} from '../logger.js'
import {$, notOnSubredditPage} from '../utils.js'
import { router } from '../router.js'
function loadSubredditPage({subreddit}) {
  console.log(subreddit)
  document.title = `RPO - ${subreddit}`
  console.log(router.lastRouteResolved()?.url)
  // remove the old stored sub images
  emitter.emit('remove-stored-fetched-subreddit-images')
  emitter.emit('remove-last-fetched-subreddit-image')

  renderSubPage()

  // grab about 200 images
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

function renderSubPage(){
  /*****
    We throw here because we want to stop any subsequent fetch requests and html updates
    if a user has navigated away.
  *****/
  if(notOnSubredditPage()) throw new Error('change this to be from my error class')
  return html.update($('#app'), subredditPage())
}

function subredditPage(){
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