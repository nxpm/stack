import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminAssetsSchematicSchema } from './schema'

describe('admin-assets schematic', () => {
  let appTree: Tree
  const options: AdminAssetsSchematicSchema = { name: 'assets', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-assets', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    const app = await testRunner.runSchematicAsync('admin', { name: 'test' }, appTree).toPromise()
    await expect(testRunner.runSchematicAsync('admin-assets', options, app).toPromise()).resolves.not.toThrowError()
  })
})
