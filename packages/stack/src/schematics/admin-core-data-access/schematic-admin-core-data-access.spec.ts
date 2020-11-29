import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminCoreDataAccessSchematicSchema } from './schema'

describe('admin-core-data-access schematic', () => {
  let appTree: Tree
  const options: AdminCoreDataAccessSchematicSchema = { name: 'core', appName: 'admin-app' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/admin-core-data-access',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-core-data-access', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
    const codegenPath = 'core/data-access/src/codegen.yml'
    expect(appTree.read('package.json').toString()).toContain(codegenPath)
  })
})
