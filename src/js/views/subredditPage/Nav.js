import { h } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'
import {$, isFavSub, isFavMixPage} from '../../utils.js'
import { updatePage } from './subredditPage.js'

const html = htm.bind(h)

function Nav(timefilter, subreddit){
  const isCurrentFilter = (filter, routePath) => filter === routePath ? 'selectedSubTimeFilter' : ''
  // There will be different subreddits calling Nav if we're in favmix
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
  if(isFavSub(subreddit)){
    store.removeFavouriteSubreddit(subreddit)
    toggleToast('subUnFavouritedToast')
  }
  else{
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

export {
  Nav
}