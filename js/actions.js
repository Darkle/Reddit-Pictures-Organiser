import createNanoEvents from './web_modules/nanoevents.js'
import localforage from './web_modules/localforage.js'

import {appState} from './appState.js'
import {log} from './logger.js'

const emitter = createNanoEvents()

emitter.on('add-folder', newFolder => {
  const folder = newFolder.toLowerCase()
  appState.folders[folder] = {}
  localforage.setItem('folders', appState.folders).catch(log)
})

emitter.on('remove-folder', folderToRemove => {
  const folder = folderToRemove.toLowerCase()
  delete appState.folders[folder]
  localforage.setItem('folders', appState.folders).catch(log)
})

emitter.on('add-image-to-folder', (folder, image) => {
  const imageRedditPostUrl = image.thing
  // check if already there as sometimes there will be the same post in different feeds
  if(!appState.folders[folder][imageRedditPostUrl]) return
  appState.folders[folder][imageRedditPostUrl] = image
  localforage.setItem('folders', appState.folders).catch(log)
})

emitter.on('remove-image-from-folder', (folder, imageToRemove) => {
  const imageRedditPostUrl = imageToRemove.thing
  delete appState.folders[folder][imageRedditPostUrl]
  localforage.setItem('folders', appState.folders).catch(log)
})

emitter.on('add-subreddit', newSub => {
  const sub = newSub.toLowerCase()
  if(appState.subreddits.includes(sub)) return
  appState.subreddits.push(sub)
  localforage.setItem('subreddits', appState.subreddits).catch(log)
})

emitter.on('remove-subreddit', subToRemove => {
  appState.subreddits = appState.subreddits.filter(sub => sub !== subToRemove)
  localforage.setItem('subreddits', appState.subreddits).catch(log)
})

emitter.on('add-favourite-subreddit', newSub => {
  const sub = newSub.toLowerCase()
  if(appState.favouriteSubreddits.includes(sub)) return
  appState.favouriteSubreddits.push(sub)
  localforage.setItem('favouriteSubreddits', appState.favouriteSubreddits).catch(log)
})

emitter.on('remove-favourite-subreddit', subToRemove => {
  appState.favouriteSubreddits = appState.favouriteSubreddits.filter(sub => sub !== subToRemove)
  localforage.setItem('favouriteSubreddits', appState.favouriteSubreddits).catch(log)
})
/*****
  We dont bother storing fetched-subreddit-images to localforage, its fine being ephemeral
*****/
emitter.on('store-fetched-subreddit-images', images => {
  appState.fetchedSubredditImages = appState.fetchedSubredditImages.concat(images)
})
emitter.on('remove-stored-fetched-subreddit-images', () => {
  appState.fetchedSubredditImages = []
})
/*****
  
*****/
emitter.on('store-last-fetched-subreddit-image', image => {
  appState.lastFetchedSubredditImage = image
})
emitter.on('remove-last-fetched-subreddit-image', () => {
  appState.lastFetchedSubredditImage = null
})

export {
  emitter
}