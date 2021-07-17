import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'
import { AppTypeApi, AppTypeMobile, AppTypeWeb } from '@nxpm/common'

import { generatorInit } from './generator-init'
import { InitGeneratorSchema } from './schema'

describe('init generator', () => {
  let appTree: Tree
  const options: InitGeneratorSchema = { name: 'test', apiName: 'test-api' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
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
  })
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

  it('should run successfully', async () => {
    await generatorInit(appTree, options)
    // const config = readProjectConfiguration(appTree, 'test')
    const files = appTree.children('.')
    console.log(files)
    expect(appTree.children('.')).toBeDefined()
  })
})
