const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', './base.js'],
  globals: { React: true, JSX: true },
  env: { node: true },
  settings: { 'import/resolver': { typescript: { project } } },
  ignorePatterns: ['.*.js', 'node_modules/'],
};