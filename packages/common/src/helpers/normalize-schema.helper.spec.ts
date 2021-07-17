import { Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { BaseSchema } from '../interfaces'
import { normalizeOptions } from './normalize-schema.helper'

describe('normalize-schema', () => {
  let appTree: Tree
  const options: BaseSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    const schema = normalizeOptions(appTree, options)
    expect(schema).toMatchSnapshot()
  })
})
