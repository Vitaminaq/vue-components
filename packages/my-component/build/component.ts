import { build } from "vite";
import glob from "glob";
import path from "path";
import { isVue3, version } from "vue-demi";
import { importModule } from "local-pkg";

const root = process.cwd();

const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}

export const start = () => {
  console.log("当前vue版本", version);
  const name = isVue3 ? "vue3" : "vue2";
  glob("src/components/**/index.ts", {}, async (err, files) => {
    if (err) return;
    files.forEach(async (file) => {
      const plugins: any[] = [];
      if (isVue3) {
        console.log('vue3构建插件注入中...');
        plugins.push((await importModule("@vitejs/plugin-vue")).default());
      } else {
        console.log('vue2构建插件注入中...');
        plugins.push(
          (await importModule("vite-plugin-vue2")).createVuePlugin()
        );
        plugins.push(
          (await importModule("unplugin-vue2-script-setup/vite")).default()
        );
      }
      console.log(name, file);
      const list = file.split("/");
      await build({
        plugins,
        // resolve: {
        //   alias: {
        //     vue: isVue3
        //       ? resolve("./node_modules/vue3")
        //       : resolve("./node_modules/vue2"),
        //     "@vue/composition-api": resolve(
        //       "./node_modules/@vue/composition-api"
        //     ),
        //   },
        // },
        build: {
          emptyOutDir: false,
          lib: {
            entry: path.resolve(root, file),
            name: "vue-ui",
            fileName(format) {
              return format === 'es' ? 'index.mjs' : 'index.js';
            }
          },
          rollupOptions: {
            external: ["vue", "vue-demi"],
            output: [{
              format: 'es',
              dir: `../my-component/dist/${name}/es/${list[
                list.length - 2
              ].toLocaleLowerCase()}`,
              exports: "named",
            }, {
              format: 'cjs',
              dir: `../my-component/dist/${name}/cjs/${list[
                list.length - 2
              ].toLocaleLowerCase()}`,
              exports: "named",
            }],
          },
        },
      });
    });
  });
};

start();
