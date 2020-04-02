import{$,$$}from '../../utils.js'
import{logger}from '../../logger.js'
const halfSizeOfHandles=10
const dragPixelBuffer=50
function initCropper(){const image=$('.imageToBeEdited')
const handleLineTop=$('.handleLine[data-handle-line="top"]')
const handleLineRight=$('.handleLine[data-handle-line="right"]')
const handleLineBottom=$('.handleLine[data-handle-line="bottom"]')
const handleLineLeft=$('.handleLine[data-handle-line="left"]')
const handleLines={handleLineTop,handleLineRight,handleLineBottom,handleLineLeft}
image.style.height=`80%`
const imageElemBoundedRect=image.getBoundingClientRect()
const handleLeftBoundary=imageElemBoundedRect.left-halfSizeOfHandles
const handleTopBoundary=imageElemBoundedRect.top-halfSizeOfHandles
const handleRightBoundary=imageElemBoundedRect.right-halfSizeOfHandles
const handleBottomBoundary=imageElemBoundedRect.bottom-halfSizeOfHandles
const boundaries={handleLeftBoundary,handleTopBoundary,handleRightBoundary,handleBottomBoundary}
logger.debug(imageElemBoundedRect)
$$('.handle, .handleLine').forEach(handle=>handle.classList.toggle('show'))
import('../../web_modules/draggabilly.js').then(({default:Draggabilly})=>{setUpDragEventListeners(Draggabilly,handleLines,imageElemBoundedRect,boundaries)}).catch(logger.error)}
function setUpDragEventListeners(Draggabilly,handleLines,imageElemBoundedRect,boundaries){const draggieTopLeft=new Draggabilly($('.handle[data-handle="topLeft"]'))
const draggieTopRight=new Draggabilly($('.handle[data-handle="topRight"]'))
const draggieBottomRight=new Draggabilly($('.handle[data-handle="bottomRight"]'))
const draggieBottomLeft=new Draggabilly($('.handle[data-handle="bottomLeft"]'))
const draggies={draggieTopLeft,draggieTopRight,draggieBottomRight,draggieBottomLeft}
updateHandleLinesPosition(draggies,handleLines,imageElemBoundedRect)
draggieTopLeft.on('dragMove',function(){draggieTopRight.setPosition(draggieTopRight.position.x,draggieTopLeft.position.y)
draggieBottomLeft.setPosition(draggieTopLeft.position.x,draggieBottomLeft.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieTopLeft.on('dragEnd',function(event){let{x}=draggieTopLeft.position
if(event.x<boundaries.handleLeftBoundary)x=boundaries.handleLeftBoundary
if(event.x>=draggieTopRight.position.x)x=draggieTopRight.position.x-dragPixelBuffer
let{y}=draggieTopLeft.position
if(event.y<boundaries.handleTopBoundary)y=boundaries.handleTopBoundary
if(event.y>=draggieBottomRight.position.y)y=draggieBottomRight.position.y-dragPixelBuffer
draggieTopLeft.setPosition(x,y)
draggieTopRight.setPosition(draggieTopRight.position.x,y)
draggieBottomLeft.setPosition(x,draggieBottomLeft.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieTopLeft.setPosition(boundaries.handleLeftBoundary,boundaries.handleTopBoundary)
draggieTopRight.on('dragMove',function(){draggieTopLeft.setPosition(draggieTopLeft.position.x,draggieTopRight.position.y)
draggieBottomRight.setPosition(draggieTopRight.position.x,draggieBottomRight.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieTopRight.on('dragEnd',function(event){let{x}=draggieTopRight.position
if(event.x>boundaries.handleRightBoundary)x=boundaries.handleRightBoundary
if(event.x<=draggieTopRight.position.x)x=draggieTopLeft.position.x+dragPixelBuffer
let{y}=draggieTopRight.position
if(event.y<boundaries.handleTopBoundary)y=boundaries.handleTopBoundary
if(event.y>=draggieBottomRight.position.y)y=draggieBottomRight.position.y-dragPixelBuffer
draggieTopRight.setPosition(x,y)
draggieTopLeft.setPosition(draggieTopLeft.position.x,y)
draggieBottomRight.setPosition(x,draggieBottomRight.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieTopRight.setPosition(boundaries.handleRightBoundary,boundaries.handleTopBoundary)
draggieBottomRight.on('dragMove',function(){draggieBottomLeft.setPosition(draggieBottomLeft.position.x,draggieBottomRight.position.y)
draggieTopRight.setPosition(draggieBottomRight.position.x,draggieTopRight.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieBottomRight.on('dragEnd',function(event){let{x}=draggieBottomRight.position
if(event.x>boundaries.handleRightBoundary)x=boundaries.handleRightBoundary
if(event.x<=draggieBottomLeft.position.x)x=draggieBottomLeft.position.x+dragPixelBuffer
let{y}=draggieBottomRight.position
if(event.y>boundaries.handleBottomBoundary)y=boundaries.handleBottomBoundary
if(event.y<=draggieTopRight.position.y)y=draggieTopRight.position.y+dragPixelBuffer
draggieBottomRight.setPosition(x,y)
draggieBottomLeft.setPosition(draggieBottomLeft.position.x,y)
draggieTopRight.setPosition(x,draggieTopRight.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieBottomRight.setPosition(boundaries.handleRightBoundary,boundaries.handleBottomBoundary)
draggieBottomLeft.on('dragMove',function(){draggieBottomRight.setPosition(draggieBottomRight.position.x,draggieBottomLeft.position.y)
draggieTopLeft.setPosition(draggieBottomLeft.position.x,draggieTopLeft.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieBottomLeft.on('dragEnd',function(event){let{x}=draggieBottomLeft.position
if(event.x<boundaries.handleLeftBoundary)x=boundaries.handleLeftBoundary
if(event.x>=draggieBottomRight.position.x)x=draggieBottomRight.position.x-dragPixelBuffer
let{y}=draggieBottomLeft.position
if(event.y>boundaries.handleBottomBoundary)y=boundaries.handleBottomBoundary
if(event.y<=draggieTopLeft.position.y)y=draggieTopLeft.position.y+dragPixelBuffer
draggieBottomLeft.setPosition(x,y)
draggieBottomRight.setPosition(draggieBottomRight.position.x,y)
draggieTopLeft.setPosition(x,draggieTopLeft.position.y)
updateHandleLinesPosition(draggies,handleLines)})
draggieBottomLeft.setPosition(boundaries.handleLeftBoundary,boundaries.handleBottomBoundary)}
function updateHandleLinesPosition({draggieTopLeft,draggieTopRight,draggieBottomRight,draggieBottomLeft},handleLines,imageElemBoundedRect){if(imageElemBoundedRect){handleLines.handleLineLeft.style.left=`${imageElemBoundedRect.left}px`
handleLines.handleLineLeft.style.top=`${imageElemBoundedRect.top}px`
handleLines.handleLineLeft.style.height=`${imageElemBoundedRect.height}px`
handleLines.handleLineTop.style.left=`${imageElemBoundedRect.left}px`
handleLines.handleLineTop.style.top=`${imageElemBoundedRect.top}px`
handleLines.handleLineTop.style.width=`${imageElemBoundedRect.width}px`
handleLines.handleLineRight.style.left=`${imageElemBoundedRect.right}px`
handleLines.handleLineRight.style.top=`${imageElemBoundedRect.top}px`
handleLines.handleLineRight.style.height=`${imageElemBoundedRect.height}px`
handleLines.handleLineBottom.style.left=`${imageElemBoundedRect.left}px`
handleLines.handleLineBottom.style.top=`${imageElemBoundedRect.bottom}px`
handleLines.handleLineBottom.style.width=`${imageElemBoundedRect.width}px`
return}
handleLines.handleLineTop.style.left=`${draggieTopLeft.position.x+halfSizeOfHandles}px`
handleLines.handleLineTop.style.top=`${draggieTopLeft.position.y+halfSizeOfHandles}px`
handleLines.handleLineTop.style.width=`${((draggieTopRight.position.x+halfSizeOfHandles)-(draggieTopLeft.position.x+halfSizeOfHandles))}px`
handleLines.handleLineRight.style.left=`${draggieTopRight.position.x+halfSizeOfHandles}px`
handleLines.handleLineRight.style.top=`${draggieTopRight.position.y+halfSizeOfHandles}px`
handleLines.handleLineRight.style.height=`${((draggieBottomRight.position.y+halfSizeOfHandles)-(draggieTopRight.position.y+halfSizeOfHandles))}px`
handleLines.handleLineBottom.style.left=`${draggieBottomLeft.position.x+halfSizeOfHandles}px`
handleLines.handleLineBottom.style.top=`${draggieBottomRight.position.y+halfSizeOfHandles}px`
handleLines.handleLineBottom.style.width=`${((draggieBottomRight.position.x+halfSizeOfHandles)-(draggieBottomLeft.position.x+halfSizeOfHandles))}px`
handleLines.handleLineLeft.style.left=`${draggieTopLeft.position.x+halfSizeOfHandles}px`
handleLines.handleLineLeft.style.top=`${draggieTopLeft.position.y+halfSizeOfHandles}px`
handleLines.handleLineLeft.style.height=`${((draggieBottomLeft.position.y+halfSizeOfHandles)-(draggieTopLeft.position.y+halfSizeOfHandles))}px`}
export{initCropper}