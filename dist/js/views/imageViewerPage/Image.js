import{html}from '../../web_modules/lit-html.js'
import{curryRight,safeGetImageSrc}from '../../utils.js'
import{initialImagePreloads}from './imageViewerPage.js'
import{convertImageEditsToCssString}from '../imageEditorPage/editing.js'
function Image(image,index,state){const isStartingImage=index===state.startingImageIndex
const onImgLoad=curryRight(initialImagePreloads)(state)
const imageEdits=convertImageEditsToCssString(image.edits)
const imgSrc=safeGetImageSrc(image)
return isStartingImage?html`<img style=${imageEdits} data-index=${index} @load=${onImgLoad} @error=${onImgLoad} src=${imgSrc} />`:html`<img style=${imageEdits} data-index=${index} @load=${onImgLoad} @error=${onImgLoad} />`}
export{Image}