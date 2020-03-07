import localforage from '../web_modules/localforage.js'

import {store} from './store.js'

localforage.config({
  name: 'Reddit Pictures Organiser'
})

function init(){
  return localforage.iterate((value, key) => {
    store[key] = value
  })
}
export {
  init
}