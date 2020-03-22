import { h, patch } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'
import pLimit from '../../web_modules/p-limit.js'

import {store} from '../../store/store.js'
import {fetchSubImages} from '../../fetchSubImages.js'
import {logger} from '../../logger.js'
import {$, setPageTitle, isFavMixPage} from '../../utils.js'
import { NoMoreImagesToFetch } from '../../Errors.js'
import { PlaceHolder } from './PlaceHolder.js'
import { Nav } from './Nav.js'
import { SubredditsContainer } from './SubredditsContainer.js'
import { Toast } from './Toast.js'

const html = htm.bind(h)
const queue = pLimit(2)

function loadSubredditPage({subreddit, timefilter}) {
  setPageTitle(`RPO - ${subreddit}`)
  store.removeStoredFetchedSubredditImages()
  
  const showLoadingPlaceholder = true
  updatePage({showLoadingPlaceholder, timefilter, subreddit})
  
  getImagesAndUpdatePage(subreddit, timefilter)
}

function updatePage({showLoadingPlaceholder = false, timefilter, subreddit}) {
  patch($('#app'), SubredditPage({showLoadingPlaceholder, timefilter, subreddit}))
}

function getImagesAndUpdatePage(subreddit, timefilter) {
  const subredditsToGetImagesFor = isFavMixPage() ? store.favouriteSubreddits : [subreddit] 
  const queuedSubsImagesFetchAndUpdate = subredditsToGetImagesFor.map(sub => 
    // @ts-ignore
    queue(() =>
      initFetchAndUpdate({subreddit: sub, lastImgFetched: null, timefilter})
        // .then(initFetchAndUpdate)
        // .then(initFetchAndUpdate)
        // .then(initFetchAndUpdate)
        /*****
          We need to catch here too in case on favmix page and a sub has no more images - we dont
          want the whole promise array to fail.
        *****/
        .catch(logger.error)  
    )
  )  
  Promise.all(queuedSubsImagesFetchAndUpdate).catch(logger.error)  
}

function initFetchAndUpdate({subreddit, lastImgFetched, timefilter}){
  return fetchSubImages({subreddit, lastImgFetched, timefilter})
    .then(([latestLastImgFetched, returnedTimefilter]) => {
      updatePage({timefilter: returnedTimefilter, subreddit})
      // We want to show the 'No Images Found...' placeholder if we are on a subreddit thats not the favmix.
      if(!store.fetchedSubredditImages.length) return Promise.reject(new NoMoreImagesToFetch())

      return ({subreddit, lastImgFetched: latestLastImgFetched, timefilter: returnedTimefilter})
    })
}

function SubredditPage({showLoadingPlaceholder, timefilter, subreddit}) {
  if(showLoadingPlaceholder) return PlaceHolder(timefilter, showLoadingPlaceholder, subreddit)
  if(!store.fetchedSubredditImages.length) return PlaceHolder(timefilter, showLoadingPlaceholder, subreddit)
  
  return html`
    <main id="app" class="subredditPage">
      ${Nav(timefilter, subreddit)}
      ${SubredditsContainer(subreddit, timefilter)}
      ${!isFavMixPage() && Toast(subreddit)}
    </main>    
    `
}

export {
  loadSubredditPage,
  updatePage,
}