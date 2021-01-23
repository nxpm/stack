import { Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { normalizeOptions } from '../../../utils'
import { WebUiLibsSchematicSchema } from '../schema'
import { createUiLib } from './create-ui-lib'

export function createUiLibIcon(options: WebUiLibsSchematicSchema): Rule {
  const name = 'icon'
  const normalizedOptions = normalizeOptions({ ...options, name: `ui/${name}` }, ProjectType.Library)

  return createUiLib(
    options.directory,
    name,
    `./files/${name}`,
    {
      '@ngneat/svg-icon': '2.2.2',
    },
    normalizedOptions,
  )
}
