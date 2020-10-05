import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { ApiDataAccessSchematicSchema } from './schema'

describe('api-data-access schematic', () => {
  let appTree: Tree
  const options: ApiDataAccessSchematicSchema = { name: 'test', appName: 'api' }

  const testRunner = new SchematicTestRunner('@nxpm/api-data-access', join(__dirname, '../../../collection.json'))

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-data-access', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
