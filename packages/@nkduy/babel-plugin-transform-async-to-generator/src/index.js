import remapAsyncToGenerator from "@nkduy/babel-helper-remap-async-to-generator";

export default function () {
  return {
    inherits: require("@nkduy/babel-plugin-syntax-async-functions"),

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addHelper("asyncToGenerator")
        });
      }
    }
  };
}
