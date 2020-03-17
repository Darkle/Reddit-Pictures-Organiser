import { PromiseCanceller } from './Errors.js'
// TODO: also log to rollbar, and also show a brief toast/notification of the error

const logger = {
  log(...args){
    console.log(...args)
  },
  error(...args) {
    if(args[0] instanceof PromiseCanceller) return
    console.error(...args)
  },
  debug(...args){
    if(window.location.port === '') return
    console.info(getOriginalCallingFunctionDetails(), 'color: #AAAAAA;', '\n', ...args) 
  }  
}

//https://stackoverflow.com/a/57023880/2785644
function getOriginalCallingFunctionDetails(){
  const tempError = new Error()
  const stackLineOfCallingFunction = tempError.stack.split('\n')[3].trim().slice(3)
  return `%c${stackLineOfCallingFunction} :`
}

export {
  logger
}