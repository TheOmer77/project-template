import tailwind from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';
import globals from 'globals';

import baseConfig from './base.js';
import { nextRestrictedImports } from './rules/restricted-imports.js';
import { nextCheckFile } from './rules/check-file.js';
import compat from './utils/compat.js';

const nextConfig = tseslint.config(
  ...baseConfig,
  ...compat.extends('next/core-web-vitals'),
  ...tailwind.configs['flat/recommended'],

  nextCheckFile,
  nextRestrictedImports,

  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  }
);

export default nextConfig;
