import {router} from './router.js'

const noop = () => {}
const identity = (param) => param
const pipe = (...fns) => param => fns.reduce((result, fn) => fn(result), param)
const compose = (...fns) => value => fns.reduceRight((acc, current) => current(acc), value)
const curry = (f) => (...a) => (...b) => f(...a, ...b)
const curryRight = (f) => (...a) => (...b) => f(...b, ...a)
const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start)
/*****
rangeIncEnd: includes end number - useful if you actually want the numbers in the range instead of just the index range
*****/
const rangeIncEnd = (start, end) => Array.from({length: ((end - start) + 1)}, (v, k) => k + start) // eslint-disable-line no-magic-numbers


const $$ = q => Array.from(document.querySelectorAll(q))
const $ = document.querySelector.bind(document)

const notOnSubredditPage = () => {
  const url = router?.lastRouteResolved()?.url
  return !(url?.startsWith('/sub/') && url?.split('/').length === 3)
}

const setPageTitle = (title:string):void => {
  document.title = title // eslint-disable-line functional/immutable-data
}


export{
  noop,
  identity,
  pipe,
  compose,
  curry,
  curryRight,
  range,
  rangeIncEnd,
  $$,
  $,
  notOnSubredditPage,
  setPageTitle,
}