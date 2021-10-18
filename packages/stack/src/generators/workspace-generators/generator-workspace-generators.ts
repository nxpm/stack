import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit'
import { addFiles, normalizeOptions, versions } from '@nxpm/common'
import { join } from 'path'
import { WorkspaceGeneratorsGeneratorSchema } from './schema'

/**
 * When generating these generators, the templates get renamed.
 *
 * This method renames the generator template files back to the expected name.
 */
function renameGeneratorFiles(host: Tree, name: string, base: string, files: string[]) {
  for (const file of files) {
    const filePath = `${base}/rename.${file}.ts`
    if (host.exists(filePath)) {
      host.rename(filePath, `${base}/__name__.${file}.ts__tmpl__`)
    }
  }
}

export async function generatorWorkspaceGenerators(tree: Tree, options: WorkspaceGeneratorsGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options)

  addFiles(tree, { ...normalizedOptions, projectRoot: './tools/generators/' }, join(__dirname, 'files'), {
    tmplEnd: '%>',
    tmplStart: '<%=',
    name: normalizedOptions.name,
  })

  renameGeneratorFiles(tree, normalizedOptions.webName, `tools/generators/web-component/files`, ['component', 'module'])
  renameGeneratorFiles(tree, normalizedOptions.webName, `tools/generators/web-module/files`, [
    'component',
    'module',
    'store',
  ])

  addDependenciesToPackageJson(tree, {}, { pg: versions.pg })
  await formatFiles(tree)
}
