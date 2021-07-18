import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readJson, readProjectConfiguration, Tree } from '@nrwl/devkit'
import { AppTypeApi, AppTypeMobile, AppTypeWeb } from '@nxpm/common'

import { generatorInit } from './generator-init'
import { InitGeneratorSchema } from './schema'

describe('init generator', () => {
  let appTree: Tree
  const options: InitGeneratorSchema = { name: 'test', apiName: 'test-api' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully with default options', async () => {
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

    const nxpmJson = readJson(appTree, 'nxpm.json')
    expect(nxpmJson).toMatchSnapshot()
  }, 15000)
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
  }, 15000)
})
