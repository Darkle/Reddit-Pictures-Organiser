import { h, patch } from '../web_modules/superfine.js'

import {$, setPageTitle} from '../utils.js'
import { router } from '../router.js'
import {store} from '../store/store.js'
import { logger } from '../logger.js'

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

  return h('main', {class: 'foldersPage'}, [
    Nav(),
    h('div', {class: 'foldersContainer'}, 
      getFolders().map(folder => 
        h('div', {class:'folder'}, [
          h('div', {class: 'folderName'}, folder),
          h('div', {class: 'folderImageCount'} , Object.keys(folder).length)
        ])  
      )
    ),
    Dialog(showDialog)
  ])
}

function PlaceHolder() {
  return h('main', {class: 'foldersPage'}, [
    Nav(),
    h('div', {class: 'foldersPlaceholder'}, 
      h('p', 'No folders yet. Use Plus icon top right to create a folder.'),
      h('p', 'You can also create folders from the image viewer page. Just tap on an image and options will show up for you to add an image to a folder or create a new folder to add the image to.'),
    ),
  ])
}

function Nav(){ // eslint-disable-line max-lines-per-function
  return h('nav', {class: 'navWrapper'}, [
    h('div', {class:'home', onmouseup: () => router.navigate('/')}, 'Home'),
    h('div', {class:'folders'}, 'Folders'),
    h('div', {class:'createFolderIcon', onmousedown: showCreateFolderDialog}, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 24, // eslint-disable-line no-magic-numbers
        height: 24, // eslint-disable-line no-magic-numbers
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'feather feather-plus',
      }, [
        h('line', {x1: 12, y1: 5, x2: 12, y2: 19}), // eslint-disable-line no-magic-numbers
        h('line', {x1: 5, y1: 12, x2: 19, y2: 12}), // eslint-disable-line no-magic-numbers
      ])
    ]),
  ])

}

function Dialog(showDialog){
  // There is a bug atm with chrome and html prop autofocus when using url hash/fragment https://crbug.com/1046357
  setTimeout(() => $('dialog input').focus(), halfSecondInMs)
  return h('dialog', {open: showDialog, on: true}, [
    h('input', {onkeyup: createNewFolder}),
    h('menu', {}, [
      h('button', {onmouseup: updatePage}, 'Cancel'),
      h('button', {onmouseup: createNewFolder}, 'Create Folder'),
    ])
  ])
}

function createNewFolder(event){
  const newFolderName = $('dialog input').value.trim()
  
  if(event.key !== 'Enter' || !newFolderName.length) return
  
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