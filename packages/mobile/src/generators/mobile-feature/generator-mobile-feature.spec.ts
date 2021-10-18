import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { MobileFeatureGeneratorSchema } from './schema'
import { generateMobileFeatureAuth } from './generate-mobile-feature-auth'
import { generateMobileFeatureAccount } from './generate-mobile-feature-account'

describe('mobile-feature generator - account ', () => {
  let appTree: Tree
  const options: MobileFeatureGeneratorSchema = { name: 'test', mobileName: 'test', type: 'account' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  xit('should run successfully', async () => {
    await generateMobileFeatureAccount(appTree, options)
    const configDataAccess = readProjectConfiguration(appTree, 'test-account-data-access')
    const configFeature = readProjectConfiguration(appTree, 'test-account-feature')
    expect(configDataAccess).toBeDefined()
    expect(configFeature).toBeDefined()
    // const contentDataAccess = hostTreeHelper(appTree, configDataAccess.root)
    // console.log(contentDataAccess)
  }, 60000)
})

describe('mobile-feature generator - auth ', () => {
  let appTree: Tree
  const options: MobileFeatureGeneratorSchema = { name: 'test', mobileName: 'test', type: 'auth' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  xit('should run successfully', async () => {
    await generateMobileFeatureAuth(appTree, options)
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
