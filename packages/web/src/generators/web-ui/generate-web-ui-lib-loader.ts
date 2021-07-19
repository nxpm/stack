import { normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { WebUiGeneratorSchema } from './schema'
import { generateWebUiLib } from './generate-web-ui-lib'

export async function generateWebUiLibLoader(host, options: WebUiGeneratorSchema) {
  const name = 'loader'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateWebUiLib(host, options.directory, name, join(__dirname, 'files', name), {}, normalizedOptions)
}
