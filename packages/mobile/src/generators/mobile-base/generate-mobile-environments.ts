import { Tree } from '@nrwl/devkit'
import { MobileBaseGeneratorSchema } from './schema'
import { addFiles, normalizeOptions, removeFiles, updateAppFileReplacements } from '@nxpm/common'
import { generatorMobileLib } from '../mobile-lib/generator-mobile-lib'
import { join } from 'path'

export async function generateMobileEnvironments(host: Tree, options: MobileBaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'library')
  const appName = normalizedOptions.appNameMobile
  const directory = normalizedOptions.directory || normalizedOptions.appNameMobile
  const name = normalizedOptions.name || 'environments'
  const projectName = normalizedOptions.projectName

  await generatorMobileLib(host, { directory, name, type: 'none' })
  addFiles(host, normalizedOptions, join(__dirname, 'files/environments'))
  updateAppFileReplacements(host, appName, [
    {
      replace: `libs/${appName}/${name}/src/environments/environment.ts`,
      with: `libs/${appName}/${name}/src/environments/environment.prod.ts`,
    },
  ])
  removeFiles(host, [`src/lib/${projectName}.module.ts`, `src/lib/`], `libs/${appName}/${name}/`)
}
