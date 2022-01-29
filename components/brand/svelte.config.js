import { resolve, join } from 'path'

const scssPath = resolve(join('..', '..', 'common', 'scss'))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    vite: {
      resolve: {
        alias: [
          { find: '$scss', replacement: scssPath }
        ]
      }
    }
  }
}

export default config
