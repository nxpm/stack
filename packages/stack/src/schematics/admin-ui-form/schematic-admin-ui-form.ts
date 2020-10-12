import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { AdminUiFormSchematicSchema } from './schema'

export default function (options: AdminUiFormSchematicSchema): Rule {
  const name = options.name || 'form'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `ui-${name}` }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      {
        '@ngx-formly/core': '5.10.3',
        '@ngx-formly/bootstrap': '5.10.3',
      },
      {},
      true,
    ),
    schematic('admin-lib', {
      directory,
      name,
      type: 'ui',
    }),
    addFiles(normalizedOptions),
  ])
}
