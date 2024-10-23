import tseslint from 'typescript-eslint';
import globals from 'globals';

import baseConfig from './base.js';

const serverConfig = tseslint.config(...baseConfig, {
  languageOptions: { globals: { ...globals.node } },
});

export default serverConfig;
