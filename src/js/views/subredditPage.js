import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {logger} from '../logger.js'
import {$, setPageTitle} from '../utils.js'
import { router } from '../router.js'

const html = htm.bind(h)

function loadSubredditPage({subreddit, timefilter}) {
  setPageTitle(`RPO - ${subreddit}`)
  store.removeStoredFetchedSubredditImages()
  
  const initialRender = true
  patch($('#app'), SubredditPage({store, initialRender, timefilter, subreddit}))

  getImagesAndUpdatePage({subreddit, timefilter})
    // .then(getImagesAndUpdatePage)
    // .then(getImagesAndUpdatePage)
    // .then(getImagesAndUpdatePage)  
    .catch(logger.error)
}

function getImagesAndUpdatePage({subreddit, lastImgFetched = null, timefilter}){
  return fetchSubImages({subreddit, lastImgFetched, timefilter})
    .then(([latestLastImgFetched, returnedTimefilter]) => {
      patch($('#app'), SubredditPage({store, timefilter: returnedTimefilter, subreddit}))
      
      return ({subreddit, lastImgFetched: latestLastImgFetched, timefilter: returnedTimefilter})
    })
}

function PlaceHolder(timefilter, initialRender, subreddit){
  return html`
    <main id="app" class="subredditPage">
      <div>
          ${Nav(timefilter, subreddit)}
          <div class="subredditImagesContainer">
            <div class="subLoadingNotifier">${initialRender ? 'Loading Images...' : 'No Images Found'}</div>
          </div>    
      </div>
    </main>
  `
}

function SubredditPage({store, initialRender = false, timefilter, subreddit}) {
  if(initialRender) return PlaceHolder(timefilter, initialRender, subreddit)
  if(!store.fetchedSubredditImages.length) return PlaceHolder(timefilter, initialRender, subreddit)
  
  return html`
    <main id="app" class="subredditPage">
      ${Nav(timefilter, subreddit)}
      <div class="subredditImagesContainer">
        ${store.fetchedSubredditImages.map(image =>
          html`
            <div class="thumbnail-container">
              <img class="thumbnail" src="${getThumbnailSrc(image)}" data-id="${image.id}" data-src="asd"></img>
            </div>
          `
        )}
      </div>
    </main>    
    `
}

function Nav(timefilter, subreddit){
  const isCurrentFilter = (filter, routePath) => filter === routePath ? 'selectedSubTimeFilter' : ''
  return html`
    <nav class="navWrapper">
      <div class="home" onmouseup=${ () => router.navigate('/')}>Home</div>
      <div class="latest ${isCurrentFilter(timefilter, 'latest')}" onmouseup=${ () => router.navigate(`/sub/${subreddit}/latest`)}>Latest</div>
      <div class="topWeek ${isCurrentFilter(timefilter, 'week')}" onmouseup=${ () => router.navigate(`/sub/${subreddit}/week`)}>Top Week</div>
      <div class="topMonth ${isCurrentFilter(timefilter, 'month')}" onmouseup=${ () => router.navigate(`/sub/${subreddit}/month`)}>Top Month</div>
      <div class="topYear ${isCurrentFilter(timefilter, 'year')}" onmouseup=${ () => router.navigate(`/sub/${subreddit}/year`)}>Top Year</div>
      <div class="topAllTime ${isCurrentFilter(timefilter, 'subreddit')}" onmouseup=${ () => router.navigate(`/sub/${subreddit}/all`)}>Top All Time</div>
    </nav>  
    `
}

/*****
  Sometimes the thumbnail property is 'spoiler', in that case fall through to src or url
  Sometimes the thumbnail is missing, in that case, return the src
  Sometimes the src is missing (i think if its nsfw), in that case, return url
*****/
function getThumbnailSrc ({thumbnail, src, url}) {
  if(thumbnail?.startsWith('http')) return thumbnail
  if(src) return src
  return url
}

export {
  loadSubredditPage
}