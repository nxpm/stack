import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminShellFeatureSchematicSchema } from './schema'

describe('admin-shell-feature schematic', () => {
  let appTree: Tree
  const options: AdminShellFeatureSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-shell-feature', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-shell-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
