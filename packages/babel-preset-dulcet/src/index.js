import presetFlow from "babel-preset-flow";
import transformDulcetJSX from "babel-plugin-transform-dulcet-jsx";
import transformSyntaxJSX from "babel-plugin-syntax-jsx";
import transformDulcetDisplayName from "babel-plugin-transform-dulcet-display-name";

// These imports not yet used...
// import transformDulcetJSXSource from "babel-plugin-transform-dulcet-jsx-source";
// import transformDulcetJSXSelf from "babel-plugin-transform-dulcet-jsx-self";

export default {
  presets: [
    presetFlow
  ],
  plugins: [
    transformDulcetJSX,
    transformSyntaxJSX,
    transformDulcetDisplayName
  ],
  env: {
    development: {
      plugins: [
        // transformDulcetJSXSource,
        // transformDulcetJSXSelf
      ]
    }
  }
};
