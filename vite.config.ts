import vue from '@vitejs/plugin-vue'
import ViteSvgLoader from 'vite-svg-loader'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteSvgLoader()],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
