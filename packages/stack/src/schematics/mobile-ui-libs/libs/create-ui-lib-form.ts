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
      '@ngx-formly/core': '5.10.13',
      ...(options.library === 'ionic-angular' ? { '@ngx-formly/ionic': '5.10.13' } : {}),
    },
    normalizedOptions,
  )
}
