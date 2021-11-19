import { formatFiles, Tree } from '@nrwl/devkit'
import { generatorApi } from '@nxpm/api'
import { normalizeOptions, workspaceConfig } from '@nxpm/common'
import { generatorMobile } from '@nxpm/mobile'
import { generatorWeb } from '@nxpm/web'
import { join } from 'path'

import { InitGeneratorSchema } from './schema'
import { generatorSharedUtils } from '../shared-utils/generator-shared-utils'
import { generatorWorkspaceGenerators } from '../workspace-generators/generator-workspace-generators'

export async function generatorInit(host: Tree, options: InitGeneratorSchema) {
  // Prepare options
  const normalizedOptions = normalizeOptions<InitGeneratorSchema>(host, options)

  if (!normalizedOptions.skipApi) {
    // Run API
    console.log(`Generate API`)
    await generatorApi(host, {
      ...normalizedOptions,
      name: normalizedOptions.appNameApi,
      type: normalizedOptions.appTypeApi,
    })
  }

  if (!normalizedOptions.skipMobile) {
    // Run Mobile
    console.log(`Generate Mobile`)
    await generatorMobile(host, {
      ...normalizedOptions,
      name: options.mobileName,
      type: options.mobileType,
    })
  }

  if (!normalizedOptions.skipWeb) {
    // Run Web
    console.log(`Generate Web`)
    await generatorWeb(host, {
      ...normalizedOptions,
      name: options.webName,
      type: options.webType,
    })
  }

  if (!normalizedOptions.skipMobile || !normalizedOptions.skipWeb) {
    // Run Shared Utils
    console.log(`Generate Shared Utils`)
    await generatorSharedUtils(host, {
      ...normalizedOptions,
      directory: 'shared',
    })
  }

  console.log(`Generate Workspace`)
  await generatorWorkspaceGenerators(host, normalizedOptions)
  workspaceConfig(host, normalizedOptions, join(__dirname, 'files'))

  console.log(`Formatting`)
  await formatFiles(host)
}
