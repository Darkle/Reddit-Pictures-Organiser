import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import { $, setPageTitle } from '../utils.js'
import { router } from '../router.js'

const html = htm.bind(h)
const amountImagesToCacheEachWay = 10

function loadImageViewer({subreddit, timefilter, imageid}) {
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
 if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
 
  const initialRender = true

  patch($('#app'), ImageViewer(subreddit, timefilter, imageid, initialRender))
}

function ImageViewer(subreddit, timefilter, imageid, initialRender = false) {
  const storedImage = getStoredImage(imageid)
  const storedImageIndex = getStoredImageIndex(imageid)

  if(initialRender) {
    store.updateCurrentlyViewedImageIndex(storedImageIndex)
    setUpImageCaching(storedImageIndex)
    addKeysEventLister(subreddit, timefilter)
  }
  
  return html`
    <main id="app" class="subredditPage">
      ${Nav(subreddit, timefilter)}
      <div class="imagesContainer">
        <img src="${(storedImage.src || storedImage.url)}" data-image-index="${storedImageIndex}" /> 
      </div>
    </main>    
    `  
}

function Nav(subreddit, timefilter){
  return html`
    <nav class="navWrapper">
      <div class="back" onmouseup=${() => router.navigate(`/sub/${subreddit}/${timefilter}`)}>Back Icon Here</div>
      <div class="latest" >Edit Icon</div>
      <div class="latest" >Share Icon</div>
      <div class="latest" >Add To Folder Icon</div>
    </nav>  
    `
}

function setUpImageCaching(storedImageIndex){
  const [prevTen, nextTen] = getInitialImagesToPreload(storedImageIndex)
  const firstThreeOfNextTen = nextTen.slice(0, 3)
  const lastSevenOfNextTen = nextTen.slice(3, 10) // eslint-disable-line no-magic-numbers
  /*****
  We delay for 1 second to let the current image load first, then we load the first
  3 images to the right, then 2 seconds later we load the last 7 to the right and
  the previous 10.  
  *****/
  const oneSecondInMs = 1000
  const twoSecondInMs = 2000
  
  addPrefetchLinksToDom(firstThreeOfNextTen, oneSecondInMs)
  addPrefetchLinksToDom(lastSevenOfNextTen, twoSecondInMs)
  addPrefetchLinksToDom(prevTen, twoSecondInMs)
}

function addPrefetchLinksToDom(images, delay){
  if(!images.length) return
  images.forEach(image => {
    setTimeout(() => document.head.appendChild(createImgCacheLink(image)), delay)
  })
}
function createImgCacheLink(image){
  const link = document.createElement('link')
  link.setAttribute('rel', 'preload')
  link.setAttribute('href', (image.url || image.src))
  link.setAttribute('as', 'image')
  link.setAttribute('class', 'imagePreloaders')
  return link
}

function getInitialImagesToPreload(storedImageIndex){
  const subImages = store.fetchedSubredditImages
  const prev10 = Array.from({length:amountImagesToCacheEachWay})
                  .map((_, index) => subImages[storedImageIndex - (index + 1)])
                  .filter(Boolean)
  const next10 = Array.from({length:amountImagesToCacheEachWay})
                  .map((_, index) => subImages[storedImageIndex + (index + 1)])
                  .filter(Boolean)
  
  return [prev10, next10]
}

// function addKeysEventLister(subreddit, timefilter){ // eslint-disable-line max-lines-per-function
//   document.addEventListener('keyup', ({key}) => { // eslint-disable-line max-lines-per-function, complexity, max-statements
//     if(key === 'ArrowRight'){
//       const currIndexPlus10 = store.currentlyViewedImageIndex + amountImagesToCacheEachWay + 1
//       const nextImageIndex = store.currentlyViewedImageIndex + 1
//       const imageToPrefetch = store.fetchedSubredditImages[currIndexPlus10]
      
//       if(imageToPrefetch){ // eslint-disable-line functional/no-conditional-statement
//         document.head.appendChild(createImgCacheLink(imageToPrefetch))
//         $('.imagePreloaders').remove()
//       }

//       const nextImageToShow = store.fetchedSubredditImages[nextImageIndex]

//       if(!nextImageToShow) return

//       store.updateCurrentlyViewedImageIndex(nextImageIndex)
//       patch($('#app'), ImageViewer(subreddit, timefilter, nextImageToShow.id))
//     }
//     if(key === 'ArrowLeft'){
//       const currIndexMinus10 = store.currentlyViewedImageIndex - amountImagesToCacheEachWay - 1
//       const prevImageIndex = store.currentlyViewedImageIndex - 1
//       const imageToPrefetch = store.fetchedSubredditImages[currIndexMinus10]

//       if(imageToPrefetch){ // eslint-disable-line functional/no-conditional-statement
//         document.head.appendChild(createImgCacheLink(imageToPrefetch))
//         $('.imagePreloaders').remove()
//       }

//       const prevImageToShow = store.fetchedSubredditImages[prevImageIndex]

//       if(!prevImageToShow) return
      
//       store.updateCurrentlyViewedImageIndex(prevImageIndex)
//       patch($('#app'), ImageViewer(subreddit, timefilter, prevImageToShow.id))
//     }
//   })
// }

function addKeysEventLister(subreddit, timefilter){ // eslint-disable-line max-lines-per-function
  document.addEventListener('keyup', ({key}) => { // eslint-disable-line complexity, max-statements
    if(key !== 'ArrowRight' && key !== 'ArrowLeft') return
    const right = key === 'ArrowRight'
    const currentImageIndex = store.currentlyViewedImageIndex
    const nextPrevCacheIndex = right ? currentImageIndex + amountImagesToCacheEachWay + 1 : currentImageIndex - amountImagesToCacheEachWay - 1
    const nextPrevImageIndex = right ? currentImageIndex + 1 : currentImageIndex - 1
    const imageToPrefetch = store.fetchedSubredditImages[nextPrevCacheIndex]
    
    if(imageToPrefetch){ // eslint-disable-line functional/no-conditional-statement
      document.head.appendChild(createImgCacheLink(imageToPrefetch))
      $('.imagePreloaders').remove()
    }

    const nextPrevImageToShow = store.fetchedSubredditImages[nextPrevImageIndex]

    if(!nextPrevImageToShow) return

    store.updateCurrentlyViewedImageIndex(nextPrevImageIndex)
    patch($('#app'), ImageViewer(subreddit, timefilter, nextPrevImageToShow.id))    
  })
}

function getStoredImage(imageId) {
  return store.fetchedSubredditImages.find(({id}) => imageId === id)
}

function getStoredImageIndex(imageId) {
  return store.fetchedSubredditImages.findIndex(({id}) => imageId === id)
}

export {
  loadImageViewer
}