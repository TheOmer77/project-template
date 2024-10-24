import globals from 'globals';
import tseslint from 'typescript-eslint';

import baseConfig from './base.js';

const serverConfig = tseslint.config(...baseConfig, {
  languageOptions: { globals: { ...globals.node } },
});

export default serverConfig;
