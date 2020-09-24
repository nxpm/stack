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

export function apiFilesExisting(project: string) {
  return [
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
  ]
}

export function apiFilesRemoved(project: string) {
  return [`apps/${project}/src/app/app.controller.ts`, `apps/.gitkeep`, `libs/.gitkeep`]
}

export function apiFindStrings(project: string) {
  return {
    [`.gitignore`]: [`.env`],
    [`apps/${project}/src/main.ts`]: [`Logger.log('Listening at http://localhost:' + port + '/graphql')`],
    [`libs/${project}/feature-core/src/lib/${project}-feature-core.module.ts`]: [
      `ConfigModule.forRoot`,
      `GraphQLModule.forRoot`,
    ],
  }
}
