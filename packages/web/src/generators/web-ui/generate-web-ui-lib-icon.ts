import { normalizeOptions } from '@nxpm/common'
import { join } from 'path'
import { WebUiGeneratorSchema } from './schema'
import { generateWebUiLib } from './generate-web-ui-lib'

export async function generateWebUiLibIcon(host, options: WebUiGeneratorSchema) {
  const name = 'icon'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateWebUiLib(
    host,
    options.directory,
    name,
    join(__dirname, 'files', name),
    {
      '@ngneat/svg-icon': '2.2.2',
    },
    normalizedOptions,
  )
}
