import {store as createStore} from '../web_modules/store.js'
import localforage from '../web_modules/localforage.js'

import {log} from '../logger.js'
// and to get all folders, just us Object.keys(folders)
// to get folder images would just be folders['folder 1'].images
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
  lastFetchedSubredditImage: null,
  // Actions
  /* eslint-disable functional/immutable-data */
  addFolder: newFolder => {
    const folder = newFolder.toLowerCase()
    store.folders[folder] = {}
    saveToLocalForage('folders', store.folders)
  },  
  removeFolder: folderToRemove => {
    const folder = folderToRemove.toLowerCase()
    delete store.folders[folder]
    saveToLocalForage('folders', store.folders)
  },  
  addImageToFolder: (folder, image) => {
    const redditImagePostUrl = image.thing //TODO:
    // check if already there as sometimes there will be the same post in different feeds
    if(!store.folders[folder][redditImagePostUrl]) return
    store.folders[folder][redditImagePostUrl] = image
    saveToLocalForage('folders', store.folders)
  },  
  removeImageFromFolder: (folder, imageToRemove) => {
    const redditImagePostUrl = imageToRemove.thing //TODO:
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
    store.subreddits = store.subreddits.filter(sub => sub !== subToRemove)
    saveToLocalForage('subreddits', store.subreddits)
  },  
  addFavouriteSubreddit: newSub => {
    const sub = newSub.toLowerCase()
    if(store.favouriteSubreddits.includes(sub)) return
    store.favouriteSubreddits.push(sub)
    saveToLocalForage('favouriteSubreddits', store.favouriteSubreddits)
  },  
  removeFavouriteSubreddit: subToRemove => {
    store.favouriteSubreddits = store.favouriteSubreddits.filter(sub => sub !== subToRemove)
    saveToLocalForage('favouriteSubreddits', store.favouriteSubreddits)
  },  
  /*****
    We dont bother storing fetched-subreddit-images to localforage. Its fine being ephemeral.
  *****/
  storeFetchedSubredditImages: images => {
    store.fetchedSubredditImages = store.fetchedSubredditImages.concat(images)
  },
  removeStoredFetchedSubredditImages: () => {
    store.fetchedSubredditImages = []
  },
  /*****
    When we grab the subreddit images, we filter out some images and then store the filtered
    ones in state. We need to store the last unfiltered image so that we dont start the next
    fetch pagination from an earlier image post id.
  *****/
  storeLastFetchedSubredditImage: image => {
    store.lastFetchedSubredditImage = image
  },
  removeLastFetchedSubredditImage: () => {
    store.lastFetchedSubredditImage = null
  }    
})

function saveToLocalForage(key, value) {
  localforage.setItem(key, JSON.stringify(value)).catch(log)
}

export {
  store
}
