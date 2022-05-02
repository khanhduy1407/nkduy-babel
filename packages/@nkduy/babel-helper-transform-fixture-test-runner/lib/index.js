"use strict";

exports.__esModule = true;

var _getIterator2 = require("@nkduy/babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _values = require("@nkduy/babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _keys = require("@nkduy/babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require("@nkduy/babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require("@nkduy/babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (fixturesLoc, name) {
    var suiteOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var taskOpts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var dynamicOpts = arguments[4];

    var suites = (0, _babelHelperFixtures2.default)(fixturesLoc);

    var _loop = function _loop() {
        if (_isArray) {
            if (_i >= _iterator.length) return "break";
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) return "break";
            _ref = _i.value;
        }

        var testSuite = _ref;

        if ((0, _includes2.default)(suiteOpts.ignoreSuites, testSuite.title)) return "continue";

        describe(name + "/" + testSuite.title, function () {
            var _loop3 = function _loop3() {
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) return "break";
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) return "break";
                    _ref2 = _i2.value;
                }

                var task = _ref2;

                if ((0, _includes2.default)(suiteOpts.ignoreTasks, task.title) || (0, _includes2.default)(suiteOpts.ignoreTasks, testSuite.title + "/" + task.title)) return "continue";

                it(task.title, !task.disabled && function () {
                    function runTask() {
                        run(task);
                    }

                    (0, _defaults2.default)(task.options, {
                        filenameRelative: task.expect.filename,
                        sourceFileName: task.actual.filename,
                        sourceMapTarget: task.expect.filename,
                        suppressDeprecationMessages: true,
                        babelrc: false,
                        sourceMap: !!(task.sourceMappings || task.sourceMap)
                    });

                    (0, _extend2.default)(task.options, taskOpts);

                    if (dynamicOpts) dynamicOpts(task.options, task);

                    var throwMsg = task.options.throws;
                    if (throwMsg) {
                        delete task.options.throws;

                        _assert2.default.throws(runTask, function (err) {
                            return throwMsg === true || err.message.indexOf(throwMsg) >= 0;
                        });
                    } else {
                        if (task.exec.code) {
                            var result = run(task);
                            if (result && typeof result.then === "function") {
                                return result;
                            }
                        } else {
                            runTask();
                        }
                    }
                });
            };

            _loop4: for (var _iterator2 = testSuite.tests, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
                var _ref2;

                var _ret2 = _loop3();

                switch (_ret2) {
                    case "break":
                        break _loop4;

                    case "continue":
                        continue;}
            }
        });
    };

    _loop2: for (var _iterator = suites, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref;

        var _ret = _loop();

        switch (_ret) {
            case "break":
                break _loop2;

            case "continue":
                continue;}
    }
};

var _babelCore = require("@nkduy/babel-core");

var babel = _interopRequireWildcard(_babelCore);

var _babelHelperFixtures = require("@nkduy/babel-helper-fixtures");

var _babelHelperFixtures2 = _interopRequireDefault(_babelHelperFixtures);

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _babelCodeFrame = require("babel-code-frame");

var _babelCodeFrame2 = _interopRequireDefault(_babelCodeFrame);

var _defaults = require("lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _helpers = require("./helpers");

var helpers = _interopRequireWildcard(_helpers);

var _extend = require("lodash/extend");

var _extend2 = _interopRequireDefault(_extend);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

require("@nkduy/babel-polyfill");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelHelpers = eval((0, _babelCore.buildExternalHelpers)(null, "var"));

function wrapPackagesArray(type, names, optionsDir) {
    return (names || []).map(function (val) {
        if (typeof val === "string") val = [val];

        if (val[0][0] === ".") {

            if (!optionsDir) {
                throw new Error("Please provide an options.json in test dir when using a " + "relative plugin path.");
            }

            val[0] = _path2.default.resolve(optionsDir, val[0]);
        } else {
            val[0] = __dirname + "/../../@nkduy/babel-" + type + "-" + val[0];
        }

        return val;
    });
}

function run(task) {
    var actual = task.actual;
    var expect = task.expect;
    var exec = task.exec;
    var opts = task.options;
    var optionsDir = task.optionsDir;

    function getOpts(self) {
        var newOpts = (0, _merge2.default)({
            filename: self.loc
        }, opts);

        newOpts.plugins = wrapPackagesArray("plugin", newOpts.plugins, optionsDir);
        newOpts.presets = wrapPackagesArray("preset", newOpts.presets, optionsDir).map(function (val) {
            if (val.length > 2) {
                throw new Error("Unexpected extra options " + (0, _stringify2.default)(val.slice(2)) + " passed to preset.");
            }

            return val;
        });

        return newOpts;
    }

    var execCode = exec.code;
    var result = void 0;
    var resultExec = void 0;

    if (execCode) {
        var execOpts = getOpts(exec);
        var execDirName = _path2.default.dirname(exec.loc);
        result = babel.transform(execCode, execOpts);
        execCode = result.code;

        try {
            resultExec = runExec(execOpts, execCode, execDirName);
        } catch (err) {
            err.message = exec.loc + ": " + err.message;
            err.message += (0, _babelCodeFrame2.default)(execCode);
            throw err;
        }
    }

    var actualCode = actual.code;
    var expectCode = expect.code;
    if (!execCode || actualCode) {
        result = babel.transform(actualCode, getOpts(actual));
        if (!expect.code && result.code && !opts.throws && _fs2.default.statSync(_path2.default.dirname(expect.loc)).isDirectory() && !process.env.CI) {
            console.log("New test file created: " + expect.loc);
            _fs2.default.writeFileSync(expect.loc, result.code);
        } else {
            actualCode = result.code.trim();
            _chai2.default.expect(actualCode).to.be.equal(expectCode, actual.loc + " !== " + expect.loc);
        }
    }

    if (task.sourceMap) {
        _chai2.default.expect(result.map).to.deep.equal(task.sourceMap);
    }

    if (task.sourceMappings) {
        var consumer = new _sourceMap2.default.SourceMapConsumer(result.map);

        task.sourceMappings.forEach(function (mapping) {
            var actual = mapping.original;

            var expect = consumer.originalPositionFor(mapping.generated);
            _chai2.default.expect({ line: expect.line, column: expect.column }).to.deep.equal(actual);
        });
    }

    if (execCode && resultExec) {
        return resultExec;
    }
}

function runExec(opts, execCode, execDirname) {
    var sandbox = (0, _extends3.default)({}, helpers, {
        babelHelpers: babelHelpers,
        assert: _chai2.default.assert,
        transform: babel.transform,
        opts: opts,
        exports: {},
        require: function (_require) {
            function require(_x) {
                return _require.apply(this, arguments);
            }

            require.toString = function () {
                return _require.toString();
            };

            return require;
        }(function (id) {
            return require(id[0] === "." ? _path2.default.resolve(execDirname, id) : id);
        })
    });

    var fn = new (Function.prototype.bind.apply(Function, [null].concat((0, _keys2.default)(sandbox), [execCode])))();
    return fn.apply(null, (0, _values2.default)(sandbox));
}

module.exports = exports["default"];
