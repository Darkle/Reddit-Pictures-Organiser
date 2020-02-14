// @flow
// @flow-ignore-line
if (module.hot) module.hot.accept()
import React from 'react'
import { render } from 'react-dom'
import '../css/index.css'

const mountNode = document.getElementById('app')

mountNode && render(<h1>Hello</h1>, mountNode)
const fn = (arr: Array<string | number>) => {
  // arr.push(123) NOTE! Array<string> passed in and after this it would also include numbers if allowed
  return arr
}

const arr: Array<string> = ['abc']

fn(arr)