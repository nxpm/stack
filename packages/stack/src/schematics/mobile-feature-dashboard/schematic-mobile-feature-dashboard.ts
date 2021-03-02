import { chain, Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { createWebLib, normalizeOptions, WebLibType } from '../../utils'
import { MobileFeatureDashboardSchematicSchema } from './schema'

export function createLibDashboardFeature(
  name: string,
  directory: string,
  type: WebLibType,
  options: MobileFeatureDashboardSchematicSchema,
): Rule {
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/${type}`, directory }, ProjectType.Library)

  return createWebLib(directory, name, `./files/${type}`, type, normalizedOptions)
}
export default function (options: MobileFeatureDashboardSchematicSchema): Rule {
  const name = 'dashboard'
  const directory = options.directory || options.appName

  return chain([
    // Create Libs
    createLibDashboardFeature(name, directory, 'feature', options),
  ])
}
