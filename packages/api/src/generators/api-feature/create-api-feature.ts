import { Tree } from '@nrwl/devkit'
import { ApiFeatureGeneratorSchema } from './schema'
import { join } from 'path'
import { normalizeOptions } from '@nxpm/common'
import { ApiLibOptions, ApiLibType, generateApiLib } from '../../helpers'

export async function createApiFeature(host: Tree, type: ApiLibType, options: ApiFeatureGeneratorSchema) {
  const name = options.name || options.type
  const directory = options.directory || options.apiName

  // Format the options for this library
  const lib: ApiLibOptions = {
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

  await generateApiLib(host, { ...lib, ...options.lib }, normalized)
}
