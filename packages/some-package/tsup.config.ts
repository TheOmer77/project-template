import { defineConfig } from 'tsup';
import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths';
import eslint from 'esbuild-plugin-eslint';

const config = defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  esbuildPlugins: [TsconfigPathsPlugin({}), eslint({ throwOnWarning: true })],
});

export default config;
