import { Tree } from '@nrwl/devkit'
import { addFiles, normalizeOptions, removeFiles, updateAppAssets, updateProjectTargets } from '@nxpm/common'
import { join } from 'path'

import { MobileBaseGeneratorSchema } from './schema'
import { generatorMobileLib } from '../mobile-lib/generator-mobile-lib'

export async function generateMobileAssets(host: Tree, options: MobileBaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'library')
  const appName = normalizedOptions.appNameMobile
  const directory = normalizedOptions.directory || normalizedOptions.appNameMobile
  const name = normalizedOptions.name || 'assets'
  const projectName = normalizedOptions.projectName

  await generatorMobileLib(host, { directory, name, type: 'none' })
  addFiles(host, normalizedOptions, join(__dirname, 'files/assets'))
  updateAppAssets(host, appName, [
    {
      glob: '**/*.svg',
      input: 'node_modules/ionicons/dist/ionicons/svg',
      output: './svg',
    },
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
