// @flow
const noop = ():void => {}
function identity<T>(param: T): T {
  return param
}
//https://stackoverflow.com/a/60230812/2785644
const pipe = <T>(...fns: $ReadOnlyArray<T => T>): (T => T) => {
  return (param) => {
    return fns.reduce((result, fn) => fn(result), param)
  }
}
const compose = (...fns: $ReadOnlyArray<any>): any => (param: any) => fns.reduceRight((acc, current) => current(acc), param)
const curry = (f: any): any => (...a: $ReadOnlyArray<any>) => (...b: $ReadOnlyArray<any>) => f(...a, ...b)
const curryRight = (f: any): any => (...a: $ReadOnlyArray<any>) => (...b: $ReadOnlyArray<any>) => f(...b, ...a)
const range = (start: number, end: number): $ReadOnlyArray<number> => Array.from({ length: (end - start) }, (v, k) => k + start)
/*****
rangeIncEnd: includes end number - useful if you actually want the numbers in the range instead of just the index range
*****/
const rangeIncEnd = (start: number, end: number): $ReadOnlyArray<number> => Array.from({ length: ((end - start) + 1) }, (v, k) => k + start)// eslint-disable-line no-magic-numbers

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