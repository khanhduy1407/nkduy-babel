# babel-preset-dulcet

> Babel preset for all Dulcet plugins.

## Install

> You can also check out the Dulcet [Getting Started page](https://khanhduy1407.github.io/dulcet/docs/hello-world.html)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-dulcet
```

Make a .babelrc config file with the preset

```dulcet
echo '{ "presets": ["dulcet"] }' > .babelrc
```

Create a file to run on

```sh
echo '<h1>Hello, world!</h1>' > index.js
```

View the output

```sh
./node_modules/.bin/babel index.js
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["dulcet"]
}
```

### Via CLI

```sh
babel script.js --presets dulcet 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["dulcet"]
});
```
