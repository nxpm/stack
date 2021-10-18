import { Tree } from '@nrwl/devkit'
import { MobileFeatureGeneratorSchema } from './schema'
import { join } from 'path'
import { normalizeOptions } from '@nxpm/common'
import { MobileLibOptions, MobileLibType, generateMobileLib } from '../../helpers'

export async function createMobileFeature(host: Tree, type: MobileLibType, options: MobileFeatureGeneratorSchema) {
  const name = options.name || options.type
  const directory = options.directory || options.apiName

  // Format the options for this library
  const lib: MobileLibOptions = {
    type,
    directory,
    name: `${name}/${type}`,
    addFiles: join(__dirname, 'files', name, type),
    removeFiles: options?.lib?.removeFiles,
    deps: options?.lib?.deps,
    devDeps: options?.lib?.devDeps,
  }

  // Normalize the options for this library
  const normalized = normalizeOptions(host, { ...options, name: lib.name }, 'library')

  await generateMobileLib(host, { ...lib, ...options.lib }, normalized)
}
