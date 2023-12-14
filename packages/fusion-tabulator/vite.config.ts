import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const srcDir = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: srcDir,
      assets: `${srcDir}/assets`,
      components: `${srcDir}/components`,
      editors: `${srcDir}/editors`,
      formatters: `${srcDir}/formatters`,
      hooks: `${srcDir}/hooks`,
      styles: `${srcDir}/styles`,
      themes: `${srcDir}/themes`,
      types: `${srcDir}/types`,
      utils: `${srcDir}/utils`,
    },
  },
});
