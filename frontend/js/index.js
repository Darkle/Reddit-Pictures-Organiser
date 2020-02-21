import { observable, html } from './web_modules/sinuous.js'

const oneSecondInMS = 1000
const seconds = observable(0)
const Timer = props => {
  // Create an obervable with number `0`.

  function tick() {
    // Get the current value and increment the value with 1.
    seconds(seconds() + 1)
  }
  setInterval(tick, oneSecondInMS)

  // Creates the view of this component.
  return html`
    <div>${props.unit}: ${seconds}</div>
  `
}

document.querySelector('#app').append(
  // Use the component and pass some props.
  html`
    <${Timer} unit="Seconds" />
  `
)