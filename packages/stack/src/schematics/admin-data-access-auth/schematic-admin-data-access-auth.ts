import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { AdminDataAccessAuthSchematicSchema } from './schema'

export default function (options: AdminDataAccessAuthSchematicSchema): Rule {
  const type = 'data-access'
  const name = options.name || 'data-access'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `${type}-${name}` }, ProjectType.Library)
  return chain([
    // Execute Schematic
    schematic('admin-lib', { directory, name, type }),
    // Add Files
    addFiles(normalizedOptions),
  ])
}
