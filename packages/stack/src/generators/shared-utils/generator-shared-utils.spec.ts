import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { generatorSharedUtils } from './generator-shared-utils'
import { SharedUtilsGeneratorSchema } from './schema'

describe('shared-utils generator', () => {
  let appTree: Tree
  const options: SharedUtilsGeneratorSchema = { name: 'test', webName: 'web-test', directory: 'shared' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorSharedUtils(appTree, options)

    const config = readProjectConfiguration(appTree, 'shared-util-sdk')
    expect(config).toBeDefined()
  })
})
