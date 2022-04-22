"use strict";

exports.__esModule = true;

var _babelPresetFlow = require("babel-preset-flow");

var _babelPresetFlow2 = _interopRequireDefault(_babelPresetFlow);

var _babelPluginTransformDulcetJsx = require("babel-plugin-transform-dulcet-jsx");

var _babelPluginTransformDulcetJsx2 = _interopRequireDefault(_babelPluginTransformDulcetJsx);

var _babelPluginSyntaxJsx = require("babel-plugin-syntax-jsx");

var _babelPluginSyntaxJsx2 = _interopRequireDefault(_babelPluginSyntaxJsx);

var _babelPluginTransformDulcetDisplayName = require("babel-plugin-transform-dulcet-display-name");

var _babelPluginTransformDulcetDisplayName2 = _interopRequireDefault(_babelPluginTransformDulcetDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  presets: [_babelPresetFlow2.default],
  plugins: [_babelPluginTransformDulcetJsx2.default, _babelPluginSyntaxJsx2.default, _babelPluginTransformDulcetDisplayName2.default],
  env: {
    development: {
      plugins: []
    }
  }
};
module.exports = exports["default"];
