import { Tree } from '@nrwl/devkit'
import { logEntry } from '@nxpm/common'
import { generateWebUiLibButton } from './generate-web-ui-lib-button'
import { generateWebUiLibForm } from './generate-web-ui-lib-form'
import { generateWebUiLibIcon } from './generate-web-ui-lib-icon'
import { generateWebUiLibLoader } from './generate-web-ui-lib-loader'
import { generateWebUiLibPage } from './generate-web-ui-lib-page'
import { generateWebUiLibPageHeader } from './generate-web-ui-lib-page-header'
import { generateWebUiLibSidebarPage } from './generate-web-ui-lib-sidebar-page'
import { generateWebUiLibTable } from './generate-web-ui-lib-table'
import { generateWebUiLibToast } from './generate-web-ui-lib-toast'
import { WebUiGeneratorSchema } from './schema'

export async function generatorWebUi(host: Tree, options: WebUiGeneratorSchema) {
  const library = 'tailwind'
  const directory = options.directory || options.name

  options = { ...options, directory, library }
  const startTime = new Date()
  logEntry(`      -> generateWebUiLibButton`, startTime)
  await generateWebUiLibButton(host, options)
  logEntry(`      -> generateWebUiLibForm`, startTime)
  await generateWebUiLibForm(host, options)
  logEntry(`      -> generateWebUiLibLoader`, startTime)
  await generateWebUiLibLoader(host, options)
  logEntry(`      -> generateWebUiLibIcon`, startTime)
  await generateWebUiLibIcon(host, options)
  logEntry(`      -> generateWebUiLibPage`, startTime)
  await generateWebUiLibPage(host, options)
  logEntry(`      -> generateWebUiLibPageHeader`, startTime)
  await generateWebUiLibPageHeader(host, options)
  logEntry(`      -> generateWebUiLibSidebarPage`, startTime)
  await generateWebUiLibSidebarPage(host, options)
  logEntry(`      -> generateWebUiLibTable`, startTime)
  await generateWebUiLibTable(host, options)
  logEntry(`      -> generateWebUiLibToast`, startTime)
  await generateWebUiLibToast(host, options)
}
