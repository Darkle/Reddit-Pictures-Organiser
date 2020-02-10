var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var liquid = createCommonjsModule(function (module, exports) {
/*
 * liquidjs@9.7.0, https://github.com/harttle/liquidjs
 * (c) 2016-2020 harttle
 * Released under the MIT License.
 */
(function (global, factory) {
     factory(exports) ;
}(commonjsGlobal, function (exports) {
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var Drop = /** @class */ (function () {
        function Drop() {
        }
        Drop.prototype.valueOf = function () {
            return undefined;
        };
        Drop.prototype.liquidMethodMissing = function (key) {
            return undefined;
        };
        return Drop;
    }());

    var toStr = Object.prototype.toString;
    /*
     * Checks if value is classified as a String primitive or object.
     * @param {any} value The value to check.
     * @return {Boolean} Returns true if value is a string, else false.
     */
    function isString(value) {
        return toStr.call(value) === '[object String]';
    }
    function isFunction(value) {
        return typeof value === 'function';
    }
    function stringify(value) {
        value = toValue(value);
        return isNil(value) ? '' : String(value);
    }
    function toValue(value) {
        return value instanceof Drop ? value.valueOf() : value;
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function toLiquid(value) {
        if (value && isFunction(value.toLiquid))
            return toLiquid(value.toLiquid());
        return value;
    }
    function isNil(value) {
        return value === null || value === undefined;
    }
    function isArray(value) {
        // be compatible with IE 8
        return toStr.call(value) === '[object Array]';
    }
    /*
     * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
     * The iteratee is invoked with three arguments: (value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning false.
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @return {Object} Returns object.
     */
    function forOwn(object, iteratee) {
        object = object || {};
        for (var k in object) {
            if (object.hasOwnProperty(k)) {
                if (iteratee(object[k], k, object) === false)
                    break;
            }
        }
        return object;
    }
    function last(arr) {
        return arr[arr.length - 1];
    }
    /*
     * Checks if value is the language type of Object.
     * (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
     * @param {any} value The value to check.
     * @return {Boolean} Returns true if value is an object, else false.
     */
    function isObject(value) {
        var type = typeof value;
        return value !== null && (type === 'object' || type === 'function');
    }
    function range(start, stop, step) {
        if (step === void 0) { step = 1; }
        var arr = [];
        for (var i = start; i < stop; i += step) {
            arr.push(i);
        }
        return arr;
    }
    function padStart(str, length, ch) {
        if (ch === void 0) { ch = ' '; }
        return pad(str, length, ch, function (str, ch) { return ch + str; });
    }
    function padEnd(str, length, ch) {
        if (ch === void 0) { ch = ' '; }
        return pad(str, length, ch, function (str, ch) { return str + ch; });
    }
    function pad(str, length, ch, add) {
        str = String(str);
        var n = length - str.length;
        while (n-- > 0)
            str = add(str, ch);
        return str;
    }
    function identify(val) {
        return val;
    }
    function changeCase(str) {
        var hasLowerCase = __spread(str).some(function (ch) { return ch >= 'a' && ch <= 'z'; });
        return hasLowerCase ? str.toUpperCase() : str.toLowerCase();
    }

    var LiquidError = /** @class */ (function (_super) {
        __extends(LiquidError, _super);
        function LiquidError(err, token) {
            var _this = _super.call(this, err.message) || this;
            _this.originalError = err;
            _this.token = token;
            return _this;
        }
        LiquidError.prototype.update = function () {
            var err = this.originalError;
            var context = mkContext(this.token);
            this.message = mkMessage(err.message, this.token);
            this.stack = this.message + '\n' + context +
                '\n' + this.stack + '\nFrom ' + err.stack;
        };
        return LiquidError;
    }(Error));
    var TokenizationError = /** @class */ (function (_super) {
        __extends(TokenizationError, _super);
        function TokenizationError(message, token) {
            var _this = _super.call(this, new Error(message), token) || this;
            _this.name = 'TokenizationError';
            _super.prototype.update.call(_this);
            return _this;
        }
        return TokenizationError;
    }(LiquidError));
    var ParseError = /** @class */ (function (_super) {
        __extends(ParseError, _super);
        function ParseError(err, token) {
            var _this = _super.call(this, err, token) || this;
            _this.name = 'ParseError';
            _this.message = err.message;
            _super.prototype.update.call(_this);
            return _this;
        }
        return ParseError;
    }(LiquidError));
    var RenderError = /** @class */ (function (_super) {
        __extends(RenderError, _super);
        function RenderError(err, tpl) {
            var _this = _super.call(this, err, tpl.token) || this;
            _this.name = 'RenderError';
            _this.message = err.message;
            _super.prototype.update.call(_this);
            return _this;
        }
        RenderError.is = function (obj) {
            return obj instanceof RenderError;
        };
        return RenderError;
    }(LiquidError));
    var AssertionError = /** @class */ (function (_super) {
        __extends(AssertionError, _super);
        function AssertionError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = 'AssertionError';
            _this.message = message + '';
            return _this;
        }
        return AssertionError;
    }(Error));
    function mkContext(token) {
        var lines = token.input.split('\n');
        var begin = Math.max(token.line - 2, 1);
        var end = Math.min(token.line + 3, lines.length);
        var context = range(begin, end + 1)
            .map(function (lineNumber) {
            var indicator = (lineNumber === token.line) ? '>> ' : '   ';
            var num = padStart(String(lineNumber), String(end).length);
            var text = lines[lineNumber - 1];
            return "" + indicator + num + "| " + text;
        })
            .join('\n');
        return context;
    }
    function mkMessage(msg, token) {
        if (token.file)
            msg += ", file:" + token.file;
        msg += ", line:" + token.line + ", col:" + token.col;
        return msg;
    }

    function assert(predicate, message) {
        if (!predicate) {
            message = message || "expect " + predicate + " to be true";
            throw new AssertionError(message);
        }
    }

    var defaultOptions = {
        root: ['.'],
        cache: false,
        extname: '',
        dynamicPartials: true,
        trimTagRight: false,
        trimTagLeft: false,
        trimOutputRight: false,
        trimOutputLeft: false,
        greedy: true,
        tagDelimiterLeft: '{%',
        tagDelimiterRight: '%}',
        outputDelimiterLeft: '{{',
        outputDelimiterRight: '}}',
        strictFilters: false,
        strictVariables: false,
        globals: {}
    };
    function normalize(options) {
        options = options || {};
        if (options.hasOwnProperty('root')) {
            options.root = normalizeStringArray(options.root);
        }
        return options;
    }
    function applyDefault(options) {
        return __assign({}, defaultOptions, options);
    }
    function normalizeStringArray(value) {
        if (isArray(value))
            return value;
        if (isString(value))
            return [value];
        return [];
    }

    var Context = /** @class */ (function () {
        function Context(env, opts, sync) {
            if (env === void 0) { env = {}; }
            if (opts === void 0) { opts = defaultOptions; }
            if (sync === void 0) { sync = false; }
            this.scopes = [{}];
            this.registers = {};
            this.sync = sync;
            this.opts = opts;
            this.globals = opts.globals;
            this.environments = env;
        }
        Context.prototype.getRegister = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = {}; }
            return (this.registers[key] = this.registers[key] || defaultValue);
        };
        Context.prototype.setRegister = function (key, value) {
            return (this.registers[key] = value);
        };
        Context.prototype.getAll = function () {
            return __spread([this.globals, this.environments], this.scopes).reduce(function (ctx, val) { return __assign(ctx, val); }, {});
        };
        Context.prototype.get = function (path) {
            var paths = this.parseProp(path);
            var scope = this.findScope(paths[0]);
            return this.getFromScope(scope, paths);
        };
        Context.prototype.getFromScope = function (scope, paths) {
            var _this = this;
            if (!isArray(paths))
                paths = this.parseProp(paths);
            return paths.reduce(function (scope, path) {
                scope = readProperty(scope, path);
                if (isNil(scope) && _this.opts.strictVariables) {
                    throw new TypeError("undefined variable: " + path);
                }
                return scope;
            }, scope);
        };
        Context.prototype.push = function (ctx) {
            return this.scopes.push(ctx);
        };
        Context.prototype.pop = function () {
            return this.scopes.pop();
        };
        Context.prototype.front = function () {
            return this.scopes[0];
        };
        Context.prototype.findScope = function (key) {
            for (var i = this.scopes.length - 1; i >= 0; i--) {
                var candidate = this.scopes[i];
                if (key in candidate) {
                    return candidate;
                }
            }
            if (key in this.environments)
                return this.environments;
            return this.globals;
        };
        /*
         * Parse property access sequence from access string
         * @example
         * accessSeq("foo.bar")         // ['foo', 'bar']
         * accessSeq("foo['bar']")      // ['foo', 'bar']
         * accessSeq("foo['b]r']")      // ['foo', 'b]r']
         * accessSeq("foo[bar.coo]")    // ['foo', 'bar'], for bar.coo == 'bar'
         */
        Context.prototype.parseProp = function (str) {
            str = String(str);
            var seq = [];
            var name = '';
            var j;
            var i = 0;
            while (i < str.length) {
                switch (str[i]) {
                    case '[':
                        push();
                        var delemiter = str[i + 1];
                        if (/['"]/.test(delemiter)) { // foo["bar"]
                            j = str.indexOf(delemiter, i + 2);
                            assert(j !== -1, "unbalanced " + delemiter + ": " + str);
                            name = str.slice(i + 2, j);
                            push();
                            i = j + 2;
                        }
                        else { // foo[bar.coo]
                            j = matchRightBracket(str, i + 1);
                            assert(j !== -1, "unbalanced []: " + str);
                            name = str.slice(i + 1, j);
                            if (!/^[+-]?\d+$/.test(name)) { // foo[bar] vs. foo[1]
                                name = String(this.get(name));
                            }
                            push();
                            i = j + 1;
                        }
                        break;
                    case '.': // foo.bar, foo[0].bar
                        push();
                        i++;
                        break;
                    default: // foo.bar
                        name += str[i++];
                }
            }
            push();
            if (!seq.length) {
                throw new TypeError("invalid path:\"" + str + "\"");
            }
            return seq;
            function push() {
                if (name.length)
                    seq.push(name);
                name = '';
            }
        };
        return Context;
    }());
    function readProperty(obj, key) {
        if (isNil(obj))
            return obj;
        obj = toLiquid(obj);
        if (obj instanceof Drop) {
            if (isFunction(obj[key]))
                return obj[key]();
            if (obj.hasOwnProperty(key))
                return obj[key];
            return obj.liquidMethodMissing(key);
        }
        if (key === 'size')
            return readSize(obj);
        if (key === 'first')
            return readFirst(obj);
        if (key === 'last')
            return readLast(obj);
        return obj[key];
    }
    function readFirst(obj) {
        if (isArray(obj))
            return obj[0];
        return obj['first'];
    }
    function readLast(obj) {
        if (isArray(obj))
            return obj[obj.length - 1];
        return obj['last'];
    }
    function readSize(obj) {
        if (isArray(obj) || isString(obj))
            return obj.length;
        return obj['size'];
    }
    function matchRightBracket(str, begin) {
        var stack = 1; // count of '[' - count of ']'
        for (var i = begin; i < str.length; i++) {
            if (str[i] === '[') {
                stack++;
            }
            if (str[i] === ']') {
                stack--;
                if (stack === 0) {
                    return i;
                }
            }
        }
        return -1;
    }

    function domResolve(root, path) {
        var base = document.createElement('base');
        base.href = root;
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(base, head.firstChild);
        var a = document.createElement('a');
        a.href = path;
        var resolved = a.href;
        head.removeChild(base);
        return resolved;
    }
    function resolve(root, filepath, ext) {
        if (root.length && last(root) !== '/')
            root += '/';
        var url = domResolve(root, filepath);
        return url.replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/, function (str, origin, path) {
            var last = path.split('/').pop();
            if (/\.\w+$/.test(last))
                return str;
            return origin + path + ext;
        });
    }
    function readFile(url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                resolve(xhr.responseText);
                            }
                            else {
                                reject(new Error(xhr.statusText));
                            }
                        };
                        xhr.onerror = function () {
                            reject(new Error('An error occurred whilst receiving the response.'));
                        };
                        xhr.open('GET', url);
                        xhr.send();
                    })];
            });
        });
    }
    function readFileSync(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status < 200 || xhr.status >= 300) {
            throw new Error(xhr.statusText);
        }
        return xhr.responseText;
    }
    function exists() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    }
    function existsSync() {
        return true;
    }
    var fs = { readFile: readFile, resolve: resolve, exists: exists, existsSync: existsSync, readFileSync: readFileSync };

    var Token = /** @class */ (function () {
        function Token(raw, input, line, col, file) {
            this.trimLeft = false;
            this.trimRight = false;
            this.type = 'notset';
            this.col = col;
            this.line = line;
            this.raw = raw;
            this.value = raw;
            this.input = input;
            this.file = file;
        }
        return Token;
    }());

    var DelimitedToken = /** @class */ (function (_super) {
        __extends(DelimitedToken, _super);
        function DelimitedToken(raw, value, input, line, pos, trimLeft, trimRight, file) {
            var _this = _super.call(this, raw, input, line, pos, file) || this;
            var tl = value[0] === '-';
            var tr = last(value) === '-';
            _this.value = value
                .slice(tl ? 1 : 0, tr ? -1 : value.length)
                .trim();
            _this.trimLeft = tl || trimLeft;
            _this.trimRight = tr || trimRight;
            return _this;
        }
        return DelimitedToken;
    }(Token));

    // quote related
    var singleQuoted = /'[^']*'/;
    var doubleQuoted = /"[^"]*"/;
    var quoted = new RegExp(singleQuoted.source + "|" + doubleQuoted.source);
    // basic types
    var number = /[+-]?(?:\d+\.?\d*|\.?\d+)/;
    var bool = /true|false/;
    // property access
    var identifier = /[\w-]+[?]?/;
    var subscript = new RegExp("\\[(?:" + quoted.source + "|[\\w-\\.]+)\\]");
    var literal = new RegExp("(?:" + quoted.source + "|" + bool.source + "|" + number.source + ")");
    var variable = new RegExp(identifier.source + "(?:\\." + identifier.source + "|" + subscript.source + ")*");
    // range related
    var rangeLimit = new RegExp("(?:" + variable.source + "|" + number.source + ")");
    var range$1 = new RegExp("\\(" + rangeLimit.source + "\\.\\." + rangeLimit.source + "\\)");
    var rangeCapture = new RegExp("\\((" + rangeLimit.source + ")\\.\\.(" + rangeLimit.source + ")\\)");
    var value = new RegExp("(?:" + variable.source + "|" + literal.source + "|" + range$1.source + ")");
    // hash related
    var hash = new RegExp("(?:" + identifier.source + ")\\s*:\\s*(?:" + value.source + ")");
    var hashCapture = new RegExp("(" + identifier.source + ")\\s*:\\s*(" + value.source + ")", 'g');
    // full match
    var tagLine = new RegExp("^\\s*(" + identifier.source + ")\\s*([\\s\\S]*?)\\s*$");
    var quotedLine = new RegExp("^" + quoted.source + "$");
    var rangeLine = new RegExp("^" + rangeCapture.source + "$");

    var TagToken = /** @class */ (function (_super) {
        __extends(TagToken, _super);
        function TagToken(raw, value, input, line, pos, options, file) {
            var _this = _super.call(this, raw, value, input, line, pos, options.trimTagLeft, options.trimTagRight, file) || this;
            _this.type = 'tag';
            var match = _this.value.match(tagLine);
            if (!match) {
                throw new TokenizationError("illegal tag syntax", _this);
            }
            _this.name = match[1];
            _this.args = match[2];
            return _this;
        }
        TagToken.is = function (token) {
            return token.type === 'tag';
        };
        return TagToken;
    }(DelimitedToken));

    var HTMLToken = /** @class */ (function (_super) {
        __extends(HTMLToken, _super);
        function HTMLToken(str, input, line, col, file) {
            var _this = _super.call(this, str, input, line, col, file) || this;
            _this.type = 'html';
            _this.value = str;
            return _this;
        }
        HTMLToken.is = function (token) {
            return token.type === 'html';
        };
        return HTMLToken;
    }(Token));

    function whiteSpaceCtrl(tokens, options) {
        options = __assign({ greedy: true }, options);
        var inRaw = false;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (!inRaw && token.trimLeft) {
                trimLeft(tokens[i - 1], options.greedy);
            }
            if (TagToken.is(token)) {
                if (token.name === 'raw')
                    inRaw = true;
                else if (token.name === 'endraw')
                    inRaw = false;
            }
            if (!inRaw && token.trimRight) {
                trimRight(tokens[i + 1], options.greedy);
            }
        }
    }
    function trimLeft(token, greedy) {
        if (!token || !HTMLToken.is(token))
            return;
        var rLeft = greedy ? /\s+$/g : /[\t\r ]*$/g;
        token.value = token.value.replace(rLeft, '');
    }
    function trimRight(token, greedy) {
        if (!token || !HTMLToken.is(token))
            return;
        var rRight = greedy ? /^\s+/g : /^[\t\r ]*\n?/g;
        token.value = token.value.replace(rRight, '');
    }

    var OutputToken = /** @class */ (function (_super) {
        __extends(OutputToken, _super);
        function OutputToken(raw, value, input, line, pos, options, file) {
            var _this = _super.call(this, raw, value, input, line, pos, options.trimOutputLeft, options.trimOutputRight, file) || this;
            _this.type = 'output';
            return _this;
        }
        OutputToken.is = function (token) {
            return token.type === 'output';
        };
        return OutputToken;
    }(DelimitedToken));

    function flatten(str) {
        return str;
    }

    var ParseState;
    (function (ParseState) {
        ParseState[ParseState["HTML"] = 0] = "HTML";
        ParseState[ParseState["OUTPUT"] = 1] = "OUTPUT";
        ParseState[ParseState["TAG"] = 2] = "TAG";
    })(ParseState || (ParseState = {}));
    var Tokenizer = /** @class */ (function () {
        function Tokenizer(options) {
            this.options = applyDefault(options);
        }
        Tokenizer.prototype.tokenize = function (input, file) {
            var tokens = [];
            var _a = this.options, tagDelimiterLeft = _a.tagDelimiterLeft, tagDelimiterRight = _a.tagDelimiterRight, outputDelimiterLeft = _a.outputDelimiterLeft, outputDelimiterRight = _a.outputDelimiterRight;
            var p = 0;
            var curLine = 1;
            var state = ParseState.HTML;
            var buffer = '';
            var lineBegin = 0;
            var line = 1;
            var col = 1;
            while (p < input.length) {
                if (input[p] === '\n') {
                    curLine++;
                    lineBegin = p + 1;
                }
                if (state === ParseState.HTML) {
                    if (input.substr(p, outputDelimiterLeft.length) === outputDelimiterLeft) {
                        if (buffer)
                            tokens.push(new HTMLToken(flatten(buffer), input, line, col, file));
                        buffer = outputDelimiterLeft;
                        line = curLine;
                        col = p - lineBegin + 1;
                        p += outputDelimiterLeft.length;
                        state = ParseState.OUTPUT;
                        continue;
                    }
                    else if (input.substr(p, tagDelimiterLeft.length) === tagDelimiterLeft) {
                        if (buffer)
                            tokens.push(new HTMLToken(flatten(buffer), input, line, col, file));
                        buffer = tagDelimiterLeft;
                        line = curLine;
                        col = p - lineBegin + 1;
                        p += tagDelimiterLeft.length;
                        state = ParseState.TAG;
                        continue;
                    }
                }
                else if (state === ParseState.OUTPUT &&
                    input.substr(p, outputDelimiterRight.length) === outputDelimiterRight) {
                    buffer += outputDelimiterRight;
                    tokens.push(new OutputToken(flatten(buffer), buffer.slice(outputDelimiterLeft.length, -outputDelimiterRight.length), input, line, col, this.options, file));
                    p += outputDelimiterRight.length;
                    buffer = '';
                    line = curLine;
                    col = p - lineBegin + 1;
                    state = ParseState.HTML;
                    continue;
                }
                else if (input.substr(p, tagDelimiterRight.length) === tagDelimiterRight) {
                    buffer += tagDelimiterRight;
                    tokens.push(new TagToken(flatten(buffer), buffer.slice(tagDelimiterLeft.length, -tagDelimiterRight.length), input, line, col, this.options, file));
                    p += tagDelimiterRight.length;
                    buffer = '';
                    line = curLine;
                    col = p - lineBegin + 1;
                    state = ParseState.HTML;
                    continue;
                }
                buffer += input[p++];
            }
            if (state !== ParseState.HTML) {
                var t = state === ParseState.OUTPUT ? 'output' : 'tag';
                var str = buffer.length > 16 ? buffer.slice(0, 13) + '...' : buffer;
                throw new TokenizationError(t + " \"" + str + "\" not closed", new Token(flatten(buffer), input, line, col, file));
            }
            if (buffer)
                tokens.push(new HTMLToken(flatten(buffer), input, line, col, file));
            whiteSpaceCtrl(tokens, this.options);
            return tokens;
        };
        return Tokenizer;
    }());

    var Emitter = /** @class */ (function () {
        function Emitter() {
            this.html = '';
            this.break = false;
            this.continue = false;
        }
        Emitter.prototype.write = function (html) {
            this.html += html;
        };
        return Emitter;
    }());

    var Render = /** @class */ (function () {
        function Render() {
        }
        Render.prototype.renderTemplates = function (templates, ctx, emitter) {
            var templates_1, templates_1_1, tpl, html, e_1, err, e_2_1;
            var e_2, _a;
            if (emitter === void 0) { emitter = new Emitter(); }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, 8, 9]);
                        templates_1 = __values(templates), templates_1_1 = templates_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!templates_1_1.done) return [3 /*break*/, 6];
                        tpl = templates_1_1.value;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, tpl.render(ctx, emitter)];
                    case 3:
                        html = _b.sent();
                        html && emitter.write(html);
                        if (emitter.break || emitter.continue)
                            return [3 /*break*/, 6];
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        err = RenderError.is(e_1) ? e_1 : new RenderError(e_1, tpl);
                        throw err;
                    case 5:
                        templates_1_1 = templates_1.next();
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (templates_1_1 && !templates_1_1.done && (_a = templates_1.return)) _a.call(templates_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, emitter.html];
                }
            });
        };
        return Render;
    }());

    var Template = /** @class */ (function () {
        function Template(token) {
            this.token = token;
        }
        return Template;
    }());

    var EmptyDrop = /** @class */ (function (_super) {
        __extends(EmptyDrop, _super);
        function EmptyDrop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EmptyDrop.prototype.equals = function (value) {
            if (isString(value) || isArray(value))
                return value.length === 0;
            if (isObject(value))
                return Object.keys(value).length === 0;
            return false;
        };
        EmptyDrop.prototype.gt = function () {
            return false;
        };
        EmptyDrop.prototype.geq = function () {
            return false;
        };
        EmptyDrop.prototype.lt = function () {
            return false;
        };
        EmptyDrop.prototype.leq = function () {
            return false;
        };
        EmptyDrop.prototype.valueOf = function () {
            return '';
        };
        return EmptyDrop;
    }(Drop));

    var BlankDrop = /** @class */ (function (_super) {
        __extends(BlankDrop, _super);
        function BlankDrop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BlankDrop.prototype.equals = function (value) {
            if (value === false)
                return true;
            if (isNil(toValue(value)))
                return true;
            if (isString(value))
                return /^\s*$/.test(value);
            return _super.prototype.equals.call(this, value);
        };
        return BlankDrop;
    }(EmptyDrop));

    var NullDrop = /** @class */ (function (_super) {
        __extends(NullDrop, _super);
        function NullDrop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NullDrop.prototype.equals = function (value) {
            return isNil(toValue(value)) || value instanceof BlankDrop;
        };
        NullDrop.prototype.gt = function () {
            return false;
        };
        NullDrop.prototype.geq = function () {
            return false;
        };
        NullDrop.prototype.lt = function () {
            return false;
        };
        NullDrop.prototype.leq = function () {
            return false;
        };
        NullDrop.prototype.valueOf = function () {
            return null;
        };
        return NullDrop;
    }(Drop));

    var rHex = /[\da-fA-F]/;
    var rOct = /[0-7]/;
    var escapeChar = {
        b: '\b',
        f: '\f',
        n: '\n',
        r: '\r',
        t: '\t',
        v: '\x0B'
    };
    function hexVal(c) {
        var code = c.charCodeAt(0);
        if (code >= 97)
            return code - 87;
        if (code >= 65)
            return code - 55;
        return code - 48;
    }
    function parseLiteral(str) {
        str = str.trim();
        if (str === 'true')
            return true;
        if (str === 'false')
            return false;
        if (str === 'nil' || str === 'null')
            return new NullDrop();
        if (str === 'empty')
            return new EmptyDrop();
        if (str === 'blank')
            return new BlankDrop();
        if (!isNaN(Number(str)))
            return Number(str);
        if ((str[0] === '"' || str[0] === "'") && str[0] === last(str))
            return parseStringLiteral(str);
    }
    function parseStringLiteral(str) {
        var ret = '';
        for (var i = 1; i < str.length - 1; i++) {
            if (str[i] !== '\\') {
                ret += str[i];
                continue;
            }
            if (escapeChar[str[i + 1]] !== undefined) {
                ret += escapeChar[str[++i]];
            }
            else if (str[i + 1] === 'u') {
                var val = 0;
                var j = i + 2;
                while (j <= i + 5 && rHex.test(str[j])) {
                    val = val * 16 + hexVal(str[j++]);
                }
                i = j - 1;
                ret += String.fromCharCode(val);
            }
            else if (!rOct.test(str[i + 1])) {
                ret += str[++i];
            }
            else {
                var j = i + 1;
                var val = 0;
                while (j <= i + 3 && rOct.test(str[j])) {
                    val = val * 8 + hexVal(str[j++]);
                }
                i = j - 1;
                ret += String.fromCharCode(val);
            }
        }
        return ret;
    }

    var Value = /** @class */ (function () {
        function Value(str) {
            this.str = str;
        }
        Value.prototype.evaluate = function (ctx) {
            var literalValue = parseLiteral(this.str);
            if (literalValue !== undefined) {
                return literalValue;
            }
            return ctx.get(this.str);
        };
        Value.prototype.value = function (ctx) {
            return toValue(this.evaluate(ctx));
        };
        return Value;
    }());

    function isRange(token) {
        return token[0] === '(' && token[token.length - 1] === ')';
    }
    function rangeValue(token, ctx) {
        var match, low, high;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(match = token.match(rangeLine))) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Value(match[1]).value(ctx)];
                case 1:
                    low = _a.sent();
                    return [4 /*yield*/, new Value(match[2]).value(ctx)];
                case 2:
                    high = _a.sent();
                    return [2 /*return*/, range(+low, +high + 1)];
                case 3: return [2 /*return*/];
            }
        });
    }

    function isComparable(arg) {
        return arg && isFunction(arg.equals);
    }

    function isTruthy(val) {
        return !isFalsy(val);
    }
    function isFalsy(val) {
        return val === false || undefined === val || val === null;
    }

    var precedence = {
        '==': 1,
        '!=': 1,
        '>': 1,
        '<': 1,
        '>=': 1,
        '<=': 1,
        'contains': 1,
        'and': 0,
        'or': 0
    };
    var operatorImpls = {
        '==': function (l, r) {
            if (isComparable(l))
                return l.equals(r);
            if (isComparable(r))
                return r.equals(l);
            return l === r;
        },
        '!=': function (l, r) {
            if (isComparable(l))
                return !l.equals(r);
            if (isComparable(r))
                return !r.equals(l);
            return l !== r;
        },
        '>': function (l, r) {
            if (isComparable(l))
                return l.gt(r);
            if (isComparable(r))
                return r.lt(l);
            return l > r;
        },
        '<': function (l, r) {
            if (isComparable(l))
                return l.lt(r);
            if (isComparable(r))
                return r.gt(l);
            return l < r;
        },
        '>=': function (l, r) {
            if (isComparable(l))
                return l.geq(r);
            if (isComparable(r))
                return r.leq(l);
            return l >= r;
        },
        '<=': function (l, r) {
            if (isComparable(l))
                return l.leq(r);
            if (isComparable(r))
                return r.geq(l);
            return l <= r;
        },
        'contains': function (l, r) {
            return l && isFunction(l.indexOf) ? l.indexOf(r) > -1 : false;
        },
        'and': function (l, r) { return isTruthy(l) && isTruthy(r); },
        'or': function (l, r) { return isTruthy(l) || isTruthy(r); }
    };
    var list = Object.keys(precedence);
    function isOperator(token) {
        return list.includes(token);
    }

    var rBlank = /\s/;
    var rPunctuation = /[<>=!]/;
    var ParseState$1;
    (function (ParseState) {
        ParseState[ParseState["INIT"] = 1] = "INIT";
        ParseState[ParseState["SINGLE_QUOTE"] = 2] = "SINGLE_QUOTE";
        ParseState[ParseState["DOUBLE_QUOTE"] = 4] = "DOUBLE_QUOTE";
        ParseState[ParseState["QUOTE"] = 6] = "QUOTE";
        ParseState[ParseState["BRACKET"] = 8] = "BRACKET";
    })(ParseState$1 || (ParseState$1 = {}));
    function tokenize(expr) {
        var N, stack, str, lastIsPunc, i, c, top_1, isPunc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    N = expr.length;
                    stack = [ParseState$1.INIT];
                    str = '';
                    lastIsPunc = false;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < N)) return [3 /*break*/, 15];
                    c = expr[i];
                    top_1 = stack[stack.length - 1];
                    isPunc = rPunctuation.test(c);
                    if (!(c === '\\')) return [3 /*break*/, 2];
                    str += expr.substr(i++, 2);
                    return [3 /*break*/, 13];
                case 2:
                    if (!(top_1 === ParseState$1.SINGLE_QUOTE && c === "'")) return [3 /*break*/, 3];
                    str += c;
                    stack.pop();
                    return [3 /*break*/, 13];
                case 3:
                    if (!(top_1 === ParseState$1.DOUBLE_QUOTE && c === '"')) return [3 /*break*/, 4];
                    str += c;
                    stack.pop();
                    return [3 /*break*/, 13];
                case 4:
                    if (!(ParseState$1.QUOTE & top_1)) return [3 /*break*/, 5];
                    str += c;
                    return [3 /*break*/, 13];
                case 5:
                    if (!(top_1 === ParseState$1.BRACKET && c === ']')) return [3 /*break*/, 6];
                    str += c;
                    stack.pop();
                    return [3 /*break*/, 13];
                case 6:
                    if (!(top_1 === ParseState$1.INIT && rBlank.exec(c))) return [3 /*break*/, 9];
                    if (!str) return [3 /*break*/, 8];
                    return [4 /*yield*/, str];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    str = '';
                    return [3 /*break*/, 13];
                case 9:
                    if (!(top_1 === ParseState$1.INIT && isPunc !== lastIsPunc)) return [3 /*break*/, 12];
                    if (!str) return [3 /*break*/, 11];
                    return [4 /*yield*/, str];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    str = c;
                    return [3 /*break*/, 13];
                case 12:
                    if (c === '"')
                        stack.push(ParseState$1.DOUBLE_QUOTE);
                    else if (c === "'")
                        stack.push(ParseState$1.SINGLE_QUOTE);
                    else if (c === '[')
                        stack.push(ParseState$1.BRACKET);
                    str += c;
                    _a.label = 13;
                case 13:
                    lastIsPunc = isPunc;
                    _a.label = 14;
                case 14:
                    i++;
                    return [3 /*break*/, 1];
                case 15:
                    if (!str) return [3 /*break*/, 17];
                    return [4 /*yield*/, str];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    }

    var Expression = /** @class */ (function () {
        function Expression(str) {
            if (str === void 0) { str = ''; }
            this.operands = [];
            this.postfix = __spread(toPostfix(tokenize(str)));
        }
        Expression.prototype.evaluate = function (ctx) {
            var _a, _b, token, r, l, result, _c, _d, _e, _f, e_1_1;
            var e_1, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        assert(ctx, 'unable to evaluate: context not defined');
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 9, 10, 11]);
                        _a = __values(this.postfix), _b = _a.next();
                        _h.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 8];
                        token = _b.value;
                        if (!isOperator(token)) return [3 /*break*/, 3];
                        r = this.operands.pop();
                        l = this.operands.pop();
                        result = operatorImpls[token](l, r);
                        this.operands.push(result);
                        return [3 /*break*/, 7];
                    case 3:
                        if (!isRange(token)) return [3 /*break*/, 5];
                        _d = (_c = this.operands).push;
                        return [4 /*yield*/, rangeValue(token, ctx)];
                    case 4:
                        _d.apply(_c, [_h.sent()]);
                        return [3 /*break*/, 7];
                    case 5:
                        _f = (_e = this.operands).push;
                        return [4 /*yield*/, new Value(token).evaluate(ctx)];
                    case 6:
                        _f.apply(_e, [_h.sent()]);
                        _h.label = 7;
                    case 7:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/, this.operands[0]];
                }
            });
        };
        Expression.prototype.value = function (ctx) {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toValue;
                        return [4 /*yield*/, this.evaluate(ctx)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        };
        return Expression;
    }());
    function toPostfix(tokens) {
        var ops, tokens_1, tokens_1_1, token, e_2_1;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ops = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, 11, 12]);
                    tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next();
                    _b.label = 2;
                case 2:
                    if (!!tokens_1_1.done) return [3 /*break*/, 9];
                    token = tokens_1_1.value;
                    if (!isOperator(token)) return [3 /*break*/, 6];
                    _b.label = 3;
                case 3:
                    if (!(ops.length && precedence[ops[ops.length - 1]] > precedence[token])) return [3 /*break*/, 5];
                    return [4 /*yield*/, ops.pop()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 5:
                    ops.push(token);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, token];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    tokens_1_1 = tokens_1.next();
                    return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 12:
                    if (!ops.length) return [3 /*break*/, 14];
                    return [4 /*yield*/, ops.pop()];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 14: return [2 /*return*/];
            }
        });
    }

    var ParseStream = /** @class */ (function () {
        function ParseStream(tokens, parseToken) {
            this.handlers = {};
            this.stopRequested = false;
            this.tokens = tokens;
            this.parseToken = parseToken;
        }
        ParseStream.prototype.on = function (name, cb) {
            this.handlers[name] = cb;
            return this;
        };
        ParseStream.prototype.trigger = function (event, arg) {
            var h = this.handlers[event];
            return h ? (h(arg), true) : false;
        };
        ParseStream.prototype.start = function () {
            this.trigger('start');
            var token;
            while (!this.stopRequested && (token = this.tokens.shift())) {
                if (this.trigger('token', token))
                    continue;
                if (TagToken.is(token) && this.trigger("tag:" + token.name, token)) {
                    continue;
                }
                var template = this.parseToken(token, this.tokens);
                this.trigger('template', template);
            }
            if (!this.stopRequested)
                this.trigger('end');
            return this;
        };
        ParseStream.prototype.stop = function () {
            this.stopRequested = true;
            return this;
        };
        return ParseStream;
    }());

    /**
     * Key-Value Pairs Representing Tag Arguments
     * Example:
     *    For the markup `{% include 'head.html' foo='bar' %}`,
     *    hash['foo'] === 'bar'
     */
    var Hash = /** @class */ (function () {
        function Hash() {
        }
        Hash.parse = function (markup) {
            var instance = new Hash();
            var match;
            hashCapture.lastIndex = 0;
            while ((match = hashCapture.exec(markup))) {
                var k = match[1];
                var v = match[2];
                instance[k] = v;
            }
            return instance;
        };
        Hash.create = function (markup, ctx) {
            var instance, _a, _b, key, _c, _d, e_1_1;
            var e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        instance = Hash.parse(markup);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, 7, 8]);
                        _a = __values(Object.keys(instance)), _b = _a.next();
                        _f.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        key = _b.value;
                        _c = instance;
                        _d = key;
                        return [4 /*yield*/, new Expression(instance[key]).evaluate(ctx)];
                    case 3:
                        _c[_d] = _f.sent();
                        _f.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, instance];
                }
            });
        };
        return Hash;
    }());

    var Tag = /** @class */ (function (_super) {
        __extends(Tag, _super);
        function Tag(token, tokens, liquid) {
            var _this = _super.call(this, token) || this;
            _this.name = token.name;
            var impl = Tag.impls[token.name];
            assert(impl, "tag " + token.name + " not found");
            _this.impl = Object.create(impl);
            _this.impl.liquid = liquid;
            if (_this.impl.parse) {
                _this.impl.parse(token, tokens);
            }
            return _this;
        }
        Tag.prototype.render = function (ctx, emitter) {
            var hash, impl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Hash.create(this.token.args, ctx)];
                    case 1:
                        hash = _a.sent();
                        impl = this.impl;
                        if (!isFunction(impl.render)) return [3 /*break*/, 3];
                        return [4 /*yield*/, impl.render(ctx, hash, emitter)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        };
        Tag.register = function (name, tag) {
            Tag.impls[name] = tag;
        };
        Tag.clear = function () {
            Tag.impls = {};
        };
        Tag.impls = {};
        return Tag;
    }(Template));

    var Filter = /** @class */ (function () {
        function Filter(name, args, strictFilters) {
            var impl = Filter.impls[name];
            if (!impl && strictFilters)
                throw new TypeError("undefined filter: " + name);
            this.name = name;
            this.impl = impl || identify;
            this.args = args;
        }
        Filter.prototype.render = function (value, context) {
            var argv, _a, _b, arg, _c, _d, _e, _f, _g, e_1_1;
            var e_1, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        argv = [];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 8, 9, 10]);
                        _a = __values(this.args), _b = _a.next();
                        _j.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        arg = _b.value;
                        if (!isKeyValuePair(arg)) return [3 /*break*/, 4];
                        _d = (_c = argv).push;
                        _e = [arg[0]];
                        return [4 /*yield*/, new Expression(arg[1]).evaluate(context)];
                    case 3:
                        _d.apply(_c, [_e.concat([_j.sent()])]);
                        return [3 /*break*/, 6];
                    case 4:
                        _g = (_f = argv).push;
                        return [4 /*yield*/, new Expression(arg).evaluate(context)];
                    case 5:
                        _g.apply(_f, [_j.sent()]);
                        _j.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_h = _a.return)) _h.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, this.impl.apply({ context: context }, __spread([value], argv))];
                }
            });
        };
        Filter.register = function (name, filter) {
            Filter.impls[name] = filter;
        };
        Filter.clear = function () {
            Filter.impls = {};
        };
        Filter.impls = {};
        return Filter;
    }());
    function isKeyValuePair(arr) {
        return isArray(arr);
    }

    var Value$1 = /** @class */ (function () {
        /**
         * @param str value string, like: "i have a dream | truncate: 3
         */
        function Value(str, strictFilters) {
            this.filters = [];
            var tokens = Value.tokenize(str);
            this.strictFilters = strictFilters;
            this.initial = tokens[0];
            this.parseFilters(tokens, 1);
        }
        Value.prototype.parseFilters = function (tokens, begin) {
            var i = begin;
            while (i < tokens.length) {
                if (tokens[i] !== '|') {
                    i++;
                    continue;
                }
                var j = ++i;
                while (i < tokens.length && tokens[i] !== '|')
                    i++;
                this.parseFilter(tokens, j, i);
            }
        };
        Value.prototype.parseFilter = function (tokens, begin, end) {
            var name = tokens[begin];
            var args = [];
            var argName, argValue;
            for (var i = begin + 1; i < end + 1; i++) {
                if (i === end || tokens[i] === ',') {
                    if (argName || argValue) {
                        args.push(argName ? [argName, argValue] : argValue);
                    }
                    argValue = argName = undefined;
                }
                else if (tokens[i] === ':') {
                    argName = argValue;
                    argValue = undefined;
                }
                else if (argValue === undefined) {
                    argValue = tokens[i];
                }
            }
            this.filters.push(new Filter(name, args, this.strictFilters));
        };
        Value.prototype.value = function (ctx) {
            var val, _a, _b, filter, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, new Expression(this.initial).evaluate(ctx)];
                    case 1:
                        val = _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        _a = __values(this.filters), _b = _a.next();
                        _d.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        filter = _b.value;
                        return [4 /*yield*/, filter.render(val, ctx)];
                    case 4:
                        val = _d.sent();
                        _d.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, val];
                }
            });
        };
        Value.tokenize = function (str) {
            var tokens = [];
            var i = 0;
            while (i < str.length) {
                var ch = str[i];
                if (ch === '"' || ch === "'") {
                    var j = i;
                    for (i += 2; i < str.length && str[i - 1] !== ch; ++i)
                        ;
                    tokens.push(str.slice(j, i));
                }
                else if (/\s/.test(ch)) {
                    i++;
                }
                else if (/[|,:]/.test(ch)) {
                    tokens.push(str[i++]);
                }
                else {
                    var j = i++;
                    var ch_1 = void 0;
                    for (; i < str.length && !/[|,:\s]/.test(ch_1 = str[i]); ++i) {
                        if (ch_1 === '"' || ch_1 === "'") {
                            for (i += 2; i < str.length && str[i - 1] !== ch_1; ++i)
                                ;
                        }
                    }
                    tokens.push(str.slice(j, i));
                }
            }
            return tokens;
        };
        return Value;
    }());

    var Output = /** @class */ (function (_super) {
        __extends(Output, _super);
        function Output(token, strictFilters) {
            var _this = _super.call(this, token) || this;
            _this.value = new Value$1(token.value, strictFilters);
            return _this;
        }
        Output.prototype.render = function (ctx, emitter) {
            var val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.value.value(ctx)];
                    case 1:
                        val = _a.sent();
                        emitter.write(stringify(toValue(val)));
                        return [2 /*return*/];
                }
            });
        };
        return Output;
    }(Template));

    var HTML = /** @class */ (function (_super) {
        __extends(HTML, _super);
        function HTML(token) {
            var _this = _super.call(this, token) || this;
            _this.str = token.value;
            return _this;
        }
        HTML.prototype.render = function (ctx, emitter) {
            return __generator(this, function (_a) {
                emitter.write(this.str);
                return [2 /*return*/];
            });
        };
        return HTML;
    }(Template));

    var Parser = /** @class */ (function () {
        function Parser(liquid) {
            this.liquid = liquid;
        }
        Parser.prototype.parse = function (tokens) {
            var token;
            var templates = [];
            while ((token = tokens.shift())) {
                templates.push(this.parseToken(token, tokens));
            }
            return templates;
        };
        Parser.prototype.parseToken = function (token, remainTokens) {
            try {
                if (TagToken.is(token)) {
                    return new Tag(token, remainTokens, this.liquid);
                }
                if (OutputToken.is(token)) {
                    return new Output(token, this.liquid.options.strictFilters);
                }
                return new HTML(token);
            }
            catch (e) {
                throw new ParseError(e, token);
            }
        };
        Parser.prototype.parseStream = function (tokens) {
            var _this = this;
            return new ParseStream(tokens, function (token, tokens) { return _this.parseToken(token, tokens); });
        };
        return Parser;
    }());

    var re = new RegExp("(" + identifier.source + ")\\s*=([^]*)");
    var assign = {
        parse: function (token) {
            var match = token.args.match(re);
            assert(match, "illegal token " + token.raw);
            this.key = match[1];
            this.value = match[2];
        },
        render: function (ctx) {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = ctx.front();
                        _b = this.key;
                        return [4 /*yield*/, this.liquid._evalValue(this.value, ctx)];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/];
                }
            });
        }
    };

    var ForloopDrop = /** @class */ (function (_super) {
        __extends(ForloopDrop, _super);
        function ForloopDrop(length) {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this.length = length;
            return _this;
        }
        ForloopDrop.prototype.next = function () {
            this.i++;
        };
        ForloopDrop.prototype.index0 = function () {
            return this.i;
        };
        ForloopDrop.prototype.index = function () {
            return this.i + 1;
        };
        ForloopDrop.prototype.first = function () {
            return this.i === 0;
        };
        ForloopDrop.prototype.last = function () {
            return this.i === this.length - 1;
        };
        ForloopDrop.prototype.rindex = function () {
            return this.length - this.i;
        };
        ForloopDrop.prototype.rindex0 = function () {
            return this.length - this.i - 1;
        };
        ForloopDrop.prototype.valueOf = function () {
            return JSON.stringify(this);
        };
        return ForloopDrop;
    }(Drop));

    var re$1 = new RegExp("^(" + identifier.source + ")\\s+in\\s+" +
        ("(" + value.source + ")") +
        ("(?:\\s+" + hash.source + ")*") +
        "(?:\\s+(reversed))?" +
        ("(?:\\s+" + hash.source + ")*$"));
    var For = {
        type: 'block',
        parse: function (tagToken, remainTokens) {
            var _this = this;
            var match = re$1.exec(tagToken.args);
            assert(match, "illegal tag: " + tagToken.raw);
            this.variable = match[1];
            this.collection = match[2];
            this.reversed = !!match[3];
            this.templates = [];
            this.elseTemplates = [];
            var p;
            var stream = this.liquid.parser.parseStream(remainTokens)
                .on('start', function () { return (p = _this.templates); })
                .on('tag:else', function () { return (p = _this.elseTemplates); })
                .on('tag:endfor', function () { return stream.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        },
        render: function (ctx, hash, emitter) {
            var r, collection, offset, limit, scope, collection_1, collection_1_1, item, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        r = this.liquid.renderer;
                        return [4 /*yield*/, new Expression(this.collection).value(ctx)];
                    case 1:
                        collection = _b.sent();
                        if (!isArray(collection)) {
                            if (isString(collection) && collection.length > 0) {
                                collection = [collection];
                            }
                            else if (isObject(collection)) {
                                collection = Object.keys(collection).map(function (key) { return [key, collection[key]]; });
                            }
                        }
                        if (!(!isArray(collection) || !collection.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                    case 3:
                        offset = hash.offset || 0;
                        limit = (hash.limit === undefined) ? collection.length : hash.limit;
                        collection = collection.slice(offset, offset + limit);
                        if (this.reversed)
                            collection.reverse();
                        scope = { forloop: new ForloopDrop(collection.length) };
                        ctx.push(scope);
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 9, 10, 11]);
                        collection_1 = __values(collection), collection_1_1 = collection_1.next();
                        _b.label = 5;
                    case 5:
                        if (!!collection_1_1.done) return [3 /*break*/, 8];
                        item = collection_1_1.value;
                        scope[this.variable] = item;
                        return [4 /*yield*/, r.renderTemplates(this.templates, ctx, emitter)];
                    case 6:
                        _b.sent();
                        if (emitter.break) {
                            emitter.break = false;
                            return [3 /*break*/, 8];
                        }
                        emitter.continue = false;
                        scope.forloop.next();
                        _b.label = 7;
                    case 7:
                        collection_1_1 = collection_1.next();
                        return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (collection_1_1 && !collection_1_1.done && (_a = collection_1.return)) _a.call(collection_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11:
                        ctx.pop();
                        return [2 /*return*/];
                }
            });
        }
    };

    var re$2 = new RegExp("(" + identifier.source + ")");
    var capture = {
        parse: function (tagToken, remainTokens) {
            var _this = this;
            var match = tagToken.args.match(re$2);
            assert(match, tagToken.args + " not valid identifier");
            this.variable = match[1];
            this.templates = [];
            var stream = this.liquid.parser.parseStream(remainTokens);
            stream.on('tag:endcapture', function () { return stream.stop(); })
                .on('template', function (tpl) { return _this.templates.push(tpl); })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        },
        render: function (ctx) {
            var r, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = this.liquid.renderer;
                        return [4 /*yield*/, r.renderTemplates(this.templates, ctx)];
                    case 1:
                        html = _a.sent();
                        ctx.front()[this.variable] = html;
                        return [2 /*return*/];
                }
            });
        }
    };

    var Case = {
        parse: function (tagToken, remainTokens) {
            var _this = this;
            this.cond = tagToken.args;
            this.cases = [];
            this.elseTemplates = [];
            var p = [];
            var stream = this.liquid.parser.parseStream(remainTokens)
                .on('tag:when', function (token) {
                _this.cases.push({
                    val: token.args,
                    templates: p = []
                });
            })
                .on('tag:else', function () { return (p = _this.elseTemplates); })
                .on('tag:endcase', function () { return stream.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        },
        render: function (ctx, hash, emitter) {
            var r, cond, i, branch, val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = this.liquid.renderer;
                        return [4 /*yield*/, new Expression(this.cond).value(ctx)];
                    case 1:
                        cond = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.cases.length)) return [3 /*break*/, 6];
                        branch = this.cases[i];
                        return [4 /*yield*/, new Expression(branch.val).value(ctx)];
                    case 3:
                        val = _a.sent();
                        if (!(val === cond)) return [3 /*break*/, 5];
                        return [4 /*yield*/, r.renderTemplates(branch.templates, ctx, emitter)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }
    };

    var comment = {
        parse: function (tagToken, remainTokens) {
            var stream = this.liquid.parser.parseStream(remainTokens);
            stream
                .on('token', function (token) {
                if (token.name === 'endcomment')
                    stream.stop();
            })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        }
    };

    var BlockMode;
    (function (BlockMode) {
        /* store rendered html into blocks */
        BlockMode[BlockMode["OUTPUT"] = 0] = "OUTPUT";
        /* output rendered html directly */
        BlockMode[BlockMode["STORE"] = 1] = "STORE";
    })(BlockMode || (BlockMode = {}));
    var BlockMode$1 = BlockMode;

    var staticFileRE = /[^\s,]+/;
    var withRE = new RegExp("with\\s+(" + value.source + ")");
    var include = {
        parse: function (token) {
            var match = staticFileRE.exec(token.args);
            if (match)
                this.staticValue = match[0];
            match = value.exec(token.args);
            if (match)
                this.value = match[0];
            match = withRE.exec(token.args);
            if (match)
                this.with = match[1];
        },
        render: function (ctx, hash, emitter) {
            var filepath, template, originBlocks, originBlockMode, _a, _b, templates;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!ctx.opts.dynamicPartials) return [3 /*break*/, 5];
                        if (!quotedLine.exec(this.value)) return [3 /*break*/, 2];
                        template = this.value.slice(1, -1);
                        return [4 /*yield*/, this.liquid._parseAndRender(template, ctx.getAll(), ctx.opts, ctx.sync)];
                    case 1:
                        filepath = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, new Expression(this.value).value(ctx)];
                    case 3:
                        filepath = _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        filepath = this.staticValue;
                        _c.label = 6;
                    case 6:
                        assert(filepath, "cannot include with empty filename");
                        originBlocks = ctx.getRegister('blocks');
                        originBlockMode = ctx.getRegister('blockMode');
                        ctx.setRegister('blocks', {});
                        ctx.setRegister('blockMode', BlockMode$1.OUTPUT);
                        if (!this.with) return [3 /*break*/, 8];
                        _a = hash;
                        _b = filepath;
                        return [4 /*yield*/, new Expression(this.with).evaluate(ctx)];
                    case 7:
                        _a[_b] = _c.sent();
                        _c.label = 8;
                    case 8: return [4 /*yield*/, this.liquid._parseFile(filepath, ctx.opts, ctx.sync)];
                    case 9:
                        templates = _c.sent();
                        ctx.push(hash);
                        return [4 /*yield*/, this.liquid.renderer.renderTemplates(templates, ctx, emitter)];
                    case 10:
                        _c.sent();
                        ctx.pop();
                        ctx.setRegister('blocks', originBlocks);
                        ctx.setRegister('blockMode', originBlockMode);
                        return [2 /*return*/];
                }
            });
        }
    };

    var staticFileRE$1 = /[^\s,]+/;
    var withRE$1 = new RegExp("with\\s+(" + value.source + ")");
    var render = {
        parse: function (token) {
            var match = staticFileRE$1.exec(token.args);
            if (match)
                this.staticValue = match[0];
            match = value.exec(token.args);
            if (match)
                this.value = match[0];
            match = withRE$1.exec(token.args);
            if (match)
                this.with = match[1];
        },
        render: function (ctx, hash, emitter) {
            var filepath, template, originBlocks, originBlockMode, childCtx, _a, _b, templates;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!ctx.opts.dynamicPartials) return [3 /*break*/, 5];
                        if (!quotedLine.exec(this.value)) return [3 /*break*/, 2];
                        template = this.value.slice(1, -1);
                        return [4 /*yield*/, this.liquid._parseAndRender(template, ctx.getAll(), ctx.opts, ctx.sync)];
                    case 1:
                        filepath = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, new Expression(this.value).value(ctx)];
                    case 3:
                        filepath = _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        filepath = this.staticValue;
                        _c.label = 6;
                    case 6:
                        assert(filepath, "cannot render with empty filename");
                        originBlocks = ctx.getRegister('blocks');
                        originBlockMode = ctx.getRegister('blockMode');
                        childCtx = new Context({}, ctx.opts, ctx.sync);
                        childCtx.setRegister('blocks', {});
                        childCtx.setRegister('blockMode', BlockMode$1.OUTPUT);
                        if (!this.with) return [3 /*break*/, 8];
                        _a = hash;
                        _b = filepath;
                        return [4 /*yield*/, new Expression(this.with).evaluate(ctx)];
                    case 7:
                        _a[_b] = _c.sent();
                        _c.label = 8;
                    case 8:
                        childCtx.push(hash);
                        return [4 /*yield*/, this.liquid._parseFile(filepath, childCtx.opts, childCtx.sync)];
                    case 9:
                        templates = _c.sent();
                        return [4 /*yield*/, this.liquid.renderer.renderTemplates(templates, childCtx, emitter)];
                    case 10:
                        _c.sent();
                        childCtx.setRegister('blocks', originBlocks);
                        childCtx.setRegister('blockMode', originBlockMode);
                        return [2 /*return*/];
                }
            });
        }
    };

    var decrement = {
        parse: function (token) {
            var match = token.args.match(identifier);
            assert(match, "illegal identifier " + token.args);
            this.variable = match[0];
        },
        render: function (context, hash, emitter) {
            var scope = context.environments;
            if (!isNumber(scope[this.variable])) {
                scope[this.variable] = 0;
            }
            emitter.write(stringify(--scope[this.variable]));
        }
    };

    var groupRE = new RegExp("^(?:(" + value.source + ")\\s*:\\s*)?(.*)$");
    var candidatesRE = new RegExp(value.source, 'g');
    var cycle = {
        parse: function (tagToken) {
            var match = groupRE.exec(tagToken.args);
            assert(match, "illegal tag: " + tagToken.raw);
            this.group = new Expression(match[1]);
            var candidates = match[2];
            this.candidates = [];
            while ((match = candidatesRE.exec(candidates))) {
                this.candidates.push(match[0]);
            }
            assert(this.candidates.length, "empty candidates: " + tagToken.raw);
        },
        render: function (ctx, hash, emitter) {
            var group, fingerprint, groups, idx, candidate, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.group.value(ctx)];
                    case 1:
                        group = _a.sent();
                        fingerprint = "cycle:" + group + ":" + this.candidates.join(',');
                        groups = ctx.getRegister('cycle');
                        idx = groups[fingerprint];
                        if (idx === undefined) {
                            idx = groups[fingerprint] = 0;
                        }
                        candidate = this.candidates[idx];
                        idx = (idx + 1) % this.candidates.length;
                        groups[fingerprint] = idx;
                        return [4 /*yield*/, new Expression(candidate).value(ctx)];
                    case 2:
                        html = _a.sent();
                        emitter.write(html);
                        return [2 /*return*/];
                }
            });
        }
    };

    var If = {
        parse: function (tagToken, remainTokens) {
            var _this = this;
            this.branches = [];
            this.elseTemplates = [];
            var p;
            var stream = this.liquid.parser.parseStream(remainTokens)
                .on('start', function () { return _this.branches.push({
                cond: tagToken.args,
                templates: (p = [])
            }); })
                .on('tag:elsif', function (token) {
                _this.branches.push({
                    cond: token.args,
                    templates: p = []
                });
            })
                .on('tag:else', function () { return (p = _this.elseTemplates); })
                .on('tag:endif', function () { return stream.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        },
        render: function (ctx, hash, emitter) {
            var r, _a, _b, branch, cond, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        r = this.liquid.renderer;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, 8, 9]);
                        _a = __values(this.branches), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 6];
                        branch = _b.value;
                        return [4 /*yield*/, new Expression(branch.cond).value(ctx)];
                    case 3:
                        cond = _d.sent();
                        if (!isTruthy(cond)) return [3 /*break*/, 5];
                        return [4 /*yield*/, r.renderTemplates(branch.templates, ctx, emitter)];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, r.renderTemplates(this.elseTemplates, ctx, emitter)];
                    case 10:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }
    };

    var increment = {
        parse: function (token) {
            var match = token.args.match(identifier);
            assert(match, "illegal identifier " + token.args);
            this.variable = match[0];
        },
        render: function (context, hash, emitter) {
            var scope = context.environments;
            if (!isNumber(scope[this.variable])) {
                scope[this.variable] = 0;
            }
            var val = scope[this.variable];
            scope[this.variable]++;
            emitter.write(stringify(val));
        }
    };

    var staticFileRE$2 = /\S+/;
    var layout = {
        parse: function (token, remainTokens) {
            var match = staticFileRE$2.exec(token.args);
            if (match) {
                this.staticLayout = match[0];
            }
            match = value.exec(token.args);
            if (match) {
                this.layout = match[0];
            }
            this.tpls = this.liquid.parser.parse(remainTokens);
        },
        render: function (ctx, hash, emitter) {
            var layout, _a, blocks, r, html, templates, partial;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!ctx.opts.dynamicPartials) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Expression(this.layout).value(ctx)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this.staticLayout;
                        _b.label = 3;
                    case 3:
                        layout = _a;
                        assert(layout, "cannot apply layout with empty filename");
                        // render the remaining tokens immediately
                        ctx.setRegister('blockMode', BlockMode$1.STORE);
                        blocks = ctx.getRegister('blocks');
                        r = this.liquid.renderer;
                        return [4 /*yield*/, r.renderTemplates(this.tpls, ctx)];
                    case 4:
                        html = _b.sent();
                        if (blocks[''] === undefined) {
                            blocks[''] = html;
                        }
                        return [4 /*yield*/, this.liquid._parseFile(layout, ctx.opts, ctx.sync)];
                    case 5:
                        templates = _b.sent();
                        ctx.push(hash);
                        ctx.setRegister('blockMode', BlockMode$1.OUTPUT);
                        return [4 /*yield*/, r.renderTemplates(templates, ctx)];
                    case 6:
                        partial = _b.sent();
                        ctx.pop();
                        emitter.write(partial);
                        return [2 /*return*/];
                }
            });
        }
    };

    var block = {
        parse: function (token, remainTokens) {
            var _this = this;
            var match = /\w+/.exec(token.args);
            this.block = match ? match[0] : '';
            this.tpls = [];
            var stream = this.liquid.parser.parseStream(remainTokens)
                .on('tag:endblock', function () { return stream.stop(); })
                .on('template', function (tpl) { return _this.tpls.push(tpl); })
                .on('end', function () {
                throw new Error("tag " + token.raw + " not closed");
            });
            stream.start();
        },
        render: function (ctx, hash, emitter) {
            var blocks, childDefined, r, html, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        blocks = ctx.getRegister('blocks');
                        childDefined = blocks[this.block];
                        r = this.liquid.renderer;
                        if (!(childDefined !== undefined)) return [3 /*break*/, 1];
                        _a = childDefined;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, r.renderTemplates(this.tpls, ctx)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        html = _a;
                        if (ctx.getRegister('blockMode', BlockMode$1.OUTPUT) === BlockMode$1.STORE) {
                            blocks[this.block] = html;
                            return [2 /*return*/];
                        }
                        emitter.write(html);
                        return [2 /*return*/];
                }
            });
        }
    };

    var raw = {
        parse: function (tagToken, remainTokens) {
            var _this = this;
            this.tokens = [];
            var stream = this.liquid.parser.parseStream(remainTokens);
            stream
                .on('token', function (token) {
                if (token.name === 'endraw')
                    stream.stop();
                else
                    _this.tokens.push(token);
            })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        },
        render: function () {
            return this.tokens.map(function (token) { return token.raw; }).join('');
        }
    };

    var TablerowloopDrop = /** @class */ (function (_super) {
        __extends(TablerowloopDrop, _super);
        function TablerowloopDrop(length, cols) {
            var _this = _super.call(this, length) || this;
            _this.length = length;
            _this.cols = cols;
            return _this;
        }
        TablerowloopDrop.prototype.row = function () {
            return Math.floor(this.i / this.cols) + 1;
        };
        TablerowloopDrop.prototype.col0 = function () {
            return (this.i % this.cols);
        };
        TablerowloopDrop.prototype.col = function () {
            return this.col0() + 1;
        };
        TablerowloopDrop.prototype.col_first = function () {
            return this.col0() === 0;
        };
        TablerowloopDrop.prototype.col_last = function () {
            return this.col() === this.cols;
        };
        return TablerowloopDrop;
    }(ForloopDrop));

    var re$3 = new RegExp("^(" + identifier.source + ")\\s+in\\s+" +
        ("(" + value.source + ")") +
        ("(?:\\s+" + hash.source + ")*$"));
    var tablerow = {
        parse: function (tagToken, remainTokens) {
            var _this = this;
            var match = re$3.exec(tagToken.args);
            assert(match, "illegal tag: " + tagToken.raw);
            this.variable = match[1];
            this.collection = match[2];
            this.templates = [];
            var p;
            var stream = this.liquid.parser.parseStream(remainTokens)
                .on('start', function () { return (p = _this.templates); })
                .on('tag:endtablerow', function () { return stream.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        },
        render: function (ctx, hash, emitter) {
            var collection, offset, limit, cols, r, tablerowloop, scope, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Expression(this.collection).value(ctx)];
                    case 1:
                        collection = (_a.sent()) || [];
                        offset = hash.offset || 0;
                        limit = (hash.limit === undefined) ? collection.length : hash.limit;
                        collection = collection.slice(offset, offset + limit);
                        cols = hash.cols || collection.length;
                        r = this.liquid.renderer;
                        tablerowloop = new TablerowloopDrop(collection.length, cols);
                        scope = { tablerowloop: tablerowloop };
                        ctx.push(scope);
                        idx = 0;
                        _a.label = 2;
                    case 2:
                        if (!(idx < collection.length)) return [3 /*break*/, 5];
                        scope[this.variable] = collection[idx];
                        if (tablerowloop.col0() === 0) {
                            if (tablerowloop.row() !== 1)
                                emitter.write('</tr>');
                            emitter.write("<tr class=\"row" + tablerowloop.row() + "\">");
                        }
                        emitter.write("<td class=\"col" + tablerowloop.col() + "\">");
                        return [4 /*yield*/, r.renderTemplates(this.templates, ctx, emitter)];
                    case 3:
                        _a.sent();
                        emitter.write('</td>');
                        _a.label = 4;
                    case 4:
                        idx++, tablerowloop.next();
                        return [3 /*break*/, 2];
                    case 5:
                        if (collection.length)
                            emitter.write('</tr>');
                        ctx.pop();
                        return [2 /*return*/];
                }
            });
        }
    };

    var unless = {
        parse: function (tagToken, remainTokens) {
            var _this = this;
            this.templates = [];
            this.elseTemplates = [];
            var p;
            var stream = this.liquid.parser.parseStream(remainTokens)
                .on('start', function () {
                p = _this.templates;
                _this.cond = tagToken.args;
            })
                .on('tag:else', function () { return (p = _this.elseTemplates); })
                .on('tag:endunless', function () { return stream.stop(); })
                .on('template', function (tpl) { return p.push(tpl); })
                .on('end', function () {
                throw new Error("tag " + tagToken.raw + " not closed");
            });
            stream.start();
        },
        render: function (ctx, hash, emitter) {
            var r, cond;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = this.liquid.renderer;
                        return [4 /*yield*/, new Expression(this.cond).value(ctx)];
                    case 1:
                        cond = _a.sent();
                        return [4 /*yield*/, (isFalsy(cond)
                                ? r.renderTemplates(this.templates, ctx, emitter)
                                : r.renderTemplates(this.elseTemplates, ctx, emitter))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }
    };

    var Break = {
        render: function (ctx, hash, emitter) {
            emitter.break = true;
        }
    };

    var Continue = {
        render: function (ctx, hash, emitter) {
            emitter.continue = true;
        }
    };

    var tags = {
        assign: assign, 'for': For, capture: capture, 'case': Case, comment: comment, include: include, render: render, decrement: decrement, increment: increment, cycle: cycle, 'if': If, layout: layout, block: block, raw: raw, tablerow: tablerow, unless: unless, 'break': Break, 'continue': Continue
    };

    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&#34;',
        "'": '&#39;'
    };
    var unescapeMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#34;': '"',
        '&#39;': "'"
    };
    function escape(str) {
        return stringify(str).replace(/&|<|>|"|'/g, function (m) { return escapeMap[m]; });
    }
    function unescape(str) {
        return String(str).replace(/&(amp|lt|gt|#34|#39);/g, function (m) { return unescapeMap[m]; });
    }
    var html = {
        'escape': escape,
        'escape_once': function (str) { return escape(unescape(str)); },
        'newline_to_br': function (v) { return v.replace(/\n/g, '<br />'); },
        'strip_html': function (v) { return v.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g, ''); }
    };

    /**
     * String related filters
     *
     * * prefer stringify() to String() since `undefined`, `null` should eval ''
     */
    var str = {
        'append': function (v, arg) { return stringify(v) + stringify(arg); },
        'prepend': function (v, arg) { return stringify(arg) + stringify(v); },
        'capitalize': capitalize,
        'lstrip': function (v) { return stringify(v).replace(/^\s+/, ''); },
        'downcase': function (v) { return stringify(v).toLowerCase(); },
        'upcase': function (str) { return stringify(str).toUpperCase(); },
        'remove': function (v, arg) { return stringify(v).split(arg).join(''); },
        'remove_first': function (v, l) { return stringify(v).replace(l, ''); },
        'replace': replace,
        'replace_first': replaceFirst,
        'rstrip': function (str) { return stringify(str).replace(/\s+$/, ''); },
        'split': function (v, arg) { return stringify(v).split(arg); },
        'strip': function (v) { return stringify(v).trim(); },
        'strip_newlines': function (v) { return stringify(v).replace(/\n/g, ''); },
        'truncate': truncate,
        'truncatewords': truncateWords
    };
    function capitalize(str) {
        str = stringify(str);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function replace(v, pattern, replacement) {
        return stringify(v).split(pattern).join(replacement);
    }
    function replaceFirst(v, arg1, arg2) {
        return stringify(v).replace(arg1, arg2);
    }
    function truncate(v, l, o) {
        if (l === void 0) { l = 50; }
        if (o === void 0) { o = '...'; }
        v = stringify(v);
        if (v.length <= l)
            return v;
        return v.substr(0, l - o.length) + o;
    }
    function truncateWords(v, l, o) {
        if (l === void 0) { l = 15; }
        if (o === void 0) { o = '...'; }
        var arr = v.split(/\s+/);
        var ret = arr.slice(0, l).join(' ');
        if (arr.length >= l)
            ret += o;
        return ret;
    }

    var toLowerCase = String.prototype.toLowerCase;
    var math = {
        'abs': function (v) { return Math.abs(v); },
        'at_least': function (v, n) { return Math.max(v, n); },
        'at_most': function (v, n) { return Math.min(v, n); },
        'ceil': function (v) { return Math.ceil(v); },
        'divided_by': function (v, arg) { return v / arg; },
        'floor': function (v) { return Math.floor(v); },
        'minus': function (v, arg) { return v - arg; },
        'modulo': function (v, arg) { return v % arg; },
        'round': function (v, arg) {
            if (arg === void 0) { arg = 0; }
            var amp = Math.pow(10, arg);
            return Math.round(v * amp) / amp;
        },
        'plus': function (v, arg) { return Number(v) + Number(arg); },
        'sort_natural': sortNatural,
        'times': function (v, arg) { return v * arg; }
    };
    function caseInsensitiveCmp(a, b) {
        if (!b)
            return -1;
        if (!a)
            return 1;
        a = toLowerCase.call(a);
        b = toLowerCase.call(b);
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    }
    function sortNatural(input, property) {
        if (!input || !input.sort)
            return [];
        if (property !== undefined) {
            return __spread(input).sort(function (lhs, rhs) { return caseInsensitiveCmp(lhs[property], rhs[property]); });
        }
        return __spread(input).sort(caseInsensitiveCmp);
    }

    var url = {
        'url_decode': function (x) { return x.split('+').map(decodeURIComponent).join(' '); },
        'url_encode': function (x) { return x.split(' ').map(encodeURIComponent).join('+'); }
    };

    var array = {
        'join': function (v, arg) { return v.join(arg === undefined ? ' ' : arg); },
        'last': function (v) { return isArray(v) ? last(v) : ''; },
        'first': function (v) { return isArray(v) ? v[0] : ''; },
        'map': map,
        'reverse': function (v) { return __spread(v).reverse(); },
        'sort': function (v, arg) { return v.sort(arg); },
        'size': function (v) { return (v && v.length) || 0; },
        'concat': concat,
        'slice': slice,
        'uniq': uniq,
        'where': where
    };
    function map(arr, arg) {
        return arr.map(function (v) { return v[arg]; });
    }
    function concat(v, arg) {
        return Array.prototype.concat.call(v, arg);
    }
    function slice(v, begin, length) {
        if (length === void 0) { length = 1; }
        begin = begin < 0 ? v.length + begin : begin;
        return v.slice(begin, begin + length);
    }
    function where(arr, property, expected) {
        var _this = this;
        return arr.filter(function (obj) {
            var value = _this.context.getFromScope(obj, property);
            return expected === undefined ? isTruthy(value) : value === expected;
        });
    }
    function uniq(arr) {
        var u = {};
        return (arr || []).filter(function (val) {
            if (u.hasOwnProperty(String(val)))
                return false;
            u[String(val)] = true;
            return true;
        });
    }

    var rFormat = /%([-_0^#:]+)?(\d+)?([EO])?(.)/;
    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    var dayNames = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    var monthNamesShort = monthNames.map(abbr);
    var dayNamesShort = dayNames.map(abbr);
    var suffixes = {
        1: 'st',
        2: 'nd',
        3: 'rd',
        'default': 'th'
    };
    function abbr(str) {
        return str.slice(0, 3);
    }
    // prototype extensions
    function daysInMonth(d) {
        var feb = isLeapYear(d) ? 29 : 28;
        return [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    function getDayOfYear(d) {
        var num = 0;
        for (var i = 0; i < d.getMonth(); ++i) {
            num += daysInMonth(d)[i];
        }
        return num + d.getDate();
    }
    function getWeekOfYear(d, startDay) {
        // Skip to startDay of this week
        var now = getDayOfYear(d) + (startDay - d.getDay());
        // Find the first startDay of the year
        var jan1 = new Date(d.getFullYear(), 0, 1);
        var then = (7 - jan1.getDay() + startDay);
        return String(Math.floor((now - then) / 7) + 1);
    }
    function isLeapYear(d) {
        var year = d.getFullYear();
        return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
    }
    function getSuffix(d) {
        var str = d.getDate().toString();
        var index = parseInt(str.slice(-1));
        return suffixes[index] || suffixes['default'];
    }
    function century(d) {
        return parseInt(d.getFullYear().toString().substring(0, 2), 10);
    }
    // default to 0
    var padWidths = {
        d: 2,
        e: 2,
        H: 2,
        I: 2,
        j: 3,
        k: 2,
        l: 2,
        L: 3,
        m: 2,
        M: 2,
        S: 2,
        U: 2,
        W: 2
    };
    // default to '0'
    var padChars = {
        a: ' ',
        A: ' ',
        b: ' ',
        B: ' ',
        c: ' ',
        e: ' ',
        k: ' ',
        l: ' ',
        p: ' ',
        P: ' '
    };
    var formatCodes = {
        a: function (d) { return dayNamesShort[d.getDay()]; },
        A: function (d) { return dayNames[d.getDay()]; },
        b: function (d) { return monthNamesShort[d.getMonth()]; },
        B: function (d) { return monthNames[d.getMonth()]; },
        c: function (d) { return d.toLocaleString(); },
        C: function (d) { return century(d); },
        d: function (d) { return d.getDate(); },
        e: function (d) { return d.getDate(); },
        H: function (d) { return d.getHours(); },
        I: function (d) { return String(d.getHours() % 12 || 12); },
        j: function (d) { return getDayOfYear(d); },
        k: function (d) { return d.getHours(); },
        l: function (d) { return String(d.getHours() % 12 || 12); },
        L: function (d) { return d.getMilliseconds(); },
        m: function (d) { return d.getMonth() + 1; },
        M: function (d) { return d.getMinutes(); },
        N: function (d, opts) {
            var width = Number(opts.width) || 9;
            var str = String(d.getMilliseconds()).substr(0, width);
            return padEnd(str, width, '0');
        },
        p: function (d) { return (d.getHours() < 12 ? 'AM' : 'PM'); },
        P: function (d) { return (d.getHours() < 12 ? 'am' : 'pm'); },
        q: function (d) { return getSuffix(d); },
        s: function (d) { return Math.round(d.valueOf() / 1000); },
        S: function (d) { return d.getSeconds(); },
        u: function (d) { return d.getDay() || 7; },
        U: function (d) { return getWeekOfYear(d, 0); },
        w: function (d) { return d.getDay(); },
        W: function (d) { return getWeekOfYear(d, 1); },
        x: function (d) { return d.toLocaleDateString(); },
        X: function (d) { return d.toLocaleTimeString(); },
        y: function (d) { return d.getFullYear().toString().substring(2, 4); },
        Y: function (d) { return d.getFullYear(); },
        z: function (d, opts) {
            var offset = d.getTimezoneOffset();
            var nOffset = Math.abs(offset);
            var h = Math.floor(nOffset / 60);
            var m = nOffset % 60;
            return (offset > 0 ? '-' : '+') +
                padStart(h, 2, '0') +
                (opts.flags[':'] ? ':' : '') +
                padStart(m, 2, '0');
        },
        't': function () { return '\t'; },
        'n': function () { return '\n'; },
        '%': function () { return '%'; }
    };
    formatCodes.h = formatCodes.b;
    function strftime (d, formatStr) {
        var output = '';
        var remaining = formatStr;
        var match;
        while ((match = rFormat.exec(remaining))) {
            output += remaining.slice(0, match.index);
            remaining = remaining.slice(match.index + match[0].length);
            output += format(d, match);
        }
        return output + remaining;
    }
    function format(d, match) {
        var e_1, _a;
        var _b = __read(match, 5), input = _b[0], _c = _b[1], flagStr = _c === void 0 ? '' : _c, width = _b[2], modifier = _b[3], conversion = _b[4];
        var convert = formatCodes[conversion];
        if (!convert)
            return input;
        var flags = {};
        try {
            for (var flagStr_1 = __values(flagStr), flagStr_1_1 = flagStr_1.next(); !flagStr_1_1.done; flagStr_1_1 = flagStr_1.next()) {
                var flag = flagStr_1_1.value;
                flags[flag] = true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (flagStr_1_1 && !flagStr_1_1.done && (_a = flagStr_1.return)) _a.call(flagStr_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var ret = String(convert(d, { flags: flags, width: width, modifier: modifier }));
        var padChar = padChars[conversion] || '0';
        var padWidth = width || padWidths[conversion] || 0;
        if (flags['^'])
            ret = ret.toUpperCase();
        else if (flags['#'])
            ret = changeCase(ret);
        if (flags['_'])
            padChar = ' ';
        else if (flags['0'])
            padChar = '0';
        if (flags['-'])
            padWidth = 0;
        return padStart(ret, padWidth, padChar);
    }

    var date = {
        'date': function (v, arg) {
            var date = v;
            if (v === 'now') {
                date = new Date();
            }
            else if (isNumber(v)) {
                date = new Date(v * 1000);
            }
            else if (isString(v)) {
                date = /^\d+$/.test(v) ? new Date(+v * 1000) : new Date(v);
            }
            return isValidDate(date) ? strftime(date, arg) : v;
        }
    };
    function isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    var obj = {
        'default': function (v, arg) {
            return isFalsy(toValue(v)) || v === '' ? arg : v;
        }
    };

    var builtinFilters = __assign({}, html, str, math, url, date, obj, array);

    function mkResolve(value) {
        var ret = {
            then: function (resolve) { return resolve(value); },
            catch: function () { return ret; }
        };
        return ret;
    }
    function mkReject(err) {
        var ret = {
            then: function (resolve, reject) {
                if (reject)
                    return reject(err);
                return ret;
            },
            catch: function (reject) { return reject(err); }
        };
        return ret;
    }
    function isThenable(val) {
        return val && isFunction(val.then);
    }
    function isCustomIterable(val) {
        return val && isFunction(val.next) && isFunction(val.throw) && isFunction(val.return);
    }
    function toThenable(val) {
        if (isThenable(val))
            return val;
        if (isCustomIterable(val))
            return reduce();
        return mkResolve(val);
        function reduce(prev) {
            var state;
            try {
                state = val.next(prev);
            }
            catch (err) {
                return mkReject(err);
            }
            if (state.done)
                return mkResolve(state.value);
            return toThenable(state.value).then(reduce, function (err) {
                var state;
                try {
                    state = val.throw(err);
                }
                catch (e) {
                    return mkReject(e);
                }
                if (state.done)
                    return mkResolve(state.value);
                return reduce(state.value);
            });
        }
    }
    function toValue$1(val) {
        var ret;
        toThenable(val)
            .then(function (x) {
            ret = x;
            return mkResolve(ret);
        })
            .catch(function (err) {
            throw err;
        });
        return ret;
    }

    var Liquid = /** @class */ (function () {
        function Liquid(opts) {
            var _this = this;
            if (opts === void 0) { opts = {}; }
            this.cache = {};
            this.options = applyDefault(normalize(opts));
            this.parser = new Parser(this);
            this.renderer = new Render();
            this.tokenizer = new Tokenizer(this.options);
            this.fs = opts.fs || fs;
            forOwn(tags, function (conf, name) { return _this.registerTag(name, conf); });
            forOwn(builtinFilters, function (handler, name) { return _this.registerFilter(name, handler); });
        }
        Liquid.prototype.parse = function (html, filepath) {
            var tokens = this.tokenizer.tokenize(html, filepath);
            return this.parser.parse(tokens);
        };
        Liquid.prototype._render = function (tpl, scope, opts, sync) {
            var options = __assign({}, this.options, normalize(opts));
            var ctx = new Context(scope, options, sync);
            return this.renderer.renderTemplates(tpl, ctx);
        };
        Liquid.prototype.render = function (tpl, scope, opts) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toThenable(this._render(tpl, scope, opts, false))];
                });
            });
        };
        Liquid.prototype.renderSync = function (tpl, scope, opts) {
            return toValue$1(this._render(tpl, scope, opts, true));
        };
        Liquid.prototype._parseAndRender = function (html, scope, opts, sync) {
            var tpl = this.parse(html);
            return this._render(tpl, scope, opts, sync);
        };
        Liquid.prototype.parseAndRender = function (html, scope, opts) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toThenable(this._parseAndRender(html, scope, opts, false))];
                });
            });
        };
        Liquid.prototype.parseAndRenderSync = function (html, scope, opts) {
            return toValue$1(this._parseAndRender(html, scope, opts, true));
        };
        Liquid.prototype._parseFile = function (file, opts, sync) {
            var options, paths, filepath, paths_1, paths_1_1, filepath, _a, tpl, _b, _c, e_1_1;
            var e_1, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        options = __assign({}, this.options, normalize(opts));
                        paths = options.root.map(function (root) { return _this.fs.resolve(root, file, options.extname); });
                        if (this.fs.fallback !== undefined) {
                            filepath = this.fs.fallback(file);
                            if (filepath !== undefined)
                                paths.push(filepath);
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 11, 12, 13]);
                        paths_1 = __values(paths), paths_1_1 = paths_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!paths_1_1.done) return [3 /*break*/, 10];
                        filepath = paths_1_1.value;
                        if (this.options.cache && this.cache[filepath])
                            return [2 /*return*/, this.cache[filepath]];
                        if (!sync) return [3 /*break*/, 3];
                        _a = this.fs.existsSync(filepath);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.fs.exists(filepath)];
                    case 4:
                        _a = _e.sent();
                        _e.label = 5;
                    case 5:
                        if (!(_a))
                            return [3 /*break*/, 9];
                        _b = this.parse;
                        if (!sync) return [3 /*break*/, 6];
                        _c = this.fs.readFileSync(filepath);
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.fs.readFile(filepath)];
                    case 7:
                        _c = _e.sent();
                        _e.label = 8;
                    case 8:
                        tpl = _b.apply(this, [_c, filepath]);
                        return [2 /*return*/, (this.cache[filepath] = tpl)];
                    case 9:
                        paths_1_1 = paths_1.next();
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (paths_1_1 && !paths_1_1.done && (_d = paths_1.return)) _d.call(paths_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13: throw this.lookupError(file, options.root);
                }
            });
        };
        Liquid.prototype.parseFile = function (file, opts) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toThenable(this._parseFile(file, opts, false))];
                });
            });
        };
        Liquid.prototype.parseFileSync = function (file, opts) {
            return toValue$1(this._parseFile(file, opts, true));
        };
        Liquid.prototype.renderFile = function (file, ctx, opts) {
            return __awaiter(this, void 0, void 0, function () {
                var templates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.parseFile(file, opts)];
                        case 1:
                            templates = _a.sent();
                            return [2 /*return*/, this.render(templates, ctx, opts)];
                    }
                });
            });
        };
        Liquid.prototype.renderFileSync = function (file, ctx, opts) {
            var options = normalize(opts);
            var templates = this.parseFileSync(file, options);
            return this.renderSync(templates, ctx, opts);
        };
        Liquid.prototype._evalValue = function (str, ctx) {
            var value = new Value$1(str, this.options.strictFilters);
            return value.value(ctx);
        };
        Liquid.prototype.evalValue = function (str, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, toThenable(this._evalValue(str, ctx))];
                });
            });
        };
        Liquid.prototype.evalValueSync = function (str, ctx) {
            return toValue$1(this._evalValue(str, ctx));
        };
        Liquid.prototype.registerFilter = function (name, filter) {
            return Filter.register(name, filter);
        };
        Liquid.prototype.registerTag = function (name, tag) {
            return Tag.register(name, tag);
        };
        Liquid.prototype.plugin = function (plugin) {
            return plugin.call(this, Liquid);
        };
        Liquid.prototype.express = function () {
            var self = this; // eslint-disable-line
            return function (filePath, ctx, cb) {
                var opts = { root: __spread(normalizeStringArray(this.root), self.options.root) };
                self.renderFile(filePath, ctx, opts).then(function (html) { return cb(null, html); }, cb);
            };
        };
        Liquid.prototype.lookupError = function (file, roots) {
            var err = new Error('ENOENT');
            err.message = "ENOENT: Failed to lookup \"" + file + "\" in \"" + roots + "\"";
            err.code = 'ENOENT';
            return err;
        };
        /**
         * @deprecated use parseFile instead
         */
        Liquid.prototype.getTemplate = function (file, opts) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.parseFile(file, opts)];
                });
            });
        };
        /**
         * @deprecated use parseFileSync instead
         */
        Liquid.prototype.getTemplateSync = function (file, opts) {
            return this.parseFileSync(file, opts);
        };
        return Liquid;
    }());

    exports.AssertionError = AssertionError;
    exports.Context = Context;
    exports.Drop = Drop;
    exports.Emitter = Emitter;
    exports.Expression = Expression;
    exports.Hash = Hash;
    exports.Liquid = Liquid;
    exports.ParseError = ParseError;
    exports.ParseStream = ParseStream;
    exports.TagToken = TagToken;
    exports.Token = Token;
    exports.TokenizationError = TokenizationError;
    exports.isFalsy = isFalsy;
    exports.isTruthy = isTruthy;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

});

var liquid$1 = unwrapExports(liquid);

export default liquid$1;
