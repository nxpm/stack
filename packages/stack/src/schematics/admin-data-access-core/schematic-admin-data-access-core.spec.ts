import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminDataAccessCoreSchematicSchema } from './schema'

describe('admin-data-access-core schematic', () => {
  let appTree: Tree
  const options: AdminDataAccessCoreSchematicSchema = { name: 'core', appName: 'admin-app' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/admin-data-access-core',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-data-access-core', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
    const codegenPath = 'data-access-core/src/codegen.yml'
    expect(appTree.read('package.json').toString()).toContain(codegenPath)
  })
})
