import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { GithubSchematicSchema } from './schema'

describe('github schematic', () => {
  let appTree: Tree
  const options: GithubSchematicSchema = { branch: 'main' }

  const testRunner = new SchematicTestRunner('@nxpm/github', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('github', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
