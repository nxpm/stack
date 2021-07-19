import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { generatorWebLib } from './generator-web-lib'
import { WebLibGeneratorSchema } from './schema'

describe('web-lib generator', () => {
  let appTree: Tree
  const options: WebLibGeneratorSchema = { name: 'test', type: 'data-access' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorWebLib(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')
    expect(config).toBeDefined()
  })
})
