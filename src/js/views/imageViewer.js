import {store} from '../store/store.js'
import { setPageTitle } from '../utils.js'

function loadImageViewer({params:{subreddit}}) {
  setPageTitle(`RPO - ${subreddit} Images`)
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so load the subreddit page
  *****/
  // if(!store.fetchedSubredditImages.length) {
  //   page(`/sub/${subreddit}`)
  // }
  // else{
  //   imageViewer()
  // }
}

function ImageViewer(params) {
  
}

export {
  loadImageViewer
}