import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { addFiles, logEntry, NormalizedSchema, removeFiles, timeDiff } from '@nxpm/common'
import { generatorWebLib } from '../generators/web-lib/generator-web-lib'

export type WebLibType = 'data-access' | 'feature' | 'none' | 'util' | 'ui'

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
  const startTime = new Date()
  logEntry(`           -> generateWebLib ${options.name} start`)
  await generatorWebLib(host, {
    directory: options.directory,
    name: options.name,
    type: lib.type,
    prefix: lib.prefix,
  })
  logEntry(`           -> generateWebLib ${options.name} end`, startTime)

  if (lib.deps || lib.devDeps) {
    logEntry(`           -> generateWebLib ${options.name} addDependenciesToPackageJson`, startTime)
    addDependenciesToPackageJson(host, lib.deps || {}, lib.devDeps || {})
  }

  if (lib.removeFiles?.length) {
    logEntry(`           -> generateWebLib ${options.name} removeFiles`, startTime)
    removeFiles(host, lib.removeFiles, `${options.projectRoot}/src/lib/`)
  }
  if (lib.addFiles) {
    logEntry(`           -> generateWebLib ${options.name} addFiles`, startTime)
    addFiles(host, { ...options }, lib.addFiles)
  }
  logEntry(`           -> generateWebLib ${options.name} took ${timeDiff(startTime)}`, startTime)
}
