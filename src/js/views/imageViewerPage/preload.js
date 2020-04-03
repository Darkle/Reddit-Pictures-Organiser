import {imageLoadErrorIcon} from './imageLoadErrorIcon.js'
import {store} from '../../store/store.js'
import { $, safeGetImageSrc } from '../../utils.js'

const numImgsToCache = 10

/*****
So on page load we walk left and right of the current image that is being displayed 
and load the next and previous images till we've loaded 10 next and 10 previous.
*****/
function initialImagePreloads(event, {startingImageIndex, folderpage}){ // eslint-disable-line complexity, max-statements
  const thisImageElement = event.target
  const thisImageElementsIndex = Number(thisImageElement.dataset.index)
  const isStartingImage = thisImageElementsIndex === startingImageIndex

  if(event.type === 'error') thisImageElement.setAttribute('src', imageLoadErrorIcon)

  const images = folderpage ? store.folders[folderpage] : store.fetchedSubredditImages
  const previousImage = images[thisImageElementsIndex - 1]
  const nextImage = images[thisImageElementsIndex + 1]

  if(shouldPreloadPrevImage(isStartingImage, previousImage, thisImageElementsIndex, startingImageIndex)){
    const imgSrc = safeGetImageSrc(previousImage)
    thisImageElement.parentNode.previousElementSibling.firstElementChild.setAttribute('src', imgSrc)
  }
  if(shouldPreloadNextImage(isStartingImage, nextImage, thisImageElementsIndex, startingImageIndex)){
    const imgSrc = safeGetImageSrc(nextImage)
    thisImageElement.parentNode.nextElementSibling.firstElementChild.setAttribute('src', imgSrc)    
  }
}

function shouldPreloadPrevImage(isStartingImage, previousImage, thisImageElementsIndex, startingImageIndex){
  if(!previousImage) return false
  return (isStartingImage || isInPrev10Range(thisImageElementsIndex, startingImageIndex))
}

function shouldPreloadNextImage(isStartingImage, nextImage, thisImageElementsIndex, startingImageIndex){
  if(!nextImage) return false
  return (isStartingImage || isInNext10Range(thisImageElementsIndex, startingImageIndex))
}

function isInPrev10Range(imageIndex, startImageIndex){
  return (imageIndex < startImageIndex) && imageIndex > (startImageIndex - numImgsToCache)
}

function isInNext10Range(imageIndex, startImageIndex){
  return (imageIndex > startImageIndex) && imageIndex < (startImageIndex + numImgsToCache)
}

function preloadImageOnSwipe(swiperObj, forward, folderpage){
  const currentImageIndex = swiperObj.activeIndex 
  const tenthIndex = forward ? (currentImageIndex + numImgsToCache) : (currentImageIndex - numImgsToCache)
  const images = folderpage ? store.folders[folderpage] : store.fetchedSubredditImages
  const tenthImage = images[tenthIndex]

  if(!tenthImage) return
  
  const tenthImageSrc = safeGetImageSrc(tenthImage)
  $(`.swiper-slide img[data-index="${tenthIndex}"]`).setAttribute('src', tenthImageSrc)
}

export {
  initialImagePreloads,
  preloadImageOnSwipe,
}