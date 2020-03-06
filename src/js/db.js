import localforage from './web_modules/localforage.js'

import {appState} from './appState.js'

localforage.config({
  name: 'Reddit Pictures Organiser'
})

function init(){
  return localforage.iterate((value, key) => {
    appState[key] = value
  })
}
export {
  init
}