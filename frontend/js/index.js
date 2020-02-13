// @flow
// @flow-ignore-line
if (module.hot) module.hot.accept()
import React from 'react'
import { render } from 'react-dom'
import '../css/index.css'

const mountNode = document.getElementById('app')

mountNode && render(<h1>Hello</h1>, mountNode)

type Point2d = {|
  x: number,
  y: number
|};
const myPoint: Point2d = {
  X: 1,
  y: 2
};
console.log(myPoint.x, myPoint.y)