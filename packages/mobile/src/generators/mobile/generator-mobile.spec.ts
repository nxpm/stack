import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree } from '@nrwl/devkit'

import { generatorMobile } from './generator-mobile'
import { MobileGeneratorSchema } from './schema'

describe('mobile generator', () => {
  let appTree: Tree
  const options: MobileGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorMobile(appTree, options)
  })
})
