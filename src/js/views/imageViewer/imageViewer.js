import { h, patch } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'
import Swiper from '../../web_modules/swiper.js'

import {store} from '../../store/store.js'
import { $, setPageTitle } from '../../utils.js'
import { router } from '../../router.js'
import { Nav, toggleNav } from './Nav.js'
import { FoldersContainer } from './FoldersContainer.js'
import {imageLoadErrorIcon} from './imageLoadErrorIcon.js'

const html = htm.bind(h)
const amountImagesToCacheEachWay = 10

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
          const imageAttrs = {
            style: image.edits, 
            'data-index': index,
            onload: event => handleImageLoadEvent(event, startingImageIndex),
            onerror: event => {
              event.target.setAttribute('src', imageLoadErrorIcon)
              handleImageLoadEvent(event, startingImageIndex)
            },
            ...isStartingImage ? {src: (image.src || image.url)} : {}
          }
          
          return h('div', {class:'swiper-slide'}, [h('img', imageAttrs)])
        })}      
      </div>
    </div>`
}

function handleImageLoadEvent(event, startingImageIndex){ // eslint-disable-line complexity, max-statements
  const thisImageElement = event.target
  const thisImageElementsIndex = Number(thisImageElement.dataset.index)
  const isStartingImage = thisImageElementsIndex === startingImageIndex

  if(isStartingImage) setUpSwiper(startingImageIndex)

  const previousImage = store.fetchedSubredditImages[thisImageElementsIndex - 1]
  const nextImage = store.fetchedSubredditImages[thisImageElementsIndex + 1]

  if(isStartingImage && previousImage || isInPrev10Range(thisImageElementsIndex, startingImageIndex) && previousImage){
    const imgSrc = previousImage.src || previousImage.url
    thisImageElement.parentNode.previousElementSibling.firstElementChild.setAttribute('src', imgSrc)
  }
  if(isStartingImage && nextImage || isInNext10Range(thisImageElementsIndex, startingImageIndex) && nextImage){
    const imgSrc = nextImage.src || nextImage.url
    thisImageElement.parentNode.nextElementSibling.firstElementChild.setAttribute('src', imgSrc)    
  }
}

function isInPrev10Range(imageIndex, startImageIndex){
  return (imageIndex < startImageIndex) && imageIndex > (startImageIndex - amountImagesToCacheEachWay)
}

function isInNext10Range(imageIndex, startImageIndex){
  return (imageIndex > startImageIndex) && imageIndex < (startImageIndex + amountImagesToCacheEachWay)
}

function setUpSwiper(startingImageIndex){
  new Swiper('.swiper-container',
    {
      initialSlide:startingImageIndex, 
      grabCursor: true,
      keyboard: true,
      on: {
        slideNextTransitionEnd: setImgSrcNext10th,
        slidePrevTransitionEnd: setImgSrcPrev10th,
      }
    }
  )
}

function setImgSrcNext10th(){
  const currentImageIndex = this.activeIndex // eslint-disable-line functional/no-this-expression
  const next10thIndex = currentImageIndex + amountImagesToCacheEachWay
  const next10thImage = store.fetchedSubredditImages[next10thIndex]

  if(!next10thImage) return
  
  const next10thImageSrc = next10thImage.src || next10thImage.url
  $(`.swiper-slide img[data-index="${next10thIndex}"]`).setAttribute('src', next10thImageSrc)
}

function setImgSrcPrev10th(){
  const currentImageIndex = this.activeIndex // eslint-disable-line functional/no-this-expression
  const prev10thIndex = currentImageIndex - amountImagesToCacheEachWay
  const prev10thImage = store.fetchedSubredditImages[prev10thIndex]
  
  if(!prev10thImage) return
  
  const prev10thImageSrc = prev10thImage.src || prev10thImage.url
  $(`.swiper-slide img[data-index="${prev10thIndex}"]`).setAttribute('src', prev10thImageSrc)
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