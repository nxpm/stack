import { formatFiles, Tree } from '@nrwl/devkit'
import { libraryGenerator } from '@nrwl/nest'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { ApiLibGeneratorSchema } from './schema'

export async function generatorApiLib(host: Tree, options: ApiLibGeneratorSchema, files?: null) {
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
