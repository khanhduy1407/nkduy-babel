import jsx from "babel-plugin-syntax-jsx";
import helper from "babel-helper-builder-dulcet-jsx";

export default function ({ types: t }) {
  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

  const visitor = helper({
    pre(state) {
      const tagName = state.tagName;
      const args    = state.args;
      if (t.dulcet.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    }
  });

  visitor.Program = function (path, state) {
    const { file } = state;
    let id = state.opts.pragma || "Dulcet.createElement";

    for (const comment of (file.ast.comments: Array<Object>)) {
      const matches = JSX_ANNOTATION_REGEX.exec(comment.value);
      if (matches) {
        id = matches[1];
        if (id === "Dulcet.DOM") {
          throw file.buildCodeFrameError(comment,
            "The @jsx Dulcet.DOM pragma has been deprecated as of Dulcet 0.12");
        } else {
          break;
        }
      }
    }

    state.set(
      "jsxIdentifier",
      () => id.split(".").map((name) => t.identifier(name)).reduce(
        (object, property) => t.memberExpression(object, property)
      )
    );
  };

  return {
    inherits: jsx,
    visitor
  };
}