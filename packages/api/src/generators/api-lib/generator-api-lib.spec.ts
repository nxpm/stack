import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { readProjectConfiguration, Tree } from '@nrwl/devkit'

import { generatorApiLib } from './generator-api-lib'
import { ApiLibGeneratorSchema } from './schema'

describe('api-lib generator', () => {
  let appTree: Tree
  const options: ApiLibGeneratorSchema = { name: 'test', type: 'data-access' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorApiLib(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')
    expect(config).toBeDefined()
  })
})
