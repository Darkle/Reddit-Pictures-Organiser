import{html}from '../../web_modules/lit-html.js'
import{router}from '../../router.js'
import{logger}from '../../logger.js'
import{$}from '../../utils.js'
import{swiper}from './imageViewerPage.js'
import{store}from '../../store/store.js'
function Nav(state){return html`
    <nav class="navWrapper">
      <div class="back" @mouseup=${()=>handleBackNavigation(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff4e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"></path>
        </svg> 
      </div>
      <div class="edit" @mouseup=${()=>handleEditNavigation(state)}>
        <svg width="22" height="22" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M11.21 15.83L9.25 13.47L6.5 17H13.12L15.66 14.55L13.96 12.29L11.21 15.83M11 19.9V19.05L11.05 19H5V5H19V11.31L21 9.38V5C21 3.9 20.11 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11V19.9Z" />
        </svg>        
      </div>
      <div class="share" @mouseup=${()=>shareImageRedditPermalink(state)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2">
          <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>        
      </div>
      <div class="addToFolder" @mouseup=${toggleFolders}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder-plus">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>        
      </div>
    </nav>  
    `}
function handleEditNavigation({subreddit,timefilter,folderpage}){const images=folderpage?store.folders[folderpage]:store.fetchedSubredditImages
const{id:currentImageId}=images[swiper.activeIndex]
const navigationUrl=!folderpage?`/sub/${subreddit}/${timefilter}/imageviewer/edit/${currentImageId}`:`/folders/${folderpage}/imageviewer/edit/${currentImageId}`
router.navigate(navigationUrl)}
function handleBackNavigation({subreddit,timefilter,folderpage}){if($('.foldersContainer').classList.contains('show')){return toggleFolders()}
const navigationUrl=!folderpage?`/sub/${subreddit}/${timefilter}/`:`/folders/${folderpage}/`
return router.navigate(navigationUrl)}
function shareImageRedditPermalink({permalink}){const fullPermalink=`https://reddit.com${permalink}`
if(navigator.share)return navigator.share({url:fullPermalink}).catch(logger.error)
return navigator.clipboard.writeText(fullPermalink).then(showClipboardToast).catch(logger.error)}
function showClipboardToast(){const toggleToastClass=()=>$(`.imageViewerPage .notifyClipboardCopy`)?.classList.toggle('showToast')
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