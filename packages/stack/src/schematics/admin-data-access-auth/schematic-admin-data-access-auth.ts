import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, addRunScript, normalizeOptions } from '../../utils'
import { AdminDataAccessAuthSchematicSchema } from './schema'

export default function (options: AdminDataAccessAuthSchematicSchema): Rule {
  const name = options.name || 'data-access'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `data-access-${name}` }, ProjectType.Library)
  return chain([
    schematic('admin-lib', {
      directory,
      name,
      type: 'data-access',
    }),
    addFiles(normalizedOptions),
    addRunScript('sdk:watch', 'yarn sdk --watch'),
    addRunScript('sdk', `graphql-codegen --config ${normalizedOptions.projectRoot}/src/codegen.yml`),
  ])
}
