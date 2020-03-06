import {store} from './web_modules/store.js'

// and to get all folders, just us Object.keys(folders)
// to get folder images would just be folders['folder 1'].images
const appStore = store ({
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
  lastFetchedSubredditImage: null
})

export {
  appStore
}
