import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminFeatureShellSchematicSchema } from './schema'

describe('admin-feature-shell schematic', () => {
  let appTree: Tree
  const options: AdminFeatureShellSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-feature-shell', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-feature-shell', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
