import { addFiles, NormalizedSchema, removeFiles } from '@nxpm/common'
import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { generatorMobileLib } from '../generators/mobile-lib/generator-mobile-lib'

export type MobileLibType = 'data-access' | 'feature' | 'util' | 'ui'

export type DepsMap = Record<string, string>

export interface MobileLibOptions {
  directory: string
  name: string
  prefix?: string
  type: MobileLibType
  addFiles?: string
  removeFiles?: string[]
  deps?: DepsMap
  devDeps?: DepsMap
}

export async function generateMobileLib(host: Tree, lib: MobileLibOptions, options: NormalizedSchema) {
  await generatorMobileLib(host, {
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
  if (lib.addFiles) {
    addFiles(host, { ...options }, lib.addFiles)
  }
}
