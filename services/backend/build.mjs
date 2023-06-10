//@ts-check
import { build } from 'esbuild';
import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  outfile: 'dist/index.js',
  legalComments: 'none',
  plugins: [TsconfigPathsPlugin({})],
});
