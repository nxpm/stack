import { Tree } from '@nrwl/devkit'
import { logEntry } from '@nxpm/common'
import { generateMobileUiLibButton } from './generate-mobile-ui-lib-button'
import { generateMobileUiLibForm } from './generate-mobile-ui-lib-form'
import { generateMobileUiLibIcon } from './generate-mobile-ui-lib-icon'
import { generateMobileUiLibLoader } from './generate-mobile-ui-lib-loader'
import { generateMobileUiLibPage } from './generate-mobile-ui-lib-page'
import { generateMobileUiLibPageHeader } from './generate-mobile-ui-lib-page-header'
import { generateMobileUiLibSidebarPage } from './generate-mobile-ui-lib-sidebar-page'
import { generateMobileUiLibTable } from './generate-mobile-ui-lib-table'
import { MobileUiGeneratorSchema } from './schema'

export async function generatorMobileUi(host: Tree, options: MobileUiGeneratorSchema) {
  const library = 'tailwind'
  const directory = options.directory || options.name

  options = { ...options, directory, library }
  const startTime = new Date()
  logEntry(`      -> generateMobileUiLibButton`, startTime)
  await generateMobileUiLibButton(host, options)
  logEntry(`      -> generateMobileUiLibForm`, startTime)
  await generateMobileUiLibForm(host, options)
  logEntry(`      -> generateMobileUiLibLoader`, startTime)
  await generateMobileUiLibLoader(host, options)
  logEntry(`      -> generateMobileUiLibIcon`, startTime)
  await generateMobileUiLibIcon(host, options)
  logEntry(`      -> generateMobileUiLibPage`, startTime)
  await generateMobileUiLibPage(host, options)
  logEntry(`      -> generateMobileUiLibPageHeader`, startTime)
  await generateMobileUiLibPageHeader(host, options)
  logEntry(`      -> generateMobileUiLibSidebarPage`, startTime)
  await generateMobileUiLibSidebarPage(host, options)
  logEntry(`      -> generateMobileUiLibTable`, startTime)
  await generateMobileUiLibTable(host, options)
}
