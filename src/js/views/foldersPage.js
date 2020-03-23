import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {$, setPageTitle} from '../utils.js'
import { router } from '../router.js'
import {store} from '../store/store.js'
import { logger } from '../logger.js'

const html = htm.bind(h)
const halfSecondInMs = 500

function loadFoldersPage(){
  setPageTitle(`RPO - Folders`)
  updatePage()
}

function updatePage(showDialog = false){
  patch($('#app'), FoldersPage(showDialog))
}

function FoldersPage(showDialog){
  if(noFolders()) return PlaceHolder()

  return html`
    <main id="app" class="foldersPage">
      ${Nav()}
      <div class="foldersContainer">
        ${getFolders().map(folder =>
          html`<div class="folder">
              <div class="folderName">${folder}</div>
              <div class="folderImageCount">${Object.keys(folder).length}</div>
            </div>`
        )}
      </div>
      ${Dialog(showDialog)}
    </main>    
    `  
}

function PlaceHolder() {
  return html`
    <main id="app" class="foldersPage">
      ${Nav()}
      <div class="foldersPlaceholder">
        <p>
          No folders yet. Use Plus icon top right to create a folder. 
        </p>
        <p>
          You can also create folders from the image viewer page. Just tap on an image and options will show up for you to add an image to a folder or create a new folder to add the image to.
        </p>
      </div>
    </main>    
    `    
}

function Nav(){
  return html `
    <nav class="navWrapper">
      <div class="home" onmouseup=${ () => router.navigate('/')}>Home</div>
      <div class="folders" onmouseup=${ () => router.navigate('/')}>Folders</div>
      <div class="createFolderIcon" onmousedown="${showCreateFolderDialog}" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    </nav> 
  `
}

function Dialog(showDialog){
  // there is a bug atm with chrome and html prop autofocus when using url hash https://git.io/JvMxg
  setTimeout(() => $('dialog input').focus(), halfSecondInMs)
  return html `
    <dialog open=${showDialog} on>
      <input onkeyup=${createNewFolder}></input>
      <menu>
        <button onmouseup=${() => updatePage()}>Cancel</button>
        <button onmouseup=${createNewFolder}>Create Folder</button>
      </menu>
    </dialog>  
  `
}

function createNewFolder(event){
  if(event.key && event.key !== 'Enter') return
  const newFolderName = $('dialog input').value.trim()
  store.createFolder(newFolderName)
  logger.debug(`${newFolderName} folder created`)
  updatePage()
  $('dialog input').value = '' // eslint-disable-line functional/immutable-data
}

function showCreateFolderDialog(){
  const showDialog = true
  updatePage(showDialog)
}

function getFolders(){
  //reversing so newly created folders are shown at the top of the page
  return [...Object.keys(store.folders)].reverse()
}

function noFolders(){
  return !getFolders().length
}

export {
  loadFoldersPage,
  getFolders,
}