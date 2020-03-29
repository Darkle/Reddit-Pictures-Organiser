import {html, render} from '../../web_modules/lit-html.js'
import Swiper from '../../web_modules/swiper.js'

import {store} from '../../store/store.js'
import { $, setPageTitle, getImageFromId, getImageIndexFromId } from '../../utils.js'
import { router } from '../../router.js'
import { Nav, toggleNav } from './Nav.js'
import { FoldersContainer } from './FoldersContainer.js'
import {imageLoadErrorIcon} from './imageLoadErrorIcon.js'
import {Image} from './Image.js'

const numImgsToCache = 10
let swiper = null // eslint-disable-line functional/no-let

function loadImageViewer({subreddit, timefilter, imageId, folderpage}) { // eslint-disable-line consistent-return
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have any images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
 
  const images = folderpage ? store.folders[folderpage] : store.fetchedSubredditImages
  const startingImageIndex = getImageIndexFromId(imageId, images)
  // @ts-ignore
  render(ImageViewer({subreddit, timefilter, imageId, startingImageIndex, folderpage}), document.body)
}

function ImageViewer(state) {
  const images = state.folderpage ? store.folders[state.folderpage] : store.fetchedSubredditImages
  const {permalink} = getImageFromId(state.imageId, images)

  return html`
    <main id="app" class="imageViewerPage">
      ${Nav({...state, permalink})}
      ${Images(state)}
      ${FoldersContainer(state)}
      <div class="toast notifyClipboardCopy">Reddit Post Link Copied To Clipboard</div>
      <div class="toast notifyAddedImageToFolder">Image Added To Folder</div>
    </main>    
    `  
}

function Images(state){
  const images = state.folderpage ? store.folders[state.folderpage] : store.fetchedSubredditImages

  return html`<div>
    <div class="swiper-container" @mouseup=${toggleNav}>
      <div class="swiper-wrapper">
        ${images.map((image, index) => html`<div class="swiper-slide">${Image(image, index, state)}</div>`)}      
      </div>
    </div>`
}
/*****
So on page load we walk left and right of the current image that is being displayed 
and load the next and previous images till we've loaded 10 next and 10 previous.
*****/
function initialImagePreloads(event, startingImageIndex){ // eslint-disable-line complexity, max-statements
  const thisImageElement = event.target
  const thisImageElementsIndex = Number(thisImageElement.dataset.index)
  const isStartingImage = thisImageElementsIndex === startingImageIndex

  if(event.type === 'error') thisImageElement.setAttribute('src', imageLoadErrorIcon)
  if(isStartingImage) setUpSwiper(startingImageIndex)

  const previousImage = store.fetchedSubredditImages[thisImageElementsIndex - 1]
  const nextImage = store.fetchedSubredditImages[thisImageElementsIndex + 1]

  if(shouldPreloadPrevImage(isStartingImage, previousImage, thisImageElementsIndex, startingImageIndex)){
    const imgSrc = previousImage.src || previousImage.url
    thisImageElement.parentNode.previousElementSibling.firstElementChild.setAttribute('src', imgSrc)
  }
  if(shouldPreloadNextImage(isStartingImage, nextImage, thisImageElementsIndex, startingImageIndex)){
    const imgSrc = nextImage.src || nextImage.url
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

function setUpSwiper(startingImageIndex){
  swiper = new Swiper('.swiper-container',
    {
      initialSlide:startingImageIndex, 
      grabCursor: true,
      keyboard: true,
      on: {
        slideNextTransitionEnd() {
          const swiperObj = this // eslint-disable-line functional/no-this-expression
          const forward = true
          preloadImage(swiperObj, forward)
        },
        slidePrevTransitionEnd(){
          const swiperObj = this // eslint-disable-line functional/no-this-expression
          const forward = false
          preloadImage(swiperObj, forward)
        },
      }
    }
  )
}

function preloadImage(swiperObj, forward){
  const currentImageIndex = swiperObj.activeIndex 
  const tenthIndex = forward ? (currentImageIndex + numImgsToCache) : (currentImageIndex - numImgsToCache)
  const tenthImage = store.fetchedSubredditImages[tenthIndex]

  if(!tenthImage) return
  
  const tenthImageSrc = tenthImage.src || tenthImage.url
  $(`.swiper-slide img[data-index="${tenthIndex}"]`).setAttribute('src', tenthImageSrc)
}

export {
  loadImageViewer,
  swiper,
  ImageViewer,
  initialImagePreloads,
}