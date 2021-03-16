import { Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { normalizeOptions } from '../../../utils'
import { WebUiLibsSchematicSchema } from '../schema'
import { createUiLib } from './create-ui-lib'

export function createUiLibToast(options: WebUiLibsSchematicSchema): Rule {
  const name = 'toast'
  const normalizedOptions = normalizeOptions({ ...options, name: `ui/${name}` }, ProjectType.Library)

  return createUiLib(
    options.directory,
    name,
    `./files/${name}`,
    {
      '@ngneat/hot-toast': '2.0.1',
      '@ngneat/overview': '1.0.0',
    },
    normalizedOptions,
  )
}
