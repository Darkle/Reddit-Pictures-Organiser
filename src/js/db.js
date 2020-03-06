//@flow
import localforage from 'localforage'

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