import { chain, Rule } from '@angular-devkit/schematics'
import {
  createUiLibForm,
  createUiLibIcon,
  createUiLibLoader,
  createUiLibPage,
  createUiLibPageHeader,
  createUiLibSidebarPage,
} from './libs'
import { WebUiLibsSchematicSchema } from './schema'

export default function (options: WebUiLibsSchematicSchema): Rule {
  const library = options.library || 'tailwind'
  const directory = options.directory || options.name

  options = { ...options, directory, library }

  return chain([
    createUiLibForm(options),
    createUiLibLoader(options),
    createUiLibIcon(options),
    createUiLibPage(options),
    createUiLibPageHeader(options),
    createUiLibSidebarPage(options),
  ])
}
