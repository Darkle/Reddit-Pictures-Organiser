//@flow
import { h, patch } from 'superfine'

import {appState} from '../appState.js'
import { $, setPageTitle } from '../utils.js'
import { router } from '../router.js'

const homePage = state => 
  h('main', {id: 'app', class: 'homepage'}, [
   h('div', {class: 'manageWrapper'}, [
    h('div', {class: 'folders', onmouseup: () => router?.navigate('/folders') }, 'Folders'),
    h('div', { class: 'manage', onmouseup: () => router?.navigate('/manage') }, 'Manage'),
   ]),
   ...listOfSubreddits(sortSubs(state))
 ])

function loadHomePage() {
  setPageTitle('RPO')
  patch($('#app'), homePage(appState))
}

function listOfSubreddits(subs:$ReadOnlyArray<string>):any {
  return !subs?.length ? [h(`No Images Found`)] : subs.map(subName =>
    h('div', {class: 'subreddit', onmouseup: () => router?.navigate('/sub/${subName}')}, [
      showStarIfFavouritedSub(subName),
      h('div', subName)
    ])
  )
}

function showStarIfFavouritedSub(subName:string):any {
  const subIsAFavourite = appState.favouriteSubreddits?.includes(subName)
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

type Subreddits = $ReadOnlyArray<string>
/*****
  Subs sorted favourites first and both sets are sorted
*****/
function sortSubs({favouriteSubreddits, subreddits}: {favouriteSubreddits?: Subreddits, subreddits?: Subreddits}):Subreddits { // eslint-disable-line complexity
  if(emptySubList(favouriteSubreddits) && emptySubList(subreddits)) return []
  if(emptySubList(favouriteSubreddits)) return subreddits.sort()
  if(emptySubList(subreddits)) return favouriteSubreddits.sort()
  const sortedNonfavSubs = subreddits.filter(sub => !favouriteSubreddits?.includes(sub)).sort()
  const sortedFavSubs = favouriteSubreddits.sort()
  return [...sortedFavSubs, ...sortedNonfavSubs ]
}

function emptySubList(subs){
  if(!subs) return true
  if(!subs.length) return true
  return false
}

export {
  loadHomePage
}