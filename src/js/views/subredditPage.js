import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import {fetchSubImages} from '../fetchSubImages.js'
import {logger} from '../logger.js'
import {$, setPageTitle} from '../utils.js'
import { router } from '../router.js'

const html = htm.bind(h)
/*****
  Note: I've notices uBlock sometimes will block a https://b.thumbs.redditmedia.com/
  thumbnail if it has the letters 'AD' in the url. e.g. https://b.thumbs.redditmedia.com/ADx_2s6QaC8BMBUc5KjDCZpZF0ZTjYGXXRF9vkDzpPw.jpg
*****/
function loadSubredditPage({subreddit, timefilter}) {
  setPageTitle(`RPO - ${subreddit}`)
  store.removeStoredFetchedSubredditImages()
  
  const initialRender = true
  patch($('#app'), SubredditPage({store, initialRender, timefilter, subreddit}))

  getImagesAndUpdatePage({subreddit, lastImgFetched: null, timefilter})
    // .then(getImagesAndUpdatePage)
    // .then(getImagesAndUpdatePage)
    // .then(getImagesAndUpdatePage)  
    .catch(logger.error)
}

function getImagesAndUpdatePage({subreddit, lastImgFetched, timefilter}){
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

function SubredditPage({store: state, initialRender = false, timefilter, subreddit}) {
  if(initialRender) return PlaceHolder(timefilter, initialRender, subreddit)
  if(!state.fetchedSubredditImages.length) return PlaceHolder(timefilter, initialRender, subreddit)
  
  return html`
    <main id="app" class="subredditPage">
      ${Nav(timefilter, subreddit)}
      <div class="subredditImagesContainer">
        ${state.fetchedSubredditImages.map(image =>
          html`
            <div class="thumbnail-container">
              <img class="thumbnail" src="${getThumbnailSrc(image)}" data-id="${image.id}"></img>
            </div>
          `
        )}
      </div>
    </main>    
    `
}

function Nav(timefilter, subreddit){
  const isCurrentFilter = (filter, routePath) => filter === routePath ? 'selectedSubTimeFilter' : ''
  const timeFilters = ['latest', 'week', 'month', 'year', 'all']
  return html`
    <nav class="navWrapper">
      <div class="home" onmouseup=${ () => router.navigate('/')}>Home</div>
      ${
        timeFilters.map(filter => 
          html`<div class="latest ${isCurrentFilter(timefilter, filter)}" 
                  onmouseup=${ () => router.navigate(`/sub/${subreddit}/${filter}`)}>${filter}</div>
          `
        )
      }
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