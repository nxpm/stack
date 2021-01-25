import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { WebFeatureShellSchematicSchema } from './schema'

export function createLibShellFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: WebFeatureShellSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}
export default function (options: WebFeatureShellSchematicSchema): Rule {
  const name = 'shell'
  const directory = options.directory || options.appName

  return chain([
    // Create Libs
    createLibShellFeature(name, directory, 'feature', options),
  ])
}
