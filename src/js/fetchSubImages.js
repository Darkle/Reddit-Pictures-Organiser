import { pipe, notOnSubredditPage } from './utils.js'
import { store } from './store/store.js'

function fetchSubImages(subreddit) { // eslint-disable-line max-lines-per-function
  if(notOnSubredditPage()) return Promise.reject(new Error('change this to be from my error class'))
  
  return fetch(generateFetchUrl(subreddit))
    .then(resp => resp.json())
    .then(resp => {
      const images = resp?.data?.children ?? []
      const processedImages = processImages(images)

      if(!images.length) return Promise.reject(new Error('change this to be from my error class'))

      store.storeFetchedSubredditImages(processedImages)

      return processedImages
    })
}

function generateFetchUrl(subreddit) {
  const lastFetchedSubredditImage = store.fetchedSubredditImages[store.fetchedSubredditImages.length - 1]
  const pagination = lastFetchedSubredditImage ? `&after=t3_${lastFetchedSubredditImage.id}` : ''

  return `https://www.reddit.com/r/${subreddit}/.json?limit=100&count=100${pagination}`
}

function processImages(images) {
  return pipe(filterImages, transformImageLinks)(images)
}

function filterImages(images) {
  return images.filter(({data: image}) => { // eslint-disable-line complexity
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