import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addPrismaConfig, ApiLibType, createApiLib, normalizeOptions } from '../../utils'
import { ApiFeatureCoreSchematicSchema } from './schema'

export function createLibCoreDataAccess(
  name: string,
  directory: string,
  type: ApiLibType,
  options: ApiFeatureCoreSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return chain([
    createApiLib(
      directory,
      name,
      `./files/${type}`,
      type,
      normalizedOptions,
      [
        `${options.appName}-${name}-${type}.controller.ts`,
        `${options.appName}-${name}-${type}.resolver.ts`,
        `${options.appName}-${name}-${type}.ts`,
        `${options.appName}-${name}-${type}.spec.ts`,
      ],
      {
        '@prisma/client': '2.15.0',
      },
      {
        '@prisma/cli': '2.15.0',
      },
    ),
    addPrismaConfig(normalizedOptions),
  ])
}

export function createLibCoreFeature(
  name: string,
  directory: string,
  type: ApiLibType,
  options: ApiFeatureCoreSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createApiLib(
    directory,
    name,
    `./files/${type}`,
    type,
    normalizedOptions,
    [`${options.appName}-${name}-${type}.ts`, `${options.appName}-${name}-${type}.spec.ts`],
    {
      '@kikstart-playground/graphql-intercom': '1.4.1',
      '@nestjs/config': '^0.5.0',
      '@nestjs/graphql': '^7.7.0',
      'apollo-server-express': '^2.18.0',
      'class-transformer': '^0.3.1',
      'class-validator': '^0.12.2',
      joi: '^17.2.1',
      graphql: '^15.3.0',
      'graphql-type-json': '^0.3.2',
      'graphql-tools': '^6.2.3',
    },
  )
}

export function createLibCoreUtil(
  name: string,
  directory: string,
  type: ApiLibType,
  options: ApiFeatureCoreSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createApiLib(directory, name, `./files/${type}`, type, normalizedOptions, [
    `${options.appName}-${name}-${type}.controller.ts`,
    `${options.appName}-${name}-${type}.resolver.ts`,
    `${options.appName}-${name}-${type}.ts`,
    `${options.appName}-${name}-${type}.spec.ts`,
  ])
}

export default function (options: ApiFeatureCoreSchematicSchema): Rule {
  const name = 'core'
  const directory = options.directory || options.appName

  return chain([
    // Create User Libs
    createLibCoreDataAccess(name, directory, 'data-access', options),
    createLibCoreFeature(name, directory, 'feature', options),
    createLibCoreUtil(name, directory, 'util', options),
  ])
}
