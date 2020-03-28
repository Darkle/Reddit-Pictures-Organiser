import { h } from '../../web_modules/superfine.js'

function Toast(subreddit) {
  return [h('div', {}, [
    h('div', {class: 'toast subFavouritedToast'}, `${subreddit} Added To Favourites`),
    h('div', {class: 'toast subFavouritedToast'}, `${subreddit} Removed From Favourites`),
  ])]
}

export{
  Toast
}