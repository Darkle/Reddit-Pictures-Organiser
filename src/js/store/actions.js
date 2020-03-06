import localforage from './web_modules/localforage.js'

import { appStore } from './store.js'
import {log} from '../logger.js'

/* eslint-disable functional/immutable-data */

const addFolder = newFolder => {
  const folder = newFolder.toLowerCase()
  appStore.folders[folder] = {}
  localforage.setItem('folders', appStore.folders).catch(log)
}

const removeFolder = folderToRemove => {
  const folder = folderToRemove.toLowerCase()
  delete appStore.folders[folder]
  localforage.setItem('folders', appStore.folders).catch(log)
}

const addImageToFolder = (folder, image) => {
  const imageRedditPostUrl = image.thing
  // check if already there as sometimes there will be the same post in different feeds
  if(!appStore.folders[folder][imageRedditPostUrl]) return
  appStore.folders[folder][imageRedditPostUrl] = image
  localforage.setItem('folders', appStore.folders).catch(log)
}

const removeImageFromFolder = (folder, imageToRemove) => {
  const imageRedditPostUrl = imageToRemove.thing
  delete appStore.folders[folder][imageRedditPostUrl]
  localforage.setItem('folders', appStore.folders).catch(log)
}

const addSubreddit = newSub => {
  const sub = newSub.toLowerCase()
  if(appStore.subreddits.includes(sub)) return
  appStore.subreddits.push(sub)
  localforage.setItem('subreddits', appStore.subreddits).catch(log)
}

const removeSubreddit = subToRemove => {
  appStore.subreddits = appStore.subreddits.filter(sub => sub !== subToRemove)
  localforage.setItem('subreddits', appStore.subreddits).catch(log)
}

const addFavouriteSubreddit = newSub => {
  const sub = newSub.toLowerCase()
  if(appStore.favouriteSubreddits.includes(sub)) return
  appStore.favouriteSubreddits.push(sub)
  localforage.setItem('favouriteSubreddits', appStore.favouriteSubreddits).catch(log)
}

const removeFavouriteSubreddit = subToRemove => {
  appStore.favouriteSubreddits = appStore.favouriteSubreddits.filter(sub => sub !== subToRemove)
  localforage.setItem('favouriteSubreddits', appStore.favouriteSubreddits).catch(log)
}

/*****
  We dont bother storing fetched-subreddit-images to localforage, its fine being ephemeral
*****/
const storeFetchedSubredditImages = images => {
  appStore.fetchedSubredditImages = appStore.fetchedSubredditImages.concat(images)
}
const removeFetchedSubredditImages = () => {
  appStore.fetchedSubredditImages = []
}
/*****
  When we grab the subreddit images, we filter out some images and then store the filtered
  ones in state. We need to store the last unfiltered image so that we dont start the next
  fetch pagination from an earlier image post id.
*****/
const storeLastFetchedSubredditImages = image => {
  appStore.lastFetchedSubredditImage = image
}
const removeLastFetchedSubredditImages = () => {
  appStore.lastFetchedSubredditImage = null
}

export {
  addFolder,
  removeFolder,
  addImageToFolder,
  removeImageFromFolder,
  addSubreddit,
  removeSubreddit,
  addFavouriteSubreddit,
  removeFavouriteSubreddit,
  storeFetchedSubredditImages,
  removeFetchedSubredditImages,
  storeLastFetchedSubredditImages,
  removeLastFetchedSubredditImages,
}