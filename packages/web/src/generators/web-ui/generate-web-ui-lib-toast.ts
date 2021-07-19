import { normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { WebUiGeneratorSchema } from './schema'
import { generateWebUiLib } from './generate-web-ui-lib'

export async function generateWebUiLibToast(host, options: WebUiGeneratorSchema) {
  const name = 'toast'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateWebUiLib(
    host,
    options.directory,
    name,
    join(__dirname, 'files', name),
    {
      '@ngneat/hot-toast': '2.0.1',
      '@ngneat/overview': '1.0.0',
    },
    normalizedOptions,
  )
}
