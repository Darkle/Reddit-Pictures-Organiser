import{html}from '../../web_modules/lit-html.js'
function Handles(){return html`
    <div class="handleLine" data-handle-line="top"></div>
    <div class="handleLine" data-handle-line="right"></div>
    <div class="handleLine" data-handle-line="bottom"></div>
    <div class="handleLine" data-handle-line="left"></div>
    <div class="handle" data-handle="topLeft" ></div>
    <div class="handle" data-handle="topRight" ></div>
    <div class="handle" data-handle="bottomRight" ></div>
    <div class="handle" data-handle="bottomLeft" ></div>
  `}
export{Handles}