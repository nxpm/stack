export function adminProjects(project: string) {
  return [project, `${project}-e2e`, `${project}-data-access`, `${project}-feature-shell`, `${project}-feature-auth`]
}

export function adminFilesExisting(project: string) {
  return [
    `apps/${project}/src/app/app.module.ts`,
    `apps/${project}/src/app/app.component.ts`,
    `libs/${project}/feature-shell/src/lib/${project}-feature-shell.module.ts`,
    `libs/${project}/feature-auth/src/lib/${project}-feature-auth.module.ts`,
    `libs/${project}/data-access/src/lib/${project}-data-access.module.ts`,
  ]
}

export function adminFilesRemoved(project: string) {
  return [`apps/${project}/src/app/app.component.html`, `apps/${project}/src/app/app.component.scss`]
}
