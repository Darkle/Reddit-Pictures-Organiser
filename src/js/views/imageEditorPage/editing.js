import {updateImageEditPage} from './imageEditorPage.js'

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
    const rotateAngle = this.rotateAngle ? `transform: rotate(${this.rotateAngle})` : ''
    const cropImg = this.cropImage ? `transform: thingFOOOO(${this.cropImage})` : ''
    const shrinkImage = this.shrinkImage ? `transform: thingFOOOO(${this.shrinkImage})` : ''
    return `${rotateAngle};${cropImg};${shrinkImage};`
  }
}
/* eslint-enable */

function cropImage(subreddit, timefilter, imageId){
  const cropValues = null
  edits.updateCrop(cropValues)
  updateImageEditPage({subreddit, timefilter, imageId, unsavedImgEdits: edits.toString()})
}

function rotateLeft(subreddit, timefilter, imageId){
  edits.updateRotate(edits.rotateAngle - ninetyDegrees)
  updateImageEditPage({subreddit, timefilter, imageId, unsavedImgEdits: edits.toString()})
}

function rotateRight(subreddit, timefilter, imageId){
  edits.updateRotate(edits.rotateAngle + ninetyDegrees)
  updateImageEditPage({subreddit, timefilter, imageId, unsavedImgEdits: edits.toString()})
}

function shrink(subreddit, timefilter, imageId){
  const shrinkAmount = null
  edits.updateShrink(shrinkAmount)
  updateImageEditPage({subreddit, timefilter, imageId, unsavedImgEdits: edits.toString()})
}

function saveEditedImageToFolder(subreddit, timefilter, imageId){
  const showFolders = true
  updateImageEditPage({subreddit, timefilter, imageId, unsavedImgEdits: edits.toString(), showFolders})
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
  saveEditedImageToFolder,
  cancelEditsOnNavAway,
  shrink,
}