import { h, patch } from '../web_modules/superfine.js'

import {store} from '../store/store.js'
import { router } from '../router.js'
import { $, setPageTitle } from '../utils.js'

const threeSecondsInMS = 3000
const tenSecondsInMS = 10000

function loadManagePage() {
  setPageTitle('RPO - Manage Subs')
  patch($('#app'), ManagePage(store.subreddits))
  showWelcomeMessageIfNew()
}

function ManagePage(subreddits, showConfirmRemoveSubDialog = false){
  return h('main', {id: 'app', class: 'managePage'}, [
    Nav(),
    h('div', {class: 'inputsContainer'}, [
      AddSub(),
      RemoveSub(subreddits, showConfirmRemoveSubDialog)
    ])
  ])
}

function Nav(){
  return h('nav', {class: 'navWrapper'}, [
    h('div', {class: 'home', onmouseup: () => router.navigate('/')}, 'Home'),
    h('div', {class: 'manage', onmouseup: () => router.navigate('/')}, 'Manage'),
  ])
}

function AddSub() {
  return h('div', {class: 'addSubInputContainer'}, [
    h('label', {for: 'addSubredditInput'}, 'Add Subreddit'),
    h('input', {type: 'text', id: 'addSubredditInput', class: 'addSubredditInput', onkeyup: addSubreddit, autocomplete: 'off'}, 'Add Subreddit'),
  ])
}

function RemoveSub(subreddits, showConfirmRemoveSubDialog) {
  return h('div', {class: 'removeSubInputContainer'}, [
    h('label', {for: 'removeSubredditInput'}, 'Remove Subreddit'),
    h('input', {
      type: 'text', 
      id: 'removeSubredditInput', 
      class: 'removeSubredditInput', 
      list: 'subredditList', 
      autocomplete: 'off',
      onchange: onChangeSelectSubredditToRemove,
      onmouseup: onMouseUpSelectSubredditToRemove,
    }),
    h('datalist', {id: 'subredditList'}, 
      subreddits.map(subreddit => h('option', {}, subreddit))
    ),
    Dialog(showConfirmRemoveSubDialog),
    ...Toast()
  ])
}

function Dialog(showConfirmRemoveSubDialog){
  return h('dialog', {open: showConfirmRemoveSubDialog}, [
    h('label', {}, `Are you sure you want to remove the ${$('#removeSubredditInput')?.value} subreddit?`),
    h('menu', {}, [
      h('button', {onmouseup: cancelRemove}, 'Cancel'),
      h('button', {onmouseup: removeSubreddit}, 'Remove'),
    ])
  ])
}

function Toast(){
  return [
    h('div', {class: 'toast subAddedToast'}, 'Subreddit Added'),
    h('div', {class: 'toast subRemovedToast'}, 'Subreddit Removed'),
    h('div', {class: 'toast welcomeToast'}, [
      h('p', {}, 'Welcome To Reddit Pictures Organiser'),
      h('p', {}, 'Please Add A Subreddit (e.g. Cats) To Get Started'),
    ]),
  ]
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
  if(event.key === 'Enter'){
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