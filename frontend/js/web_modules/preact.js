var e,n,t,l,_,o={},r=[],u=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function i(e,n){for(var t in n)e[t]=n[t];return e}function s(e){var n=e.parentNode;n&&n.removeChild(e)}function c(e,n,t){var l,_=arguments,o={};for(l in n)"key"!==l&&"ref"!==l&&(o[l]=n[l]);if(arguments.length>3)for(t=[t],l=3;l<arguments.length;l++)t.push(_[l]);if(null!=t&&(o.children=t),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===o[l]&&(o[l]=e.defaultProps[l]);return p(e,o,n&&n.key,n&&n.ref)}function p(n,t,l,_){var o={type:n,props:t,key:l,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0};return e.vnode&&e.vnode(o),o}function f(e){return e.children}function a(e,n){this.props=e,this.context=n}function d(e,n){if(null==n)return e.__?d(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?d(e):null}function h(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return h(e)}}function v(_){(!_.__d&&(_.__d=!0)&&1===n.push(_)||l!==e.debounceRendering)&&((l=e.debounceRendering)||t)(y)}function y(){var e,t,l,_,o,r,u;for(n.sort((function(e,n){return n.__v.__b-e.__v.__b}));e=n.pop();)e.__d&&(l=void 0,_=void 0,r=(o=(t=e).__v).__e,(u=t.__P)&&(l=[],_=x(u,o,i({},o),t.__n,void 0!==u.ownerSVGElement,null,l,null==r?d(o):r),S(l,o),_!=r&&h(o)))}function m(e,n,t,l,_,u,i,c,p){var f,a,h,v,y,m,g,b=t&&t.__k||r,w=b.length;if(c==o&&(c=null!=u?u[0]:w?d(t,0):null),f=0,n.__k=k(n.__k,(function(t){if(null!=t){if(t.__=n,t.__b=n.__b+1,null===(h=b[f])||h&&t.key==h.key&&t.type===h.type)b[f]=void 0;else for(a=0;a<w;a++){if((h=b[a])&&t.key==h.key&&t.type===h.type){b[a]=void 0;break}h=null}if(v=x(e,t,h=h||o,l,_,u,i,c,p),(a=t.ref)&&h.ref!=a&&(g||(g=[]),h.ref&&g.push(h.ref,null,t),g.push(a,t.__c||v,t)),null!=v){var r;if(null==m&&(m=v),void 0!==t.__d)r=t.__d,t.__d=void 0;else if(u==h||v!=c||null==v.parentNode){e:if(null==c||c.parentNode!==e)e.appendChild(v),r=null;else{for(y=c,a=0;(y=y.nextSibling)&&a<w;a+=2)if(y==v)break e;e.insertBefore(v,c),r=c}"option"==n.type&&(e.value="")}c=void 0!==r?r:v.nextSibling,"function"==typeof n.type&&(n.__d=c)}}return f++,t})),n.__e=m,null!=u&&"function"!=typeof n.type)for(f=u.length;f--;)null!=u[f]&&s(u[f]);for(f=w;f--;)null!=b[f]&&N(b[f],b[f]);if(g)for(f=0;f<g.length;f++)C(g[f],g[++f],g[++f])}function k(e,n,t){if(null==t&&(t=[]),null==e||"boolean"==typeof e)n&&t.push(n(null));else if(Array.isArray(e))for(var l=0;l<e.length;l++)k(e[l],n,t);else t.push(n?n("string"==typeof e||"number"==typeof e?p(null,e,null,null):null!=e.__e||null!=e.__c?p(e.type,e.props,e.key,null):e):e);return t}function g(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]="number"==typeof t&&!1===u.test(n)?t+"px":null==t?"":t}function b(e,n,t,l,_){var o,r,u,i,s;if(_?"className"===n&&(n="class"):"class"===n&&(n="className"),"key"===n||"children"===n);else if("style"===n)if(o=e.style,"string"==typeof t)o.cssText=t;else{if("string"==typeof l&&(o.cssText="",l=null),l)for(r in l)t&&r in t||g(o,r,"");if(t)for(u in t)l&&t[u]===l[u]||g(o,u,t[u])}else"o"===n[0]&&"n"===n[1]?(i=n!==(n=n.replace(/Capture$/,"")),s=n.toLowerCase(),n=(s in e?s:n).slice(2),t?(l||e.addEventListener(n,w,i),(e.l||(e.l={}))[n]=t):e.removeEventListener(n,w,i)):"list"!==n&&"tagName"!==n&&"form"!==n&&"type"!==n&&"size"!==n&&!_&&n in e?e[n]=null==t?"":t:"function"!=typeof t&&"dangerouslySetInnerHTML"!==n&&(n!==(n=n.replace(/^xlink:?/,""))?null==t||!1===t?e.removeAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase(),t):null==t||!1===t?e.removeAttribute(n):e.setAttribute(n,t))}function w(n){this.l[n.type](e.event?e.event(n):n)}function x(n,t,l,_,o,r,u,s,c){var p,d,h,v,y,k,g,b,w,x,S=t.type;if(void 0!==t.constructor)return null;(p=e.__b)&&p(t);try{e:if("function"==typeof S){if(b=t.props,w=(p=S.contextType)&&_[p.__c],x=p?w?w.props.value:p.__:_,l.__c?g=(d=t.__c=l.__c).__=d.__E:("prototype"in S&&S.prototype.render?t.__c=d=new S(b,x):(t.__c=d=new a(b,x),d.constructor=S,d.render=D),w&&w.sub(d),d.props=b,d.state||(d.state={}),d.context=x,d.__n=_,h=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=S.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=i({},d.__s)),i(d.__s,S.getDerivedStateFromProps(b,d.__s))),v=d.props,y=d.state,h)null==S.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==S.getDerivedStateFromProps&&b!==v&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(b,x),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(b,d.__s,x)){for(d.props=b,d.state=d.__s,d.__d=!1,d.__v=t,t.__e=l.__e,t.__k=l.__k,d.__h.length&&u.push(d),p=0;p<t.__k.length;p++)t.__k[p]&&(t.__k[p].__=t);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(b,d.__s,x),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(v,y,k)}))}d.context=x,d.props=b,d.state=d.__s,(p=e.__r)&&p(t),d.__d=!1,d.__v=t,d.__P=n,p=d.render(d.props,d.state,d.context),t.__k=null!=p&&p.type==f&&null==p.key?p.props.children:p,null!=d.getChildContext&&(_=i(i({},_),d.getChildContext())),h||null==d.getSnapshotBeforeUpdate||(k=d.getSnapshotBeforeUpdate(v,y)),m(n,t,l,_,o,r,u,s,c),d.base=t.__e,d.__h.length&&u.push(d),g&&(d.__E=d.__=null),d.__e=!1}else t.__e=P(l.__e,t,l,_,o,r,u,c);(p=e.diffed)&&p(t)}catch(n){e.__e(n,t,l)}return t.__e}function S(n,t){e.__c&&e.__c(t,n),n.some((function(t){try{n=t.__h,t.__h=[],n.some((function(e){e.call(t)}))}catch(n){e.__e(n,t.__v)}}))}function P(e,n,t,l,_,u,i,s){var c,p,f,a,d,h=t.props,v=n.props;if(_="svg"===n.type||_,null==e&&null!=u)for(c=0;c<u.length;c++)if(null!=(p=u[c])&&(null===n.type?3===p.nodeType:p.localName===n.type)){e=p,u[c]=null;break}if(null==e){if(null===n.type)return document.createTextNode(v);e=_?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type,v.is&&{is:v.is}),u=null}if(null===n.type)null!=u&&(u[u.indexOf(e)]=null),h!==v&&e.data!=v&&(e.data=v);else if(n!==t){if(null!=u&&(u[u.indexOf(e)]=null,u=r.slice.call(e.childNodes)),f=(h=t.props||o).dangerouslySetInnerHTML,a=v.dangerouslySetInnerHTML,!s){if(h===o)for(h={},d=0;d<e.attributes.length;d++)h[e.attributes[d].name]=e.attributes[d].value;(a||f)&&(a&&f&&a.__html==f.__html||(e.innerHTML=a&&a.__html||""))}(function(e,n,t,l,_){var o;for(o in t)o in n||b(e,o,null,t[o],l);for(o in n)_&&"function"!=typeof n[o]||"value"===o||"checked"===o||t[o]===n[o]||b(e,o,n[o],t[o],l)})(e,v,h,_,s),n.__k=n.props.children,a||m(e,n,t,l,"foreignObject"!==n.type&&_,u,i,o,s),s||("value"in v&&void 0!==v.value&&v.value!==e.value&&(e.value=null==v.value?"":v.value),"checked"in v&&void 0!==v.checked&&v.checked!==e.checked&&(e.checked=v.checked))}return e}function C(n,t,l){try{"function"==typeof n?n(t):n.current=t}catch(n){e.__e(n,l)}}function N(n,t,l){var _,o,r;if(e.unmount&&e.unmount(n),(_=n.ref)&&(_.current&&_.current!==n.__e||C(_,null,t)),l||"function"==typeof n.type||(l=null!=(o=n.__e)),n.__e=n.__d=void 0,null!=(_=n.__c)){if(_.componentWillUnmount)try{_.componentWillUnmount()}catch(n){e.__e(n,t)}_.base=_.__P=null}if(_=n.__k)for(r=0;r<_.length;r++)_[r]&&N(_[r],t,l);null!=o&&s(o)}function D(e,n,t){return this.constructor(e,t)}function E(n,t,l){var u,i,s;e.__&&e.__(n,t),i=(u=l===_)?null:l&&l.__k||t.__k,n=c(f,null,[n]),s=[],x(t,(u?t:l||t).__k=n,i||o,o,void 0!==t.ownerSVGElement,l&&!u?[l]:i?null:r.slice.call(t.childNodes),s,l||o,u),S(s,n)}e={__e:function(e,n){for(var t,l;n=n.__;)if((t=n.__c)&&!t.__)try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError&&(l=!0,t.setState(t.constructor.getDerivedStateFromError(e))),null!=t.componentDidCatch&&(l=!0,t.componentDidCatch(e)),l)return v(t.__E=t)}catch(n){e=n}throw e}},a.prototype.setState=function(e,n){var t;t=this.__s!==this.state?this.__s:this.__s=i({},this.state),"function"==typeof e&&(e=e(t,this.props)),e&&i(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),v(this))},a.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},a.prototype.render=f,n=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,_=o;export{c as h,E as render};
//# sourceMappingURL=preact.js.map
