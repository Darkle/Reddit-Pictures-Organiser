import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'
import { isEmptyObject } from '../../utils.js'
import { logger } from '../../logger.js'

/* eslint-disable functional/immutable-data, functional/no-this-expression */
const ninetyDegrees = 90
const three60Degrees = 360
const tenPercent = 10
const oneHundredPercent = 100

const edits = {
  rotateVal: 0,
  cropImageVal: {},
  resizeImageVal: oneHundredPercent,
  updateRotateVal(angle){
    this.rotateVal = angle
  },
  updateCropVal(cropHandlLines, imgBoundingRect){ // eslint-disable-line max-statements, max-lines-per-function
    const leftPixelDiff = cropHandlLines.handleLineLeft.getBoundingClientRect().left - imgBoundingRect.left  
    const topPixelDiff = cropHandlLines.handleLineTop.getBoundingClientRect().top - imgBoundingRect.top 
    const rightPixelDiff = imgBoundingRect.right - cropHandlLines.handleLineRight.getBoundingClientRect().right
    const bottomPixelDiff = imgBoundingRect.bottom - cropHandlLines.handleLineBottom.getBoundingClientRect().bottom
    
    logger.debug(imgBoundingRect)
    logger.debug(leftPixelDiff, topPixelDiff, rightPixelDiff, bottomPixelDiff)
    
    const round = num => num < 0 ? 0 : Math.round(num)

    const percentageCropLeft = round((leftPixelDiff / imgBoundingRect.width) * oneHundredPercent)
    const percentageCropTop = round((topPixelDiff / imgBoundingRect.height) * oneHundredPercent)
    const percentageCropRight = round((rightPixelDiff / imgBoundingRect.width) * oneHundredPercent)
    const percentageCropBottom = round((bottomPixelDiff / imgBoundingRect.height) * oneHundredPercent)

    logger.debug(percentageCropLeft, percentageCropTop, percentageCropRight, percentageCropBottom)
    
    this.cropImageVal = {
      percentageCropLeft,
      percentageCropTop,
      percentageCropRight,
      percentageCropBottom,
    }
  },
  updateResizeImageVal(percentage){
    this.resizeImageVal = percentage
  },
  clear(){
    this.rotateVal = 0
    this.cropImageVal = {}
    this.resizeImageVal = oneHundredPercent
  }
}
/* eslint-enable */

function rotateLeft(state){
  edits.updateRotateVal(edits.rotateVal - ninetyDegrees)
  const {rotateVal, cropImageVal, resizeImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, resizeImageVal}})
}

function rotateRight(state){
  edits.updateRotateVal(edits.rotateVal + ninetyDegrees)
  const {rotateVal, cropImageVal, resizeImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, resizeImageVal}})
}

function shrink(state){
  edits.updateResizeImageVal(edits.resizeImageVal - tenPercent)
  const {rotateVal, cropImageVal, resizeImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, resizeImageVal}})
}

function enlarge(state){
  edits.updateResizeImageVal(edits.resizeImageVal + tenPercent)
  const {rotateVal, cropImageVal, resizeImageVal} = edits
  updateImageEditPage({...state, newEdits: {rotateVal, cropImageVal, resizeImageVal}})
}

function saveEdits({subreddit, timefilter, imageId, folderpage}){
  const navigationUrl = !folderpage ? `/sub/${subreddit}/${timefilter}/imageviewer/${imageId}` 
    : `/folders/${folderpage}/imageviewer/${imageId}`
  const {rotateVal, cropImageVal, resizeImageVal} = edits

  store.addEditsToImage(imageId, {rotateVal, cropImageVal, resizeImageVal}, folderpage)
  edits.clear()
  router.navigate(navigationUrl)  
}

function cancelEditsOnNavAway(){
  edits.clear()
}

/*****
  On the first render of image edit page, newEdits will be null, so we use what's stored, 
  on subsequent renders we use the newEdits. 
  Because we call edits.updateFoo() here, we pass any storedEdits to the 'edits' object here so they have
  the storedEdits as a starting point.
  Image viewer page also uses convertImageEditsToCssString().
*****/
function convertImageEditsToCssString(storedEdits, newEdits){ // eslint-disable-line complexity, max-statements
  if(!newEdits && !storedEdits) return ''
  const rotateVal = newEdits?.rotateVal ? newEdits.rotateVal : (storedEdits?.rotateVal ?? 0)
  const resizeVal = newEdits?.resizeImageVal ? newEdits.resizeImageVal : (storedEdits?.resizeImageVal ?? oneHundredPercent)
  const cropVals = !isEmptyObject(newEdits?.cropImageVal ?? {}) ? newEdits.cropImageVal : (storedEdits?.cropImageVal ?? {})

  edits.updateRotateVal(rotateVal)
  edits.updateResizeImageVal(resizeVal)
  
  const clipCss = isEmptyObject(cropVals) ? '' : `clip-path: inset(${cropVals.percentageCropTop}% ${cropVals.percentageCropRight}% ${cropVals.percentageCropBottom}% ${cropVals.percentageCropLeft}%) ;`
  const rotateCss = imageRightSideUp(rotateVal) ? '' : `transform: rotate(${rotateVal}deg);` 
  const resizeCss = resizeVal === oneHundredPercent ? '' : `height: ${resizeVal}%;` 

  return `${clipCss}${rotateCss}${resizeCss}`
}

function imageRightSideUp(rotateVal){
  return (rotateVal === 0 || (rotateVal % three60Degrees) === 0)
}

export{
  rotateLeft,
  rotateRight,
  saveEdits,
  cancelEditsOnNavAway,
  shrink,
  enlarge,
  convertImageEditsToCssString,
  edits,
}