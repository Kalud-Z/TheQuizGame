!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=27)}([function(e,t,n){"use strict";var r=n(1),o=Object.prototype.toString;function s(e){return"[object Array]"===o.call(e)}function i(e){return void 0===e}function u(e){return null!==e&&"object"==typeof e}function a(e){return"[object Function]"===o.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:u,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:a,isStream:function(e){return u(e)&&a(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:c,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},deepMerge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]="object"==typeof n?e({},n):n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(r.isURLSearchParams(t))s=t.toString();else{var i=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),s=i.join("&")}if(s){var u=e.indexOf("#");-1!==u&&(e=e.slice(0,u)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(16),s={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,a={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(u=n(5)),u),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],(function(e){a.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){a.headers[e]=r.merge(s)})),e.exports=a}).call(this,n(15))},function(e,t,n){"use strict";var r=n(0),o=n(17),s=n(2),i=n(19),u=n(22),a=n(23),c=n(6);e.exports=function(e){return new Promise((function(t,f){var l=e.data,d=e.headers;r.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password||"";d.Authorization="Basic "+btoa(h+":"+m)}var y=i(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),s(y,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?u(p.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:n,config:e,request:p};o(t,f,r),p=null}},p.onabort=function(){p&&(f(c("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){f(c("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),f(c(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var v=n(24),g=(e.withCredentials||a(y))&&e.xsrfCookieName?v.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in p&&r.forEach(d,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),f(e),p=null)})),void 0===l&&(l=null),p.send(l)}))}},function(e,t,n){"use strict";var r=n(18);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){t=t||{};var n={},o=["url","method","params","data"],s=["headers","auth","proxy"],i=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];r.forEach(o,(function(e){void 0!==t[e]&&(n[e]=t[e])})),r.forEach(s,(function(o){r.isObject(t[o])?n[o]=r.deepMerge(e[o],t[o]):void 0!==t[o]?n[o]=t[o]:r.isObject(e[o])?n[o]=r.deepMerge(e[o]):void 0!==e[o]&&(n[o]=e[o])})),r.forEach(i,(function(r){void 0!==t[r]?n[r]=t[r]:void 0!==e[r]&&(n[r]=e[r])}));var u=o.concat(s).concat(i),a=Object.keys(t).filter((function(e){return-1===u.indexOf(e)}));return r.forEach(a,(function(r){void 0!==t[r]?n[r]=t[r]:void 0!==e[r]&&(n[r]=e[r])})),n}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){e.exports=n(10)},function(e,t,n){"use strict";var r=n(0),o=n(1),s=n(11),i=n(7);function u(e){var t=new s(e),n=o(s.prototype.request,t);return r.extend(n,s.prototype,t),r.extend(n,t),n}var a=u(n(4));a.Axios=s,a.create=function(e){return u(i(a.defaults,e))},a.Cancel=n(8),a.CancelToken=n(25),a.isCancel=n(3),a.all=function(e){return Promise.all(e)},a.spread=n(26),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";var r=n(0),o=n(2),s=n(12),i=n(13),u=n(7);function a(e){this.defaults=e,this.interceptors={request:new s,response:new s}}a.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=u(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},a.prototype.getUri=function(e){return e=u(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){a.prototype[e]=function(t,n){return this.request(r.merge(n||{},{method:e,url:t}))}})),r.forEach(["post","put","patch"],(function(e){a.prototype[e]=function(t,n,o){return this.request(r.merge(o||{},{method:e,url:t,data:n}))}})),e.exports=a},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(14),s=n(3),i=n(4);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return u(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(u(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},function(e,t){var n,r,o=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(e){n=s}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var a,c=[],f=!1,l=-1;function d(){f&&a&&(f=!1,a.length?c=a.concat(c):l=-1,c.length&&p())}function p(){if(!f){var e=u(d);f=!0;for(var t=c.length;t;){for(a=c,c=[];++l<t;)a&&a[l].run();l=-1,t=c.length}a=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new h(e,t)),1!==c.length||f||u(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){"use strict";var r=n(6);e.exports=function(e,t,n){var o=n.config.validateStatus;!o||o(n.status)?e(n):t(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(20),o=n(21);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}})),i):i}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,s,i){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(s)&&u.push("domain="+s),!0===i&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(8);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";n.r(t);const r={container:document.querySelector(".container"),numOfQuestionsToPlay:document.querySelector(".number-of-questions-to-play"),startButton:document.querySelector(".start-button"),numOfQuestionsInput:document.querySelector(".number-of-questions-to-play"),startPageContainer:document.querySelector(".start-page-container"),questionContainer:document.querySelector(".question-container"),questionNumberDisplay:document.querySelector(".question-container__title"),allPossibleAnswers:document.getElementsByName("possible-answer"),nextButton:document.querySelector(".next-question-button"),scoreButton:document.querySelector(".score-button"),questionAndOptionsContainer:document.querySelector(".questionAndOptionsContainer"),theQuestion:document.querySelector(".question"),option_1_text:document.querySelector(".option-1-text"),option_2_text:document.querySelector(".option-2-text"),option_3_text:document.querySelector(".option-3-text"),allOptions:document.querySelectorAll('span[class^="option"]'),resultsContainer:document.querySelector(".results-container"),scoreOutput:document.querySelector(".results-container__score"),playAgainButton:document.querySelector(".play-again-button"),answersContainer:document.querySelector(".answers-container"),tableBody:document.querySelector(".table__body"),answersButton:document.querySelector(".answers-button"),goBackToScoreButton:document.querySelector(".go-back-button")};var o=n(9),s=n.n(o);class i{constructor(e=10){this.numOfQuestions=e}async getResults(){try{const e=await s()(`https://opentdb.com/api.php?amount=${this.numOfQuestions}&category=17`);this.questions=e.data.results,console.log(this.questions)}catch(e){alert("Error")}}}const u=(e,t)=>{r.questionContainer.innerHTML="",c();const n=(e=>{let t="";return e.forEach((e,n)=>{t+=`<input type="radio" name="possible-answer" value="option${n+1}" class="option-${n+1}-radio">\n        <span class="option-${n+1}-text">${e}</span> <br>`}),t})([...e.incorrect_answers,e.correct_answer]),o=`<h1 class="question-container__title" > Question Number ${t+1} </h1> \n        <form>\n            <div class="questionAndOptionsContainer" >\n            <p class="question"> ${e.question} </p> ${n} \n            </div>\n            \n            <input type="button" value="Next >" class="btn next-question-button show">\n            <input type="button" value="See results >" class="btn score-button">\n        </form>\n        `;r.questionContainer.insertAdjacentHTML("afterbegin",o)},a=()=>{let e;return console.log("this are alloptuons"),console.log(r.allOptions),Array.from(r.allOptions).forEach(t=>{t.previousSibling.checked&&(e=t.innerText)}),e},c=()=>{r.allPossibleAnswers.forEach(e=>e.checked=!1)},f={nextQuestionIndex:0};window.q=f;const l=()=>{const e=a();f.questionsObj.questions[f.nextQuestionIndex-1].chosen_answer=e,u(f.questionsObj.questions[f.nextQuestionIndex],f.nextQuestionIndex),f.nextQuestionIndex===f.questionsObj.numOfQuestions-1&&(document.querySelector(".next-question-button").classList.remove("show"),document.querySelector(".score-button").classList.add("show")),f.nextQuestionIndex++},d=()=>{const e=a();f.questionsObj.questions[f.nextQuestionIndex-1].chosen_answer=e,r.questionContainer.classList.remove("show"),r.resultsContainer.classList.add("show"),((e,t)=>{r.scoreOutput.innerText=e+"/"+t})((e=>{let t=0;return e.forEach(e=>{e.chosen_answer===e.correct_answer&&(t+=10)}),t})(f.questionsObj.questions),10*f.questionsObj.numOfQuestions)};r.startButton.addEventListener("click",async()=>{const e=(()=>{let e,t,n;return e=r.numOfQuestionsToPlay,t=e.options[e.selectedIndex].text,n=parseInt(t),console.log(n),console.log(typeof n),n})();f.questionsObj=new i(e),await f.questionsObj.getResults(),r.startPageContainer.classList.remove("show"),r.questionContainer.classList.add("show"),u(f.questionsObj.questions[f.nextQuestionIndex],f.nextQuestionIndex),f.nextQuestionIndex++}),r.questionContainer.addEventListener("click",e=>{e.target.matches(".next-question-button")?l():e.target.matches(".score-button")&&d()}),r.playAgainButton.addEventListener("click",()=>{f.questionsObj={},f.nextQuestionIndex=0,r.questionContainer.classList.remove("show"),r.resultsContainer.classList.remove("show"),r.startPageContainer.classList.add("show"),document.querySelector(".next-question-button").classList.add("show"),document.querySelector(".score-button").classList.remove("show"),r.tableBody.innerHTML=""}),r.answersButton.addEventListener("click",()=>{r.questionContainer.classList.remove("show"),r.resultsContainer.classList.remove("show"),r.startPageContainer.classList.remove("show"),r.answersContainer.classList.add("show"),r.container.classList.add("full-height"),0===r.tableBody.childElementCount&&(e=>{let t,n,o;e.forEach((e,s)=>{e.chosen_answer!==e.correct_answer?(n="&#10060;",o="chosen-answer-is-incorrect"):(n="&#10004;",o="chosen-answer-is-correct"),t=`\n                <tr>\n                <td> ${s+1} </td>\n                <td> ${e.question} </td>\n                <td class="table-correct-answer"> ${e.correct_answer} </td>\n                <td class=${o}> ${e.chosen_answer} </td>\n                <td> ${n} </td>\n                </tr>`,r.tableBody.insertAdjacentHTML("beforeend",t)})})(f.questionsObj.questions)}),r.goBackToScoreButton.addEventListener("click",()=>{r.questionContainer.classList.remove("show"),r.resultsContainer.classList.add("show"),r.startPageContainer.classList.remove("show"),r.answersContainer.classList.remove("show"),r.container.classList.remove("full-height")})}]);