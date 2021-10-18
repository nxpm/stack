import { normalizeOptions, versions } from '@nxpm/common'
import { join } from 'path'
import { generateWebUiLib } from './generate-web-ui-lib'
import { WebUiGeneratorSchema } from './schema'

export async function generateWebUiLibForm(host, options: WebUiGeneratorSchema) {
  const name = 'form'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateWebUiLib(
    host,
    options.directory,
    name,
    join(__dirname, 'files', name),
    {
      '@ngx-formly/core': versions.ngxFormlyCore,
    },
    normalizedOptions,
  )
}
