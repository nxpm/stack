import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { addFiles, NormalizedSchema } from '@nxpm/common'
import { generateWebLib } from '../../helpers'

export async function generateWebUiLib(
  host: Tree,
  directory: string,
  name: string,
  path: string,
  deps: Record<string, string>,
  normalizedOptions: NormalizedSchema,
) {
  addDependenciesToPackageJson(host, deps, {})
  await generateWebLib(host, { prefix: 'ui', type: 'ui', directory, name }, normalizedOptions)
  addFiles(host, normalizedOptions, path)
}
