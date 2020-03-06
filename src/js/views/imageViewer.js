//@flow
import {appState} from '../appState.js'
import { setPageTitle } from '../utils.js'

function loadImageViewer({params:{subreddit}}) {
  setPageTitle(`RPO - ${subreddit} Images`)
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so load the subreddit page
  *****/
  // if(!appState.fetchedSubredditImages.length) {
  //   page(`/sub/${subreddit}`)
  // }
  // else{
  //   imageViewer()
  // }
}

function imageViewer(params) {
  
}

export {
  loadImageViewer
}