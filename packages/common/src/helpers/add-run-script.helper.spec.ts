import { readJson, Tree } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { addRunScript } from './add-run-script.helper'

describe('add-run-script helper', () => {
  let appTree: Tree

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should add Profile Config', async () => {
    const scriptName = 'test-script'
    const scriptCommand = 'test-script'
    addRunScript(appTree, scriptName, scriptCommand)
    const pJson = readJson(appTree, 'package.json')
    expect(pJson.scripts[scriptName]).toBe(scriptCommand)
  })
})
