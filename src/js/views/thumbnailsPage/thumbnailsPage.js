import {html, render} from '../../web_modules/lit-html.js'
import pLimit from '../../web_modules/p-limit.js'

import {store} from '../../store/store.js'
import {fetchSubImages} from './fetchSubImages.js'
import {logger} from '../../logger.js'
import {setPageTitle, isFavMixPage} from '../../utils.js'
import { NoMoreImagesToFetch } from '../../Errors.js'
import { PlaceHolder } from './PlaceHolder.js'
import { Nav } from './Nav.js'
import { ThumbnailsContainer } from './ThumbnailsContainer.js'
import { Toast } from './Toast.js'

const queue = pLimit(2)

function loadThumbnailsPage({subreddit, timefilter, folderpage}) {
  const isSubredditPage = !folderpage
  const showLoadingPlaceholder = isSubredditPage
  setPageTitle(`RPO - ${folderpage ? folderpage : subreddit}`)

  if(isSubredditPage) store.removeStoredFetchedSubredditImages()

  updatePage({showLoadingPlaceholder, timefilter, subreddit, folderpage})

  if(isSubredditPage) queueSubImageFetchingAndUpdating(subreddit, timefilter)
}

function updatePage({showLoadingPlaceholder = false, timefilter, subreddit, folderpage}) {
  // @ts-ignore
  render(ThumbnailPage({showLoadingPlaceholder, timefilter, subreddit, folderpage}), document.body)
}

function ThumbnailPage(state) { // eslint-disable-line complexity
  const images = state.folderpage ? store.folders[state.folderpage] : store.fetchedSubredditImages
  if(isFavMixPage() && !store.favouriteSubreddits.length) return PlaceHolder({...state, showLoadingPlaceholder: false})
  if(state.showLoadingPlaceholder || !images.length) return PlaceHolder(state)

  return html`
    <main id="app" class="thumbnailPage">
      ${Nav(state)}
      ${ThumbnailsContainer(state)}
      ${!isFavMixPage() && !state.folderpage ? Toast(state) : ''}
    </main>
    `
}

function queueSubImageFetchingAndUpdating(subreddit, timefilter) {
  const subredditsToGetImagesFor = isFavMixPage() ? store.favouriteSubreddits : [subreddit]
  Promise.all(
    subredditsToGetImagesFor.map(sub =>
      // @ts-ignore
      queue(() =>
        fetchAndUpdatePage({subreddit: sub, lastImgFetched: null, timefilter})
          .then(data => isFavMixPage() ? data : fetchAndUpdatePage(data))
          .then(data => isFavMixPage() ? data : fetchAndUpdatePage(data))
          .then(data => isFavMixPage() ? data : fetchAndUpdatePage(data))
          /*****
            We need to catch here too in case on favmix page and a sub has no more images - we dont
            want the whole promise array to fail.
          *****/
          .catch(logger.error)
      )
    )
  ).catch(logger.error)
}

const subViewNoImagesFound = () => !isFavMixPage() && !store.fetchedSubredditImages.length
const imagesAmountLimit = 1000
const favMixTooManyImages = () => isFavMixPage() && store.fetchedSubredditImages.length > imagesAmountLimit

function fetchAndUpdatePage({subreddit, lastImgFetched, timefilter}){
  return fetchSubImages({subreddit, lastImgFetched, timefilter})
    .then(latestLastImgFetched => {
      if(favMixTooManyImages()) return Promise.reject(new NoMoreImagesToFetch())

      updatePage({timefilter, subreddit, folderpage: false})

      // We want to show the 'No Images Found...' placeholder if we are on a subreddit thats not the favmix.
      if(subViewNoImagesFound()) return Promise.reject(new NoMoreImagesToFetch())

      return ({subreddit, lastImgFetched: latestLastImgFetched, timefilter})
    })
}

export {
  loadThumbnailsPage,
  updatePage,
}