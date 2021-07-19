import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { ApiFeatureGeneratorSchema } from './schema'
import { generateApiFeatureAuth } from './generate-api-feature-auth'
import { generateApiFeatureAccount } from './generate-api-feature-account'

describe('api-feature generator - account ', () => {
  let appTree: Tree
  const options: ApiFeatureGeneratorSchema = { name: 'test', apiName: 'test', type: 'account' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  xit('should run successfully', async () => {
    await generateApiFeatureAccount(appTree, options)
    const configDataAccess = readProjectConfiguration(appTree, 'test-account-data-access')
    const configFeature = readProjectConfiguration(appTree, 'test-account-feature')
    expect(configDataAccess).toBeDefined()
    expect(configFeature).toBeDefined()
    // const contentDataAccess = hostTreeHelper(appTree, configDataAccess.root)
    // console.log(contentDataAccess)
  }, 15000)
})

describe('api-feature generator - auth ', () => {
  let appTree: Tree
  const options: ApiFeatureGeneratorSchema = { name: 'test', apiName: 'test', type: 'auth' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  xit('should run successfully', async () => {
    await generateApiFeatureAuth(appTree, options)
    const configDataAccess = readProjectConfiguration(appTree, 'test-auth-data-access')
    const configFeature = readProjectConfiguration(appTree, 'test-auth-feature')
    const configUtil = readProjectConfiguration(appTree, 'test-auth-util')

    expect(configDataAccess).toBeDefined()
    expect(configFeature).toBeDefined()
    expect(configUtil).toBeDefined()

    // const contentDataAccess = hostTreeHelper(appTree, configDataAccess.root)
    // console.log(contentDataAccess)
    //
    // const contentFeature = hostTreeHelper(appTree, configFeature.root)
    // console.log(contentFeature)
  }, 12000)
})
