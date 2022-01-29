'use strict'

import { readFileSync } from 'fs'

const json = JSON.parse(readFileSync('deployment-config-template.json', 'utf8'))

const nodeEnv = process.env.NODE_ENV
json.build.env.MODE = nodeEnv

const apps = {
  qa: {
    marketplaceUrl: 'https://qa-marketplace-app-beyonk1.vercel.app'
  },
  prod: {
    marketplaceUrl: 'https://prod-marketplace-app-beyonk1.vercel.app'
  }
}

for (const [ index, rewrite ] of Object.entries(json.rewrites)) {
  const { source, destination } = rewrite
  const realDestination = destination.replace('{{marketplace_url}}', apps[nodeEnv].marketplaceUrl)
  json.rewrites[index] = { source, destination: realDestination }
}

console.log(JSON.stringify(json, null, 2))
