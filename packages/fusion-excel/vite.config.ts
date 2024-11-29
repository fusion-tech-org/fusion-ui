import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'lib',
    lib: {
      entry: 'src/index.tsx',
      name: 'index',
      formats: ['umd', 'es'],
    },
  },
  worker: {
    format: 'es',
  },
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
