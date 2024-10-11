const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', './base.js'],
  globals: { React: true, JSX: true },
  env: { node: true },
  settings: { 'import/resolver': { typescript: { project } } },
  ignorePatterns: ['.*.js', 'node_modules/'],
  rules: {
    'check-file/folder-naming-convention': [
      'warn',
      {
        'src/app/**': 'NEXT_JS_APP_ROUTER_CASE',
        'src/!(app)/**': 'KEBAB_CASE',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'next/router',
            message: "Import from 'next/navigation' instead.",
          },
        ],
        patterns: [
          {
            group: ['lucide-react'],
            importNamePattern: '^(Lucide.*|(?:(?!.*Icon$).+))$',
            message:
              "Only import icons that end with 'Icon' and don't start with 'Lucide'.",
          },
        ],
      },
    ],
  },
};
