import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, addTsconfigPath, normalizeOptions, removeFiles, updateProjectArchitects } from '../../utils'
import { ApiE2eSchematicSchema } from './schema'

export default function (options: ApiE2eSchematicSchema): Rule {
  const name = options.appName ? `${options.appName}-${options.name}` : options.name

  const normalizedOptions = normalizeOptions<ApiE2eSchematicSchema>({ ...options, name }, ProjectType.Application)
  return chain([
    addDepsToPackageJson({ supertest: '^5.0.0' }, {}),
    externalSchematic('@nrwl/node', 'application', {
      name,
    }),
    addFiles(normalizedOptions),
    removeFiles(
      [
        `src/main.ts`,
        `tsconfig.app.json`,
        `src/app/.gitkeep`,
        `src/assets/.gitkeep`,
        `src/environments/environments.ts`,
        `src/environments/environments.prod.ts`,
      ],
      `apps/${name}/`,
    ),
    addTsconfigPath(`@${normalizedOptions.npmScope}/${options.appName}-app-module`, [
      `apps/${options.appName}/src/app/app.module.ts`,
    ]),
    updateProjectArchitects(name, {
      e2e: {
        builder: '@nrwl/jest:jest',
        options: {
          jestConfig: `apps/${name}/jest.config.js`,
          passWithNoTests: true,
        },
      },
      lint: {
        builder: '@nrwl/linter:lint',
        options: {
          linter: 'eslint',
          tsConfig: [`apps/${name}/tsconfig.spec.json`],
          exclude: ['**/node_modules/**', '!apps/api-e2e/**/*'],
        },
      },
    }),
  ])
}
