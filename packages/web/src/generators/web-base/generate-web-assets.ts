import { Tree } from '@nrwl/devkit'
import { addFiles, normalizeOptions, removeFiles, updateAppAssets, updateProjectTargets } from '@nxpm/common'
import { join } from 'path'

import { WebBaseGeneratorSchema } from './schema'
import { generatorWebLib } from '../web-lib/generator-web-lib'

export async function generateWebAssets(host: Tree, options: WebBaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'library')
  const appName = normalizedOptions.appNameWeb
  const directory = normalizedOptions.directory || normalizedOptions.appNameWeb
  const name = normalizedOptions.name || 'assets'
  const projectName = normalizedOptions.projectName

  await generatorWebLib(host, { directory, name, type: 'none' })
  addFiles(host, normalizedOptions, join(__dirname, 'files/assets'))
  updateAppAssets(host, appName, [
    {
      glob: 'favicon.ico',
      input: `libs/${appName}/${name}/src`,
      output: './',
    },
    {
      glob: '**/*',
      input: `libs/${appName}/${name}/src/assets`,
      output: 'assets',
    },
  ])
  updateProjectTargets(host, projectName)
  removeFiles(
    host,
    [
      `src/lib/${projectName}.module.ts`,
      `src/lib/`,
      `src/index.ts`,
      `src/test-setup.ts`,
      `jest.config.js`,
      `tsconfig.json`,
      `tsconfig.lib.json`,
      `tsconfig.spec.json`,
      `tslint.json`,
      `README.md`,
    ],
    `libs/${appName}/${name}/`,
  )
}
