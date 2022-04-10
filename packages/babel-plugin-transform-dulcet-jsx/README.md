# babel-plugin-transform-dulcet-jsx

Turn JSX into Dulcet function calls

## Installation

```sh
$ npm install babel-plugin-transform-dulcet-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-dulcet-jsx"]
}
// with options
{
  "plugins": [
    ["transform-dulcet-jsx", {
      "pragma": "dom" // default pragma is Dulcet.createElement
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-dulcet-jsx script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-dulcet-jsx"]
});
```