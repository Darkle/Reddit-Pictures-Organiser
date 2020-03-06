import { h, patch } from '../web_modules/superfine'

import {appStore} from '../store/store.js'
import { $, setPageTitle } from '../utils.js'
import { router } from '../router.js'

const homePage = state => 
  h('main', {id: 'app', class: 'homepage'}, [
   h('div', {class: 'manageWrapper'}, [
    h('div', {class: 'folders', onmouseup: () => router?.navigate('/folders') }, 'Folders'),
    h('div', { class: 'manage', onmouseup: () => router?.navigate('/manage') }, 'Manage'),
   ]),
   ...listOfSubreddits(state, sortSubs(state))
 ])

function loadHomePage() {
  setPageTitle('RPO')
  patch($('#app'), homePage(appStore))
}

function listOfSubreddits(state, subs) {
  return !subs?.length ? [h(`No Images Found`)] : subs.map(subName =>
    h('div', {class: 'subreddit', onmouseup: () => router?.navigate('/sub/${subName}')}, [
      showStarIfFavouritedSub(state, subName),
      h('div', subName)
    ])
  )
}

function showStarIfFavouritedSub(state, subName) {
  const subIsAFavourite = state.favouriteSubreddits?.includes(subName)
  return !subIsAFavourite ? h('') : h('svg', {
    xmlns:'http://www.w3.org/2000/svg',
    width:'16',
    height:'16',
    viewBox:'0 0 14 16',
    fill:'currentColor' ,
    class:'favouriteStar',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      d: 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'
    })
  ])
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