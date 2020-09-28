import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { AdminFeatureShellSchematicSchema } from './schema'

export default function (options: AdminFeatureShellSchematicSchema): Rule {
  const name = options.name || 'shell'
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
