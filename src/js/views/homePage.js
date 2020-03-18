import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import { $, setPageTitle } from '../utils.js'
import { router } from '../router.js'

const html = htm.bind(h)

const HomePage = state => {
  return html`
    <main id="app" class="homePage">
      <nav class="navWrapper">
        <div class="folders" onmouseup=${ () => router.navigate('/folders')}>Folders</div>
        <div class="manage" onmouseup=${ () => router.navigate('/manage')}>Manage</div>
      </nav>
      ${listOfSubreddits(state, sortSubs(state))}
    </main>
  `
}

function loadHomePage() {
  setPageTitle('RPO')
  patch($('#app'), HomePage(store))
}

function listOfSubreddits(state, subs) {
  return !subs.length ? [null] : subs.map(subName =>
    html`
      <div class="subreddit" onmouseup=${() => router.navigate(`/sub/${subName}`)}>
        ${showStarIfFavouritedSub(state, subName)}
        <div>${subName}</div>
      </div>
    `
  )
}

const svgFavIcon = html`
<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 14 16' fill='currentColor'  class='favouriteStar'>
  <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
</svg>
`

function showStarIfFavouritedSub(state, subName) {
  const subIsAFavourite = state.favouriteSubreddits?.includes(subName)
  return subIsAFavourite ? svgFavIcon : null
}

/*****
  Subs sorted favourites first and then both sets are sorted
*****/
function sortSubs({favouriteSubreddits, subreddits}) {
  const favSubs = favouriteSubreddits?.length ? favouriteSubreddits : []
  const nonFavSubs = subreddits?.length ? subreddits : []
  const sortedNonfavSubs = nonFavSubs.filter(sub => !favSubs?.includes(sub)).sort()
  const sortedFavSubs = [...favSubs].sort()

  return [...sortedFavSubs, ...sortedNonfavSubs ]
}

export {
  loadHomePage
}