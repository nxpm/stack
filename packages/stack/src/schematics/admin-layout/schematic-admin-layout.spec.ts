import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminLayoutSchematicSchema } from './schema'

describe('admin-layout schematic', () => {
  let appTree: Tree
  const options: AdminLayoutSchematicSchema = { name: 'layout', appName: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-layout', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    const app = await testRunner.runSchematicAsync('admin', { name: 'test' }, appTree).toPromise()
    await expect(testRunner.runSchematicAsync('admin-layout', options, app).toPromise()).resolves.not.toThrowError()
  })
})
