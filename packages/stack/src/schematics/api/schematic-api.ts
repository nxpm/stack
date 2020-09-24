import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace';
import {
  addFiles,
  addRunScript,
  createDotEnv,
  normalizeOptions,
  removeFiles,
} from '../../utils';
import { ApiSchematicSchema } from './schema';

export default function (options: ApiSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions<ApiSchematicSchema>(
    options,
    ProjectType.Application
  );

  return chain([
    addDepsToPackageJson(
      {
        '@nestjs/config': '^0.5.0',
        '@nestjs/graphql': '^7.7.0',
        'apollo-server-express': '^2.18.0',
        'class-transformer': '^0.3.1',
        'class-validator': '^0.12.2',
        joi: '^17.2.1',
        graphql: '^15.3.0',
        'graphql-tools': '^6.2.3',
      },
      {},
      true
    ),
    externalSchematic('@nrwl/nest', 'application', {
      name: 'api',
    }),
    externalSchematic('@nrwl/nest', 'library', {
      name: 'data-access',
      directory: 'api',
      tags: `scope:api,type:data-access`,
    }),
    externalSchematic('@nrwl/nest', 'library', {
      name: 'feature-core',
      directory: 'api',
      tags: `scope:api,type:feature`,
    }),
    externalSchematic('@nrwl/nest', 'library', {
      name: 'feature-auth',
      directory: 'api',
      tags: `scope:api,type:feature`,
    }),
    addFiles(normalizedOptions),
    addRunScript('dev:api', 'nx serve api'),
    addRunScript('build:api', 'nx build api --prod'),
    createDotEnv([`NODE_ENV=development`, `PORT=3000`]),

    removeFiles([
      `${normalizedOptions.projectRoot}/src/app/.gitkeep`,
      `${normalizedOptions.projectRoot}/src/app/app.controller.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.controller.spec.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.service.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.service.spec.ts`,
    ]),
  ]);
}
