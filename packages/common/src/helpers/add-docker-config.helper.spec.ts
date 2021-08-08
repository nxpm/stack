import { Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { addDockerIgnore, addDockerfile } from './add-docker-config.helper'

describe('add-docker-config helper', () => {
  let appTree: Tree

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should add Dockerfile', async () => {
    addDockerfile(appTree)
    expect(appTree.read('Dockerfile').toString()).toMatchSnapshot()
  })
  it('should add Dockerfile', async () => {
    addDockerIgnore(appTree)
    expect(appTree.read('.dockerignore').toString()).toMatchSnapshot()
  })
})
