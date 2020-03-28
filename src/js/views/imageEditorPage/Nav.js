import {html} from '../../web_modules/lit-html.js'

import { router } from '../../router.js'
import { $ } from '../../utils.js'
import { cropImage, rotateLeft, rotateRight, saveEdits, cancelEditsOnNavAway} from './editing.js'

function Nav(subreddit, timefilter, imageId){ // eslint-disable-line max-lines-per-function
  return html`
    <nav >
      <div class="back" @mouseup=${() => handleBackNavigation(subreddit, timefilter, imageId)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff4e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"></path>
        </svg> 
      </div>      
      <div class="crop" @mouseup=${() => cropImage(subreddit, timefilter, imageId)}>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#fff4e8" d="M7,17V1H5V5H1V7H5V17A2,2 0 0,0 7,19H17V23H19V19H23V17M17,15H19V7C19,5.89 18.1,5 17,5H9V7H17V15Z" />
        </svg>        
      </div>
      <div class="rotateLeft" @mouseup=${() => rotateLeft(subreddit, timefilter, imageId)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff4e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
      </svg>       
    </div>
    <div class="rotateRight" @mouseup=${() => rotateRight(subreddit, timefilter, imageId)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff4e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
      </svg>      
    </div>
    <div class="save" @mouseup=${saveEdits}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff4e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline>
      </svg>       
    </div>
    </nav>  
    `
}

function handleBackNavigation(subreddit, timefilter, imageId){
  cancelEditsOnNavAway()
  router.navigate(`/sub/${subreddit}/${timefilter}/imageviewer/${imageId}`)
  // superfine patch is severely broken, so need to remove a wayward text node.
  setTimeout(() => $('#app').firstChild.nextSibling.remove(), 50) // eslint-disable-line no-magic-numbers
}

export {
  Nav
}