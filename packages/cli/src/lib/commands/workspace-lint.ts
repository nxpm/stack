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

function sortTsConfigPaths(file) {
  return {
    ...file,
    compilerOptions: {
      ...file?.compilerOptions,
      paths: sortItems(file?.compilerOptions?.paths),
    },
  }
}

function sortWorkspaceProjects(file) {
  return {
    ...file,
    projects: sortItems(file?.projects),
  }
}

export async function workspaceLint() {
  for (const file of projectFiles) {
    const contents = await getFileContents(file)
    if (contents) {
      await writeJson(file, sortWorkspaceProjects(contents), { spaces: 2 })
    }
  }

  for (const file of tsconfigFiles) {
    const contents = await getFileContents(file)
    if (contents) {
      await writeJson(file, sortTsConfigPaths(contents), { spaces: 2 })
    }
  }
}
