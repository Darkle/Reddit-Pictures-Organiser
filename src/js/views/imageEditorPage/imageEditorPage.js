import {html, render} from '../../web_modules/lit-html.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'

import { $, setPageTitle, getImageFromId } from '../../utils.js'
import {Nav} from './Nav.js'
import { edits } from './editing.js'
const three60Degrees = 360

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
  const imageSrc = image.src || image.url

  return html`
    <main id="app" class="imageEditorPage">
        ${Nav(state)}
        <img src=${imageSrc} style=${generateEdits(image.edits, state.newEdits)} class="imageToBeEdited" />
    </main>   
  `
}

function generateEdits(storedEdits, newEdits){
  return (!newEdits && !storedEdits) ? '' : editsToString(storedEdits, newEdits)
}
/*****
  On the first render of image edit page, newEdits will be null, so we use what's stored.
  Otherwise we use the newEdits. We pass on the stored edits to editing.js too on first run 
  with edits.updateRotateVal etc.
*****/
function editsToString(storedEdits, newEdits){ // eslint-disable-line complexity
  const rotateVal = (newEdits?.rotateVal ?? 0) || (storedEdits?.rotateVal ?? 0) 
  edits.updateRotateVal(rotateVal)
  // TODO: crop and shrink - prolly check if empty obj for those??
  const rotateAngle = imageRightSideUp(rotateVal) ? '' : `transform: rotate(${rotateVal}deg);` 
  // return `${rAngle}${cropImg}${sImage}`
  return `${rotateAngle}`
}

function imageRightSideUp(rotateVal){
  return (rotateVal === 0 || (rotateVal % three60Degrees) === 0)
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