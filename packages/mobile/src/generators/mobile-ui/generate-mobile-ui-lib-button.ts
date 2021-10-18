import { normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { generateMobileUiLib } from './generate-mobile-ui-lib'
import { MobileUiGeneratorSchema } from './schema'

export async function generateMobileUiLibButton(host, options: MobileUiGeneratorSchema) {
  const name = 'button'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateMobileUiLib(host, options.directory, name, join(__dirname, 'files', name), {}, normalizedOptions)
}
