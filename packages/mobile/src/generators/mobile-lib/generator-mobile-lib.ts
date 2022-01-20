import { libraryGenerator } from '@nrwl/angular/generators'
import { Tree } from '@nrwl/devkit'
import { addFiles, normalizeOptions } from '@nxpm/common'
import { MobileLibGeneratorSchema } from './schema'

export async function generatorMobileLib(host: Tree, options: MobileLibGeneratorSchema, files?: null) {
  const normalizedOptions = normalizeOptions(host, options)
  await libraryGenerator(host, {
    ...options,
    name: options.name,
    skipFormat: true,
  })
  if (files) {
    addFiles(host, normalizedOptions, files)
  }
}
