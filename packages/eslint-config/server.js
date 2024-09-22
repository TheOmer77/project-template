/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['./base.js'],
  env: { node: true, es6: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
