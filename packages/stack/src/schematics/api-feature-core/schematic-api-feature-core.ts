import { chain, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../../utils'
import { ApiFeatureCoreSchematicSchema } from './schema'

export default function (options: ApiFeatureCoreSchematicSchema): Rule {
  const name = options.name || 'core'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions({ ...options, name: `feature-${name}` }, ProjectType.Library)
  return chain([
    addDepsToPackageJson(
      {
        '@kikstart-playground/graphql-intercom': '1.4.1',
        '@nestjs/config': '^0.5.0',
        '@nestjs/graphql': '^7.7.0',
        'apollo-server-express': '^2.18.0',
        'class-transformer': '^0.3.1',
        'class-validator': '^0.12.2',
        joi: '^17.2.1',
        graphql: '^15.3.0',
        'graphql-type-json': '^0.3.2',
        'graphql-tools': '^6.2.3',
      },
      {},
      true,
    ),
    schematic('api-lib', {
      directory,
      name,
      type: 'feature',
    }),
    addFiles(normalizedOptions),
  ])
}
