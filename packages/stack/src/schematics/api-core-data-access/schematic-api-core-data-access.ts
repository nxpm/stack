import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, addPrismaConfig, normalizeOptions } from '../../utils'
import { ApiCoreDataAccessSchematicSchema } from './schema'

export default function (options: ApiCoreDataAccessSchematicSchema): Rule {
  const name = options.name || 'core/data-access'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `${name}/data-access` }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      {
        '@prisma/cli': '^2.12.0',
        '@prisma/client': '^2.12.0',
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
