import {html, render} from '../../web_modules/lit-html.js'

import {store} from '../../store/store.js'
import { setPageTitle, getImageIndexFromId } from '../../utils.js'
import { router } from '../../router.js'
import { Nav, toggleNav } from './Nav.js'
import { FoldersContainer } from './FoldersContainer.js'
import {Image} from './Image.js'
import { logger } from '../../logger.js'
import { preloadImageOnSwipe } from './preload.js'

let swiper = null // eslint-disable-line functional/no-let

const noImagesInSubView = (folderpage) => !folderpage && !store.fetchedSubredditImages.length

function loadImageViewer({subreddit, timefilter, imageId, folderpage}) { // eslint-disable-line consistent-return
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have any images stored if viewing sub (not folder) images and the user reloads 
  the page to the image viewer, so redirect to the subreddit page.
  *****/
  if(noImagesInSubView(folderpage)) return router.navigate(`/sub/${subreddit}/${timefilter}`)
 
  const images = folderpage ? store.folders[folderpage] : store.fetchedSubredditImages
  const startingImageIndex = getImageIndexFromId(imageId, images)
  // @ts-ignore
  render(ImageViewer({subreddit, timefilter, imageId, startingImageIndex, folderpage}), document.body)
  setUpSwiper(startingImageIndex, folderpage)
}

function ImageViewer(state) {
  return html`
    <main id="app" class="imageViewerPage">
      ${Nav(state)}
      ${Images(state)}
      ${FoldersContainer(state)}
      <div class="toast notifyClipboardCopy">Reddit Post Link Copied To Clipboard</div>
      <div class="toast notifyAddedImageToFolder">Image Added To Folder</div>
      <div class="toast notifyRemovedImageFromFolder">Image Removed From Folder</div>
    </main>    
    `  
}

function Images(state){
  const images = state.folderpage ? store.folders[state.folderpage] : store.fetchedSubredditImages
  
  return html`
    <div class="swiper-container" @mouseup=${toggleNav}>
      <div class="swiper-wrapper">
      ${images.map((image, index) => html`<div class="swiper-slide">${Image(image, index, state)}</div>`)}      
    </div>
  `
}

function setUpSwiper(startingImageIndex, folderpage){ // eslint-disable-line max-lines-per-function
  import('../../web_modules/swiper.js')
    .then(({default:Swiper}) => {
      swiper = new Swiper('.swiper-container',
        {
          initialSlide:startingImageIndex, 
          grabCursor: true,
          keyboard: true,
          on: {
            slideNextTransitionEnd() {
              const swiperObj = this // eslint-disable-line functional/no-this-expression
              const forward = true
              preloadImageOnSwipe(swiperObj, forward, folderpage)
            },
            slidePrevTransitionEnd(){
              const swiperObj = this // eslint-disable-line functional/no-this-expression
              const forward = false
              preloadImageOnSwipe(swiperObj, forward, folderpage)
            },
          }
        }
      )

    })
    .catch(logger.error)
}

export {
  loadImageViewer,
  swiper,
  ImageViewer,
}