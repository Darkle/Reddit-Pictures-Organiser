const e=(e,...t)=>new Promise(n=>{n(e(...t))});var t=e,n=e;t.default=n;const r=e=>{if(!Number.isInteger(e)&&e!==1/0||!(e>0))return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));const n=[];let r=0;const o=()=>{r--,n.length>0&&n.shift()()},u=(e,n,...u)=>{r++;const c=t(e,...u);n(c),c.then(o,o)},c=(t,...o)=>new Promise(c=>((t,o,...c)=>{r<e?u(t,o,...c):n.push(u.bind(null,t,o,...c))})(t,c,...o));return Object.defineProperties(c,{activeCount:{get:()=>r},pendingCount:{get:()=>n.length}}),c};var o=r,u=r;o.default=u;export default o;