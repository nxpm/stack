import { normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { MobileUiGeneratorSchema } from './schema'
import { generateMobileUiLib } from './generate-mobile-ui-lib'

export async function generateMobileUiLibSidebarPage(host, options: MobileUiGeneratorSchema) {
  const name = 'sidebar-page'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateMobileUiLib(host, options.directory, name, join(__dirname, 'files', name), {}, normalizedOptions)
}
