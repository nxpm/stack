import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { ApiLibType, createApiLib, normalizeOptions, removeFiles } from '../../utils'
import { ApiFeatureAccountSchematicSchema } from './schema'

export function createLibAccountDataAccess(
  name: string,
  type: ApiLibType,
  options: ApiFeatureAccountSchematicSchema,
): Rule {
  const directory = options.directory || options.appName
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return chain([
    createApiLib(directory, name, `./files/${type}`, type, normalizedOptions),
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

export function createLibAccountFeature(
  name: string,
  type: ApiLibType,
  options: ApiFeatureAccountSchematicSchema,
): Rule {
  const directory = options.directory || options.appName
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return chain([
    createApiLib(directory, name, `./files/${type}`, type, normalizedOptions),
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

export default function (options: ApiFeatureAccountSchematicSchema): Rule {
  const name = 'account'
  return chain([
    // Create Account Libs
    createLibAccountDataAccess(name, 'data-access', options),
    createLibAccountFeature(name, 'feature', options),
  ])
}
