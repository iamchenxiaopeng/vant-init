module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'max-attributes-per-line': 'off',
    'html-closing-bracket-spacing': 'off',
    'html-self-closing': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
