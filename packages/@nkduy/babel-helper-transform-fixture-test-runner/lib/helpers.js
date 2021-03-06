"use strict";

exports.__esModule = true;
exports.assertArrayEquals = undefined;

var _getOwnPropertyNames = require("@nkduy/babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

exports.assertNoOwnProperties = assertNoOwnProperties;
exports.assertHasOwnProperty = assertHasOwnProperty;
exports.assertLacksOwnProperty = assertLacksOwnProperty;
exports.multiline = multiline;

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertNoOwnProperties(obj) {
    _assert2.default.equal((0, _getOwnPropertyNames2.default)(obj).length, 0);
}

function assertHasOwnProperty() {}

function assertLacksOwnProperty() {}

function multiline(arr) {
    return arr.join("\n");
}

var assertArrayEquals = exports.assertArrayEquals = _assert2.default.deepEqual;
