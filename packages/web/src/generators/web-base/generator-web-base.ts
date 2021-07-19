import { Tree } from '@nrwl/devkit'
import { WebBaseGeneratorSchema } from './schema'
import { generateWebAssets } from './generate-web-assets'
import { generateWebStyle } from './generate-web-style'
import { generateWebEnvironments } from './generate-web-environments'

export async function generatorWebBase(host: Tree, options: WebBaseGeneratorSchema) {
  await generateWebAssets(host, {
    ...options,
    directory: options.directory || options.webName,
    name: 'assets',
  })
  await generateWebEnvironments(host, {
    ...options,
    directory: options.directory || options.webName,
    name: 'environments',
  })
  await generateWebStyle(host, {
    ...options,
    directory: options.directory || options.webName,
    name: 'style',
  })
}
