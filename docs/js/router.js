import Navigo from './web_modules/navigo.js'
import{loadHomePage}from './views/homePage.js'
import{loadThumbnailsPage}from './views/thumbnailsPage/thumbnailsPage.js'
import{loadManagePage}from './views/managePage.js'
import{loadFoldersPage}from './views/foldersPage.js'
import{loadImageViewer}from './views/imageViewerPage/imageViewerPage.js'
import{noSubsStored}from './utils.js'
import{logger}from './logger.js'
const root=null
const useHash=true
const hash='#!'
const router=new Navigo(root,useHash,hash)
function initRouter(){router.on(()=>noSubsStored()?router.navigate('/manage'):loadHomePage()).on('/sub/:subreddit/:timefilter',loadThumbnailsPage).on('/sub/:subreddit/:timefilter/imageviewer/:imageId',loadImageViewer).on('/folders',loadFoldersPage).on('/folders/:folderpage',loadThumbnailsPage).on('/folders/:folderpage/imageviewer/:imageId',loadImageViewer).on('/manage',loadManagePage).notFound(()=>{logger.error('Page not found. Redirecting to home page')
router.navigate('/')}).resolve()}
export{initRouter,router,}