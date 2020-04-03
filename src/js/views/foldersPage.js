import {html, render} from '../web_modules/lit-html.js'

import {$, setPageTitle, getFolders, noFolders} from '../utils.js'
import { router } from '../router.js'
import {store} from '../store/store.js'
import { logger } from '../logger.js'

const halfSecondInMs = 500

function loadFoldersPage(){
  setPageTitle(`RPO - Folders`)
  updatePage()
}

function updatePage(showDialog = false){
  // @ts-ignore
  render(FoldersPage(showDialog), document.body)
}

function FoldersPage(showDialog){
  if(noFolders()) return PlaceHolder(showDialog)
  
  return html`
    <main id="app" class="foldersPage">
      ${Nav()}
      <div class="foldersContainer">
        ${getFolders().map(folder => html`
          <div class="folder" @mouseup=${ () => router.navigate(`/folders/${folder}`)}>
            <div class="folderName">${folder}</div>
            <div class="folderImageCount">${store.folders[folder].length}</div>
          </div>
      `)}
      </div>
      ${showDialog ? Dialog() : ''}
    </main>    
    `  
}

function PlaceHolder(showDialog) {
  return html`
    <main id="app" class="foldersPage">
      ${Nav()}
      <div class="foldersPlaceholder">
        <p>
          No folders yet. Use plus icon top right to create a folder. 
        </p>
        <p>
          You can also create folders from the image viewer page. Just tap on an image and options will show up for you to add an image to a folder or create a new folder to add the image to.
        </p>
      </div>
      ${showDialog ? Dialog() : ''}
    </main>    
    `    
}

function Nav(){
  return html `
    <nav class="navWrapper">
      <div class="home" @mouseup=${ () => router.navigate('/')}>Home</div>
      <div class="folders">Folders</div>
      <div class="createFolderIcon" @mouseup=${showCreateFolderDialog} >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    </nav> 
  `
}

function Dialog(){
  // There is a bug atm with chrome and html prop autofocus when using url hash/fragment https://crbug.com/1046357
  setTimeout(() => $('dialog input').focus(), halfSecondInMs)
  return html `
    <dialog open="true" on>
      <input @keyup=${createNewFolder}></input>
      <menu>
        <button @mouseup=${() => updatePage()}>Cancel</button>
        <button @mouseup=${createNewFolder}>Create Folder</button>
      </menu>
    </dialog>  
  `
}

function createNewFolder(event){ // eslint-disable-line complexity
  const newFolderName = $('dialog input').value.trim()
  
  if((event.key && event.key !== 'Enter') || (event.key === 'Enter' && !newFolderName.length)) return
  
  store.createFolder(newFolderName)
  logger.debug(`${newFolderName} folder created`)
  updatePage()
}

function showCreateFolderDialog(){
  const showDialog = true
  updatePage(showDialog)
}

export {
  loadFoldersPage,
}