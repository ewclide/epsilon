/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Async = exports.Async = function () {
	function Async() {
		_classCallCheck(this, Async);

		this.$define({
			_async_waiters: [],
			_async_status: 0,
			_async_calls: superFunction(),
			_async_fails: superFunction(),
			_async_progress: superFunction(),
			_async_data: null,
			_async_error: null
		});
	}

	_createClass(Async, [{
		key: "wait",
		value: function wait(objects) {
			var self = this,
			    count = 0,
			    handler = {};

			if (Array.isArray(objects)) objects.forEach(function (current) {
				self._async_waiters.push(current);
			});else this._async_waiters.push(objects);

			this._async_waiters.forEach(function (waiter) {
				waiter.on.success(function () {
					count++;
					if (count == self._async_waiters.length) self.run.success();
				});
				waiter.on.fail(function () {
					self.run.fail();
				});
			});

			handler.then = function (action) {
				if (typeof action == "function") self.on.success(action);

				return handler;
			};

			handler.except = function (action) {
				if (typeof action == "function") self.on.fail(action);

				return handler;
			};

			return handler;
		}
	}, {
		key: "on",
		get: function get() {
			var self = this;

			return {
				success: function success(fn) {
					self._async_calls.push(fn);
					if (self._async_status == 1) fn(self._async_data);
				},
				fail: function fail(fn) {
					self._async_fails.push(fn);
					if (self._async_status == -1) fn(self._async_error);
				},
				progress: function progress(fn) {
					self._async_progress.push(fn);
				}
			};
		}
	}, {
		key: "run",
		get: function get() {
			var self = this;

			return {
				success: function success(data) {
					if (self._async_status == 0) {
						self._async_status = 1;
						if (data) self._async_data = data;
						self._async_calls(data);
					}
				},
				fail: function fail(error) {
					if (self._async_status == 0) {
						self._async_status = -1;
						if (error) self._async_error = error;
						self._async_fails(error);
					}
				},
				progress: function progress(value) {
					self._async_progress(value);
				}
			};
		}
	}, {
		key: "switch",
		get: function get() {
			var self = this;

			return {
				success: function success() {
					self._async_status = 1;
				},
				fail: function fail() {
					self._async_status = -1;
				}
			};
		}
	}, {
		key: "completed",
		get: function get() {
			if (this._async_status == 1) return true;else return false;
		}
	}, {
		key: "failed",
		get: function get() {
			if (this._async_status == -1) return true;else return false;
		}
	}]);

	return Async;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HTMLTools = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonConverter = __webpack_require__(14);

var _transform = __webpack_require__(15);

var _async = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsonConverter = new _jsonConverter.JsonConverter();

var HTMLTools = exports.HTMLTools = function () {
    function HTMLTools(elements) {
        _classCallCheck(this, HTMLTools);

        this.elements = [];
        this.length = 0;
        this._id = random();
        this._query = '';
        this._readyActions = new _async.Async();

        this.addElements(elements);
    }

    _createClass(HTMLTools, [{
        key: 'addElements',
        value: function addElements(elements) {
            if (!Array.isArray(elements) && elements.length) {
                for (var i = 0; i < elements.length; i++) {
                    this.elements.push(elements[i]);
                }
            } else {
                this.elements = this.elements.concat(elements);
            }

            this.length = this.elements.length;
        }
    }, {
        key: 'ready',
        value: function ready(fn) {
            var self = this;

            this._readyActions.on.success(fn);

            if (this.elements[0] == document) {
                document.addEventListener("DOMContentLoaded", function (e) {
                    self._readyActions.run.success();
                });
            } else {
                var sub = this.select("img, link, script, frame"),
                    async = new _async.Async(),
                    waitList = [];

                if (sub.length) sub.elements.forEach(function (element) {
                    waitList.push(self._wrapAsync(element));
                });else this.elements.forEach(function (element) {
                    waitList.push(self._wrapAsync(element));
                });

                async.wait(waitList).then(function () {
                    self._readyActions.run.success();
                });
            }
        }
    }, {
        key: '_wrapAsync',
        value: function _wrapAsync(element) {
            var async = new _async.Async(),
                tag = element.tagName.toLowerCase();

            if (tag == "img" && element.complete) async.run.success();else if (tag == "link" || tag == "script" || tag == "frame") element.addEventListener("load", function () {
                async.run.success();
            });else async.run.success();

            return async;
        }
    }, {
        key: 'select',
        value: function select(query) {
            var elements = [],
                result;

            this.elements.forEach(function (element) {
                var search = element.querySelectorAll(query);
                elements = elements.concat(Array.from(search));
            });

            result = new HTMLTools(elements);
            result._query = query;

            return result;
        }
    }, {
        key: '_getInsertMethod',
        value: function _getInsertMethod(name) {
            var methods = {
                before: function before(element, current) {
                    if (current.parentNode) current.parentNode.insertBefore(element, current);
                },
                after: function after(element, current) {
                    if (current.parentNode) current.parentNode.insertBefore(element, current.nextSibling);
                },
                append: function append(element, current) {
                    current.appendChild(element, current);
                },
                prepend: function prepend(element, current) {
                    current.insertBefore(element, current.childNodes[0]);
                }
            };

            return methods[name];
        }
    }, {
        key: 'before',
        value: function before(doc) {
            var rm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this._insert(doc, rm, this._getInsertMethod("before"));
        }
    }, {
        key: 'after',
        value: function after(doc) {
            var rm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this._insert(doc, rm, this._getInsertMethod("after"));
        }
    }, {
        key: 'append',
        value: function append(doc) {
            var rm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this._insert(doc, rm, this._getInsertMethod("append"));
        }
    }, {
        key: 'prepend',
        value: function prepend(doc) {
            var rm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this._insert(doc, rm, this._getInsertMethod("prepend"));
        }
    }, {
        key: '_insert',
        value: function _insert(doc, rm, method) {
            var self = this,
                result = [];

            doc = this.convert(doc);

            if (doc) {
                this.elements.forEach(function (element) {

                    var clones = [];

                    doc.elements.forEach(function (insertElement) {
                        var clone = insertElement.cloneNode(true);
                        clones.push(clone);
                        method(clone, element);
                    });

                    result = result.concat(clones);
                });

                if (rm) doc.remove();

                doc.addElements(result);

                return doc;
            } else return false;
        }
    }, {
        key: 'addClass',
        value: function addClass(name) {
            this.elements.forEach(function (element) {
                var attr = element.getAttribute("class");
                if (attr) attr += " " + name;else attr = name;
                element.setAttribute("class", attr);
            });
        }
    }, {
        key: 'removeClass',
        value: function removeClass(name) {
            this.elements.forEach(function (element) {
                var attr = element.getAttribute("class");
                attr = attr.split(" ");
                attr = attr.filter(function (value) {
                    return value != name;
                });
                attr = attr.join(" ");
                element.setAttribute(attr);
            });
        }
    }, {
        key: 'inner',
        value: function inner(str) {
            var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (str !== undefined) {
                this.elements.forEach(function (element) {
                    if (clear) element.innerHTML = str;else element.innerHTML += str;
                });

                return this;
            } else return this.elements[0].innerHTML;
        }
    }, {
        key: 'text',
        value: function text(str) {
            if (str !== undefined) {
                this.elements.forEach(function (element) {
                    element.innerText = str;
                });

                return this;
            } else return this.elements[0].innerText;
        }
    }, {
        key: 'value',
        value: function value(data) {
            if (data !== undefined) {
                this.elements.forEach(function (element) {
                    element.value = data;
                });

                return this;
            } else return this.elements[0].value;
        }
    }, {
        key: 'active',
        value: function active(flag) {
            if (flag) this.addClass("active");else this.removeClass("active");
        }
    }, {
        key: 'checked',
        value: function checked(flag) {
            if (typeof flag == "boolean") this.elements.forEach(function (element) {
                if ("checked" in element) element.checked = flag;
            });else if (flag == undefined) return this.elements[0].checked;
        }
    }, {
        key: 'toogle',
        value: function toogle() {
            this.elements.forEach(function (element) {
                if ("checked" in element) {
                    if (element.checked) element.checked = false;else element.checked = true;
                }
            });
        }
    }, {
        key: 'choose',
        value: function choose(index) {
            this.elements.forEach(function (element) {
                if ("selectedIndex" in element) element.selectedIndex = index;
            });
        }
    }, {
        key: 'width',
        value: function width(value) {
            if (value) {
                if (typeof value == "number") value += "px";
                this.elements.forEach(function (element) {
                    element.style.width = value;
                });
            } else return this.elements[0].offsetWidth;
        }
    }, {
        key: 'height',
        value: function height(value) {
            if (value) {
                if (typeof value == "number") value += "px";
                this.elements.forEach(function (element) {
                    element.style.height = value;
                });
            } else return this.elements[0].offsetHeight;
        }
    }, {
        key: 'wrap',
        value: function wrap(classList) {
            if (typeof classList == "string") {
                var wrapper = $html.create("div", classList);
                this.after(wrapper);
                wrapper.append(this);
                return wrapper;
            } else if (Array.isArray(classList)) {
                var wrapper = $html.create("div", classList[0]),
                    inside = "";

                for (var i = 1; i < classList.length; i++) {
                    inside += '<div class="' + classList[i] + '">';
                }for (var i = 1; i < classList.length; i++) {
                    inside += '</div>';
                }wrapper.inner(inside);
                this.after(wrapper);
                wrapper.select("." + classList[classList.length - 1]).append(this);

                return wrapper;
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.css({ display: "none" });
            return this;
        }
    }, {
        key: 'show',
        value: function show() {
            this.css({ display: "block" });
            return this;
        }
    }, {
        key: 'parent',
        value: function parent() {
            var self = this,
                parents = [];

            this.elements.forEach(function (element) {
                parents.push(self._getParent(element));
            });

            return new HTMLTools(parents);
        }
    }, {
        key: '_getParent',
        value: function _getParent(element) {
            var parent = element.parentElement;

            if (!parent) parent = element.parentNode || null;

            return parent;
        }
    }, {
        key: 'transform',
        value: function transform(data) {
            var transform = new _transform.Transform(this);
            transform.apply(data);

            return transform;
        }
    }, {
        key: '_getAttributes',
        value: function _getAttributes(element, list) {
            if (element !== undefined && element.nodeType == 1 && element.attributes.length) {
                var attributes = {};

                if (list) {
                    if (Array.isArray(list)) list.forEach(function (name) {
                        var attribute = element.getAttribute(name);
                        if (attribute) attributes[name] = attribute;
                    });else if (typeof list == "string") attributes = element.getAttribute(list);else return;
                } else {
                    [].forEach.call(element.attributes, function (attribute) {
                        attributes[attribute.name] = attribute.value;
                    });
                }

                if (attributes) return attributes;else return false;
            } else return false;
        }
    }, {
        key: 'css',
        value: function css(styles) {
            if (typeof styles == "string") return this.elements[0].style[styles];else {
                this.elements.forEach(function (element) {
                    for (var name in styles) {
                        element.style[name] = styles[name];
                    }
                });

                return this;
            }
        }
    }, {
        key: '_insertJson',
        value: function _insertJson(json, method) {
            var self = this,
                clones = [];

            jsonConverter.toHTML(json);

            this.elements.forEach(function (current) {
                var element = jsonConverter.build(json);
                clones.push(element);
                method(element, current);
            });

            return new HTMLTools(clones);
        }
    }, {
        key: 'each',
        value: function each(fn) {
            this.elements.forEach(function (element, index, array) {
                fn($html.convert(element), index, array);
            });

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            var self = this,
                clones = [];

            this.elements.forEach(function (element) {
                clones.push(element.cloneNode(true));
            });

            return new HTMLTools(clones);
        }
    }, {
        key: 'convert',
        value: function convert(elements) {
            if (elements.nodeType == 1 || elements.nodeType == 9) return new HTMLTools(elements);else if (elements.isHTMLTool) return elements;else return false;
        }
    }, {
        key: 'merge',
        value: function merge(doc) {
            this.elements = this.elements.concat(doc.elements);
            return this;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.inner("");
        }
    }, {
        key: 'remove',
        value: function remove() {
            var self = this;

            this.elements.forEach(function (element, index) {
                if (element.parentNode) element.parentNode.removeChild(element);

                self.elements.$remove.index(index);
            });
        }
    }, {
        key: 'tag',
        get: function get() {
            return this.elements[0].tagName.toLowerCase();
        }
    }, {
        key: 'isHTMLTool',
        get: function get() {
            return true;
        }
    }, {
        key: 'index',
        get: function get() {
            return this.elements[0].selectedIndex;
        }
    }, {
        key: 'attr',
        get: function get() {
            var self = this;

            return {
                get: function get(name) {
                    var result;

                    if (self.elements.length == 1) result = self._getAttributes(self.elements[0], name);

                    return result;
                },
                set: function set(attrs) {
                    if (typeof attrs == "string") {
                        self.elements.forEach(function (element) {
                            element.setAttribute(attrs, "");
                        });
                    } else {
                        var result = [];

                        self.elements.forEach(function (element) {
                            for (var i in attrs) {
                                element.setAttribute(i, attrs[i]);
                            }
                        });
                    }

                    return self;
                },
                unset: function unset(attrs) {
                    if (typeof attrs == "string") {
                        self.elements.forEach(function (element) {
                            element.removeAttribute(attrs);
                        });
                    } else if (Array.isArray(attrs)) {
                        var result = [];

                        self.elements.forEach(function (element) {
                            attrs.forEach(function (attr) {
                                element.removeAttribute(attr);
                            });
                        });
                    } else if (attrs == undefined) {
                        attrs = self.attr.get();

                        if (attrs) {
                            self.elements.forEach(function (element) {
                                for (var i in attrs) {
                                    element.removeAttribute(i);
                                }
                            });
                        }
                    }

                    return self;
                }
            };
        }
    }, {
        key: 'event',
        get: function get() {

            var self = this;

            return {
                attach: function attach(list) {
                    var eventList;

                    if (!$html._eventList[self._id]) $html._eventList[self._id] = {};

                    eventList = $html._eventList[self._id];

                    for (var event in list) {
                        if (!eventList[event]) eventList[event] = superFunction(list[event]);else eventList[event].push(list[event]);

                        var evAttr = {};
                        evAttr["on" + event] = "$html._startEventFunc(" + self._id + ", '" + event + "', event)";
                        self.attr.set(evAttr);
                    }

                    return self;
                },
                dispatch: function dispatch(type) {
                    var event = new Event(type);

                    self.elements.forEach(function (element) {
                        element.dispatchEvent(event);
                    });
                },

                run: function run(type) {
                    $html._startEventFunc(self._id, type);
                },
                detach: function detach() {}
            };
        }
    }, {
        key: 'json',
        get: function get() {
            var self = this;

            return {
                before: function before(json) {
                    return self._insertJson(json, self._getInsertMethod("before"));
                },
                after: function after(json) {
                    return self._insertJson(json, self._getInsertMethod("after"));
                },
                prepend: function prepend(json) {
                    return self._insertJson(json, self._getInsertMethod("prepend"));
                },
                append: function append(json) {
                    return self._insertJson(json, self._getInsertMethod("append"));
                },
                get: function get(element) {
                    if (element) return jsonConverter.fromHTML(element);else if (self.elements.length) {
                        var result;

                        if (self.elements.length == 1) result = jsonConverter.fromHTML(self.elements[0]);else {
                            result = [];
                            self.elements.forEach(function (element) {
                                result.push(jsonConverter.fromHTML(element));
                            });
                        }

                        return result;
                    } else return false;
                }
            };
        }
    }]);

    return HTMLTools;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(7);

__webpack_require__(8);

var _binder = __webpack_require__(9);

var _async = __webpack_require__(0);

var _timer = __webpack_require__(10);

var _http = __webpack_require__(11);

var _url = __webpack_require__(12);

var _html = __webpack_require__(13);

window.$define({
	$Async: _async.Async,
	$Timer: _timer.Timer
});

window.$define({
	$bind: new _binder.Binder(),
	$http: new _http.HTTP(),
	$url: new _url.URLmanager(),
	$html: _html.$html
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!("assign" in Object)) Object.defineProperty(Object, "assign", {

	enumerable: false,
	configurable: true,
	writable: true,

	value: function value(target /*, ...sources */) {
		if (target === undefined || target === null) throw new TypeError('Object.assign: cannot convert undefined or null to object');

		for (var arg = 1; arg < arguments.length; arg++) {
			var source = arguments[arg];

			if (source === undefined || source === null) continue;else source = Object(source);

			for (var key in source) {
				target[key] = source[key];
			}
		}

		return target;
	}
});

if (!("from" in Array)) Object.defineProperty(Array, "from", {

	enumerable: false,
	configurable: true,
	writable: true,

	value: function () {

		function getLength(obj) {
			var length = 0;

			if ("length" in obj) {
				length = parseInt(obj.length);
				if (isNaN(length) || length < 0) length = 0;
			}

			return length;
		}

		function getValue(mapFn, target, key) {
			if (mapFn) {
				if (thisArg !== undefined) return mapFn.call(thisArg, target[key], key);else return mapFn(target[key], key);
			} else return target[key];
		}

		return function (target /*, mapFn, thisArg */) {
			if (target === null || target === undefined) throw new TypeError("Array.from: cannot convert first argument to object");

			target = Object(target);

			var result = [],
			    length = getLength(target),
			    mapFn = arguments[1],
			    thisArg = arguments[2];

			if (!Array.isArray(target)) for (var key = 0; key < length; key++) {
				var desc = Object.getOwnPropertyDescriptor(target, key);

				if (desc !== undefined && desc.enumerable) result.push(getValue(mapFn, target, key));else result.push(undefined);
			} else result = target;

			return result;
		};
	}()
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function define(fields) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var desc = {
		enumerable: options.enumer != undefined ? options.enumer : false,
		configurable: options.conf != undefined ? options.conf : true,
		writable: options.write != undefined ? options.write : true
	};

	if (typeof fields == "string") {
		if (options.value) desc.value = options.value;else if (options.get && options.set) {
			desc.get = options.get;
			desc.set = options.set;
			delete desc.writable;
		}

		Object.defineProperty(this, fields, desc);

		if (options.set && options.value != undefined) this[fields] = options.value;
	} else {
		for (var key in fields) {
			desc.value = fields[key];
			Object.defineProperty(this, String(key), desc);
		}
	}
};

Object.defineProperty(Object.prototype, "$define", {
	enumerable: false,
	configurable: false,
	writable: false,
	value: define
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _init = __webpack_require__(6);

function clone(object, full) {
    function Copy() {
        for (var field in object) {
            if (object.hasOwnProperty(field)) this[field] = full ? clone(object[field], true) : object[field];
        }
    }

    if (Array.isArray(object)) return object.$copy();else if ((typeof object === "undefined" ? "undefined" : _typeof(object)) == "object") {
        if ("__proto__" in object) Copy.prototype = object.__proto__;

        return new Copy();
    } else return object;
}

Object.prototype.$define({
    $clone: function $clone(full) {
        if (this.constructor != Object) {
            var result = new this.constructor();
            return Object.assign(result, this);
        } else return clone(this, full);
    },
    $init: function $init(fields, data) {
        var showErrors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var init = new _init.Init(this);
        init.start(fields, data);

        if (showErrors) init.showErrors();
    }
});

function join(objects, method) {
    if (Array.isArray(objects)) objects.forEach(function (object) {
        method(object);
    });else method(objects);
}

Object.prototype.$define("$join", {
    get: function get() {
        var self = this;

        return {
            left: function left(objects) {
                join(objects, function (object) {
                    for (var i in object) {
                        i in self && (self[i] = object[i]);
                    }
                });
            },
            right: function right(objects) {
                join(objects, function (object) {
                    for (var i in object) {
                        !(i in self) && (self[i] = object[i]);
                    }
                });
            },
            full: function full(objects) {
                join(objects, function (object) {
                    for (var i in object) {
                        self[i] = object[i];
                    }
                });
            }
        };
    },
    set: function set() {}
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Init = exports.Init = function () {
	function Init(object) {
		_classCallCheck(this, Init);

		this._object = object;
		this._errors = [];
		this._errors.title = 'Object.$init error in "' + object.constructor.name + '" constructor';
	}

	_createClass(Init, [{
		key: 'start',
		value: function start(fields, data) {
			if (fields && data) {
				for (var name in fields) {
					var fieldOptions, value, result;

					fieldOptions = fields[name];
					value = data[name];
					result = this._validate(fieldOptions, value, name);

					this._setValue(name, fieldOptions, result);
				}
			} else {
				this._errors.push("missing two required arguments (fields, data)");
			}
		}
	}, {
		key: 'showErrors',
		value: function showErrors() {
			if (this._errors.length) log.err(this._errors);
		}
	}, {
		key: '_setValue',
		value: function _setValue(name, options, value) {
			if (!this._errors.length) {
				var object,
				    desc = {},
				    have = 0;

				options.write !== undefined ? (have++, desc.write = options.write) : desc.write = true;
				options.enumer !== undefined ? (have++, desc.enumer = options.enumer) : desc.enumer = true;
				options.conf !== undefined ? (have++, desc.conf = options.conf) : desc.conf = true;

				if (options.root) object = options.root;else object = this._object;

				if (!have) object[name] = value;else object.$define(name, desc);
			}
		}
	}, {
		key: '_validate',
		value: function _validate(options, value, name) {
			if (options.attr) value = this._getAttrValue(options.attr, name, value);

			if (value === undefined) {
				if (options.required) this._errors.push('empty required option "' + name + '"');else if (options.def) value = options.def;
			} else {
				if (options.type && !istype(value, options.type)) this._errors.push('value of "' + name + '" option must be a "' + options.type + '" type');

				if (options.filter) value = options.filter(value);
			}

			return value;
		}
	}, {
		key: '_getAttrValue',
		value: function _getAttrValue(options, name, value) {
			var attr;

			if (options.element) {
				if (!options.prefix) options.prefix = "";
				if (!options.name) options.name = name;

				attr = DOC.convert(options.element).attr.get(options.prefix + options.name);

				if (options.only) !attr ? (value = undefined, this._errors.push('empty required attribute of option "' + name + '"')) : value = strconv(attr);else if (value == undefined && attr) value = strconv(attr);
			} else {
				this._errors.push('parameter "attr" of option "' + name + '" must have element');
			}

			return value;
		}
	}]);

	return Init;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Array.prototype.$define({
	$have: function $have(value) {
		var index = this.indexOf(value);
		if (index == -1) return false;else return { index: index };
	},
	$copy: function $copy() {
		return this.slice().sort();
	}
});

function haveInArray(array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) return true;else continue;
	}return false;
}

Array.prototype.$define("$remove", {
	get: function get() {
		var self = this;

		return {
			index: function index(_index) {
				var saved = [],
				    list = [];
				list = list.concat(_index);

				for (var i = 0; i < list.length; i++) {
					var indexDel = list[i];

					if (indexDel < self.length && indexDel >= 0) {
						saved.push(self[indexDel]);
						self[indexDel] = undefined;
					}
				}

				self.$remove.value();

				return saved;
			},
			value: function value(_value) {
				var list = [];
				list = list.concat(_value);

				for (var i = 0; i < self.length; i++) {
					if (haveInArray(list, self[i])) {
						self.splice(i, 1);
						i--;
					}
				}

				return list;
			},
			first: function first() {
				return self.splice(0, 1);
			},
			last: function last() {
				return self.pop();
			}
		};
	},
	set: function set() {}
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function istype(value, type) {
	if (Array.isArray(type)) {
		return type.some(function (t) {
			if (istype(value, t)) return true;
		});
	} else if (type !== undefined) {
		switch (type) {
			case "number":
				if (typeof value == "number") return true;else return false;
				break;
			case "string":
				if (typeof value == "string") return true;else return false;
				break;
			case "boolean":
				if (typeof value == "boolean") return true;else return false;
				break;
			case "array":
				if (Array.isArray(value)) return true;else return false;
				break;
			case "function":
				if (typeof value == "function") return true;else return false;
				break;
			case "dom":
				if (value !== undefined && value.nodeType == 1) return true;else return false;
				break;
			case "docTool":
				if (value.isDocTool) return true;else return false;
				break;
			default:
				log.err('the type "' + type + '" is unknown!');
				return false;
		}
	} else {
		if (typeof value == "number") return "number";else if (typeof value == "string") return "string";else if (typeof value == "boolean") return "boolean";else if (Array.isArray(value)) return "array";else if (typeof value == "function") return "function";else if (value.nodeType == 1) return "dom";else if (value.isDocTool) return "docTool";else return "object";
	}
}

function strconv(value) {
	if (typeof value == "string") {
		if (+value) return +value;
		if (value == "true" || value == "TRUE") return true;
		if (value == "false" || value == "FALSE") return false;
		if (value.search(/\[.+\]/g) != -1) {
			value = value.replace(/\[|\]/g, "");
			value = value.split(",");

			return value.map(function (val) {
				return strconv(val);
			});
		}
		if (value.search(/\{.+\}/g) != -1) return JSON.parse(value);

		return value.replace(/^\s+|\s+$/g, "");
	} else {
		log.err('strconv function error : type of argument must be "string"');
	}
}

function log() {
	var args = "";

	for (var i = 0; i < arguments.length; i++) {
		args += "arguments[" + i + "]" + ",";
	}args = args.slice(0, args.length - 1);

	eval("console.log(" + args + ")");
}

log.time = function () {
	console.time();
};

log.timeoff = function () {
	console.timeEnd();
};

log.err = function (data) {
	var error = "";

	if (Array.isArray(data)) {
		var tab = "";

		if ("title" in data) {
			error = data.title + ":\n\r";
			tab = "   - ";
		}

		data.forEach(function (message) {
			error += tab + message + ";\n\r";
		});

		error = error.slice(0, error.length - 2);
	} else error = data;

	console.error(error);
};

function random() {
	var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9999999;

	return Math.floor(Math.random() * (max - min)) + min;
}
random.key = function () {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;
	var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["all"];

	var lower = 'abcdefghijklmnopqrstuvwxyz',
	    upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	    numbers = '1234567890',
	    specials = "!?@#$%^&*()*-_+=[]{}<>.,;:/'\"\\",
	    chars = "";

	if (types.$have("all")) chars = lower + upper + numbers + specials;else {
		if (types.$have("lower")) chars += lower;
		if (types.$have("upper")) chars += upper;
		if (types.$have("numbers")) chars += numbers;
		if (types.$have("specials")) chars += specials;
	}

	var limit = chars.length - 1,
	    result = "";

	for (var i = 1; i < length; i++) {
		var char = chars[random(0, limit)];
		if (char != result[i - 1]) result += char;
	}

	return result;
};

function superFunction(fn) {
	var shell = function shell(data, order) {
		shell._data = data;

		if (!order) shell._handlers.forEach(function (handler) {
			handler(data);
		});else shell._handlers.forEach(function (handler) {
			shell._data = handler(shell.data);
		});
	};

	shell._handlers = [];
	shell._data;
	shell.count = 0;

	shell.push = function (fn) {
		if (typeof fn == "function") {
			shell._handlers.push(fn);
			shell.count = shell._handlers.length;
		}
	};

	shell.remove = function (fn) {
		shell._handlers.$remove.value(fn);
		shell.count = shell._handlers.length;
	};

	if (fn) shell.push(fn);

	return shell;
}

window.$define({
	log: log,
	istype: istype,
	strconv: strconv,
	random: random,
	superFunction: superFunction
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Binder = function () {
	function Binder() {
		_classCallCheck(this, Binder);
	}

	_createClass(Binder, [{
		key: "change",
		value: function change(object, field, trigger) {
			var hidden = "_" + field;
			// object[hidden] = object[field];

			object.$define(hidden, { value: object[field] });

			object.$define(field, {
				get: function get() {
					return object[hidden];
				},
				set: function set(value) {
					object[hidden] = value;
					trigger(value);
				},
				conf: true,
				enumer: true
			});
		}
	}, {
		key: "context",
		value: function context(fn, _context) {
			return function () {
				return fn.apply(_context, arguments);
			};
		}
	}, {
		key: "fields",
		value: function fields(data) {
			var left = data.left,
			    right = data.right,
			    modifier = data.modifier,
			    trigger = data.trigger;

			switch (data.type) {
				case "left":
					this._attach(left, right, modifier, trigger);break;
				case "right":
					this._attach(right, left, modifier, trigger);break;
				case "cross":
					this._attach(left, right, right.modifier, left.trigger);
					this._attach(right, left, left.modifier, right.trigger);
					break;
			}
		}
	}, {
		key: "unset",
		value: function unset() {}
	}, {
		key: "_attach",
		value: function _attach(current, target, modifier, trigger) {
			this._genGetSet(current.object, current.field, trigger);

			this._addJoint(current.object, current.field, {
				object: target.object,
				field: target.field,
				modifier: modifier
			});
		}
	}, {
		key: "_genGetSet",
		value: function _genGetSet(object, field, trigger) {
			var self = this,
			    hidden = "_" + field;

			if (!(hidden in object)) {
				object[hidden] = {
					joints: [],
					value: object[field],
					trigger: trigger
				};

				object.$define(field, {
					get: function get() {
						return object[hidden].value;
					},
					set: function set(value) {
						self._setData(object, field, value);
					},
					conf: true,
					enumer: true
				});
			}
		}
	}, {
		key: "_addJoint",
		value: function _addJoint(object, field, joint) {
			object["_" + field].joints.push(joint);
			this._applyValue(joint.object, joint.field, object["_" + field].value, joint.modifier);
		}
	}, {
		key: "_removeJoint",
		value: function _removeJoint() {}
	}, {
		key: "_applyValue",
		value: function _applyValue(object, field, value, modifier) {
			var hidden = "_" + field;

			if (modifier) value = modifier(value);

			if (hidden in object) object[hidden].value = value;else object[field] = value;
		}
	}, {
		key: "_setData",
		value: function _setData(object, field, data) {
			var sourseValue = data.value || data,
			    binded = object["_" + field];
			binded.value = sourseValue;

			if (!data.value && binded.trigger) binded.trigger(sourseValue, field);

			binded.joints.forEach(function (joint) {

				var value = joint.modifier ? joint.modifier(sourseValue) : sourseValue;

				if (joint.object == data.object && joint.field == data.field) return;else if ("_" + joint.field in joint.object) joint.object[joint.field] = {
					value: value,
					object: object,
					field: field
				};else joint.object[joint.field] = value;
			});
		}
	}]);

	return Binder;
}();

exports.Binder = Binder;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function () {
	function Timer(options) {
		_classCallCheck(this, Timer);

		this._stop = true;

		if (!options) options = {};

		this.count = options.count || 0;
		this.duration = options.duration || 0;
		this.delay = options.delay || 0;
		this.step = options.step || 0;

		this.onTick = superFunction(options.onTick);
		this.onStart = superFunction(options.onStart);
		this.onStop = superFunction(options.onStop);

		this._state = {
			timePassed: 0,
			startTime: 0,
			iteration: 0
		};

		this._init();
	}

	_createClass(Timer, [{
		key: "_init",
		value: function _init() {
			if (this.step) {
				if (!this.count) this.count = Math.round(this.duration / this.step);

				this.duration = null;
			}

			if (this.count) this.count--;

			this._tick = $bind.context(this._tick, this);
			this._stepTick = $bind.context(this._stepTick, this);
		}
	}, {
		key: "_common",
		value: function _common(time) {
			this._state.timePassed = time - this._state.startTime;

			if (this.count && this._state.iteration++ >= this.count) this._stop = true;
		}
	}, {
		key: "_stepTick",
		value: function _stepTick(time) {
			var self = this;

			this._common(time);

			this.onTick(this._state.timePassed);

			if (!this._stop) setTimeout(function () {
				self._stepTick(performance.now());
			}, this.step);else this.stop();
		}
	}, {
		key: "_tick",
		value: function _tick(time) {
			var state = this._state;

			this._common(time);

			if (this.duration && state.timePassed >= this.duration) this._stop = true;

			this.onTick(state.timePassed);

			if (!this._stop) requestAnimationFrame(this._tick);else this.stop();
		}
	}, {
		key: "start",
		value: function start() {
			var self = this;

			this._stop = false;

			if (self.delay) setTimeout(function () {
				self._startTimer();
			}, self.delay);else self._startTimer();
		}
	}, {
		key: "_startTimer",
		value: function _startTimer() {
			var tick,
			    state = this._state;

			state.startTime = performance.now();
			state.timePassed = 0;

			if (this.onStart.count) this.onStart();

			if (this.step) tick = this._stepTick;else tick = this._tick;

			tick(state.startTime);
		}
	}, {
		key: "reset",
		value: function reset() {
			this._state = {
				timePassed: 0,
				startTime: 0,
				iteration: 0
			};
		}
	}, {
		key: "stop",
		value: function stop() {
			if (this.onStop.count) this.onStop();
			this._stop = true;
		}
	}, {
		key: "state",
		get: function get() {
			return this._state;
		}
	}, {
		key: "on",
		get: function get() {
			var self = this;
			return {
				tick: function tick(fn) {
					self.onTick.push(fn);
				},
				start: function start(fn) {
					self.onStart.push(fn);
				},
				stop: function stop(fn) {
					self.onStop.push(fn);
				}
			};
		}
	}]);

	return Timer;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HTTP = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _async = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP = exports.HTTP = function () {
	function HTTP() {
		_classCallCheck(this, HTTP);

		this.XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
	}

	_createClass(HTTP, [{
		key: "get",
		value: function get(path) {
			var self = this,
			    async = new _async.Async(),
			    request = new this.XHR();

			request.open("GET", path + "?c=" + Math.random(), true);
			request.send();
			request.onload = function () {
				async.run.success(this.responseText);
			};
			request.onerror = function () {
				async.run.fail(this.statusText);
				log.err("$http.send ajax error (" + this.status + "): " + this.statusText);
			};
			request.onprogress = function (e) {
				var response = {
					loaded: e.loaded,
					total: e.total,
					relation: e.loaded / e.total
				};
				async.run.progress(response);
			};

			return async;
		}
	}, {
		key: "post",
		value: function post(data) {
			var self = this,
			    formData;

			if (data) {
				formData = new FormData();

				for (var key in data) {
					formData.append(key, data[key]);
				}
			} else log.err("http.post must have some data!");

			return {
				to: function to(path) {
					if (path) {
						var async = new _async.Async(),
						    request = new self.XHR();
						request.open("POST", path, true);
						request.send(formData);

						request.onload = function () {
							async.run.success(this.responseText);
						};
						request.onerror = function () {
							async.run.fail(this.statusText);
							log.err("$http.send ajax error (" + this.status + "): " + this.statusText);
						};
						request.onprogress = function (e) {
							var response = {
								loaded: e.loaded,
								total: e.total,
								relation: e.loaded / e.total
							};
							async.run.progress(response);
						};

						return async;
					} else log.err("http.post must have some path!");
				}
			};
		}
	}]);

	return HTTP;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URLmanager = exports.URLmanager = function () {
	function URLmanager() {
		_classCallCheck(this, URLmanager);

		this._params = this._getParamsInSearch();
		this.search = location.search;
		this.path = location.pathname;
	}

	_createClass(URLmanager, [{
		key: "take",
		value: function take(name) {
			if (name === undefined) return this._params;else if (typeof name == "string") return this._params[name];else if (Array.isArray(name)) {
				var self = this,
				    result = {};

				this.name.forEach(function (p) {
					if (p in self._params) result[p] = self._params[p];
				});

				return result;
			}
		}
	}, {
		key: "_getParamsInSearch",
		value: function _getParamsInSearch() {
			var params, search;

			params = {};
			search = location.search;

			if (!search) return false;

			search = search.replace("?", "");
			search = search.split("&");
			search.forEach(function (p) {
				p = p.split("=");
				params[p[0]] = p[1];
			});

			return params;
		}
	}, {
		key: "put",
		value: function put(params) {
			var self = this,
			    search;

			this._params = params;
			search = this._build();

			history.pushState({ foo: "bar" }, "page", self.path + search);

			return {
				go: function go(path) {
					if (!path) path = self.path;
					path += search;

					location.href = path;
				}
			};
		}
	}, {
		key: "add",
		value: function add(params) {
			var self = this,
			    search;

			this._params.$join.full(params);
			search = this._build();

			history.pushState({ foo: "bar" }, "page", self.path + search);

			return {
				go: function go(path) {
					if (!path) path = self.path;
					path += search;

					location.href = path;
				}
			};
		}
	}, {
		key: "_build",
		value: function _build() {
			var request = "?";

			for (var i in this._params) {
				request += i + "=" + this._params[i] + "&";
			}return request.slice(0, -1);
		}
	}]);

	return URLmanager;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$html = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _htmlTools = __webpack_require__(1);

var _stylesheet = __webpack_require__(16);

var proto = _htmlTools.HTMLTools.prototype,
    $html = new _htmlTools.HTMLTools(document);

$html.$define({
    extend: function extend(name, method) {
        proto[name] = method;
    },
    _eventList: {},
    _startEventFunc: function _startEventFunc(id, type, e) {
        this._eventList[id][type](e);
    },
    parseXML: function parseXML(data) {
        var parse,
            errors = '';

        if (typeof window.DOMParser != "undefined") parse = function parse(str) {
            return new window.DOMParser().parseFromString(str, "text/xml");
        };else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) parse = function parse(str) {
            var xml = new window.ActiveXObject("Microsoft.XMLDOM");
            xml.async = "false";
            xml.loadXML(str);

            return xml;
        };else errors += 'No XML parser found';

        if (!errors) return parse(data);else {
            log.err(errors);
            return false;
        }
    },
    create: function create(tag, attr, css) {
        var htool = new _htmlTools.HTMLTools(document.createElement(tag));

        if (typeof attr == "string") htool.addClass(attr);else if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) == "object") htool.attr.set(attr);

        if (css) htool.css(css);

        return htool;
    },
    styleSheet: function styleSheet() {
        return new _stylesheet.StyleSheet();
    }
});

$html.ready(function () {
    $html.body = new _htmlTools.HTMLTools(document.body);
});

exports.$html = $html;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JsonConverter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _htmlTools = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonConverter = exports.JsonConverter = function () {
    function JsonConverter() {
        _classCallCheck(this, JsonConverter);
    }

    _createClass(JsonConverter, [{
        key: "toHTML",
        value: function toHTML(json) {
            if (!json._htool) {
                var element,
                    htool,
                    self = this;

                if (!json.tag) json.tag = "div";

                element = document.createElement(json.tag);
                htool = new _htmlTools.HTMLTools(element);

                json._defaults = {};

                for (var item in json) {
                    switch (item) {
                        case "text":
                            htool.text(json.text);break;
                        case "html":
                            htool.inner(json.html);break;
                        case "value":
                            htool.value(json.value);break;
                        case "checked":
                            htool.checked(json.checked);break;
                        case "attrs":
                            htool.attr.set(json.attrs);break;
                        case "css":
                            htool.css(json.css);break;
                        case "transform":
                            htool.transform(json.transform);break;
                        case "nodes":
                            if (Array.isArray(json.nodes)) json.nodes.forEach(function (node) {
                                self.toHTML(node);
                            });else self.toHTML(json.nodes);
                            break;
                    }
                }

                if (json.content && json.template) {
                    json._defaults.content = JSON.parse(JSON.stringify(json.content));
                    htool.inner(self._getContent(json));
                }

                json._element = element;
                json._htool = htool;

                this._bind(json);

                if (json.events) htool.event.attach(json.events);

                json._htool.elements = [];
            }
        }
    }, {
        key: "build",
        value: function build(json) {
            var self = this,
                current = json._element.cloneNode(true);

            if (json.nodes && !json.template) {
                if (Array.isArray(json.nodes)) json.nodes.forEach(function (node) {
                    current.appendChild(self.build(node));
                });else current.appendChild(self.build(json.nodes));
            }

            json._htool.addElements(current);

            return current;
        }
    }, {
        key: "_getContent",
        value: function _getContent(json) {
            var content = json.content,
                template = json.template,
                defaults = json._defaults.content;

            for (var field in content) {
                if (content[field] == "") content[field] = defaults[field];

                template = template.replace("{" + field + "}", content[field]);
            }

            if (json.nodes) {
                if (Array.isArray(json.nodes)) json.nodes.forEach(function (node, index) {
                    template = template.replace("{node[" + index + "]}", node._element.outerHTML);
                });else template = template.replace("{node}", json.nodes._element.outerHTML);
            }

            var tokens = this._splitTokens(template);

            tokens.forEach(function (token) {
                template = template.replace("{" + token + "}", '<span style="color : red">{unknown token: ' + token + '}</span>');
            });

            return template;
        }
    }, {
        key: "_splitTokens",
        value: function _splitTokens(str) {
            var token = "",
                start = false,
                tokens = [];

            for (var i = 0; i < str.length; i++) {
                if (str[i] == "{") {
                    start = true;
                    continue;
                } else if (str[i] == "}") {
                    start = false;
                    continue;
                }

                if (start) token += str[i];else if (token) {
                    tokens.push(token);
                    token = "";
                }
            }

            return tokens;
        }
    }, {
        key: "_bind",
        value: function _bind(json) {
            var self = this;

            if (json.content && json.template) {
                for (var field in json.content) {
                    $bind.change(json.content, field, function (value) {
                        json._htool.inner(self._getContent(json));
                    });
                }
            }

            if (json.tag == "input" && json.attrs.type == "text") json.value = "";

            if (json.bind) {
                for (var i = 0; i < json.bind.length; i++) {
                    var item = json.bind[i];

                    switch (item) {
                        case "text":
                            $bind.change(json, "text", function (value) {
                                json._htool.text(value);
                            });

                            break;
                        case "html":
                            $bind.change(json, "html", function (value) {
                                json._htool.inner(value);
                            });

                            break;
                        case "value":
                            $bind.change(json, "value", function (value) {
                                json._htool.value(value);
                            });

                            if (json.tag == "input" && json.attrs.type == "text" || json.tag == "textarea") json._htool.event.attach({
                                input: function input(e) {
                                    json._value = e.srcElement.value;
                                    json._htool.value(e.srcElement.value);
                                }
                            });

                            break;
                        case "checked":
                            $bind.change(json, "checked", function (value) {
                                json._htool.checked(value);
                            });

                            if (json.tag == "input" && (json.attrs.type == "checkbox" || json.attrs.type == "radio")) json._htool.event.attach({
                                change: function change(e) {
                                    json._checked = e.srcElement.checked;
                                    json._htool.checked(e.srcElement.checked);
                                }
                            });

                            break;
                        case "attrs":
                            var _loop = function _loop(name) {
                                $bind.change(json.attrs, name, function (value) {
                                    var attr = {};
                                    attr[name] = value;
                                    json._htool.attr.set(attr);
                                });
                            };

                            for (var name in json.attrs) {
                                _loop(name);
                            }break;
                        case "css":
                            var _loop2 = function _loop2(name) {
                                $bind.change(json.css, name, function (value) {
                                    var style = {};
                                    style[name] = value;
                                    json._htool.css(style);
                                });
                            };

                            for (var name in json.css) {
                                _loop2(name);
                            }break;
                        case "transform":
                            var _loop3 = function _loop3(name) {
                                $bind.change(json.transform, name, function (value) {
                                    var action = {};
                                    action[name] = value;
                                    json._htool.transform(action);
                                });
                            };

                            for (var name in json.transform) {
                                _loop3(name);
                            }break;
                    }
                }
            }
        }
    }, {
        key: "fromHTML",
        value: function fromHTML(element) {
            if (element.nodeType == 1) {
                var result, attributes, elements;

                result = {};
                result.tag = element.tagName;
                attributes = element.attributes;
                elements = element.childNodes;

                if (attributes.length) {
                    result.attrs = {};

                    for (var i = 0; i < attributes.length; i++) {
                        if (attributes[i] != "tag" && attributes[i] != "nodes" && attributes[i] != "text") result.attrs[attributes[i].name.replace("-", "_")] = attributes[i].value;
                    }
                }

                if (elements.length) {
                    result.nodes = [];

                    for (var i = 0; i < elements.length; i++) {
                        if (elements[i].nodeType == 1) result.nodes.push(this.fromHTML(elements[i]));else if (elements[i].nodeType == 3) result.text = elements[i].textContent;
                    }
                }

                return result;
            } else return false;
        }
    }]);

    return JsonConverter;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
	units: {
		perspective: "px",
		translate: "px",
		rotate: "deg",
		skew: "deg",
		origin: "%",
		transition: "ms"
	},
	actions: {
		matrix2d: [], // need add support
		matrix3d: [], // need add support
		translate: [0, 0, 0],
		rotate: [0, 0, 0],
		scale: [1, 1],
		skew: [0, 0]
	},
	settings: {
		origin: false,
		transition: 0,
		perspective: 0,
		style: false,
		backface: true
	}
};

var Transform = exports.Transform = function () {
	function Transform(element) {
		_classCallCheck(this, Transform);

		var self = this;

		this.element = element;
		this._actions = defaults.actions.$clone(true);
		this._units = defaults.units.$clone();
		this._settings = defaults.settings.$clone();
		this._callback;
		this.completed = false;

		this.element.event.attach({
			"transitionend": function transitionend() {
				if (self._callback) {
					self._callback();
					self._callback = null;
				}
				self.completed = true;
			}
		});
	}

	_createClass(Transform, [{
		key: "apply",
		value: function apply(data) {
			if (data) {
				this.actions(data);
				if (data.settings) this.settings(data.settings);
				if (data.units) this.units(data.units);
			}

			var units = this._units,
			    actions = this._actions,
			    settings = this._settings,
			    transform = "";

			if (settings.transition) this.element.css({ "transition": settings.transition + units.transition });

			if (settings.origin) this.element.css({ "transform-origin": settings.origin[0] + units.origin + " " + settings.origin[1] + units.origin });

			if (!settings.backface) this.element.css({ "backface-visibility": "hidden" });

			if (settings.style) {
				if (settings.style == "3d") this.element.css({ "transform-style": "preserve-3d" });else if (settings.style == "flat") this.element.css({ "transform-style": "flat" });
			}

			if (settings.perspective) transform += "perspective(" + settings.perspective + units.perspective + ") ";

			this.completed = false;
			this.element.css({ "transform": transform + this._build(actions, units) });

			return this;
		}
	}, {
		key: "then",
		value: function then(fn) {
			if (this.completed) fn();else this._callback = fn;
		}
	}, {
		key: "actions",
		value: function actions(data) {
			var actions = this._actions;

			if (data.reset) this.reset.actions();

			if (data.translate) actions.translate = this._join(actions.translate, data.translate);
			if (data.rotate) actions.rotate = this._join(actions.rotate, data.rotate);
			if (data.scale) actions.scale = this._join(actions.scale, data.scale, true);
			if (data.skew) actions.skew = this._join(actions.skew, data.skew);
		}
	}, {
		key: "units",
		value: function units(data) {
			if (data.reset) this.reset.units();
			if (data) this._units.$join.left(data);
		}
	}, {
		key: "settings",
		value: function settings(data) {
			var settings = this._settings;

			if (data.transition && typeof data.transition == "number") settings.transition = data.transition;

			if (data.origin && data.origin.length == 2) settings.origin = data.origin;

			if (data.backface !== undefined) settings.backface = data.backface;

			if (data.style) settings.style = data.style;

			if (data.perspective && typeof data.perspective == "number") settings.perspective = data.perspective;
		}
	}, {
		key: "_join",
		value: function _join(left, right) {
			var mul = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			var arr = [];

			right = arr.concat(right);

			return left.map(function (item, index) {
				var add = +right[index];
				if (add) return mul ? item * add : item + add;else return item;
			});
		}
	}, {
		key: "_build",
		value: function _build(actions, units) {
			var result = "";

			for (var name in actions) {
				var action = actions[name],
				    unit = units[name] || "";

				switch (name) {
					case "translate":
						if (!this._empty(action)) result += "translate3d(" + action.join(unit + ",") + unit + ") ";
						break;
					case "rotate":
						if (action[0]) result += "rotateX(" + action[0] + unit + ") ";
						if (action[1]) result += "rotateY(" + action[1] + unit + ") ";
						if (action[2]) result += "rotateZ(" + action[2] + unit + ") ";
						break;
					case "scale":
						if (!this._empty(action, 1)) result += "scale(" + action.join() + ") ";
						break;
					case "skew":
						if (!this._empty(action)) result += "skew(" + action.join(unit + ",") + unit + ") ";
						break;
				}

				if (result) result += " ";
			}

			return result;
		}
	}, {
		key: "_empty",
		value: function _empty(array) {
			var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var result = array.filter(function (item) {
				if (item === char) return false;else return true;
			});

			if (!result.length) return true;else return false;
		}
	}, {
		key: "reset",
		get: function get() {
			var self = this;

			return {
				units: function units() {
					this._units = defaults.units.$clone();
				},
				actions: function actions() {
					this._actions = defaults.actions.$clone(true);
				},
				settings: function settings() {
					this._settings = defaults.settings.$clone();
				},
				full: function full() {
					this._actions = defaults.actions.$clone(true);
					this._units = defaults.units.$clone();
					this._settings = defaults.settings.$clone();
				}
			};
		}
	}]);

	return Transform;
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleSheet = exports.StyleSheet = function () {
	function StyleSheet() {
		_classCallCheck(this, StyleSheet);

		this.styleSheet;
		this._create();
	}

	_createClass(StyleSheet, [{
		key: "_create",
		value: function _create() {
			if (document.createStyleSheet) this.styleSheet = document.createStyleSheet();else {
				var head = document.getElementsByTagName("head")[0],
				    element = document.createElement("style");

				head.appendChild(element);

				this.styleSheet = document.styleSheets[document.styleSheets.length - 1];
			}
		}
	}, {
		key: "addRule",
		value: function addRule(selector, styles) {
			var styles = this._stylesToString(styles);

			if (this.styleSheet.insertRule) {
				var rule = selector + " {" + styles + "}";
				this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
			} else {
				this.styleSheet.addRule(selector, styles, this.styleSheet.cssRules.length);
			}
		}
	}, {
		key: "addRules",
		value: function addRules(styles) {
			for (selector in styles) {
				this._addRule(selector, styles[selector]);
			}
		}
	}, {
		key: "deleteRule",
		value: function deleteRule(index) {
			this.styleSheet.deleteRule(index);
		}
	}, {
		key: "_stylesToString",
		value: function _stylesToString(styles) {
			var result = "";

			for (var i in styles) {
				result += i + ":" + styles[i] + ";";
			}return result;
		}
	}]);

	return StyleSheet;
}();

/***/ })
/******/ ]);