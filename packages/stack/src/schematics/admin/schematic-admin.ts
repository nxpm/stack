import { chain, externalSchematic, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, addRunScript, normalizeOptions, removeFiles } from '../../utils'
import { AdminSchematicSchema } from './schema'

export default function (options: AdminSchematicSchema): Rule {
  const name = options.name || 'admin'
  const directory = options.directory || options.name
  const normalizedOptions = normalizeOptions<AdminSchematicSchema>(options, ProjectType.Application)

  return chain([
    addDepsToPackageJson(
      {
        '@apollo/client': '^3.2.1',
        'apollo-angular': '^2.0.4',
      },
      {
        '@graphql-codegen/cli': '1.17.8',
        '@graphql-codegen/introspection': '1.17.8',
        '@graphql-codegen/typescript': '1.17.8',
        '@graphql-codegen/typescript-apollo-angular': '^2.0.1',
        '@graphql-codegen/typescript-operations': '1.17.8',
      },
      true,
    ),
    externalSchematic('@nrwl/angular', 'application', {
      name,
      style: 'scss',
      routing: true,
    }),
    schematic('admin-data-access', {
      directory,
      name: 'data-access',
    }),
    schematic('admin-lib', { directory, name: 'shell', type: 'feature' }),
    schematic('admin-lib', { directory, name: 'auth', type: 'feature' }),
    addRunScript(`dev:${name}`, `nx serve ${name}`),
    addRunScript(`build:${name}`, `nx build ${name} --prod`),
    addFiles(normalizedOptions),
    removeFiles([
      `${normalizedOptions.projectRoot}/src/app/app.component.css`,
      `${normalizedOptions.projectRoot}/src/app/app.component.scss`,
      `${normalizedOptions.projectRoot}/src/app/app.component.html`,
      `${normalizedOptions.projectRoot}/src/app/app.component.spec.ts`,
    ]),
  ])
}
