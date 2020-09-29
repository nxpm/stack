import { FileTests } from '../../e2e-file-utils'

export function adminProjects(project: string) {
  return [
    project,
    `${project}-e2e`,
    `${project}-data-access`,
    `${project}-feature-about`,
    `${project}-feature-auth`,
    `${project}-feature-dashboard`,
    `${project}-feature-core`,
    `${project}-feature-shell`,
  ]
}

export function adminFileTests(project: string): FileTests {
  return {
    existing: [
      `apps/${project}/src/app/app.module.ts`,
      `apps/${project}/src/app/app.component.ts`,
      `libs/${project}/data-access/src/lib/${project}-data-access.module.ts`,
      `libs/${project}/data-access/src/lib/${project}-data-access.service.ts`,
      `libs/${project}/data-access/src/generated/graphql.ts`,
      `libs/${project}/data-access/src/graphql/core.graphql`,
      `libs/${project}/data-access/src/codegen.yml`,
      `libs/${project}/feature-auth/src/lib/${project}-feature-auth.module.ts`,
      `libs/${project}/feature-core/src/environments/environment.ts`,
      `libs/${project}/feature-core/src/environments/environment.prod.ts`,
      `libs/${project}/feature-shell/src/lib/${project}-feature-shell.module.ts`,
    ],
    missing: [
      `apps/${project}/src/app/app.component.html`,
      `apps/${project}/src/app/app.component.scss`,
      `apps/${project}/src/environments/environment.ts`,
      `apps/${project}/src/environments/environment.prod.ts`,
      `apps/${project}/src/environments`,
    ],
    contain: {
      'workspace.json': [
        `libs/${project}/feature-core/src/environments/environment.ts`,
        `libs/${project}/feature-core/src/environments/environment.prod.ts`,
        `apps/${project}/proxy.conf.js`,
        `allowedCommonJsDependencies`,
        `graphql-tag`,
        `subscriptions-transport-ws`,
        `zen-observable`,
      ],
      [`apps/${project}/proxy.conf.js`]: [`'/api': { target, secure: false }`, `'/graphql': { target, secure: false }`],
      [`apps/${project}/src/app/app.module.ts`]: [
        `FeatureShellModule`,
        `/${project}/feature-shell'`,
        `FeatureCoreModule`,
        `/${project}/feature-core'`,
      ],
      [`libs/${project}/data-access/src/codegen.yml`]: [
        `libs/${project}/data-access/src/graphql/**/*.graphql`,
        `libs/${project}/data-access/src/generated/graphql.ts:`,
      ],
      [`libs/${project}/data-access/src/index.ts`]: [
        `export * from './generated/graphql'`,
        `export * from './lib/${project}-data-access.module'`,
        `export * from './lib/${project}-data-access.service'`,
      ],
      [`libs/${project}/feature-about/src/lib/${project}-feature-about.module.ts`]: [
        `${project}/data-access`,
        `${project}-feature-about.component`,
      ],
      [`libs/${project}/feature-about/src/lib/${project}-feature-about.component.ts`]: [
        `${project}/data-access`,
        `public environment = environment`,
      ],
      [`libs/${project}/feature-auth/src/index.ts`]: [`export * from './lib/${project}-feature-auth.module'`],
      [`libs/${project}/feature-core/src/environments/environment.ts`]: [
        `api: '/api'`,
        `graphql: '/graphql'`,
        `production: false`,
      ],
      [`libs/${project}/feature-core/src/environments/environment.prod.ts`]: [
        `api: '/api'`,
        `graphql: '/graphql'`,
        `production: true`,
      ],
      [`libs/${project}/feature-core/src/lib/${project}-feature-core.module.ts`]: [
        `-graphql.module`,
        'GraphQLModule',
        `import { HttpClientModule } from '@angular/common/http'`,
        'HttpClientModule',
      ],
      [`libs/${project}/feature-core/src/lib/${project}-feature-core-graphql.module.ts`]: [
        `import { environment } from '../environments/environment'`,
        `environment.graphql`,
      ],
      [`libs/${project}/feature-dashboard/src/lib/${project}-feature-dashboard.module.ts`]: [
        `${project}/data-access`,
        `${project}-feature-dashboard.component`,
      ],
      [`libs/${project}/feature-dashboard/src/lib/${project}-feature-dashboard.component.ts`]: [
        `${project}/data-access`,
      ],
      [`libs/${project}/feature-shell/src/lib/${project}-feature-shell.component.ts`]: [
        `<router-outlet></router-outlet>`,
      ],
      [`libs/${project}/feature-shell/src/lib/${project}-feature-shell.module.ts`]: [
        `RouterModule.forRoot(routes)`,
        `{ path: '', pathMatch: 'full', redirectTo: 'dashboard' }`,
        `path: 'about'`,
        `${project}/feature-about`,
        `path: 'dashboard'`,
        `${project}/feature-dashboard`,
      ],
    },
  }
}
