import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminCoreFeatureSchematicSchema } from './schema'

describe('admin-core-feature schematic', () => {
  let appTree: Tree
  const options: AdminCoreFeatureSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-core-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-core-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
