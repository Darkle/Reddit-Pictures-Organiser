import {html} from '../../web_modules/lit-html.js'

import {curryRight} from '../../utils.js'
import { initialImagePreloads } from './imageViewerPage.js'
import { convertImageEditsToCssString } from '../imageEditorPage/editing.js'

function Image(image, index, state){
  const isStartingImage = index === state.startingImageIndex
  const onImgLoad = curryRight(initialImagePreloads)(state)
  const imageEdits = convertImageEditsToCssString(image.edits)
  const imgSrc = image.src || image.url
  /*****
    For some reason the lit-html conditional bind to attributes doesnt work for `src` - maybe cause its not a boolean attribute?
    So gonna conditionaly render the whole img element. Otherwise we would get onerror called for empty src image loads.
    https://lit-html.polymer-project.org/guide/writing-templates#bind-to-attributes
  *****/  
  return isStartingImage ?
  html`<img style=${imageEdits} data-index=${index} @load=${onImgLoad} @error=${onImgLoad} src=${imgSrc} />`
    : html`<img style=${imageEdits} data-index=${index} @load=${onImgLoad} @error=${onImgLoad} />`
}

export {
  Image 
}