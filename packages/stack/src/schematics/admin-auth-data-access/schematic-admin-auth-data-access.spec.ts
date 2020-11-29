import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminAuthDataAccessSchematicSchema } from './schema'

describe('admin-auth-data-access schematic', () => {
  let appTree: Tree
  const options: AdminAuthDataAccessSchematicSchema = { name: 'auth', appName: 'admin-app' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/admin-auth-data-access',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-auth-data-access', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
