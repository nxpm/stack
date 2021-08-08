import { Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { addDockerCompose } from './add-docker-compose.helper'

describe('add-docker-compose helper', () => {
  let appTree: Tree

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    addDockerCompose(appTree)
    expect(appTree.read('docker-compose.yml').toString()).toMatchSnapshot()
  })
})
