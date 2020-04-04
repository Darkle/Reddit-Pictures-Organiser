import{html}from '../../web_modules/lit-html.js'
import{router}from '../../router.js'
import{logger}from '../../logger.js'
import{$,$$}from '../../utils.js'
import{store}from '../../store/store.js'
import{swiper}from './imageViewerPage.js'
function Nav(state){return html`
    <nav class="navWrapper">
      <div class="back" @mouseup=${()=>handleBackNavigation(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
            stroke="#fff4e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"></path>
        </svg> 
      </div>
      ${state.folderpage?html`<div class="removeImageFromFolder" 
          @mouseup=${()=>removeImageFromFolder(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
            stroke="#fff4e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>`:`` }
      <div class="share" @mouseup=${()=>shareImageRedditPermalink(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2">
          <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>        
      </div>
      <div class="addToFolder" @mouseup=${toggleFolders}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder-plus">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>        
      </div>
    </nav>  
    `}
function getSwiperActiveIndex(){return Number($('.swiper-slide-active img').dataset.index)}
function handleBackNavigation({subreddit,timefilter,folderpage}){if($('.foldersContainer').classList.contains('show')){return toggleFolders()}
const navigationUrl=!folderpage?`/sub/${subreddit}/${timefilter}/`:`/folders/${folderpage}/`
return router.navigate(navigationUrl)}
function removeImageFromFolder(state){store.removeImageFromFolder(state.folderpage,store.folders[state.folderpage][getSwiperActiveIndex()])
swiper.removeSlide(getSwiperActiveIndex())
$$('.swiper-container img').forEach((image,index)=>{image.dataset.index=index
image.setAttribute('data-index',index)})
toggleToast('notifyRemovedImageFromFolder')}
function shareImageRedditPermalink(state){const images=state.folderpage?store.folders[state.folderpage]:store.fetchedSubredditImages
const fullPermalink=`https://reddit.com${images[getSwiperActiveIndex()].permalink}`
if(navigator.share)return navigator.share({url:fullPermalink}).catch(logger.error)
return navigator.clipboard.writeText(fullPermalink).then(()=>toggleToast('notifyClipboardCopy')).catch(logger.error)}
function toggleToast(selector){const toggleToastClass=()=>$(`.imageViewerPage .${selector}`)?.classList.toggle('showToast')
toggleToastClass()
const threeSecondsInMS=3000
setTimeout(toggleToastClass,threeSecondsInMS)}
function toggleNav(){const navWrapper=$('.navWrapper')
if(!navWrapper.classList.contains('slideDown')){navWrapper.classList.remove('slideUp')
navWrapper.classList.add('slideDown')}
else{navWrapper.classList.remove('slideDown')
navWrapper.classList.add('slideUp')}
navWrapper.classList.toggle('show')}
function toggleFolders(){$('.swiper-container').classList.toggle('hide')
$('.foldersContainer').classList.toggle('show')}
export{Nav,toggleNav,toggleFolders,}