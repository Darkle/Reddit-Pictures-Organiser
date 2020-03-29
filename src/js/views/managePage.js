import {html, render} from '../web_modules/lit-html.js'

import {store} from '../store/store.js'
import { router } from '../router.js'
import { $, setPageTitle } from '../utils.js'

const threeSecondsInMS = 3000
const tenSecondsInMS = 10000

function loadManagePage() {
  setPageTitle('RPO - Manage Subs')
  // @ts-ignore
  render(ManagePage(store.subreddits), document.body)
  showWelcomeMessageIfNew()
}

function ManagePage(subreddits, showConfirmRemoveSubDialog = false){
  return html`
    <main id="app" class="managePage">
      ${Nav()}
      <div class="inputsContainer">
        ${AddSub()}
        ${RemoveSub(subreddits, showConfirmRemoveSubDialog)}
      </div>  
    </main>
    `
}

function Nav(){
  return html`
    <nav class="navWrapper">
      <div class="home" @mouseup=${ () => router.navigate('/')}>Home</div>
      <div class="manage" >Manage</div>
    </nav>  
  `
}

function AddSub() {
  return html `
    <div class="addSubInputContainer">
      <label for="addSubredditInput">Add Subreddit</label>
      <input type="text" id="addSubredditInput" class="addSubredditInput" 
          @keyup=${addSubreddit} autocomplete="off"/>
    </div>  
  `
}

function RemoveSub(subreddits, showConfirmRemoveSubDialog) {
  return html `
    <div class="removeSubInputContainer">
      <label for="removeSubredditInput">Remove Subreddit</label>
      <input type="text" id="removeSubredditInput" class="removeSubredditInput" list="subredditList" autocomplete="off"
          @change=${onChangeSelectSubredditToRemove} @mouseup=${onMouseUpSelectSubredditToRemove} />
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
    <dialog ?open=${showConfirmRemoveSubDialog} >
      <label>Are you sure you want to remove the ${$('#removeSubredditInput')?.value} subreddit?</label>
      <menu>
        <button @mouseup=${cancelRemove}>Cancel</button>
        <button @mouseup=${removeSubreddit}>Remove</button>
      </menu>
    </dialog>  
  `
}

function Toast(){
  return html`
    <div class="toast subAddedToast">Subreddit Added</div>
    <div class="toast subRemovedToast">Subreddit Removed</div>  
    <div class="toast welcomeToast">
      <p>Welcome To Reddit Pictures Organiser</p>
      <p>Please Add A Subreddit (e.g. Cats) To Get Started</p>
    </div>  
  `
}

function addSubreddit(event){
  if(event.key !== 'Enter' || inputIsEmpty(event.target)) return
  store.addSubreddit(event.target.value)
  resetInputs()
  // @ts-ignore
  render(ManagePage(store.subreddits), document.body)
  toggleToast('subAddedToast')
}

function onChangeSelectSubredditToRemove(event){
  if(inputIsEmpty(event.target)) return
  const showConfirmRemoveSubDialog = true
  // @ts-ignore
  render(ManagePage(store.subreddits, showConfirmRemoveSubDialog), document.body)
}

function onMouseUpSelectSubredditToRemove(event){
  if(inputIsEmpty(event.target)) return  
  const showConfirmRemoveSubDialog = true
  if(event.key === 'Enter'){
    // @ts-ignore
    render(ManagePage(store.subreddits, showConfirmRemoveSubDialog), document.body)
  }
}

function removeSubreddit(){
  store.removeSubreddit($('#removeSubredditInput').value)
  resetInputs()
  // @ts-ignore
  render(ManagePage(store.subreddits), document.body)
  toggleToast('subRemovedToast')
}

function cancelRemove(){
  resetInputs()
  // @ts-ignore
  render(ManagePage(store.subreddits), document.body)
}

function inputIsEmpty(inputElem){
  return !inputElem.value.trim().length
}

function resetInputs(){
  $('#addSubredditInput').value = '' // eslint-disable-line functional/immutable-data
  $('#removeSubredditInput').value = '' // eslint-disable-line functional/immutable-data
}

function toggleToast(toastSelector, classToToggle = 'showToast', delay = threeSecondsInMS){
  $(`.${toastSelector}`)?.classList.toggle(classToToggle) // eslint-disable-line no-unused-expressions
  setTimeout(() => $(`.${toastSelector}`)?.classList.toggle(classToToggle), delay)
}

function showWelcomeMessageIfNew(){
  if(localStorage.getItem('returningUser')) return
  localStorage.setItem('returningUser', 'yes')
  toggleToast('welcomeToast', 'showWelcomeToast', tenSecondsInMS)
}

export {
  loadManagePage
}