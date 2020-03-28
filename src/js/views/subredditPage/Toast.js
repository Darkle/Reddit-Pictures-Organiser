import {html} from '../../web_modules/lit-html.js'

function Toast(subreddit) {
  return html`
    <div class="toast subFavouritedToast">${subreddit} Added To Favourites</div>
    <div class="toast subUnFavouritedToast">${subreddit} Removed From Favourites</div>   
  `
}

export{
  Toast
}