import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminFeatureDashboardSchematicSchema } from './schema'

describe('admin-feature-dashboard schematic', () => {
  let appTree: Tree
  const options: AdminFeatureDashboardSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/admin-feature-dashboard',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-feature-dashboard', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
