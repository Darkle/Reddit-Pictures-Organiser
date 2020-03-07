import { h, patch } from '../web_modules/superfine.js'

import {store} from '../store/store.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {log} from '../logger.js'
import {$, setPageTitle, notOnSubredditPage} from '../utils.js'

function loadSubredditPage({subreddit}) {
  setPageTitle(`RPO - ${subreddit}`)
  store.removeStoredFetchedSubredditImages()
  renderSubPage()

  fetchSubImages(subreddit)
    .then(renderSubPage)
    .then(() => fetchSubImages(subreddit))
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
  return notOnSubredditPage() ? Promise.reject(new Error('change this to be from my error class'))
    : patch($('#app'), subredditPage(store))
}

export {
  loadSubredditPage
}