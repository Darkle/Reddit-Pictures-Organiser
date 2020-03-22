import { h } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

const html = htm.bind(h)

function Toast(subreddit) {
  return html`
    <div class="toast subFavouritedToast">${subreddit} Added To Favourites</div>
    <div class="toast subUnFavouritedToast">${subreddit} Removed From Favourites</div>   
  `
}

export{
  Toast
}