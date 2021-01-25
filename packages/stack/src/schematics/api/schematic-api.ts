import { chain, externalSchematic, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, addRunScript, createDotEnv, normalizeOptions, removeFiles, uniq } from '../../utils'
import { ApiSchematicSchema } from './schema'

export default function (options: ApiSchematicSchema): Rule {
  const name = options.name || 'api'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions<ApiSchematicSchema>({ ...options }, ProjectType.Application)
  const schemaName = uniq(`${normalizedOptions.npmScope}-${normalizedOptions.name}`)
  return chain([
    addDepsToPackageJson({ 'cookie-parser': '1.4.5' }, {}, true),
    externalSchematic('@nrwl/nest', 'application', { name }),
    schematic('api-feature-auth', { directory, appName: name }),
    schematic('api-feature-core', { directory, appName: name }),
    schematic('api-feature-user', { directory, appName: name }),
    schematic('api-e2e', { appName: name, name: 'e2e' }),
    addFiles({ ...normalizedOptions, appName: name }),
    addRunScript(`setup`, `yarn nx workspace-generator workspace-setup`),
    addRunScript(`build:${name}`, `nx build ${name} --prod`),
    addRunScript(`dev:${name}`, `nx serve ${name}`),
    createDotEnv([
      `NODE_ENV=development`,
      `PORT=3000`,
      `DATABASE_URL=postgresql://prisma:prisma@localhost:5432/prisma?schema=${schemaName}`,
      `JWT_SECRET=NxpmDotDevJwtSecret`,
    ]),
    removeFiles(
      [`.gitkeep`, `app.controller.ts`, `app.controller.spec.ts`, `app.service.ts`, `app.service.spec.ts`],
      `${normalizedOptions.projectRoot}/src/app/`,
    ),
  ])
}
