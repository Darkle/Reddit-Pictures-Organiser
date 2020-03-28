import {html, render} from '../../web_modules/lit-html.js'
import Swiper from '../../web_modules/swiper.js'

import {store} from '../../store/store.js'
import { $, setPageTitle, curryRight } from '../../utils.js'
import { router } from '../../router.js'
import { Nav, toggleNav } from './Nav.js'
import { FoldersContainer } from './FoldersContainer.js'
import {imageLoadErrorIcon} from './imageLoadErrorIcon.js'

const numImgsToCache = 10
let swiper = null // eslint-disable-line functional/no-let

function loadImageViewer({subreddit, timefilter, imageId}) { // eslint-disable-line consistent-return
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have any images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
 
  const startingImageIndex = getCurrentImageIndex(imageId)
  
  render(ImageViewer(subreddit, timefilter, imageId, startingImageIndex), $('#app'))
}

function ImageViewer(subreddit, timefilter, imageId, startingImageIndex) {
  const {permalink} = getCurrentImage(imageId)

  return html`
    <main id="app" class="imageViewerPage">
      ${Nav({subreddit, timefilter, permalink})}
      ${Images(startingImageIndex)}
      ${FoldersContainer(subreddit, timefilter)}
      <div class="toast notifyClipboardCopy">Reddit Post Link Copied To Clipboard</div>
      <div class="toast notifyAddedImageToFolder">Image Added To Folder</div>
    </main>    
    `  
}
function Images(startingImageIndex){
  return html`<div>
    <div class="swiper-container" @mouseup=${toggleNav}>
      <div class="swiper-wrapper">
        ${store.fetchedSubredditImages.map((image, index) => {
          const isStartingImage = index === startingImageIndex
          const onImgLoad = curryRight(initialImagePreloads)(startingImageIndex)
          return html`<div class="swiper-slide">
            <img ?style=${image.edits} data-index=${index} 
              @load=${onImgLoad} @error=${onImgLoad} src=${isStartingImage ? (image.src || image.url) : ''} />
          </div>`
        })}      
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

function getCurrentImage(imageId) {
  return store.fetchedSubredditImages.find(({id}) => imageId === id)
}

function getCurrentImageIndex(imageId) {
  return store.fetchedSubredditImages.findIndex(({id}) => imageId === id)
}

export {
  loadImageViewer,
  swiper,
  ImageViewer,
}