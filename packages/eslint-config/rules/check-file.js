import checkFilePlugin from 'eslint-plugin-check-file';

/** @type {import("eslint").Linter.Config} */
export const checkFile = {
  name: 'Check file',
  plugins: { 'check-file': checkFilePlugin },
  rules: {
    'check-file/filename-naming-convention': [
      'warn',
      { '**/*.{ts,tsx}': 'KEBAB_CASE' },
      { ignoreMiddleExtensions: true },
    ],
    'check-file/folder-naming-convention': ['warn', { 'src/**': 'KEBAB_CASE' }],
  },
};

/** @type {import("eslint").Linter.Config} */
export const nextCheckFile = {
  rules: {
    'check-file/folder-naming-convention': [
      'warn',
      {
        'src/app/**': 'NEXT_JS_APP_ROUTER_CASE',
        'src/!(app)/**': 'KEBAB_CASE',
      },
    ],
  },
};
