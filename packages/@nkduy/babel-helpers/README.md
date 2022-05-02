# @nkduy/babel-helpers

> Collection of helper functions used by Babel transforms.

## Install

```sh
npm install --save-dev @nkduy/babel-helpers
```

## Usage

```js
import * as helpers from '@nkduy/babel-helpers';
import * as t from '@nkduy/babel-types';

const typeofHelper = helpers.get('typeof');

t.isExpressionStatement(typeofHelper);
// true
```
