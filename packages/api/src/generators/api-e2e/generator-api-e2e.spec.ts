import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree, readProjectConfiguration } from '@nrwl/devkit'

import { generatorApiE2e } from './generator-api-e2e'
import { ApiE2eGeneratorSchema } from './schema'

describe('api-e2e generator', () => {
  let appTree: Tree
  const options: ApiE2eGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorApiE2e(appTree, options)
    // const config = readProjectConfiguration(appTree, 'test')
    expect(options).toBeDefined()
  })
})
