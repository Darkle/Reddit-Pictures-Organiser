import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import { router } from '../router.js'
import { $, setPageTitle,  noop } from '../utils.js'

const html = htm.bind(h)

const managePage = (subreddits, showConfirmRemoveSubDialog = false) => // eslint-disable-line max-lines-per-function
  html`
    <main id="app" class="managePage">
      <div class="manageWrapper">
        <div class="home" onmouseup=${ () => router.navigate('/')}>Home</div>
        <div class="manage" >Manage</div>
      </div>
      <div class="inputsContainer">
        <div class="addSubInputContainer">
          <label for="addSubredditInput">Add Subreddit</label>
          <input type="text" id="addSubredditInput" class="addSubredditInput" 
            onkeyup=${addSubreddit} autocomplete="off"/>
        </div>
        <div class="removeSubInputContainer">
          <label for="removeSubredditInput">Remove Subreddit</label>
          <input type="text" id="removeSubredditInput" class="removeSubredditInput" list="subredditList" autocomplete="off"
           />
          <datalist id="subredditList" onmouseup="${selectSubredditToRemove}">
            ${subreddits.map(subreddit => html`<option onblur="${selectSubredditToRemove}">${subreddit}</option>`)}
          </datalist>
          <dialog open=${showConfirmRemoveSubDialog}>
            <label>Are you sure you want to remove the ${$('#removeSubredditInput')?.value} subreddit?</label>
            <menu>
              <button onmouseup="${cancelRemove}">Cancel</button>
              <button onmouseup="${removeSubreddit}">Remove</button>
            </menu>
          </dialog>      
        </div>
      </div>  
    </main>
  `

function addSubreddit(event){
  if(event.key !== 'Enter') return
  store.addSubreddit(event.target.value)
  event.target.value = '' // eslint-disable-line functional/immutable-data
  patch($('#app'), managePage(store.subreddits))
}

function selectSubredditToRemove(event){
console.log('selectSubredditToRemove', event)
console.log(document.activeElement)
  // if(event.key !== 'Enter') return
  // const showConfirmRemoveSubDialog = true
  // patch($('#app'), managePage(store.subreddits, showConfirmRemoveSubDialog))
}

function removeSubreddit(){
  store.removeSubreddit($('#removeSubredditInput').value)
  $('#removeSubredditInput').value = '' // eslint-disable-line functional/immutable-data
  patch($('#app'), managePage(store.subreddits))
}

function cancelRemove(){
  $('#removeSubredditInput').value = '' // eslint-disable-line functional/immutable-data
  patch($('#app'), managePage(store.subreddits))
}

function loadManagePage() {
  setPageTitle('RPO - Manage Subs')
  patch($('#app'), managePage(store.subreddits))
}

export {
  loadManagePage
}