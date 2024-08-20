import { defineConfig } from 'tsup';
// import pkg from './package.json';

const handleBuildSuccess = async () => {
  console.log('oops! building successfully');
};

export default defineConfig({
  entry: ['src/index.tsx'],
  outExtension() {
    return {
      // js: `.${pkg.version}.min.js`,
      js: `.min.js`,
    };
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  minify: 'terser',
  onSuccess: handleBuildSuccess,
  external: ['react', 'react-dom', '@arco-design/web-react'],
  platform: 'browser',
  format: 'esm',
  dts: true,
  publicDir: 'public',
  metafile: false, // Optional: Clean the output directory before building
  esbuildOptions(options) {
    options.drop = ['console']; // This removes all console.* calls
    options.loader = {
      ...options.loader,
      '.worker': 'file', // Treat .worker files as files (this can vary based on how your setup works)
    };
  },
});
