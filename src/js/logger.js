import { PromiseCanceller, FetchError } from './Errors.js'
// TODO: also log to rollbar, and also show a brief toast/notification of the error
  /* background-color:#fabd2f; --for errors */

const logger = {
  log(...args){
    console.log(...args)
  },
  error(...args) {
    if(args[0] instanceof PromiseCanceller) return
    if(args[0] instanceof FetchError){
      const error = args[0]
      console.error(error.responseStatusText, error.response, error)
      return
    }
    console.error(...args)
  },
  debug(...args){
    if(window.location.port === '') return
    
    console.info(
      `%c${getOriginalCallingFunctionDetails()} :`, 
      'color: #AAAAAA;', '\n', 
      ...args
    ) 
  },
  debugForProxys(...args){
    if(window.location.port === '') return
    
    const processedArgs = args.map(proxy => JSON.parse(JSON.stringify(proxy)))

    console.info(
      `%c${getOriginalCallingFunctionDetails()} :`, 
      'color: #AAAAAA;', '\n', 
      ...processedArgs
    ) 
  }  
}

//https://stackoverflow.com/a/57023880/2785644
function getOriginalCallingFunctionDetails(){
  return (new Error()).stack.split('\n')[3].trim().slice(3)
}

window.addEventListener('error', logger.error)

export {
  logger
}