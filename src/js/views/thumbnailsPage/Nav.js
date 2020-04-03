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
       <div class="folderName">${state.folderpage}</div>
       <div class="removeImageFromFolder" 
          @mouseup=${() => deleteFolder(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
            stroke="#fff4e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
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
      <div class=${isCurrentFilter('latest')} @mouseup=${subFilterNavigate}>latest</div>
      <div class=${isCurrentFilter('week')} @mouseup=${subFilterNavigate}>week</div>
      <div class=${isCurrentFilter('month')} @mouseup=${subFilterNavigate}>month</div>
      <div class=${isCurrentFilter('year')} @mouseup=${subFilterNavigate}>year</div>
      <div class=${isCurrentFilter('all')} @mouseup=${subFilterNavigate}>all</div>  
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

function deleteFolder(state){
  store.removeFolder(state.folderpage)
  router.navigate(`/folders/`)
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