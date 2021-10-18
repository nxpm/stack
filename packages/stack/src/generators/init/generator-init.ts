import { formatFiles, Tree } from '@nrwl/devkit'
import { generatorApi } from '@nxpm/api'
import { normalizeOptions, workspaceConfig } from '@nxpm/common'
import { generatorWeb } from '@nxpm/web'
import { join } from 'path'

import { InitGeneratorSchema } from './schema'
import { generatorSharedUtils } from '../shared-utils/generator-shared-utils'

export async function generatorInit(host: Tree, options: InitGeneratorSchema) {
  // Prepare options
  const normalizedOptions = normalizeOptions<InitGeneratorSchema>(host, options)

  if (!normalizedOptions.skipApi) {
    // Run API
    await generatorApi(host, {
      ...normalizedOptions,
      name: normalizedOptions.appNameApi,
      type: normalizedOptions.appTypeApi,
    })
  }

  if (!normalizedOptions.skipMobile) {
    // Run Mobile
    // await generatorMobile(host, { name: options.mobileName, type: options.mobileType })
  }

  if (!normalizedOptions.skipWeb) {
    // Run Web
    await generatorWeb(host, {
      ...normalizedOptions,
      name: options.webName,
      type: options.webType,
    })
  }

  if (!normalizedOptions.skipMobile || !normalizedOptions.skipWeb) {
    // Run Shared Utils
    await generatorSharedUtils(host, {
      ...normalizedOptions,
      directory: 'shared',
    })
  }

  workspaceConfig(host, normalizedOptions, join(__dirname, 'files'))
  await formatFiles(host)
}
