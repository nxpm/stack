import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { ApiLibType, createApiLib, normalizeOptions, removeFiles } from '../../utils'
import { ApiFeatureAuthSchematicSchema } from './schema'

export function createLibAuthDataAccess(
  name: string,
  directory: string,
  type: ApiLibType,
  options: ApiFeatureAuthSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return chain([
    createApiLib(directory, name, `./files/${type}`, type, normalizedOptions, [], {
      '@nestjs/jwt': '^7.2.0',
      '@nestjs/passport': '^7.1.5',
      bcryptjs: '^2.4.3',
      passport: '^0.4.1',
      'passport-jwt': '^4.0.0',
    }),
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

export function createLibAuthFeature(
  name: string,
  directory: string,
  type: ApiLibType,
  options: ApiFeatureAuthSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createApiLib(directory, name, `./files/${type}`, type, normalizedOptions, [
    `${options.appName}-${name}-${type}.controller.ts`,
    `${options.appName}-${name}-${type}.service.ts`,
    `${options.appName}-${name}-${type}.ts`,
    `${options.appName}-${name}-${type}.spec.ts`,
  ])
}

export function createLibAuthUtil(
  name: string,
  directory: string,
  type: ApiLibType,
  options: ApiFeatureAuthSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createApiLib(directory, name, `./files/${type}`, type, normalizedOptions, [
    `${options.appName}-${name}-${type}.controller.ts`,
    `${options.appName}-${name}-${type}.service.ts`,
    `${options.appName}-${name}-${type}.resolver.ts`,
    `${options.appName}-${name}-${type}.ts`,
    `${options.appName}-${name}-${type}.spec.ts`,
  ])
}

export default function (options: ApiFeatureAuthSchematicSchema): Rule {
  const name = 'auth'
  const directory = options.directory || options.appName

  return chain([
    // Create User Libs
    createLibAuthDataAccess(name, directory, 'data-access', options),
    createLibAuthFeature(name, directory, 'feature', options),
    createLibAuthUtil(name, directory, 'util', options),
  ])
}
