import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addRunScript, createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { WebFeatureCoreSchematicSchema } from './schema'

export function createLibCoreDataAccess(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureCoreSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)
  const sdkName = `sdk:${options.appName}`
  return chain([
    createWebLib(directory, name, `./files/${type}`, type, normalizedOptions),
    addRunScript(`${sdkName}:watch`, `yarn ${sdkName} --watch`),
    addRunScript(`${sdkName}`, `graphql-codegen --config ${normalizedOptions.projectRoot}/src/codegen.yml`),
  ])
}

export function createLibCoreFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureCoreSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export default function (options: WebFeatureCoreSchematicSchema): Rule {
  const name = 'core'
  const directory = options.directory || options.appName

  return chain([
    // Create User Libs
    createLibCoreDataAccess(name, directory, 'data-access', options),
    createLibCoreFeature(name, directory, 'feature', options),
  ])
}
