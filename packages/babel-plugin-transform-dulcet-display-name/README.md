# babel-plugin-transform-dulcet-display-name

Add displayName to Dulcet.createClass calls

## Installation

```sh
$ npm install babel-plugin-transform-dulcet-display-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-dulcet-display-name"]
}
```

### Via CLI

```sh
$ babel --plugins transform-dulcet-display-name script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-dulcet-display-name"]
});
```