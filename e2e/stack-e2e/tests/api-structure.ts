import { FileTests } from '../../e2e-file-utils'

export function apiProjects(project: string) {
  return [project, `${project}-data-access`, `${project}-feature-core`, `${project}-feature-auth`]
}

export function apiCrudFiles(project: string, name: string) {
  return [
    `libs/${project}/${name}/src/lib/${project}-${name}.controller.ts`,
    `libs/${project}/${name}/src/lib/${project}-${name}.module.ts`,
    `libs/${project}/${name}/src/lib/${project}-${name}.service.ts`,
    `libs/${project}/${name}/src/lib/${project}-${name}.resolver.ts`,
  ]
}

export function apiFileTests(project: string): FileTests {
  return {
    existing: [
      `.env`,
      `.env.example`,
      `apps/${project}/src/main.ts`,
      `apps/${project}/src/app/app.module.ts`,
      ...apiCrudFiles(project, 'feature-auth'),
      ...apiCrudFiles(project, 'feature-core'),
      ...apiCrudFiles(project, 'data-access'),
      `libs/${project}/feature-core/src/lib/${project}-feature-core.module.ts`,
      `libs/${project}/feature-core/src/lib/config/configuration.ts`,
      `libs/${project}/feature-core/src/lib/config/validation.ts`,
    ],
    missing: [`apps/${project}/src/app/app.controller.ts`, `apps/.gitkeep`, `libs/.gitkeep`],
    contain: {
      [`.gitignore`]: [`.env`],
      [`.dockerignore`]: [`dist`, `node_modules`],
      [`Dockerfile`]: [`FROM node:14-alpine`],
      [`apps/${project}/src/main.ts`]: [`Logger.log('Listening at http://localhost:' + port + '/graphql')`],
      [`libs/${project}/feature-core/src/lib/${project}-feature-core.module.ts`]: [
        `ConfigModule.forRoot`,
        `GraphQLModule.forRoot`,
      ],
    },
  }
}
