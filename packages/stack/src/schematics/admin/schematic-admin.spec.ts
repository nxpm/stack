import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminSchematicSchema } from './schema'

describe('admin schematic', () => {
  let appTree: Tree
  const options: AdminSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/admin', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync('admin', options, appTree).toPromise()).resolves.not.toThrowError()
  })
})
