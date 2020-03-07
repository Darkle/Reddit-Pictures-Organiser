import { h, patch } from '../web_modules/superfine.js'

import {store} from '../store/store.js'
import { $, setPageTitle, noSubsStored } from '../utils.js'
import { router } from '../router.js'

const homePage = state => 
  h('main', {id: 'app', class: 'homepage'}, [
   h('div', {class: 'manageWrapper'}, [
    h('div', {class: 'folders', onmouseup: () => router.navigate('/folders') }, 'Folders'),
    h('div', { class: 'manage', onmouseup: () => router.navigate('/manage') }, 'Manage'),
   ]),
   ...listOfSubreddits(state, sortSubs(state))
 ])

function loadHomePage() {
  /*****
    Show them the manage page to add new subs if they are new.
  *****/
  noSubsStored() ?
    router.navigate('/manage') :
      setPageTitle('RPO')
      patch($('#app'), homePage(store))
}

function listOfSubreddits(state, subs) {
  return !subs?.length ? [null] : subs.map(subName =>
    h('div', {class: 'subreddit', onmouseup: () => router.navigate(`/sub/${subName}`)}, [
      showStarIfFavouritedSub(state, subName),
      h('div', {}, subName)
    ])
  )
}

const svgAttrs = {
  xmlns:'http://www.w3.org/2000/svg',
  width:'16',
  height:'16',
  viewBox:'0 0 14 16',
  fill:'currentColor' ,
  class:'favouriteStar',
}
const svgPathAttrs = {
  'fill-rule': 'evenodd',
  d: 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'
}

function showStarIfFavouritedSub(state, subName) {
  const subIsAFavourite = state.favouriteSubreddits?.includes(subName)
  return !subIsAFavourite ? null : h('svg', svgAttrs, [h('path', svgPathAttrs)])
}

/*****
  Subs sorted favourites first and both sets are sorted
*****/
function sortSubs({favouriteSubreddits, subreddits}) { // eslint-disable-line complexity
  const favSubs = favouriteSubreddits?.length ? favouriteSubreddits : []
  const nonFavSubs = subreddits?.length ? subreddits : []
  const sortedNonfavSubs = nonFavSubs.filter(sub => !favSubs?.includes(sub)).sort()
  const sortedFavSubs = [...favSubs].sort()
  return [...sortedFavSubs, ...sortedNonfavSubs ]
}

export {
  loadHomePage
}