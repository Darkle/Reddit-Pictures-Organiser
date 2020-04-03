import {html} from '../../web_modules/lit-html.js'

import {curryRight, safeGetImageSrc} from '../../utils.js'
import { initialImagePreloads } from './preload.js'

function Image(image, index, state){
  const isStartingImage = index === state.startingImageIndex
  const onImgLoad = curryRight(initialImagePreloads)(state)
  const imgSrc = safeGetImageSrc(image)
  /*****
    For some reason the lit-html conditional bind to attributes doesnt work for `src` - maybe cause its not a boolean attribute?
    So gonna conditionaly render the whole img element. Otherwise we would get onerror called for empty src image loads.
    https://lit-html.polymer-project.org/guide/writing-templates#bind-to-attributes
  *****/  
  return isStartingImage ?
    html`<img data-index=${index} @load=${onImgLoad} @error=${onImgLoad} src=${imgSrc} />`
      : html`<img data-index=${index} @load=${onImgLoad} @error=${onImgLoad} />`
}

export {
  Image 
}