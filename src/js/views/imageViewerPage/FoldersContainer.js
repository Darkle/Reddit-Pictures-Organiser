import { h, patch } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

import { getFolders } from '../foldersPage.js'
import { toggleFolders } from './Nav.js'
import { store } from '../../store/store.js'
import { $ } from '../../utils.js'
import { logger } from '../../logger.js'
import { ImageViewer, swiper } from './imageViewerPage.js'

const html = htm.bind(h)

function FoldersContainer(subreddit, timefilter){
  logger.debug(store.folders)

  return html`
    <div class="foldersContainer">
      <div class="addToNewFolderContainer">
        <label for="addImageToNewFolder">Add To New Folder</label>
        <input type="text" id="addImageToNewFolder" class="addImageToNewFolder" onkeyup=${event => addImageToNewFolder(event, subreddit, timefilter)} autocomplete="off"/>
      </div>
      <label>Add To Existing Folder</label>
      <div class="existingFoldersContainer">
        ${getFolders().map(folder => html`
            <div class="folder" onmouseup=${() => addImageToFolder(folder)}>
              <div class="folderName">${folder}</div>
              <div class="folderImageCount">${Object.keys(folder).length}</div>
            </div>
        `)}
      </div>
    </div>  
  `
}

function addImageToFolder(folder){
  store.addImageToFolder(folder, store.fetchedSubredditImages[swiper.activeIndex])
  toggleFolders()
  showFolderToast()
  logger.debug(store.folders)
}

function addImageToNewFolder({target: input, key}, subreddit, timefilter){
  const newFolderName = input.value.trim()
  
  if(key !== 'Enter' || !newFolderName.length) return

  const {id:imageId} = store.fetchedSubredditImages[swiper.activeIndex]
  
  store.createFolder(newFolderName)
  addImageToFolder(newFolderName)
  patch($('#app'), ImageViewer(subreddit, timefilter, imageId, swiper.activeIndex))
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