import { formatFiles, Tree } from '@nrwl/devkit'
import { generatorApi } from '@nxpm/api'
import { normalizeOptions, workspaceConfig } from '@nxpm/common'
import { join } from 'path'

import { InitGeneratorSchema } from './schema'

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
    // await generatorWeb(host, { name: options.webName, type: options.webType })
  }

  workspaceConfig(host, normalizedOptions, join(__dirname, 'files'))
  await formatFiles(host)
}
