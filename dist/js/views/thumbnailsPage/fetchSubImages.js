import{pipe,subPageNavigatedAway,Fetcher,isFavMixPage}from '../../utils.js'
import{store}from '../../store/store.js'
import{logger}from '../../logger.js'
import{UserNavigatedAway,NoMoreImagesToFetch}from '../../Errors.js'
function fetchSubImages({subreddit,lastImgFetched,timefilter}){if(subPageNavigatedAway(timefilter))return Promise.reject(new UserNavigatedAway())
logger.debug(generateFetchUrl(subreddit,lastImgFetched,timefilter))
return Fetcher.getJSON(generateFetchUrl(subreddit,lastImgFetched,timefilter)).then(resp=>{if(subPageNavigatedAway(timefilter))return Promise.reject(new UserNavigatedAway())
const images=resp.data?.children??[]
const processedImages=processImages(images)
logger.debug(processedImages)
if(noMoreImagesFoundInFavMixSub(images,processedImages)){return Promise.reject(new NoMoreImagesToFetch())}
store.storeFetchedSubredditImages(processedImages)
const lastImageFetched=images[images.length-1]
return lastImageFetched})}
function noMoreImagesFoundInFavMixSub(images,processedImages){return isFavMixPage()&&(!images.length||!processedImages.length)}
function generateFetchUrl(subreddit,lastImgFetched,timefilter){const pagination=lastImgFetched?`&after=t3_${lastImgFetched.data.id}`:''
const urlQueryTimeFilter=timefilter==='latest'?'':`&t=${timefilter}`
const topPath=timefilter==='latest'?'':`top/`
return `https://www.reddit.com/r/${subreddit}/${topPath}.json?limit=100${urlQueryTimeFilter}&count=100${pagination}`}
function processImages(images){return pipe(filterImages,transformImageLinks)(images)}
function filterImages(images){return images.filter(({data:image})=>{if(image.stickied||image.url.startsWith('/'))return false
const{hostname:imageDomain,pathname}=new URL(image.url)
if(isVideo(pathname))return false
if(isValidImage(imageDomain,pathname))return true
return false})}
function transformImageLinks(images){return images.map(({data:image})=>{const imageUrl=new URL(image.url)
if(imageUrl.hostname.startsWith('imgur.com')&&notImgurGallery(imageUrl.pathname)){imageUrl.pathname=imageUrl.pathname+'.jpg'
imageUrl.hostname='i.'+imageUrl.hostname
image.url=imageUrl.href
return image}
return image})}
function isValidImage(imageDomain,pathname){return isRedditImage(imageDomain)||isImgur(imageDomain,pathname)}
function isRedditImage(imageDomain){return imageDomain==='i.redd.it'}
function isImgur(imageDomain,pathname){return imageDomain.endsWith('imgur.com')&&notImgurGallery(pathname)}
function notImgurGallery(pathname){return pathname.match(/\//gu).length===1}
function isVideo(pathname){return pathname.endsWith('.mp4')||pathname.endsWith('.webm')||pathname.endsWith('.gifv')}
export{fetchSubImages}