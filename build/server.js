/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "318902e7c68c428641f5"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/***/ (function(module, exports) {

module.exports = {"client":{"js":"http://localhost:3001/static/js/bundle.js"}}

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__("./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?300"))

/***/ }),

/***/ "./public/fonts/Gilroy-Bold.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Bold.06673e71.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Heavy.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Heavy.dd20df36.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Light.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Light.d4593ac3.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Medium.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Medium.45ca2168.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Regular.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Regular.3796c599.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-UltraLight.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-UltraLight.46dadd56.woff";

/***/ }),

/***/ "./src/App.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "body {\n  padding: 1em;\n}\n\nh1 {\n  font-size: 3em;\n  padding: 0.5em;\n  border-top: 0.05em solid #dadada;\n}\n\n.easy {\n  font-weight: 200;\n  font-size: 1.5em;\n}\n\n.brzeLogo {\n  width: 30em;\n}\n\n.makingPickupEasy {\n  font-weight: 200;\n}\n\n.carriers {\n  color: #00a39c;\n  font-weight: normal;\n  white-space: nowrap;\n}\n\n.intro {\n  background-color: #00a39c;\n  color: white;\n  font-size: 1.2em;\n  padding: 1.25em;\n  font-weight: 200;\n}\n\n.verticalBrze {\n  background-color: black;\n  padding: 0.4em 0.2em;\n  font-weight: 500;\n  font-size: 3em;\n  float: right;\n  color: white;\n  text-orientation: sideways;\n  writing-mode: vertical-rl;\n}\n\n.finally {\n  font-size: 1.5em;\n  font-weight: 200;\n  line-height: 1.3em;\n}\n\n.finally .carriers {\n  font-size: inherit;\n  color: inherit;\n  font-weight: 500;\n}\n\n.title {\n  font-size: 2em;\n  padding-bottom: 0.3em;\n}\n\n.fontWeight500 {\n  font-weight: 500;\n}\n\n.num {\n  color: #00a39c;\n  font-weight: 500;\n  font-size: 1.4em;\n  padding-right: 0.2em;\n}\n\n.numWrapper {\n  padding: 0.3em 0;\n}\n\n.currently {\n  font-weight: 500;\n  font-size: 0.8em;\n}\n\n.steps {\n  padding: 1em;\n  line-height: 1.4em;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/App.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reset_css__ = __webpack_require__("./src/reset.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__reset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fonts_css__ = __webpack_require__("./src/fonts.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fonts_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fonts_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_css__ = __webpack_require__("./src/App.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SignUp_SignUp__ = __webpack_require__("./src/SignUp/SignUp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
var _jsxFileName = "/Users/stephentimko/Documents/projects/brze/src/App.js";







var num = function num(n) {
  return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
    "span",
    { className: "num", __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    },
    n
  );
};

var App = function App() {
  return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement("img", { className: "brzeLogo", alt: "Brze", src: "/images/brze.png", __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    }),
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      "h1",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "span",
        { className: "makingPickupEasy", __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          }
        },
        "Making pickup easy! "
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "span",
        { className: "carriers", __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        },
        "FedEx \u2022 USPS \u2022 UPS"
      )
    ),
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      "div",
      { className: "intro", __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "title", __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          }
        },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          { className: "fontWeight500", __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            }
          },
          "Introducing Brze. "
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            }
          },
          "Returns Made Easy!"
        )
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "finally", __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          }
        },
        "Finally, an affordable service that will pick up your package/s from your home and drop them off at",
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          { className: "carriers", __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            }
          },
          " FedEx, USPS, or UPS."
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      "div",
      { className: "easy", __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "verticalBrze", __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          }
        },
        "Brze"
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "steps", __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            }
          },
          "It\u2019s as simple as",
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            { className: "fontWeight500", __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              }
            },
            " 1, 2, 3"
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 34
              }
            },
            "!"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "numWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 36
            }
          },
          num("1 "),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            { className: "fontWeight500", __source: {
                fileName: _jsxFileName,
                lineNumber: 38
              }
            },
            "TEXT US "
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 39
              }
            },
            "at"
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            { className: "fontWeight500", __source: {
                fileName: _jsxFileName,
                lineNumber: 40
              }
            },
            " 848.702.3698"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "numWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            }
          },
          num("2 "),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 44
              }
            },
            "We come and pickup your packages*"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "numWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 46
            }
          },
          num("3 "),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 48
              }
            },
            "We text you a confirmation that inclides an image and tracking number after delivery"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "currently", __source: {
              fileName: _jsxFileName,
              lineNumber: 53
            }
          },
          " *Currently in Summit, NJ Only"
        )
      )
    ),
    Object(__WEBPACK_IMPORTED_MODULE_3__SignUp_SignUp__["a" /* default */])()
  );
};

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),

/***/ "./src/SignUp/SignUp.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".signUp {\n  border-top: .05em solid #DADADA;\n  padding: 2em;\n}\n\n.signUpTitle {\n  font-size: 2em;\n}\n\n.signUpInputWrapper {\n  padding-top: 1em;\n  font-size: 1.5em;\n}\n\n.signUpInput {\n  padding: 0.2em;\n  font-size: 1.5em;\n}\n\n.err {\n  font-size: 2em;\n}\n\n.signUpButton {\n  width: 110px;\n  height: 50px;\n  background-color: #000000;\n  font-family: inherit;\n  color: #FFFFFF;\n  font-size: 1.3em;\n  border: 0em;\n  margin-top: 1em;\n  cursor: pointer;\n}", ""]);

// exports


/***/ }),

/***/ "./src/SignUp/SignUp.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SignUpForm__ = __webpack_require__("./src/SignUp/SignUpForm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SignUp_css__ = __webpack_require__("./src/SignUp/SignUp.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SignUp_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__SignUp_css__);
var _jsxFileName = "/Users/stephentimko/Documents/projects/brze/src/SignUp/SignUp.js";




var SignUp = function SignUp() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "signUp", __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { className: "signUpTitle", __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      "Sign Up For Brze!"
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      " Required Field*"
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__SignUpForm__["a" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (SignUp);

/***/ }),

/***/ "./src/SignUp/SignUpForm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__("babel-runtime/core-js/json/stringify");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("babel-runtime/core-js/object/get-prototype-of");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__("babel-runtime/helpers/classCallCheck");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__("babel-runtime/helpers/createClass");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("babel-runtime/helpers/possibleConstructorReturn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__("babel-runtime/helpers/inherits");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);






var _jsxFileName = "/Users/stephentimko/Documents/projects/brze/src/SignUp/SignUpForm.js";


var SignUpForm = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(SignUpForm, _React$Component);

  function SignUpForm(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, SignUpForm);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SignUpForm.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(SignUpForm)).call(this, props));

    _this.handleChange = function (prop) {
      return function (event) {
        var newState = {};
        newState[prop] = event.target.value;
        _this.setState(newState);
      };
    };

    _this.state = {
      name: "",
      phone: "",
      address: "",
      addressoptional: undefined,
      email: "",
      city: "",
      zip: "",
      state: "NJ",
      signedUp: false,
      submitDisabled: false,
      password: "",
      password2: "",
      message: ""
    };

    _this.requiredProps = ["name", "phone", "address", "email", "city", "state", "zip", "password", "password2"];

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(SignUpForm, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();

      if (this.state.password !== this.state.password2) {
        this.setState({ message: "Passwords must match!" });
      } else if (this.requiredProps.some(function (field) {
        return !_this2.state[field];
      })) {
        this.setState({ message: "Please fill in required fields." });
      } else {
        this.setState({ submitDisabled: true });

        fetch("/api/signup", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.state)
        }).then(function (resp) {
          if (resp.ok) {
            _this2.setState({ submitDisabled: false, message: "You have been signed up!" });
          } else {
            _this2.setState({ submitDisabled: false, message: "There was an error signing up!" });
          }
        }).catch(function (err) {
          _this2.setState({ submitDisabled: false, message: "There was an error signing up!" });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        "form",
        { onSubmit: this.handleSubmit, __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          }
        },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 78
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 79
              }
            },
            "Name*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.name,
            onChange: this.handleChange("name"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 80
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 86
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 87
              }
            },
            "Street Address*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.address,
            onChange: this.handleChange("address"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 88
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 94
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 95
              }
            },
            "Apt., Floor, Unit etc. (Optional)"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.addressoptional,
            onChange: this.handleChange("addressoptional"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 96
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 102
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              }
            },
            "City"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.city,
            onChange: this.handleChange("city"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 104
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 110
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 111
              }
            },
            "Zip Code"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.zip,
            onChange: this.handleChange("zip"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 112
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 118
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 119
              }
            },
            "State*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "select",
            { defaultValue: "NJ", onChange: this.handleChange("state"), __source: {
                fileName: _jsxFileName,
                lineNumber: 120
              }
            },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AL", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 121
                }
              },
              "Alabama"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AK", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 122
                }
              },
              "Alaska"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AZ", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 123
                }
              },
              "Arizona"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AR", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 124
                }
              },
              "Arkansas"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "CA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 125
                }
              },
              "California"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "CO", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 126
                }
              },
              "Colorado"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "CT", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 127
                }
              },
              "Connecticut"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "DE", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 128
                }
              },
              "Delaware"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "DC", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 129
                }
              },
              "District Of Columbia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "FL", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 130
                }
              },
              "Florida"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "GA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 131
                }
              },
              "Georgia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "HI", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 132
                }
              },
              "Hawaii"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "ID", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 133
                }
              },
              "Idaho"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "IL", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 134
                }
              },
              "Illinois"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "IN", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 135
                }
              },
              "Indiana"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "IA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 136
                }
              },
              "Iowa"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "KS", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 137
                }
              },
              "Kansas"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "KY", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 138
                }
              },
              "Kentucky"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "LA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 139
                }
              },
              "Louisiana"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "ME", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 140
                }
              },
              "Maine"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MD", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 141
                }
              },
              "Maryland"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 142
                }
              },
              "Massachusetts"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MI", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 143
                }
              },
              "Michigan"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MN", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 144
                }
              },
              "Minnesota"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MS", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 145
                }
              },
              "Mississippi"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MO", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 146
                }
              },
              "Missouri"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MT", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 147
                }
              },
              "Montana"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NE", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 148
                }
              },
              "Nebraska"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NV", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 149
                }
              },
              "Nevada"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NH", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 150
                }
              },
              "New Hampshire"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NJ", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 151
                }
              },
              "New Jersey"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NM", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 152
                }
              },
              "New Mexico"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NY", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 153
                }
              },
              "New York"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NC", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 154
                }
              },
              "North Carolina"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "ND", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 155
                }
              },
              "North Dakota"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "OH", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 156
                }
              },
              "Ohio"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "OK", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 157
                }
              },
              "Oklahoma"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "OR", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 158
                }
              },
              "Oregon"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "PA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 159
                }
              },
              "Pennsylvania"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "RI", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 160
                }
              },
              "Rhode Island"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "SC", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 161
                }
              },
              "South Carolina"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "SD", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 162
                }
              },
              "South Dakota"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "TN", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 163
                }
              },
              "Tennessee"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "TX", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 164
                }
              },
              "Texas"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "UT", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 165
                }
              },
              "Utah"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "VT", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 166
                }
              },
              "Vermont"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "VA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 167
                }
              },
              "Virginia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WA", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 168
                }
              },
              "Washington"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WV", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 169
                }
              },
              "West Virginia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WI", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 170
                }
              },
              "Wisconsin"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WY", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 171
                }
              },
              "Wyoming"
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 175
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 176
              }
            },
            "Phone Number*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.phone,
            onChange: this.handleChange("phone"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 177
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 183
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 184
              }
            },
            "Email*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.email,
            onChange: this.handleChange("email"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 185
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 191
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 192
              }
            },
            "Password*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            type: "password",
            className: "signUpInput",
            value: this.state.password,
            onChange: this.handleChange("password"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 193
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper", __source: {
              fileName: _jsxFileName,
              lineNumber: 200
            }
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 201
              }
            },
            "Password Again*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            type: "password",
            className: "signUpInput",
            value: this.state.password2,
            onChange: this.handleChange("password2"),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 202
            }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "err", __source: {
              fileName: _jsxFileName,
              lineNumber: 209
            }
          },
          this.state.message
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
          className: "signUpButton",
          disabled: this.state.submitDisabled,
          type: "submit",
          value: "Submit",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 210
          }
        })
      );
    }
  }]);

  return SignUpForm;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SignUpForm);

/***/ }),

/***/ "./src/fonts.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-UltraLight.woff") + ") format(\"woff\");\n  font-weight: 100;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Light.woff") + ") format(\"woff\");\n  font-weight: 200;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Regular.woff") + ") format(\"woff\");\n  font-weight: 300;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Medium.woff") + ") format(\"woff\");\n  font-weight: 400;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Bold.woff") + ") format(\"woff\");\n  font-weight: 500;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Heavy.woff") + ") format(\"woff\");\n  font-weight: 600;\n}\n\nbody {\n  font-family: \"Gilroy\";\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server.js");



if (true) {
  module.hot.accept("./src/server.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server.js"); (function () {
    console.log('🔁  HMR Reloading `./server`...');
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
  console.info('✅  Server-side HMR Enabled!');
}

var port = process.env.PORT || 3000;

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_express___default()().use(function (req, res) {
  return __WEBPACK_IMPORTED_MODULE_1__server__["default"].handle(req, res);
}).listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('> Started on port ' + port);
}));

/***/ }),

/***/ "./src/reset.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./src/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App__ = __webpack_require__("./src/App.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__);
var _jsxFileName = "/Users/stephentimko/Documents/projects/brze/src/server.js";





var bodyParser = __webpack_require__("body-parser");

var _require = __webpack_require__("pg"),
    Client = _require.Client;

var twilio = __webpack_require__("twilio");
var assets = __webpack_require__("./build/assets.json");
var pgClient = new Client({ ssl: true });
var TWILIO_ACCOUNT_SID = "AC5f2cc96da38dbfe3013685ca1d957b31";
var TWILIO_AUTH_TOKEN = "adaca3c80d074c60fd8e6f0422aee6ec";
var TWILIO_NUMBER = "12018066564";
console.log(Object({"NODE_ENV":"development","PORT":3000,"VERBOSE":false,"HOST":"localhost","RAZZLE_ASSETS_MANIFEST":"/Users/stephentimko/Documents/projects/brze/build/assets.json","BUILD_TARGET":"server","RAZZLE_PUBLIC_DIR":"/Users/stephentimko/Documents/projects/brze/public","RAZZLE_TWILIO_ACCOUNT_SID":"AC5f2cc96da38dbfe3013685ca1d957b31","RAZZLE_TWILIO_AUTH_TOKEN":"adaca3c80d074c60fd8e6f0422aee6ec","RAZZLE_TWILIO_NUMBER":"12018066564"}));
var twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// const startPgClient = async () => {
//   await pgClient.connect();
// }
// startPgClient();


var findUserByNumberQuery = function findUserByNumberQuery(num) {
  return {
    name: 'fetch-breezer',
    text: 'SELECT * FROM breezers WHERE phone = $1',
    values: [num]
  };
};

var sendSms = function sendSms(num, res, msg) {
  twilioClient.messages.create({
    to: num,
    from: TWILIO_NUMBER,
    body: msg
  }, function (err, data) {
    res.send('Message is inbound!');
  });
};

var server = __WEBPACK_IMPORTED_MODULE_2_express___default()();
server.disable("x-powered-by").use(__WEBPACK_IMPORTED_MODULE_2_express___default.a.static("/Users/stephentimko/Documents/projects/brze/public")).use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json()).post('/api/text', function (req, postRes) {
  pgClient.query(findUserByNumberQuery(req.param('from'))).then(function (res) {
    var message = res.rows.length ? 'Welcome to Brze! Please check back soon for beta!' : 'Welcome to Brze! Please register an account at brze.io and check back for beta!';
    sendSms(req.param('from'), postRes, message);
  });
}).post('/api/signup', function (req, postRes) {
  pgClient.query(findUserByNumberQuery(req.body.phone)).then(function (res) {
    if (!res.rows.length) {
      var query = {
        name: 'write-breezer',
        text: 'INSERT INTO breezers (phone, name, address, addressoptional, zip, email, city, password, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [req.body.phone, req.body.name, req.body.address, req.body.addressoptional, req.body.zip, req.body.email, req.body.city, req.body.password, req.body.state]
      };
      pgClient.query(query).then(function (res) {
        console.log("see if phone is correct", req.body);
        sendSms(req.body.phone, postRes, 'Welcome to Brze! Please check back soon for beta!');
      }).catch(function (e) {
        return console.log("Write Failure", e);
      });
    } else {
      postRes.send("This number is already signed up!");
    }
  }).catch(function (e) {
    return console.error("Sign Up Failure", e);
  });
}).get("/*", function (req, res) {
  var markup = Object(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    }
  }));
  res.send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta httpEquiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charSet='utf-8' />\n        <title>Welcome to Razz a mataz</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        " + (assets.client.css ? "<link rel=\"stylesheet\" href=\"" + assets.client.css + "\">" : "") + "\n         " + ( false ? "<script src=\"" + assets.client.js + "\" defer></script>" : "<script src=\"" + assets.client.js + "\" defer crossorigin></script>") + "\n    </head>\n    <body>\n        <div id=\"root\">" + markup + "</div>\n    </body>\n</html>");
});

/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/core-js/object/get-prototype-of":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),

/***/ "babel-runtime/helpers/classCallCheck":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ "babel-runtime/helpers/createClass":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ "babel-runtime/helpers/inherits":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),

/***/ "babel-runtime/helpers/possibleConstructorReturn":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "pg":
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "twilio":
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map