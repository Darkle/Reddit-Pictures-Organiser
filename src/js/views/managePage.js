import { h, patch } from '../web_modules/superfine.js'
import htm from '../web_modules/htm.js'

import {store} from '../store/store.js'
import { $, setPageTitle } from '../utils.js'

const html = htm.bind(h)

const managePage = state => html`

`

function loadManagePage() {
  setPageTitle('RPO - Manage Subs')
  patch($('#app'), managePage(store))
}

export {
  loadManagePage
}