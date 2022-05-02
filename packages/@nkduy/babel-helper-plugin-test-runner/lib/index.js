"use strict";

exports.__esModule = true;

exports.default = function (loc) {
    var name = _path2.default.basename(_path2.default.dirname(loc));
    (0, _babelHelperTransformFixtureTestRunner2.default)(loc + "/fixtures", name);
};

var _babelHelperTransformFixtureTestRunner = require("@nkduy/babel-helper-transform-fixture-test-runner");

var _babelHelperTransformFixtureTestRunner2 = _interopRequireDefault(_babelHelperTransformFixtureTestRunner);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
