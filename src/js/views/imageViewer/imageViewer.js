import { h, patch } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

import {store} from '../../store/store.js'
import { $, setPageTitle } from '../../utils.js'
import { router } from '../../router.js'
import { Nav, toggleNav } from './Nav.js'

const html = htm.bind(h)
const amountImagesToCacheEachWay = 10

function loadImageViewer({subreddit, timefilter, imageid}) { // eslint-disable-line max-statements, consistent-return
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
 
  const currentImageIndex = getCurrentImageIndex(imageid)

  store.updateCurrentlyViewedImageIndex(currentImageIndex)
  setUpInitialImageCaching(currentImageIndex)
  addKeysEventLister(subreddit, timefilter)
  updatePage(subreddit, timefilter, imageid)
}

function updatePage(subreddit, timefilter, imageid) {
  patch($('#app'), ImageViewer(subreddit, timefilter, imageid))
}

function ImageViewer(subreddit, timefilter, imageid) {
  const currentImage = getCurrentImage(imageid)
  const {permalink} = currentImage

  return html`
    <main id="app" class="imageViewerPage">
      ${Nav({subreddit, timefilter, imageid, permalink})}
      <div class="imageContainer"  onclick=${toggleNav} 
          onswipeleft=${event => handleSwipe(event, subreddit, timefilter)} 
          onswiperight=${event => handleSwipe(event, subreddit, timefilter)}>
        <img id="currentImage" src="${(currentImage.src || currentImage.url)}" /> 
      </div>
      <div class="toast notifyClipboardCopy">Reddit Post Link Copied To Clipboard</div>
    </main>    
    `  
}

function setUpInitialImageCaching(storedImageIndex){
  const [prevTen, nextTen] = getInitialImagesToPreload(storedImageIndex)
  const firstThreeOfNextTen = nextTen.slice(0, 3)
  const lastSevenOfNextTen = nextTen.slice(3, 10) // eslint-disable-line no-magic-numbers
  /*****
  We delay for 1 second to let the current image load first, then we load the first
  3 images to the right, then 2 seconds later we load the last 7 to the right and
  the previous 10.  
  *****/
  const oneSecondInMs = 1000
  const aboutTwoSeconds = 2500
  
  addInitialPrefetchLinksToDom(firstThreeOfNextTen, oneSecondInMs)
  addInitialPrefetchLinksToDom(lastSevenOfNextTen, aboutTwoSeconds)
  addInitialPrefetchLinksToDom(prevTen, aboutTwoSeconds)
}

function addInitialPrefetchLinksToDom(images, delay){
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

function addPrefetchLinkToDom(imageToPrefetch){
  document.head.appendChild(createImgCacheLink(imageToPrefetch))
  $('.imagePreloaders').remove()
}

function changeImageDisplayed(subreddit, timefilter, right){ // eslint-disable-line complexity, max-statements
  const currentImageIndex = store.currentlyViewedImageIndex
  const nextPrevCacheIndex = right ? currentImageIndex + amountImagesToCacheEachWay + 1 : currentImageIndex - amountImagesToCacheEachWay - 1
  const nextPrevImageIndex = right ? currentImageIndex + 1 : currentImageIndex - 1
  const imageToPrefetch = store.fetchedSubredditImages[nextPrevCacheIndex]
  
  if(imageToPrefetch){ // eslint-disable-line functional/no-conditional-statement
    addPrefetchLinkToDom(imageToPrefetch)
  }

  const nextPrevImageToShow = store.fetchedSubredditImages[nextPrevImageIndex]
  if(!nextPrevImageToShow) return

  store.updateCurrentlyViewedImageIndex(nextPrevImageIndex)
  updatePage(subreddit, timefilter, nextPrevImageToShow.id)
}

function addKeysEventLister(subreddit, timefilter){
  document.addEventListener('keyup', ({key}) => {
    if(key !== 'ArrowRight' && key !== 'ArrowLeft') return
    const right = key === 'ArrowRight'
    changeImageDisplayed(subreddit, timefilter, right)
  })
}

function handleSwipe(event, subreddit, timefilter){
  //swipeleft moves us right
  const right = event.type === 'swipeleft'
  changeImageDisplayed(subreddit, timefilter, right)
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
  updatePage,
}