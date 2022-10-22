import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Setup from 'unplugin-vue2-script-setup/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(), Setup()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
