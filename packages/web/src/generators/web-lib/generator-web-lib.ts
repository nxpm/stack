import { formatFiles, Tree } from '@nrwl/devkit'
import { libraryGenerator } from '@nrwl/angular/generators'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { WebLibGeneratorSchema } from './schema'

export async function generatorWebLib(host: Tree, options: WebLibGeneratorSchema, files?: null) {
  const normalizedOptions = normalizeOptions(host, options)
  await libraryGenerator(host, {
    ...options,
    name: options.name,
  })
  if (files) {
    addFiles(host, normalizedOptions, files)
  }
  await formatFiles(host)
}
