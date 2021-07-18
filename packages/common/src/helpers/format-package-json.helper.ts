import { readJson, Tree, writeJson } from '@nrwl/devkit'

export function sortItems(items: Record<string, unknown> = {}) {
  return Object.keys(items)
    .sort()
    .reduce((acc, curr) => ({ ...acc, [curr]: items[curr] }), {})
}

export function formatPackageJson(host: Tree) {
  const file = 'package.json'
  const packageJson = readJson(host, file)

  writeJson(host, file, { ...packageJson, scripts: sortItems(packageJson.scripts || {}) })
}
