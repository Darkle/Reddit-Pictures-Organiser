import { store } from '../../store/store.js'
import { router } from '../../router.js'

let edits = '' // eslint-disable-line functional/no-let

function cropImage(){
  // edits +=
}

function rotateLeft(){
  // edits +=
}

function rotateRight(){
  // edits +=
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
}

export{
  cropImage,
  rotateLeft,
  rotateRight,
  saveEdits,
  cancelEditsOnNavAway,
}