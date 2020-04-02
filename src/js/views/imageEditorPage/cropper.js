import { $, $$ } from '../../utils.js'
import { logger } from '../../logger.js'
import { edits } from './editing.js'

const halfSizeOfHandles = 10
const dragPixelBuffer = 50

function initCropper(){ // eslint-disable-line max-lines-per-function, max-statements
  const image = $('.imageToBeEdited')
  const handleLineTop = $('.handleLine[data-handle-line="top"]')
  const handleLineRight = $('.handleLine[data-handle-line="right"]')
  const handleLineBottom = $('.handleLine[data-handle-line="bottom"]')
  const handleLineLeft = $('.handleLine[data-handle-line="left"]')
  const handleLines = {handleLineTop, handleLineRight, handleLineBottom, handleLineLeft}

  // make image slightly smaller to make it easier to grab the crop handles on the edge
  image.style.height = `80%` // eslint-disable-line functional/immutable-data
  
  const imageElemBoundedRect = image.getBoundingClientRect()
  const handleLeftBoundary = imageElemBoundedRect.left - halfSizeOfHandles
  const handleTopBoundary = imageElemBoundedRect.top - halfSizeOfHandles
  const handleRightBoundary = imageElemBoundedRect.right - halfSizeOfHandles
  const handleBottomBoundary = imageElemBoundedRect.bottom - halfSizeOfHandles
  const boundaries = {handleLeftBoundary, handleTopBoundary, handleRightBoundary, handleBottomBoundary}

  logger.debug(imageElemBoundedRect)

  $$('.handle, .handleLine').forEach(handle => handle.classList.toggle('show'))

  import('../../web_modules/draggabilly.js').then(({default: Draggabilly}) => {
      setUpDragEventListeners(Draggabilly, handleLines, imageElemBoundedRect, boundaries)
    }).catch(logger.error)
}
/* eslint-disable complexity, max-statements, max-lines-per-function*/
function setUpDragEventListeners(Draggabilly, handleLines, imageElemBoundedRect, boundaries){
  const draggieTopLeft = new Draggabilly($('.handle[data-handle="topLeft"]'))
  const draggieTopRight = new Draggabilly($('.handle[data-handle="topRight"]'))
  const draggieBottomRight = new Draggabilly($('.handle[data-handle="bottomRight"]'))
  const draggieBottomLeft = new Draggabilly($('.handle[data-handle="bottomLeft"]'))
  const draggies = {draggieTopLeft, draggieTopRight, draggieBottomRight, draggieBottomLeft}

  updateHandleLinesPosition(draggies, handleLines, imageElemBoundedRect)
  
  draggieTopLeft.on('dragMove', function() {
    // Move topRight on the y-axis too
    draggieTopRight.setPosition(draggieTopRight.position.x, draggieTopLeft.position.y)
    // Move bottomLeft on the x-axis too
    draggieBottomLeft.setPosition(draggieTopLeft.position.x, draggieBottomLeft.position.y)

    updateHandleLinesPosition(draggies, handleLines)
    edits.updateCropVal(handleLines, imageElemBoundedRect)
  })
  draggieTopLeft.on('dragEnd', function(event) {
    /*****
      event.y and event.x dont take into account the size of the dragging element and we want the middle, 
      so referencing the element position instead.
    *****/
    let {x} = draggieTopLeft.position // eslint-disable-line functional/no-let
    // Dont go past the leftmost part of the image when going left
    if(event.x < boundaries.handleLeftBoundary) x = boundaries.handleLeftBoundary
    // Dont go past the topRight handle when going right
    if(event.x >= draggieTopRight.position.x) x = draggieTopRight.position.x - dragPixelBuffer

    let {y} = draggieTopLeft.position // eslint-disable-line functional/no-let
    // Dont go past the topmost part of the image when going up
    if(event.y < boundaries.handleTopBoundary) y = boundaries.handleTopBoundary
    // Dont go past the bottommost handle when going down
    if(event.y >= draggieBottomRight.position.y) y = draggieBottomRight.position.y - dragPixelBuffer

    draggieTopLeft.setPosition(x, y)
    // Move topRight on the y-axis too
    draggieTopRight.setPosition(draggieTopRight.position.x, y)
    // Move bottomLeft on the x-axis too
    draggieBottomLeft.setPosition(x, draggieBottomLeft.position.y)
   
   // We need these at the end too in case they dragged out of bounds the line will be out of bounds and need to reset.
   updateHandleLinesPosition(draggies, handleLines)
   edits.updateCropVal(handleLines, imageElemBoundedRect)
  })
  draggieTopLeft.setPosition(boundaries.handleLeftBoundary, boundaries.handleTopBoundary)

  draggieTopRight.on('dragMove', function() {
    // Move topLeft on the y-axis too
    draggieTopLeft.setPosition(draggieTopLeft.position.x, draggieTopRight.position.y)
    // Move bottomRight on the x-axis too
    draggieBottomRight.setPosition(draggieTopRight.position.x, draggieBottomRight.position.y)

    updateHandleLinesPosition(draggies, handleLines)
    edits.updateCropVal(handleLines, imageElemBoundedRect)
  })
  draggieTopRight.on('dragEnd', function(event) {
    /*****
      event.y and event.x dont take into account the size of the dragging element and we want the middle, 
      so referencing the element position instead.
    *****/
   let {x} = draggieTopRight.position // eslint-disable-line functional/no-let
   // Dont go past the rightmost part of the image when going right
   if(event.x > boundaries.handleRightBoundary) x = boundaries.handleRightBoundary
   // Dont go past the topLeft handle when going left
   if(event.x <= draggieTopRight.position.x) x = draggieTopLeft.position.x + dragPixelBuffer

   let {y} = draggieTopRight.position // eslint-disable-line functional/no-let
   // Dont go past the topmost part of the image when going up
   if(event.y < boundaries.handleTopBoundary) y = boundaries.handleTopBoundary
   // Dont go past the bottommost handle when going down
   if(event.y >= draggieBottomRight.position.y) y = draggieBottomRight.position.y - dragPixelBuffer

   draggieTopRight.setPosition(x, y)
   // Move topLeft on the y-axis too
   draggieTopLeft.setPosition(draggieTopLeft.position.x, y)
   // Move bottomRight on the x-axis too
   draggieBottomRight.setPosition(x, draggieBottomRight.position.y)
   
   // We need these at the end too in case they dragged out of bounds the line will be out of bounds and need to reset.
   updateHandleLinesPosition(draggies, handleLines)
   edits.updateCropVal(handleLines, imageElemBoundedRect)
  })      
  draggieTopRight.setPosition(boundaries.handleRightBoundary, boundaries.handleTopBoundary)

  draggieBottomRight.on('dragMove', function() {
    // Move bottomLeft on the y-axis too
    draggieBottomLeft.setPosition(draggieBottomLeft.position.x, draggieBottomRight.position.y)
    // Move topRight on the x-axis too
    draggieTopRight.setPosition(draggieBottomRight.position.x, draggieTopRight.position.y)

    updateHandleLinesPosition(draggies, handleLines)
    edits.updateCropVal(handleLines, imageElemBoundedRect)
  })      
  draggieBottomRight.on('dragEnd', function(event) {
    /*****
      event.y and event.x dont take into account the size of the dragging element and we want the middle, 
      so referencing the element position instead.
    *****/
   let {x} = draggieBottomRight.position // eslint-disable-line functional/no-let
   // Dont go past the rightmost part of the image when going right
   if(event.x > boundaries.handleRightBoundary) x = boundaries.handleRightBoundary
   // Dont go past the bottomLeft handle when going left
   if(event.x <= draggieBottomLeft.position.x) x = draggieBottomLeft.position.x + dragPixelBuffer

   let {y} = draggieBottomRight.position // eslint-disable-line functional/no-let
   // Dont go past the bottommost part of the image when going down
   if(event.y > boundaries.handleBottomBoundary) y = boundaries.handleBottomBoundary
   // Dont go past the topRight handle when going up
   if(event.y <= draggieTopRight.position.y) y = draggieTopRight.position.y + dragPixelBuffer

   draggieBottomRight.setPosition(x, y)
   // Move bottomLeft on the y-axis too
   draggieBottomLeft.setPosition(draggieBottomLeft.position.x, y)
   // Move topRight on the x-axis too
   draggieTopRight.setPosition(x, draggieTopRight.position.y)

   updateHandleLinesPosition(draggies, handleLines)
   edits.updateCropVal(handleLines, imageElemBoundedRect)
  })
  draggieBottomRight.setPosition(boundaries.handleRightBoundary, boundaries.handleBottomBoundary)

  draggieBottomLeft.on('dragMove', function() {
    // Move bottomRight on the y-axis too
    draggieBottomRight.setPosition(draggieBottomRight.position.x, draggieBottomLeft.position.y)
    // Move topLeft on the x-axis too
    draggieTopLeft.setPosition(draggieBottomLeft.position.x, draggieTopLeft.position.y)

    updateHandleLinesPosition(draggies, handleLines)
    edits.updateCropVal(handleLines, imageElemBoundedRect)
  })      
  draggieBottomLeft.on('dragEnd', function(event) {
    /*****
      event.y and event.x dont take into account the size of the dragging element and we want the middle, 
      so referencing the element position instead.
    *****/
   let {x} = draggieBottomLeft.position // eslint-disable-line functional/no-let
   // Dont go past the leftmost part of the image when going left
   if(event.x < boundaries.handleLeftBoundary) x = boundaries.handleLeftBoundary
   // Dont go past the bottomRight handle when going right
   if(event.x >= draggieBottomRight.position.x) x = draggieBottomRight.position.x - dragPixelBuffer

   let {y} = draggieBottomLeft.position // eslint-disable-line functional/no-let
   // Dont go past the bottommost part of the image when going down
   if(event.y > boundaries.handleBottomBoundary) y = boundaries.handleBottomBoundary
   // Dont go past the topLeft handle when going up
   if(event.y <= draggieTopLeft.position.y) y = draggieTopLeft.position.y + dragPixelBuffer

   draggieBottomLeft.setPosition(x, y)
   // Move bottomRight on the y-axis too
   draggieBottomRight.setPosition(draggieBottomRight.position.x, y)
   // Move topLeft on the x-axis too
   draggieTopLeft.setPosition(x, draggieTopLeft.position.y)

   updateHandleLinesPosition(draggies, handleLines)
   edits.updateCropVal(handleLines, imageElemBoundedRect)
  })
  draggieBottomLeft.setPosition(boundaries.handleLeftBoundary, boundaries.handleBottomBoundary)
  /* eslint-enable complexity, max-statements, max-lines-per-function*/
}

function updateHandleLinesPosition({draggieTopLeft, draggieTopRight, draggieBottomRight, draggieBottomLeft}, handleLines, imageElemBoundedRect){ // eslint-disable-line max-statements, max-lines-per-function
  /* eslint-disable functional/immutable-data*/
  // Initial setup
  if(imageElemBoundedRect){
    handleLines.handleLineLeft.style.left = `${imageElemBoundedRect.left}px` 
    handleLines.handleLineLeft.style.top = `${imageElemBoundedRect.top}px` 
    handleLines.handleLineLeft.style.height = `${imageElemBoundedRect.height}px` 

    handleLines.handleLineTop.style.left = `${imageElemBoundedRect.left}px` 
    handleLines.handleLineTop.style.top = `${imageElemBoundedRect.top}px` 
    handleLines.handleLineTop.style.width = `${imageElemBoundedRect.width}px` 

    handleLines.handleLineRight.style.left = `${imageElemBoundedRect.right}px` 
    handleLines.handleLineRight.style.top = `${imageElemBoundedRect.top}px` 
    handleLines.handleLineRight.style.height = `${imageElemBoundedRect.height}px`      

    handleLines.handleLineBottom.style.left = `${imageElemBoundedRect.left}px` 
    handleLines.handleLineBottom.style.top = `${imageElemBoundedRect.bottom}px` 
    handleLines.handleLineBottom.style.width = `${imageElemBoundedRect.width}px` 
    return
  }
  handleLines.handleLineTop.style.left = `${draggieTopLeft.position.x + halfSizeOfHandles}px` 
  handleLines.handleLineTop.style.top = `${draggieTopLeft.position.y + halfSizeOfHandles}px` 
  handleLines.handleLineTop.style.width = `${((draggieTopRight.position.x + halfSizeOfHandles) - (draggieTopLeft.position.x + halfSizeOfHandles))}px` 

  handleLines.handleLineRight.style.left = `${draggieTopRight.position.x + halfSizeOfHandles}px` 
  handleLines.handleLineRight.style.top = `${draggieTopRight.position.y + halfSizeOfHandles}px` 
  handleLines.handleLineRight.style.height = `${((draggieBottomRight.position.y + halfSizeOfHandles) - (draggieTopRight.position.y + halfSizeOfHandles))}px`      

  handleLines.handleLineBottom.style.left = `${draggieBottomLeft.position.x + halfSizeOfHandles}px` 
  handleLines.handleLineBottom.style.top = `${draggieBottomRight.position.y + halfSizeOfHandles}px` 
  handleLines.handleLineBottom.style.width = `${((draggieBottomRight.position.x + halfSizeOfHandles) - (draggieBottomLeft.position.x + halfSizeOfHandles))}px` 

  handleLines.handleLineLeft.style.left = `${draggieTopLeft.position.x + halfSizeOfHandles}px` 
  handleLines.handleLineLeft.style.top = `${draggieTopLeft.position.y + halfSizeOfHandles}px` 
  handleLines.handleLineLeft.style.height = `${((draggieBottomLeft.position.y + halfSizeOfHandles) - (draggieTopLeft.position.y + halfSizeOfHandles))}px` 
}
/* eslint-enable functional/immutable-data*/

export {
  initCropper
}