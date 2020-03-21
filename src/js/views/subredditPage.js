import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'
import pLimit from '../web_modules/p-limit.js'

import {store} from '../store/store.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {logger} from '../logger.js'
import {$, setPageTitle, isFavSub, isFavMixPage} from '../utils.js'
import { router } from '../router.js'
import { NoMoreImagesToFetch } from '../Errors.js'

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

function SubredditsContainer(subreddit, timefilter){
  return html`
    <div class="subredditImagesContainer">
      ${store.fetchedSubredditImages.map(image =>
        html`
          <div class="thumbnail-container">
            <img class="thumbnail" src="${getThumbnailSrc(image)}" data-id="${image.id}"  
              data-permalink="${image.permalink}"
              onmouseup="${() => 
                router.navigate(`/sub/${subreddit}/${timefilter}/imageviewer/${image.id}`)
              }"></img>
          </div>
        `
      )} 
    </div>  
  `
}

function Toast(subreddit) {
  return html`
    <div class="toast subFavouritedToast">${subreddit} Added To Favourites</div>
    <div class="toast subUnFavouritedToast">${subreddit} Removed From Favourites</div>   
  `
}

function PlaceHolder(timefilter, showLoadingPlaceholder, subreddit){
  return html`
    <main id="app" class="subredditPage">
      <div>
        ${Nav(timefilter, subreddit)}
        <div class="subredditImagesContainer">
          <div class="subLoadingNotifier">${showLoadingPlaceholder ? 'Loading Images...' : 'No Images Found'}</div>
        </div>    
      </div>
    </main>
  `
}

function Nav(timefilter, subreddit){
  const isCurrentFilter = (filter, routePath) => filter === routePath ? 'selectedSubTimeFilter' : ''
  const sub = isFavMixPage() ? 'favmix' : subreddit
  const subFilterNavigate = event => router.navigate(`/sub/${sub}/${event.target.textContent.trim()}`)

  return html`
    <nav class="navWrapper">
      <div class="home" onmouseup=${ () => router.navigate('/')}>Home</div>
      ${!isFavMixPage() && html`<div class="favStarContainer" onmouseup=${() => toggleSubAsFavourite(subreddit, timefilter)}>
          ${FavStar(subreddit)}
        </div>`
      }
      <div class="latest ${isCurrentFilter(timefilter, 'latest')}" onmouseup=${subFilterNavigate}>latest</div>
      <div class="latest ${isCurrentFilter(timefilter, 'week')}" onmouseup=${subFilterNavigate}>week</div>
      <div class="latest ${isCurrentFilter(timefilter, 'month')}" onmouseup=${subFilterNavigate}>month</div>
      <div class="latest ${isCurrentFilter(timefilter, 'year')}" onmouseup=${subFilterNavigate}>year</div>
      <div class="latest ${isCurrentFilter(timefilter, 'all')}" onmouseup=${subFilterNavigate}>all</div>
    </nav>  
    `
}

function FavStar(subreddit){
  const starFillColor = isFavSub(subreddit) ? '#fff4e8' : '#737373'

  return html`
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 14 16' fill=${starFillColor}  class='favouriteStar'>
        <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
      </svg>
  `
}

function toggleSubAsFavourite(subreddit, timefilter){
  if(isFavSub(subreddit)){ // eslint-disable-line functional/no-conditional-statement
    store.removeFavouriteSubreddit(subreddit)
    toggleToast('subUnFavouritedToast')
  }
  else{ // eslint-disable-line functional/no-conditional-statement
    store.addFavouriteSubreddit(subreddit)
    toggleToast('subFavouritedToast')
  }
  updatePage({timefilter, subreddit})
}

function toggleToast(toastSelector){
  $(`.${toastSelector}`)?.classList.toggle('showToast') // eslint-disable-line no-unused-expressions
  const threeSecondsInMS = 3000
  setTimeout(() => $(`.${toastSelector}`)?.classList.toggle('showToast'), threeSecondsInMS)
}

/*****
  Sometimes the thumbnail property is 'spoiler', in that case fall through to src or url
  Sometimes the thumbnail is missing, in that case, return the url
  Sometimes the url is missing (i think if its nsfw), in that case, return src
*****/
function getThumbnailSrc ({thumbnail, src, url}) {
  if(thumbnail?.startsWith('http')) return thumbnail
  if(url) return url
  return src
}

export {
  loadSubredditPage
}