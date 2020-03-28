import { h, patch } from '../web_modules/superfine.js'

import {store} from '../store/store.js'
import { $, setPageTitle, isFavSub } from '../utils.js'
import { router } from '../router.js'

function loadHomePage() {
  setPageTitle('RPO')
  patch($('#app'), HomePage(store))
}

function HomePage(state) {
  return h('main', {class:'homePage'}, [
    h('nav', {class: 'navWrapper'}, [
      h('div', {class: 'folders', onmouseup: () => router.navigate('/folders')}, 'Folders'),
      h('div', {class: 'manage', onmouseup: () => router.navigate('/manage')}, 'Manage'),
    ]),
    h('div', {class: 'subreddit', onmouseup: () => router.navigate(`/sub/favmix/latest`)}, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 16, // eslint-disable-line no-magic-numbers
        height: 16, // eslint-disable-line no-magic-numbers
        viewBox: '0 0 14 16',
        fill: 'currentColor',
        class: 'favouriteStar'
      }, [
        h('path', {'fill-rule': 'evenodd', d: 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'})
      ]),
      h('div', {}, 'Favourites Mix')
    ]),
    listOfSubreddits(sortSubs(state))
  ])
}

function listOfSubreddits(subs) {
  return !subs.length ? [null] : subs.map(subName =>
    h('div', {class:'subreddit', onmouseup: () => router.navigate(`/sub/${subName}/latest`)}, [
      showStarIfFavouritedSub(subName),
      h('div', {}, subName)
    ])
  )
}

const svgFavIcon = h('svg',{
  xmlns: 'http://www.w3.org/2000/svg',
  width: 16, // eslint-disable-line no-magic-numbers
  height: 16, // eslint-disable-line no-magic-numbers
  viewBox: '0 0 14 16',
  fill: 'currentColor',
  class: 'favouriteStar'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    d: 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'
  })
])

function showStarIfFavouritedSub(subName) {
  return isFavSub(subName) ? svgFavIcon : null
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