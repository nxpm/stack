import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree } from '@nrwl/devkit'

import { generatorInit } from './generator-init'

import { InitGeneratorSchema } from './schema'

describe('init generator', () => {
  let appTree: Tree
  const options: InitGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorInit(appTree, options)
    // const config = readProjectConfiguration(appTree, 'test')
    const files = appTree.children('.')
    console.log(files)
    expect(appTree.children('.')).toBeDefined()
  })
})

describe('init generator: custom options', () => {
  let appTree: Tree
  const options: InitGeneratorSchema = {
    name: 'test',
    apiName: 'server',
    mobileName: 'native',
    webName: 'frontend',
  }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generatorInit(appTree, options)
    // const config = readProjectConfiguration(appTree, 'test')
    const files = appTree.children('.')
    console.log(files)
    expect(appTree.children('.')).toBeDefined()
  })
})
