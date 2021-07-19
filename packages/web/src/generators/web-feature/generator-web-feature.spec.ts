import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { WebFeatureGeneratorSchema } from './schema'
import { generateWebFeatureAuth } from './generate-web-feature-auth'
import { generateWebFeatureAccount } from './generate-web-feature-account'

describe('web-feature generator - account ', () => {
  let appTree: Tree
  const options: WebFeatureGeneratorSchema = { name: 'test', webName: 'test', type: 'account' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  xit('should run successfully', async () => {
    await generateWebFeatureAccount(appTree, options)
    const configDataAccess = readProjectConfiguration(appTree, 'test-account-data-access')
    const configFeature = readProjectConfiguration(appTree, 'test-account-feature')
    expect(configDataAccess).toBeDefined()
    expect(configFeature).toBeDefined()
    // const contentDataAccess = hostTreeHelper(appTree, configDataAccess.root)
    // console.log(contentDataAccess)
  }, 60000)
})

describe('web-feature generator - auth ', () => {
  let appTree: Tree
  const options: WebFeatureGeneratorSchema = { name: 'test', webName: 'test', type: 'auth' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  xit('should run successfully', async () => {
    await generateWebFeatureAuth(appTree, options)
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
  }, 60000)
})
