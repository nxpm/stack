import { readProjectConfiguration, Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'

import { generatorApiCrud } from './generator-api-crud'
import { ApiCrudGeneratorSchema } from './schema'

describe('api-crud generator', () => {
  let appTree: Tree
  const options: ApiCrudGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorApiCrud(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')
    expect(config).toBeDefined()
  })
})
