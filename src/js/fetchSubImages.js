import { emitter } from './actions.js'
import { pipe } from './utils.js'
import { appState } from './appState.js'

function fetchSubImages(subreddit) { // eslint-disable-line max-lines-per-function

  if(!appState.viewingSubredditPage) throw new Error('change this to be from my error class')

  return fetch(generateFetchUrl(subreddit))
    .then(resp => resp.json())
    .then(resp => {
      const images = resp?.data?.children ?? []
      const processedImages = processImages(images)

      if(!images.length){
        emitter.emit('remove-last-fetched-subreddit-image')
        return Promise.reject(new Error('change this to be from my error class'))
      }

      emitter.emit('store-last-fetched-subreddit-image', images[images.length - 1])
      emitter.emit('store-fetched-subreddit-images', processedImages)

      return processedImages
    })
}

function generateFetchUrl(subreddit) {
  const {lastFetchedSubredditImage} = appState
  const pagination = lastFetchedSubredditImage ? `&after=t3_${lastFetchedSubredditImage.data.id}` : ''

  return `https://www.reddit.com/r/${subreddit}/.json?limit=100&count=100${pagination}`
}

function processImages(images) {
  return pipe(filterImages, transformImageLinks)(images)
}

function filterImages(images) {
  return images.filter(({data: image}) => {
    // reddit cross-posts start with '/'
    if(image.stickied || image.url.startsWith('/')) return false

    const {hostname:imageDomain, pathname} = new URL(image.url)

    if(imageDomain.endsWith('imgur.com') && notImgurGallery(pathname)) return true
    if(imageDomain === 'i.redd.it') return true

    return false
  })
}

function transformImageLinks(images) {
  return images.map(({data: image}) => {
    const imageUrl = new URL(image.url)
    /*****
      If it isnt a https://i.imgur.com/foo.jpg url and it's not a gallery,
      convert it to https://i.imgur.com/foo.jpg
    *****/
    if(imageUrl.hostname.startsWith('imgur.com') && notImgurGallery(imageUrl.pathname)){
      imageUrl.pathname = imageUrl.pathname + '.jpg'
      imageUrl.hostname = 'i.' + imageUrl.hostname
      image.url = imageUrl.href
      return image
    }
    return image
  })
}

function notImgurGallery(pathname){
  return pathname.match(/\//gu).length === 1
}

export {
  fetchSubImages
}