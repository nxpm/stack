import { Tree } from '@nrwl/devkit'
import { MobileUiGeneratorSchema } from './schema'
import { generateMobileUiLibButton } from './generate-mobile-ui-lib-button'
import { generateMobileUiLibForm } from './generate-mobile-ui-lib-form'
import { generateMobileUiLibLoader } from './generate-mobile-ui-lib-loader'
import { generateMobileUiLibIcon } from './generate-mobile-ui-lib-icon'
import { generateMobileUiLibPage } from './generate-mobile-ui-lib-page'
import { generateMobileUiLibPageHeader } from './generate-mobile-ui-lib-page-header'
import { generateMobileUiLibSidebarPage } from './generate-mobile-ui-lib-sidebar-page'
import { generateMobileUiLibTable } from './generate-mobile-ui-lib-table'

export async function generatorMobileUi(host: Tree, options: MobileUiGeneratorSchema) {
  const library = 'tailwind'
  const directory = options.directory || options.name

  options = { ...options, directory, library }

  await generateMobileUiLibButton(host, options)
  await generateMobileUiLibForm(host, options)
  await generateMobileUiLibLoader(host, options)
  await generateMobileUiLibIcon(host, options)
  await generateMobileUiLibPage(host, options)
  await generateMobileUiLibPageHeader(host, options)
  await generateMobileUiLibSidebarPage(host, options)
  await generateMobileUiLibTable(host, options)
}
