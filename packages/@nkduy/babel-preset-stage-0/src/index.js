import presetStage1 from "@nkduy/babel-preset-stage-1";

import transformDoExpressions from "@nkduy/babel-plugin-transform-do-expressions";
import transformFunctionBind from "@nkduy/babel-plugin-transform-function-bind";

export default {
  presets: [
    presetStage1
  ],
  plugins: [
    transformDoExpressions,
    transformFunctionBind
  ]
};
