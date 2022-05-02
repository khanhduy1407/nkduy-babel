"use strict";

exports.__esModule = true;

var _getIterator2 = require("@nkduy/babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = get;
exports.multiple = multiple;
exports.readFile = readFile;

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _trimEnd = require("lodash/trimEnd");

var _trimEnd2 = _interopRequireDefault(_trimEnd);

var _tryResolve = require("try-resolve");

var _tryResolve2 = _interopRequireDefault(_tryResolve);

var _clone = require("lodash/clone");

var _clone2 = _interopRequireDefault(_clone);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function humanize(val, noext) {
    if (noext) val = _path2.default.basename(val, _path2.default.extname(val));
    return val.replace(/-/g, " ");
}

function assertDirectory(loc) {
    if (!_fs2.default.statSync(loc).isDirectory()) {
        throw new Error("Expected " + loc + " to be a directory.");
    }
}

function shouldIgnore(name, blacklist) {
    if (blacklist && blacklist.indexOf(name) >= 0) {
        return true;
    }

    var ext = _path2.default.extname(name);
    var base = _path2.default.basename(name, ext);

    return name[0] === "." || ext === ".md" || base === "LICENSE" || base === "options";
}

function get(entryLoc) {
    var suites = [];

    var rootOpts = {};
    var rootOptsLoc = (0, _tryResolve2.default)(entryLoc + "/options");
    if (rootOptsLoc) rootOpts = require(rootOptsLoc);

    var _loop = function _loop() {
        if (_isArray) {
            if (_i >= _iterator.length) return "break";
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) return "break";
            _ref = _i.value;
        }

        var suiteName = _ref;

        if (shouldIgnore(suiteName)) return "continue";

        var suite = {
            options: (0, _clone2.default)(rootOpts),
            tests: [],
            title: humanize(suiteName),
            filename: entryLoc + "/" + suiteName
        };

        assertDirectory(suite.filename);
        suites.push(suite);

        var suiteOptsLoc = (0, _tryResolve2.default)(suite.filename + "/options");
        if (suiteOptsLoc) suite.options = require(suiteOptsLoc);

        for (var _iterator2 = _fs2.default.readdirSync(suite.filename), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var taskName = _ref2;

            push(taskName, suite.filename + "/" + taskName);
        }

        function push(taskName, taskDir) {
            var actualLocAlias = suiteName + "/" + taskName + "/actual.js";
            var expectLocAlias = suiteName + "/" + taskName + "/expected.js";
            var execLocAlias = suiteName + "/" + taskName + "/exec.js";

            var actualLoc = taskDir + "/actual.js";
            var expectLoc = taskDir + "/expected.js";
            var execLoc = taskDir + "/exec.js";

            if (_fs2.default.statSync(taskDir).isFile()) {
                var ext = _path2.default.extname(taskDir);
                if (ext !== ".js" && ext !== ".module.js") return;

                execLoc = taskDir;
            }

            if (_tryResolve2.default.relative(expectLoc + "on")) {
                expectLoc += "on";
                expectLocAlias += "on";
            }

            var taskOpts = (0, _cloneDeep2.default)(suite.options);

            var taskOptsLoc = (0, _tryResolve2.default)(taskDir + "/options");
            if (taskOptsLoc) (0, _merge2.default)(taskOpts, require(taskOptsLoc));

            var test = {
                optionsDir: taskOptsLoc ? _path2.default.dirname(taskOptsLoc) : null,
                title: humanize(taskName, true),
                disabled: taskName[0] === ".",
                options: taskOpts,
                exec: {
                    loc: execLoc,
                    code: readFile(execLoc),
                    filename: execLocAlias
                },
                actual: {
                    loc: actualLoc,
                    code: readFile(actualLoc),
                    filename: actualLocAlias
                },
                expect: {
                    loc: expectLoc,
                    code: readFile(expectLoc),
                    filename: expectLocAlias
                }
            };

            if (test.exec.code.indexOf("// Async.") >= 0) {
                return;
            }

            suite.tests.push(test);

            var sourceMappingsLoc = taskDir + "/source-mappings.json";
            if (_fs2.default.existsSync(sourceMappingsLoc)) {
                test.sourceMappings = JSON.parse(readFile(sourceMappingsLoc));
            }

            var sourceMapLoc = taskDir + "/source-map.json";
            if (_fs2.default.existsSync(sourceMapLoc)) {
                test.sourceMap = JSON.parse(readFile(sourceMapLoc));
            }
        }
    };

    _loop2: for (var _iterator = _fs2.default.readdirSync(entryLoc), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref;

        var _ret = _loop();

        switch (_ret) {
            case "break":
                break _loop2;

            case "continue":
                continue;}
    }

    return suites;
}

function multiple(entryLoc, ignore) {
    var categories = {};

    for (var _iterator3 = _fs2.default.readdirSync(entryLoc), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
        var _ref3;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
        }

        var name = _ref3;

        if (shouldIgnore(name, ignore)) continue;

        var _loc = _path2.default.join(entryLoc, name);
        assertDirectory(_loc);

        categories[name] = get(_loc);
    }

    return categories;
}

function readFile(filename) {
    if (_fs2.default.existsSync(filename)) {
        var file = (0, _trimEnd2.default)(_fs2.default.readFileSync(filename, "utf8"));
        file = file.replace(/\r\n/g, "\n");
        return file;
    } else {
        return "";
    }
}
