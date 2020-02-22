import html from './web_modules/yo-yo.js'
import localforage from './web_modules/localforage.js'

import {emitter} from './state.js'

localforage.config({
  name: 'Reddit Pictures Organiser'
})
localforage.setItem('key', 'valueww').catch(err => console.error(err))

function list (items) {
  return html`<ul>
    ${items.map(function (item) {
      return html`<button onmouseup=${ () => emitter.emit('add-subreddit', item) }>${item}</button>`
    })}
  </ul>`
}
const el = list([
  'grizzly',
  'polar',
  'brown'
])

document.querySelector('#app').appendChild(el)
console.log('asd')