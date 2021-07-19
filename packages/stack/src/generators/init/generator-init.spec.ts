import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { getProjects, readJson, readProjectConfiguration, Tree } from '@nrwl/devkit'
import { AppTypeApi, AppTypeMobile, AppTypeWeb, getProjectContent, getProjectTree } from '@nxpm/common'

import { generatorInit } from './generator-init'
import { InitGeneratorSchema } from './schema'

describe('init generator', () => {
  let appTree: Tree
  const options: InitGeneratorSchema = { name: 'test', apiName: 'test-api', webName: 'test-web' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully with default options', async () => {
    await generatorInit(appTree, options)
    const configApi = readProjectConfiguration(appTree, options.apiName)
    expect(configApi).toBeDefined()

    const nxJson = readJson(appTree, 'nx.json')
    expect(nxJson).toMatchSnapshot()

    const nxpmJson = readJson(appTree, 'nxpm.json')
    expect(nxpmJson).toMatchSnapshot()
    const root = appTree.children('.')
    expect(root).toMatchSnapshot()
    const packageJson = appTree.read('package.json').toString('utf-8')
    expect(packageJson).toMatchSnapshot()

    // Get a list of projects that belong to the API
    const projects = Array.from(getProjects(appTree).keys())

    // Make sure that each project has the expected file tree
    for (const project of projects) {
      const projectConfig = readProjectConfiguration(appTree, project)
      expect(projectConfig).toMatchSnapshot()
      const tree = getProjectTree(appTree, project)
      expect(tree).toMatchSnapshot()
      const content = getProjectContent(appTree, project)
      expect(content).toMatchSnapshot()
    }
  }, 60000)
})

describe('init generator: custom options', () => {
  let appTree: Tree
  const options: InitGeneratorSchema = {
    name: 'test',
    apiName: 'server',
    mobileName: 'native',
    webName: 'frontend',
    apiType: AppTypeApi.nest,
    mobileType: AppTypeMobile.ionicAngular,
    webType: AppTypeWeb.angular,
  }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully with custom options', async () => {
    await generatorInit(appTree, options)
    const configApi = readProjectConfiguration(appTree, options.apiName)
    expect(configApi).toBeDefined()

    const pathAppsApi = `apps/${options.apiName}`
    const filesApiRoot = appTree.children(`${pathAppsApi}`)
    const filesApiSrc = appTree.children(`${pathAppsApi}/src`)
    const filesApiApp = appTree.children(`${pathAppsApi}/src/app`)
    expect(filesApiRoot).toMatchSnapshot()
    expect(filesApiSrc).toMatchSnapshot()
    expect(filesApiApp).toMatchSnapshot()

    expect(appTree.children('.')).toBeDefined()

    const nxpmJson = readJson(appTree, 'nxpm.json')
    expect(nxpmJson).toMatchSnapshot()
  }, 60000)
})
