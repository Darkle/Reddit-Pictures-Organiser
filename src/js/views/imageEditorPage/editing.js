import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'
import { safeGetImageSrc, $ } from '../../utils.js'
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
  updateCropVal(width, height, positionX, positionY){
    this.cropImageVal = {
      width,
      height,
      positionX,
      positionY,
    }
  },
  updateResizeImageVal(percentage){
    this.resizeImageVal = percentage
  },
  clear(){
    this.rotateVal = 0
    this.cropImageVal = {}
    this.resizeImageVal = 0
  }
}
/* eslint-enable */

function cropImage(state){
  const imageElem = $('.imageToBeEdited')
  const renderedImageHeight = imageElem.offsetHeight
  const renderedImageWidth = imageElem.offsetWidth

  import('../../web_modules/js-cropper.js')
    .then(({default: Cropper}) => {
      imageElem.classList.toggle('hide')

      const cropper = new Cropper({
        height: renderedImageHeight,
        width: renderedImageWidth,
        onChange(crop) {
          console.log('crop changed')
          console.log(crop.getData())
          // edits.updateCropVal(cropValues)
        }
      })
      cropper.render('.imageContainer')
      cropper.loadImage(safeGetImageSrc(state.image)).catch(logger.error)
    })
    .catch(logger.error)
}

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

  edits.updateRotateVal(rotateVal)
  edits.updateResizeImageVal(resizeVal)
  
  const rotateCss = imageRightSideUp(rotateVal) ? '' : `transform: rotate(${rotateVal}deg);` 
  const resizeCss = resizeVal === oneHundredPercent ? '' : `height: ${resizeVal}%;` 
  
  return `${rotateCss}${resizeCss}`
}

function imageRightSideUp(rotateVal){
  return (rotateVal === 0 || (rotateVal % three60Degrees) === 0)
}

export{
  cropImage,
  rotateLeft,
  rotateRight,
  saveEdits,
  cancelEditsOnNavAway,
  shrink,
  enlarge,
  convertImageEditsToCssString,
}