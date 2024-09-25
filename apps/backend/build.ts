import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  target: 'node20',
  bundle: true,
  minify: true,
  outdir: 'dist',
});
