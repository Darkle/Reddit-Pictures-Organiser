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
    localforage.setItem('folders', JSON.stringify(store.folders)).catch(log)
  },  
  removeFolder: folderToRemove => {
    const folder = folderToRemove.toLowerCase()
    delete store.folders[folder]
    localforage.setItem('folders', JSON.stringify(store.folders)).catch(log)
  },  
  addImageToFolder: (folder, image) => {
    const imageRedditPostUrl = image.thing
    // check if already there as sometimes there will be the same post in different feeds
    if(!store.folders[folder][imageRedditPostUrl]) return
    store.folders[folder][imageRedditPostUrl] = image
    localforage.setItem('folders', JSON.stringify(store.folders)).catch(log)
  },  
  removeImageFromFolder: (folder, imageToRemove) => {
    const imageRedditPostUrl = imageToRemove.thing
    delete store.folders[folder][imageRedditPostUrl]
    localforage.setItem('folders', JSON.stringify(store.folders)).catch(log)
  },  
  addSubreddit: newSub => {
    const sub = newSub.toLowerCase()
    if(store.subreddits.includes(sub)) return
    store.subreddits.push(sub)
    localforage.setItem('subreddits', JSON.stringify(store.subreddits)).catch(log)
  },  
  removeSubreddit: subToRemove => {
    store.subreddits = store.subreddits.filter(sub => sub !== subToRemove)
    localforage.setItem('subreddits', JSON.stringify(store.subreddits)).catch(log)
  },  
  addFavouriteSubreddit: newSub => {
    const sub = newSub.toLowerCase()
    if(store.favouriteSubreddits.includes(sub)) return
    store.favouriteSubreddits.push(sub)
    localforage.setItem('favouriteSubreddits', JSON.stringify(store.favouriteSubreddits)).catch(log)
  },  
  removeFavouriteSubreddit: subToRemove => {
    store.favouriteSubreddits = store.favouriteSubreddits.filter(sub => sub !== subToRemove)
    localforage.setItem('favouriteSubreddits', JSON.stringify(store.favouriteSubreddits)).catch(log)
  },  
  /*****
    We dont bother storing fetched-subreddit-images to localforage, its fine being ephemeral
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

export {
  store
}
