import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'
import { isEmptyObject, isNegativeNumber } from '../../utils.js'

/* eslint-disable functional/immutable-data, functional/no-this-expression */
const ninetyDegrees = 90
// const minusNinetyDegrees = 90
// const twoSeventyDegrees = 270

const edits = {
  rotateVal: 0,
  cropImageVal: {},
  shrinkImageVal: {},
  updateRotateVal(angle){
    console.log('updateRotateVal')
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

// function rotateAngleShouldResetToZero(degree){ // eslint-disable-line complexity
//   if(edits.rotateVal === twoSeventyDegrees && degree === ninetyDegrees) return true
//   if(edits.rotateVal === ninetyDegrees && degree === minusNinetyDegrees) return true
//   return false
// }

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

function editsToString(storedEdits, laterEdits){ // eslint-disable-line complexity
  const rotateVal = (storedEdits?.rotateVal ?? 0) + (laterEdits?.rotateVal ?? 0)
  // We dont want to update the value here, we want to set it.
  edits.rotateVal = rotateVal // eslint-disable-line functional/immutable-data
  // TODO: crop and shrink - prolly check if empty obj for those??
  const rotateAngle = rotateVal > 0 ? `transform: rotate(${rotateVal}deg);` : ''
  // return `${rAngle}${cropImg}${sImage}`
  return `${rotateAngle}`
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