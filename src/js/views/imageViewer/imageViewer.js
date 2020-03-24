import { h, patch } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'
import Swiper from '../../web_modules/swiper.js'

import {store} from '../../store/store.js'
import { $, setPageTitle, curryRight } from '../../utils.js'
import { router } from '../../router.js'
import { Nav, toggleNav } from './Nav.js'
import { FoldersContainer } from './FoldersContainer.js'
import {imageLoadErrorIcon} from './imageLoadErrorIcon.js'

const html = htm.bind(h)
const numImgsToCache = 10

function loadImageViewer({subreddit, timefilter, imageId}) { // eslint-disable-line consistent-return
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have any images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
 
  const startingImageIndex = getCurrentImageIndex(imageId)
  
  patch($('#app'), ImageViewer(subreddit, timefilter, imageId, startingImageIndex))
}

function ImageViewer(subreddit, timefilter, imageId, startingImageIndex) {
  const currentImage = getCurrentImage(imageId)
  const {permalink} = currentImage

  return html`
    <main id="app" class="imageViewerPage">
      ${Nav({subreddit, timefilter, imageId, permalink})}
      ${Images(startingImageIndex)}
      ${FoldersContainer(currentImage)}
      <div class="toast notifyClipboardCopy">Reddit Post Link Copied To Clipboard</div>
      <div class="toast notifyAddedImageToFolder">Image Added To Folder</div>
    </main>    
    `  
}

function Images(startingImageIndex){
  return html`<div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        ${store.fetchedSubredditImages.map((image, index) => {
          const isStartingImage = index === startingImageIndex
          const onload = curryRight(initialImagePreloads)(startingImageIndex)
          const imageAttrs = {
            style: image.edits, 
            'data-index': index,
            onload,
            onerror: onload,
            ...isStartingImage ? {src: (image.src || image.url)} : {}
          }
          
          return h('div', {class:'swiper-slide'}, [h('img', imageAttrs)])
        })}      
      </div>
    </div>`
}

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

function shouldPreloadNextImage(isStartingImage, nextImage, thisImageElementsIndex, startingImageIndex){
  if(!nextImage) return false
  return (isStartingImage || isInNext10Range(thisImageElementsIndex, startingImageIndex))
}

function shouldPreloadPrevImage(isStartingImage, previousImage, thisImageElementsIndex, startingImageIndex){
  if(!previousImage) return false
  return (isStartingImage || isInPrev10Range(thisImageElementsIndex, startingImageIndex))
}

function isInPrev10Range(imageIndex, startImageIndex){
  return (imageIndex < startImageIndex) && imageIndex > (startImageIndex - numImgsToCache)
}

function isInNext10Range(imageIndex, startImageIndex){
  return (imageIndex > startImageIndex) && imageIndex < (startImageIndex + numImgsToCache)
}

function setUpSwiper(startingImageIndex){
  new Swiper('.swiper-container',
    {
      initialSlide:startingImageIndex, 
      grabCursor: true,
      keyboard: true,
      on: {
        slideNextTransitionEnd: () => {
          const swiper = this // eslint-disable-line functional/no-this-expression
          const forward = true
          preloadImage(swiper, forward)
        },
        slidePrevTransitionEnd: () => {
          const swiper = this // eslint-disable-line functional/no-this-expression
          const forward = false
          preloadImage(swiper, forward)
        },
      }
    }
  )
}

function preloadImage(swiper, forward){
  const currentImageIndex = swiper.activeIndex 
  const tenthIndex = forward ? (currentImageIndex + numImgsToCache) : (currentImageIndex - numImgsToCache)
  const tenthImage = store.fetchedSubredditImages[tenthIndex]

  if(!tenthImage) return
  
  const tenthImageSrc = tenthImage.src || tenthImage.url
  $(`.swiper-slide img[data-index="${tenthIndex}"]`).setAttribute('src', tenthImageSrc)
}

function getCurrentImage(imageId) {
  return store.fetchedSubredditImages.find(({id}) => imageId === id)
}

function getCurrentImageIndex(imageId) {
  return store.fetchedSubredditImages.findIndex(({id}) => imageId === id)
}

export {
  loadImageViewer,
  toggleNav,
}