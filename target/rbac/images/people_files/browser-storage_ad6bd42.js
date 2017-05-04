define("common:widget/ui/browser-storage/browser-storage",function(e,t,r){var o=window.BrowserStorage||{version:"1.1"};o.localStorage=function(){function e(e){var e=e||{};if(window.localStorage.setItem(e.key,e.value),e.expires){var t=e.expires;"number"==typeof e.expires&&(t=new Date,t.setTime(t.getTime()+e.expires)),window.localStorage.setItem(e.key+".expires",t)}}function t(e){var t=null;if("string"==typeof e&&(e={key:e}),t=window.localStorage.getItem(e.key)){var r=window.localStorage.getItem(e.key+".expires");t={value:t,expires:r?new Date(r):null},t&&t.expires&&t.expires<new Date&&(t=null,window.localStorage.removeItem(e.key),window.localStorage.removeItem(e.key+".expires"))}return t?t.value:null}function r(e){window.localStorage.removeItem(e.key),window.localStorage.removeItem(e.key+".expires")}function o(){window.localStorage.clear()}function n(){for(var e,t=[],r=0,o=window.localStorage.length;o>r;r++)e=window.localStorage.key(r),/.+\.expires$/.test(e)||t.push(e);return t}return{get:t,set:e,remove:r,clearAll:o,getAllKeys:n}}(),o.userData=function(){function e(){var e=null;return e=document.createElement("input"),e.type="hidden",e.addBehavior("#default#userData"),document.body.appendChild(e),e}function t(t){try{var r=e(),o=t||{};if(o.expires){var n=o.expires;"number"==typeof o.expires&&(n=new Date,n.setTime(n.getTime()+o.expires)),r.expires=n.toUTCString()}r.setAttribute(o.key,o.value),r.save(o.key)}catch(a){}}function r(e){t(e);var r=o({key:l});r=r?{key:l,value:r}:{key:l,value:""},new RegExp("(^|\\|)"+e.key+"(\\||$)","g").test(r.value)||(r.value+="|"+e.key,t(r))}function o(t){try{var r=e();return r.load(t.key),r.getAttribute(t.key)||null}catch(o){return null}}function n(r){try{var n=e();n.load(r.key),n.removeAttribute(r.key);var a=new Date;a.setTime(a.getTime()-1),n.expires=a.toUTCString(),n.save(r.key);var i=o({key:l});i&&(i=i.replace(new RegExp("(^|\\|)"+r.key+"(\\||$)","g"),""),i={key:l,value:i},t(i))}catch(u){}}function a(){if(result=o({key:l}))for(var e=result.split("|"),t=e.length,r=0;t>r;r++)e[r]&&n({key:e[r]})}function i(){var e=[],t=o({key:l});if(t){t=t.split("|");for(var r=0,n=t.length;n>r;r++)t[r]&&e.push(t[r])}return e}var l="_baidu.ALL.KEY_";return{get:o,set:r,remove:n,clearAll:a,getAllKeys:i}}(),o.cookie=function(){var e=function(e){return new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(e)},t=function(t){var r=null;if(e(t.key)){var o=new RegExp("(^| )"+t.key+"=([^;/]*)/?(;|$)"),n=o.exec(document.cookie);n&&(r=n[2]||null)}return"string"==typeof r&&0!=t.decode?r=decodeURIComponent(r):null},r=function(t){if(e(t.key)){t=t||{},0!=t.encode&&(t.value=encodeURIComponent(t.value));var r=t.expires;r instanceof Date||(r=new Date,r.setTime("number"==typeof t.expires?r.getTime()+t.expires:r.getTime()+2592e6)),document.cookie=t.key+"="+t.value+(t.path?"; path="+("./"==t.path?"":t.path):"/")+(r?"; expires="+r.toGMTString():"")+(t.domain?"; domain="+t.domain:"")+(t.secure?"; secure":"")}},o=function(e){var o=t(e);null!=o&&(e.value=null,e.expires=-1,r(e))},n=function(){document.cookie=""},a=function(){var e=[],t=/(^| )([^=; ]+)=([^;]*)(;|\x24)/gim,r=(document.cookie||"").match(t);if(r)for(var o,n=0,a=r.length;a>n;n++)o=t.exec(r[n]),e.push(o[2]);return e};return{get:t,set:r,remove:o,clearAll:n,getAllKeys:a}}(),o.api=function(){var e=function(){var e=navigator.userAgent.toLowerCase();return{version:(e.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(e),opera:/opera/.test(e),msie:/msie/.test(e)&&!/opera/.test(e),mozilla:/mozilla/.test(e)&&!/(compatible|webkit)/.test(e)}}(),t=function(){var e=!1;try{e="localStorage"in window&&window.localStorage.getItem}catch(t){e=!1}return e},r=function(){return e.msie},n=function(e){return new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(e)},a=function(e,a){var i=function(e){if(n(e.key)){var i=e.expires;i instanceof Date||(i=new Date,i.setTime("number"==typeof e.expires?i.getTime()+e.expires:i.getTime()+2592e3)),e.expires=i,t()?o.localStorage.set(e):r()&&a?o.userData.set(e):o.cookie.set(e)}};if(e&&e.constructor===Array&&e instanceof Array)for(var l=0,u=e.length;u>l;l++)i(e[l]);else e&&i(e)},i=function(e,a){var i=function(e){var i=null;return"string"==typeof e&&(e={key:e}),n(e.key)?(i=t()?o.localStorage.get(e):r()&&a?o.userData.get(e):o.cookie.get(e),{key:e.key,value:i}):i},l=null;if(e&&e.constructor===Array&&e instanceof Array){l=[];for(var u=0,c=e.length;c>u;u++)l.push(i(e[u]))}else e&&(l=i(e));return l},l=function(e,a){var i=function(e){return"string"==typeof e&&(e={key:e}),n(e.key)?void(t()?o.localStorage.remove(e):r()&&a?o.userData.remove(e):o.cookie.remove(e)):result};if(e&&e.constructor===Array&&e instanceof Array)for(var l=0,u=e.length;u>l;l++)i(e[l]);else e&&i(e)},u=function(e){t()?o.localStorage.clearAll():r()&&e?o.userData.clearAll():o.cookie.clearAll()},c=function(e){var n=null;return n=t()?o.localStorage.getAllKeys():r()&&e?o.userData.getAllKeys():o.cookie.getAllKeys()};return{get:i,set:a,remove:l,clearAll:u,getAllKeys:c}}(),r.exports=o});