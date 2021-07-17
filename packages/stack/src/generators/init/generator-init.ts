import { formatFiles, Tree } from '@nrwl/devkit'
import { generatorApi } from '@nxpm/api'
import { InitGeneratorSchema } from './schema'
import { normalizeOptions, writeNxpmConfigHelper } from '@nxpm/common'

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
  // Configure Workspace
  // addFiles(host, normalizedOptions, join(__dirname, 'files'))
  writeNxpmConfigHelper(host, normalizedOptions)
  // Format files
  await formatFiles(host)
}
