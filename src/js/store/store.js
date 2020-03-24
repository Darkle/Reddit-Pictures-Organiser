import {store as createStore} from '../web_modules/store.js'
import localforage from '../web_modules/localforage.js'

import {logger} from '../logger.js'
/* eslint-disable functional/immutable-data */
const store = createStore ({
  folders : {},
  subreddits: [],
  favouriteSubreddits: [],
  fetchedSubredditImages: [],
  createFolder(newFolder) {
    const folder = newFolder.toLowerCase()
    if(store.folders[folder]) return
    store.folders[folder] = {}
    saveToLocalForage('folders', store.folders)
  },  
  removeFolder(folderToRemove) {
    const folder = folderToRemove.toLowerCase()
    if(!store.folders[folder]) return
    delete store.folders[folder]
    saveToLocalForage('folders', store.folders)
  },  
  addImageToFolder(folder, image) {
    const {permalink, thumbnail, src, url, id} = image

    if(store.folders[folder][permalink]) return
    
    const edits = image.edits ? image.edits : ''
    const newImageItem = {permalink, thumbnail, src, url, id, edits}

    store.folders[folder][permalink] = newImageItem
    saveToLocalForage('folders', store.folders)
  },  
  removeImageFromFolder(folder, imageToRemove) {
    const {permalink} = imageToRemove
    if(!store.folders[folder][permalink]) return
    delete store.folders[folder][permalink]
    saveToLocalForage('folders', store.folders)
  },  
  addSubreddit(newSub) {
    const sub = newSub.toLowerCase()
    if(store.subreddits.includes(sub)) return
    store.subreddits.push(sub)
    saveToLocalForage('subreddits', store.subreddits)
  },
  removeSubreddit(subToRemove) {
    const sub = subToRemove.toLowerCase()
    store.removeFavouriteSubreddit(sub)
    if(!store.subreddits.includes(sub)) return
    store.subreddits = store.subreddits.filter(subreddit => subreddit !== subToRemove)
    saveToLocalForage('subreddits', store.subreddits)
  },  
  addFavouriteSubreddit(newSub){
    const sub = newSub.toLowerCase()
    if(store.favouriteSubreddits.includes(sub)) return
    store.favouriteSubreddits.push(sub)
    saveToLocalForage('favouriteSubreddits', store.favouriteSubreddits)
  },  
  removeFavouriteSubreddit(subToRemove) {
    const sub = subToRemove.toLowerCase()
    if(!store.favouriteSubreddits.includes(sub)) return 
    store.favouriteSubreddits = store.favouriteSubreddits.filter(subreddit => subreddit !== subToRemove)
    saveToLocalForage('favouriteSubreddits', store.favouriteSubreddits)
  },  
  addEditsToImage(image, edits, folder = null){
    const {permalink, id} = image
    if(folder){
      store.folders[folder][permalink].edits = edits
      return
    }
    store.fetchedSubredditImages = store.fetchedSubredditImages.map(img => {
      if(img.id === id) img.edits = edits
      return img
    })
  },
  // We dont need to store this in IndexedDB
  storeFetchedSubredditImages(images) {
    if(!images.length) return
    store.fetchedSubredditImages = store.fetchedSubredditImages.concat(images)
  },
  removeStoredFetchedSubredditImages() {
    store.fetchedSubredditImages = []
  },
})

function saveToLocalForage(key, value) {
  localforage.setItem(key, JSON.stringify(value)).catch(logger.error)
}

export {
  store
}
