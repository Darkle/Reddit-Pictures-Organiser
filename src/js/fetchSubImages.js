import { pipe, notOnSubredditPage } from './utils.js'
import { store } from './store/store.js'
import { logger } from './logger.js'
import { UserNavigatedAway, NoMoreImagesToFetch } from './Errors.js'

function fetchSubImages({subreddit, lastImgFetched}) {
  if(notOnSubredditPage()) return Promise.reject(new UserNavigatedAway())

  logger.debug(generateFetchUrl(subreddit, lastImgFetched))

  return fetch(generateFetchUrl(subreddit, lastImgFetched))
    .then(resp => resp.json())
    .then(resp => {
      const images = resp?.data?.children ?? []
      const processedImages = processImages(images)
      logger.debug(processedImages)

      if(!images.length) return Promise.reject(new NoMoreImagesToFetch())

      store.storeFetchedSubredditImages(processedImages)
      const lastImageFetched = images[images.length - 1]

      return lastImageFetched
    })
}

function generateFetchUrl(subreddit, lastImgFetched) {
  const pagination = lastImgFetched ? `&after=t3_${lastImgFetched.data.id}` : ''
  return `https://www.reddit.com/r/${subreddit}/.json?limit=100&count=100${pagination}`
}

function processImages(images) {
  return pipe(filterImages, transformImageLinks)(images)
}

function filterImages(images) {
  logger.debug('asd')
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
      imageUrl.pathname = imageUrl.pathname + '.jpg' // eslint-disable-line functional/immutable-data
      imageUrl.hostname = 'i.' + imageUrl.hostname // eslint-disable-line functional/immutable-data
      image.url = imageUrl.href // eslint-disable-line functional/immutable-data
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