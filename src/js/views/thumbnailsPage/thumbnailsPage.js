import {html, render} from '../../web_modules/lit-html.js'
import pLimit from '../../web_modules/p-limit.js'

import {store} from '../../store/store.js'
import {fetchSubImages} from './fetchSubImages.js'
import {logger} from '../../logger.js'
import {$, setPageTitle, isFavMixPage} from '../../utils.js'
import { NoMoreImagesToFetch } from '../../Errors.js'
import { PlaceHolder } from './PlaceHolder.js'
import { Nav } from './Nav.js'
import { ThumbnailsContainer } from './ThumbnailsContainer.js'
import { Toast } from './Toast.js'

const queue = pLimit(2)

function loadThumbnailsPage({subreddit, timefilter, folderpage}) {
  const showLoadingPlaceholder = !folderpage
  setPageTitle(`RPO - ${folderpage ? folderpage : subreddit}`)
  
  !folderpage && store.removeStoredFetchedSubredditImages()
  
  updatePage({showLoadingPlaceholder, timefilter, subreddit, folderpage})
  
  !folderpage && getImagesAndUpdatePage(subreddit, timefilter)
}

function updatePage({showLoadingPlaceholder = false, timefilter, subreddit, folderpage}) {
  // @ts-ignore
  render(ThumbnailPage({showLoadingPlaceholder, timefilter, subreddit, folderpage}), $('#app'))
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
      updatePage({timefilter: returnedTimefilter, subreddit, folderpage: false})
      // We want to show the 'No Images Found...' placeholder if we are on a subreddit thats not the favmix.
      if(!store.fetchedSubredditImages.length) return Promise.reject(new NoMoreImagesToFetch())

      return ({subreddit, lastImgFetched: latestLastImgFetched, timefilter: returnedTimefilter})
    })
}

function ThumbnailPage(state) { // eslint-disable-line complexity
  const images = state.folderpage ? store.folders[state.folderpage] : store.fetchedSubredditImages
  if(state.showLoadingPlaceholder) return PlaceHolder(state)
  if(!images.length) return PlaceHolder(state)
  
  return html`
    <main id="app" class="thumbnailPage">
      ${Nav(state)}
      ${ThumbnailsContainer(state)}
      ${!isFavMixPage() && Toast(state)}
    </main>    
    `
}

export {
  loadThumbnailsPage,
  updatePage,
}