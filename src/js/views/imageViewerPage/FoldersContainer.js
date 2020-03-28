import { h, patch } from '../../web_modules/superfine.js'

import { getFolders } from '../foldersPage.js'
import { toggleFolders } from './Nav.js'
import { store } from '../../store/store.js'
import { $ } from '../../utils.js'
import { logger } from '../../logger.js'
import { ImageViewer, swiper } from './imageViewerPage.js'

function FoldersContainer(subreddit, timefilter){ // eslint-disable-line max-lines-per-function
  logger.debug(store.folders)

  return h('div', {class: 'foldersContainer'}, [
    h('div', {class: 'addToNewFolderContainer'}, [
      h('label', {for: 'addImageToNewFolder'}, 'Add To New Folder'),
      h('input', {
        type: 'text', 
        id: 'addImageToNewFolder', 
        class: 'addImageToNewFolder', 
        autocomplete: 'off',
        onkeyup: event => addImageToNewFolder(event, subreddit, timefilter)
      }, 'Add To New Folder'),
    ]),
    h('label', {}, 'Add To Existing Folder'),
    h('div', {class: 'existingFoldersContainer'}, [
      getFolders().map(folder => 
        h('div', {class: 'folder', onmouseup: () => addImageToFolder(folder)}, [
          h('div', {class: 'folderName'}, folder),
          h('div', {class: 'folderImageCount'}, Object.keys(folder).length),
        ]),
      )
    ])
  ])
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