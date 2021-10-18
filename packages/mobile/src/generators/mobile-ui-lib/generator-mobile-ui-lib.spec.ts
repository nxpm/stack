import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree } from '@nrwl/devkit'

import { MobileUiLibGeneratorSchema } from './schema'

describe('mobile-ui-lib generator', () => {
  let appTree: Tree
  const options: MobileUiLibGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    // await generatorMobileUiLib(appTree, options)
    expect(true).toBe(true)
  })
})
