// @flow
const noop = ():void => {}
function identity<T>(param: T): T {
  return param
}
const pipe = (...fns: Function[]): Function => (param: any) => fns.reduce((result, fn) => fn(result), param)
const compose = (...fns: Function[]): Function => (param: any) => fns.reduceRight((acc, current) => current(acc), param)
const curry = (f: Function): Function => (...a: any[]) => (...b: any[]) => f(...a, ...b)
const curryRight = (f: Function): Function => (...a: any[]) => (...b: any[]) => f(...b, ...a)
const range = (start: number, end: number): number[] => Array.from({ length: (end - start) }, (v, k) => k + start)
/*****
rangeIncEnd: includes end number - useful if you actually want the numbers in the range instead of just the index range
*****/
const rangeIncEnd = (start: number, end: number): number[] => Array.from({ length: ((end - start) + 1) }, (v, k) => k + start)// eslint-disable-line no-magic-numbers

export{
  noop,
  identity,
  pipe,
  compose,
  curry,
  curryRight,
  range,
  rangeIncEnd,
}