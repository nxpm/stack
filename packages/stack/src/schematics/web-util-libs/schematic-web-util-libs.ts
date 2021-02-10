import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addRunScript, createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { WebUtilLibsSchematicSchema } from './schema'

export function createLibUtilSdk(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebUtilLibsSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${type}/${name}`, directory }, ProjectType.Library)
  const sdkName = `sdk:${options.appName}`
  return chain([
    createWebLib(
      directory,
      name,
      `./files/${name}`,
      type,
      { ...normalizedOptions },
      [
        //
        `${options.appName}-${type}-${name}.module.ts`,
      ],
      {},
      {},
      true,
    ),
    addRunScript(`${sdkName}:watch`, `yarn ${sdkName} --watch`),
    addRunScript(`${sdkName}`, `graphql-codegen --config ${normalizedOptions.projectRoot}/src/codegen.yml`),
  ])
}

export default function (options: WebUtilLibsSchematicSchema): Rule {
  const directory = options.directory || options.appName

  return chain([
    // Create User Libs
    createLibUtilSdk('sdk', directory, 'util', options),
  ])
}
