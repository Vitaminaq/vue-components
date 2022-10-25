import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from './build/utils';
import { isVue3 } from 'vue-demi';
import { createVuePlugin } from 'vite-plugin-vue2';
import setUp from 'unplugin-vue2-script-setup/vite';

// https://vitejs.dev/config/
export default defineConfig(process.env.NODE_ENV === 'development' ? {
  plugins: isVue3 ? [vue()] : [createVuePlugin(), setUp()],
  resolve: {
    alias: {
      '@': resolve("./src"),
      '@component': resolve("./src/components"),
      vue: resolve(`./node_modules/vue${ isVue3 ? 3 : 2}`)
    }
  },
} : {});
