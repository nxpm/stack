import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { generatorApiFeature } from './generator-api-feature'
import { ApiFeatureGeneratorSchema } from './schema'

describe('api-feature generator - account ', () => {
  let appTree: Tree
  const options: ApiFeatureGeneratorSchema = { name: 'test', apiName: 'test', type: 'account' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorApiFeature(appTree, options)
    const configDataAccess = readProjectConfiguration(appTree, 'test-account-data-access')
    const configFeature = readProjectConfiguration(appTree, 'test-account-feature')
    expect(configDataAccess).toBeDefined()
    expect(configFeature).toBeDefined()
  }, 10000)
})

describe('api-feature generator - auth ', () => {
  let appTree: Tree
  const options: ApiFeatureGeneratorSchema = { name: 'test', apiName: 'test', type: 'auth' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorApiFeature(appTree, options)
    const configDataAccess = readProjectConfiguration(appTree, 'test-auth-data-access')
    const configFeature = readProjectConfiguration(appTree, 'test-auth-feature')
    expect(configDataAccess).toBeDefined()
    expect(configFeature).toBeDefined()
  }, 10000)
})
