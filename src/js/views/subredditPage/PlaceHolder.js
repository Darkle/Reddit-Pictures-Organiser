import {html} from '../../web_modules/lit-html.js'

import { Nav } from './Nav.js'

function PlaceHolder(timefilter, showLoadingPlaceholder, subreddit){
  return html`
    <main id="app" class="subredditPage">
      <div>
        ${Nav(timefilter, subreddit)}
        <div class="subredditImagesContainer">
          <div class="subLoadingNotifier">${showLoadingPlaceholder ? 'Loading Images...' : 'No Images Found'}</div>
        </div>    
      </div>
    </main>
  `
}

export {
  PlaceHolder
}