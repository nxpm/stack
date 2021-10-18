import { normalizeOptions, versions } from '@nxpm/common'
import { join } from 'path'
import { generateMobileUiLib } from './generate-mobile-ui-lib'
import { MobileUiGeneratorSchema } from './schema'

export async function generateMobileUiLibForm(host, options: MobileUiGeneratorSchema) {
  const name = 'form'
  const normalizedOptions = normalizeOptions(host, { ...options, name: `ui/${name}` }, 'library')

  await generateMobileUiLib(
    host,
    options.directory,
    name,
    join(__dirname, 'files', name),
    {
      '@ngx-formly/core': versions.ngxFormlyCore,
      '@ngx-formly/ionic': versions.ngxFormlyIonic,
    },
    normalizedOptions,
  )
}
