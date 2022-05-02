"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            BinaryExpression: function BinaryExpression(path) {
                var node = path.node;

                if (node.operator === "instanceof") {
                    path.replaceWith(t.callExpression(this.addHelper("instanceof"), [node.left, node.right]));
                }
            }
        }
    };
};

module.exports = exports["default"];
