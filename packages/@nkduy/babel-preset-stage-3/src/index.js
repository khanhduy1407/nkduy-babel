import syntaxTrailingFunctionCommas from "@nkduy/babel-plugin-syntax-trailing-function-commas";
import transformAsyncToGenerator from "@nkduy/babel-plugin-transform-async-to-generator";
import transformExponentiationOperator from "@nkduy/babel-plugin-transform-exponentiation-operator";
import transformObjectRestSpread from "@nkduy/babel-plugin-transform-object-rest-spread";
import transformAsyncGeneratorFunctions from "@nkduy/babel-plugin-transform-async-generator-functions";

export default {
  plugins: [
    syntaxTrailingFunctionCommas, // in ES2017 (remove as a breaking change)
    transformAsyncToGenerator, // in ES2017 (remove as a breaking change)
    transformExponentiationOperator,  // in ES2016 (remove as a breaking change)
    transformAsyncGeneratorFunctions,
    transformObjectRestSpread
  ]
};
