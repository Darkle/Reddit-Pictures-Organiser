import { h, patch } from '../web_modules/superfine'

import {emitter} from '../actions.js'
import {appState} from '../appState.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {log} from '../logger.js'
import {$, setPageTitle} from '../utils.js'

function loadSubredditPage({params:{subreddit}}) {
  setPageTitle(`RPO - ${subreddit}`)
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

const subredditPage = state => h('main', {id: 'app', class: 'subredditPage'}, [
  !state.fetchedSubredditImages.length ? h('div', {class: 'subLoadingNotifier'}, 'Loading Images...')
    : state.fetchedSubredditImages.map(image =>
        h('div', {class: 'thumbnail-container'}, [
          h('img', {class: 'thumbnail', src: image.thumbnail, 'data-id': image.id})
        ])
      )
  ])

/*****
We are throwing here if a fetch is sent and received, but the user navigates away, we want to stop
any more fetch requests and html updates.
*****/
function renderSubPage(){
  return !appState.viewingSubredditPage ? new Error('change this to be from my error class')
    : patch($('#app'), subredditPage(appState))
}

export {
  loadSubredditPage
}