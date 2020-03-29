import localforage from '../web_modules/localforage.js'

import {logger} from '../logger.js'
/* eslint-disable functional/immutable-data */
const store = {
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
  addEditsToImageInFolder(folder, imageId, edits) {
    store.fetchedSubredditImages = store.fetchedSubredditImages.map(image =>{
      if(image.id === imageId){
        image.edits = edits
      } 
      return image
    })
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
  addEditsToImage(image, newEdits, folder = null){
    const {permalink, id} = image
    if(folder){
      const currentEdits = store.folders[folder][permalink].edits
      store.folders[folder][permalink].edits = constructEdits(currentEdits, newEdits)
      return
    }
    store.fetchedSubredditImages = store.fetchedSubredditImages.map(img => {
      if(img.id === id){
        img.edits = constructEdits(img.edits, newEdits)
      }
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
  addEditsToStoredFetchedSubredditImage(imageId, edits) {
    store.fetchedSubredditImages = store.fetchedSubredditImages.map(image =>{
      if(image.id === imageId){
        image.edits = edits
      } 
      return image
    })
  },
}

function constructEdits(currentEdits, newEdits){
  if(!currentEdits) return newEdits
  const edits = currentEdits + ';' + newEdits + ';' // eslint-disable-line operator-assignment
  return edits
}

function saveToLocalForage(key, value) {
  localforage.setItem(key, value).catch(logger.error)
}

export {
  store
}
