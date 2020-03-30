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
  edits.updateCrop(cropValues)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function rotateLeft(state){
  edits.updateRotate(edits.rotateVal - ninetyDegrees)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function rotateRight(state){
  edits.updateRotate(edits.rotateVal + ninetyDegrees)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function shrink(state){
  const shrinkAmount = null
  edits.updateShrink(shrinkAmount)
  const {rotateVal, cropImageVal, shrinkImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, shrinkImageVal}})
}

function saveEdits({subreddit, timefilter, imageId, folderpage}){
  const navigationUrl = !folderpage ? `/sub/${subreddit}/${timefilter}/imageviewer/${imageId}` 
    : `/folders/${folderpage}/imageviewer/${imageId}`
  const {rotateVal, cropImageVal, shrinkImageVal} = edits

  store.addEditsToImage(imageId, editsToString({rotateVal, cropImageVal, shrinkImageVal}), folderpage)
  edits.clear()
  router.navigate(navigationUrl)  
}

function cancelEditsOnNavAway(){
  edits.clear()
}

function editsToString({rotateVal, cropImageVal, shrinkImageVal}){

  console.log('called editsToString')
  const rAngle = rotateVal ? `transform: rotate(${rotateVal}deg);` : ''
  const cropImg = isEmptyObject(cropImageVal) ? `transform: thingFOOOO(${cropImageVal});` : ''
  const sImage = isEmptyObject(shrinkImageVal) ? `transform: thingFOOOO(${shrinkImageVal});` : ''
  return `${rAngle}${cropImg}${sImage}`
}

function isEmptyObject(obj){
  return !Object.entries(obj).length
}

export{
  cropImage,
  rotateLeft,
  rotateRight,
  saveEdits,
  cancelEditsOnNavAway,
  shrink,
  editsToString,
}