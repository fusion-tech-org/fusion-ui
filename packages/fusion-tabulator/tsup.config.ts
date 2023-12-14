import { defineConfig } from 'tsup';

const handleBuildSuccess = async () => {
  console.log('oops! building successfully');
};

export default defineConfig({
  entry: ['src/index.tsx'],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  minify: 'terser',
  onSuccess: handleBuildSuccess,
  external: ['react', 'react-dom'],
  platform: 'browser',
  format: 'esm',
});
