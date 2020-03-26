import { store } from '../../store/store.js'
import { router } from '../../router.js'

import {updateImageEditPage} from './imageEditorPage.js'

let edits = '' // eslint-disable-line functional/no-let
let rotateAngle = 0 // eslint-disable-line functional/no-let

function cropImage(subreddit, timefilter, imageId){
  // edits +=
  updateImageEditPage(subreddit, timefilter, imageId)
}

function rotateLeft(subreddit, timefilter, imageId){
  // edits +=
  updateImageEditPage(subreddit, timefilter, imageId)
}

function rotateRight(subreddit, timefilter, imageId){
  // edits +=
  updateImageEditPage(subreddit, timefilter, imageId)
}

function saveEdits(subreddit, timefilter, imageId){
  store.addEditsToImage(getCurrentImage(imageId), edits)
  edits = ''
  router.navigate(`/sub/${subreddit}/${timefilter}/imageviewer/${imageId}`)
}

function getCurrentImage(imageId) {
  return store.fetchedSubredditImages.find(({id}) => imageId === id)
}

function cancelEditsOnNavAway(){
  edits = ''
  rotateAngle = 0
}

export{
  cropImage,
  rotateLeft,
  rotateRight,
  saveEdits,
  cancelEditsOnNavAway,
}