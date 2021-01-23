import { Rule } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { normalizeOptions } from '../../../utils'
import { WebUiLibsSchematicSchema } from '../schema'
import { createUiLib } from './create-ui-lib'

export function createUiLibSidebarPage(options: WebUiLibsSchematicSchema): Rule {
  const name = 'sidebar-page'
  const normalizedOptions = normalizeOptions({ ...options, name: `ui/${name}` }, ProjectType.Library)

  return createUiLib(options.directory, name, `./files/${name}/${options.library}`, {}, normalizedOptions)
}
