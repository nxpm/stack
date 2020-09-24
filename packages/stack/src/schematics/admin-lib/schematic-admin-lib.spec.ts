import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminLibSchematicSchema } from './schema'

describe('admin-lib schematic', () => {
  let appTree: Tree
  const options: AdminLibSchematicSchema = { name: 'test', type: 'feature' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-lib', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('admin-lib', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
