// @ts-ignore
if (module.hot) module.hot.accept()
import React, { useState } from 'react'
import { createContainer } from 'unstated-next'
import { render } from 'react-dom'
import '../css/index.css'

function useCounter(initialState = 0) {
  const [count, setCount] = useState(initialState)
  const decrement = () => setCount(count - 1)
  const increment = () => setCount(count + 1)
  return ({
    count,
    decrement,
    increment
  })
}

const Counter = createContainer(useCounter)

function CounterDisplay() {
  const counter = Counter.useContainer()
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  )
}

function App() {
  return (
    <Counter.Provider>
      <CounterDisplay />
      <Counter.Provider initialState={2}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Counter.Provider>
    </Counter.Provider>
  )
}

render(<App />, document.getElementById('app'))