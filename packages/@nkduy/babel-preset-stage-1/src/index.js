import presetStage2 from "@nkduy/babel-preset-stage-2";

import transformClassConstructorCall from "@nkduy/babel-plugin-transform-class-constructor-call";
import transformExportExtensions from "@nkduy/babel-plugin-transform-export-extensions";

export default {
  presets: [
    presetStage2
  ],
  plugins: [
    transformClassConstructorCall,
    transformExportExtensions
  ]
};
