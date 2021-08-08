import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import {
  addFiles,
  addTailwindConfig,
  normalizeOptions,
  removeFiles,
  updateProjectTargets,
  versions,
} from '@nxpm/common'
import { join } from 'path'

import { WebBaseGeneratorSchema } from './schema'
import { generatorWebLib } from '../web-lib/generator-web-lib'

export async function generateWebStyle(host: Tree, options: WebBaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'library')
  const appName = normalizedOptions.appNameWeb
  const directory = normalizedOptions.directory || normalizedOptions.appNameWeb
  const name = normalizedOptions.name || 'style'
  const projectName = normalizedOptions.projectName

  await addDependenciesToPackageJson(
    host,
    {
      tailwindcss: versions.tailwindcss,
      '@tailwindcss/forms': versions.tailwindcssForms,
    },
    {},
  )
  await generatorWebLib(host, { directory, name, type: 'none' })
  addTailwindConfig(host, normalizedOptions.appNameWeb)
  addFiles(host, normalizedOptions, join(__dirname, 'files/style'))
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
