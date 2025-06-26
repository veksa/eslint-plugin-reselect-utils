# @veksa/eslint-plugin-reselect-utils

ESLint plugin to enforce best practices when using reselect and reselect-utils libraries

## Installation

@veksa/eslint-plugin-reselect-utils requires TypeScript 5.8 or later.

### Using npm or yarn

```bash
# npm
npm install @veksa/eslint-plugin-reselect-utils --save-dev

# yarn
yarn add @veksa/eslint-plugin-reselect-utils --dev
```

## Features

- Static analysis for reselect and reselect-utils selectors
- Enforces consistent selector patterns
- Automatic fixing capabilities for common issues
- TypeScript support

## Configuration

Add the plugin to your `.eslintrc` configuration file:

```json
{
  "plugins": ["@veksa/reselect-utils"],
  "extends": ["plugin:@veksa/reselect-utils/recommended"]
}
```

Or configure the rules manually:

```json
{
  "plugins": ["@veksa/reselect-utils"],
  "rules": {
    "reselect-utils/no-different-props": "error",
    "reselect-utils/require-key-selector": "error"
  }
}
```

## Rules

### no-different-props

Ensures that cached selectors and key selectors use the same props.

**Rule details:**
- Checks that cached selectors and their key selectors access the same properties
- Can automatically fix issues by generating correct key selectors

**Options:**
```js
{
  "composer": "stringComposeKeySelectors" // Default
}
```

### require-key-selector

Ensures that cached selectors always have a key selector specified.

**Rule details:**
- Requires key selectors for proper memoization when using createCachedSelector
- Can automatically add default key selectors

## Basic Usage

```js
import { createCachedSelector } from '@veksa/re-reselect';
import { createPropSelector } from '@veksa/reselect-utils';

// Good - props match in selector and key selector
const goodSelector = createCachedSelector(
  state => state.items,
  (state, props) => props.id,
  (items, id) => items[id]
)({
  keySelector: createPropSelector('id')
});

// Bad - props don't match between selector and key selector
const badSelector = createCachedSelector(
  state => state.items,
  (state, props) => props.id,
  (items, id) => items[id]
)({
  keySelector: createPropSelector('differentId') // ESLint will flag this
});
```

## Contributing

This project welcomes contributions and suggestions.

## License

[MIT](LICENSE.md)
