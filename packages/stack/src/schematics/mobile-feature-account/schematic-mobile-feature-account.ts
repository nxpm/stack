import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { MobileFeatureAccountSchematicSchema } from './schema'

export function createLibAccountFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: MobileFeatureAccountSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export function createLibAccountUi(
  name: string,
  directory: string,
  type: WebLibType,
  options: MobileFeatureAccountSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export default function (options: MobileFeatureAccountSchematicSchema): Rule {
  const name = 'account'
  const directory = options.directory || options.appName

  return chain([
    // Create User Libs
    createLibAccountFeature(name, directory, 'feature', options),
    createLibAccountUi(name, directory, 'ui', options),
  ])
}
