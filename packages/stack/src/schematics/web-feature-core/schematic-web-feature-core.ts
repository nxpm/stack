import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { WebFeatureCoreSchematicSchema } from './schema'

export function createLibCoreFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureCoreSchematicSchema,
  filesToRemove: string[] = [],
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions, filesToRemove)
}

export default function (options: WebFeatureCoreSchematicSchema): Rule {
  const name = 'core'
  const directory = options.directory || options.appName

  return chain([
    createLibCoreFeature(name, directory, 'data-access', options, [`${options.appName}-data-access-${name}.module.ts`]),
    createLibCoreFeature(name, directory, 'feature', options),
  ])
}
