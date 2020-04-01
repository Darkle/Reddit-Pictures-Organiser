import {updateImageEditPage} from './imageEditorPage.js'
import { store } from '../../store/store.js'
import { router } from '../../router.js'
import { safeGetImageSrc, $, $$ } from '../../utils.js'
import { logger } from '../../logger.js'

/* eslint-disable functional/immutable-data, functional/no-this-expression */
const ninetyDegrees = 90
const three60Degrees = 360
const tenPercent = 10
const oneHundredPercent = 100
const halfSizeOfHandles = 10

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

function cropImage(state){ // eslint-disable-line max-lines-per-function
  const imageElemBoundedRect = $('.imageToBeEdited').getBoundingClientRect()
  const hadleLeftBoundary = imageElemBoundedRect.left - halfSizeOfHandles
  const handleTopBoundary = imageElemBoundedRect.top - halfSizeOfHandles
  const handleRightBoundary = imageElemBoundedRect.right - halfSizeOfHandles
  const handleBottomBoundary = imageElemBoundedRect.bottom - halfSizeOfHandles
  logger.debug(imageElemBoundedRect)

  import('../../web_modules/draggabilly.js')
    .then(({default: Draggabilly}) => { // eslint-disable-line max-lines-per-function, max-statements
      $$('.handle').forEach(handle => handle.classList.toggle('show'))

      // updateHandleElemPosition(handleTopLeft, imageElemBoundedRect.left, imageElemBoundedRect.top)
//TODO: what if they overlap the handles? - make it so that the top ones cant go as low as the bottom ones and left cant go as far as right
      const draggieTopLeft = new Draggabilly($('.handle[data-handle="topLeft"]'))
      draggieTopLeft.on('dragMove', function() {
        draggieTopRight.setPosition(draggieTopRight.position.x, draggieTopLeft.position.y) // eslint-disable-line no-use-before-define
      })
      draggieTopLeft.on('dragEnd', function(event) {
        if(event.x < hadleLeftBoundary){
          draggieTopLeft.setPosition(hadleLeftBoundary, draggieTopLeft.position.y) // eslint-disable-line no-use-before-define
        }
        if(event.y > handleBottomBoundary){
          draggieTopLeft.setPosition(draggieTopLeft.position.x, handleBottomBoundary) // eslint-disable-line no-use-before-define
        }
        draggieTopRight.setPosition(draggieTopRight.position.x, draggieTopLeft.position.y) // eslint-disable-line no-use-before-define
      })
      draggieTopLeft.setPosition(hadleLeftBoundary, handleTopBoundary)

      const draggieTopRight = new Draggabilly($('.handle[data-handle="topRight"]'))
      draggieTopRight.on('dragMove', function(event) {
        console.log(event)
      })
      draggieTopRight.setPosition(handleRightBoundary, handleTopBoundary)

      const draggieBottomRight = new Draggabilly($('.handle[data-handle="bottomRight"]'))
      draggieBottomRight.on('dragMove', function(event) {
        console.log(event)
      })
      draggieBottomRight.setPosition(handleRightBoundary, handleBottomBoundary)

      const draggieBL = new Draggabilly($('.handle[data-handle="bottomLeft"]'))
      draggieBL.on('dragMove', function(event) {
        console.log(event)
      })
      draggieBL.setPosition(hadleLeftBoundary, handleBottomBoundary)

    }).catch(logger.error)

  // console.log('onResizeEnd', target.getBoundingClientRect())
  // const renderedImageHeight = imageElem.offsetHeight
  // const renderedImageWidth = imageElem.offsetWidth

  // $('.cropperOverlay').classList.toggle('show')
  // // @ts-ignore
  // const moveable = new Moveable(document.body, {
  //   target: $('.cropperOverlay'),
  //   container: $('.imageContainer'),
  //   draggable: true,
  //   // innerBounds: { left: imageElemBoundedRect.left, top: imageElemBoundedRect.top, width: imageElemBoundedRect.width, height: imageElemBoundedRect.height},
  //   origin: false,
  //   resizable: true,
  // })
  // moveable.on('resize', ({ target, width, height, delta }) => {
  //     if(delta[0]) target.style.width = `${width}px` // eslint-disable-line functional/immutable-data
  //     if(delta[1]) target.style.height = `${height}px` // eslint-disable-line functional/immutable-data
  // }).on('drag', ({target, left, top }) => {
  //   target.style.left = `${left}px` // eslint-disable-line functional/immutable-data
  //   target.style.top = `${top}px` // eslint-disable-line functional/immutable-data
  // }).on('scale', ({target, transform}) => {
  //   target.style.transform = transform // eslint-disable-line functional/immutable-data
  // })

}

// function updateHandleElemPosition(handle, leftPos, rightPos){
//   handle.style.left = `${leftPos - halfSizeOfHandles}px` // eslint-disable-line functional/immutable-data
//   handle.style.top = `${rightPos - halfSizeOfHandles}px` // eslint-disable-line functional/immutable-data  
// }

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