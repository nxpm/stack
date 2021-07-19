import { readProjectConfiguration, Tree } from '@nrwl/devkit'
import { join } from 'path'

function getTree(host: Tree, root: string, path = '') {
  const fullPath = join(root, path)
  return host.children(fullPath).map((item) => {
    const childPath = join(fullPath, item)

    if (!host.isFile(childPath)) {
      return getTree(host, root, childPath.replace(root, '')).flat()
    }

    return childPath.replace(root, '')
  })
}

function hostTreeHelper(host: Tree, root: string): { root: string; tree: string[] } {
  const tree = getTree(host, root).flat().sort()

  return { root, tree }
}

function hostContentHelper(host: Tree, root: string): { root: string; content: { file: string; content: string }[] } {
  const tree = getTree(host, root).flat().sort()
  const content = tree.map((file) => ({
    file,
    content: host.read(join(root, file)).toString('utf-8'),
  }))
  return { root, content }
}

export function getProjectTree(host: Tree, projectName: string) {
  const project = readProjectConfiguration(host, projectName)
  return hostTreeHelper(host, project.root)
}

export function getProjectContent(host: Tree, projectName: string) {
  const project = readProjectConfiguration(host, projectName)
  return hostContentHelper(host, project.sourceRoot)
}

export function getProjectContentRoot(host: Tree, projectName: string) {
  const project = readProjectConfiguration(host, projectName)
  return hostContentHelper(host, project.root)
}
