import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { addFiles, logEntry, NormalizedSchema } from '@nxpm/common'
import { generateWebLib } from '../../helpers'

export async function generateWebUiLib(
  host: Tree,
  directory: string,
  name: string,
  path: string,
  deps: Record<string, string>,
  normalizedOptions: NormalizedSchema,
) {
  const startTime = new Date()
  logEntry(`        -> generateWebUiLib ${name}`, startTime)
  logEntry(`          -> generateWebUiLib ${name} deps`, startTime)
  addDependenciesToPackageJson(host, deps, {})
  logEntry(`          -> generateWebUiLib ${name} lib`, startTime)
  await generateWebLib(host, { prefix: 'ui', type: 'ui', directory, name }, normalizedOptions)
  logEntry(`          -> generateWebUiLib ${name} files`, startTime)
  addFiles(host, normalizedOptions, path)
}
