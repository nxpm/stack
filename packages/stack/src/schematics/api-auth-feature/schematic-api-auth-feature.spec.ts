import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiAuthFeatureSchematicSchema } from './schema'

describe('api-auth-feature schematic', () => {
  let appTree: Tree
  const options: ApiAuthFeatureSchematicSchema = { name: 'test', appName: 'api' }

  const testRunner = new SchematicTestRunner('@nxpm/api-feature-auth', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-auth-feature', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
