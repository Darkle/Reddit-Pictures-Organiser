import {router} from './router.js'
import { store } from './store/store.js'
import { FetchError } from './Errors.js'

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
const rangeIncEnd = (start, end) => Array.from({length: ((end - start) + 1)}, (v, k) => k + start) 
// https://github.com/DrBoolean/Practically-Functional/blob/master/either.js
const Right = x => ({
  chain: f => f(x),
  ap: other => other.map(x),
  traverse: (of, f) => f(x).map(Right),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})
const Left = x => ({
  chain: _ => Left(x),
  ap: _ => Left(x),
  traverse: (of, _) => of(Left(x)),
  map: _ => Left(x),
  fold: (f, _) => f(x),
  inspect: () => `Left(${x})`
})
const fromNullable = x => x != null ? Right(x) : Left(null) // eslint-disable-line no-eq-null,eqeqeq
const tryCatch = f => {
  try { // eslint-disable-line functional/no-try-statement
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}
const Either = {
  Right,
  Left,
  tryCatch,
  fromNullable,
  of: Right,
}

const $$ = q => Array.from(document.querySelectorAll(q))
const $ = document.querySelector.bind(document)

const subPageNavigatedAway = timefilter => {
  const {url} = router.lastRouteResolved()
  if(!url.startsWith('/sub/')) return true
  if(url.startsWith('/sub/') && !url.endsWith(`/${timefilter}`)) return true
  return false
}
const setPageTitle = (title) => {
  document.title = title // eslint-disable-line functional/immutable-data
}
const noSubsStored = () => !store.favouriteSubreddits.length && !store.subreddits.length

const checkFetchResponseStatus = response => {
  if(response.ok) return response
  return Promise.reject(new FetchError(
    response.statusText?.length ? response.statusText : response.status, 
    response
  ))
}
const parseJSON = res => res.json()

const Fetcher = {
  getJSON: (path, params) => 
    fetch(path, params)
      .then(checkFetchResponseStatus)
      .then(parseJSON)
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
  subPageNavigatedAway,
  setPageTitle,
  noSubsStored,
  Either,
  Fetcher,
}