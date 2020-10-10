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
    schematic('api-e2e', {
      appName: name,
      name: 'e2e',
    }),
    schematic('api-data-access-auth', { directory, name: 'auth', appName: name }),
    schematic('api-feature-auth', { directory, name: 'auth', appName: name }),
    schematic('api-data-access-core', { directory, name: 'core', appName: name }),
    schematic('api-feature-core', { directory, name: 'core' }),
    addFiles(normalizedOptions),
    addRunScript(`dev:${name}`, `nx serve ${name}`),
    addRunScript(`build:${name}`, `nx build ${name} --prod`),
    addRunScript(
      `setup`,
      `yarn prisma migrate save -n initial-migration --experimental && yarn prisma migrate up --experimental && yarn prisma:generate`,
    ),
    createDotEnv([`NODE_ENV=development`, `PORT=3000`]),
    removeFiles(
      [`.gitkeep`, `app.controller.ts`, `app.controller.spec.ts`, `app.service.ts`, `app.service.spec.ts`],
      `${normalizedOptions.projectRoot}/src/app/`,
    ),
  ])
}
