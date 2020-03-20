import {store as createStore} from '../web_modules/store.js'
import localforage from '../web_modules/localforage.js'

import {logger} from '../logger.js'
// and to get all folders, just us Object.keys(folders)
// to get folder images would just be folders['folder 1'].images
/* eslint-disable functional/immutable-data */
const store = createStore ({
  folders : {
    'folder 1':{
      'imagePostIdHere' : {

      },
      'imagePostIdHere2' : {

      },
    }
  },
  subreddits: [
  ],
  favouriteSubreddits: [
  ],
  fetchedSubredditImages: [],
  addFolder: newFolder => {
    const folder = newFolder.toLowerCase()
    if(store.folders[folder]) return
    store.folders[folder] = {}
    saveToLocalForage('folders', store.folders)
  },  
  removeFolder: folderToRemove => {
    const folder = folderToRemove.toLowerCase()
    if(!store.folders[folder]) return
    delete store.folders[folder]
    saveToLocalForage('folders', store.folders)
  },  
  addImageToFolder: (folder, image) => {
    const redditImagePostUrl = image.thing //TODO:
    if(store.folders[folder][redditImagePostUrl]) return
    store.folders[folder][redditImagePostUrl] = image
    saveToLocalForage('folders', store.folders)
  },  
  removeImageFromFolder: (folder, imageToRemove) => {
    const redditImagePostUrl = imageToRemove.thing //TODO:
    if(!store.folders[folder][redditImagePostUrl]) return
    delete store.folders[folder][redditImagePostUrl]
    saveToLocalForage('folders', store.folders)
  },  
  addSubreddit: newSub => {
    const sub = newSub.toLowerCase()
    if(store.subreddits.includes(sub)) return
    store.subreddits.push(sub)
    saveToLocalForage('subreddits', store.subreddits)
  },
  removeSubreddit: subToRemove => {
    const sub = subToRemove.toLowerCase()
    store.removeFavouriteSubreddit(sub)
    if(!store.subreddits.includes(sub)) return
    store.subreddits = store.subreddits.filter(subreddit => subreddit !== subToRemove)
    saveToLocalForage('subreddits', store.subreddits)
  },  
  addFavouriteSubreddit: newSub => {
    const sub = newSub.toLowerCase()
    if(store.favouriteSubreddits.includes(sub)) return
    store.favouriteSubreddits.push(sub)
    saveToLocalForage('favouriteSubreddits', store.favouriteSubreddits)
  },  
  removeFavouriteSubreddit: subToRemove => {
    const sub = subToRemove.toLowerCase()
    if(!store.favouriteSubreddits.includes(sub)) return 
    store.favouriteSubreddits = store.favouriteSubreddits.filter(subreddit => subreddit !== subToRemove)
    saveToLocalForage('favouriteSubreddits', store.favouriteSubreddits)
  },  
  /*****
    We dont bother storing fetched-subreddit-images to localforage. Its fine being ephemeral.
  *****/
  storeFetchedSubredditImages: images => {
    if(!images.length) return
    store.fetchedSubredditImages = store.fetchedSubredditImages.concat(images)
  },
  removeStoredFetchedSubredditImages: () => {
    store.fetchedSubredditImages = []
  },
})

function saveToLocalForage(key, value) {
  localforage.setItem(key, JSON.stringify(value)).catch(logger.error)
}

export {
  store
}
