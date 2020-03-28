import {html} from '../../web_modules/lit-html.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'

function SubredditImagesContainer(subreddit, timefilter){
  return html`
    <div class="subredditImagesContainer">
      ${store.fetchedSubredditImages.map(image =>
        html`
          <div class="thumbnail-container">
            <img class="thumbnail" src=${getThumbnailSrc(image)} data-id=${image.id} data-permalink=${image.permalink} @mouseup=${ () => router.navigate(`/sub/${subreddit}/${timefilter}/imageviewer/${image.id}`)} />
          </div>
        `
      )}
    </div>
  `
}

/*****
  Sometimes the thumbnail property is 'spoiler', in that case fall through to src or url
  Sometimes the thumbnail is missing, in that case, return the url
  Sometimes the url is missing (i think if its nsfw), in that case, return src
*****/
function getThumbnailSrc ({thumbnail, src, url}) {
  if(thumbnail?.startsWith('http')) return thumbnail
  if(url) return url
  return src
}

export {
  SubredditImagesContainer
}