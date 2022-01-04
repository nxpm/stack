import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { addFiles, logEntry, NormalizedSchema } from '@nxpm/common'
import { generateMobileLib } from '../../helpers'

export async function generateMobileUiLib(
  host: Tree,
  directory: string,
  name: string,
  path: string,
  deps: Record<string, string>,
  normalizedOptions: NormalizedSchema,
) {
  const startTime = new Date()
  logEntry(`        -> generateMobileUiLib ${name}`, startTime)
  logEntry(`          -> generateMobileUiLib ${name} deps`, startTime)
  addDependenciesToPackageJson(host, deps, {})
  logEntry(`          -> generateMobileUiLib ${name} lib`, startTime)
  await generateMobileLib(host, { prefix: 'ui', type: 'ui', directory, name }, normalizedOptions)
  logEntry(`          -> generateMobileUiLib ${name} files`, startTime)
  addFiles(host, normalizedOptions, path)
}
