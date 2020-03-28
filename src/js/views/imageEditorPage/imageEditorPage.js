import {html, render} from '../../web_modules/lit-html.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'

import { $, setPageTitle } from '../../utils.js'
import {Nav} from './Nav.js'

function loadImageEditor({subreddit, timefilter, imageId}){ // eslint-disable-line consistent-return
  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
  
  setPageTitle(`RPO - Image Editor`)
  addCropperStylesheet()
  updateImageEditPage(subreddit, timefilter, imageId)
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

function updateImageEditPage(subreddit, timefilter, imageId){
  // @ts-ignore
  render(ImageEditor(subreddit, timefilter, imageId), $('#app'))
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
  loadImageEditor,
  updateImageEditPage,
}