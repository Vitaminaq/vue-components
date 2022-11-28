import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: [
      './src/index'
    ],
    declaration: true,
    externals: [
        'unplugin-vue-components'
    ]
});
