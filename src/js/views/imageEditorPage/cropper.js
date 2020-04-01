import { $, $$ } from '../../utils.js'
import { logger } from '../../logger.js'

const halfSizeOfHandles = 10
const dragPixelBuffer = 50

function initCropper(){ // eslint-disable-line max-lines-per-function
  const imageElemBoundedRect = $('.imageToBeEdited').getBoundingClientRect()
  const handleLeftBoundary = imageElemBoundedRect.left - halfSizeOfHandles
  const handleTopBoundary = imageElemBoundedRect.top - halfSizeOfHandles
  const handleRightBoundary = imageElemBoundedRect.right - halfSizeOfHandles
  const handleBottomBoundary = imageElemBoundedRect.bottom - halfSizeOfHandles
  logger.debug(imageElemBoundedRect)

  import('../../web_modules/draggabilly.js')
    .then(({default: Draggabilly}) => { // eslint-disable-line max-lines-per-function, max-statements
      $$('.handle').forEach(handle => handle.classList.toggle('show'))

      const draggieTopLeft = new Draggabilly($('.handle[data-handle="topLeft"]'))
      const draggieTopRight = new Draggabilly($('.handle[data-handle="topRight"]'))
      const draggieBottomRight = new Draggabilly($('.handle[data-handle="bottomRight"]'))
      const draggieBottomLeft = new Draggabilly($('.handle[data-handle="bottomLeft"]'))
      
      draggieTopLeft.on('dragMove', function() {
        // Move topRight on the y-axis too
        draggieTopRight.setPosition(draggieTopRight.position.x, draggieTopLeft.position.y)
        // Move bottomLeft on the x-axis too
        draggieBottomLeft.setPosition(draggieTopLeft.position.x, draggieBottomLeft.position.y)
      })
      draggieTopLeft.on('dragEnd', function(event) { // eslint-disable-line complexity, max-statements
        /*****
          event.y and event.x dont take into account the size of the dragging element and we want the middle, 
          so referencing the element position instead.
        *****/
        let {x} = draggieTopLeft.position // eslint-disable-line functional/no-let
        // Dont go past the leftmost part of the image when going left
        if(event.x < handleLeftBoundary) x = handleLeftBoundary
        // Dont go past the topRight handle when going right
        if(event.x >= draggieTopRight.position.x) x = draggieTopRight.position.x - dragPixelBuffer

        let {y} = draggieTopLeft.position // eslint-disable-line functional/no-let
        // Dont go past the topmost part of the image when going up
        if(event.y < handleTopBoundary) y = handleTopBoundary
        // Dont go past the bottommost handle when going down
        if(event.y >= draggieBottomRight.position.y) y = draggieBottomRight.position.y - dragPixelBuffer

        draggieTopLeft.setPosition(x, y)
        // Move topRight on the y-axis too
        draggieTopRight.setPosition(draggieTopRight.position.x, y)
        // Move bottomLeft on the x-axis too
        draggieBottomLeft.setPosition(x, draggieBottomLeft.position.y)
      })
      draggieTopLeft.setPosition(handleLeftBoundary, handleTopBoundary)

      draggieTopRight.on('dragMove', function() {
        // Move topLeft on the y-axis too
        draggieTopLeft.setPosition(draggieTopLeft.position.x, draggieTopRight.position.y)
        // Move bottomRight on the x-axis too
        draggieBottomRight.setPosition(draggieTopRight.position.x, draggieBottomRight.position.y)
      })
      draggieTopRight.on('dragEnd', function(event) { // eslint-disable-line complexity, max-statements
        /*****
          event.y and event.x dont take into account the size of the dragging element and we want the middle, 
          so referencing the element position instead.
        *****/
       let {x} = draggieTopRight.position // eslint-disable-line functional/no-let
       // Dont go past the rightmost part of the image when going right
       if(event.x > handleRightBoundary) x = handleRightBoundary
       // Dont go past the topLeft handle when going left
       if(event.x <= draggieTopRight.position.x) x = draggieTopLeft.position.x + dragPixelBuffer

       let {y} = draggieTopRight.position // eslint-disable-line functional/no-let
       // Dont go past the topmost part of the image when going up
       if(event.y < handleTopBoundary) y = handleTopBoundary
       // Dont go past the bottommost handle when going down
       if(event.y >= draggieBottomRight.position.y) y = draggieBottomRight.position.y - dragPixelBuffer

       draggieTopRight.setPosition(x, y)
       // Move topLeft on the y-axis too
       draggieTopLeft.setPosition(draggieTopLeft.position.x, y)
       // Move bottomRight on the x-axis too
       draggieBottomRight.setPosition(x, draggieBottomRight.position.y)
      })      
      draggieTopRight.setPosition(handleRightBoundary, handleTopBoundary)

      draggieBottomRight.on('dragMove', function() {
        // Move bottomLeft on the y-axis too
        draggieBottomLeft.setPosition(draggieBottomLeft.position.x, draggieBottomRight.position.y)
        // Move topRight on the x-axis too
        draggieTopRight.setPosition(draggieBottomRight.position.x, draggieTopRight.position.y)
      })      
      draggieBottomRight.on('dragEnd', function(event) { // eslint-disable-line complexity, max-statements
        /*****
          event.y and event.x dont take into account the size of the dragging element and we want the middle, 
          so referencing the element position instead.
        *****/
       let {x} = draggieBottomRight.position // eslint-disable-line functional/no-let
       // Dont go past the rightmost part of the image when going right
       if(event.x > handleRightBoundary) x = handleRightBoundary
       // Dont go past the bottomLeft handle when going left
       if(event.x <= draggieBottomLeft.position.x) x = draggieBottomLeft.position.x + dragPixelBuffer

       let {y} = draggieBottomRight.position // eslint-disable-line functional/no-let
       // Dont go past the bottommost part of the image when going down
       if(event.y > handleBottomBoundary) y = handleBottomBoundary
       // Dont go past the topRight handle when going up
       if(event.y <= draggieTopRight.position.y) y = draggieTopRight.position.y + dragPixelBuffer

       draggieBottomRight.setPosition(x, y)
       // Move bottomLeft on the y-axis too
       draggieBottomLeft.setPosition(draggieBottomLeft.position.x, y)
       // Move topRight on the x-axis too
       draggieTopRight.setPosition(x, draggieTopRight.position.y)
      })
      draggieBottomRight.setPosition(handleRightBoundary, handleBottomBoundary)

      draggieBottomLeft.on('dragMove', function() {
        // Move bottomRight on the y-axis too
        draggieBottomRight.setPosition(draggieBottomRight.position.x, draggieBottomLeft.position.y)
        // Move topLeft on the x-axis too
        draggieTopLeft.setPosition(draggieBottomLeft.position.x, draggieTopLeft.position.y)
      })      
      draggieBottomLeft.on('dragEnd', function(event) { // eslint-disable-line complexity, max-statements
        /*****
          event.y and event.x dont take into account the size of the dragging element and we want the middle, 
          so referencing the element position instead.
        *****/
       let {x} = draggieBottomLeft.position // eslint-disable-line functional/no-let
       // Dont go past the leftmost part of the image when going left
       if(event.x < handleLeftBoundary) x = handleLeftBoundary
       // Dont go past the bottomRight handle when going right
       if(event.x >= draggieBottomRight.position.x) x = draggieBottomRight.position.x - dragPixelBuffer

       let {y} = draggieBottomLeft.position // eslint-disable-line functional/no-let
       // Dont go past the bottommost part of the image when going down
       if(event.y > handleBottomBoundary) y = handleBottomBoundary
       // Dont go past the topLeft handle when going up
       if(event.y <= draggieTopLeft.position.y) y = draggieTopLeft.position.y + dragPixelBuffer

       draggieBottomLeft.setPosition(x, y)
       // Move bottomRight on the y-axis too
       draggieBottomRight.setPosition(draggieBottomRight.position.x, y)
       // Move topLeft on the x-axis too
       draggieTopLeft.setPosition(x, draggieTopLeft.position.y)
      })
      draggieBottomLeft.setPosition(handleLeftBoundary, handleBottomBoundary)

    }).catch(logger.error)
}

export {
  initCropper
}