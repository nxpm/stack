import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminDataAccessAuthSchematicSchema } from './schema'

describe('admin-data-access-auth schematic', () => {
  let appTree: Tree
  const options: AdminDataAccessAuthSchematicSchema = { name: 'auth', appName: 'admin-app' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/admin-data-access-auth',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-data-access-auth', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
    const codegenPath = 'data-access-auth/src/codegen.yml'
    expect(appTree.read('package.json').toString()).toContain(codegenPath)
  })
})
