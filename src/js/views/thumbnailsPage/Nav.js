import {html} from '../../web_modules/lit-html.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'
import {$, isFavSub, isFavMixPage} from '../../utils.js'
import { updatePage } from './thumbnailsPage.js'

function Nav(state){ // eslint-disable-line max-lines-per-function, complexity
  const isCurrentFilter = (routePath) => state.timefilter === routePath ? 'selectedSubTimeFilter' : ''
  // There will be different subreddits calling Nav() if we're in favmix, so we need to we use the right sub for navigation.
  const sub = isFavMixPage() ? 'favmix' : state.subreddit
  const subFilterNavigate = event => router.navigate(`/sub/${sub}/${event.target.textContent.trim()}`)

  if(state.folderpage) {
    return html`
      <nav class="navWrapper">
        <div class="back" @mouseup=${() => router.navigate(`/folders/`)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff4e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"></path>
          </svg> 
       </div>
      </nav>  
    `
  }

  return html`
    <nav class="navWrapper">
      <div class="home" @mouseup=${() => router.navigate('/')}>Home</div>
      ${!isFavMixPage() ?
          html`<div class="favStarContainer" @mouseup=${() => toggleSubAsFavourite(state)}>
            ${FavStar(state.subreddit)}
          </div>` : ''
      }
      <div class="latest ${isCurrentFilter('latest')}" @mouseup=${subFilterNavigate}>latest</div>
      <div class="latest ${isCurrentFilter('week')}" @mouseup=${subFilterNavigate}>week</div>
      <div class="latest ${isCurrentFilter('month')}" @mouseup=${subFilterNavigate}>month</div>
      <div class="latest ${isCurrentFilter('year')}" @mouseup=${subFilterNavigate}>year</div>
      <div class="latest ${isCurrentFilter('all')}" @mouseup=${subFilterNavigate}>all</div>  
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

function toggleSubAsFavourite(state){
  if(isFavSub(state.subreddit)){
    store.removeFavouriteSubreddit(state.subreddit)
    toggleToast('subUnFavouritedToast')
  }
  else{
    store.addFavouriteSubreddit(state.subreddit)
    toggleToast('subFavouritedToast')
  }
  updatePage(state)
}

function toggleToast(toastSelector){
  $(`.${toastSelector}`)?.classList.toggle('showToast') // eslint-disable-line no-unused-expressions
  const threeSecondsInMS = 3000
  setTimeout(() => $(`.${toastSelector}`)?.classList.toggle('showToast'), threeSecondsInMS)
}

export {
  Nav
}