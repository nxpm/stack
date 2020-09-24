import { chain, externalSchematic, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, addRunScript, createDotEnv, normalizeOptions, removeFiles } from '../../utils'
import { ApiSchematicSchema } from './schema'

export default function (options: ApiSchematicSchema): Rule {
  const name = options.name || 'api'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions<ApiSchematicSchema>({ ...options }, ProjectType.Application)

  return chain([
    externalSchematic('@nrwl/nest', 'application', {
      name,
    }),
    schematic('api-lib', {
      directory,
      name: 'data-access',
      type: 'data-access',
    }),
    schematic('api-feature-core', { directory, name: 'core' }),
    schematic('api-lib', { directory, name: 'auth', type: 'feature' }),
    addFiles(normalizedOptions),
    addRunScript(`dev:${name}`, `nx serve ${name}`),
    addRunScript(`build:${name}`, `nx build ${name} --prod`),
    createDotEnv([`NODE_ENV=development`, `PORT=3000`]),

    removeFiles([
      `${normalizedOptions.projectRoot}/src/app/.gitkeep`,
      `${normalizedOptions.projectRoot}/src/app/app.controller.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.controller.spec.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.service.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.service.spec.ts`,
    ]),
  ])
}
