import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { WebFeatureAuthSchematicSchema } from './schema'

export function createLibAuthDataAccess(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureAuthSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export function createLibAuthFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureAuthSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export function createLibAuthUi(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureAuthSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export default function (options: WebFeatureAuthSchematicSchema): Rule {
  const name = 'auth'
  const directory = options.directory || options.appName

  return chain([
    // Create User Libs
    createLibAuthDataAccess(name, directory, 'data-access', options),
    createLibAuthFeature(name, directory, 'feature', options),
    createLibAuthUi(name, directory, 'ui', options),
  ])
}
