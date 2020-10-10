import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, addRunScript, normalizeOptions } from '../../utils'
import { AdminDataAccessSchematicSchema } from './schema'

export default function (options: AdminDataAccessSchematicSchema): Rule {
  const name = options.name || 'data-access'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions(options, ProjectType.Library)
  return chain([
    schematic('admin-lib', {
      directory,
      name,
      type: 'data-access',
    }),
    addFiles(normalizedOptions),
    addRunScript('sdk', `graphql-codegen --config libs/${options.appName}/data-access/src/codegen.yml`),
  ])
}
