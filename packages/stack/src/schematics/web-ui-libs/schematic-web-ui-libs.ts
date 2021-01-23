import { chain, Rule } from '@angular-devkit/schematics'
import { createUiFormLib } from './libs/create-ui-form-lib'
import { WebUiLibsSchematicSchema } from './schema'

export default function (options: WebUiLibsSchematicSchema): Rule {
  return chain([
    createUiFormLib(options),
    // createUiLoadingLib
    // createUiIconLib
    // createUiPageLib
    // createUiPageHeaderLib
    // createUiSidebarPageLib
  ])
}
