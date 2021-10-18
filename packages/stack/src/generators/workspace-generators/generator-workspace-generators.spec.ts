import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree, readProjectConfiguration } from '@nrwl/devkit'

import { generatorWorkspaceGenerators } from './generator-workspace-generators'
import { WorkspaceGeneratorsGeneratorSchema } from './schema'

describe('workspace-generators generator', () => {
  let appTree: Tree
  const options: WorkspaceGeneratorsGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorWorkspaceGenerators(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')
    expect(config).toBeDefined()
  })
})
