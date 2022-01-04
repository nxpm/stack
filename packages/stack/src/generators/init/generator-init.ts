import { formatFiles, Tree } from '@nrwl/devkit'
import { generatorApi } from '@nxpm/api'
import { logEntry, normalizeOptions, workspaceConfig } from '@nxpm/common'
import { generatorMobile } from '@nxpm/mobile'
import { generatorWeb } from '@nxpm/web'
import { join } from 'path'

import { InitGeneratorSchema } from './schema'
import { generatorSharedUtils } from '../shared-utils/generator-shared-utils'
import { generatorWorkspaceGenerators } from '../workspace-generators/generator-workspace-generators'

export async function generatorInit(host: Tree, options: InitGeneratorSchema) {
  // Prepare options
  const normalizedOptions = normalizeOptions<InitGeneratorSchema>(host, options)
  const startTime = new Date()
  if (!normalizedOptions.skipApi) {
    // Run API
    logEntry(` -> Run API`, startTime)
    await generatorApi(host, {
      ...normalizedOptions,
      name: normalizedOptions.appNameApi,
      type: normalizedOptions.appTypeApi,
    })
  }

  if (!normalizedOptions.skipMobile) {
    // Run Mobile
    logEntry(` -> Run Mobile`, startTime)
    await generatorMobile(host, {
      ...normalizedOptions,
      name: options.mobileName,
      type: options.mobileType,
    })
  }

  if (!normalizedOptions.skipWeb) {
    // Run Web
    logEntry(` -> Run Web`, startTime)
    await generatorWeb(host, {
      ...normalizedOptions,
      name: options.webName,
      type: options.webType,
    })
  }

  if (!normalizedOptions.skipMobile || !normalizedOptions.skipWeb) {
    // Run Shared Utils
    logEntry(` -> Run Shared Utils`, startTime)
    await generatorSharedUtils(host, {
      ...normalizedOptions,
      directory: 'shared',
    })
  }

  await generatorWorkspaceGenerators(host, normalizedOptions)
  workspaceConfig(host, normalizedOptions, join(__dirname, 'files'))
  await formatFiles(host)
}
