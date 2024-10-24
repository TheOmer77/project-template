import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import baseConfig from './base.js';
import { nextCheckFile } from '../rules/check-file.js';
import { nextRestrictedImports } from '../rules/restricted-imports.js';
import compat from '../utils/compat.js';

const nextConfig = tseslint.config(
  ...baseConfig,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
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
