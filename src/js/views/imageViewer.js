import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import { setPageTitle } from '../utils.js'
import { router } from '../router.js'
import {$} from '../utils.js'

const html = htm.bind(h)

function loadImageViewer({subreddit, timefilter, imageid}) {
  setPageTitle(`RPO - Image Viewer`)
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)

  patch($('#app'), ImageViewer(subreddit, timefilter, imageid))
}
//TODO: if I end up not being able to use the native lazyload, instead of swapping dom nodes around, just swap the src attributes
// see if i can use <link rel="preload" href="foo.jpg" as="image">
//does removing/changing the link preload get rid of the image and it has to be downloaded again, or is it cached????????
function ImageViewer(subreddit, timefilter, imageid) {
  doThing()
  const storedImage = getStoredImage(imageid)
  return html`
    <main id="app" class="subredditPage">
      ${Nav(subreddit, timefilter)}
      <div class="imagesContainer">
        <img src="${(storedImage.src || storedImage.url)}" data-image-index="${getStoredImageIndex(imageid)}" loading="lazy" /> 
      </div>
    </main>    
    `  
}

function doThing(){
  const fragment = new DocumentFragment()
  // TODO: need to check for before images if its not at the start - do a function - getSomePreviousImages()
  // let link = null // keep a reference to use later for preloading new images
  // store.fetchedSubredditImages.slice(0, 9).forEach(image =>{
  //   link = document.createElement('link')
  //   link.setAttribute('rel', 'preload')
  //   link.setAttribute('href', (image.src || image.url))
  //   link.setAttribute('as', 'image')
  //   link.setAttribute('class', 'imagePreloaders')

  //   fragment.appendChild(link)
  // })
  // document.head.appendChild(fragment)
  // var i = 13
  // setInterval(() => {
  //   if(store.fetchedSubredditImages[i]){
  //     link.setAttribute('href', store.fetchedSubredditImages[i].url)
  //   }
  //   i = i + 1
  // }, 5000)
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
    link.setAttribute('href', (image.src || image.url))
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
    link.setAttribute('href', (image.src || image.url))
    link.setAttribute('as', 'image')
    link.setAttribute('class', 'imagePreloaders')
    document.head.appendChild(link)
    img.dataset.imageIndex = decreaseIndex
  }
})



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

function getStoredImage(imageId) {
  return store.fetchedSubredditImages.find(({id}) => imageId === id)
}

function getStoredImageIndex(imageId) {
  return store.fetchedSubredditImages.findIndex(({id}) => imageId === id)
}

export {
  loadImageViewer
}