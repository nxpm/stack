import { libraryGenerator } from '@nrwl/angular/generators'
import { Tree } from '@nrwl/devkit'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { WebLibGeneratorSchema } from './schema'

export async function generatorWebLib(
  host: Tree,
  options: WebLibGeneratorSchema,
  files?: string,
  extraOptions: Record<string, string> = {},
) {
  const normalizedOptions = normalizeOptions(host, options)
  await libraryGenerator(host, {
    ...options,
    name: options.name,
    skipFormat: true,
  })
  if (files) {
    addFiles(host, normalizedOptions, files, extraOptions)
  }
}
