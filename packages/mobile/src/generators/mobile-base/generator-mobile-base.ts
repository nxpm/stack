import { Tree } from '@nrwl/devkit'
import { MobileBaseGeneratorSchema } from './schema'
import { generateMobileAssets } from './generate-mobile-assets'
import { generateMobileStyle } from './generate-mobile-style'
import { generateMobileEnvironments } from './generate-mobile-environments'

export async function generatorMobileBase(host: Tree, options: MobileBaseGeneratorSchema) {
  await generateMobileAssets(host, {
    ...options,
    directory: options.directory || options.mobileName,
    name: 'assets',
  })
  await generateMobileEnvironments(host, {
    ...options,
    directory: options.directory || options.mobileName,
    name: 'environments',
  })
  await generateMobileStyle(host, {
    ...options,
    directory: options.directory || options.mobileName,
    name: 'style',
  })
}
