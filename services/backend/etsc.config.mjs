//@ts-check
import { replaceTscAliasPaths } from 'tsc-alias';

/** @type {import('esbuild-node-tsc/dist/config').Config} */
const config = {
  /**
   * Post build paths resolve, since ESBuild only natively supports paths
   * resolution when bundling.
   * https://github.com/evanw/esbuild/issues/394#issuecomment-1537247216
   */
  postbuild: async () => {
    await replaceTscAliasPaths({
      configFile: 'tsconfig.json',
      watch: false,
      outDir: 'dist',
      declarationDir: 'dist',
    });
  },
};

export default config;
