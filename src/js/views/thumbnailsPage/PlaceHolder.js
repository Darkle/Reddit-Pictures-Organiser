import {html} from '../../web_modules/lit-html.js'

import { Nav } from './Nav.js'

function PlaceHolder(state){
  return html`
    <main id="app" class="thumbnailPage">
      ${Nav(state)}
      <div class="thumbnailsImagesContainer">
        <div class="subLoadingNotifier">${state.showLoadingPlaceholder ? 'Loading Images...' : 'No Images Found'}</div>
      </div>    
    </main>
  `
}

export {
  PlaceHolder
}