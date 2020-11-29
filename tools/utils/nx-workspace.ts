import { pathExists, readJson } from 'fs-extra'
import { join } from 'path'

export async function getWorkspaceFile(root: string) {
  const angularJson = join(root, 'angular.json')
  const workspaceJson = join(root, 'workspace.json')

  const [angularExists, workspaceExists] = await Promise.all([pathExists(angularJson), pathExists(workspaceJson)])

  if (!angularExists && !workspaceExists) {
    throw new Error(`No angular.json or workspace.json found in ${root}`)
  }
  if (angularExists) {
    console.log(`Using ${angularJson}`)
    return readJson(angularJson)
  }
  if (workspaceExists) {
    console.log(`Using ${workspaceJson}`)
    return readJson(workspaceJson)
  }
}

export async function getWorkspaceProjects(root: string) {
  const workspace = await getWorkspaceFile(root)
  const projects = workspace?.projects || {}

  return Object.keys(projects).map((name) => ({
    name,
    ...projects[name],
  }))
}
