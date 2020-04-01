import {html, render} from '../../web_modules/lit-html.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'
import {Handles} from './Handles.js'

import { $, setPageTitle, getImageFromId, safeGetImageSrc } from '../../utils.js'
import {Nav} from './Nav.js'
import { convertImageEditsToCssString } from './editing.js'

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

function updateImageEditPage({subreddit, timefilter, imageId, newEdits = null, folderpage}){
  // @ts-ignore
  render(ImageEditor({subreddit, timefilter, imageId, newEdits, folderpage}), document.body)
}

function ImageEditor(state){
  const images = state.folderpage ? store.folders[state.folderpage] : store.fetchedSubredditImages
  const image = getImageFromId(state.imageId, images)
  const imageSrc = safeGetImageSrc(image)
  const imageEditsAsCssString = convertImageEditsToCssString(image.edits, state.newEdits)

  return html`
    <main id="app" class="imageEditorPage">
        ${Nav({...state, image})}
        <div class="imageContainer">
          ${Handles()}
          <img src=${imageSrc} style=${imageEditsAsCssString} class="imageToBeEdited" />
        </div>
      </main>   
  `
}

function addCropperStylesheet(){
  if($('#cropperStylesheet')) return
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('id', 'cropperStylesheet')
  link.setAttribute('href', 'https://unpkg.com/js-cropper@1.0.1/dist/Cropper.css')
  document.head.appendChild(link)
}

export {
  loadImageEditor,
  updateImageEditPage,
}