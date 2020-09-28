import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { AdminFeatureCoreSchematicSchema } from './schema'

describe('admin-feature-core schematic', () => {
  let appTree: Tree
  const options: AdminFeatureCoreSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner('@nxpm/admin-feature-core', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('admin-feature-core', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
