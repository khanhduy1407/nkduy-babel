import presetStage3 from "@nkduy/babel-preset-stage-3";

import transformClassProperties from "@nkduy/babel-plugin-transform-class-properties";
import transformDecorators from "@nkduy/babel-plugin-transform-decorators";
import syntaxDynamicImport from "@nkduy/babel-plugin-syntax-dynamic-import";

export default {
  presets: [
    presetStage3
  ],
  plugins: [
    syntaxDynamicImport,
    transformClassProperties,
    transformDecorators
  ]
};
