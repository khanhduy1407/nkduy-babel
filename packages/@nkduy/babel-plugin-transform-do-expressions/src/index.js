export default function () {
  return {
    inherits: require("@nkduy/babel-plugin-syntax-do-expressions"),

    visitor: {
      DoExpression(path) {
        const body = path.node.body.body;
        if (body.length) {
          path.replaceWithMultiple(body);
        } else {
          path.replaceWith(path.scope.buildUndefinedNode());
        }
      }
    }
  };
}
