import{html}from '../../web_modules/lit-html.js'
function Toast(state){return html`
    <div class="toast subFavouritedToast">${state.subreddit} Added To Favourites</div>
    <div class="toast subUnFavouritedToast">${state.subreddit} Removed From Favourites</div>   
  `}
export{Toast}