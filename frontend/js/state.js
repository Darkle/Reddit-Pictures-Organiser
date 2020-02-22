import createNanoEvents from 'web_modules/nanoevents.js'

const emitter = createNanoEvents()

// and to get all folders, just us Object.keys(folders)
// to get folder images would just be folders['folder 1'].images
const state = {
  folders : {
    'folder 1':{
      // foldersArrayWeGotFromLocalForage
      'https://reddit post url' : {

      },
      'https://reddit post url 2' : {

      },
    }
  },
  subreddits: [ //subsArrayWeGotFromLocalForage
    'foo',
    'bar',
  ],
  favouriteSubreddits: [ //faveSubsArrayWeGotFromLocalForage
    'foo',
    'bar',
  ]
}

emitter.on('add-folder', newFolder => {
  state.folders[newFolder] = {}
})

emitter.on('remove-folder', folderToRemove => {
 delete state.folders[folderToRemove]
})

emitter.on('add-image-to-folder', (folder, image) => {
  const imageRedditPostUrl = image.thing
  state.folders[folder][imageRedditPostUrl] = image
})

emitter.on('remove-image-from-folder', (folder, imageToRemove) => {
  const imageRedditPostUrl = imageToRemove.thing
  delete state.folders[folder][imageRedditPostUrl]
})

emitter.on('add-subreddit', newSub => {
  if(state.subreddits.includes(newSub)) return
  state.subreddits.push(newSub)
})

emitter.on('remove-subreddit', subToRemove => {
  state.subreddits = state.subreddits.filter(sub => sub !== subToRemove)
})

emitter.on('add-favourite-subreddit', newSub => {
  if(state.favouriteSubreddits.includes(newSub)) return
  state.favouriteSubreddits.push(newSub)
})

emitter.on('remove-favourite-subreddit', subToRemove => {
  state.favouriteSubreddits = state.favouriteSubreddits.filter(sub => sub !== subToRemove)
})

export {
  emitter
}