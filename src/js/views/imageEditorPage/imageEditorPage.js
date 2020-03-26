import { h, patch } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'

import { $, setPageTitle } from '../../utils.js'
import {Nav} from './Nav.js'

const html = htm.bind(h)

function loadImageEditor({subreddit, timefilter, imageId}){ // eslint-disable-line consistent-return
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
  
  setPageTitle(`RPO - Image Viewer`)
  addCropperStylesheet()
  patch($('#app'), ImageEditor(subreddit, timefilter, imageId))
}

function ImageEditor(subreddit, timefilter, imageId){
  const image = getCurrentImage(imageId)
  const imageSrc = image.src || image.url
  
  return html`
    <main id="app" class="imageEditorPage">
      ${Nav(subreddit, timefilter, imageId)}
      <img src=${imageSrc} class="imageToBeEdited" />
    </main>   
  `
}

function addCropperStylesheet(){
  if($('#cropperStylesheet')) return
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('id', 'cropperStylesheet')
  link.setAttribute('href', 'https://unpkg.com/croppr@2.3.1/dist/croppr.min.css')
  document.head.appendChild(link)
}

function getCurrentImage(imageId) {
  return store.fetchedSubredditImages.find(({id}) => imageId === id)
}

export {
  loadImageEditor
}