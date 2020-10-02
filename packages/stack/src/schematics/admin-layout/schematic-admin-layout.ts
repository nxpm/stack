import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { AdminLayoutSchematicSchema } from './schema'

export default function (options: AdminLayoutSchematicSchema): Rule {
  const name = options.name || 'layout'
  const appName = options.appName
  const projectName = appName ? `${appName}-${name}` : name
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name }, ProjectType.Library)
  return chain([
    schematic('admin-lib', {
      directory,
      name,
      type: 'layout',
    }),
    addFiles(normalizedOptions),
  ])
}
