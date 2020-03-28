import { h, patch } from '../web_modules/superfine.js'

import {$, setPageTitle} from '../utils.js'

function loadFolderPage({folder}){
  setPageTitle(`RPO - Folders`)
  const showDialog = false
  patch($('#app'), FolderPage(folder, showDialog))
}

function FolderPage(folder, showDialog){
}

export {
  loadFolderPage
}