import { Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { normalizeOptions } from '../../../utils'
import { WebUiLibsSchematicSchema } from '../schema'
import { createUiLib } from './create-ui-lib'

export function createUiLibForm(options: WebUiLibsSchematicSchema): Rule {
  const name = 'form'
  const normalizedOptions = normalizeOptions({ ...options, name: `ui/${name}` }, ProjectType.Library)

  return createUiLib(
    options.directory,
    name,
    `./files/${name}/${options.library}`,
    {
      '@ngx-formly/core': '^5.10.8',
      ...(options.library === 'bootstrap' ? { '@ngx-formly/bootstrap': '^5.10.8' } : {}),
    },
    normalizedOptions,
  )
}
