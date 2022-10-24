import { rollup, OutputOptions } from 'rollup';
import glob from "glob";
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { target, writeBundles, buildConfigEntries, workRoot, getVuePlugins } from './utils';
import { version } from "vue-demi";

/**
 * 未来的展望 - 后续构建工具切换，更细粒度的控制构建流程
 */

export const buildModules = async () => {
    console.log("当前vue版本", version);
    const input = glob.sync('src/components/**/*.{js,ts,vue}', {
        cwd: process.cwd(),
        absolute: true,
        onlyFiles: true,
    });

    const vuePlugins = await getVuePlugins();

    console.log(input);

    const bundle = await rollup({
        input,
        plugins: [
            ...vuePlugins,
            nodeResolve({
                extensions: ['.mjs', '.js', '.json', '.ts'],
            }),
            commonjs(),
            esbuild({
                sourceMap: true,
                target,
                loaders: {
                    '.vue': 'ts',
                },
            }),
        ],
        external: ["vue", "vue-demi"],
        treeshake: false,
    })

    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions => {
            return {
                format: config.format,
                dir: config.output.path,
                exports: module === 'cjs' ? 'named' : undefined,
                preserveModules: true,
                preserveModulesRoot: `${workRoot}/src/components`,
                sourcemap: true,
                entryFileNames: `[name].${config.ext}`,
            }
        })
    )
}

buildModules();
