import {html, render} from '../../web_modules/lit-html.js'

import { toggleFolders } from './Nav.js'
import { store } from '../../store/store.js'
import { $, getFolders } from '../../utils.js'
import { logger } from '../../logger.js'
import { ImageViewer } from './imageViewerPage.js'

function FoldersContainer(state){
  logger.debug(store.folders)

  return html`
    <div class="foldersContainer">
      <div class="addToNewFolderContainer">
        <label for="addImageToNewFolder">Add To New Folder</label>
        <input type="text" id="addImageToNewFolder" class="addImageToNewFolder" 
            @keyup=${event => addImageToNewFolder(event, state)} autocomplete="off"/>
      </div>
      <label>Add To Existing Folder</label>
      <div class="existingFoldersContainer">
        ${getFolders().map(folder => html`
            <div class="folder" @mouseup=${() => addImageToFolder(folder, state)}>
              <div class="folderName">${folder}</div>
              <div class="folderImageCount">${store.folders[folder].length}</div>
            </div>
        `)}
      </div>
    </div>  
  `
}

function getSwiperActiveIndex(){
  return Number($('.swiper-slide-active img').dataset.index)
}

function addImageToFolder(folder, {subreddit, timefilter, imageId, folderpage}){
  const images = folderpage ? store.folders[folderpage] : store.fetchedSubredditImages
  store.addImageToFolder(folder, images[getSwiperActiveIndex()])
  toggleFolders()
  showFolderToast()
  logger.debug(store.folders)
  // @ts-ignore
  render(ImageViewer({subreddit, timefilter, imageId, folderpage, startingImageIndex: getSwiperActiveIndex()}), document.body)
}

function addImageToNewFolder({target: input, key}, state){ // eslint-disable-line max-statements
  const newFolderName = input.value.trim()
  if(key !== 'Enter' || !newFolderName.length) return
  
  store.createFolder(newFolderName)
  addImageToFolder(newFolderName, state)
}

function showFolderToast(){
  const toggleToastClass = () => $(`.imageViewerPage .notifyAddedImageToFolder`)?.classList.toggle('showToast')
  toggleToastClass()
  const threeSecondsInMS = 3000
  setTimeout(toggleToastClass, threeSecondsInMS)
}

export {
  FoldersContainer
}