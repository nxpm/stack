import { addFiles, NormalizedSchema, removeFiles } from '@nxpm/common'
import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { generatorApiLib } from '../generators/api-lib/generator-api-lib'

export type ApiLibType = 'data-access' | 'feature' | 'util'

export type DepsMap = Record<string, string>

export interface ApiLibOptions {
  directory: string
  name: string
  type: ApiLibType
  addFiles?: string
  removeFiles?: string[]
  deps?: DepsMap
  devDeps?: DepsMap
}

export async function generateApiLib(host: Tree, lib: ApiLibOptions, options: NormalizedSchema) {
  await generatorApiLib(host, { directory: options.directory, name: options.name, type: lib.type })

  if (lib.deps || lib.devDeps) {
    addDependenciesToPackageJson(host, lib.deps || {}, lib.devDeps || {})
  }

  if (lib.removeFiles?.length) {
    removeFiles(host, lib.removeFiles, `${options.projectRoot}/src/lib/`)
  }
  if (lib.addFiles) {
    addFiles(host, { ...options }, lib.addFiles)
  }
}
