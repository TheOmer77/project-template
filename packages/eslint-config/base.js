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
  plugins: ['check-file', 'prefer-arrow-functions'],
  rules: {
    'check-file/filename-naming-convention': [
      'warn',
      { '**/*.{ts,tsx}': 'KEBAB_CASE' },
      { ignoreMiddleExtensions: true },
    ],
    'check-file/folder-naming-convention': ['warn', { 'src/**': 'KEBAB_CASE' }],
    'import-x/order': [
      'warn',
      {
        alphabetize: { order: 'asc', orderImportKind: 'asc' },
        distinctGroup: false,
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        'newlines-between': 'always',
        pathGroups: [
          { group: 'external', pattern: 'hono', position: 'before' },
          { group: 'external', pattern: 'hono/**', position: 'before' },
          { group: 'external', pattern: 'react', position: 'before' },
          { group: 'external', pattern: 'react/**', position: 'before' },
          { group: 'external', pattern: 'next', position: 'before' },
          { group: 'external', pattern: 'next/**', position: 'before' },

          { group: 'internal', pattern: '@repo/**', position: 'before' },
          { group: 'internal', pattern: '@/components/ui/**' },
          {
            group: 'internal',
            pattern: '@/components/**',
            position: 'after',
          },
          { group: 'internal', pattern: '@/hooks/**', position: 'after' },
          { group: 'internal', pattern: '@/routes/**', position: 'after' },
          { group: 'internal', pattern: '@/utils/**', position: 'after' },
          { group: 'internal', pattern: '@/lib/**', position: 'after' },
          {
            group: 'internal',
            pattern: '@/config/**',
            position: 'after',
          },
          {
            group: 'internal',
            pattern: '@/constants/**',
            position: 'after',
          },
          {
            group: 'internal',
            pattern: '@/styles/**',
            position: 'after',
          },
          { group: 'internal', pattern: '@/types/**', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        warnOnUnassignedImports: true,
      },
    ],
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
  },
  settings: { 'import-x/resolver': { node: true, typescript: true } },
};
