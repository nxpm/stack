import { addFiles, NormalizedSchema, removeFiles } from '@nxpm/common'
import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { generatorWebLib } from '../generators/web-lib/generator-web-lib'

export type WebLibType = 'data-access' | 'feature' | 'util' | 'ui'

export type DepsMap = Record<string, string>

export interface WebLibOptions {
  directory: string
  name: string
  prefix?: string
  type: WebLibType
  addFiles?: string
  removeFiles?: string[]
  deps?: DepsMap
  devDeps?: DepsMap
}

export async function generateWebLib(host: Tree, lib: WebLibOptions, options: NormalizedSchema) {
  await generatorWebLib(host, {
    directory: options.directory,
    name: options.name,
    type: lib.type,
    prefix: lib.prefix,
  })

  if (lib.deps || lib.devDeps) {
    addDependenciesToPackageJson(host, lib.deps || {}, lib.devDeps || {})
  }

  if (lib.removeFiles?.length) {
    removeFiles(host, lib.removeFiles, `${options.projectRoot}/src/lib/`)
  }
  addFiles(host, { ...options }, lib.addFiles)
}
