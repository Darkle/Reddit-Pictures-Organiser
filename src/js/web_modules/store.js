import { c as createCommonjsModule, u as unwrapExports, a as commonjsGlobal } from './common/_commonjsHelpers-93820a20.js';

var dist = createCommonjsModule(function (module, exports) {
/* PLAIN OBJECT IS EMPTY */
Object.defineProperty(exports, "__esModule", { value: true });
function isEmpty(x) {
    for (var key in x)
        return false;
    return true;
}
/* EXPORT */
exports.default = isEmpty;
});

unwrapExports(dist);

var consts = createCommonjsModule(function (module, exports) {
/* CACHES */
Object.defineProperty(exports, "__esModule", { value: true });
const PROXY_CACHE = {}; //FIXME: This looks like a potential memory leak source, symbols and associated maps are never garbage collected if the watched objects get garbage collected without being disposed of first
exports.PROXY_CACHE = PROXY_CACHE;
/* SYMBOLS */
const $TARGET = Symbol('Proxy -> Target');
exports.$TARGET = $TARGET;
const $STOP = Symbol('Stop proxying');
exports.$STOP = $STOP;
const $GET_RECORD_START = Symbol('Start recording get paths');
exports.$GET_RECORD_START = $GET_RECORD_START;
const $GET_RECORD_STOP = Symbol('Stop recording get paths');
exports.$GET_RECORD_STOP = $GET_RECORD_STOP;
/* CONSTRUCTORS */
const CONSTRUCTORS_IMMUTABLE = new Set([
    ArrayBuffer,
    Boolean,
    Error,
    Number,
    RegExp,
    String,
    Symbol
]);
exports.CONSTRUCTORS_IMMUTABLE = CONSTRUCTORS_IMMUTABLE;
const CONSTRUCTORS_MUTABLE = new Set([
    Date,
    Map,
    Set,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
]);
exports.CONSTRUCTORS_MUTABLE = CONSTRUCTORS_MUTABLE;
const CONSTRUCTORS_TYPED_ARRAY = new Set([
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
]);
exports.CONSTRUCTORS_TYPED_ARRAY = CONSTRUCTORS_TYPED_ARRAY;
const CONSTRUCTORS_UNSUPPORTED = new Set([
    Promise,
    WeakMap,
    WeakSet
]);
exports.CONSTRUCTORS_UNSUPPORTED = CONSTRUCTORS_UNSUPPORTED;
if (typeof BigInt === 'function') {
    CONSTRUCTORS_IMMUTABLE.add(BigInt);
    if (typeof BigInt64Array === 'function') {
        CONSTRUCTORS_MUTABLE.add(BigInt64Array);
        CONSTRUCTORS_TYPED_ARRAY.add(BigInt64Array);
    }
    if (typeof BigUint64Array === 'function') {
        CONSTRUCTORS_MUTABLE.add(BigUint64Array);
        CONSTRUCTORS_TYPED_ARRAY.add(BigUint64Array);
    }
}
/* METHODS */ // We are assuming the following methods don't get messed up with, and custom methods with the same name that are mutating are not defined
const STRICTLY_IMMUTABLE_METHODS = new Set([
    /* OBJECT */
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf',
    /* ARRAY */
    'includes',
    'indexOf',
    'join',
    'lastIndexOf',
    'toLocaleString',
    'toString',
    /* MAP & SET */
    'has',
    /* DATE */
    'getDate',
    'getDay',
    'getFullYear',
    'getHours',
    'getMilliseconds',
    'getMinutes',
    'getMonth',
    'getSeconds',
    'getTime',
    'getTime',
    'getTimezoneOffset',
    'getUTCDate',
    'getUTCDay',
    'getUTCFullYear',
    'getUTCHours',
    'getUTCMilliseconds',
    'getUTCMinutes',
    'getUTCMonth',
    'getUTCSeconds',
    'getYear',
    /* REGEX */
    'exec',
    'test',
    /* TYPED ARRAY */
    'subarray'
]);
exports.STRICTLY_IMMUTABLE_METHODS = STRICTLY_IMMUTABLE_METHODS;
const LOOSELY_IMMUTABLE_METHODS = {
    array: new Set([
        'concat',
        'entries',
        'every',
        'filter',
        'find',
        'findIndex',
        'forEach',
        'keys',
        'map',
        'reduce',
        'reduceRight',
        'slice',
        'some',
        'values'
    ]),
    others: new Set([
        /* MAP & SET */
        'entries',
        'forEach',
        'get',
        'keys',
        'values'
    ])
};
exports.LOOSELY_IMMUTABLE_METHODS = LOOSELY_IMMUTABLE_METHODS;
});

unwrapExports(consts);
var consts_1 = consts.PROXY_CACHE;
var consts_2 = consts.$TARGET;
var consts_3 = consts.$STOP;
var consts_4 = consts.$GET_RECORD_START;
var consts_5 = consts.$GET_RECORD_STOP;
var consts_6 = consts.CONSTRUCTORS_IMMUTABLE;
var consts_7 = consts.CONSTRUCTORS_MUTABLE;
var consts_8 = consts.CONSTRUCTORS_TYPED_ARRAY;
var consts_9 = consts.CONSTRUCTORS_UNSUPPORTED;
var consts_10 = consts.STRICTLY_IMMUTABLE_METHODS;
var consts_11 = consts.LOOSELY_IMMUTABLE_METHODS;

var target_1 = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });

/* TARGET */
function target(object) {
    return object && (object[consts.$TARGET] || object);
}
/* EXPORT */
exports.default = target;
});

unwrapExports(target_1);

var toString = Object.prototype.toString;

var kindOf = function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  var type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weakmap';
    case 'WeakSet': return 'weakset';
    case 'Map': return 'map';
    case 'Set': return 'set';

    // 8-bit typed arrays
    case 'Int8Array': return 'int8array';
    case 'Uint8Array': return 'uint8array';
    case 'Uint8ClampedArray': return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array': return 'int16array';
    case 'Uint16Array': return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array': return 'int32array';
    case 'Uint32Array': return 'uint32array';
    case 'Float32Array': return 'float32array';
    case 'Float64Array': return 'float64array';
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString.call(val);
  switch (type) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'mapiterator';
    case '[object Set Iterator]': return 'setiterator';
    case '[object String Iterator]': return 'stringiterator';
    case '[object Array Iterator]': return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

function isError(val) {
  return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function'
    && typeof val.getDate === 'function'
    && typeof val.setDate === 'function';
}

function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string'
    && typeof val.ignoreCase === 'boolean'
    && typeof val.multiline === 'boolean'
    && typeof val.global === 'boolean';
}

function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}

function isGeneratorObj(val) {
  return typeof val.throw === 'function'
    && typeof val.return === 'function'
    && typeof val.next === 'function';
}

function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}

const valueOf = Symbol.prototype.valueOf;


function clone(val, deep) {
  switch (kindOf(val)) {
    case 'array':
      return val.slice();
    case 'object':
      return Object.assign({}, val);
    case 'date':
      return new val.constructor(Number(val));
    case 'map':
      return new Map(val);
    case 'set':
      return new Set(val);
    case 'buffer':
      return cloneBuffer(val);
    case 'symbol':
      return cloneSymbol(val);
    case 'arraybuffer':
      return cloneArrayBuffer(val);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(val);
    case 'regexp':
      return cloneRegExp(val);
    case 'error':
      return Object.create(val);
    default: {
      return val;
    }
  }
}

function cloneRegExp(val) {
  const flags = val.flags !== void 0 ? val.flags : (/\w+$/.exec(val) || void 0);
  const re = new val.constructor(val.source, flags);
  re.lastIndex = val.lastIndex;
  return re;
}

function cloneArrayBuffer(val) {
  const res = new val.constructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));
  return res;
}

function cloneTypedArray(val, deep) {
  return new val.constructor(val.buffer, val.byteOffset, val.length);
}

function cloneBuffer(val) {
  const len = val.length;
  const buf = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
  val.copy(buf);
  return buf;
}

function cloneSymbol(val) {
  return valueOf ? Object(valueOf.call(val)) : {};
}

/**
 * Expose `clone`
 */

var shallowClone = clone;

var es6 = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

var isPrimitive = function isPrimitive(val) {
  if (typeof val === 'object') {
    return val === null;
  }
  return typeof val !== 'function';
};

var utils = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });




/* UTILS */
const Utils = {
    isEqual: (x, y) => {
        return (isPrimitive(x) || isPrimitive(y) || consts.CONSTRUCTORS_UNSUPPORTED.has(x.constructor) || consts.CONSTRUCTORS_UNSUPPORTED.has(y.constructor)) ? Object.is(x, y) : es6(x, y); //FIXME: https://github.com/epoberezkin/fast-deep-equal/issues/53
    },
    clone: (x) => {
        if (isPrimitive(x))
            return x;
        if (x instanceof Map) {
            const y = new Map();
            for (const [key, value] of x)
                y.set(shallowClone(key), shallowClone(value));
            return y; //TSC
        }
        if (x instanceof Set) {
            const y = new Set();
            for (const value of x)
                y.add(shallowClone(value));
            return y; //TSC
        }
        if (Utils.isTypedArray(x))
            return x.slice(); //TSC
        return shallowClone(x);
    },
    isFunction: (x) => {
        return typeof x === 'function';
    },
    isSymbol: (x) => {
        return typeof x === 'symbol';
    },
    isTypedArray: (x) => {
        return !isPrimitive(x) && consts.CONSTRUCTORS_TYPED_ARRAY.has(x.constructor);
    },
    isBuiltinUnsupported: (x) => {
        return !isPrimitive(x) && consts.CONSTRUCTORS_UNSUPPORTED.has(x.constructor);
    },
    isBuiltinWithoutMutableMethods: (x) => {
        return isPrimitive(x) || consts.CONSTRUCTORS_IMMUTABLE.has(x.constructor);
    },
    isBuiltinWithMutableMethods: (x) => {
        return !isPrimitive(x) && consts.CONSTRUCTORS_MUTABLE.has(x.constructor);
    },
    isStrictlyImmutableMethod: (method) => {
        return consts.STRICTLY_IMMUTABLE_METHODS.has(method.name);
    },
    isLooselyImmutableArrayMethod: (method) => {
        return consts.LOOSELY_IMMUTABLE_METHODS.array.has(method.name);
    }
};
/* EXPORT */
exports.default = Utils;
});

unwrapExports(utils);

var make_traps = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });




/* MAKE TRAPS */
function makeTraps(callback, $PROXY) {
    /* VARIABLES */
    let stopped = false, changed = false, changedPaths = [], getPathsRecording = false, getPaths = [], paths = new WeakMap();
    /* HELPERS */
    function triggerChange(result, path) {
        changed = true;
        changedPaths.push(path);
        return result;
    }
    function getParentPath(parent) {
        return paths.get(parent) || '';
    }
    function getChildPath(parent, path) {
        const parentPath = getParentPath(parent), childPath = parentPath ? `${parentPath}.${path}` : `${path}`;
        return childPath;
    }
    function setChildPath(parent, child, path) {
        paths.set(child, getChildPath(parent, path));
    }
    function wrapTrap(trap) {
        let depth = 0;
        return function trapWrapper() {
            depth++;
            const result = trap.apply(undefined, arguments);
            depth--;
            if (changed && !depth && !stopped) {
                const paths = changedPaths;
                changed = false;
                changedPaths = [];
                callback(paths);
            }
            return result;
        };
    }
    /* TRAPS */
    const traps = {
        get: wrapTrap((target, property, receiver) => {
            if (property === 'constructor')
                return target.constructor;
            if (property === consts.$TARGET)
                return target;
            if (property === consts.$STOP) {
                stopped = true;
                changedPaths = undefined; //TSC
                paths = undefined; //TSC
                delete consts.PROXY_CACHE[$PROXY];
                return target;
            }
            if (property === consts.$GET_RECORD_START)
                return getPathsRecording = true;
            if (property === consts.$GET_RECORD_STOP) {
                const paths = getPaths;
                getPathsRecording = false;
                getPaths = [];
                return paths;
            }
            if (utils.default.isBuiltinWithMutableMethods(receiver))
                receiver = receiver[consts.$TARGET];
            if (getPathsRecording && !getParentPath(target))
                getPaths.push(property); // We are only recording root paths, because I don't see a use case for recording deeper paths too
            const value = Reflect.get(target, property, receiver);
            if (utils.default.isBuiltinWithoutMutableMethods(value))
                return value;
            const descriptor = Reflect.getOwnPropertyDescriptor(target, property);
            if (descriptor && !descriptor.configurable && !descriptor.writable)
                return value; // Preserving invariants
            if (stopped || utils.default.isSymbol(property) || utils.default.isBuiltinUnsupported(value))
                return value;
            if (utils.default.isFunction(value) && utils.default.isStrictlyImmutableMethod(value))
                return value.bind(target); //FIXME: Binding here prevents the function to be potentially re-bounded later
            setChildPath(target, value, property);
            return make_proxy.default(value, callback, $PROXY, traps);
        }),
        set: wrapTrap((target, property, value, receiver) => {
            value = target_1.default(value);
            if (stopped || utils.default.isSymbol(property))
                return Reflect.set(target, property, value);
            if (utils.default.isBuiltinWithMutableMethods(receiver))
                receiver = receiver[consts.$TARGET];
            const isValueUndefined = (value === undefined), didPropertyExist = isValueUndefined && Reflect.has(target, property), prev = Reflect.get(target, property, receiver), result = Reflect.set(target, property, value), changed = result && ((isValueUndefined && !didPropertyExist) || !utils.default.isEqual(target_1.default(prev), value));
            return changed ? triggerChange(result, getChildPath(target, property)) : result;
        }),
        defineProperty: wrapTrap((target, property, descriptor) => {
            if (stopped || utils.default.isSymbol(property))
                return Reflect.defineProperty(target, property, descriptor);
            const prev = Reflect.getOwnPropertyDescriptor(target, property), changed = Reflect.defineProperty(target, property, descriptor);
            if (changed) {
                const next = Object.assign({ configurable: false, enumerable: false, writable: false }, descriptor); // Accounting for defaults
                if (utils.default.isEqual(prev, next))
                    return true;
            }
            return changed ? triggerChange(changed, getChildPath(target, property)) : changed;
        }),
        deleteProperty: wrapTrap((target, property) => {
            if (!Reflect.has(target, property))
                return true;
            const changed = Reflect.deleteProperty(target, property);
            if (stopped || utils.default.isSymbol(property))
                return changed;
            return changed ? triggerChange(changed, getChildPath(target, property)) : changed;
        }),
        apply: wrapTrap((target, thisArg, args) => {
            const isArray = Array.isArray(thisArg);
            if (!isArray)
                thisArg = thisArg[consts.$TARGET];
            if (stopped || (isArray && utils.default.isLooselyImmutableArrayMethod(target)))
                return Reflect.apply(target, thisArg, args);
            const thisArgTarget = (isArray ? thisArg[consts.$TARGET] : thisArg), clone = utils.default.clone(thisArgTarget), result = Reflect.apply(target, thisArg, args), changed = !utils.default.isEqual(clone, thisArgTarget);
            return changed ? triggerChange(result, getParentPath(thisArgTarget)) : result;
        })
    };
    return traps;
}
/* EXPORT */
exports.default = makeTraps;
});

unwrapExports(make_traps);

var make_proxy = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });


/* MAKE PROXY */
//TODO: Maybe use revocable Proxies, will the target object remain usable?
function makeProxy(object, callback, $PROXY, traps) {
    if ($PROXY) {
        const proxy = consts.PROXY_CACHE[$PROXY].get(object);
        if (proxy)
            return proxy;
    }
    else {
        $PROXY = Symbol('Target -> Proxy');
        consts.PROXY_CACHE[$PROXY] = new WeakMap();
    }
    traps = traps || make_traps.default(callback, $PROXY);
    const proxy = new Proxy(object, traps);
    consts.PROXY_CACHE[$PROXY].set(object, proxy);
    return proxy;
}
/* EXPORT */
exports.default = makeProxy;
});

unwrapExports(make_proxy);

var unwatch_1 = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });

/* UNWATCH */
function unwatch(object) {
    if (object == null)
        return object;
    return object[consts.$STOP] || object;
}
/* EXPORT */
exports.default = unwatch;
});

unwrapExports(unwatch_1);

var watch_1 = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });



/* WATCH */
function watch(object, callback) {
    if (utils.default.isBuiltinWithoutMutableMethods(object))
        return [object, () => object];
    const proxy = make_proxy.default(object, callback), disposer = () => unwatch_1.default(proxy);
    return [proxy, disposer];
}
/* EXPORT */
exports.default = watch;
});

unwrapExports(watch_1);

var record_1 = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });

/* RECORD */
function record(proxy, fn) {
    proxy[consts.$GET_RECORD_START];
    fn(proxy);
    return proxy[consts.$GET_RECORD_STOP];
}
/* EXPORT */
exports.default = record;
});

unwrapExports(record_1);

var dist$1 = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });

exports.watch = watch_1.default;

exports.unwatch = unwatch_1.default;

exports.record = record_1.default;

exports.target = target_1.default;
});

unwrapExports(dist$1);
var dist_1 = dist$1.watch;
var dist_2 = dist$1.unwatch;
var dist_3 = dist$1.record;
var dist_4 = dist$1.target;

var lib = (typeof self === 'object' && self.self === self && self) ||
  (typeof commonjsGlobal === 'object' && commonjsGlobal.global === commonjsGlobal && commonjsGlobal) ||
  commonjsGlobal;

var changes_subscribers = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
/* CHANGES SUBSCRIBERS */
const ChangesSubscribers = {
    /* VARIABLES */
    subscribers: new WeakMap(),
    /* API */
    get: (store) => {
        const subscriber = ChangesSubscribers.subscribers.get(store);
        if (!subscriber)
            throw new Error('Store not found, it either got garbage-collected (you must keep a reference to it) or you are passing "store" a non-proxied store somewhere');
        return subscriber;
    },
    set: (store, subscriber) => {
        ChangesSubscribers.subscribers.set(store, subscriber);
    }
};
/* EXPORT */
exports.default = ChangesSubscribers;

});

unwrapExports(changes_subscribers);

var consts$1 = createCommonjsModule(function (module, exports) {
/* CONSTS */
Object.defineProperty(exports, "__esModule", { value: true });
const EMPTY_ARRAY = [];
exports.EMPTY_ARRAY = EMPTY_ARRAY;
const IDENTITY = x => x;
exports.IDENTITY = IDENTITY;
const NOOP = () => { };
exports.NOOP = NOOP;

});

unwrapExports(consts$1);
var consts_1$1 = consts$1.EMPTY_ARRAY;
var consts_2$1 = consts$1.IDENTITY;
var consts_3$1 = consts$1.NOOP;

var scheduler = createCommonjsModule(function (module, exports) {
/* SCHEDULER */
Object.defineProperty(exports, "__esModule", { value: true });
const Scheduler = {
    /* VARIABLES */
    queue: new Set(),
    triggering: false,
    triggerTimeoutId: -1,
    /* API */
    schedule: (fn) => {
        if (fn)
            Scheduler.queue.add(fn);
        if (Scheduler.triggerTimeoutId !== -1)
            return;
        Scheduler.triggerTimeoutId = setTimeout(Scheduler.trigger);
    },
    unschedule: (fn) => {
        if (fn)
            Scheduler.queue.delete(fn);
        if (Scheduler.triggerTimeoutId === -1)
            return;
        clearTimeout(Scheduler.triggerTimeoutId);
        Scheduler.triggerTimeoutId = -1;
    },
    batch: (fn) => {
        fn();
    },
    trigger: () => {
        Scheduler.unschedule();
        if (Scheduler.triggering)
            return Scheduler.schedule();
        Scheduler.triggering = true;
        const fns = Scheduler.queue.values();
        Scheduler.queue = new Set();
        Scheduler.batch(() => {
            for (const fn of fns)
                fn();
        });
        Scheduler.triggering = false;
    }
};
/* EXPORT */
exports.default = Scheduler;

});

unwrapExports(scheduler);

var subscriber = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });


/* SUBSCRIBER */
class Subscriber {
    /* CONSTRUCTOR */
    constructor() {
        /* VARIABLES */
        this.args = undefined;
        this.listeners = [];
        this._trigger = this.trigger.bind(this);
    }
    /* API */
    subscribe(listener) {
        if (this.listeners.indexOf(listener) >= 0)
            return consts$1.NOOP;
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    schedule(...args) {
        return scheduler.default.schedule(this._trigger);
    }
    trigger(...args) {
        const listenerArgs = args.length ? args : this.args || args;
        this.listeners.forEach(listener => {
            listener.apply(undefined, listenerArgs);
        });
    }
}
/* EXPORT */
exports.default = Subscriber;

});

unwrapExports(subscriber);

var hooks = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });

/* HOOKS */
const Hooks = {
    store: {
        change: new subscriber.default(),
        new: new subscriber.default()
    }
};
/* EXPORT */
exports.default = Hooks;

});

unwrapExports(hooks);

var utils$1 = createCommonjsModule(function (module, exports) {
/* UTILS */
Object.defineProperty(exports, "__esModule", { value: true });
const Utils = {
    uniq: (arr) => {
        return arr.filter((ele, index, eles) => eles.indexOf(ele) === index);
    },
    log: {
        group: (title, collapsed = true, fn) => {
            collapsed ? console.groupCollapsed(title) : console.group(title);
            fn();
            console.groupEnd();
        }
    }
};
/* EXPORT */
exports.default = Utils;

});

unwrapExports(utils$1);

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return isobject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

var isPlainObject = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

/**
 * Module dependenices
 */





function cloneDeep(val, instanceClone) {
  switch (kindOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default: {
      return shallowClone(val);
    }
  }
}

function cloneObjectDeep(val, instanceClone) {
  if (typeof instanceClone === 'function') {
    return instanceClone(val);
  }
  if (instanceClone || isPlainObject(val)) {
    const res = new val.constructor();
    for (let key in val) {
      res[key] = cloneDeep(val[key], instanceClone);
    }
    return res;
  }
  return val;
}

function cloneArrayDeep(val, instanceClone) {
  const res = new val.constructor(val.length);
  for (let i = 0; i < val.length; i++) {
    res[i] = cloneDeep(val[i], instanceClone);
  }
  return res;
}

/**
 * Expose `cloneDeep`
 */

var cloneDeep_1 = cloneDeep;

var utils$2 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(exports);
  }
})(commonjsGlobal, function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var isDate = exports.isDate = function isDate(d) {
    return d instanceof Date;
  };
  var isEmpty = exports.isEmpty = function isEmpty(o) {
    return Object.keys(o).length === 0;
  };
  var isObject = exports.isObject = function isObject(o) {
    return o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
  };
  var properObject = exports.properObject = function properObject(o) {
    return isObject(o) && !o.hasOwnProperty ? _extends({}, o) : o;
  };
});
});

unwrapExports(utils$2);

var diff = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils$2);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var diff = function diff(lhs, rhs) {
    if (lhs === rhs) return {}; // equal return no diff

    if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return rhs; // return updated rhs

    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);

    var deletedValues = Object.keys(l).reduce(function (acc, key) {
      return r.hasOwnProperty(key) ? acc : _extends({}, acc, _defineProperty({}, key, undefined));
    }, {});

    if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {
      if (l.valueOf() == r.valueOf()) return {};
      return r;
    }

    return Object.keys(r).reduce(function (acc, key) {
      if (!l.hasOwnProperty(key)) return _extends({}, acc, _defineProperty({}, key, r[key])); // return added r key

      var difference = diff(l[key], r[key]);

      if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference) && !(0, _utils.isDate)(difference)) return acc; // return no diff

      return _extends({}, acc, _defineProperty({}, key, difference)); // return updated key
    }, deletedValues);
  };

  exports.default = diff;
  module.exports = exports['default'];
});
});

unwrapExports(diff);

var added = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils$2);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var addedDiff = function addedDiff(lhs, rhs) {

    if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};

    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);

    return Object.keys(r).reduce(function (acc, key) {
      if (l.hasOwnProperty(key)) {
        var difference = addedDiff(l[key], r[key]);

        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;

        return _extends({}, acc, _defineProperty({}, key, difference));
      }

      return _extends({}, acc, _defineProperty({}, key, r[key]));
    }, {});
  };

  exports.default = addedDiff;
  module.exports = exports['default'];
});
});

unwrapExports(added);

var deleted = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils$2);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var deletedDiff = function deletedDiff(lhs, rhs) {
    if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};

    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);

    return Object.keys(l).reduce(function (acc, key) {
      if (r.hasOwnProperty(key)) {
        var difference = deletedDiff(l[key], r[key]);

        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;

        return _extends({}, acc, _defineProperty({}, key, difference));
      }

      return _extends({}, acc, _defineProperty({}, key, undefined));
    }, {});
  };

  exports.default = deletedDiff;
  module.exports = exports['default'];
});
});

unwrapExports(deleted);

var updated = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, utils$2);
  }
})(commonjsGlobal, function (module, exports, _utils) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var updatedDiff = function updatedDiff(lhs, rhs) {

    if (lhs === rhs) return {};

    if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return rhs;

    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);

    if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {
      if (l.valueOf() == r.valueOf()) return {};
      return r;
    }

    return Object.keys(r).reduce(function (acc, key) {

      if (l.hasOwnProperty(key)) {
        var difference = updatedDiff(l[key], r[key]);

        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference) && !(0, _utils.isDate)(difference)) return acc;

        return _extends({}, acc, _defineProperty({}, key, difference));
      }

      return acc;
    }, {});
  };

  exports.default = updatedDiff;
  module.exports = exports['default'];
});
});

unwrapExports(updated);

var detailed = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(module, exports, added, deleted, updated);
  }
})(commonjsGlobal, function (module, exports, _added, _deleted, _updated) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _added2 = _interopRequireDefault(_added);

  var _deleted2 = _interopRequireDefault(_deleted);

  var _updated2 = _interopRequireDefault(_updated);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var detailedDiff = function detailedDiff(lhs, rhs) {
    return {
      added: (0, _added2.default)(lhs, rhs),
      deleted: (0, _deleted2.default)(lhs, rhs),
      updated: (0, _updated2.default)(lhs, rhs)
    };
  };

  exports.default = detailedDiff;
  module.exports = exports['default'];
});
});

unwrapExports(detailed);

var dist$2 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  {
    factory(exports, diff, added, deleted, updated, detailed);
  }
})(commonjsGlobal, function (exports, _diff, _added, _deleted, _updated, _detailed) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.detailedDiff = exports.updatedDiff = exports.deletedDiff = exports.diff = exports.addedDiff = undefined;

  var _diff2 = _interopRequireDefault(_diff);

  var _added2 = _interopRequireDefault(_added);

  var _deleted2 = _interopRequireDefault(_deleted);

  var _updated2 = _interopRequireDefault(_updated);

  var _detailed2 = _interopRequireDefault(_detailed);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.addedDiff = _added2.default;
  exports.diff = _diff2.default;
  exports.deletedDiff = _deleted2.default;
  exports.updatedDiff = _updated2.default;
  exports.detailedDiff = _detailed2.default;
});
});

unwrapExports(dist$2);

var debug_1 = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });






/* DEBUG */
const defaultOptions = {
    collapsed: true,
    logStoresNew: false,
    logChangesDiff: true,
    logChangesFull: false
};
function debug(options = {}) {
    if (lib.STORE)
        return lib.STORE;
    options = Object.assign({}, debug.defaultOptions, options);
    const cloneDeep = cloneDeep_1;
    const STORE = lib.STORE = {
        stores: [],
        log: () => {
            STORE.stores.forEach(store => {
                console.log(cloneDeep(dist$1.target(store)));
            });
        }
    };
    hooks.default.store.new.subscribe(store => {
        STORE.stores.push(store);
        let storePrev = cloneDeep(dist$1.target(store));
        if (options.logStoresNew) {
            utils$1.default.log.group('Store - New', options.collapsed, () => {
                console.log(storePrev);
            });
        }
        if (options.logChangesFull || options.logChangesDiff) {
            const changes = changes_subscribers.default.get(store);
            changes.subscribe(() => {
                const storeNext = cloneDeep(dist$1.target(store));
                utils$1.default.log.group(`Store - Change - ${new Date().toISOString()}`, options.collapsed, () => {
                    if (options.logChangesDiff) {
                        const { detailedDiff } = dist$2, { added, updated, deleted } = detailedDiff(storePrev, storeNext);
                        if (!dist.default(added)) {
                            console.log('Added');
                            console.log(added);
                        }
                        if (!dist.default(updated)) {
                            console.log('Updated');
                            console.log(updated);
                        }
                        if (!dist.default(deleted)) {
                            console.log('Deleted');
                            console.log(deleted);
                        }
                    }
                    if (options.logChangesFull) {
                        console.log('New store');
                        console.log(storeNext);
                        console.log('Old store');
                        console.log(storePrev);
                    }
                });
                storePrev = storeNext;
            });
        }
    });
    return STORE;
}
debug.defaultOptions = defaultOptions;
/* EXPORT */
exports.default = debug;

});

unwrapExports(debug_1);

var changes_counters = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });

/* CHANGES COUNTERS */
const ChangesCounters = {
    /* VARIABLES */
    counters: new WeakMap(),
    /* API */
    get: (store) => {
        return ChangesCounters.counters.get(store) || 0;
    },
    increment: (store) => {
        ChangesCounters.counters.set(store, ChangesCounters.get(store) + 1);
    }
};
hooks.default.store.change.subscribe(ChangesCounters.increment);
/* EXPORT */
exports.default = ChangesCounters;

});

unwrapExports(changes_counters);

var changes_subscriber = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });


/* CHANGES SUBSCRIBER */
class ChangesSubscriber extends subscriber.default {
    constructor() {
        /* VARIABLES */
        super(...arguments);
        this.paths = [];
    }
    /* API */
    schedule(paths) {
        this.paths = this.paths.concat(paths);
        return super.schedule();
    }
    trigger() {
        const roots = utils$1.default.uniq(this.paths.map(path => path.replace(/^(.+?)\..*$/, '$1')));
        this.args = [roots];
        super.trigger.apply(this, arguments);
        this.paths = [];
        this.args = [this.paths];
    }
}
/* EXPORT */
exports.default = ChangesSubscriber;

});

unwrapExports(changes_subscriber);

var store_1 = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });





/* STORE */
function store(store) {
    const changes = new changes_subscriber.default();
    const [proxy] = dist$1.watch(store, paths => {
        hooks.default.store.change.trigger(proxy, paths);
        changes.schedule(paths);
    });
    changes_subscribers.default.set(proxy, changes);
    hooks.default.store.new.trigger(proxy);
    return proxy;
}
/* EXPORT */
exports.default = store;

});

unwrapExports(store_1);

var on_change = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });




function onChange(store, selector, listener) {
    if (!listener)
        return onChange(store, consts$1.IDENTITY, selector);
    const changes = changes_subscribers.default.get(store);
    return changes.subscribe(rootsChange => {
        if (selector === consts$1.IDENTITY)
            return listener(store);
        let data;
        const rootsGetAll = dist$1.record(store, () => data = selector(store));
        if (data === store || !rootsGetAll.length)
            return listener(data);
        const rootsGet = utils$1.default.uniq(rootsGetAll), changed = rootsGet.some(get => rootsChange.includes(get));
        if (!changed)
            return;
        return listener(data);
    });
}
/* EXPORT */
exports.default = onChange;

});

unwrapExports(on_change);

var x = createCommonjsModule(function (module, exports) {
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });

exports.debug = debug_1.default;

exports.store = store_1.default;

exports.onChange = on_change.default;

exports.Hooks = hooks.default;

});

var index = unwrapExports(x);
var x_1 = x.debug;
var x_2 = x.store;
var x_3 = x.onChange;
var x_4 = x.Hooks;

export default index;
export { x_4 as Hooks, x_1 as debug, x_3 as onChange, x_2 as store };
