import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, uniq } from '../../utils'
import { ApiDataAccessAuthSchematicSchema } from './schema'

export default function (options: ApiDataAccessAuthSchematicSchema): Rule {
  const name = options.name || 'auth'
  const directory = options.directory || options.name
  const jwtSecret = uniq('NXPM_STACK_SECRET')
  const normalizedOptions = normalizeOptions(
    { ...options, jwtSecret, name: `data-access-${name}` },
    ProjectType.Library,
  )
  return chain([
    addDepsToPackageJson(
      {
        '@nestjs/jwt': '^7.1.0',
        '@nestjs/passport': '^7.1.0',
        bcryptjs: '^2.4.3',
        passport: '^0.4.1',
        'passport-jwt': '^4.0.0',
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
  ])
}
