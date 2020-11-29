import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiCoreDataAccessSchematicSchema } from './schema'

describe('api-core-data-access schematic', () => {
  let appTree: Tree
  const options: ApiCoreDataAccessSchematicSchema = { name: 'test', appName: 'api' }

  const testRunner = new SchematicTestRunner('@nxpm/api-core-data-access', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-core-data-access', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
