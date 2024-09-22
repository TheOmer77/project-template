const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    './base',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: { project },
  globals: { JSX: true },
  settings: { 'import/resolver': { typescript: { project } } },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
};
