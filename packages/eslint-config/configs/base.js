import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import turbo from 'eslint-plugin-turbo';

import { checkFile } from '../rules/check-file.js';
import { preferArrow } from '../rules/prefer-arrow.js';
import { preferTemplate } from '../rules/prefer-template.js';
import { sortImports } from '../rules/sort-imports.js';

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  prettier,
  turbo.configs['flat/recommended'],

  checkFile,
  preferArrow,
  preferTemplate,
  sortImports,

  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
      },
    },
  },
  { ignores: ['.*.js', 'node_modules/', 'dist/', '.next/'] }
);

export default baseConfig;
