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
  },
  clear(){
    this.rotateAngle = 0
    this.cropImage = false
    this.shrinkImage = false
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

function saveEdits({subreddit, timefilter, imageId, folderpage}){
  const navigationUrl = !folderpage ? `/sub/${subreddit}/${timefilter}/imageviewer/${imageId}` 
    : `/folders/${folderpage}/imageviewer/${imageId}`

    if(folderpage){
      store.addEditsToImageInFolder(folderpage, imageId, edits.toString())
    }
    else{
      store.addEditsToStoredFetchedSubredditImage(imageId, edits.toString())
    }

    edits.clear()

    router.navigate(navigationUrl)  
}

function cancelEditsOnNavAway(){
  edits.clear()
}

export{
  cropImage,
  rotateLeft,
  rotateRight,
  saveEdits,
  cancelEditsOnNavAway,
  shrink,
}