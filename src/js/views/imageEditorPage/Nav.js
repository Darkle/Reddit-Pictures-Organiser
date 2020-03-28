import { h } from '../../web_modules/superfine.js'

import { router } from '../../router.js'
import { $ } from '../../utils.js'
import { cropImage, rotateLeft, rotateRight, saveEdits, cancelEditsOnNavAway} from './editing.js'

function Nav(subreddit, timefilter, imageId){ // eslint-disable-line max-lines-per-function
  return h('nav', [
    h('div', {class: 'back', onmouseup: () => handleBackNavigation(subreddit, timefilter, imageId)}, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 22, // eslint-disable-line no-magic-numbers
        height: 22, // eslint-disable-line no-magic-numbers
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#fff4e8',
        'stroke-width': 3,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('path', {d: 'M15 18l-6-6 6-6'})
      ])
    ]),
    h('div', {class: 'crop', onmouseup: () => cropImage(subreddit, timefilter, imageId)}, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        style: 'width:24px;height:24px',
        viewBox: '0 0 24 24',
      }, [
        h('path', {fill: '#fff4e8', d: 'M7,17V1H5V5H1V7H5V17A2,2 0 0,0 7,19H17V23H19V19H23V17M17,15H19V7C19,5.89 18.1,5 17,5H9V7H17V15Z'})
      ])
    ]),
    h('div', {class: 'rotateLeft', onmouseup: () => rotateLeft(subreddit, timefilter, imageId)}, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 22, // eslint-disable-line no-magic-numbers
        height: 22, // eslint-disable-line no-magic-numbers
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#fff4e8',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('path', {d: 'M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38'})
      ])
    ]),
    h('div', {class: 'rotateRight', onmouseup: () => rotateRight(subreddit, timefilter, imageId)}, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 22, // eslint-disable-line no-magic-numbers
        height: 22, // eslint-disable-line no-magic-numbers
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#fff4e8',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('path', {d: 'M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38'})
      ])
    ]),
    h('div', {class: 'save', onmouseup: saveEdits}, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 22, // eslint-disable-line no-magic-numbers
        height: 22, // eslint-disable-line no-magic-numbers
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: '#fff4e8',
        'stroke-width': 3,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('polyline', {points: '20 6 9 17 4 12'})
      ])
    ]),
  ])
}

function handleBackNavigation(subreddit, timefilter, imageId){
  cancelEditsOnNavAway()
  router.navigate(`/sub/${subreddit}/${timefilter}/imageviewer/${imageId}`)
  // superfine patch is severely broken, so need to remove a wayward text node.
  setTimeout(() => $('#app').firstChild.nextSibling.remove(), 50) // eslint-disable-line no-magic-numbers
}

export {
  Nav
}