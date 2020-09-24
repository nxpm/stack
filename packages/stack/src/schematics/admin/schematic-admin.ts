import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace';
import {
  addFiles,
  addRunScript,
  normalizeOptions,
  removeFiles,
} from '../../utils';
import { AdminSchematicSchema } from './schema';

export default function (options: AdminSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions<AdminSchematicSchema>(
    options,
    ProjectType.Application
  );

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
      true
    ),
    externalSchematic('@nrwl/angular', 'application', {
      name: options.name,
      style: 'scss',
      routing: true,
    }),
    externalSchematic('@nrwl/angular', 'library', {
      name: 'data-access',
      directory: options.name,
      style: 'scss',
      prefix: 'admin',
      tags: `scope:${options.name},type:data-access`,
    }),
    externalSchematic('@nrwl/angular', 'library', {
      name: 'feature-auth',
      directory: options.name,
      style: 'scss',
      prefix: 'admin-auth',
      routing: true,
      lazy: true,
      tags: `scope:${options.name},type:feature`,
    }),
    externalSchematic('@nrwl/angular', 'library', {
      name: 'feature-shell',
      directory: options.name,
      style: 'scss',
      prefix: 'admin-shell',
      routing: true,
      lazy: true,
      tags: `scope:${options.name},type:feature`,
    }),
    addRunScript(`dev:${options.name}`, `nx serve ${options.name}`),
    addRunScript(`build:${options.name}`, `nx build ${options.name} --prod`),
    addFiles(normalizedOptions),
    removeFiles([
      `${normalizedOptions.projectRoot}/src/app/app.component.css`,
      `${normalizedOptions.projectRoot}/src/app/app.component.scss`,
      `${normalizedOptions.projectRoot}/src/app/app.component.html`,
      `${normalizedOptions.projectRoot}/src/app/app.component.spec.ts`,
    ]),
  ]);
}
