import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit'
import {
  addFiles,
  addTailwindConfig,
  normalizeOptions,
  removeFiles,
  updateAppStyles,
  updateProjectTargets,
  versions,
} from '@nxpm/common'
import { join } from 'path'

import { MobileBaseGeneratorSchema } from './schema'
import { generatorMobileLib } from '../mobile-lib/generator-mobile-lib'

export async function generateMobileStyle(host: Tree, options: MobileBaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'library')
  const appName = normalizedOptions.appNameMobile
  const directory = normalizedOptions.directory || normalizedOptions.appNameMobile
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
  await generatorMobileLib(host, { directory, name, type: 'none' })
  addTailwindConfig(host, normalizedOptions.appNameMobile)
  addFiles(host, normalizedOptions, join(__dirname, 'files/style'))
  updateAppStyles(host, appName, [
    `libs/${normalizedOptions.appNameMobile}/${name}/src/index.css`,
    { input: `libs/${normalizedOptions.appNameMobile}/${name}/src/theme/variables.scss` },
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
  removeFiles(
    host,
    [
      `app/app.component.css`,
      `app/app.component.html`,
      `app/app.component.spec.ts`,
      `environments/environment.ts`,
      `environments/environment.prod.ts`,
      `environments`,
      `assets/.gitkeep`,
      `assets/`,
      `favicon.ico`,
      `styles.css`,
    ],
    `apps/${appName}/src/`,
  )
}
