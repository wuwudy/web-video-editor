import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  // resolve: {
  //   alias: {
  //     '@ffmpeg-types': path.resolve(__dirname, 'node_modules/@ffmpeg/ffmpeg/dist/esm/types'),
  //   },
  // },
})
