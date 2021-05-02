(function(e,t){if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=t(e,exports)}}else if(typeof define==="function"&&define.amd){define(["exports"],function(r){e.Lockr=t(e,r)})}else{e.Lockr=t(e,{})}})(this,function(e,t){"use strict";if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e){var t=this.length>>>0;var r=Number(arguments[1])||0;r=r<0?Math.ceil(r):Math.floor(r);if(r<0)r+=t;for(;r<t;r++){if(r in this&&this[r]===e)return r}return-1}}t.prefix="";t._getPrefixedKey=function(e,t){t=t||{};if(t.noPrefix){return e}else{return this.prefix+e}};t.set=function(e,t,r){var o=this._getPrefixedKey(e,r);try{localStorage.setItem(o,JSON.stringify({data:t}))}catch(r){if(console)console.warn("Lockr didn't successfully save the '{"+e+": "+t+"}' pair, because the localStorage is full.")}};t.get=function(e,t,r){var o=this._getPrefixedKey(e,r),n;try{n=JSON.parse(localStorage.getItem(o))}catch(e){if(localStorage[o]){n={data:localStorage.getItem(o)}}else{n=null}}if(!n){return t}else if(typeof n==="object"&&typeof n.data!=="undefined"){return n.data}};t.sadd=function(e,r,o){var n=this._getPrefixedKey(e,o),i;var f=t.smembers(e);if(f.indexOf(r)>-1){return null}try{f.push(r);i=JSON.stringify({data:f});localStorage.setItem(n,i)}catch(t){console.log(t);if(console)console.warn("Lockr didn't successfully add the "+r+" to "+e+" set, because the localStorage is full.")}};t.smembers=function(e,t){var r=this._getPrefixedKey(e,t),o;try{o=JSON.parse(localStorage.getItem(r))}catch(e){o=null}return o&&o.data?o.data:[]};t.sismember=function(e,r,o){return t.smembers(e).indexOf(r)>-1};t.keys=function(){var e=[];var r=Object.keys(localStorage);if(t.prefix.length===0){return r}r.forEach(function(r){if(r.indexOf(t.prefix)!==-1){e.push(r.replace(t.prefix,""))}});return e};t.getAll=function(e){var r=t.keys();if(e){return r.reduce(function(e,r){var o={};o[r]=t.get(r);e.push(o);return e},[])}return r.map(function(e){return t.get(e)})};t.srem=function(e,r,o){var n=this._getPrefixedKey(e,o),i,f;var a=t.smembers(e,r);f=a.indexOf(r);if(f>-1)a.splice(f,1);i=JSON.stringify({data:a});try{localStorage.setItem(n,i)}catch(t){if(console)console.warn("Lockr couldn't remove the "+r+" from the set "+e)}};t.rm=function(e){var t=this._getPrefixedKey(e);localStorage.removeItem(t)};t.flush=function(){if(t.prefix.length){t.keys().forEach(function(e){localStorage.removeItem(t._getPrefixedKey(e))})}else{localStorage.clear()}};return t});