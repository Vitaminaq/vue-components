import type { RollupBuild, OutputOptions, ModuleFormat } from 'rollup';
import path from "path";
import { isVue3 } from "vue-demi";
import { importModule } from "local-pkg";

export const target = 'es2018'

export const PKG_NAME = 'vue-ui'

export const workRoot = process.cwd();

export const resolve = (str: string) => {
  return path.resolve(workRoot, str)
}

export const epPackage = resolve('package.json')

export const getPackageManifest = (pkgPath: string) => {
  return require(pkgPath);
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]

export const formats = ['es', 'cjs'] as const

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/element-plus/es` */
    path: string
  }

  bundle: {
    /** e.g: `element-plus/es` */
    path: string
  }
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve('dist/es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve('dist/lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
    },
  },
}
export type BuildConfigEntries = [Module, BuildInfo][]

export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEntries

export const getVuePlugins = async () => {
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
  return plugins;
}
