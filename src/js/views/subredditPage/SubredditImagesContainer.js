import { h } from '../../web_modules/superfine.js'

import {store} from '../../store/store.js'
import { router } from '../../router.js'

function SubredditImagesContainer(subreddit, timefilter){
  return h('div', {class:'subredditImagesContainer'}, [
    store.fetchedSubredditImages.map(image =>
      h('div', {class:'thumbnail-container'}, [
        h('img', {
          class: 'thumbnail',
          src: getThumbnailSrc(image),
          'data-id': image.id,
          'data-permalink': image.permalink,
          onmouseup: () => router.navigate(`/sub/${subreddit}/${timefilter}/imageviewer/${image.id}`),
        })
      ])
    )
  ])
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