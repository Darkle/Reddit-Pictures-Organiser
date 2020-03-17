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
    console.info(getOriginalCallingFunctionName(), 'color: #AAAAAA;',...args) 
  }  
}

//https://stackoverflow.com/a/57023880/2785644
function getOriginalCallingFunctionName(){
  const tempError = new Error()
  console.log('tempError.stack', tempError.stack)
  const stackLineOfCallingFunction = tempError.stack.split('\n')[3].trim()
  const lineNumber = stackLineOfCallingFunction.split(':').slice(-2).shift()
  const callingFuncName = stackLineOfCallingFunction.split(' ')[1]
  const lastForwardSlash = stackLineOfCallingFunction.lastIndexOf('/')
  const fileName = stackLineOfCallingFunction.slice(lastForwardSlash + 1, -1).split(':')[0]
  if(callingFuncName.startsWith('http')){
    console.log('final thing: ', `${callingFuncName} `)
  }
  return `%c${callingFuncName} (${fileName}:${lineNumber})`
}

export {
  logger
}