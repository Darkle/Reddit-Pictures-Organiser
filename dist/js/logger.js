import{PromiseCanceller,FetchError}from './Errors.js'
const logger={log(...args){console.log(...args)},error(...args){if(args[0]instanceof PromiseCanceller)return
if(args[0]instanceof FetchError){const error=args[0]
console.error(error.responseStatusText,error.response,error)
return}
console.error(...args)},debug(...args){if(window.location.port==='')return
console.info(`%c${getOriginalCallingFunctionDetails()} :`,'color: #AAAAAA;','\n',...args)},}
function getOriginalCallingFunctionDetails(){return(new Error()).stack.split('\n')[3].trim().slice(3)}
window.addEventListener('error',logger.error)
export{logger}