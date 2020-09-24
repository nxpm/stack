import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { InitSchematicSchema } from './schema'

describe('init schematic', () => {
  let appTree: Tree
  const options: InitSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/init', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('init', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
