import {html, render} from '../web_modules/lit-html.js'

import {$, setPageTitle} from '../utils.js'

function loadFolderPage({folder}){
  setPageTitle(`RPO - Folders`)
  const showDialog = false
  render( FolderPage(folder, showDialog), $('#app'))
}

function FolderPage(folder, showDialog){
}

export {
  loadFolderPage
}