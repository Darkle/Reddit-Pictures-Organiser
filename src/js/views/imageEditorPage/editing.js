import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'

/* eslint-disable functional/immutable-data, functional/no-this-expression */
const ninetyDegrees = 90
const three60Degrees = 360

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

/*****
  On the first render of image edit page, newEdits will be null, so we use what's stored.
  Otherwise we use the newEdits. We pass on the stored edits to editing.js too on first run 
  with edits.updateRotateVal etc.
  Image viewer page also uses convertImageEditsToCssString().
*****/
function convertImageEditsToCssString(storedEdits, newEdits){ // eslint-disable-line complexity
  if(!newEdits && !storedEdits) return ''
  const rotateVal = (newEdits?.rotateVal ?? 0) || (storedEdits?.rotateVal ?? 0) 
  edits.updateRotateVal(rotateVal)
  // TODO: crop and shrink - prolly check if empty obj for those??
  const rotateAngle = imageRightSideUp(rotateVal) ? '' : `transform: rotate(${rotateVal}deg);` 
  // return `${rAngle}${cropImg}${sImage}`
  return `${rotateAngle}`
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
  convertImageEditsToCssString,
}