import sveltePreprocess from 'svelte-preprocess'
import vercel from '@sveltejs/adapter-vercel'
import autoprefixer from 'autoprefixer'
import { resolve, join } from 'path'

const scssPath = resolve(join('..', '..', 'common', 'scss'))

const esbuildWorkAround = process.env.ESBUILD_WORKAROUND
const prodBuildOverrideForSvelteVitePluginIssue = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  hot: prodBuildOverrideForSvelteVitePluginIssue,
  compilerOptions: {
    dev: prodBuildOverrideForSvelteVitePluginIssue
  },
  preprocess: sveltePreprocess(
    {
      preserve: [
        'ld+json'
      ],
      sass: {
        includePaths: [ scssPath ]
      }
    }
  ),
  kit: {
    target: '#svelte',
    vite: {
      mode: process.env.NODE_ENV,
      ...esbuildWorkAround && {
        ssr: {
          noExternal: [ 'just-is-empty', '@beyonk/content-delivery', 'js-cookie' ]
        }
      },
      css: {
        postcss: {
          plugins: [ autoprefixer ]
        }
      },
      resolve: {
        alias: [
          { find: '$scss', replacement: scssPath }
        ]
      }
    },
    adapter: vercel()
  }
}

export default config
