import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import pluginNext from '@next/eslint-plugin-next';

import baseConfig from './base.js';
import { nextCheckFile } from '../rules/check-file.js';
import { nextRestrictedImports } from '../rules/restricted-imports.js';

const nextConfig = tseslint.config(
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  ...tailwind.configs['flat/recommended'],

  nextCheckFile,
  nextRestrictedImports,

  {
    plugins: { '@next/next': pluginNext },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },

  {
    plugins: { 'react-hooks': pluginReactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  }
);

export default nextConfig;
