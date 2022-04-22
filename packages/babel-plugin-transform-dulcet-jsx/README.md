# babel-plugin-transform-dulcet-jsx

> Turn JSX into Dulcet function calls
## Example

### Dulcet

**In**

```javascript
var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
var profile = Dulcet.createElement("div", null,
  Dulcet.createElement("img", { src: "avatar.png", className: "profile" }),
  Dulcet.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Custom

**In**

```javascript
/** @jsx dom */
var { dom } = require("deku");
var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
/** @jsx dom */
var dom = require("deku").dom;
var profile = dom( "div", null,
  dom("img", { src: "avatar.png", className: "profile" }),
  dom("h3", null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-dulcet-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-dulcet-jsx"]
}
```

With options:

```json
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
babel --plugins transform-dulcet-jsx script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-dulcet-jsx"]
});
```

## Options

### `pragma`

`string`, defaults to `Dulcet.createElement`.

Replace the function used when compiling JSX expressions.

Note that the `@jsx Dulcet.DOM` pragma has been deprecated as of Dulcet v0.12

### `useBuiltIns`

`boolean`, defaults to `false`.

When spreading props, use `Object.assign` directly instead of Babel's extend helper.