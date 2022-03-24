var covid;
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "webpack/container/entry/covid":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var moduleMap = {
	"./Covid": function() {
		return Promise.all([__webpack_require__.e("vendors-node_modules_antd_es_card_index_js-node_modules_antd_es_date-picker_generatePicker_in-c03032"), __webpack_require__.e("webpack_sharing_consume_default_react_react"), __webpack_require__.e("src_State_js-webpack_sharing_consume_default_react-dom_react-dom")]).then(function() { return function() { return (__webpack_require__(/*! ./src/State.js */ "./src/State.js")); }; });
	}
};
var get = function(module, getScope) {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(function() {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = function(shareScope, initScope) {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: function() { return get; },
	init: function() { return init; }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "sars-cov-2:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	!function() {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = function(name, initScope) {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = function(msg) { return typeof console !== "undefined" && console.warn && console.warn(msg); };
/******/ 			var uniqueName = "sars-cov-2";
/******/ 			var register = function(name, version, factory, eager) {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = function(id) {
/******/ 				var handleError = function(err) { warn("Initialization of sharing external failed: " + err); };
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = function(module) { return module && module.init && module.init(__webpack_require__.S[name], initScope); }
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 				case "default": {
/******/ 					register("react-dom", "17.0.2", function() { return Promise.all([__webpack_require__.e("vendors-node_modules_react-dom_index_js"), __webpack_require__.e("webpack_sharing_consume_default_react_react"), __webpack_require__.e("node_modules_object-assign_index_js-_320c0")]).then(function() { return function() { return __webpack_require__(/*! ./node_modules/react-dom/index.js */ "./node_modules/react-dom/index.js"); }; }); });
/******/ 					register("react", "17.0.2", function() { return Promise.all([__webpack_require__.e("vendors-node_modules_react_index_js"), __webpack_require__.e("node_modules_object-assign_index_js-_320c1")]).then(function() { return function() { return __webpack_require__(/*! ./node_modules/react/index.js */ "./node_modules/react/index.js"); }; }); });
/******/ 				}
/******/ 				break;
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(function() { return initPromises[name] = 1; });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/consumes */
/******/ 	!function() {
/******/ 		var parseVersion = function(str) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var p=function(p){return p.split(".").map((function(p){return+p==p?+p:p}))},n=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),r=n[1]?p(n[1]):[];return n[2]&&(r.length++,r.push.apply(r,p(n[2]))),n[3]&&(r.push([]),r.push.apply(r,p(n[3]))),r;
/******/ 		}
/******/ 		var versionLt = function(a, b) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			a=parseVersion(a),b=parseVersion(b);for(var r=0;;){if(r>=a.length)return r<b.length&&"u"!=(typeof b[r])[0];var e=a[r],n=(typeof e)[0];if(r>=b.length)return"u"==n;var t=b[r],f=(typeof t)[0];if(n!=f)return"o"==n&&"n"==f||("s"==f||"u"==n);if("o"!=n&&"u"!=n&&e!=t)return e<t;r++}
/******/ 		}
/******/ 		var rangeToString = function(range) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var r=range[0],n="";if(1===range.length)return"*";if(r+.5){n+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var e=1,a=1;a<range.length;a++){e--,n+="u"==(typeof(t=range[a]))[0]?"-":(e>0?".":"")+(e=2,t)}return n}var g=[];for(a=1;a<range.length;a++){var t=range[a];g.push(0===t?"not("+o()+")":1===t?"("+o()+" || "+o()+")":2===t?g.pop()+" "+g.pop():rangeToString(t))}return o();function o(){return g.pop().replace(/^\((.+)\)$/,"$1")}
/******/ 		}
/******/ 		var satisfy = function(range, version) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			if(0 in range){version=parseVersion(version);var e=range[0],r=e<0;r&&(e=-e-1);for(var n=0,i=1,a=!0;;i++,n++){var f,s,g=i<range.length?(typeof range[i])[0]:"";if(n>=version.length||"o"==(s=(typeof(f=version[n]))[0]))return!a||("u"==g?i>e&&!r:""==g!=r);if("u"==s){if(!a||"u"!=g)return!1}else if(a)if(g==s)if(i<=e){if(f!=range[i])return!1}else{if(r?f>range[i]:f<range[i])return!1;f!=range[i]&&(a=!1)}else if("s"!=g&&"n"!=g){if(r||i<=e)return!1;a=!1,i--}else{if(i<=e||s<g!=r)return!1;a=!1}else"s"!=g&&"n"!=g&&(a=!1,i--)}}var t=[],o=t.pop.bind(t);for(n=1;n<range.length;n++){var u=range[n];t.push(1==u?o()|o():2==u?o()&o():u?satisfy(u,version):!o())}return!!o();
/******/ 		}
/******/ 		var ensureExistence = function(scopeName, key) {
/******/ 			var scope = __webpack_require__.S[scopeName];
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) throw new Error("Shared module " + key + " doesn't exist in shared scope " + scopeName);
/******/ 			return scope;
/******/ 		};
/******/ 		var findVersion = function(scope, key) {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce(function(a, b) {
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var findSingletonVersionKey = function(scope, key) {
/******/ 			var versions = scope[key];
/******/ 			return Object.keys(versions).reduce(function(a, b) {
/******/ 				return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
/******/ 			}, 0);
/******/ 		};
/******/ 		var getInvalidSingletonVersionMessage = function(scope, key, version, requiredVersion) {
/******/ 			return "Unsatisfied version " + version + " from " + (version && scope[key][version].from) + " of shared singleton module " + key + " (required " + rangeToString(requiredVersion) + ")"
/******/ 		};
/******/ 		var getSingleton = function(scope, scopeName, key, requiredVersion) {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getSingletonVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) typeof console !== "undefined" && console.warn && console.warn(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getStrictSingletonVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) throw new Error(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var findValidVersion = function(scope, key, requiredVersion) {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce(function(a, b) {
/******/ 				if (!satisfy(requiredVersion, b)) return a;
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var getInvalidVersionMessage = function(scope, scopeName, key, requiredVersion) {
/******/ 			var versions = scope[key];
/******/ 			return "No satisfying version (" + rangeToString(requiredVersion) + ") of shared module " + key + " found in shared scope " + scopeName + ".\n" +
/******/ 				"Available versions: " + Object.keys(versions).map(function(key) {
/******/ 				return key + " from " + versions[key].from;
/******/ 			}).join(", ");
/******/ 		};
/******/ 		var getValidVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			var entry = findValidVersion(scope, key, requiredVersion);
/******/ 			if(entry) return get(entry);
/******/ 			throw new Error(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var warnInvalidVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			typeof console !== "undefined" && console.warn && console.warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var get = function(entry) {
/******/ 			entry.loaded = 1;
/******/ 			return entry.get()
/******/ 		};
/******/ 		var init = function(fn) { return function(scopeName, a, b, c) {
/******/ 			var promise = __webpack_require__.I(scopeName);
/******/ 			if (promise && promise.then) return promise.then(fn.bind(fn, scopeName, __webpack_require__.S[scopeName], a, b, c));
/******/ 			return fn(scopeName, __webpack_require__.S[scopeName], a, b, c);
/******/ 		}; };
/******/ 		
/******/ 		var load = /*#__PURE__*/ init(function(scopeName, scope, key) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findVersion(scope, key));
/******/ 		});
/******/ 		var loadFallback = /*#__PURE__*/ init(function(scopeName, scope, key, fallback) {
/******/ 			return scope && __webpack_require__.o(scope, key) ? get(findVersion(scope, key)) : fallback();
/******/ 		});
/******/ 		var loadVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingleton = /*#__PURE__*/ init(function(scopeName, scope, key) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getValidVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingletonFallback = /*#__PURE__*/ init(function(scopeName, scope, key, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			var entry = scope && __webpack_require__.o(scope, key) && findValidVersion(scope, key, version);
/******/ 			return entry ? get(entry) : fallback();
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var installedModules = {};
/******/ 		var moduleToHandlerMapping = {
/******/ 			"webpack/sharing/consume/default/react/react": function() { return loadSingletonVersionCheckFallback("default", "react", [1,17,0,1], function() { return __webpack_require__.e("vendors-node_modules_react_index_js").then(function() { return function() { return __webpack_require__(/*! react */ "./node_modules/react/index.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/react-dom/react-dom": function() { return loadSingletonVersionCheckFallback("default", "react-dom", [1,17,0,1], function() { return __webpack_require__.e("vendors-node_modules_react-dom_index_js").then(function() { return function() { return __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"); }; }); }); }
/******/ 		};
/******/ 		// no consumes in initial chunks
/******/ 		var chunkMapping = {
/******/ 			"webpack_sharing_consume_default_react_react": [
/******/ 				"webpack/sharing/consume/default/react/react"
/******/ 			],
/******/ 			"src_State_js-webpack_sharing_consume_default_react-dom_react-dom": [
/******/ 				"webpack/sharing/consume/default/react-dom/react-dom"
/******/ 			]
/******/ 		};
/******/ 		__webpack_require__.f.consumes = function(chunkId, promises) {
/******/ 			if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 				chunkMapping[chunkId].forEach(function(id) {
/******/ 					if(__webpack_require__.o(installedModules, id)) return promises.push(installedModules[id]);
/******/ 					var onFactory = function(factory) {
/******/ 						installedModules[id] = 0;
/******/ 						__webpack_require__.m[id] = function(module) {
/******/ 							delete __webpack_require__.c[id];
/******/ 							module.exports = factory();
/******/ 						}
/******/ 					};
/******/ 					var onError = function(error) {
/******/ 						delete installedModules[id];
/******/ 						__webpack_require__.m[id] = function(module) {
/******/ 							delete __webpack_require__.c[id];
/******/ 							throw error;
/******/ 						}
/******/ 					};
/******/ 					try {
/******/ 						var promise = moduleToHandlerMapping[id]();
/******/ 						if(promise.then) {
/******/ 							promises.push(installedModules[id] = promise.then(onFactory)['catch'](onError));
/******/ 						} else onFactory(promise);
/******/ 					} catch(e) { onError(e); }
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"covid": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if("webpack_sharing_consume_default_react_react" != chunkId) {
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksars_cov_2"] = self["webpackChunksars_cov_2"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/covid");
/******/ 	covid = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOLEtBQUssV0FBVztXQUNoQixHQUFHO1dBQ0g7V0FDQTs7Ozs7V0MzS0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQzs7V0FFakM7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQSwyREFBMkQsb0VBQW9FO1dBQy9IOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNO1dBQ047V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBOzs7OztVRXZGQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9jb250YWluZXItZW50cnkiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi93ZWJwYWNrL3J1bnRpbWUvc2hhcmluZyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9ydW50aW1lL2NvbnN1bWVzIiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NhcnMtY292LTIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBtb2R1bGVNYXAgPSB7XG5cdFwiLi9Db3ZpZFwiOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW19fd2VicGFja19yZXF1aXJlX18uZShcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2FudGRfZXNfY2FyZF9pbmRleF9qcy1ub2RlX21vZHVsZXNfYW50ZF9lc19kYXRlLXBpY2tlcl9nZW5lcmF0ZVBpY2tlcl9pbi1jMDMwMzJcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3RfcmVhY3RcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcInNyY19TdGF0ZV9qcy13ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0LWRvbV9yZWFjdC1kb21cIildKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9zcmMvU3RhdGUuanMgKi8gXCIuL3NyYy9TdGF0ZS5qc1wiKSk7IH07IH0pO1xuXHR9XG59O1xudmFyIGdldCA9IGZ1bmN0aW9uKG1vZHVsZSwgZ2V0U2NvcGUpIHtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5SID0gZ2V0U2NvcGU7XG5cdGdldFNjb3BlID0gKFxuXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhtb2R1bGVNYXAsIG1vZHVsZSlcblx0XHRcdD8gbW9kdWxlTWFwW21vZHVsZV0oKVxuXHRcdFx0OiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSBcIicgKyBtb2R1bGUgKyAnXCIgZG9lcyBub3QgZXhpc3QgaW4gY29udGFpbmVyLicpO1xuXHRcdFx0fSlcblx0KTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5SID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gZ2V0U2NvcGU7XG59O1xudmFyIGluaXQgPSBmdW5jdGlvbihzaGFyZVNjb3BlLCBpbml0U2NvcGUpIHtcblx0aWYgKCFfX3dlYnBhY2tfcmVxdWlyZV9fLlMpIHJldHVybjtcblx0dmFyIG5hbWUgPSBcImRlZmF1bHRcIlxuXHR2YXIgb2xkU2NvcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV07XG5cdGlmKG9sZFNjb3BlICYmIG9sZFNjb3BlICE9PSBzaGFyZVNjb3BlKSB0aHJvdyBuZXcgRXJyb3IoXCJDb250YWluZXIgaW5pdGlhbGl6YXRpb24gZmFpbGVkIGFzIGl0IGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWQgd2l0aCBhIGRpZmZlcmVudCBzaGFyZSBzY29wZVwiKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdID0gc2hhcmVTY29wZTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uSShuYW1lLCBpbml0U2NvcGUpO1xufTtcblxuLy8gVGhpcyBleHBvcnRzIGdldHRlcnMgdG8gZGlzYWxsb3cgbW9kaWZpY2F0aW9uc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kKGV4cG9ydHMsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGdldDsgfSxcblx0aW5pdDogZnVuY3Rpb24oKSB7IHJldHVybiBpbml0OyB9XG59KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbl9fd2VicGFja19yZXF1aXJlX18uYyA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKGZ1bmN0aW9uKHByb21pc2VzLCBrZXkpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgY2h1bmtJZCArIFwiLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcInNhcnMtY292LTI6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9IGZ1bmN0aW9uKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbihwcmV2LCBldmVudCkge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goZnVuY3Rpb24oZm4pIHsgcmV0dXJuIGZuKGV2ZW50KTsgfSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdDtcblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLlMgPSB7fTtcbnZhciBpbml0UHJvbWlzZXMgPSB7fTtcbnZhciBpbml0VG9rZW5zID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLkkgPSBmdW5jdGlvbihuYW1lLCBpbml0U2NvcGUpIHtcblx0aWYoIWluaXRTY29wZSkgaW5pdFNjb3BlID0gW107XG5cdC8vIGhhbmRsaW5nIGNpcmN1bGFyIGluaXQgY2FsbHNcblx0dmFyIGluaXRUb2tlbiA9IGluaXRUb2tlbnNbbmFtZV07XG5cdGlmKCFpbml0VG9rZW4pIGluaXRUb2tlbiA9IGluaXRUb2tlbnNbbmFtZV0gPSB7fTtcblx0aWYoaW5pdFNjb3BlLmluZGV4T2YoaW5pdFRva2VuKSA+PSAwKSByZXR1cm47XG5cdGluaXRTY29wZS5wdXNoKGluaXRUb2tlbik7XG5cdC8vIG9ubHkgcnVucyBvbmNlXG5cdGlmKGluaXRQcm9taXNlc1tuYW1lXSkgcmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXTtcblx0Ly8gY3JlYXRlcyBhIG5ldyBzaGFyZSBzY29wZSBpZiBuZWVkZWRcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhfX3dlYnBhY2tfcmVxdWlyZV9fLlMsIG5hbWUpKSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV0gPSB7fTtcblx0Ly8gcnVucyBhbGwgaW5pdCBzbmlwcGV0cyBmcm9tIGFsbCBtb2R1bGVzIHJlYWNoYWJsZVxuXHR2YXIgc2NvcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV07XG5cdHZhciB3YXJuID0gZnVuY3Rpb24obXNnKSB7IHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLndhcm4gJiYgY29uc29sZS53YXJuKG1zZyk7IH07XG5cdHZhciB1bmlxdWVOYW1lID0gXCJzYXJzLWNvdi0yXCI7XG5cdHZhciByZWdpc3RlciA9IGZ1bmN0aW9uKG5hbWUsIHZlcnNpb24sIGZhY3RvcnksIGVhZ2VyKSB7XG5cdFx0dmFyIHZlcnNpb25zID0gc2NvcGVbbmFtZV0gPSBzY29wZVtuYW1lXSB8fCB7fTtcblx0XHR2YXIgYWN0aXZlVmVyc2lvbiA9IHZlcnNpb25zW3ZlcnNpb25dO1xuXHRcdGlmKCFhY3RpdmVWZXJzaW9uIHx8ICghYWN0aXZlVmVyc2lvbi5sb2FkZWQgJiYgKCFlYWdlciAhPSAhYWN0aXZlVmVyc2lvbi5lYWdlciA/IGVhZ2VyIDogdW5pcXVlTmFtZSA+IGFjdGl2ZVZlcnNpb24uZnJvbSkpKSB2ZXJzaW9uc1t2ZXJzaW9uXSA9IHsgZ2V0OiBmYWN0b3J5LCBmcm9tOiB1bmlxdWVOYW1lLCBlYWdlcjogISFlYWdlciB9O1xuXHR9O1xuXHR2YXIgaW5pdEV4dGVybmFsID0gZnVuY3Rpb24oaWQpIHtcblx0XHR2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbihlcnIpIHsgd2FybihcIkluaXRpYWxpemF0aW9uIG9mIHNoYXJpbmcgZXh0ZXJuYWwgZmFpbGVkOiBcIiArIGVycik7IH07XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcblx0XHRcdGlmKCFtb2R1bGUpIHJldHVybjtcblx0XHRcdHZhciBpbml0Rm4gPSBmdW5jdGlvbihtb2R1bGUpIHsgcmV0dXJuIG1vZHVsZSAmJiBtb2R1bGUuaW5pdCAmJiBtb2R1bGUuaW5pdChfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV0sIGluaXRTY29wZSk7IH1cblx0XHRcdGlmKG1vZHVsZS50aGVuKSByZXR1cm4gcHJvbWlzZXMucHVzaChtb2R1bGUudGhlbihpbml0Rm4sIGhhbmRsZUVycm9yKSk7XG5cdFx0XHR2YXIgaW5pdFJlc3VsdCA9IGluaXRGbihtb2R1bGUpO1xuXHRcdFx0aWYoaW5pdFJlc3VsdCAmJiBpbml0UmVzdWx0LnRoZW4pIHJldHVybiBwcm9taXNlcy5wdXNoKGluaXRSZXN1bHRbJ2NhdGNoJ10oaGFuZGxlRXJyb3IpKTtcblx0XHR9IGNhdGNoKGVycikgeyBoYW5kbGVFcnJvcihlcnIpOyB9XG5cdH1cblx0dmFyIHByb21pc2VzID0gW107XG5cdHN3aXRjaChuYW1lKSB7XG5cdFx0Y2FzZSBcImRlZmF1bHRcIjoge1xuXHRcdFx0cmVnaXN0ZXIoXCJyZWFjdC1kb21cIiwgXCIxNy4wLjJcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBQcm9taXNlLmFsbChbX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwidmVuZG9ycy1ub2RlX21vZHVsZXNfcmVhY3QtZG9tX2luZGV4X2pzXCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ3ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0X3JlYWN0XCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJub2RlX21vZHVsZXNfb2JqZWN0LWFzc2lnbl9pbmRleF9qcy1fMzIwYzBcIildKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vaW5kZXguanMgKi8gXCIuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vaW5kZXguanNcIik7IH07IH0pOyB9KTtcblx0XHRcdHJlZ2lzdGVyKFwicmVhY3RcIiwgXCIxNy4wLjJcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBQcm9taXNlLmFsbChbX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwidmVuZG9ycy1ub2RlX21vZHVsZXNfcmVhY3RfaW5kZXhfanNcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcIm5vZGVfbW9kdWxlc19vYmplY3QtYXNzaWduX2luZGV4X2pzLV8zMjBjMVwiKV0pLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzICovIFwiLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanNcIik7IH07IH0pOyB9KTtcblx0XHR9XG5cdFx0YnJlYWs7XG5cdH1cblx0aWYoIXByb21pc2VzLmxlbmd0aCkgcmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXSA9IDE7XG5cdHJldHVybiBpbml0UHJvbWlzZXNbbmFtZV0gPSBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbigpIHsgcmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXSA9IDE7IH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjsiLCJ2YXIgcGFyc2VWZXJzaW9uID0gZnVuY3Rpb24oc3RyKSB7XG5cdC8vIHNlZSB3ZWJwYWNrL2xpYi91dGlsL3NlbXZlci5qcyBmb3Igb3JpZ2luYWwgY29kZVxuXHR2YXIgcD1mdW5jdGlvbihwKXtyZXR1cm4gcC5zcGxpdChcIi5cIikubWFwKChmdW5jdGlvbihwKXtyZXR1cm4rcD09cD8rcDpwfSkpfSxuPS9eKFteLStdKyk/KD86LShbXitdKykpPyg/OlxcKyguKykpPyQvLmV4ZWMoc3RyKSxyPW5bMV0/cChuWzFdKTpbXTtyZXR1cm4gblsyXSYmKHIubGVuZ3RoKyssci5wdXNoLmFwcGx5KHIscChuWzJdKSkpLG5bM10mJihyLnB1c2goW10pLHIucHVzaC5hcHBseShyLHAoblszXSkpKSxyO1xufVxudmFyIHZlcnNpb25MdCA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0Ly8gc2VlIHdlYnBhY2svbGliL3V0aWwvc2VtdmVyLmpzIGZvciBvcmlnaW5hbCBjb2RlXG5cdGE9cGFyc2VWZXJzaW9uKGEpLGI9cGFyc2VWZXJzaW9uKGIpO2Zvcih2YXIgcj0wOzspe2lmKHI+PWEubGVuZ3RoKXJldHVybiByPGIubGVuZ3RoJiZcInVcIiE9KHR5cGVvZiBiW3JdKVswXTt2YXIgZT1hW3JdLG49KHR5cGVvZiBlKVswXTtpZihyPj1iLmxlbmd0aClyZXR1cm5cInVcIj09bjt2YXIgdD1iW3JdLGY9KHR5cGVvZiB0KVswXTtpZihuIT1mKXJldHVyblwib1wiPT1uJiZcIm5cIj09Znx8KFwic1wiPT1mfHxcInVcIj09bik7aWYoXCJvXCIhPW4mJlwidVwiIT1uJiZlIT10KXJldHVybiBlPHQ7cisrfVxufVxudmFyIHJhbmdlVG9TdHJpbmcgPSBmdW5jdGlvbihyYW5nZSkge1xuXHQvLyBzZWUgd2VicGFjay9saWIvdXRpbC9zZW12ZXIuanMgZm9yIG9yaWdpbmFsIGNvZGVcblx0dmFyIHI9cmFuZ2VbMF0sbj1cIlwiO2lmKDE9PT1yYW5nZS5sZW5ndGgpcmV0dXJuXCIqXCI7aWYocisuNSl7bis9MD09cj9cIj49XCI6LTE9PXI/XCI8XCI6MT09cj9cIl5cIjoyPT1yP1wiflwiOnI+MD9cIj1cIjpcIiE9XCI7Zm9yKHZhciBlPTEsYT0xO2E8cmFuZ2UubGVuZ3RoO2ErKyl7ZS0tLG4rPVwidVwiPT0odHlwZW9mKHQ9cmFuZ2VbYV0pKVswXT9cIi1cIjooZT4wP1wiLlwiOlwiXCIpKyhlPTIsdCl9cmV0dXJuIG59dmFyIGc9W107Zm9yKGE9MTthPHJhbmdlLmxlbmd0aDthKyspe3ZhciB0PXJhbmdlW2FdO2cucHVzaCgwPT09dD9cIm5vdChcIitvKCkrXCIpXCI6MT09PXQ/XCIoXCIrbygpK1wiIHx8IFwiK28oKStcIilcIjoyPT09dD9nLnBvcCgpK1wiIFwiK2cucG9wKCk6cmFuZ2VUb1N0cmluZyh0KSl9cmV0dXJuIG8oKTtmdW5jdGlvbiBvKCl7cmV0dXJuIGcucG9wKCkucmVwbGFjZSgvXlxcKCguKylcXCkkLyxcIiQxXCIpfVxufVxudmFyIHNhdGlzZnkgPSBmdW5jdGlvbihyYW5nZSwgdmVyc2lvbikge1xuXHQvLyBzZWUgd2VicGFjay9saWIvdXRpbC9zZW12ZXIuanMgZm9yIG9yaWdpbmFsIGNvZGVcblx0aWYoMCBpbiByYW5nZSl7dmVyc2lvbj1wYXJzZVZlcnNpb24odmVyc2lvbik7dmFyIGU9cmFuZ2VbMF0scj1lPDA7ciYmKGU9LWUtMSk7Zm9yKHZhciBuPTAsaT0xLGE9ITA7O2krKyxuKyspe3ZhciBmLHMsZz1pPHJhbmdlLmxlbmd0aD8odHlwZW9mIHJhbmdlW2ldKVswXTpcIlwiO2lmKG4+PXZlcnNpb24ubGVuZ3RofHxcIm9cIj09KHM9KHR5cGVvZihmPXZlcnNpb25bbl0pKVswXSkpcmV0dXJuIWF8fChcInVcIj09Zz9pPmUmJiFyOlwiXCI9PWchPXIpO2lmKFwidVwiPT1zKXtpZighYXx8XCJ1XCIhPWcpcmV0dXJuITF9ZWxzZSBpZihhKWlmKGc9PXMpaWYoaTw9ZSl7aWYoZiE9cmFuZ2VbaV0pcmV0dXJuITF9ZWxzZXtpZihyP2Y+cmFuZ2VbaV06ZjxyYW5nZVtpXSlyZXR1cm4hMTtmIT1yYW5nZVtpXSYmKGE9ITEpfWVsc2UgaWYoXCJzXCIhPWcmJlwiblwiIT1nKXtpZihyfHxpPD1lKXJldHVybiExO2E9ITEsaS0tfWVsc2V7aWYoaTw9ZXx8czxnIT1yKXJldHVybiExO2E9ITF9ZWxzZVwic1wiIT1nJiZcIm5cIiE9ZyYmKGE9ITEsaS0tKX19dmFyIHQ9W10sbz10LnBvcC5iaW5kKHQpO2ZvcihuPTE7bjxyYW5nZS5sZW5ndGg7bisrKXt2YXIgdT1yYW5nZVtuXTt0LnB1c2goMT09dT9vKCl8bygpOjI9PXU/bygpJm8oKTp1P3NhdGlzZnkodSx2ZXJzaW9uKTohbygpKX1yZXR1cm4hIW8oKTtcbn1cbnZhciBlbnN1cmVFeGlzdGVuY2UgPSBmdW5jdGlvbihzY29wZU5hbWUsIGtleSkge1xuXHR2YXIgc2NvcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbc2NvcGVOYW1lXTtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHRocm93IG5ldyBFcnJvcihcIlNoYXJlZCBtb2R1bGUgXCIgKyBrZXkgKyBcIiBkb2Vzbid0IGV4aXN0IGluIHNoYXJlZCBzY29wZSBcIiArIHNjb3BlTmFtZSk7XG5cdHJldHVybiBzY29wZTtcbn07XG52YXIgZmluZFZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwga2V5KSB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHZhciBrZXkgPSBPYmplY3Qua2V5cyh2ZXJzaW9ucykucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRyZXR1cm4gIWEgfHwgdmVyc2lvbkx0KGEsIGIpID8gYiA6IGE7XG5cdH0sIDApO1xuXHRyZXR1cm4ga2V5ICYmIHZlcnNpb25zW2tleV1cbn07XG52YXIgZmluZFNpbmdsZXRvblZlcnNpb25LZXkgPSBmdW5jdGlvbihzY29wZSwga2V5KSB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHJldHVybiBPYmplY3Qua2V5cyh2ZXJzaW9ucykucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRyZXR1cm4gIWEgfHwgKCF2ZXJzaW9uc1thXS5sb2FkZWQgJiYgdmVyc2lvbkx0KGEsIGIpKSA/IGIgOiBhO1xuXHR9LCAwKTtcbn07XG52YXIgZ2V0SW52YWxpZFNpbmdsZXRvblZlcnNpb25NZXNzYWdlID0gZnVuY3Rpb24oc2NvcGUsIGtleSwgdmVyc2lvbiwgcmVxdWlyZWRWZXJzaW9uKSB7XG5cdHJldHVybiBcIlVuc2F0aXNmaWVkIHZlcnNpb24gXCIgKyB2ZXJzaW9uICsgXCIgZnJvbSBcIiArICh2ZXJzaW9uICYmIHNjb3BlW2tleV1bdmVyc2lvbl0uZnJvbSkgKyBcIiBvZiBzaGFyZWQgc2luZ2xldG9uIG1vZHVsZSBcIiArIGtleSArIFwiIChyZXF1aXJlZCBcIiArIHJhbmdlVG9TdHJpbmcocmVxdWlyZWRWZXJzaW9uKSArIFwiKVwiXG59O1xudmFyIGdldFNpbmdsZXRvbiA9IGZ1bmN0aW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSB7XG5cdHZhciB2ZXJzaW9uID0gZmluZFNpbmdsZXRvblZlcnNpb25LZXkoc2NvcGUsIGtleSk7XG5cdHJldHVybiBnZXQoc2NvcGVba2V5XVt2ZXJzaW9uXSk7XG59O1xudmFyIGdldFNpbmdsZXRvblZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbiA9IGZpbmRTaW5nbGV0b25WZXJzaW9uS2V5KHNjb3BlLCBrZXkpO1xuXHRpZiAoIXNhdGlzZnkocmVxdWlyZWRWZXJzaW9uLCB2ZXJzaW9uKSkgdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuICYmIGNvbnNvbGUud2FybihnZXRJbnZhbGlkU2luZ2xldG9uVmVyc2lvbk1lc3NhZ2Uoc2NvcGUsIGtleSwgdmVyc2lvbiwgcmVxdWlyZWRWZXJzaW9uKSk7XG5cdHJldHVybiBnZXQoc2NvcGVba2V5XVt2ZXJzaW9uXSk7XG59O1xudmFyIGdldFN0cmljdFNpbmdsZXRvblZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbiA9IGZpbmRTaW5nbGV0b25WZXJzaW9uS2V5KHNjb3BlLCBrZXkpO1xuXHRpZiAoIXNhdGlzZnkocmVxdWlyZWRWZXJzaW9uLCB2ZXJzaW9uKSkgdGhyb3cgbmV3IEVycm9yKGdldEludmFsaWRTaW5nbGV0b25WZXJzaW9uTWVzc2FnZShzY29wZSwga2V5LCB2ZXJzaW9uLCByZXF1aXJlZFZlcnNpb24pKTtcblx0cmV0dXJuIGdldChzY29wZVtrZXldW3ZlcnNpb25dKTtcbn07XG52YXIgZmluZFZhbGlkVmVyc2lvbiA9IGZ1bmN0aW9uKHNjb3BlLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbnMgPSBzY29wZVtrZXldO1xuXHR2YXIga2V5ID0gT2JqZWN0LmtleXModmVyc2lvbnMpLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0aWYgKCFzYXRpc2Z5KHJlcXVpcmVkVmVyc2lvbiwgYikpIHJldHVybiBhO1xuXHRcdHJldHVybiAhYSB8fCB2ZXJzaW9uTHQoYSwgYikgPyBiIDogYTtcblx0fSwgMCk7XG5cdHJldHVybiBrZXkgJiYgdmVyc2lvbnNba2V5XVxufTtcbnZhciBnZXRJbnZhbGlkVmVyc2lvbk1lc3NhZ2UgPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbnMgPSBzY29wZVtrZXldO1xuXHRyZXR1cm4gXCJObyBzYXRpc2Z5aW5nIHZlcnNpb24gKFwiICsgcmFuZ2VUb1N0cmluZyhyZXF1aXJlZFZlcnNpb24pICsgXCIpIG9mIHNoYXJlZCBtb2R1bGUgXCIgKyBrZXkgKyBcIiBmb3VuZCBpbiBzaGFyZWQgc2NvcGUgXCIgKyBzY29wZU5hbWUgKyBcIi5cXG5cIiArXG5cdFx0XCJBdmFpbGFibGUgdmVyc2lvbnM6IFwiICsgT2JqZWN0LmtleXModmVyc2lvbnMpLm1hcChmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4ga2V5ICsgXCIgZnJvbSBcIiArIHZlcnNpb25zW2tleV0uZnJvbTtcblx0fSkuam9pbihcIiwgXCIpO1xufTtcbnZhciBnZXRWYWxpZFZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgZW50cnkgPSBmaW5kVmFsaWRWZXJzaW9uKHNjb3BlLCBrZXksIHJlcXVpcmVkVmVyc2lvbik7XG5cdGlmKGVudHJ5KSByZXR1cm4gZ2V0KGVudHJ5KTtcblx0dGhyb3cgbmV3IEVycm9yKGdldEludmFsaWRWZXJzaW9uTWVzc2FnZShzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikpO1xufTtcbnZhciB3YXJuSW52YWxpZFZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLndhcm4gJiYgY29uc29sZS53YXJuKGdldEludmFsaWRWZXJzaW9uTWVzc2FnZShzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikpO1xufTtcbnZhciBnZXQgPSBmdW5jdGlvbihlbnRyeSkge1xuXHRlbnRyeS5sb2FkZWQgPSAxO1xuXHRyZXR1cm4gZW50cnkuZ2V0KClcbn07XG52YXIgaW5pdCA9IGZ1bmN0aW9uKGZuKSB7IHJldHVybiBmdW5jdGlvbihzY29wZU5hbWUsIGEsIGIsIGMpIHtcblx0dmFyIHByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLkkoc2NvcGVOYW1lKTtcblx0aWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSByZXR1cm4gcHJvbWlzZS50aGVuKGZuLmJpbmQoZm4sIHNjb3BlTmFtZSwgX193ZWJwYWNrX3JlcXVpcmVfXy5TW3Njb3BlTmFtZV0sIGEsIGIsIGMpKTtcblx0cmV0dXJuIGZuKHNjb3BlTmFtZSwgX193ZWJwYWNrX3JlcXVpcmVfXy5TW3Njb3BlTmFtZV0sIGEsIGIsIGMpO1xufTsgfTtcblxudmFyIGxvYWQgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5KSB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXQoZmluZFZlcnNpb24oc2NvcGUsIGtleSkpO1xufSk7XG52YXIgbG9hZEZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgZmFsbGJhY2spIHtcblx0cmV0dXJuIHNjb3BlICYmIF9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSA/IGdldChmaW5kVmVyc2lvbihzY29wZSwga2V5KSkgOiBmYWxsYmFjaygpO1xufSk7XG52YXIgbG9hZFZlcnNpb25DaGVjayA9IC8qI19fUFVSRV9fKi8gaW5pdChmdW5jdGlvbihzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24pIHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldChmaW5kVmFsaWRWZXJzaW9uKHNjb3BlLCBrZXksIHZlcnNpb24pIHx8IHdhcm5JbnZhbGlkVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pIHx8IGZpbmRWZXJzaW9uKHNjb3BlLCBrZXkpKTtcbn0pO1xudmFyIGxvYWRTaW5nbGV0b24gPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5KSB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXRTaW5nbGV0b24oc2NvcGUsIHNjb3BlTmFtZSwga2V5KTtcbn0pO1xudmFyIGxvYWRTaW5nbGV0b25WZXJzaW9uQ2hlY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uKSB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXRTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0VmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbikge1xuXHRlbnN1cmVFeGlzdGVuY2Uoc2NvcGVOYW1lLCBrZXkpO1xuXHRyZXR1cm4gZ2V0VmFsaWRWZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0U2luZ2xldG9uVmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbikge1xuXHRlbnN1cmVFeGlzdGVuY2Uoc2NvcGVOYW1lLCBrZXkpO1xuXHRyZXR1cm4gZ2V0U3RyaWN0U2luZ2xldG9uVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pO1xufSk7XG52YXIgbG9hZFZlcnNpb25DaGVja0ZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbiwgZmFsbGJhY2spIHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0KGZpbmRWYWxpZFZlcnNpb24oc2NvcGUsIGtleSwgdmVyc2lvbikgfHwgd2FybkludmFsaWRWZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbikgfHwgZmluZFZlcnNpb24oc2NvcGUsIGtleSkpO1xufSk7XG52YXIgbG9hZFNpbmdsZXRvbkZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgZmFsbGJhY2spIHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0U2luZ2xldG9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSk7XG59KTtcbnZhciBsb2FkU2luZ2xldG9uVmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykge1xuXHRpZighc2NvcGUgfHwgIV9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSkgcmV0dXJuIGZhbGxiYWNrKCk7XG5cdHJldHVybiBnZXRTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0VmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykge1xuXHR2YXIgZW50cnkgPSBzY29wZSAmJiBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkgJiYgZmluZFZhbGlkVmVyc2lvbihzY29wZSwga2V5LCB2ZXJzaW9uKTtcblx0cmV0dXJuIGVudHJ5ID8gZ2V0KGVudHJ5KSA6IGZhbGxiYWNrKCk7XG59KTtcbnZhciBsb2FkU3RyaWN0U2luZ2xldG9uVmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykge1xuXHRpZighc2NvcGUgfHwgIV9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSkgcmV0dXJuIGZhbGxiYWNrKCk7XG5cdHJldHVybiBnZXRTdHJpY3RTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG52YXIgbW9kdWxlVG9IYW5kbGVyTWFwcGluZyA9IHtcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbG9hZFNpbmdsZXRvblZlcnNpb25DaGVja0ZhbGxiYWNrKFwiZGVmYXVsdFwiLCBcInJlYWN0XCIsIFsxLDE3LDAsMV0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwidmVuZG9ycy1ub2RlX21vZHVsZXNfcmVhY3RfaW5kZXhfanNcIikudGhlbihmdW5jdGlvbigpIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgcmVhY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qc1wiKTsgfTsgfSk7IH0pOyB9LFxuXHRcIndlYnBhY2svc2hhcmluZy9jb25zdW1lL2RlZmF1bHQvcmVhY3QtZG9tL3JlYWN0LWRvbVwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIGxvYWRTaW5nbGV0b25WZXJzaW9uQ2hlY2tGYWxsYmFjayhcImRlZmF1bHRcIiwgXCJyZWFjdC1kb21cIiwgWzEsMTcsMCwxXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19yZWFjdC1kb21faW5kZXhfanNcIikudGhlbihmdW5jdGlvbigpIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgcmVhY3QtZG9tICovIFwiLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL2luZGV4LmpzXCIpOyB9OyB9KTsgfSk7IH1cbn07XG4vLyBubyBjb25zdW1lcyBpbiBpbml0aWFsIGNodW5rc1xudmFyIGNodW5rTWFwcGluZyA9IHtcblx0XCJ3ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0X3JlYWN0XCI6IFtcblx0XHRcIndlYnBhY2svc2hhcmluZy9jb25zdW1lL2RlZmF1bHQvcmVhY3QvcmVhY3RcIlxuXHRdLFxuXHRcInNyY19TdGF0ZV9qcy13ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0LWRvbV9yZWFjdC1kb21cIjogW1xuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC1kb20vcmVhY3QtZG9tXCJcblx0XVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uZi5jb25zdW1lcyA9IGZ1bmN0aW9uKGNodW5rSWQsIHByb21pc2VzKSB7XG5cdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhjaHVua01hcHBpbmcsIGNodW5rSWQpKSB7XG5cdFx0Y2h1bmtNYXBwaW5nW2NodW5rSWRdLmZvckVhY2goZnVuY3Rpb24oaWQpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRNb2R1bGVzLCBpZCkpIHJldHVybiBwcm9taXNlcy5wdXNoKGluc3RhbGxlZE1vZHVsZXNbaWRdKTtcblx0XHRcdHZhciBvbkZhY3RvcnkgPSBmdW5jdGlvbihmYWN0b3J5KSB7XG5cdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbaWRdID0gMDtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW2lkXSA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRcdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbaWRdO1xuXHRcdFx0XHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dmFyIG9uRXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1tpZF07XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVtpZF0gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0XHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW2lkXTtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBwcm9taXNlID0gbW9kdWxlVG9IYW5kbGVyTWFwcGluZ1tpZF0oKTtcblx0XHRcdFx0aWYocHJvbWlzZS50aGVuKSB7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRNb2R1bGVzW2lkXSA9IHByb21pc2UudGhlbihvbkZhY3RvcnkpWydjYXRjaCddKG9uRXJyb3IpKTtcblx0XHRcdFx0fSBlbHNlIG9uRmFjdG9yeShwcm9taXNlKTtcblx0XHRcdH0gY2F0Y2goZSkgeyBvbkVycm9yKGUpOyB9XG5cdFx0fSk7XG5cdH1cbn0iLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb3ZpZFwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IGZ1bmN0aW9uKGNodW5rSWQsIHByb21pc2VzKSB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYoXCJ3ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0X3JlYWN0XCIgIT0gY2h1bmtJZCkge1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkgeyBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTsgfSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rc2Fyc19jb3ZfMlwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzYXJzX2Nvdl8yXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwid2VicGFjay9jb250YWluZXIvZW50cnkvY292aWRcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=