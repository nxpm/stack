import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree } from '@nrwl/devkit'

import { generatorWeb } from './generator-web'
import { WebGeneratorSchema } from './schema'

describe('web generator', () => {
  let appTree: Tree
  const options: WebGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorWeb(appTree, options)
  })
})
