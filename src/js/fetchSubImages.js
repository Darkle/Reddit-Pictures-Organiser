import { pipe, subPageNavigatedAway, Fetcher } from './utils.js'
import { store } from './store/store.js'
import { logger } from './logger.js'
import { UserNavigatedAway, NoMoreImagesToFetch } from './Errors.js'

function fetchSubImages({subreddit, lastImgFetched, timefilter}) { // eslint-disable-line max-lines-per-function
  if(subPageNavigatedAway(timefilter)) return Promise.reject(new UserNavigatedAway())
  logger.debug(generateFetchUrl(subreddit, lastImgFetched, timefilter))

  return Fetcher.getJSON(generateFetchUrl(subreddit, lastImgFetched, timefilter))
    .then(resp => { // eslint-disable-line max-statements
      if(subPageNavigatedAway(timefilter)) return Promise.reject(new UserNavigatedAway())

      const images = resp.data?.children ?? []
      const processedImages = processImages(images)

      logger.debug(processedImages)
      /*****
        We only reject to stop any subsequent fetches for this particular sub if its part of the favmix. We dont
        reject when on an individual subs page, as we need subredditPage.js to update the placeholder to 
        say 'No Images Found...'
      *****/
      if(noMoreImagesFoundInFavMixSub(images, processedImages)) {
        return Promise.reject(new NoMoreImagesToFetch())
      }

      store.storeFetchedSubredditImages(processedImages)

      const lastImageFetched = images[images.length - 1]

      return [lastImageFetched, timefilter]
    })
}

function noMoreImagesFoundInFavMixSub(images, processedImages){
  return window.location.hash === '#!/sub/favmix/latest' && (!images.length || !processedImages.length)
}

/*****
  Examples:
  https://www.reddit.com/r/aww/.json?limit=100&count=100
  https://www.reddit.com/r/aww/top/.json?limit=100&t=week&count=100
  https://www.reddit.com/r/aww/top/.json?limit=100&t=month&count=100
  https://www.reddit.com/r/aww/top/.json?limit=100&t=year&count=100
  https://www.reddit.com/r/aww/top/.json?limit=100&t=all&count=100
*****/
function generateFetchUrl(subreddit, lastImgFetched, timefilter) {
  const pagination = lastImgFetched ? `&after=t3_${lastImgFetched.data.id}` : ''
  const urlQueryTimeFilter = timefilter === 'latest' ? '' : `&t=${timefilter}`
  const topPath = timefilter === 'latest' ? '' : `top/`
  return `https://www.reddit.com/r/${subreddit}/${topPath}.json?limit=100${urlQueryTimeFilter}&count=100${pagination}`
}

function processImages(images) {
  return pipe(filterImages, transformImageLinks)(images)
}

function filterImages(images) {
  return images.filter(({data: image}) => { // eslint-disable-line complexity
    // image.url.startsWith('/') must be before we use new URL as reddit cross-posts start with '/'
    if(image.stickied || image.url.startsWith('/')) return false
    
    const {hostname:imageDomain, pathname} = new URL(image.url)
    
    if(isVideo(pathname)) return false
    if(isValidImage(imageDomain, pathname)) return true

    return false
  })
}

function transformImageLinks(images) {
  return images.map(({data: image}) => {
    const imageUrl = new URL(image.url)
    /*****
      If it isnt a https://i.imgur.com/foo.jpg url and it's not an imgur gallery,
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
function isValidImage(imageDomain, pathname){
  return imageDomain === 'i.redd.it' || isImgur(imageDomain, pathname)
}
function isImgur(imageDomain, pathname){
  return imageDomain.endsWith('imgur.com') && notImgurGallery(pathname)
}
function notImgurGallery(pathname){
  return pathname.match(/\//gu).length === 1
}
function isVideo(pathname){
  return pathname.endsWith('.mp4') || pathname.endsWith('.gifv')
}

export {
  fetchSubImages
}