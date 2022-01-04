import { Tree } from '@nrwl/devkit'
import { WebFeatureGeneratorSchema } from './schema'
import { join } from 'path'
import { logEntry, normalizeOptions } from '@nxpm/common'
import { WebLibOptions, WebLibType, generateWebLib } from '../../helpers'

export async function createWebFeature(host: Tree, type: WebLibType, options: WebFeatureGeneratorSchema) {
  const name = options.name || options.type
  const directory = options.directory || options.apiName
  const startTime = new Date()
  // Format the options for this library
  const lib: WebLibOptions = {
    type,
    directory,
    name: `${name}/${type}`,
    addFiles: join(__dirname, 'files', name, type),
    removeFiles: options?.lib?.removeFiles,
    deps: options?.lib?.deps,
    devDeps: options?.lib?.devDeps,
  }

  logEntry(`    -> web feature: ${directory} ${name} (normalize)`, startTime)
  // Normalize the options for this library
  const normalized = normalizeOptions(host, { ...options, name: lib.name }, 'library')

  logEntry(`    -> web feature: ${directory} ${name} (generate)`, startTime)
  await generateWebLib(host, { ...lib, ...options.lib }, normalized)
}
