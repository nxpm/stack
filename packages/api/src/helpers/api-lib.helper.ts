import { addFiles, NormalizedSchema, removeFiles } from '@nxpm/common'
import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import { generatorApiLib } from '../generators/api-lib/generator-api-lib'

export type ApiLibType = 'data-access' | 'feature' | 'util'

export async function createApiLib(
  host: Tree,
  directory: string,
  name: string,
  path: string,
  type: ApiLibType,
  options: NormalizedSchema,
  filesToRemove: string[] = [],
  deps: Record<string, string> = {},
  devDeps: Record<string, string> = {},
) {
  addDependenciesToPackageJson(host, deps, devDeps)
  await generatorApiLib(host, { directory, name, type })
  addFiles(host, options, path)
  removeFiles(host, filesToRemove, `${options.projectRoot}/src/lib/`)
}
