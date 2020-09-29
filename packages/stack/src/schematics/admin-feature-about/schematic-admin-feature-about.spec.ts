import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminFeatureAboutSchematicSchema } from './schema'

describe('admin-feature-about schematic', () => {
  let appTree: Tree
  const options: AdminFeatureAboutSchematicSchema = { name: 'test', appName: 'admin' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-feature-about', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-feature-about', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
