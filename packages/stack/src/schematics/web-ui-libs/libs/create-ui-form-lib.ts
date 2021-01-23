import { Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { normalizeOptions } from '@nxpm/stack'
import { WebUiLibsSchematicSchema } from '../schema'
import { createUiLib } from './create-ui-lib'

export function createUiFormLib(options: WebUiLibsSchematicSchema): Rule {
  const name = 'form'
  const library = options.library || 'tailwind'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `ui/${name}` }, ProjectType.Library)
  const deps = library === 'bootstrap' ? { '@ngx-formly/bootstrap': '^5.10.8' } : {}

  return createUiLib(
    directory,
    name,
    `../files/${name}/${library}`,
    {
      '@ngx-formly/core': '^5.10.8',
      ...deps,
    },
    normalizedOptions,
  )
}
