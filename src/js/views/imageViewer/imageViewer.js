import { h, patch } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

import {store} from '../../store/store.js'
import { $, $$, setPageTitle } from '../../utils.js'
import { router } from '../../router.js'
import { Nav, toggleNav } from './Nav.js'
import { FoldersContainer } from './FoldersContainer.js'

const html = htm.bind(h)
const amountImagesToCacheEachWay = 10

function loadImageViewer({subreddit, timefilter, imageId}) { // eslint-disable-line max-statements, consistent-return
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
 
  const currentImageIndex = getCurrentImageIndex(imageId)
  const initialRender = true

  store.updateCurrentlyViewedImageIndex(currentImageIndex)
  addKeysEventLister(subreddit, timefilter)
  updatePage(subreddit, timefilter, imageId, currentImageIndex, initialRender)
}

function updatePage(subreddit, timefilter, imageId, currentImageIndex = null, initialRender = false) {
  patch($('#app'), ImageViewer(subreddit, timefilter, imageId, currentImageIndex, initialRender))
}

function ImageViewer(subreddit, timefilter, imageId, currentImageIndex, initialRender) {
  const currentImage = getCurrentImage(imageId)
  const {permalink} = currentImage

  return html`
    <main id="app" class="imageViewerPage">
      ${Nav({subreddit, timefilter, imageId, permalink})}
      <div class="imageContainer"  onclick=${toggleNav} 
          onswipeleft=${event => handleSwipe(event, subreddit, timefilter)} 
          onswiperight=${event => handleSwipe(event, subreddit, timefilter)}>
        <img id="currentImage" src="${(currentImage.src || currentImage.url)}" 
          style="${currentImage.edits}" onload=${() => setUpInitialImageCaching(currentImageIndex, initialRender)} 
          onerror=${() => setUpInitialImageCaching(currentImageIndex, initialRender)}  /> 
      </div>
      ${FoldersContainer(currentImage)}
      <div class="toast notifyClipboardCopy">Reddit Post Link Copied To Clipboard</div>
      <div class="toast notifyAddedImageToFolder">Image Added To Folder</div>
    </main>    
    `  
}

function setUpInitialImageCaching(currentImageIndex, initialRender){ // eslint-disable-line max-statements
  if(!initialRender) return

  removePreviousPreloaders()

  const [prevTen, nextTen] = getInitialImagesToPreload(currentImageIndex)
  const firstThreeOfNextTen = nextTen.slice(0, 3)
  const lastSevenOfNextTen = nextTen.slice(3, 10) // eslint-disable-line no-magic-numbers
  const finalGroupToPrefetch = [...lastSevenOfNextTen, ...prevTen]

  /*****
  Preload the first three to the right, then do the last 7 to the right and the previous 10
  *****/
  addCacheLinkToDom(createImgCacheLink(firstThreeOfNextTen[0]))
  addCacheLinkToDom(createImgCacheLink(firstThreeOfNextTen[1]))
  addCacheLinkToDom(createImgCacheLink(firstThreeOfNextTen[2], finalGroupToPrefetch))
}

function removePreviousPreloaders(){
  $$('.imagePreloaders').forEach(elem => elem.remove())
}

function addCacheLinkToDom(link){
  document.head.appendChild(link)
}

function createImgCacheLink(image, finalGroupToPrefetch = []){
  const link = document.createElement('link')
  link.setAttribute('rel', 'preload')
  link.setAttribute('href', (image.url || image.src))
  link.setAttribute('as', 'image')
  link.setAttribute('class', 'imagePreloaders')
  link.addEventListener('error', () => {
    finalGroupToPrefetch.forEach(img => addCacheLinkToDom(createImgCacheLink(img)))
  })
  link.addEventListener('load', () => {
    finalGroupToPrefetch.forEach(img => addCacheLinkToDom(createImgCacheLink(img)))
  })  
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
  
  if(imageToPrefetch){
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