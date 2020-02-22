import html from './web_modules/yo-yo.js'
import localforage from './web_modules/localforage.js'

import {emitter} from './state.js'

localforage.config({
  name: 'Reddit Pictures Organiser'
})

// localforage.getItem('subreddits').then(subs => {
//   if(!subs?.length){
//     // show management thing
//   }
//   else{
//     // show frontpage subs grid
//   }
// }).catch(myLogger)

const subs = [
'Aww',
'Cats',
'Puppies',
'Cute',
'RedPandas',
'AwwGifs',
'Foxes',
'HardcoreAww',
'Rabbits',
'CatGifs',
'CatsStandingUp',
'DogPictures',
'Pics',
'Photography',
'Earth',
'Space',
'GIFs',
'HDR',
'Abandoned',
'Future',
'Food',
'Animals',
'Maps',
'Art',
]

function listOfSubreddits(items) {
  return items.map((subName, index) =>
     html`
     <div class="subreddit">
     ${index < 14 ? html`<span>🌟</span>` : ''}
      <div>${subName}</div>
    </div>
  `)
}
//<div onmouseup=${ () => emitter.emit('add-subreddit', item) }>${item}</div>

function homePage(items){
  return html`
    <main class="homepage">
      <div class="manageWrapper">
        <div class="folders">Folders</div>
        <div class="manage">Manage</div>
      </div>
      ${listOfSubreddits(items)}
    </main>
  `
}

const el = homePage(subs)

document.querySelector('#app').appendChild(el)
