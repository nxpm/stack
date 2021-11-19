import { formatFiles, Tree } from '@nrwl/devkit'
import { libraryGenerator } from '@nrwl/nest'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { ApiLibGeneratorSchema } from './schema'

export async function generatorApiLib(
  host: Tree,
  options: ApiLibGeneratorSchema,
  files?: string,
  extraOptions: Record<string, string> = {},
) {
  const normalizedOptions = normalizeOptions(host, options)
  await libraryGenerator(host, {
    ...options,
    name: options.name,
    tags: `scope:${normalizedOptions.directory},type:${options.type}`,
  })
  if (files) {
    addFiles(host, normalizedOptions, files, extraOptions)
  }
  await formatFiles(host)
}
