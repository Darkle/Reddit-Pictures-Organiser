import html from '../web_modules/yo-yo.js'

import {appState} from '../appState.js'
import { $ } from '../utils.js'
import { router } from '../router.js'

function loadHomePage() {
  document.title = 'RPO'
  html.update($('#app'), homePage())
}

function homePage(){
 return html`
   <main id="app" class="homepage">
     <div class="manageWrapper">
       <div class="folders" onmouseup=${ () => router.navigate('/folders') }>Folders</a>
       <div class="manage" onmouseup=${ () => router.navigate('/manage') }>Manage</a>
     </div>
     ${listOfSubreddits(sortSubs(appState))}
   </main>
 `
}

function listOfSubreddits(items) {
  if(!items?.length) return html`No Images Found`
  return items.map(subName =>
    html`
      <div class="subreddit" onmouseup=${ () => router.navigate(`/sub/${subName}`) }>
      ${showStarIfFavouritedSub(subName)}
      <div>${subName}</div>
      </div>
  `)
}

function showStarIfFavouritedSub(subName) {
  const subIsAFavourite = appState.favouriteSubreddits.includes(subName)
  if(!subIsAFavourite) return ''

  return html`
    <svg xmlns="http://www.w3.org/2000/svg"
      width="16" height="16" viewBox="0 0 14 16"
      fill="currentColor" class="favouriteStar">
      <path fill-rule="evenodd"
      d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67
        14 7 11.67 11.33 14l-.93-4.74L14 6z"/>
      </svg>
    `
}
/*****
  Subs sorted favourites first and both sets are sorted
*****/
function sortSubs({subreddits, favouriteSubreddits}) {
  const sortedNonfavSubs = subreddits.filter(sub => !favouriteSubreddits.includes(sub)).sort()
  const sortedFavSubs = favouriteSubreddits.sort()
  return [...sortedFavSubs, ...sortedNonfavSubs ]
}

export {
  loadHomePage
}