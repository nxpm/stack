import { Tree } from '@nrwl/devkit'
import { WebBaseGeneratorSchema } from './schema'
import { addFiles, normalizeOptions, removeFiles, updateAppFileReplacements } from '@nxpm/common'
import { generatorWebLib } from '../web-lib/generator-web-lib'
import { join } from 'path'

export async function generateWebEnvironments(host: Tree, options: WebBaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'library')
  const appName = normalizedOptions.appNameWeb
  const directory = normalizedOptions.directory || normalizedOptions.appNameWeb
  const name = normalizedOptions.name || 'environments'
  const projectName = normalizedOptions.projectName

  await generatorWebLib(host, { directory, name, type: 'none' })
  addFiles(host, normalizedOptions, join(__dirname, 'files/environments'))
  updateAppFileReplacements(host, appName, [
    {
      replace: `libs/${appName}/${name}/src/environments/environment.ts`,
      with: `libs/${appName}/${name}/src/environments/environment.prod.ts`,
    },
  ])
  removeFiles(host, [`src/lib/${projectName}.module.ts`, `src/lib/`], `libs/${appName}/${name}/`)
}
