import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { WebUiFormSchematicSchema } from './schema'

export default function (options: WebUiFormSchematicSchema): Rule {
  const name = options.name || 'form'
  const library = options.library || 'bootstrap'
  const deps = library === 'bootstrap' ? { '@ngx-formly/bootstrap': '^5.10.8' } : {}
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `ui-${name}` }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      {
        '@ngx-formly/core': '^5.10.8',
        ...deps,
      },
      {},
      true,
    ),
    schematic('web-lib', {
      directory,
      name,
      type: 'ui',
      classic: true,
    }),
    addFiles(normalizedOptions, `./files/${library}`),
  ])
}
