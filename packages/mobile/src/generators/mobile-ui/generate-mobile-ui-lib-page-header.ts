import { normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { MobileUiGeneratorSchema } from './schema'
import { generateMobileUiLib } from './generate-mobile-ui-lib'

export async function generateMobileUiLibPageHeader(host, options: MobileUiGeneratorSchema) {
  const name = 'page-header'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateMobileUiLib(host, options.directory, name, join(__dirname, 'files', name), {}, normalizedOptions)
}
