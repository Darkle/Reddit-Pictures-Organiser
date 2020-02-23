
// and to get all folders, just us Object.keys(folders)
// to get folder images would just be folders['folder 1'].images
const appState = {
  folders : {
    'folder 1':{
      'https://reddit post url' : {

      },
      'https://reddit post url 2' : {

      },
    }
  },
  subreddits: [
  ],
  favouriteSubreddits: [
  ],
  fetchedSubredditImages: [],
  lastFetchedSubredditImage: null
}

export {
  appState
}