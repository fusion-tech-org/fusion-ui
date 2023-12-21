import { defineConfig } from 'tsup';
import pkg from './package.json';

const handleBuildSuccess = async () => {
  console.log('oops! building successfully');
};

export default defineConfig({
  entry: ['src/index.tsx'],
  outExtension({ format }) {
    return {
      js: `.${pkg.version}.js`,
    };
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  minify: 'terser',
  onSuccess: handleBuildSuccess,
  external: ['react', 'react-dom'],
  platform: 'browser',
  format: 'esm',
  dts: true,
  publicDir: 'public',
  metafile: false,
});
