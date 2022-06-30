const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
);

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    amd: true,
    'jest/globals': true
  },
  plugins: ['react', 'redux-saga', 'react-hooks', 'jest'],

  extends: ['prettier', 'prettier/react', 'prettier-standard', 'plugin:react/recommended'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/no-webpack-loader-syntax': 0,
    'react/display-name': 0,
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['error'] }],
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'prettier/prettier': ["error",prettierOptions],
  },
  globals: {
    GLOBAL: false,
    it: false,
    expect: false,
    describe: false
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
