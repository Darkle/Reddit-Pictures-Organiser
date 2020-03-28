import { h } from '../../web_modules/superfine.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'
import {$, isFavSub, isFavMixPage} from '../../utils.js'
import { updatePage } from './subredditPage.js'

function Nav(timefilter, subreddit){
  const isCurrentFilter = (filter, routePath) => filter === routePath ? 'selectedSubTimeFilter' : ''
  // There will be different subreddits calling Nav if we're in favmix
  const sub = isFavMixPage() ? 'favmix' : subreddit
  const subFilterNavigate = event => router.navigate(`/sub/${sub}/${event.target.textContent.trim()}`)

  return h('nav', {class: 'navWrapper'}, [
    h('div', {class: 'home', onmouseup: () => router.navigate('/')}, 'Home'),
    !isFavMixPage() && h('div', {class: 'favStarContainer', onmouseup: () => toggleSubAsFavourite(subreddit, timefilter)}, FavStar(subreddit)),
    h('div', {class: `latest ${isCurrentFilter(timefilter, 'latest')}`, onmouseup:subFilterNavigate}, 'latest'),
    h('div', {class: `latest ${isCurrentFilter(timefilter, 'week')}`, onmouseup:subFilterNavigate}, 'week'),
    h('div', {class: `latest ${isCurrentFilter(timefilter, 'month')}`, onmouseup:subFilterNavigate}, 'month'),
    h('div', {class: `latest ${isCurrentFilter(timefilter, 'year')}`, onmouseup:subFilterNavigate}, 'year'),
    h('div', {class: `latest ${isCurrentFilter(timefilter, 'all')}`, onmouseup:subFilterNavigate}, 'all'),
  ])
}

function FavStar(subreddit){
  const starFillColor = isFavSub(subreddit) ? '#fff4e8' : '#737373'

  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 16, // eslint-disable-line no-magic-numbers
    height: 16, // eslint-disable-line no-magic-numbers
    viewBox: '0 0 14 16',
    fill: starFillColor,
    class: 'favouriteStar',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      d: 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'
    })
  ])

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