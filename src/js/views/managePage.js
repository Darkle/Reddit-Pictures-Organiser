import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import { router } from '../router.js'
import { $, setPageTitle } from '../utils.js'

const html = htm.bind(h)

function loadManagePage() {
  setPageTitle('RPO - Manage Subs')
  patch($('#app'), ManagePage(store.subreddits))
}

function ManagePage(subreddits, showConfirmRemoveSubDialog = false){
  // This page seems to need an extra div container for some reason, otherwise superfine patch blows up.
  return html`
    <main id="app" class="managePage">
      <div>
        ${Nav()}
        <div class="inputsContainer">
          ${AddSub()}
          ${RemoveSub(subreddits, showConfirmRemoveSubDialog)}
        </div>  
      </div>  
    </main>
    `
}

function Nav(){
  return html`
    <nav class="navWrapper">
      <div class="home" onmouseup=${ () => router.navigate('/')}>Home</div>
      <div class="manage" >Manage</div>
    </nav>  
  `
}

function AddSub() {
  return html `
    <div class="addSubInputContainer">
      <label for="addSubredditInput">Add Subreddit</label>
      <input type="text" id="addSubredditInput" class="addSubredditInput" 
      onkeyup=${addSubreddit} autocomplete="off"/>
    </div>  
  `
}

function RemoveSub(subreddits, showConfirmRemoveSubDialog) {
  return html `
    <div class="removeSubInputContainer">
      <label for="removeSubredditInput">Remove Subreddit</label>
      <input type="text" id="removeSubredditInput" class="removeSubredditInput" list="subredditList" autocomplete="off"
      onchange=${onChangeSelectSubredditToRemove} onmouseup=${onMouseUpSelectSubredditToRemove} />
      <datalist id="subredditList">
        ${subreddits.map(subreddit => html`<option>${subreddit}</option>`)}
      </datalist>
      ${Dialog(showConfirmRemoveSubDialog)}
      ${Toast()}
    </div>  
  `
}

function Dialog(showConfirmRemoveSubDialog){
  return html `
    <dialog open=${showConfirmRemoveSubDialog} >
      <label>Are you sure you want to remove the ${$('#removeSubredditInput')?.value} subreddit?</label>
      <menu>
        <button onmouseup=${cancelRemove}>Cancel</button>
        <button onmouseup=${removeSubreddit}>Remove</button>
      </menu>
    </dialog>  
  `
}

function Toast(){
  return html`
    <div class="toast subAddedToast">Subreddit Added</div>
    <div class="toast subRemovedToast">Subreddit Removed</div>  
  `
}

function addSubreddit(event){
  if(event.key !== 'Enter' || inputIsEmpty(event.target)) return
  store.addSubreddit(event.target.value)
  resetInputs()
  patch($('#app'), ManagePage(store.subreddits))
  toggleToast('subAddedToast')
}

function onChangeSelectSubredditToRemove(event){
  if(inputIsEmpty(event.target)) return
  const showConfirmRemoveSubDialog = true
  patch($('#app'), ManagePage(store.subreddits, showConfirmRemoveSubDialog))
}

function onMouseUpSelectSubredditToRemove(event){
  if(inputIsEmpty(event.target)) return  
  const showConfirmRemoveSubDialog = true
  if(event.key === 'Enter'){ // eslint-disable-line functional/no-conditional-statement
    patch($('#app'), ManagePage(store.subreddits, showConfirmRemoveSubDialog))
  }
}

function removeSubreddit(){
  store.removeSubreddit($('#removeSubredditInput').value)
  resetInputs()
  patch($('#app'), ManagePage(store.subreddits))
  toggleToast('subRemovedToast')
}

function cancelRemove(){
  resetInputs()
  patch($('#app'), ManagePage(store.subreddits))
}

function inputIsEmpty(inputElem){
  return !inputElem.value.trim().length
}

function resetInputs(){
  $('#addSubredditInput').value = '' // eslint-disable-line functional/immutable-data
  $('#removeSubredditInput').value = '' // eslint-disable-line functional/immutable-data
}

function toggleToast(toastSelector){
  $(`.${toastSelector}`)?.classList.toggle('showToast') // eslint-disable-line no-unused-expressions
  const threeSecondsInMS = 3000
  setTimeout(() => $(`.${toastSelector}`)?.classList.toggle('showToast'), threeSecondsInMS)
}

export {
  loadManagePage
}