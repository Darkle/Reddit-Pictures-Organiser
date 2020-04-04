import{PromiseCanceller,FetchError}from './Errors.js'
import{isDev}from './utils.js'
let airbrake=null
const airbrakeProjectKey='62c354b1d6ebda85f9cf23ea60adf1c8'
const airbrakeProjectId=266488
const environment=isDev()?'development':'production'
const logger={log(...args){console.log(...args)},error(...args){if(args[0]instanceof PromiseCanceller)return
if(args[0]instanceof FetchError){const error=args[0]
console.error(error.responseStatusText,error.response,error)
return}
console.error(...args)
sendErrorToAirBrake(args)},debug(...args){if(!isDev())return
console.info(`%c${getOriginalCallingFunctionDetails()} :`,'color: #AAAAAA;','\n',...args)},}
function sendErrorToAirBrake(errors){import('./web_modules/@airbrake/browser.js').then(({Notifier})=>{if(!airbrake){airbrake=new Notifier({projectId:airbrakeProjectId,projectKey:airbrakeProjectKey,environment,})}
airbrake.notify(...errors)}).catch(err=>console.error(err))}
function getOriginalCallingFunctionDetails(){return(new Error()).stack.split('\n')[3].trim().slice(3)}
window.addEventListener('error',logger.error)
export{logger}