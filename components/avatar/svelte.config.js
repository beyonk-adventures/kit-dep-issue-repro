import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    package: {
      emitTypes: false,
      exports: (file) => file === 'index.js'
    }
  }
}

export default config
