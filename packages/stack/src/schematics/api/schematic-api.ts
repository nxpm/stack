import { chain, externalSchematic, Rule, schematic } from '@angular-devkit/schematics'
import { ProjectType } from '@nrwl/workspace'
import { addFiles, addRunScript, createDotEnv, normalizeOptions, removeFiles, uniq } from '../../utils'
import { ApiSchematicSchema } from './schema'

export default function (options: ApiSchematicSchema): Rule {
  const name = options.name || 'api'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions<ApiSchematicSchema>({ ...options }, ProjectType.Application)
  const schemaName = uniq(`${normalizedOptions.npmScope}-${normalizedOptions.name}`)
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
    addRunScript(
      `setup`,
      `yarn prisma migrate save -n initial-migration --experimental && yarn prisma migrate up --experimental && yarn prisma:generate`,
    ),
    addRunScript(`build:${name}`, `nx build ${name} --prod`),
    addRunScript(`dev:${name}`, `yarn prisma:generate && nx serve ${name}`),
    createDotEnv([
      `NODE_ENV=development`,
      `PORT=3000`,
      `DATABASE_URL=postgresql://prisma:prisma@localhost:5432/prisma?schema=${schemaName}`,
    ]),
    removeFiles(
      [`.gitkeep`, `app.controller.ts`, `app.controller.spec.ts`, `app.service.ts`, `app.service.spec.ts`],
      `${normalizedOptions.projectRoot}/src/app/`,
    ),
  ])
}
