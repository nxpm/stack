import { existsSync, readJson, writeJson } from 'fs-extra'

const projectFiles = ['angular.json', 'nx.json', 'workspace.json']
const tsconfigFiles = ['tsconfig.base.json', 'tsconfig.json']

async function getFileContents(filename: string) {
  if (existsSync(filename)) {
    return readJson(filename)
  }
  return null
}

function sortItems(items: Record<string, unknown>) {
  return Object.keys(items)
    .sort()
    .reduce((acc, curr) => ({ ...acc, [curr]: items[curr] }), {})
}

export function sortTsConfigPaths(file) {
  return {
    ...file,
    compilerOptions: {
      ...file?.compilerOptions,
      paths: sortItems(file?.compilerOptions?.paths),
    },
  }
}

export function sortWorkspaceProjects(file) {
  return {
    ...file,
    projects: sortItems(file?.projects),
  }
}

export async function workspaceLint({ dryRun }: { dryRun: boolean }) {
  for (const file of projectFiles) {
    const contents = await getFileContents(file)
    if (contents && !dryRun) {
      await writeJson(file, sortWorkspaceProjects(contents), { spaces: 2 })
    }
  }

  for (const file of tsconfigFiles) {
    const contents = await getFileContents(file)
    if (contents && !dryRun) {
      await writeJson(file, sortTsConfigPaths(contents), { spaces: 2 })
    }
  }
}
