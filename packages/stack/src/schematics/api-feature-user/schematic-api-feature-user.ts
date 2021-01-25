import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createApiLib, normalizeOptions, removeFiles } from '../../utils'
import { ApiFeatureUserSchematicSchema } from './schema'

export function createLibUserDataAccess(options: ApiFeatureUserSchematicSchema): Rule {
  const name = 'user'
  const type = 'data-access'
  const directory = options.directory || options.appName
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return chain([
    createApiLib(directory, name, `./files/${type}`, type, {}, normalizedOptions),
    removeFiles(
      [
        `${options.appName}-${name}-${type}.controller.ts`,
        `${options.appName}-${name}-${type}.resolver.ts`,
        `${options.appName}-${name}-${type}.ts`,
        `${options.appName}-${name}-${type}.spec.ts`,
      ],
      `${normalizedOptions.projectRoot}/src/lib/`,
    ),
  ])
}

export function createLibUserFeature(options: ApiFeatureUserSchematicSchema): Rule {
  const name = 'user'
  const type = 'feature'
  const directory = options.directory || options.appName
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return chain([
    createApiLib(directory, name, `./files/${type}`, type, {}, normalizedOptions),
    removeFiles(
      [
        `${options.appName}-${name}-${type}.controller.ts`,
        `${options.appName}-${name}-${type}.service.ts`,
        `${options.appName}-${name}-${type}.ts`,
        `${options.appName}-${name}-${type}.spec.ts`,
      ],
      `${normalizedOptions.projectRoot}/src/lib/`,
    ),
  ])
}

export default function (options: ApiFeatureUserSchematicSchema): Rule {
  return chain([
    // Create User Libs
    createLibUserDataAccess(options),
    createLibUserFeature(options),
  ])
}
