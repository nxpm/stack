import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminDataAccessSchematicSchema } from './schema'

describe('admin-data-access schematic', () => {
  let appTree: Tree
  const options: AdminDataAccessSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-data-access', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-data-access', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
