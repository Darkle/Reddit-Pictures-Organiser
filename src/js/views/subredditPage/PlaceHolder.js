import { h } from '../../web_modules/superfine.js'
import htm from '../../web_modules/htm.js'

import { Nav } from './Nav.js'

const html = htm.bind(h)

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