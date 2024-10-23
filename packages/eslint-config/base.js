import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

import { checkFile } from './rules/check-file.js';
import { preferArrow } from './rules/prefer-arrow.js';
import { preferTemplate } from './rules/prefer-template.js';
import { sortImports } from './rules/sort-imports.js';
import compat from './utils/compat.js';

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  prettier,
  ...compat.extends('turbo'),

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
