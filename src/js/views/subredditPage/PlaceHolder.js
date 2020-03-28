import { h } from '../../web_modules/superfine.js'

import { Nav } from './Nav.js'

function PlaceHolder(timefilter, showLoadingPlaceholder, subreddit){
  return h('main', {id: 'app', class: 'subredditPage'}, [
    Nav(timefilter, subreddit),
    h('div', {class: 'subredditImagesContainer'}, [
      h('div', {class: 'subLoadingNotifier'}, showLoadingPlaceholder ? 'Loading Images...' : 'No Images Found')
    ])
  ])
}

export {
  PlaceHolder
}