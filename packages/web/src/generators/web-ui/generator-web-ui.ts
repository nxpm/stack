import { Tree } from '@nrwl/devkit'
import { WebUiGeneratorSchema } from './schema'
import { generateWebUiLibButton } from './generate-web-ui-lib-button'
import { generateWebUiLibForm } from './generate-web-ui-lib-form'
import { generateWebUiLibLoader } from './generate-web-ui-lib-loader'
import { generateWebUiLibIcon } from './generate-web-ui-lib-icon'
import { generateWebUiLibPage } from './generate-web-ui-lib-page'
import { generateWebUiLibPageHeader } from './generate-web-ui-lib-page-header'
import { generateWebUiLibSidebarPage } from './generate-web-ui-lib-sidebar-page'
import { generateWebUiLibTable } from './generate-web-ui-lib-table'
import { generateWebUiLibToast } from './generate-web-ui-lib-toast'

export async function generatorWebUi(host: Tree, options: WebUiGeneratorSchema) {
  const library = 'tailwind'
  const directory = options.directory || options.name

  options = { ...options, directory, library }

  await generateWebUiLibButton(host, options)
  await generateWebUiLibForm(host, options)
  await generateWebUiLibLoader(host, options)
  await generateWebUiLibIcon(host, options)
  await generateWebUiLibPage(host, options)
  await generateWebUiLibPageHeader(host, options)
  await generateWebUiLibSidebarPage(host, options)
  await generateWebUiLibTable(host, options)
  await generateWebUiLibToast(host, options)
}
