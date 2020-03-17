import { UserNavigatedAway } from './Errors.js'
// TODO: also log to rollbar, and also show a toast/notification of the error

const logger = {
  log(...args){
    console.log(...args)
  },
  error(...args) {
    if(args[0] instanceof UserNavigatedAway) return
    console.log(...args)
  },
  debug(...args){
    if(window.location.port !== '') return
    console.log(getOriginalCallingFunctionName(), ...args) 
  }  
}

//https://stackoverflow.com/a/57023880/2785644
function getOriginalCallingFunctionName(){
  const tempError = new Error()
  const stackLineOfCallingFunction = tempError.stack.split('\n')[3].trim()
  const lastForwardSlash = stackLineOfCallingFunction.lastIndexOf('/')
  const [callingFuncName, lineNumber] = stackLineOfCallingFunction.slice(lastForwardSlash + 1, -1).replace('.js', '').split(':')
  return `${callingFuncName} (line:${lineNumber})`
}

export {
  logger
}