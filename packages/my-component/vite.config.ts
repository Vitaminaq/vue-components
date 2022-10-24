import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from './build/utils';

// https://vitejs.dev/config/
export default defineConfig(process.env.NODE_ENV === 'development' ? {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve("./src"),
      '@component': resolve("./src/components"),
      vue: resolve("./node_modules/vue3")
    }
  },
} : {});
