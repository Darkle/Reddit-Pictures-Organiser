import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'

/* eslint-disable functional/immutable-data, functional/no-this-expression */
const ninetyDegrees = 90
const edits = {
  rotateAngle: 0,
  cropImage: false,
  shrinkImage: false,
  updateRotate(angle){
    this.rotateAngle = angle
  },
  updateCrop(cropValues){
    this.cropImage = cropValues
  },
  updateShrink(shrinkAmount){
    this.shrinkImage = shrinkAmount
  },
  toString(){
    const rotateAngle = this.rotateAngle ? `transform: rotate(${this.rotateAngle}deg);` : ''
    const cropImg = this.cropImage ? `transform: thingFOOOO(${this.cropImage});` : ''
    const shrinkImage = this.shrinkImage ? `transform: thingFOOOO(${this.shrinkImage});` : ''
    return `${rotateAngle}${cropImg}${shrinkImage}`
  }
}
/* eslint-enable */

function cropImage({subreddit, timefilter, imageId}){
  const cropValues = null
  edits.updateCrop(cropValues)
  updateImageEditPage({subreddit, timefilter, imageId, imageEdits: edits.toString()})
}

function rotateLeft({subreddit, timefilter, imageId}){
  edits.updateRotate(edits.rotateAngle - ninetyDegrees)
  updateImageEditPage({subreddit, timefilter, imageId, imageEdits: edits.toString()})
}

function rotateRight({subreddit, timefilter, imageId}){
  edits.updateRotate(edits.rotateAngle + ninetyDegrees)
  updateImageEditPage({subreddit, timefilter, imageId, imageEdits: edits.toString()})
}

function shrink({subreddit, timefilter, imageId}){
  const shrinkAmount = null
  edits.updateShrink(shrinkAmount)
  updateImageEditPage({subreddit, timefilter, imageId, imageEdits: edits.toString()})
}

function saveEdits({subreddit, timefilter, imageId, folder}){
  const navigationUrl = !folder ? `/sub/${subreddit}/${timefilter}/imageviewer/${imageId}` 
    : `/folders/${folder}/imageviewer/${imageId}`

    if(folder){
      store.addEditsToImageInFolder(folder, imageId, edits.toString())
    }
    else{
      store.addEditsToStoredFetchedSubredditImage(imageId, edits.toString())
    }
    router.navigate(navigationUrl)  
}

function cancelEditsOnNavAway(){
  edits.updateRotate(0)
  edits.updateCrop(false)
  edits.updateShrink(false)
}

export{
  cropImage,
  rotateLeft,
  rotateRight,
  saveEdits,
  cancelEditsOnNavAway,
  shrink,
}