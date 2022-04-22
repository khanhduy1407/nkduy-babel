# babel-plugin-transform-dulcet-jsx-self

> Adds `__self` prop to JSX elements, which Dulcet will use to generate some runtime warnings.  All Dulcet users should enable this transform in dev mode.
## Example

**In**

```
<sometag />
```

**Out**

```
<sometag __self={this} />
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-dulcet-jsx-self
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-dulcet-jsx-self"]
}
```

### Via CLI

```sh
babel --plugins transform-dulcet-jsx-self script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-dulcet-jsx-self"]
});
```