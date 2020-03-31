import { c as createCommonjsModule, u as unwrapExports, a as commonjsGlobal, b as commonjsRequire } from './common/_commonjsHelpers-93820a20.js';

var node = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = validateNode;
/**
 * Validates Node
 *
 * @param {String|Object} node - query selector or node object
 * @return {Object} node - valid node object
 */
function validateNode(node) {
    if (!node) {
        throw Error("Node is not passed or invalid selector.");
    }

    var element = node;

    if (typeof element === "string") {
        element = document.querySelector(node);
        if (!element) {
            throw Error("Invalid selector.");
        }
    }

    if (!(element instanceof window.HTMLElement)) {
        throw Error("Node should be instance of window.HTMLElement or valid selector string.");
    }

    return element;
}
});

unwrapExports(node);

var config = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = validateConfig;
/**
 * Validates provided Image Crop config
 *
 * @param {Object} config - config object
 */
function validateConfig(config) {
    if (!config) {
        throw Error("Config is not passed or invalid.");
    }

    if (Object.prototype.toString.call(config) !== "[object Object]") {
        throw Error("Invalid config.");
    }
}
});

unwrapExports(config);

var dimension = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = validateDimension;
/**
 * Validates provided dimension (width or height)
 *
 * @param {Number} value - config object
 * @return {Number} value - valid dimension
 */
function validateDimension(value) {
    if (!value && value !== 0) {
        throw Error("Dimension is not passed or invalid.");
    }

    if (typeof value !== "number") {
        throw Error("Invalid dimension.");
    }

    if (!isFinite(value)) {
        throw Error("Invalid dimension.");
    }

    if (value < 0) {
        throw Error("Invalid dimension.");
    }

    return value;
}
});

unwrapExports(dimension);

var callback = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = validateCallback;
/**
 * Validates provided callback
 *
 * @param {Function} callback - Callback function.
 */
function validateCallback(callback) {
    if (typeof callback === "undefined") {
        return function () {};
    }
    if (!callback || typeof callback !== "function") {
        throw Error("Invalid callback.");
    }
    return callback;
}
});

unwrapExports(callback);

var _default = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Default Canvas dimensions
 */
var defaultDimensions = exports.defaultDimensions = {
    width: 560,
    height: 340
};

/**
 * Default styles
 */
var styles = exports.styles = {
    cutout: {
        fill: "rgba(0, 0, 0, 0.3)"
    },
    pattern: {
        size: 16,
        fill1: "rgb(215, 215, 215)",
        fill2: "rgb(250, 250, 250)"
    }
};
});

unwrapExports(_default);
var _default_1 = _default.defaultDimensions;
var _default_2 = _default.styles;

var size = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a Size
 */
var Size =
/**
 * Create a Size
 */
function Size() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  _classCallCheck(this, Size);

  this.width = width;
  this.height = height;
};

exports.default = Size;
});

unwrapExports(size);

var element = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _size2 = _interopRequireDefault(size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a base element
 */
var Element = function () {
    /**
     * Create an element
     *
     * @param {String|Object} node - The element.
     */
    function Element(node) {
        _classCallCheck(this, Element);

        this._node = node;
        if (!node || typeof node === "string") {
            if (node === "svg" || node === "use") {
                this._node = document.createElementNS("http://www.w3.org/2000/svg", node);
                return;
            }
            this._node = document.createElement(node || "div");
        }
    }

    /**
     * Add an Element's node to the end of the list of children of a specified parent node
     *
     * @param {Object} parent - The DOM Element object, parent node
     * @return {Element} An Element object.
     */


    _createClass(Element, [{
        key: "render",
        value: function render(parent) {
            if (!parent) {
                throw Error("Parent node are not passed.");
            }

            parent.appendChild(this._node);
            return this;
        }

        /**
         * Change width of Element
         *
         * @param {Number} width - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setWidth",
        value: function setWidth(width) {
            this._node.width = width;
            return this;
        }

        /**
         * Change height of Element
         *
         * @param {Number} height - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setHeight",
        value: function setHeight(height) {
            this._node.height = height;
            return this;
        }

        /**
         * Get a drawing 2d context on the canvas
         *
         * @return {Object} - RenderingContext
         */

    }, {
        key: "getSize",
        value: function getSize() {
            return new (_get__("Size"))(this._node.width, this._node.height);
        }

        /**
         * Get a drawing 2d context on the canvas
         *
         * @return {Object} - A node.
         */

    }, {
        key: "getNode",
        value: function getNode() {
            return this._node;
        }

        /**
         * Get a drawing 2d context on the canvas
         *
         * @return {Object} - RenderingContext
         */

    }, {
        key: "getContext2d",
        value: function getContext2d() {
            return this._node.getContext("2d");
        }

        /**
         * Change the type of HTML element (type attribute)
         *
         * @return {Element} - An Element object.
         */

    }, {
        key: "setType",
        value: function setType(type) {
            this._node.type = type;
            return this;
        }

        /**
         * Add class to HTML element (attribute `class`)
         *
         * @return {Element} - An Element object.
         */

    }, {
        key: "addClass",
        value: function addClass(newClass) {
            this._node.className += this._node.className.length > 1 ? " " + newClass : newClass;
            return this;
        }

        /**
         * Adds a new attribute or changes the value of an existing attribute on the HTML element.
         *
         * @return {Element} - An Element object.
         */

    }, {
        key: "setAttribute",
        value: function setAttribute(attributeName, attributeValue) {
            this._node.setAttribute(attributeName, attributeValue);
            return this;
        }
    }]);

    return Element;
}();

exports.default = Element;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "Size":
            return _size2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Element === "undefined" ? "undefined" : _typeof(Element);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Element, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Element)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(element);
var element_1 = element.__RewireAPI__;
var element_2 = element.__ResetDependency__;
var element_3 = element.__set__;
var element_4 = element.__Rewire__;
var element_5 = element.__GetDependency__;
var element_6 = element.__get__;

var es6Promise = createCommonjsModule(function (module, exports) {
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 module.exports = factory() ;
}(commonjsGlobal, (function () {
function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof commonjsGlobal !== 'undefined') {
    local = commonjsGlobal;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));




});

var image = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _element2 = _interopRequireDefault(element);



var _size2 = _interopRequireDefault(size);



var _es6Promise2 = _interopRequireDefault(es6Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing an Image element
 */
var Image = function (_get__2) {
    _inherits(Image, _get__2);

    /**
     * Create an element
     *
     */
    function Image() {
        _classCallCheck(this, Image);

        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, "img"));

        _this._scale = _this._originScale = 1;
        _this._zoom = 0;
        return _this;
    }

    /**
     * Load an image by URL and set 'src' attribute.
     *
     * @param {String} url - The url or path to image
     * @return {Promise} A promise that returns {@link load~resolve} if resolved and {@link load~reject} if rejected.
     */


    _createClass(Image, [{
        key: "load",
        value: function load(url) {
            var _this2 = this;

            return new (_get__("Promise"))(function (resolve, reject) {
                _this2.getNode().onload = function () {
                    _this2._checkFormat();
                    resolve(_this2);
                };
                _this2.getNode().onerror = function () {
                    reject(Error("Can't load an image."));
                };
                _this2.getNode().src = url;
                _this2.getNode().crossOrigin = "Anonymous";
            });
        }

        /**
         * Method, which check image format is portrait.
         *
         * @return {Boolean} Returns true if portrait.
         */

    }, {
        key: "isPortrait",
        value: function isPortrait() {
            return this._checkFormat() === "portrait";
        }

        /**
         * Method, which check image format is landscape.
         *
         * @return {Boolean} Returns true if landscape.
         */

    }, {
        key: "isLandscape",
        value: function isLandscape() {
            return this._checkFormat() === "landscape";
        }

        /**
         * Method, which check image format is square.
         *
         * @return {Boolean} Returns true if square.
         */

    }, {
        key: "isSquare",
        value: function isSquare() {
            return this._checkFormat() === "square";
        }

        /**
         * Scale image to fit Frame.
         *
         * @param {Frame} frame - A Frame object.
         * @return {Number} - Scale value.
         */

    }, {
        key: "scaleToFit",
        value: function scaleToFit(frame) {
            var widthScale = frame.getRect().size.width / this.getNode().width;
            var heightScale = frame.getRect().size.height / this.getNode().height;
            var largestScale = widthScale > heightScale ? widthScale : heightScale;
            this._scale = this._originScale = largestScale;
            return this._scale;
        }

        /**
         * Get actual size of image
         *
         * @return {Size} - Returns Size object, which contain weight and height
         */

    }, {
        key: "getSize",
        value: function getSize() {
            var w = this.getNode().width * this._scale;
            var h = this.getNode().height * this._scale;
            return new (_get__("Size"))(w, h);
        }

        /**
         * Zoom an image
         *
         * @param {Number} zoom - Zoom value, from 0 to 1.0
         * @return {Image} - An Image object.
         */

    }, {
        key: "setZoom",
        value: function setZoom(zoom) {
            this._zoom = zoom;
            this._scale = this._originScale + this._originScale * zoom;
            return this;
        }

        /**
         * Get actual zoom value
         *
         * @return {Number} - Zoom value.
         */

    }, {
        key: "getZoom",
        value: function getZoom() {
            return this._zoom;
        }

        /**
         * Get actual scale value
         *
         * @returns {Number} - An actual scale value.
         */

    }, {
        key: "getScale",
        value: function getScale() {
            return this._scale;
        }

        /**
         * Get origin scale value (without zoom)
         *
         * @returns {Number} - An origin scale value.
         */

    }, {
        key: "getOriginScale",
        value: function getOriginScale() {
            return this._originScale;
        }

        /**
         * Method, which check an image format (landscape or portrait) and save it.
         *
         * @return {String} Format.
         */

    }, {
        key: "_checkFormat",
        value: function _checkFormat() {
            if (this.getNode().width > this.getNode().height) {
                return "landscape";
            }
            if (this.getNode().width < this.getNode().height) {
                return "portrait";
            }
            return "square";
        }
    }]);

    return Image;
}(_get__("Element"));

exports.default = Image;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "Promise":
            return _es6Promise2.default;

        case "Size":
            return _size2.default;

        case "Element":
            return _element2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Image === "undefined" ? "undefined" : _typeof(Image);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Image, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Image)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(image);
var image_1 = image.__RewireAPI__;
var image_2 = image.__ResetDependency__;
var image_3 = image.__set__;
var image_4 = image.__Rewire__;
var image_5 = image.__GetDependency__;
var image_6 = image.__get__;

var context = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a drawing context on the canvas
 */
var Context = function () {
  /**
   * Create a context
   */
  function Context(context) {
    _classCallCheck(this, Context);

    this._context = context;
  }

  /**
   * Draws a filled rectangle at (x, y) position whose size is determined by width and height and whose style
   * is determined by the fillStyle attribute.
   *
   * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
   * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
   * @param {Number} width - The rectangle's width.
   * @param {Number} height - The rectangle's height.
   */


  _createClass(Context, [{
    key: "fillRect",
    value: function fillRect(x, y, width, height) {
      return this._context.fillRect(x, y, width, height);
    }

    /**
     * Sets a property of the Canvas 2D API, which specifies the color or style to use inside shapes.
     *
     * @param {String|Object} style - A CSS <color> value, Canvas gradient or Canvas pattern
     */

  }, {
    key: "fillStyle",
    value: function fillStyle(style) {
      return this._context.fillStyle = style;
    }

    /**
     * Creates a pattern using the specified image (a CanvasImageSource).
     * It repeats the source in the directions specified by the repetition argument.
     *
     * @param {CanvasImageSource} image - A CanvasImageSource to be used as image to repeat.
     * @param {String} repetition - A DOMString indicating how to repeat the image.
     */

  }, {
    key: "createPattern",
    value: function createPattern(image, repetition) {
      return this._context.createPattern(image, repetition);
    }

    /**
     * Creates a path for a rectangle at position (x, y) with a size that is determined by width and height.
     * Those four points are connected by straight lines and the sub-path is marked as closed,
     * so that you can fill or stroke this rectangle.
     *
     * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {Number} width - The rectangle's width.
     * @param {Number} height - The rectangle's height.
     */

  }, {
    key: "rect",
    value: function rect(x, y, width, height) {
      return this._context.rect(x, y, width, height);
    }

    /**
     * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
     */

  }, {
    key: "fill",
    value: function fill() {
      return this._context.fill();
    }

    /**
     * Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
     */

  }, {
    key: "beginPath",
    value: function beginPath() {
      return this._context.beginPath();
    }

    /**
     * Moves the starting point of a new sub-path to the (x, y) coordinates.
     *
     * @param {Number} x -The x axis of the point.
     * @param {Number} y -The y axis of the point.
     */

  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      return this._context.moveTo(x, y);
    }

    /**
     * Connects the last point in the sub-path to the x, y coordinates with a straight line
     * (but does not actually draw it).
     *
     * @param {Number} x - The x axis of the coordinate for the end of the line.
     * @param {Number} y - The y axis of the coordinate for the end of the line.
     */

  }, {
    key: "lineTo",
    value: function lineTo(x, y) {
      return this._context.lineTo(x, y);
    }

    /**
     * Causes the point of the pen to move back to the start of the current sub-path.
     * It tries to add a straight line (but does not actually draw it) from the current point to the start.
     * If the shape has already been closed or has only one point, this function does nothing.
     */

  }, {
    key: "closePath",
    value: function closePath() {
      return this._context.closePath();
    }

    /**
     * Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black,
     * erasing any previously drawn content.
     *
     * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {Number} width - The rectangle's width.
     * @param {Number} height - The rectangle's height.
     */

  }, {
    key: "clearRect",
    value: function clearRect(x, y, width, height) {
      return this._context.clearRect(x, y, width, height);
    }

    /**
     * Provides different ways to draw an image onto the canvas.
     *
     * @param {Number} image - An element to draw into the context.
     * @param {Number} sx - The X coordinate of the top left corner of the sub-rectangle of the source image to draw
     * into the destination context.
     * @param {Number} sy - The Y coordinate of the top left corner of the sub-rectangle of the source image to draw
     * into the destination context.
     * @param {Number} sWidth - The width of the sub-rectangle of the source image to draw into the destination context.
     * @param {Number} sHeight - The height of the sub-rectangle of the source image to draw into the destination context.
     * @param {Number} dx - The X coordinate in the destination canvas at which to place the top-left corner
     * of the source image.
     * @param {Number} dy - The Y coordinate in the destination canvas at which to place the top-left corner
     * of the source image.
     * @param {Number} dWidth - The width to draw the image in the destination canvas.
     * @param {Number} dHeight - The height to draw the image in the destination canvas.
     */

  }, {
    key: "drawImage",
    value: function drawImage() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this._context.drawImage.apply(this._context, args);
    }
  }]);

  return Context;
}();

exports.default = Context;
});

unwrapExports(context);

var pattern = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _element2 = _interopRequireDefault(element);





var _context2 = _interopRequireDefault(context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a Pattern element
 */
var Pattern = function (_get__2) {
    _inherits(Pattern, _get__2);

    /**
     * Create a pattern, set size
     */
    function Pattern() {
        _classCallCheck(this, Pattern);

        var _this = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, "canvas"));

        _this._context = new (_get__("Context"))(_this._node.getContext("2d"));

        _this.setWidth(_get__("styles").pattern.size);
        _this.setHeight(_get__("styles").pattern.size);

        _this._draw();
        return _this;
    }

    /**
     * Draw pattern on canvas
     *
     * @return {Pattern} A Pattern object.
     */


    _createClass(Pattern, [{
        key: "_draw",
        value: function _draw() {
            this._context.fillStyle(_get__("styles").pattern.fill1);
            this._context.fillRect(0, 0, 8, 8);
            this._context.fillStyle(_get__("styles").pattern.fill2);
            this._context.fillRect(8, 0, 8, 8);
            this._context.fillRect(0, 8, 8, 8);
            this._context.fillStyle(_get__("styles").pattern.fill1);
            this._context.fillRect(8, 8, 8, 8);
            return this;
        }
    }]);

    return Pattern;
}(_get__("Element"));

exports.default = Pattern;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "Context":
            return _context2.default;

        case "styles":
            return _default.styles;

        case "Element":
            return _element2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Pattern === "undefined" ? "undefined" : _typeof(Pattern);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Pattern, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Pattern)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(pattern);
var pattern_1 = pattern.__RewireAPI__;
var pattern_2 = pattern.__ResetDependency__;
var pattern_3 = pattern.__set__;
var pattern_4 = pattern.__Rewire__;
var pattern_5 = pattern.__GetDependency__;
var pattern_6 = pattern.__get__;

var point = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a Point
 */
var Point =
/**
 * Create a point
 */
function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  _classCallCheck(this, Point);

  this.x = x;
  this.y = y;
};

exports.default = Point;
});

unwrapExports(point);

var frame = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _point2 = _interopRequireDefault(point);



var _size2 = _interopRequireDefault(size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var frameProportion = 0.85;

/**
 * Class representing a Frame element
 */

var Frame = function () {
    /**
     * Create a frame
     */
    function Frame() {
        _classCallCheck(this, Frame);

        this._size = 0;
        this._origin = {
            x: 0,
            y: 0
        };
    }

    /**
     * Update size and coordinates of rectangle (frame)
     *
     * @param {Object} parent - A parent node.
     * @return {Pattern} A Pattern object.
     */


    _createClass(Frame, [{
        key: "update",
        value: function update(parent) {
            this._size = parent.width > parent.height ? parent.height * _get__("frameProportion") : parent.width * _get__("frameProportion");
            this._origin = {
                x: (parent.width - this._size) / 2,
                y: (parent.height - this._size) / 2
            };
            return this;
        }

        /**
         * Get rectangle properties.
         *
         * @return {Object} - Object.point is an origin Point,
         * which in the upper-left corner and the rectangle extends towards the lower-right corner.
         * Object.size is a size that specifies the height and width of the rectangle.
         */

    }, {
        key: "getRect",
        value: function getRect() {
            return {
                origin: new (_get__("Point"))(this._origin.x, this._origin.y),
                size: new (_get__("Size"))(this._size, this._size)
            };
        }

        /**
         * Get the smallest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The smallest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMinX",
        value: function getMinX() {
            return this._origin.x;
        }

        /**
         * Get the largest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The largest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMaxX",
        value: function getMaxX() {
            return this._origin.x + this._size;
        }

        /**
         * Get the x- coordinate that establishes the center of a rectangle.
         *
         * @returns {Number} - The x-coordinate that establishes the center of a rectangle.
         */

    }, {
        key: "getMidX",
        value: function getMidX() {
            return this._origin.x + this._size / 2;
        }

        /**
         * Get the smallest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The smallest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMinY",
        value: function getMinY() {
            return this._origin.y;
        }

        /**
         * Get the largest value of the x-coordinate for the rectangle.
         *
         * @return {Number} - The largest value of the x-coordinate for the rectangle.
         */

    }, {
        key: "getMaxY",
        value: function getMaxY() {
            return this._origin.y + this._size;
        }

        /**
         * Get the y-coordinate that establishes the center of the rectangle.
         *
         * @returns {Number} - The y-coordinate that establishes the center of a rectangle.
         */

    }, {
        key: "getMidY",
        value: function getMidY() {
            return this._origin.y + this._size / 2;
        }
    }]);

    return Frame;
}();

exports.default = Frame;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "frameProportion":
            return frameProportion;

        case "Point":
            return _point2.default;

        case "Size":
            return _size2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Frame === "undefined" ? "undefined" : _typeof(Frame);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Frame, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Frame)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(frame);
var frame_1 = frame.__RewireAPI__;
var frame_2 = frame.__ResetDependency__;
var frame_3 = frame.__set__;
var frame_4 = frame.__Rewire__;
var frame_5 = frame.__GetDependency__;
var frame_6 = frame.__get__;

var cutout = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





var _context2 = _interopRequireDefault(context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a cutout over canvas
 */
var Cutout = function () {
    /**
     * Create a canvas element.
     *
     * @param {Frame} frame - A Frame object
     * @param {Object} canvas - A Canvas element
     */
    function Cutout(frame, canvas) {
        _classCallCheck(this, Cutout);

        this._frame = frame;
        this._canvas = canvas;
        this._context = new (_get__("Context"))(this._canvas.getNode().getContext("2d"));
    }

    /**
     * Draw the cutout over canvas, clockwise rectangle and anti-clock wise rectangle
     *
     * @return {Cutout} A Cutout object.
     */


    _createClass(Cutout, [{
        key: "draw",
        value: function draw() {
            this._context.fillStyle(_get__("styles").cutout.fill);
            this._context.beginPath();
            this._context.rect(0, 0, this._canvas.getNode().width, this._canvas.getNode().height);
            this._context.moveTo(this._frame.getMinX(), this._frame.getMinY());
            this._context.lineTo(this._frame.getMinX(), this._frame.getMaxY());
            this._context.lineTo(this._frame.getMaxX(), this._frame.getMaxY());
            this._context.lineTo(this._frame.getMaxX(), this._frame.getMinY());
            this._context.closePath();
            this._context.fill();
            return this;
        }
    }]);

    return Cutout;
}();

exports.default = Cutout;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "Context":
            return _context2.default;

        case "styles":
            return _default.styles;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Cutout === "undefined" ? "undefined" : _typeof(Cutout);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Cutout, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Cutout)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(cutout);
var cutout_1 = cutout.__RewireAPI__;
var cutout_2 = cutout.__ResetDependency__;
var cutout_3 = cutout.__set__;
var cutout_4 = cutout.__Rewire__;
var cutout_5 = cutout.__GetDependency__;
var cutout_6 = cutout.__get__;

var generator = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _element2 = _interopRequireDefault(element);



var _context2 = _interopRequireDefault(context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a Generator
 */
var Generator = function (_get__2) {
    _inherits(Generator, _get__2);

    /**
     * Create a generator.
     */
    function Generator(frame, canvas) {
        _classCallCheck(this, Generator);

        var _this = _possibleConstructorReturn(this, (Generator.__proto__ || Object.getPrototypeOf(Generator)).call(this, "canvas"));

        _this._frame = frame;
        _this._canvas = canvas;
        _this._context = new (_get__("Context"))(_this._node.getContext("2d"));
        return _this;
    }

    /**
     * Generates and returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
     * The returned image is in a resolution of 96 dpi.
     *
     * @return {String} - A data URI.
     */


    _createClass(Generator, [{
        key: "toDataURL",
        value: function toDataURL() {
            this.setWidth(this._frame.getRect().size.width);
            this.setHeight(this._frame.getRect().size.height);
            this._context.drawImage(this._canvas.getNode(), this._frame.getMinX(), this._frame.getMinY(), this._frame.getRect().size.width, this._frame.getRect().size.height, 0, 0, this._frame.getRect().size.width, this._frame.getRect().size.height);
            return this.getNode().toDataURL();
        }
    }]);

    return Generator;
}(_get__("Element"));

exports.default = Generator;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "Context":
            return _context2.default;

        case "Element":
            return _element2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Generator === "undefined" ? "undefined" : _typeof(Generator);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Generator, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Generator)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(generator);
var generator_1 = generator.__RewireAPI__;
var generator_2 = generator.__ResetDependency__;
var generator_3 = generator.__set__;
var generator_4 = generator.__Rewire__;
var generator_5 = generator.__GetDependency__;
var generator_6 = generator.__get__;

var move = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _element2 = _interopRequireDefault(element);



var _point2 = _interopRequireDefault(point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a MoveEventListener
 */
var MoveEventListener = function () {
    /**
     * Create a MoveEventListener.
     *
     * @param {Element} element - A main container.
     * @param {Element} parent - A parent element (window)
     */
    function MoveEventListener(element) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new (_get__("Element"))(document.body);

        _classCallCheck(this, MoveEventListener);

        this._element = element;
        this._parent = parent;

        this._onMoveCallback = function () {};
        this._onPressCallback = function () {};
        this._onReleaseCallback = function () {};

        this._onReleaseHandler = this.onReleaseHandler.bind(this);
        this._onPressHandler = this.onPressHandler.bind(this);
        this._onMoveHandler = this.onMoveHandler.bind(this);
    }

    /**
     * Callback function which fires after (touch/mouse) moving (dragging)
     *
     * @param {Function} callback - Callback.
     */


    _createClass(MoveEventListener, [{
        key: "onMove",
        value: function onMove(callback) {
            this._onMoveCallback = callback;
        }

        /**
         * Callback function which fires after touch press / mouse click
         *
         * @param {Function} callback - Callback.
         */

    }, {
        key: "onPress",
        value: function onPress(callback) {
            this._onPressCallback = callback;
        }

        /**
         * Callback function which fires after mouse/finger releasing
         *
         * @param {Function} callback - Callback.
         */

    }, {
        key: "onRelease",
        value: function onRelease(callback) {
            this._onReleaseCallback = callback;
        }

        /**
         * Initialize event listeners
         */

    }, {
        key: "init",
        value: function init() {
            this._element.getNode().addEventListener("mousedown", this._onPressHandler, false);
            this._element.getNode().addEventListener("touchstart", this._onPressHandler, false);
            this._parent.getNode().addEventListener("mouseup", this._onReleaseHandler, false);
            this._parent.getNode().addEventListener("touchend", this._onReleaseHandler, false);
        }

        /**
         * Handler for (touch/mouse) move action.
         *
         * @param {Object} event - Event object.
         */

    }, {
        key: "onMoveHandler",
        value: function onMoveHandler(event) {
            this._onMoveCallback(this._getEventPoint(event));
        }

        /**
         * Handler for (touch/mouse) press action.
         *
         * @param {Object} event - Event object.
         */

    }, {
        key: "onPressHandler",
        value: function onPressHandler(event) {
            this._parent.getNode().addEventListener("mousemove", this._onMoveHandler, false);
            this._parent.getNode().addEventListener("touchmove", this._onMoveHandler, false);
            this._onPressCallback(this._getEventPoint(event));
        }

        /**
         * Handler for (touch/mouse) release action.
         */

    }, {
        key: "onReleaseHandler",
        value: function onReleaseHandler(event) {
            this._parent.getNode().removeEventListener("mousemove", this._onMoveHandler, false);
            this._parent.getNode().removeEventListener("touchmove", this._onMoveHandler, false);
            this._onReleaseCallback(this._getEventPoint(event));
        }

        /**
         * Translate viewport coordinates to coordinates relative to the element.
         *
         * @param {Point} point - Viewport coordinates
         * @return {Object} - Coordinates relative to the element.
         */

    }, {
        key: "_convertCoordinates",
        value: function _convertCoordinates(point) {
            var box = this._element.getNode().getBoundingClientRect();
            var x = point.x - box.left * (this._element.getNode().width / box.width);
            var y = point.y - box.top * (this._element.getNode().height / box.height);
            return new (_get__("Point"))(x, y);
        }
    }, {
        key: "_getEventPoint",
        value: function _getEventPoint(event) {
            var x = event.clientX || event.touches[0].clientX;
            var y = event.clientY || event.touches[0].clientY;
            return this._convertCoordinates(new (_get__("Point"))(x, y));
        }
    }]);

    return MoveEventListener;
}();

exports.default = MoveEventListener;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "Element":
            return _element2.default;

        case "Point":
            return _point2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof MoveEventListener === "undefined" ? "undefined" : _typeof(MoveEventListener);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(MoveEventListener, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(MoveEventListener)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(move);
var move_1 = move.__RewireAPI__;
var move_2 = move.__ResetDependency__;
var move_3 = move.__set__;
var move_4 = move.__Rewire__;
var move_5 = move.__GetDependency__;
var move_6 = move.__get__;

var canvas = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



var _element2 = _interopRequireDefault(element);



var _image2 = _interopRequireDefault(image);



var _pattern2 = _interopRequireDefault(pattern);



var _frame2 = _interopRequireDefault(frame);



var _point2 = _interopRequireDefault(point);



var _cutout2 = _interopRequireDefault(cutout);



var _generator2 = _interopRequireDefault(generator);



var _move2 = _interopRequireDefault(move);



var _context2 = _interopRequireDefault(context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a canvas element
 */
var Canvas = function (_get__2) {
    _inherits(Canvas, _get__2);

    /**
     * Create a canvas element.
     */
    function Canvas() {
        _classCallCheck(this, Canvas);

        var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, "canvas"));

        _this._context = new (_get__("Context"))(_this._node.getContext("2d"));
        _this._image = new (_get__("Image"))();
        _this._pattern = new (_get__("Pattern"))();
        _this._frame = new (_get__("Frame"))();
        _this._cutout = new (_get__("Cutout"))(_this._frame, _this);
        _this._generator = new (_get__("Generator"))(_this._frame, _this);
        _this._moveEventListener = new (_get__("MoveEventListener"))(_this);

        _this._lastPoint = new (_get__("Point"))(0, 0);
        _this._basePoint = new (_get__("Point"))(0, 0);

        _this._onChangeCallback = function () {};
        return _this;
    }

    /**
     * Render a canvas
     *
     * @param {Object} parent - The DOM Element object, parent node
     * @return {Canvas} An Canvas object.
     */


    _createClass(Canvas, [{
        key: "render",
        value: function render(parent) {
            var _this2 = this;

            _get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), "render", this).call(this, parent);
            this._drawBackground();
            this._moveEventListener.init();
            this._moveEventListener.onPress(function (point) {
                _this2._lastPoint = point;
            });
            this._moveEventListener.onMove(function (point) {
                _this2._drawImage(point);
            });
            return this;
        }

        /**
         * Change width of Canvas, recalculate frame dimensions
         *
         * @param {Number} width - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setWidth",
        value: function setWidth(width) {
            _get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), "setWidth", this).call(this, width);
            this._frame.update(this.getNode());
            return this;
        }

        /**
         * Change height of Canvas
         *
         * @param {Number} height - The number of pixels.
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setHeight",
        value: function setHeight(height) {
            _get(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), "setHeight", this).call(this, height);
            this._frame.update(this.getNode());
            return this;
        }

        /**
         * Pass the Image object into Canvas, reset saved points,
         * calculate scale value (image should fit in the frame)
         *
         * @param {Image} image - An Image object
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "setImage",
        value: function setImage(image) {
            this._resetPoints();
            this._image = image;
            this._image.scaleToFit(this._frame);
            return this;
        }

        /**
         * Draw an Image at initial position
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "draw",
        value: function draw() {
            this._drawImage(this._centerImagePoint());
            return this;
        }

        /**
         * Redraw an Image
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "redraw",
        value: function redraw() {
            this._resetPoints();
            this._image.scaleToFit(this._frame);
            this.draw();
            return this;
        }

        /**
         * Clear canvas context
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "clear",
        value: function clear() {
            this._context.clearRect(0, 0, this.getNode().width, this.getNode().height);
            return this;
        }

        /**
         * Generates and returns a data URI containing a representation
         * of the image in the format specified by the type parameter (defaults to PNG).
         * The returned image is in a resolution of 96 dpi.
         *
         * @return {String} - A data URI.
         */

    }, {
        key: "toDataURL",
        value: function toDataURL() {
            return this._generator.toDataURL();
        }

        /**
         * Sets zoom.
         *
         * @param {Number} zoom - Zoom value, from `0` = 0%, `1.0` = 100% of image size
         * @return {Canvas} - A Canvas object.
         */

    }, {
        key: "setZoom",
        value: function setZoom(zoom) {
            var lastImageSize = this._image.getSize();
            this._image.setZoom(zoom);
            var imageSize = this._image.getSize();
            var x = this._lastPoint.x - (imageSize.width - lastImageSize.width) / 2;
            var y = this._lastPoint.y - (imageSize.height - lastImageSize.height) / 2;
            this._drawImage(new (_get__("Point"))(x, y));
            return this;
        }

        /**
         * Callback function which fires after canvas drawing
         *
         * @param {Function} callback - Callback.
         */

    }, {
        key: "onChange",
        value: function onChange(callback) {
            this._onChangeCallback = callback;
        }

        /**
         *  Get Frame origin and size relative to an Image.
         *
         * @returns {{origin: {x: Number, y: Number}, size: {width: Number, height: Number}}}
         */

    }, {
        key: "getData",
        value: function getData() {
            var originX = (this._frame.getMinX() - this._basePoint.x) / this._image.getScale();
            var originY = (this._frame.getMinY() - this._basePoint.y) / this._image.getScale();
            var frameWidth = this._frame.getRect().size.width / this._image.getScale();
            var frameHeight = this._frame.getRect().size.width / this._image.getScale();
            return {
                origin: {
                    x: originX,
                    y: originY
                },
                size: {
                    width: frameWidth,
                    height: frameHeight
                }
            };
        }

        /**
         * Set a Frame origin and size relative to an Image.
         *
         * @param {Object} data - A frame origin (top, left) point and frame size.
         * @returns {Object} - A frame origin point and zoom value.
         */

    }, {
        key: "setData",
        value: function setData(data) {
            var expectedScale = this._frame.getRect().size.width / data.size.width;
            var zoom = (expectedScale - this._image.getOriginScale()) / this._image.getOriginScale();
            this.setZoom(zoom);

            var x = this._frame.getMinX() - data.origin.x * this._image.getScale();
            var y = this._frame.getMinY() - data.origin.y * this._image.getScale();
            var point = new (_get__("Point"))(x, y);
            this._resetPoints();
            this._drawImage(point);

            return {
                origin: point,
                zoom: zoom
            };
        }

        /**
         * Set points to zero
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "_resetPoints",
        value: function _resetPoints() {
            this._lastPoint = new (_get__("Point"))(0, 0);
            this._basePoint = new (_get__("Point"))(0, 0);
            return this;
        }

        /**
         * Calculate and get origin Point for centered image (x-axis, y-axis)
         *
         * @return {Point} A Point.
         */

    }, {
        key: "_centerImagePoint",
        value: function _centerImagePoint() {
            var x = this._frame.getMidX() - this._image.getSize().width / 2;
            var y = this._frame.getMidY() - this._image.getSize().height / 2;
            return new (_get__("Point"))(x, y);
        }

        /**
         * Calculate and get origin Point for centered image (x-axis, y-axis)
         *
         * @param {Point} point - Point to validate
         * @return {Point} A Point.
         */

    }, {
        key: "_validatePoint",
        value: function _validatePoint(point) {
            var validPoint = point;

            if (this._image.getSize().width < this._frame.getRect().size.width) {
                validPoint.x = this._centerImagePoint().x;
            } else if (point.x > this._frame.getMinX()) {
                validPoint.x = this._frame.getMinX();
            } else if (point.x + this._image.getSize().width < this._frame.getMaxX()) {
                validPoint.x = this._frame.getMaxX() - this._image.getSize().width;
            } else {
                validPoint.x = point.x;
            }

            if (this._image.getSize().height < this._frame.getRect().size.height) {
                validPoint.y = this._centerImagePoint().y;
            } else if (point.y > this._frame.getMinY()) {
                validPoint.y = this._frame.getMinY();
            } else if (point.y + this._image.getSize().height < this._frame.getMaxY()) {
                validPoint.y = this._frame.getMaxY() - this._image.getSize().height;
            } else {
                validPoint.y = point.y;
            }

            return validPoint;
        }

        /**
         * Draw an Image on canvas, clear canvas context before, draw a background pattern and frame
         *
         * @param {Point} point - An origin point
         * @return {Canvas} A Canvas object. 
         */

    }, {
        key: "_drawImage",
        value: function _drawImage() {
            var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new (_get__("Point"))(0, 0);

            this.clear();
            this._drawBackground();

            var baseX = this._basePoint.x + (point.x - this._lastPoint.x);
            var baseY = this._basePoint.y + (point.y - this._lastPoint.y);

            this._basePoint = this._validatePoint(new (_get__("Point"))(baseX, baseY));
            this._lastPoint = point;

            this._context.drawImage(this._image.getNode(), this._basePoint.x, this._basePoint.y, this._image.getSize().width, this._image.getSize().height);
            this._cutout.draw();
            this._onChangeCallback(this);
            return this;
        }

        /**
         * Draw pattern canvas on the Main canvas as background
         *
         * @return {Canvas} A Canvas object.
         */

    }, {
        key: "_drawBackground",
        value: function _drawBackground() {
            var pattern = this._context.createPattern(this._pattern.getNode(), "repeat");
            this._context.rect(0, 0, this.getNode().width, this.getNode().height);
            this._context.fillStyle(pattern);
            this._context.fill();
            return this;
        }
    }]);

    return Canvas;
}(_get__("Element"));

exports.default = Canvas;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "Context":
            return _context2.default;

        case "Image":
            return _image2.default;

        case "Pattern":
            return _pattern2.default;

        case "Frame":
            return _frame2.default;

        case "Cutout":
            return _cutout2.default;

        case "Generator":
            return _generator2.default;

        case "MoveEventListener":
            return _move2.default;

        case "Point":
            return _point2.default;

        case "Element":
            return _element2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Canvas === "undefined" ? "undefined" : _typeof(Canvas);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Canvas, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Canvas)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(canvas);
var canvas_1 = canvas.__RewireAPI__;
var canvas_2 = canvas.__ResetDependency__;
var canvas_3 = canvas.__set__;
var canvas_4 = canvas.__Rewire__;
var canvas_5 = canvas.__GetDependency__;
var canvas_6 = canvas.__get__;

var slider = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _element2 = _interopRequireDefault(element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a Slider
 */
var Slider = function (_get__2) {
  _inherits(Slider, _get__2);

  /**
   * Create a slider.
   */
  function Slider() {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, "input"));

    _this.setType("range");
    _this.addClass("slider");
    _this.setAttribute("min", 0);
    _this.setAttribute("max", 100);
    _this.setAttribute("value", 0);

    _this._onChangeCallback = function () {};
    _this._onChangeHandler = _this._onChange.bind(_this);
    return _this;
  }

  /**
   * Callback function, which be fired after changing the value
   *
   * @param {Function} callback - Callback.
   * @returns {Slider} - A Slider object.
   */


  _createClass(Slider, [{
    key: "onChange",
    value: function onChange(callback) {
      this._onChangeCallback = callback;
      this.getNode().addEventListener("change", this._onChangeHandler, false);
      this.getNode().addEventListener("input", this._onChangeHandler, false);
      return this;
    }

    /**
     * Sets a value
     *
     * @param {Number} value - A value from 0 to 100
     * @returns {Slider} - A Slider object.
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      this.getNode().value = value;
      return this;
    }

    /**
     * Fires custom callback.
     */

  }, {
    key: "_onChange",
    value: function _onChange() {
      this._onChangeCallback(Number(this.getNode().value));
    }
  }]);

  return Slider;
}(_get__("Element"));

exports.default = Slider;

function _getGlobalObject() {
  try {
    if (!!commonjsGlobal) {
      return commonjsGlobal;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();

  var registry = _getRewireRegistry__();

  var rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case "Element":
      return _element2.default;
  }

  return undefined;
}

function _set__(variableName, value) {
  var rewireData = _getRewiredData__();

  if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  var rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }
}

function _with__(object) {
  var rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport = typeof Slider === "undefined" ? "undefined" : _typeof(Slider);

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(Slider, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Slider)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(slider);
var slider_1 = slider.__RewireAPI__;
var slider_2 = slider.__ResetDependency__;
var slider_3 = slider.__set__;
var slider_4 = slider.__Rewire__;
var slider_5 = slider.__GetDependency__;
var slider_6 = slider.__get__;

var icon = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var _element2 = _interopRequireDefault(element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing an Icon element
 */
var Icon = function (_get__2) {
  _inherits(Icon, _get__2);

  /**
   * Create an Icon element.
   *
   * @param {String} name - An Icon name.
   */
  function Icon(name) {
    _classCallCheck(this, Icon);

    var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, "svg"));

    _this.setAttribute("class", "icon icon-" + name);
    _this._use = new (_get__("Element"))("use");
    _this._use.getNode().setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#icon-" + name);
    _this._use.render(_this.getNode());
    return _this;
  }

  return Icon;
}(_get__("Element"));

exports.default = Icon;

function _getGlobalObject() {
  try {
    if (!!commonjsGlobal) {
      return commonjsGlobal;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();

  var registry = _getRewireRegistry__();

  var rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case "Element":
      return _element2.default;
  }

  return undefined;
}

function _set__(variableName, value) {
  var rewireData = _getRewiredData__();

  if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  var rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }
}

function _with__(object) {
  var rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport = typeof Icon === "undefined" ? "undefined" : _typeof(Icon);

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(Icon, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Icon)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

unwrapExports(icon);
var icon_1 = icon.__RewireAPI__;
var icon_2 = icon.__ResetDependency__;
var icon_3 = icon.__set__;
var icon_4 = icon.__Rewire__;
var icon_5 = icon.__GetDependency__;
var icon_6 = icon.__get__;

var main = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _node2 = _interopRequireDefault(node);



var _config2 = _interopRequireDefault(config);



var _dimension2 = _interopRequireDefault(dimension);



var _callback2 = _interopRequireDefault(callback);





var _canvas2 = _interopRequireDefault(canvas);



var _image2 = _interopRequireDefault(image);



var _slider2 = _interopRequireDefault(slider);



var _element2 = _interopRequireDefault(element);



var _icon2 = _interopRequireDefault(icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing Image Crop
 */
var Cropper = function () {
    /**
     * Create an Cropper.
     *
     * @param {Object} config - The config for Image Crop
     */
    function Cropper() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Cropper);

        _get__("validateConfig")(config);

        this._canvas = new (_get__("Canvas"))();
        this._image = new (_get__("Image"))();
        this._slider = new (_get__("Slider"))();

        this.setWidth(config.width || _get__("defaultDimensions").width);
        this.setHeight(config.height || _get__("defaultDimensions").height);

        this._onInitCallback = _get__("validateCallback")(config.onInit);
        this._onChangeCallback = _get__("validateCallback")(config.onChange);
    }

    /**
     * Create Image Crop container at the end of the list of children of a specified parent node
     *
     * @param {Object} node - The DOM Element object, parent node
     * @return {Cropper} An Cropper object.
     */


    _createClass(Cropper, [{
        key: "render",
        value: function render(node) {
            var _this = this;

            this._node = _get__("validateNode")(node);

            var wrapper = new (_get__("Element"))();
            wrapper.addClass("cropper");
            wrapper.render(this._node);
            this._canvas.render(wrapper.getNode());

            var tools = new (_get__("Element"))();
            tools.addClass("cropper-tools");
            tools.render(wrapper.getNode());

            var zoomSlider = new (_get__("Element"))();
            zoomSlider.addClass("cropper-zoom");
            zoomSlider.render(tools.getNode());

            var leftIcon = new (_get__("Icon"))("frame-landscape");
            var rightIcon = new (_get__("Icon"))("frame-landscape");

            leftIcon.render(zoomSlider.getNode());

            this._slider.render(zoomSlider.getNode());
            this._slider.onChange(function (value) {
                _this._canvas.setZoom(value / 100);
            });

            rightIcon.render(zoomSlider.getNode());

            this._onInitCallback(this);

            this._canvas.onChange(function () {
                _this._onChangeCallback(_this);
            });

            return this;
        }

        /**
         * Change width of Cropper container
         *
         * @param {Number} width - The number of pixels.
         * @return {Cropper} An Cropper object.
         */

    }, {
        key: "setWidth",
        value: function setWidth(width) {
            try {
                _get__("validateDimension")(width);
            } catch (error) {
                throw Error("Width property: " + error.message);
            }
            this._canvas.setWidth(width);
            this._canvas.redraw();
            return this;
        }

        /**
         * Change height of Cropper container
         *
         * @param {Number} height - The number of pixels.
         * @return {Cropper} An Cropper object.
         */

    }, {
        key: "setHeight",
        value: function setHeight(height) {
            try {
                _get__("validateDimension")(height);
            } catch (error) {
                throw Error("Height property: " + error.message);
            }
            this._canvas.setHeight(height);
            this._canvas.redraw();
            return this;
        }

        /**
         * Load an image and draw canvas
         *
         * @param {String} url - Url or path to image
         * @return {Promise} A promise that returns {@link loadImage~resolve} if resolved and {@link loadImage~reject} if rejected.
         */

    }, {
        key: "loadImage",
        value: function loadImage(url) {
            var _this2 = this;

            if (!url) {
                throw Error("Image url or path is not passed.");
            }

            if (typeof url !== "string") {
                throw Error("Invalid url or path.");
            }

            return this._image.load(url).then(function (image) {
                _this2._canvas.setImage(image);
                _this2._canvas.draw();
                _this2._slider.setValue(0);
                return _this2;
            });
        }

        /**
         * Generates and returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
         * The returned image is in a resolution of 96 dpi.
         *
         * @return {String} - A data URI.
         */

    }, {
        key: "getCroppedImage",
        value: function getCroppedImage() {
            return this._canvas.toDataURL();
        }

        /**
         * Sets zoom.
         *
         * @param {Number} zoom - Zoom value, from `0` = 0%, `1.0` = 100% of image size
         * @return {Cropper} An Cropper object.
         */

    }, {
        key: "setZoom",
        value: function setZoom(zoom) {
            try {
                _get__("validateDimension")(zoom);
            } catch (error) {
                throw Error("Zoom property: " + error.message);
            }
            this._canvas.setZoom(zoom);
            this._slider.setValue(zoom * 100);
            return this;
        }
    }, {
        key: "reset",
        value: function reset() {
            this.setZoom(0);
            this._canvas.redraw();
            return this;
        }

        /**
         * Get Frame origin and size relative to an Image.
         *
         * @returns {{origin: {x: Number, y: Number}, size: {width: Number, height: Number}}}
         */

    }, {
        key: "getData",
        value: function getData() {
            return this._canvas.getData();
        }

        /**
         * Set a Frame origin and size relative to an Image.
         *
         * @param {Object} data - A frame origin (top, left) point and frame size.
         * @returns {Cropper} - An Cropper instance.
         */

    }, {
        key: "setData",
        value: function setData(data) {
            var _canvas$setData = this._canvas.setData(data),
                zoom = _canvas$setData.zoom;

            this._slider.setValue(zoom * 100);
            return this;
        }
    }]);

    return Cropper;
}();

exports.default = Cropper;

function _getGlobalObject() {
    try {
        if (!!commonjsGlobal) {
            return commonjsGlobal;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = Object.create(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case "validateConfig":
            return _config2.default;

        case "Canvas":
            return _canvas2.default;

        case "Image":
            return _image2.default;

        case "Slider":
            return _slider2.default;

        case "defaultDimensions":
            return _default.defaultDimensions;

        case "validateCallback":
            return _callback2.default;

        case "validateNode":
            return _node2.default;

        case "Element":
            return _element2.default;

        case "Icon":
            return _icon2.default;

        case "validateDimension":
            return _dimension2.default;
    }

    return undefined;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === "undefined" ? "undefined" : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if (Object.keys(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof Cropper === "undefined" ? "undefined" : _typeof(Cropper);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(Cropper, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Cropper)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
});

var index = unwrapExports(main);
var main_1 = main.__RewireAPI__;
var main_2 = main.__ResetDependency__;
var main_3 = main.__set__;
var main_4 = main.__Rewire__;
var main_5 = main.__GetDependency__;
var main_6 = main.__get__;

export default index;
export { main_5 as __GetDependency__, main_2 as __ResetDependency__, main_1 as __RewireAPI__, main_4 as __Rewire__, main_6 as __get__, main_3 as __set__ };
