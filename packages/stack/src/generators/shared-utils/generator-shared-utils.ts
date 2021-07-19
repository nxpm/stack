import { Tree } from '@nrwl/devkit'
import { addRunScript, normalizeOptions } from '@nxpm/common'
import { generateWebLib } from '@nxpm/web'
import { SharedUtilsGeneratorSchema } from './schema'
import { join } from 'path'

export async function generatorSharedUtils(host: Tree, options: SharedUtilsGeneratorSchema) {
  const sdkName = 'sdk'
  const normalizedOptions = normalizeOptions(
    host,
    { ...options, directory: options.directory, name: `util/${sdkName}` },
    'library',
  )

  await generateWebLib(
    host,
    {
      prefix: 'util',
      type: 'util',
      directory: options.directory,
      name: sdkName,
      addFiles: join(__dirname, 'files', sdkName),
    },
    normalizedOptions,
  )

  addRunScript(host, `dev:${sdkName}`, `yarn build:${sdkName} --watch`)
  addRunScript(host, `build:${sdkName}`, `graphql-codegen --config ${normalizedOptions.projectRoot}/src/codegen.yml`)
}
