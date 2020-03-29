import {html, render} from '../web_modules/lit-html.js'

import {store} from '../store/store.js'
import { setPageTitle, isFavSub } from '../utils.js'
import { router } from '../router.js'

function loadHomePage() {
  setPageTitle('RPO')
  // @ts-ignore
  render(HomePage(store), document.body)
}

function HomePage(state) {
  return html`
    <main id="app" class="homePage">
      <nav class="navWrapper">
        <div class="folders" @mouseup=${ () => router.navigate('/folders')}>Folders</div>
        <div class="manage" @mouseup=${ () => router.navigate('/manage')}>Manage</div>
      </nav>
      <div class="subreddit" @mouseup=${() => router.navigate(`/sub/favmix/latest`)}>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 14 16' fill='currentColor'  class='favouriteStar'>
          <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
        </svg>
        <div>Favourites Mix</div>
      </div>      
      ${Subreddits(sortSubs(state))}
    </main>
  `
}

function Subreddits(subs) {
  return subs.map(subName =>
    html`
      <div class="subreddit" @mouseup=${() => router.navigate(`/sub/${subName}/latest`)}>
        ${showStarIfFavouritedSub(subName)}
        <div>${subName}</div>
      </div>
    `
  )
}

const FavIcon = html`
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 14 16' fill='currentColor'  class='favouriteStar'>
    <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
  </svg>
`

function showStarIfFavouritedSub(subName) {
  return isFavSub(subName) ? FavIcon : null
}

/*****
  Subs sorted favourites first and then both sets are sorted a-z
*****/
function sortSubs({favouriteSubreddits, subreddits}) {
  const sortedNonfavSubs = subreddits.filter(sub => !favouriteSubreddits?.includes(sub)).sort()
  const sortedFavSubs = [...favouriteSubreddits].sort()

  return [...sortedFavSubs, ...sortedNonfavSubs ]
}

export {
  loadHomePage
}