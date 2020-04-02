import{html,render}from '../../web_modules/lit-html.js'
import{store}from '../../store/store.js'
import{$,setPageTitle,getImageFromId,getImageIndexFromId,safeGetImageSrc}from '../../utils.js'
import{router}from '../../router.js'
import{Nav,toggleNav}from './Nav.js'
import{FoldersContainer}from './FoldersContainer.js'
import{imageLoadErrorIcon}from './imageLoadErrorIcon.js'
import{Image}from './Image.js'
import{logger}from '../../logger.js'
const numImgsToCache=10
let swiper=null
function loadImageViewer({subreddit,timefilter,imageId,folderpage}){setPageTitle(`RPO - Image Viewer`)
if(!folderpage&&!store.fetchedSubredditImages.length)return router.navigate(`/sub/${subreddit}/${timefilter}`)
const images=folderpage?store.folders[folderpage]:store.fetchedSubredditImages
const startingImageIndex=getImageIndexFromId(imageId,images)
render(ImageViewer({subreddit,timefilter,imageId,startingImageIndex,folderpage}),document.body)}
function ImageViewer(state){const images=state.folderpage?store.folders[state.folderpage]:store.fetchedSubredditImages
const{permalink}=getImageFromId(state.imageId,images)
return html`
    <main id="app" class="imageViewerPage">
      ${Nav({...state,permalink})}
      ${Images(state)}
      ${FoldersContainer(state)}
      <div class="toast notifyClipboardCopy">Reddit Post Link Copied To Clipboard</div>
      <div class="toast notifyAddedImageToFolder">Image Added To Folder</div>
    </main>    
    `}
function Images(state){const images=state.folderpage?store.folders[state.folderpage]:store.fetchedSubredditImages
return html`
    <div class="swiper-container" @mouseup=${toggleNav}>
      <div class="swiper-wrapper">
      ${images.map((image,index)=>html`<div class="swiper-slide">${Image(image,index,state)}</div>`)}      
    </div>
  `}
function initialImagePreloads(event,{startingImageIndex,folderpage}){const thisImageElement=event.target
const thisImageElementsIndex=Number(thisImageElement.dataset.index)
const isStartingImage=thisImageElementsIndex===startingImageIndex
if(event.type==='error')thisImageElement.setAttribute('src',imageLoadErrorIcon)
if(isStartingImage)setUpSwiper(startingImageIndex,folderpage)
const images=folderpage?store.folders[folderpage]:store.fetchedSubredditImages
const previousImage=images[thisImageElementsIndex-1]
const nextImage=images[thisImageElementsIndex+1]
if(shouldPreloadPrevImage(isStartingImage,previousImage,thisImageElementsIndex,startingImageIndex)){const imgSrc=safeGetImageSrc(previousImage)
thisImageElement.parentNode.previousElementSibling.firstElementChild.setAttribute('src',imgSrc)}
if(shouldPreloadNextImage(isStartingImage,nextImage,thisImageElementsIndex,startingImageIndex)){const imgSrc=safeGetImageSrc(nextImage)
thisImageElement.parentNode.nextElementSibling.firstElementChild.setAttribute('src',imgSrc)}}
function shouldPreloadPrevImage(isStartingImage,previousImage,thisImageElementsIndex,startingImageIndex){if(!previousImage)return false
return(isStartingImage||isInPrev10Range(thisImageElementsIndex,startingImageIndex))}
function shouldPreloadNextImage(isStartingImage,nextImage,thisImageElementsIndex,startingImageIndex){if(!nextImage)return false
return(isStartingImage||isInNext10Range(thisImageElementsIndex,startingImageIndex))}
function isInPrev10Range(imageIndex,startImageIndex){return(imageIndex<startImageIndex)&&imageIndex>(startImageIndex-numImgsToCache)}
function isInNext10Range(imageIndex,startImageIndex){return(imageIndex>startImageIndex)&&imageIndex<(startImageIndex+numImgsToCache)}
function setUpSwiper(startingImageIndex,folderpage){import('../../web_modules/swiper.js').then(({default:Swiper})=>{swiper=new Swiper('.swiper-container',{initialSlide:startingImageIndex,grabCursor:true,keyboard:true,on:{slideNextTransitionEnd(){const swiperObj=this
const forward=true
preloadImageOnSwipe(swiperObj,forward,folderpage)},slidePrevTransitionEnd(){const swiperObj=this
const forward=false
preloadImageOnSwipe(swiperObj,forward,folderpage)},}})}).catch(logger.error)}
function preloadImageOnSwipe(swiperObj,forward,folderpage){const currentImageIndex=swiperObj.activeIndex
const tenthIndex=forward?(currentImageIndex+numImgsToCache):(currentImageIndex-numImgsToCache)
const images=folderpage?store.folders[folderpage]:store.fetchedSubredditImages
const tenthImage=images[tenthIndex]
if(!tenthImage)return
const tenthImageSrc=safeGetImageSrc(tenthImage)
$(`.swiper-slide img[data-index="${tenthIndex}"]`).setAttribute('src',tenthImageSrc)}
export{loadImageViewer,swiper,ImageViewer,initialImagePreloads,}