import { build } from "vite";
import glob from "glob";
import { isVue3, version } from "vue-demi";
import { importModule } from "local-pkg";
import dts from "vite-plugin-dts";
import { resolve } from "./utils";

export const start = () => {
  console.log("当前vue版本", version);
  const name = isVue3 ? "vue3" : "vue2";
  glob("src/components/**/index.ts", {}, async (err, files) => {
    if (err) return;
    files.forEach(async (file) => {
      const plugins: any[] = [];
      if (isVue3) {
        console.log("vue3构建插件注入中...");
        plugins.push((await importModule("@vitejs/plugin-vue")).default());
      } else {
        console.log("vue2构建插件注入中...");
        plugins.push(
          (await importModule("vite-plugin-vue2")).createVuePlugin()
        );
        plugins.push(
          (await importModule("unplugin-vue2-script-setup/vite")).default()
        );
      }
      plugins.push(
        dts({
          // root: resolve("./src"),
          // entryRoot: resolve("./src/components"),
          outputDir: resolve(`./dist/types/${name}`),
          cleanVueFileName: true,
          staticImport: true,
          compilerOptions: isVue3
            ? {}
            : {
                baseUrl: ".",
                paths: {
                  vue: ["node_modules/vue2"],
                  "vue/*": ["node_modules/vue2/*"],
                  "@vue/composition-api": ["node_modules/@vue/composition-api"],
                  "@vue/runtime-dom": ["node_modules/@vue/runtime-dom"],
                },
              },
          beforeWriteFile(filePath: string, content: string) {
            return {
              filePath: filePath.replace('components\\', '').replace('components/', ''),
              content
            };
          }
        })
      );
      console.log(name, file);
      const list = file.split("/");
      await build({
        plugins,
        resolve: {
          alias: isVue3
            ? {}
            : {
                vue: resolve("./node_modules/vue2"),
                "@vue/composition-api": resolve(
                  "./node_modules/@vue/composition-api"
                ),
              },
        },
        build: {
          emptyOutDir: false,
          lib: {
            entry: resolve(file),
            name: "vue-ui",
            fileName(format) {
              return format === "es" ? "index.mjs" : "index.js";
            },
          },
          rollupOptions: {
            external: ["vue", "vue-demi"],
            output: [
              {
                format: "es",
                dir: `../my-component/dist/${name}/es/${list[
                  list.length - 2
                ].toLocaleLowerCase()}`,
                exports: "named",
              },
              {
                format: "cjs",
                dir: `../my-component/dist/${name}/cjs/${list[
                  list.length - 2
                ].toLocaleLowerCase()}`,
                exports: "named",
              },
            ],
          },
        },
      });
    });
  });
};

start();
