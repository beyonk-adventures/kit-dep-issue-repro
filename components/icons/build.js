'use strict'

const { promises: fs } = require('fs')
const { join, relative, basename } = require('path')
const pascal = require('just-pascal-case')
const { optimize, loadConfig } = require('svgo')

const types = {
  system: { options: { size: '24' } },
  decorative: { options: { size: '96' } },
  category: { options: { size: '48' } }
}

const svgDir = join(__dirname, 'svg')
const libDir = join(__dirname, 'lib')
const iconsPath = join(libDir, 'icons')

function toComponent (name, data, { size }) {
  const base = basename(name, '.svg')
  const paths = data.replace(/fill="([^"]*)"/g, `fill={fillColor}`)
  const viewbox = `0 0 ${size} ${size}`
  return `<script>
  export let width = ${size}
  export let height = ${size}
  export let fillColor = '#7B7B7B'
</script>

<svg xmlns="http://www.w3.org/2000/svg" {width} {height} fill={fillColor} viewBox="${viewbox}" class="o-beyonk-svg-icon o-beyonk-svg-icon-${base}">${trim(paths)}</svg>`
}

function trim (text) {
  const regex = new RegExp('^<svg([^>]*)>|<\/svg>$', 'g')
  return text.replace(regex, '').trim()
}

async function load (type, svgoConfig) {
  const typeDir = join(svgDir, type)
  const iconList = await fs.readdir(typeDir)
  const icons = new Map()

  for (const name of iconList) {
    const loadPath = join(typeDir, name)
    const raw = await fs.readFile(loadPath, 'utf-8')
    const { data } = optimize(raw, svgoConfig) 
    icons.set(name, toComponent(name, data, types[type].options))
  }

  return icons
}

async function build () {
  await fs.rmdir(iconsPath, { recursive: true })
  await fs.mkdir(iconsPath)

  const svgoConfig = await loadConfig()

  for (const type of Object.keys(types)) {
    const icons = await load(type, svgoConfig)
    const iconOutputDir = join(iconsPath, type)

    await fs.mkdir(iconOutputDir)

    const exported = []
    for (const [ name, component ] of icons.entries()) {
      let pascalName = pascal(`${name}-icon`)
      pascalName = pascalName.replace('Svg', '')
      const outPath = join(iconOutputDir, `${pascalName}.svelte`)
      await fs.writeFile(
        outPath,
        component,
        { encoding: 'utf8' }
      )
      exported.push(`export { default as ${pascalName} } from './${relative(iconOutputDir, outPath)}'`)
    }

    const barrelFile = join(iconOutputDir, 'index.js')
    await fs.writeFile(barrelFile, exported.join('\n'), { encoding: 'utf8' })
  }
}

build()
