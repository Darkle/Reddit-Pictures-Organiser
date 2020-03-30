import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'

/* eslint-disable functional/immutable-data, functional/no-this-expression */
const ninetyDegrees = 90

const edits = {
  rotateVal: 0,
  cropImageVal: {},
  shrinkImageVal: {},
  updateRotateVal(angle){
    this.rotateVal = angle
  },
  updateCropVal(width, height, positionX, positionY){
    this.cropImageVal = {
      width,
      height,
      positionX,
      positionY,
    }
  },
  updateShrinkVal(shrinkAmount){
    this.shrinkImageVal = shrinkAmount
  },
  clear(){
    this.rotateVal = 0
    this.cropImageVal = {}
    this.shrinkImageVal = {}
  }
}
/* eslint-enable */

function cropImage(state){
  const cropValues = null
  edits.updateCropVal(cropValues)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function rotateLeft(state){
  edits.updateRotateVal(edits.rotateVal - ninetyDegrees)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function rotateRight(state){
  edits.updateRotateVal(edits.rotateVal + ninetyDegrees)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function shrink(state){
  const shrinkAmount = null
  edits.updateShrinkVal(shrinkAmount)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function saveEdits({subreddit, timefilter, imageId, folderpage}){
  const navigationUrl = !folderpage ? `/sub/${subreddit}/${timefilter}/imageviewer/${imageId}` 
    : `/folders/${folderpage}/imageviewer/${imageId}`
  const {rotateVal, cropImageVal, shrinkImageVal} = edits

  store.addEditsToImage(imageId, {rotateVal, cropImageVal, shrinkImageVal}, folderpage)
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
  edits,
}