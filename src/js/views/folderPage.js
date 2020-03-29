import {html, render} from '../web_modules/lit-html.js'

import {$, setPageTitle} from '../utils.js'

function loadFolderPage({folderpage}){
  setPageTitle(`RPO - Folders`)
  const showDialog = false
  // @ts-ignore
  render(FolderPage(folder, showDialog), $('#app'))
}

function FolderPage(folder, showDialog){
}

export {
  loadFolderPage
}