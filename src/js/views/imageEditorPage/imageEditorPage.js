import {html, render} from '../../web_modules/lit-html.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'

import { $, setPageTitle, getImageFromId } from '../../utils.js'
import {Nav} from './Nav.js'

function loadImageEditor({subreddit, timefilter, imageId, folderpage}){ // eslint-disable-line consistent-return
  /*****
  We dont have any images stored if viewing sub (not folder) images and the user reloads 
  the page to the image viewer, so redirect to the subreddit page.
  *****/
  if(!folderpage && !store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)
  
  setPageTitle(`RPO - Image Editor`)
  addCropperStylesheet()
  updateImageEditPage({subreddit, timefilter, imageId, folderpage})
}

function updateImageEditPage({subreddit, timefilter, imageId, imageEdits = '', folderpage}){
  // @ts-ignore
  render(ImageEditor({subreddit, timefilter, imageId, imageEdits, folderpage}), document.body)
}

function ImageEditor(state){
  const images = state.folderpage ? store.folders[state.folderpage] : store.fetchedSubredditImages
  const image = getImageFromId(state.imageId, images)
  const imageSrc = image.src || image.url

  return html`
    <main id="app" class="imageEditorPage">
        ${Nav(state)}
        <img src=${imageSrc} style=${state.imageEdits} class="imageToBeEdited" />
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

export {
  loadImageEditor,
  updateImageEditPage,
}