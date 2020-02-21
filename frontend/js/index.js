import yo from './web_modules/yo-yo.js'
import localforage from './web_modules/localforage.js'
import { action, subscribe, setState } from './web_modules/statezero.js'

localforage.config({
  name: 'Reddit Pictures Organiser'
})
localforage.setItem('key', 'valueww').catch(err => console.error(err))

// folders state structure
/*
folders : {
  'folder 1':{
      'https://reddit post url' : {

      },
      'https://reddit post url 2' : {

      },
  }
}
*/
// and to get all folders, just us Object.keys(folders)
// to get folder images would just be folders['folder 1'].images

setState('folders', foldersArrayWeGotFromLocalForage)

const addFolder = action(({ commit, state }, newFolder) => {
  state.folders[newFolder] = {}
  commit(state)
})

const removeFolder = action(({ commit, state }, folderToRemove) => {
  delete state.folders[folderToRemove]
  commit(state)
})

const addImageToFolder = action(({ commit, state }, folder, image) => {
  const imageRedditPostUrl = image.thing
  state.folders[folder][imageRedditPostUrl] = image
  commit(state)
})

const removeImageFromFolder = action(({ commit, state }, folder, imageToRemove) => {
  const imageRedditPostUrl = imageToRemove.thing
  delete state.folders[folder][imageRedditPostUrl]
  commit(state)
})

// subreddits structure
// [
//   'sub1',
//   'sub2'
// ]

setState('subreddits', subsArrayWeGotFromLocalForage)

const addSubreddit = action(({ commit, state }, newSub) => {
  state.subreddits.push(newSub)
  commit(state)
})

const removeSubreddit = action(({ commit, state }, subToRemove) => {
  //state.subreddits.push(newSub) omit sub
  commit(state)
})

// favouriteSubreddits structure
// [
//   'sub1',
//   'sub2'
// ]

setState('favouriteSubreddits', faveSubsArrayWeGotFromLocalForage)

const addFavSubreddit = action(({ commit, state }, newFavSub) => {
  state.subreddits.push(newSub)
  commit(state)
})

const removeFavSubreddit = action(({ commit, state }, subToRemove) => {
  //state.subreddits.push(newSub) omit sub
  commit(state)
})