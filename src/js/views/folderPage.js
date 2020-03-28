import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {$, setPageTitle} from '../utils.js'

const html = htm.bind(h)

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