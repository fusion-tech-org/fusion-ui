import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
import react from '@vitejs/plugin-react';
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
      langs: `${srcDir}/langs`,
    },
  },
  server: {
    host: '0.0.0.0',
    cors: true,
  },
  build: {
    outDir: 'lib',
    sourcemap: true,
     minify: false, // 禁用压缩
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'FusionTabulator',
      // the proper extensions will be addedw
      fileName: 'index',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom', 'lodash', '@arco-design/web-react',"day.js","axios","fast-deep-equal"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'lib/index.css'; // 将 CSS 输出到 style/index.css
          }
          return assetInfo.name; // 其他文件保持原名
        },
      },
    },
  },
});
