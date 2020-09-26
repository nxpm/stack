import { FileTests } from '../../e2e-file-utils'

export function adminProjects(project: string) {
  return [project, `${project}-e2e`, `${project}-data-access`, `${project}-feature-shell`, `${project}-feature-auth`]
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
      `libs/${project}/feature-shell/src/lib/${project}-feature-shell.module.ts`,
      `libs/${project}/feature-auth/src/lib/${project}-feature-auth.module.ts`,
    ],
    missing: [`apps/${project}/src/app/app.component.html`, `apps/${project}/src/app/app.component.scss`],
    contain: {
      [`libs/${project}/data-access/src/codegen.yml`]: [
        `libs/${project}/data-access/src/graphql/**/*.graphql`,
        `libs/${project}/data-access/src/generated/graphql.ts:`,
      ],
    },
  }
}
