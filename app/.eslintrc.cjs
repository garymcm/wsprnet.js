module.exports = {
  root: false,
  env: {
    node: true,
    browser: true,
    jest: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
  },
  globals: {},
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // No space before function paren
    'space-before-function-paren': 'off',
    // Trailing commas in arrays and objects
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'no-console': 'warn',
  },
}
