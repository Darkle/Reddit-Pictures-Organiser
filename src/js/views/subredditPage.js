import { h, patch } from '../web_modules/superfine.js'

import {store} from '../store/store.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {log} from '../logger.js'
import {$, setPageTitle, notOnSubredditPage} from '../utils.js'

function loadSubredditPage({subreddit}) {
  setPageTitle(`RPO - ${subreddit}`)
  store.removeStoredFetchedSubredditImages()
  
  const initialRender = true
  patch($('#app'), subredditPage(store, initialRender))

  getImagesAndUpdatePage({subreddit})
    .then(getImagesAndUpdatePage)
    .then(getImagesAndUpdatePage)
    .then(getImagesAndUpdatePage)
    .catch(log)
}

function getImagesAndUpdatePage({subreddit, lastImgFetched = null}){
  return fetchSubImages({subreddit, lastImgFetched}).then(latestLastImgFetched => {
    patchSubPage()
    return ({subreddit, lastImgFetched: latestLastImgFetched})
  })
}

const loadingDom = h('main', {id: 'app', class: 'subredditPage'}, [
 h('div', {class: 'subLoadingNotifier'}, 'Loading Images...')
])
const noImagesDom = h('main', {id: 'app', class: 'subredditPage'}, [
  h('div', {class: 'subLoadingNotifier'}, 'No Images Found')
])

function subredditPage(state, initialRender = false) {
  if(initialRender) return loadingDom
  if(!state.fetchedSubredditImages.length) return noImagesDom
  
  return h('main', {id: 'app', class: 'subredditPage'}, [
    state.fetchedSubredditImages.map(image =>
      h('div', {class: 'thumbnail-container'}, [
        h('img', {class: 'thumbnail', src: image.thumbnail, 'data-id': image.id})
      ])
    )
  ])  
}

/*****
We are throwing here if a fetch is sent and received, but the user navigates away, as we want to stop
any more fetch requests and html updates.
*****/
function patchSubPage(){
  if(notOnSubredditPage()) return Promise.reject(new Error('change this to be from my error class'))
  return patch($('#app'), subredditPage(store))
}

export {
  loadSubredditPage
}