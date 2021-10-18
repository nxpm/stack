import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { addFiles, NormalizedSchema } from '@nxpm/common'
import { generateMobileLib } from '../../helpers'

export async function generateMobileUiLib(
  host: Tree,
  directory: string,
  name: string,
  path: string,
  deps: Record<string, string>,
  normalizedOptions: NormalizedSchema,
) {
  addDependenciesToPackageJson(host, deps, {})
  await generateMobileLib(host, { prefix: 'ui', type: 'ui', directory, name }, normalizedOptions)
  addFiles(host, normalizedOptions, path)
}
