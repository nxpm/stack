import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { MobileFeatureAboutSchematicSchema } from './schema'

export function createLibAboutFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: MobileFeatureAboutSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}
export default function (options: MobileFeatureAboutSchematicSchema): Rule {
  const name = 'about'
  const directory = options.directory || options.appName

  return chain([
    // Create Libs
    createLibAboutFeature(name, directory, 'feature', options),
  ])
}
