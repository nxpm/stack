import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiCoreFeatureSchematicSchema } from './schema'

describe('api-core-feature schematic', () => {
  let appTree: Tree
  const options: ApiCoreFeatureSchematicSchema = { name: 'test', type: 'feature' }

  const testRunner = new SchematicTestRunner('@nxpm/api-feature-core', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-core-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
