import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { addFiles, logEntry, NormalizedSchema, removeFiles } from '@nxpm/common'
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
  const startTime = new Date()
  logEntry(`           -> generateMobileLib ${options.name} start`)
  await generatorMobileLib(host, {
    directory: options.directory,
    name: options.name,
    type: lib.type,
    prefix: lib.prefix,
  })
  logEntry(`           -> generateMobileLib ${options.name} end`, startTime)

  if (lib.deps || lib.devDeps) {
    addDependenciesToPackageJson(host, lib.deps || {}, lib.devDeps || {})
    logEntry(`           -> generateMobileLib ${options.name} addDependenciesToPackageJson`, startTime)
  }

  if (lib.removeFiles?.length) {
    logEntry(`           -> generateMobileLib ${options.name} removeFiles`, startTime)
    removeFiles(host, lib.removeFiles, `${options.projectRoot}/src/lib/`)
  }
  if (lib.addFiles) {
    logEntry(`           -> generateMobileLib ${options.name} addFiles`, startTime)
    addFiles(host, { ...options }, lib.addFiles)
  }
  logEntry(`           -> generateMobileLib ${options.name}`, startTime)
}
