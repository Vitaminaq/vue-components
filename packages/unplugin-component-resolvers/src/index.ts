import type { ComponentInfo, ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components';
import { kebabCase } from './utils'

const PKNAME = '@wefly/vue-ui';

export interface ResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean
  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]
}

type ResolverOptionsResolved = Required<Omit<ResolverOptions, 'exclude'>> &
Pick<ResolverOptions, 'exclude'>

function getSideEffects(dirName: string, options: ResolverOptionsResolved): SideEffectsInfo | undefined {
  const { importStyle } = options
  const themeFolder = `${PKNAME}/style`;
 
  if (importStyle === true || importStyle === 'css')
    return `${themeFolder}/${dirName}/vue-${dirName}.css`;
}

function resolveComponent(name: string, options: ResolverOptionsResolved): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude))
    return

  if (!name.match(/^Fly[A-Z]/))
    return

  const partialName = kebabCase(name.slice(3))// FlyButton -> button
  const { ssr } = options

    return {
      name,
      from: `@wefly/vue-ui/${ssr ? 'cjs' : 'es'}`,
      sideEffects: getSideEffects(partialName, options),
    }
}

const noStylesComponents = ['FlyInput']

/**
 * Resolver
 *
 * See https://github.com/antfu/vite-plugin-components/pull/28 for more details
 * See https://github.com/antfu/vite-plugin-components/issues/117 for more details
 *
 */
export function WeflyVueUiResolver(
  options: ResolverOptions = {},
): ComponentResolver[] {
  let optionsResolved: ResolverOptionsResolved

  async function resolveOptions() {
    if (optionsResolved)
      return optionsResolved
    optionsResolved = {
      ssr: false,
      importStyle: 'css',
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      ...options,
    }
    return optionsResolved
  }

  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        const options = await resolveOptions()

        if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
          return resolveComponent(name, { ...options, importStyle: false })
        else return resolveComponent(name, options)
      },
    },
  ]
}
