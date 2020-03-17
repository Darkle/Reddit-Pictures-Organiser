import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {logger} from '../logger.js'
import {$, setPageTitle, notOnSubredditPage} from '../utils.js'
import { UserNavigatedAway } from '../Errors.js'

const html = htm.bind(h)

function loadSubredditPage({subreddit}) {
  setPageTitle(`RPO - ${subreddit}`)
  store.removeStoredFetchedSubredditImages()
  
  const initialRender = true
  patch($('#app'), subredditPage(store, initialRender))

  getImagesAndUpdatePage({subreddit})
    .then(getImagesAndUpdatePage)
    .then(getImagesAndUpdatePage)
    .then(getImagesAndUpdatePage)
    .catch(logger.error)
}

function getImagesAndUpdatePage({subreddit, lastImgFetched = null}){
  return fetchSubImages({subreddit, lastImgFetched}).then(latestLastImgFetched => {
    if(notOnSubredditPage()) return Promise.reject(new UserNavigatedAway())

    patch($('#app'), subredditPage(store))
    
    return ({subreddit, lastImgFetched: latestLastImgFetched})
  })
}

const loadingDom = html`
  <main id="app" class="subredditPage">
    <div class="subLoadingNotifier">Loading Images...</div>
  </main>
`
const noImagesDom = html`
  <main id="app" class="subredditPage">
    <div class="subLoadingNotifier">No Images Found</div>
  </main>
`
// Sometimes the thumnail property is 'spoiler'
const getThumbnailSrc = ({thumbnail, src}) => thumbnail.startsWith('http') ? thumbnail : src

function subredditPage(state, initialRender = false) {
  if(initialRender) return loadingDom
  if(!state.fetchedSubredditImages.length) return noImagesDom
  
  return html`
    <main id="app" class="subredditPage">
      ${state.fetchedSubredditImages.map(image => 
        html`
          <div class="thumbnail-container">
            <img class="thumbnail" src="${getThumbnailSrc(image)}" data-id="${image.id}"></img>
          </div>
        `  
      )}
    </main>    
  `
}

export {
  loadSubredditPage
}