import{html}from '../../web_modules/lit-html.js'
import{store}from '../../store/store.js'
import{router}from '../../router.js'
function ThumbnailsContainer(state){const images=state.folderpage?store.folders[state.folderpage]:store.fetchedSubredditImages
const navUrl=image=>state.folderpage?`/folders/${state.folderpage}/imageviewer/${image.id}`:`/sub/${state.subreddit}/${state.timefilter}/imageviewer/${image.id}`
const imgNavigate=image=>router.navigate(navUrl(image))
return html`
    <div class="thumbnailsImagesContainer">
      ${images.map(image=>html`
          <div class="thumbnail-container">
            <img class="thumbnail" src=${getThumbnailSrc(image)} data-id=${image.id} data-permalink=${image.permalink}
               @mouseup=${()=>imgNavigate(image)} />
          </div>
        `)}
    </div>
  `}
function getThumbnailSrc({thumbnail,src,url}){if(thumbnail?.startsWith('http'))return thumbnail
if(url)return url
return src}
export{ThumbnailsContainer}