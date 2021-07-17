import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree } from '@nrwl/devkit'

import { generatorApi } from './generator-api'
import { ApiGeneratorSchema } from './schema'

describe('api generator', () => {
  let appTree: Tree
  const options: ApiGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorApi(appTree, options)
  }, 30000)
})
