import localforage from '../web_modules/localforage.js'
import{logger}from '../logger.js'
import{getImageFromId}from '../utils.js'
const store={folders:{},subreddits:[],favouriteSubreddits:[],fetchedSubredditImages:[],createFolder(newFolder){const folder=newFolder.trim()
if(store.folders[folder])return
store.folders[folder]=[]
saveToLocalForage('folders',store.folders)},removeFolder(folderToRemove){const folder=folderToRemove.trim()
if(!store.folders[folder])return
delete store.folders[folder]
saveToLocalForage('folders',store.folders)},addImageToFolder(folder,image){if(getImageFromId(image.id,store.folders[folder]))return
const{src,url,id,permalink,thumbnail,edits}=image
store.folders[folder].unshift({src,url,id,permalink,thumbnail,edits})
saveToLocalForage('folders',store.folders)},removeImageFromFolder(folder,image){if(!getImageFromId(image.id,store.folders[folder]))return
store.folders=store.folders[folder].filter(storedImg=>storedImg.id!==image.id)
saveToLocalForage('folders',store.folders)},addSubreddit(newSub){const sub=newSub.toLowerCase().trim()
if(store.subreddits.includes(sub))return
store.subreddits.push(sub)
saveToLocalForage('subreddits',store.subreddits)},removeSubreddit(subToRemove){const sub=subToRemove.toLowerCase().trim()
store.removeFavouriteSubreddit(sub)
if(!store.subreddits.includes(sub))return
store.subreddits=store.subreddits.filter(subreddit=>subreddit!==subToRemove)
saveToLocalForage('subreddits',store.subreddits)},addFavouriteSubreddit(newSub){const sub=newSub.toLowerCase().trim()
if(store.favouriteSubreddits.includes(sub))return
store.favouriteSubreddits.push(sub)
saveToLocalForage('favouriteSubreddits',store.favouriteSubreddits)},removeFavouriteSubreddit(subToRemove){const sub=subToRemove.toLowerCase().trim()
if(!store.favouriteSubreddits.includes(sub))return
store.favouriteSubreddits=store.favouriteSubreddits.filter(subreddit=>subreddit!==subToRemove)
saveToLocalForage('favouriteSubreddits',store.favouriteSubreddits)},addEditsToImage(imageId,{rotateVal,cropImageVal,resizeImageVal},folder=null){const updateImageEditInImages=images=>images.map(storedImg=>{if(storedImg.id===imageId){storedImg.edits={rotateVal,cropImageVal,resizeImageVal}}
return storedImg})
if(folder){store.folders[folder]=updateImageEditInImages(store.folders[folder])
saveToLocalForage('folders',store.folders)
return}
store.fetchedSubredditImages=updateImageEditInImages(store.fetchedSubredditImages)},storeFetchedSubredditImages(images){if(!images.length)return
store.fetchedSubredditImages=store.fetchedSubredditImages.concat(images)},removeStoredFetchedSubredditImages(){store.fetchedSubredditImages=[]},}
function saveToLocalForage(key,value){localforage.setItem(key,value).catch(logger.error)}
export{store}