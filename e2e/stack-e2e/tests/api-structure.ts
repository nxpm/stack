import { FileTests } from '../../e2e-file-utils'

export function apiProjects(project: string) {
  return [
    project,
    `${project}-e2e`,
    `${project}-auth-data-access`,
    `${project}-core-data-access`,
    `${project}-auth-feature`,
    `${project}-core-feature`,
  ]
}

export function apiCrudFiles(project: string, name: string) {
  return [
    `libs/${project}/${name}/src/lib/${project}-${name.replace('/', '-')}.controller.ts`,
    `libs/${project}/${name}/src/lib/${project}-${name.replace('/', '-')}.module.ts`,
    `libs/${project}/${name}/src/lib/${project}-${name.replace('/', '-')}.service.ts`,
    `libs/${project}/${name}/src/lib/${project}-${name.replace('/', '-')}.resolver.ts`,
  ]
}

export function apiFileTests(project: string): FileTests {
  return {
    existing: [
      `.env`,
      `.env.example`,
      `apps/${project}/src/main.ts`,
      `apps/${project}/src/app/app.module.ts`,
      ...apiCrudFiles(project, 'auth/feature'),
      ...apiCrudFiles(project, 'core/feature'),
      `libs/${project}/core/data-access/src/lib/${project}-core-data-access.module.ts`,
      `libs/${project}/core/data-access/src/lib/${project}-core-data-access.service.ts`,
      `libs/${project}/core/data-access/src/prisma/schema.prisma`,
      `libs/${project}/core/feature/src/lib/${project}-core-feature.module.ts`,
      `libs/${project}/core/feature/src/lib/config/configuration.ts`,
      `libs/${project}/core/feature/src/lib/config/validation.ts`,
      `apps/${project}-e2e/jest.config.js`,
      `apps/${project}-e2e/src/integration/app.spec.ts`,
      `apps/${project}-e2e/src/integration/core.spec.ts`,
    ],
    missing: [
      `apps/${project}-e2e/src/main.ts`,
      `apps/${project}-e2e/tsconfig.app.json`,
      `apps/${project}-e2e/src/app/.gitkeep`,
      `apps/${project}-e2e/src/assets/.gitkeep`,
      `apps/${project}-e2e/src/environments/environments.ts`,
      `apps/${project}-e2e/src/environments/environments.prod.ts`,
      `apps/${project}/src/app/app.controller.ts`,
      `apps/.gitkeep`,
      `libs/.gitkeep`,
    ],
    contain: {
      [`.gitignore`]: [`.env`],
      [`.dockerignore`]: [`dist`, `node_modules`],
      [`docker-compose.yml`]: [
        `image: postgres`,
        `5432:5432`,
        `./tmp/postgres:/var/lib/postgresql/data`,
        `POSTGRES_DB: prisma`,
        `POSTGRES_USER: prisma`,
        `POSTGRES_PASSWORD: prisma`,
      ],
      [`Dockerfile`]: [`FROM node:14-alpine`],
      [`package.json`]: [
        'prisma:migrate',
        'prisma:generate',
        'prisma:format',
        'prisma:studio',
        'prisma:apply',
        `libs/${project}/core/data-access/src/prisma/schema.prisma`,
        `@nxpm/cli`,
        `yarn nxpm-stack lint`,
      ],
      [`tsconfig.base.json`]: [`"apps/${project}/src/app/app.module.ts"`],
      [`nx.json`]: [`"defaultBase": "main"`, `"project": "${project}"`],
      [`apps/${project}/src/main.ts`]: [`Logger.log('Listening at http://localhost:' + port + '/graphql')`],
      [`libs/${project}/core/data-access/src/lib/${project}-core-data-access.service.ts`]: [
        `extends PrismaClient`,
        `implements OnModuleInit, OnModuleDestroy`,
        `public findUserByEmail(email: string) {`,
        `public findUserById(userId: string) {`,
        `public findUserByUsername(username: string) {`,
      ],
      [`libs/${project}/core/data-access/src/prisma/schema.prisma`]: [`env("DATABASE_URL")`, `"prisma-client-js"`],
      [`apps/${project}/src/main.ts`]: [`Logger.log('Listening at http://localhost:' + port + '/graphql')`],
      [`libs/${project}/core/feature/src/lib/${project}-core-feature.module.ts`]: [
        `ConfigModule.forRoot`,
        `GraphQLModule.forRoot`,
      ],
    },
  }
}
