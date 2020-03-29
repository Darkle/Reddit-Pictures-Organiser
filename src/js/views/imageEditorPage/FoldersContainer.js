import {html} from '../../web_modules/lit-html.js'

import { store } from '../../store/store.js'
import { getCurrentImage, getFolders } from '../../utils.js'
import { logger } from '../../logger.js'
import { updateImageEditPage } from './imageEditorPage.js'

function FoldersContainer(subreddit, timefilter, imageId){
  logger.debug(store.folders)

  return html`
    <div class="foldersContainer">
      <div class="addToNewFolderContainer">
        <label for="addImageToNewFolder">Add To New Folder</label>
        <input type="text" id="addImageToNewFolder" class="addImageToNewFolder" 
            @keyup=${event => addImageToNewFolder(event, subreddit, timefilter, imageId)} autocomplete="off"/>
      </div>
      <label>Add To Existing Folder</label>
      <div class="existingFoldersContainer">
        ${getFolders().map(folder => html`
            <div class="folder" @mouseup=${() => addImageToFolder(folder, subreddit, timefilter, imageId)}>
              <div class="folderName">${folder}</div>
              <div class="folderImageCount">${Object.keys(folder).length}</div>
            </div>
        `)}
      </div>
    </div>  
  `
}

function addImageToFolder(folder, subreddit, timefilter, imageId){
  store.addImageToFolder(folder, getCurrentImage(imageId))
  logger.debug(store.folders)
  updateImageEditPage({subreddit, timefilter, imageId, showFolders: false})
}

function addImageToNewFolder({target: input, key}, subreddit, timefilter, imageId){
  const newFolderName = input.value.trim()
  
  if(key !== 'Enter' || !newFolderName.length) return

  store.createFolder(newFolderName)
  addImageToFolder(newFolderName)
  updateImageEditPage({subreddit, timefilter, imageId, showFolders: false})
}

export {
  FoldersContainer
}