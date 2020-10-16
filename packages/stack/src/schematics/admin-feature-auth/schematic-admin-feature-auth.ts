import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { AdminFeatureAuthSchematicSchema } from './schema'

export default function (options: AdminFeatureAuthSchematicSchema): Rule {
  const name = options.name || 'auth'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `feature-${name}` }, ProjectType.Library)
  return chain([
    schematic('admin-lib', {
      directory,
      name,
      type: 'feature',
    }),
    addFiles(normalizedOptions),
  ])
}
