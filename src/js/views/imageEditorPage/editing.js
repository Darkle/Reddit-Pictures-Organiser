import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'
import { initCropper } from './cropper.js'

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
  initCropper()
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
  const clipCss = ';'
  /*****
    Clip should be after rotate. Then resize.
  *****/
  return `${rotateCss}${clipCss}${resizeCss}`
}

function calculateCropCssClipPath(){
  //store the image container offsetHeight offsetWidth only once per image viewer and image editor render - maybe add 
  // it to the state when call each render so can pass it on - i dont think i need to account for rotating screen do i - cause that wouldnt happen much when editing - oh but I guess it would for if they open viewer then rotate, then click on edit
  //save in onrething handler evewnt https://davidwalsh.name/orientation-change so onchange, check if image viewer or image editor
  // elements in page and if so, update the image container offsetHeight & offsetWidth variables
  // I think I will have to do this in the nav for the editor - pass it in as state, and
  // for the editor it doesnt really matter
  // No i think we just need to take the dumb approach otherwise it gets too complex - if its slow, we could perhaps use requestanimationframe or the like
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