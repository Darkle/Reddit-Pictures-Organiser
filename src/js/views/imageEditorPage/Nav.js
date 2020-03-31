import {html} from '../../web_modules/lit-html.js'

import { router } from '../../router.js'
import { cropImage, rotateLeft, rotateRight, saveEdits, cancelEditsOnNavAway, shrink, enlarge} from './editing.js'

function Nav(state){ // eslint-disable-line max-lines-per-function
  return html`
    <nav>
      <div class="back" @mouseup=${() => handleBackNavigation(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" 
            fill="none" stroke="#fff4e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"></path>
        </svg> 
      </div>      
      <div class="crop" @mouseup=${() => cropImage(state)}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="#fff4e8" d="M7,17V1H5V5H1V7H5V17A2,2 0 0,0 7,19H17V23H19V19H23V17M17,15H19V7C19,5.89 18.1,5 17,5H9V7H17V15Z" />
        </svg>        
      </div>
      <div class="rotateLeft" @mouseup=${() => rotateLeft(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" 
            fill="none" stroke="#fff4e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
      </svg>       
    </div>
    <div class="rotateRight" @mouseup=${() => rotateRight(state)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" 
          fill="none" stroke="#fff4e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
      </svg>      
    </div>
    <div class="shrink" @mouseup=${() => shrink(state)}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" 
          viewBox="0 0 64 80" width="30" height="30" xml:space="preserve">
        <polyline class="st0" points="48,36 36,36 36,48 " />
        <rect x="8" y="8" class="st0" width="48" height="48" />
        <line class="st0" x1="36" y1="36" x2="48" y2="48" />
        <polyline class="st0" points="16,28 28,28 28,16 " />
        <line class="st0" x1="28" y1="28" x2="16" y2="16" />
      </svg>    
    </div>
    <div class="shrink" @mouseup=${() => enlarge(state)}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" 
          x="0px" y="0px" width="30" height="30" viewBox="0 0 64 80" xml:space="preserve">
        <polyline class="st0" points="36,48 48,48 48,36 " />
        <polyline class="st0" points="28,16 16,16 16,28 " />
        <rect x="8" y="8" class="st0" width="48" height="48" />
        <line class="st0" x1="16" y1="16" x2="28" y2="28" />
        <line class="st0" x1="48" y1="48" x2="36" y2="36" />
      </svg> 
    </div>
    <div class="save" @mouseup=${() => saveEdits(state)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff4e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>     
    </div>
    </nav>  
    `
}

function handleBackNavigation({subreddit, timefilter, imageId, folderpage}){
  const navigationUrl = !folderpage ? `/sub/${subreddit}/${timefilter}/imageviewer/${imageId}` 
    : `/folders/${folderpage}/imageviewer/${imageId}`
  cancelEditsOnNavAway()

  router.navigate(navigationUrl)  
}

export {
  Nav
}