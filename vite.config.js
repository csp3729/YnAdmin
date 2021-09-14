import { defineConfig, loadEnv } from 'vite';
import { vite2Ext } from 'apite';
import vue from '@vitejs/plugin-vue';

const { resolve } = require('path');

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [vue(), vite2Ext({})],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@vws': resolve(__dirname, 'src/views'),
      '@com': resolve(__dirname, 'src/components'),
      '@uts': resolve(__dirname, 'src/utils'),
      '@sty': resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    host: '0.0.0.0',
    // https: true,
    // open: true,
    proxy: {
      '/adminApi': {
        target: loadEnv(mode, process.cwd()).VITE_DOMAIN_URL,
        rewrite: (path) => path.replace(/^\/adminApi/, ''),
      },
      '/api': 'http://localhost:3000/api',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@sty/var.scss";',
      },
    },
  },
});
