import { formatFiles, generateFiles, names, Tree } from '@nrwl/devkit'
import { readJsonSync } from 'fs-extra'
import { join } from 'path'
import * as process from 'process'

export default async function (host: Tree, schema: { name: string; target: string }) {
  const nxJson = readJsonSync(join(process.cwd(), 'nx.json'))
  const workspaceJson = readJsonSync(join(process.cwd(), 'workspace.json'))
  if (!workspaceJson.projects[schema.target]) {
    throw new Error(`Target ${schema.target} not found`)
  }
  if (!workspaceJson.projects[schema.target].sourceRoot) {
    throw new Error(`Target ${schema.target} sourceRoot not found`)
  }
  const target = `${workspaceJson.projects[schema.target].sourceRoot}/lib`

  const formattedNames = names(schema.name)
  await generateFiles(host, join(__dirname, 'files'), join(target, schema.name), {
    ...formattedNames,
    npmScope: nxJson.npmScope,
    name: schema.name,
    target,
    tmpl: '',
  })
  await formatFiles(host)
  const { fileName } = formattedNames
  console.log(`Usage: <${fileName}></${fileName}>`)
}
