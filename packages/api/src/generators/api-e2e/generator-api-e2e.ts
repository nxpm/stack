import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit'
import { applicationGenerator as nodeApplicationGenerator } from '@nrwl/node'
import {
  addFiles,
  addTsconfigPath,
  normalizeOptions,
  removeFiles,
  updateProjectEslintConfig,
  updateProjectExecutors,
} from '@nxpm/common'
import { join } from 'path'
import { ApiE2eGeneratorSchema } from './schema'

export async function generatorApiE2e(host: Tree, options: ApiE2eGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options, 'application')
  const name = normalizedOptions.name
  addDependenciesToPackageJson(host, {}, { supertest: '6.1.3' })

  await nodeApplicationGenerator(host, { ...normalizedOptions, name })
  removeFiles(
    host,
    [
      `src/main.ts`,
      `tsconfig.app.json`,
      `src/app/.gitkeep`,
      `src/assets/.gitkeep`,
      `src/environments/environment.ts`,
      `src/environments/environment.prod.ts`,
    ],
    `apps/${name}/`,
  )
  addTsconfigPath(host, `@${normalizedOptions.npmScope}/${normalizedOptions.appNameApi}-app-module`, [
    `apps/${normalizedOptions.appNameApi}/src/app/app.module.ts`,
  ])
  addFiles(host, normalizedOptions, join(__dirname, 'files'))
  updateProjectEslintConfig(host, name, {
    rules: {
      '@nrwl/nx/enforce-module-boundaries': [
        'error',
        {
          allow: [normalizedOptions.appNameApi],
        },
      ],
    },
  })
  updateProjectExecutors(host, name, {
    e2e: {
      executor: '@nrwl/jest:jest',
      outputs: [`coverage/apps/${name}`],
      options: {
        jestConfig: `apps/${name}/jest.config.js`,
        passWithNoTests: true,
      },
    },
    lint: {
      executor: '@nrwl/linter:eslint',
      options: {
        lintFilePatterns: [`apps/${name}/**/*.ts`],
      },
    },
  })
  await formatFiles(host)
}
