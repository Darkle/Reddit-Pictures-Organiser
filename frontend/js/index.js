// @ts-ignore
import { h, app } from 'https://unpkg.com/hyperapp@2.0.4/src/index.js'

app({
  init: 0,
  view: state =>
    h("div", {}, [
      h("h1", {}, state),
      h("button", { onclick: state => state - 1 }, "subtract"),
      h("button", { onclick: state => state + 1 }, "add")
    ]),
  node: document.getElementById("app")
})