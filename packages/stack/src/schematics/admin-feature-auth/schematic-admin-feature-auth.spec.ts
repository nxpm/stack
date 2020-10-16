import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminFeatureAuthSchematicSchema } from './schema'

describe('admin-feature-auth schematic', () => {
  let appTree: Tree
  const options: AdminFeatureAuthSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-feature-auth', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-feature-auth', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
