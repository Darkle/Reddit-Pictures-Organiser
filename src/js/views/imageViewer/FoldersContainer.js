import { h } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

import { getFolders } from '../foldersPage.js'
import { toggleFolders } from './Nav.js'
import { store } from '../../store/store.js'
import { $ } from '../../utils.js'
import { logger } from '../../logger.js'

const html = htm.bind(h)

function FoldersContainer(currentImage){
  logger.debugForProxys(store.folders)
  return html`
    <div class="foldersContainer">
    ${getFolders().map(folder =>
        html`<div class="folder" onmouseup=${() => addImageToFolder(folder, currentImage)}>
            <div class="folderName">${folder}</div>
            <div class="folderImageCount">${Object.keys(folder).length}</div>
          </div>`
      )}
    </div>  
  `
}

function addImageToFolder(folder, currentImage){
  store.addImageToFolder(folder, currentImage)
  toggleFolders()
  showFolderToast()
  logger.debugForProxys(store.folders)
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