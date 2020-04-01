import {html} from '../../web_modules/lit-html.js'

function Handles(){
  return html`
    <div class="handle" data-handle="topLeft" draggable="true" @drag=${() => console.log('dragging')}></div>
    <div class="handle" data-handle="topRight" draggable="true" @drag=${() => console.log('dragging')}></div>
    <div class="handle" data-handle="bottomRight" draggable="true" @drag=${() => console.log('dragging')}></div>
    <div class="handle" data-handle="bottomLeft" draggable="true" @drag=${() => console.log('dragging')}></div>
  `
}

export {
  Handles
}