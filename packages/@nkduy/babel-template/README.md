# @nkduy/babel-template

> Generate an AST from a string template.

In computer science, this is known as an implementation of quasiquotes.

## Install

```sh
npm install --save-dev @nkduy/babel-template
```

## Usage

```js
import template from "@nkduy/babel-template";
import generate from "@nkduy/babel-generator";
import * as t from "@nkduy/babel-types";

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});

console.log(generate(ast).code);
```

```js
const myModule = require("my-module");
```

## API

### `template(code, [opts])`

#### code

Type: `string`

#### options

`@nkduy/babel-template` accepts all of the options from [babylon], and specifies
some defaults of its own:

* `allowReturnOutsideFunction` is set to `true` by default.
* `allowSuperOutsideMethod` is set to `true` by default.

##### preserveComments

Type: `boolean`
Default: `false`

Set this to `true` to preserve any comments from the `code` parameter.

#### Return value

`@nkduy/babel-template` returns a `function` which is invoked with an optional object
of replacements. See the usage section for an example.

[babylon]: https://github.com/khanhduy1407/babylon#options
