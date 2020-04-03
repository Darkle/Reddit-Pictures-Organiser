import {html} from '../../web_modules/lit-html.js'

import { toggleFolders } from './Nav.js'
import { store } from '../../store/store.js'
import { $, getFolders } from '../../utils.js'
import { logger } from '../../logger.js'
import { swiper } from './imageViewerPage.js'

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
            <div class="folder" @mouseup=${() => addImageToFolder(folder, state.folderpage)}>
              <div class="folderName">${folder}</div>
              <div class="folderImageCount">${store.folders[folder].length}</div>
            </div>
        `)}
      </div>
    </div>  
  `
}

function addImageToFolder(folder, isFolderPage){
  const images = isFolderPage ? store.folders[isFolderPage] : store.fetchedSubredditImages
  store.addImageToFolder(folder, images[swiper.activeIndex])
  toggleFolders()
  showFolderToast()
  logger.debug(store.folders)
}

function addImageToNewFolder({target: input, key}, {folderpage}){ // eslint-disable-line max-statements
  const newFolderName = input.value.trim()
  if(key !== 'Enter' || !newFolderName.length) return
  
  const images = folderpage ? store.folders[folderpage] : store.fetchedSubredditImages
  
  store.createFolder(newFolderName)
  store.addImageToFolder(newFolderName, images[swiper.activeIndex])
  toggleFolders()
  showFolderToast()
  logger.debug(store.folders)
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