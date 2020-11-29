import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminAuthFeatureSchematicSchema } from './schema'

describe('admin-auth-feature schematic', () => {
  let appTree: Tree
  const options: AdminAuthFeatureSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-auth-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-auth-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
