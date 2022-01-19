import { execSync } from 'child_process'
import { existsSync, readJson, writeJson } from 'fs-extra'

const projectFiles = ['angular.json', 'nx.json', 'workspace.json']
const tsconfigFiles = ['tsconfig.base.json', 'tsconfig.json']

async function getFileContents(filename: string) {
  if (existsSync(filename)) {
    return readJson(filename)
  }
  return null
}

function sortItems(items: Record<string, unknown> = {}) {
  return Object.keys(items)
    .sort()
    .reduce((acc, curr) => ({ ...acc, [curr]: items[curr] }), {})
}

export function sortPackageJson(file) {
  return {
    ...file,
    ...(file?.scripts ? { scripts: sortItems(file?.scripts) } : {}),
  }
}

export async function workspaceLint({ dryRun, skipPackageJson }: { dryRun: boolean; skipPackageJson: boolean }) {
  if (!skipPackageJson) {
    const file = 'package.json'
    const contents = await getFileContents(file)
    if (contents && !dryRun) {
      await writeJson(file, sortPackageJson(contents), { spaces: 2 })
      execSync('prettier --write ' + file)
    }
  }
}
