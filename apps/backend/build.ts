/// <reference types="node" />

import { build } from 'esbuild';
import { build as buildDts } from 'tsup';

const ENTRYPOINT = 'src/index.ts';

Promise.all(
  [
    build({
      entryPoints: [ENTRYPOINT],
      platform: 'node',
      target: 'node20',
      bundle: true,
      minify: true,
      outdir: 'dist',
    }),
    process.env.APP_NAME !== 'backend' &&
      buildDts({ entry: [ENTRYPOINT], dts: { only: true } }),
  ].filter(Boolean)
);
