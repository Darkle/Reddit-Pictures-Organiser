import{html}from '../../web_modules/lit-html.js'
import{curryRight,safeGetImageSrc}from '../../utils.js'
import{initialImagePreloads}from './preload.js'
function Image(image,index,state){const isStartingImage=index===state.startingImageIndex
const onImgLoad=curryRight(initialImagePreloads)(state)
const imgSrc=safeGetImageSrc(image)
return isStartingImage?html`<img data-index=${index} @load=${onImgLoad} @error=${onImgLoad} src=${imgSrc} />`:html`<img data-index=${index} @load=${onImgLoad} @error=${onImgLoad} />`}
export{Image}