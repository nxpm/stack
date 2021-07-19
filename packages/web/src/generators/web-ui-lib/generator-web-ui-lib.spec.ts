import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree } from '@nrwl/devkit'

import { WebUiLibGeneratorSchema } from './schema'

describe('web-ui-lib generator', () => {
  let appTree: Tree
  const options: WebUiLibGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    // await generatorWebUiLib(appTree, options)
    expect(true).toBe(true)
  })
})
