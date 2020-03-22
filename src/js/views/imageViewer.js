import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import { setPageTitle } from '../utils.js'
import { router } from '../router.js'
import {$} from '../utils.js'

const html = htm.bind(h)
const oneSecondInMs = 1000

function loadImageViewer({subreddit, timefilter, imageid}) {
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)

  patch($('#app'), ImageViewer(subreddit, timefilter, imageid))
}

function ImageViewer(subreddit, timefilter, imageid) {
  const storedImage = getStoredImage(imageid)
  const storedImageIndex = getStoredImageIndex(imageid)
  setUpImageCaching(storedImageIndex)
  
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
  const shouldDelay = true

  addPrefetchLinksToDom(firstThreeOfNextTen)
  addPrefetchLinksToDom(lastSevenOfNextTen, shouldDelay)
  addPrefetchLinksToDom(prevTen, shouldDelay)
}

function addPrefetchLinksToDom(images, shouldDelay = false){
  if(!images.length) return
  const fragment = new DocumentFragment()
  images.forEach(image => fragment.appendChild(createImgCacheLink(image)))
  /*****
    We let the first 3 to the right load first as they may be needed straight away.
  *****/
  if(shouldDelay){
    setTimeout(() => document.head.appendChild(fragment), oneSecondInMs)
    return
  }
  document.head.appendChild(fragment)
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
  const amountImagesToCacheEachWay = 10
  const subImages = store.fetchedSubredditImages
  const prev10 = Array.from({length:amountImagesToCacheEachWay})
                  .map((_, index) => subImages[storedImageIndex + (index + 1)])
                  .filter(Boolean)
  const next10 = Array.from({length:amountImagesToCacheEachWay})
                  .map((_, index) => subImages[storedImageIndex - (index + 1)])
                  .filter(Boolean)

  return [prev10, next10]
}

document.addEventListener('keyup', ({key}) => {// eslint-disable-line 
  const img = $('.imagesContainer img')
  console.log(img)
  console.log(Number(img.dataset.imageIndex))
  const imageIndex = Number(img.dataset.imageIndex)
  console.log('imageIndex', imageIndex)
  if(key === 'ArrowRight'){
    const advanceIndex = imageIndex + 1
    const image = store.fetchedSubredditImages[advanceIndex]
    console.log('advanceIndex', advanceIndex)
    console.log('store.fetchedSubredditImages[advanceIndex].url', image.url)
    const link = document.createElement('link')
    link.setAttribute('rel', 'preload')
    link.setAttribute('href', (image.url || image.src))
    link.setAttribute('as', 'image')
    link.setAttribute('class', 'imagePreloaders')
    document.head.appendChild(link)
    img.dataset.imageIndex = advanceIndex
  }
  if(key === 'ArrowLeft'){
    const decreaseIndex = imageIndex - 1
    const image = store.fetchedSubredditImages[decreaseIndex]
    const link = document.createElement('link')
    link.setAttribute('rel', 'preload')
    link.setAttribute('href', (image.url || image.src))
    link.setAttribute('as', 'image')
    link.setAttribute('class', 'imagePreloaders')
    document.head.appendChild(link)
    img.dataset.imageIndex = decreaseIndex
  }
})

function getStoredImage(imageId) {
  return store.fetchedSubredditImages.find(({id}) => imageId === id)
}

function getStoredImageIndex(imageId) {
  return store.fetchedSubredditImages.findIndex(({id}) => imageId === id)
}

export {
  loadImageViewer
}