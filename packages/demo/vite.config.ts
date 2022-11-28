import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import { WeflyVueUiResolver } from "@wefly/unplugin-component-resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [WeflyVueUiResolver()],
    }),
    Components({
      resolvers: [WeflyVueUiResolver()],
    }),
  ],
});
