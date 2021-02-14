import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addRunScript, createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { SharedUtilLibsSchematicSchema } from './schema'

export function createLibUtilSdk(
  name: string,
  directory: string,
  type: WebLibType,
  options: SharedUtilLibsSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${type}/${name}`, directory }, ProjectType.Library)
  const sdkName = `${options.directory !== 'shared' ? `${options.directory}:` : ''}sdk`
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
    addRunScript(`dev:${sdkName}`, `yarn build:${sdkName} --watch`),
    addRunScript(`build:${sdkName}`, `graphql-codegen --config ${normalizedOptions.projectRoot}/src/codegen.yml`),
  ])
}

export default function (options: SharedUtilLibsSchematicSchema): Rule {
  const directory = options.directory || 'shared'

  return chain([
    // Create User Libs
    createLibUtilSdk('sdk', directory, 'util', options),
  ])
}
