import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminDashboardFeatureSchematicSchema } from './schema'

describe('admin-dashboard-feature schematic', () => {
  let appTree: Tree
  const options: AdminDashboardFeatureSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/admin-dashboard-feature',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-dashboard-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
