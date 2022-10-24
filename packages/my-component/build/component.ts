import { build } from "vite";
import glob from "glob";
import { isVue3, version } from "vue-demi";
import dts from "vite-plugin-dts";
import { resolve, workRoot, getVuePlugins } from "./utils";
import StyleLoader from '../plugins/style-loader';

export const start = async () => {
  console.log("当前vue版本", version);
  const name = isVue3 ? "vue3" : "vue2";

  const vuePlugins: any[] = await getVuePlugins();

  glob("src/components/**/**.{vue,ts,js}", {
    cwd: process.cwd(),
    absolute: true,
    onlyFiles: true,
  }, async (err, files) => {
    if (err) return;
    files.forEach(async (file) => {
      console.log('需要构建的组件清单：', name, file);

      const plugins = [...vuePlugins, StyleLoader()];

      plugins.push(
        dts({
          entryRoot: `${workRoot}/src/components`,
          outputDir: [resolve(`./dist/${name}/es`), resolve(`./dist/${name}/cjs`)],
          exclude: ['src/vite-env.d.ts'],
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
            // beforeWriteFile(filePath: string, content: string) {
            //   console.log(filePath, 'jjjjjjjjjjjjjjjjjjjj')
            //   return {
            //     filePath: filePath.replace('components\\', '').replace('components/', ''),
            //     content
            //   };
            // }
        })
      );
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
          assetsDir: resolve(`./dist/${name}/es/`),
          emptyOutDir: false,
          minify: 'esbuild',
          sourcemap: true,
          lib: {
            entry: resolve(file),
            name: "vue-ui"
          },
          rollupOptions: {
            external: ["vue", "vue-demi"],
            output: [
              {
                format: "es",
                dir: resolve(`./dist/${name}/es`),
                preserveModules: true,
                preserveModulesRoot: `${workRoot}/src/components`,
                entryFileNames: `[name].mjs`,
                // assetFileNames: (assetInfo) => {
                //   console.log(assetInfo, 'jjjjjjjjjjjjjjjjjjjjjjjjj');
                //   return 'assets/[name][extname]';
                // }
              },
              {
                format: "cjs",
                dir: resolve(`./dist/${name}/cjs`),
                preserveModules: true,
                preserveModulesRoot: `${workRoot}/src/components`,
                exports: "named",
                entryFileNames: `[name].js`
              },
            ],
          },
        },
      });
    });
  });
};

start();
