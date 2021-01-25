import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { WebFeatureAdminSchematicSchema } from './schema'

export function createLibAdminFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureAdminSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export function createLibAdminUi(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureAdminSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}

export default function (options: WebFeatureAdminSchematicSchema): Rule {
  const name = 'admin'
  const directory = options.directory || options.appName

  return chain([
    // Create User Libs
    createLibAdminFeature(name, directory, 'feature', options),
    createLibAdminUi(name, directory, 'ui', options),
  ])
}
