import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, addPrismaConfig, normalizeOptions } from '../../utils'
import { ApiDataAccessCoreSchematicSchema } from './schema'

export default function (options: ApiDataAccessCoreSchematicSchema): Rule {
  const name = options.name || 'data-access-core'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `data-access-${name}` }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      {
        '@prisma/cli': '^2.8.0',
        '@prisma/client': '^2.8.0',
      },
      {},
      true,
    ),
    schematic('api-lib', {
      directory,
      name,
      type: 'data-access',
    }),
    addFiles(normalizedOptions),
    addPrismaConfig(normalizedOptions),
  ])
}
