/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import-x/recommended',
    'plugin:import-x/typescript',
    'prettier',
    'turbo',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['check-file', 'prefer-arrow-functions', 'simple-import-sort'],
  rules: {
    'check-file/filename-naming-convention': [
      'warn',
      { '**/*.{ts,tsx}': 'KEBAB_CASE' },
      { ignoreMiddleExtensions: true },
    ],
    'check-file/folder-naming-convention': ['warn', { 'src/**': 'KEBAB_CASE' }],
    'prefer-arrow-callback': ['warn'],
    'prefer-arrow-functions/prefer-arrow-functions': [
      'warn',
      {
        allowNamedFunctions: false,
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'implicit',
        singleReturnOnly: false,
      },
    ],
    'prefer-template': ['warn'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^hono', '^react', '^next', '^next/.*', '^@?\\w'],
          ['^@repo/.*'],
          [
            '^@/components/ui/.*',
            '^@/components/(?!ui).*',
            '^@/hooks(/.*)?',
            '^@/routes(/.*)?',
            '^@/utils(/.*)?',
            '^@/lib(/.*)?',
            '^@/config(/.*)?',
            '^@/constants(/.*)?',
            '^@/types(/.*)?',
            '^@/styles(/.*)?',
          ],
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
          ],
        ],
      },
    ],
  },
  settings: { 'import-x/resolver': { node: true, typescript: true } },
};
