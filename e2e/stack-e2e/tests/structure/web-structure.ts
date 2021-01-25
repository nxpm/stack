import { FileTests } from '../../../e2e-file-utils'

export function webProjects(project: string) {
  return [
    project,
    `${project}-about-feature`,
    `${project}-assets`,
    `${project}-auth-data-access`,
    `${project}-auth-feature`,
    `${project}-auth-ui`,
    `${project}-core-data-access`,
    `${project}-core-feature`,
    `${project}-dashboard-feature`,
    `${project}-e2e`,
    `${project}-layout`,
    `${project}-shell-feature`,
    `${project}-style`,
    `${project}-ui-form`,
    `${project}-ui-icon`,
    `${project}-ui-loader`,
    `${project}-ui-page-header`,
    `${project}-ui-page`,
    `${project}-ui-sidebar-page`,
  ]
}

export function webFileTests(project: string): FileTests {
  return {
    existing: [
      `apps/${project}/src/app/app.module.ts`,
      `apps/${project}/src/app/app.component.ts`,
      `libs/${project}/assets/src/assets/fonts/.gitkeep`,
      `libs/${project}/assets/src/assets/icons/.gitkeep`,
      `libs/${project}/assets/src/assets/images/logo.png`,
      `libs/${project}/assets/src/favicon.ico`,
      `libs/${project}/core/data-access/src/lib/${project}-core-data-access.module.ts`,
      `libs/${project}/core/data-access/src/lib/${project}-core-data-access.service.ts`,
      `libs/${project}/core/data-access/src/generated/graphql.ts`,
      `libs/${project}/core/data-access/src/graphql/auth-feature.graphql`,
      `libs/${project}/core/data-access/src/graphql/core-feature.graphql`,
      `libs/${project}/core/data-access/src/codegen.yml`,
      `libs/${project}/auth/feature/src/lib/${project}-auth-feature.module.ts`,
      `libs/${project}/core/feature/src/environments/environment.ts`,
      `libs/${project}/core/feature/src/environments/environment.prod.ts`,
      `libs/${project}/shell/feature/src/lib/${project}-shell-feature.module.ts`,
      `libs/${project}/layout/src/lib/${project}-layout.module.ts`,
      `libs/${project}/layout/src/lib/${project}-layout.component.ts`,
      `libs/${project}/style/src/index.css`,
    ],
    missing: [
      `apps/${project}/src/app/app.component.html`,
      `apps/${project}/src/app/app.component.css`,
      `apps/${project}/src/environments/environment.ts`,
      `apps/${project}/src/environments/environment.prod.ts`,
      `apps/${project}/src/environments`,
      `apps/${project}/src/assets`,
      `apps/${project}/src/favicon.ico`,
      `apps/${project}/src/styles.css`,
      `libs/${project}/assets/src/lib/${project}-assets.module.ts`,
      `libs/${project}/assets/src/lib`,
      `libs/${project}/assets/src/index.ts`,
      `libs/${project}/assets/tsconfig.json`,
      `libs/${project}/assets/tsconfig.lib.json`,
      `libs/${project}/assets/README.md`,
      `libs/${project}/style/src/lib/${project}-style.module.ts`,
      `libs/${project}/style/src/index.ts`,
      `libs/${project}/style/tsconfig.json`,
      `libs/${project}/style/tsconfig.lib.json`,
      `libs/${project}/style/README.md`,
    ],
    contain: {
      'workspace.json': [
        // Registered a proxy file
        `apps/${project}/proxy.conf.js`,
        // Moved environment files in fileReplacements
        `libs/${project}/core/feature/src/environments/environment.ts`,
        `libs/${project}/core/feature/src/environments/environment.prod.ts`,
        // Moved assets to lib
        `"input": "libs/${project}/assets/src"`,
        `"input": "libs/${project}/assets/src/assets"`,
        `"libs/${project}/style/src/index.css"`,
        // Add CommonJs dep list
        `allowedCommonJsDependencies`,
        `graphql-tag`,
        `subscriptions-transport-ws`,
        `zen-observable`,
      ],
      [`apps/${project}/proxy.conf.js`]: [
        `'/api': { target, secure: false }`,
        `'/graphql': { target, secure: false, ws: true }`,
      ],
      [`apps/${project}/src/app/app.module.ts`]: [
        `ShellFeatureModule`,
        `/${project}/shell/feature'`,
        `CoreFeatureModule`,
        `/${project}/core/feature'`,
      ],
      [`libs/${project}/core/data-access/src/codegen.yml`]: [
        `libs/${project}/core/data-access/src/graphql/**/*.graphql`,
        `libs/${project}/core/data-access/src/generated/graphql.ts:`,
      ],
      [`libs/${project}/core/data-access/src/index.ts`]: [
        `export * from './generated/graphql'`,
        `export * from './lib/${project}-core-data-access.module'`,
        `export * from './lib/${project}-core-data-access.service'`,
      ],
      [`libs/${project}/about/feature/src/lib/${project}-about-feature.module.ts`]: [
        `${project}/core/data-access`,
        `${project}-about-feature.component`,
      ],
      [`libs/${project}/about/feature/src/lib/${project}-about-feature.component.ts`]: [
        `${project}/core/data-access`,
        `environment = environment`,
      ],
      [`libs/${project}/auth/feature/src/index.ts`]: [`export * from './lib/${project}-auth-feature.module'`],
      [`libs/${project}/core/feature/src/environments/environment.ts`]: [
        `api: '/api'`,
        `graphql: '/graphql'`,
        `production: false`,
      ],
      [`libs/${project}/core/feature/src/environments/environment.prod.ts`]: [
        `api: '/api'`,
        `graphql: '/graphql'`,
        `production: true`,
      ],
      [`libs/${project}/core/feature/src/lib/${project}-core-feature.module.ts`]: [
        `-graphql.module`,
        'GraphQLModule',
        `import { HttpClientModule } from '@angular/common/http'`,
        'HttpClientModule',
      ],
      [`libs/${project}/core/feature/src/lib/${project}-core-feature-graphql.module.ts`]: [
        `import { environment } from '../environments/environment'`,
        `environment.graphql`,
      ],
      [`libs/${project}/dashboard/feature/src/lib/${project}-dashboard-feature.module.ts`]: [
        `${project}/core/data-access`,
        `${project}-dashboard-feature.component`,
      ],
      [`libs/${project}/dashboard/feature/src/lib/${project}-dashboard-feature.component.ts`]: [
        `${project}/core/data-access`,
      ],
      [`libs/${project}/shell/feature/src/lib/${project}-shell-feature.module.ts`]: [
        `RouterModule.forRoot(routes)`,
        `{ path: '', pathMatch: 'full', redirectTo: 'dashboard' }`,
        `path: 'about'`,
        `${project}/about/feature`,
        `path: 'dashboard'`,
        `${project}/dashboard/feature`,
        `LayoutComponent`,
        `${project}/layout`,
      ],
      [`libs/${project}/shell/feature/src/lib/not-found/not-found.component.ts`]: [`This page could not be found :(`],
      [`libs/${project}/layout/src/lib/${project}-layout.component.ts`]: [
        '<router-outlet></router-outlet>',
        'layout-footer',
        'layout-header',
      ],
      [`libs/${project}/layout/src/lib/components/layout-footer/layout-footer.component.ts`]: ['layout-footer'],
      [`libs/${project}/layout/src/lib/components/layout-header/layout-header.component.ts`]: ['layout-header'],
      [`libs/${project}/layout/src/lib/components/layout-header-links/layout-header-links.component.ts`]: [
        'layout-header-links',
      ],
      [`libs/${project}/style/src/index.css`]: [
        `@import 'tailwindcss/base';`,
        `@import 'tailwindcss/components';`,
        `@import 'tailwindcss/utilities';`,
      ],
      [`nx.json`]: [`"project": "${project}"`],
    },
  }
}
