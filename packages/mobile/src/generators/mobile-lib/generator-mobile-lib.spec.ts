import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { generatorMobileLib } from './generator-mobile-lib'
import { MobileLibGeneratorSchema } from './schema'

describe('mobile-lib generator', () => {
  let appTree: Tree
  const options: MobileLibGeneratorSchema = { name: 'test', type: 'data-access' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorMobileLib(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')
    expect(config).toBeDefined()
  })
})
